// Simple test function to verify Netlify Functions are working
exports.handler = async (event) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'Netlify Function is working!',
      timestamp: new Date().toISOString(),
      env_check: {
        has_anthropic_key: !!process.env.ANTHROPIC_API_KEY,
        has_supabase_url: !!process.env.VITE_SUPABASE_URL,
        has_service_key: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      }
    }),
  };
};
