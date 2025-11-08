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
    const { wineName, producer, vintage } = event.queryStringParameters || {};

    if (!wineName && !producer) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Må oppgi wineName eller producer'
        }),
      };
    }

    // Build search query
    const searchQuery = `${producer || ''} ${wineName || ''}`.trim();

    // Check cache first
    const cacheKey = `${producer || ''}_${wineName || ''}_${vintage || ''}`.toLowerCase().replace(/\s+/g, '_');

    try {
      const { data: cachedData } = await supabase
        .from('vivino_cache')
        .select('*')
        .eq('cache_key', cacheKey)
        .single();

      // Return cached data if fresh (less than 7 days old)
      if (cachedData) {
        const cacheAge = new Date() - new Date(cachedData.cached_at);
        const daysOld = cacheAge / (1000 * 60 * 60 * 24);

        if (daysOld < 7) {
          return {
            statusCode: 200,
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'public, max-age=86400'
            },
            body: JSON.stringify({
              wine: cachedData.wine_data,
              cached: true,
              cachedAt: cachedData.cached_at
            }),
          };
        }
      }
    } catch (err) {
      console.log('Cache check failed:', err.message);
    }

    // Search Vivino using search endpoint
    console.log(`Searching Vivino for: "${searchQuery}"`);

    const vivinoUrl = 'https://www.vivino.com/api/wines/search';
    const params = new URLSearchParams({
      q: searchQuery,
      limit: '5'
    });

    const response = await fetch(`${vivinoUrl}?${params}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.vivino.com/',
        'Origin': 'https://www.vivino.com'
      }
    });

    if (!response.ok) {
      console.error(`Vivino API error: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error(`Response body: ${errorText}`);
      throw new Error(`Vivino API feilet: ${response.status}`);
    }

    const data = await response.json();
    const matches = data.wines || [];

    if (matches.length === 0) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wine: null, message: 'Ingen treff funnet' }),
      };
    }

    // Take the best match (first result)
    const topMatch = matches[0];

    // Handle different API response structures
    const wine = topMatch.wine || topMatch;

    const result = {
      id: wine.id,
      name: wine.name,
      producer: wine.winery?.name || null,
      vintage: wine.vintage || vintage || null,
      rating: wine.statistics?.ratings_average || wine.rating?.average || null,
      ratingsCount: wine.statistics?.ratings_count || wine.rating?.count || 0,
      price: wine.price?.amount || null,
      currency: wine.price?.currency || null,
      image: wine.image?.location || wine.image?.thumb_url || wine.image?.url || null,
      url: `https://www.vivino.com/w/${wine.id}`,
      region: wine.region?.name || null,
      country: wine.region?.country?.name || wine.country || null
    };

    // Cache the result
    try {
      await supabase
        .from('vivino_cache')
        .upsert({
          cache_key: cacheKey,
          wine_name: wineName || null,
          producer: producer || null,
          vintage: vintage || null,
          wine_data: result,
          cached_at: new Date().toISOString()
        }, {
          onConflict: 'cache_key'
        });
    } catch (err) {
      console.log('Cache write failed:', err.message);
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=86400'
      },
      body: JSON.stringify({
        wine: result,
        cached: false
      }),
    };

  } catch (error) {
    console.error('Error searching Vivino:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Kunne ikke søke i Vivino',
        details: error.message
      }),
    };
  }
};
