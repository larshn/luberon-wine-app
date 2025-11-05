import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Service role key for server-side access
);

export const handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse request body
    const { question, cellarWines, userToken } = JSON.parse(event.body);

    if (!userToken) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Ikke autentisert. Vennligst logg inn.' }),
      };
    }

    // Verify user authentication with Supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser(userToken);

    if (authError || !user) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Ugyldig autentisering.' }),
      };
    }

    // Check if user is authorized to use AI features
    const { data: authCheck, error: authCheckError } = await supabase
      .from('authorized_ai_users')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (authCheckError || !authCheck) {
      return {
        statusCode: 403,
        body: JSON.stringify({
          error: 'Du har ikke tilgang til AI-funksjonalitet. Kontakt administrator for tilgang.',
          code: 'UNAUTHORIZED_AI_ACCESS'
        }),
      };
    }

    // Build context about user's cellar
    const cellarContext = cellarWines && cellarWines.length > 0
      ? `Brukerens vinkjeller inneholder:\n${cellarWines.map(w =>
          `- ${w.wine.name} (${w.wine.producer}) - ${w.vintage.year}, ${w.quantity} flasker`
        ).join('\n')}`
      : 'Brukeren har ingen viner i kjelleren ennå.';

    // Call Claude API
    const message = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: `Du er en ekspert sommelier med spesialkunnskap om Luberon-viner fra Provence, Frankrike.

${cellarContext}

Brukerens spørsmål: ${question}

Vennligst gi et hjelpsomt, personlig svar basert på brukerens vinkjeller og spørsmål.
Svar på norsk, og vær konsis men informativ. Hvis relevant, gi anbefalinger om:
- Mattilbehør
- Lagringstid
- Serveingstemperatur
- Andre viner fra Luberon som kan være interessante`
      }],
    });

    // Extract text response
    const responseText = message.content[0].type === 'text'
      ? message.content[0].text
      : 'Beklager, kunne ikke generere svar.';

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        response: responseText,
        usage: {
          inputTokens: message.usage.input_tokens,
          outputTokens: message.usage.output_tokens,
        }
      }),
    };

  } catch (error) {
    console.error('Error in AI sommelier function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'En feil oppstod ved behandling av forespørselen.',
        details: error.message
      }),
    };
  }
};
