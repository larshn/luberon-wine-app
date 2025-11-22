const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

exports.handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight request
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { barcode } = JSON.parse(event.body);

    if (!barcode) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Strekkode mangler' }),
      };
    }

    // Use Claude to find wine information based on barcode
    const message = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 2048,
      messages: [{
        role: 'user',
        content: `Du er en vinekspert. Jeg har skannet en strekkode på en vinflaske: ${barcode}

Basert på denne strekkoden (EAN-13 eller UPC), prøv å identifisere vinen. Bruk din kunnskap om vinprodusenter og deres produkter.

VIKTIG: Du MÅ svare med et JSON-objekt i følgende format, UTEN noen ekstra tekst før eller etter:

Hvis du finner vinen:
{
  "found": true,
  "wine": {
    "name": "Vinens navn",
    "producer": "Produsentens navn",
    "region": "Region/appellation",
    "country": "Land",
    "color": "red" eller "white" eller "rosé",
    "grapes": ["Druesort1", "Druesort2"],
    "vintage": null eller årstall hvis kjent,
    "description": "Kort beskrivelse av vinen",
    "alcoholContent": alkoholprosent som tall (f.eks. 13.5),
    "foodPairings": ["Mattype1", "Mattype2"]
  }
}

Hvis du IKKE finner vinen:
{
  "found": false,
  "message": "Kort forklaring på hvorfor"
}

Svar KUN med JSON, ingen annen tekst.`
      }],
    });

    // Extract the response text
    const responseText = message.content[0].type === 'text'
      ? message.content[0].text.trim()
      : null;

    if (!responseText) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Kunne ikke få svar fra AI' }),
      };
    }

    // Try to parse the JSON response
    try {
      // Remove markdown code blocks if present
      let jsonText = responseText;
      if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/```json?\n?/g, '').replace(/```$/g, '').trim();
      }

      const result = JSON.parse(jsonText);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(result),
      };
    } catch (parseError) {
      console.error('Failed to parse AI response:', responseText);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          found: false,
          message: 'Kunne ikke identifisere vinen fra strekkoden. Prøv å søke manuelt.',
          rawResponse: responseText,
        }),
      };
    }

  } catch (error) {
    console.error('Error in wine lookup function:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'En feil oppstod ved søk etter vin.',
        details: error.message,
      }),
    };
  }
};
