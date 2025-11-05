import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Wine, Vintage } from '../types/wine';

type CellarWineWithDetails = {
  wine: Wine;
  vintage: Vintage;
  quantity: number;
};

interface AISommelierProps {
  cellarWines: CellarWineWithDetails[];
}

export default function AISommelier({ cellarWines }: AISommelierProps) {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPanel, setShowPanel] = useState(false);

  const suggestedQuestions = [
    'Hvilken vin bør jeg drikke først?',
    'Hva passer til en sommerfest?',
    'Hvilke viner kan lagres lengst?',
    'Anbefal en vin til biff',
    'Hva er en god startvin for nybegynnere?',
  ];

  const handleAskAI = async () => {
    if (!question.trim()) {
      setError('Vennligst skriv inn et spørsmål');
      return;
    }

    setLoading(true);
    setError('');
    setResponse('');

    try {
      // Get current user's session token
      if (!supabase) {
        setError('Supabase er ikke konfigurert');
        setLoading(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        setError('Du må være innlogget for å bruke AI-funksjonen');
        setLoading(false);
        return;
      }

      // Call Netlify Function
      const result = await fetch('/.netlify/functions/ai-sommelier', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question.trim(),
          cellarWines,
          userToken: session.access_token,
        }),
      });

      const data = await result.json();

      if (!result.ok) {
        if (data.code === 'UNAUTHORIZED_AI_ACCESS') {
          setError(data.error);
        } else {
          setError(data.error || 'En feil oppstod');
        }
        setLoading(false);
        return;
      }

      setResponse(data.response);
      setQuestion(''); // Clear question after successful response

    } catch (err: any) {
      console.error('Error calling AI sommelier:', err);
      setError('Kunne ikke kontakte AI-tjenesten. Sjekk konsollen for detaljer.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestedQuestion = (suggested: string) => {
    setQuestion(suggested);
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="btn btn-primary"
        style={{
          width: '100%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          fontSize: '1.1rem',
          padding: '1rem',
        }}
      >
        🤖 AI Sommelier {showPanel ? '▼' : '▶'}
      </button>

      {showPanel && (
        <div className="card" style={{ marginTop: '1rem', background: '#f9f9fb' }}>
          <h3 style={{ marginBottom: '1rem', color: '#667eea' }}>
            Spør AI om vinråd
          </h3>

          <p style={{ color: '#666', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Få personlige anbefalinger basert på vinene i din kjeller
          </p>

          {/* Suggested questions */}
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.5rem', color: '#555' }}>
              Foreslåtte spørsmål:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {suggestedQuestions.map((sq, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestedQuestion(sq)}
                  className="tag"
                  style={{
                    cursor: 'pointer',
                    background: '#fff',
                    border: '2px solid #e0e0e0',
                    padding: '0.5rem 1rem',
                  }}
                >
                  {sq}
                </button>
              ))}
            </div>
          </div>

          {/* Question input */}
          <div style={{ marginBottom: '1rem' }}>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Skriv ditt spørsmål her..."
              rows={3}
              className="input-area"
              style={{
                width: '100%',
                marginBottom: '1rem',
              }}
            />

            <button
              onClick={handleAskAI}
              disabled={loading || !question.trim()}
              className="btn btn-primary"
              style={{
                background: loading ? '#ccc' : '#667eea',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? '🤔 Tenker...' : '✨ Spør AI'}
            </button>
          </div>

          {/* Error display */}
          {error && (
            <div
              style={{
                padding: '1rem',
                background: '#fee2e2',
                border: '2px solid #fca5a5',
                borderRadius: '8px',
                color: '#991b1b',
                marginBottom: '1rem',
              }}
            >
              ⚠️ {error}
            </div>
          )}

          {/* Response display */}
          {response && (
            <div
              style={{
                padding: '1.5rem',
                background: '#fff',
                border: '2px solid #667eea',
                borderRadius: '8px',
                marginTop: '1rem',
              }}
            >
              <h4 style={{ marginBottom: '1rem', color: '#667eea' }}>
                💡 AI Sommelier anbefaler:
              </h4>
              <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', color: '#333' }}>
                {response}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
