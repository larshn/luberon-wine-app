const vinmonopolet = require('vinmonopolet');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

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

    // Search Vinmonopolet
    console.log(`Searching Vinmonopolet for: "${searchQuery}"`);
    const results = await vinmonopolet.searchProducts(searchQuery);

    // Filter results for better matches
    const filteredResults = results.filter(product => {
      const productName = product.name.toLowerCase();
      const productProducer = (product.productSelection?.productType || '').toLowerCase();

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

      // Only include wines (exclude spirits, beer, etc)
      const isWine = product.category?.categoryName?.toLowerCase().includes('vin') ||
                     product.category?.mainCategory?.categoryName?.toLowerCase().includes('vin');

      return isWine;
    });

    // Map to simpler structure
    const products = filteredResults.slice(0, 5).map(product => ({
      code: product.code,
      name: product.name,
      price: product.price?.formattedValue || null,
      pricePerLiter: product.pricePerLiter?.formattedValue || null,
      url: `https://www.vinmonopolet.no/p/${product.code}`,
      images: product.images || [],
      volume: product.volume?.value || null,
      alcohol: product.alcohol?.value || null,
      country: product.geography?.mainCountry?.countryName || null,
      region: product.geography?.mainRegion?.regionName || null,
      productAvailability: product.productAvailability?.deliveryAvailability?.availableForPurchase || false,
      stock: product.productAvailability?.deliveryAvailability?.infos || []
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
