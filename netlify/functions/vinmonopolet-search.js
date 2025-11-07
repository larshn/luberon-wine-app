const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const VINMONOPOLET_API_KEY = process.env.VINMONOPOLET_API_KEY;
const VINMONOPOLET_API_BASE = 'https://api.vinmonopolet.no';

exports.handler = async (event) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { producer, wineName } = event.queryStringParameters || {};

    if (!producer && !wineName) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Må oppgi enten producer eller wineName som parameter'
        }),
      };
    }

    // Build search query
    const searchQuery = wineName || producer;

    // Check cache first (skip if table doesn't exist yet)
    const cacheKey = `${producer || ''}_${wineName || ''}`.toLowerCase();
    let cachedData = null;

    try {
      const { data, error: cacheError } = await supabase
        .from('vinmonopolet_cache')
        .select('*')
        .eq('cache_key', cacheKey)
        .single();

      // Return cached data if fresh (less than 24 hours old)
      if (data && !cacheError) {
        const cacheAge = new Date() - new Date(data.cached_at);
        const hoursOld = cacheAge / (1000 * 60 * 60);

        if (hoursOld < 24) {
          return {
            statusCode: 200,
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'public, max-age=3600'
            },
            body: JSON.stringify({
              products: data.products,
              cached: true,
              cachedAt: data.cached_at
            }),
          };
        }
      }
    } catch (err) {
      console.log('Cache check failed (table may not exist yet):', err.message);
      // Continue without cache
    }

    // Search Vinmonopolet using official API
    console.log(`Searching Vinmonopolet for: "${searchQuery}"`);

    if (!VINMONOPOLET_API_KEY) {
      throw new Error('VINMONOPOLET_API_KEY er ikke satt i environment variables');
    }

    // Call Vinmonopolet API
    const apiUrl = `${VINMONOPOLET_API_BASE}/products/v0/details-normal?maxResults=20`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Ocp-Apim-Subscription-Key': VINMONOPOLET_API_KEY,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Vinmonopolet API feilet: ${response.status} ${response.statusText}`);
    }

    const apiData = await response.json();
    const results = Array.isArray(apiData) ? apiData : (apiData.products || []);

    // Filter results for better matches
    const filteredResults = results.filter(product => {
      const productName = (product.productName || product.name || '').toLowerCase();
      const productProducer = (product.distributorName || product.producer || '').toLowerCase();

      // Match producer if provided
      if (producer) {
        const hasProducer = productName.includes(producer.toLowerCase()) ||
                           productProducer.includes(producer.toLowerCase());
        if (!hasProducer) return false;
      }

      // Match wine name if provided
      if (wineName) {
        const hasWineName = productName.includes(wineName.toLowerCase());
        if (!hasWineName) return false;
      }

      // Only include wines (mainCategory should be "Rød", "Hvit", "Rosé", etc.)
      const category = (product.mainCategory || product.productType || '').toLowerCase();
      const isWine = category.includes('rød') ||
                     category.includes('hvit') ||
                     category.includes('rosé') ||
                     category.includes('musserende') ||
                     category.includes('vin');

      return isWine;
    });

    // Map to simpler structure
    const products = filteredResults.slice(0, 5).map(product => ({
      code: product.productId || product.code,
      name: product.productName || product.name,
      price: product.price ? `kr ${product.price}` : null,
      pricePerLiter: product.pricePerLiter ? `kr ${product.pricePerLiter}` : null,
      url: `https://www.vinmonopolet.no/p/${product.productId || product.code}`,
      images: product.images ? [{ url: product.images[0] }] : [],
      volume: product.volume || null,
      alcohol: product.alcoholContent || product.alcohol || null,
      country: product.country || null,
      region: product.district || product.region || null,
      productAvailability: product.buyable || false,
      stock: []
    }));

    // Cache the results (skip if table doesn't exist yet)
    try {
      await supabase
        .from('vinmonopolet_cache')
        .upsert({
          cache_key: cacheKey,
          producer: producer || null,
          wine_name: wineName || null,
          products: products,
          cached_at: new Date().toISOString()
        }, {
          onConflict: 'cache_key'
        });
    } catch (err) {
      console.log('Cache write failed (table may not exist yet):', err.message);
      // Continue without caching
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600'
      },
      body: JSON.stringify({
        products,
        cached: false,
        totalResults: filteredResults.length
      }),
    };

  } catch (error) {
    console.error('Error searching Vinmonopolet:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Kunne ikke søke i Vinmonopolet',
        details: error.message
      }),
    };
  }
};
