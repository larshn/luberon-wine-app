import { useState, useEffect } from 'react';
import { supabase, isSupabaseEnabled } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthProps {
  onAuthChange?: (user: User | null) => void;
}

export default function Auth({ onAuthChange }: AuthProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isSupabaseEnabled()) {
      setLoading(false);
      return;
    }

    // Check active session
    supabase?.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
      onAuthChange?.(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase!.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      onAuthChange?.(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [onAuthChange]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase!.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage('Sjekk e-posten din for bekreftelseslenke!');
      } else {
        const { error } = await supabase!.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        setMessage('Logget inn!');
        setShowAuth(false);
      }
    } catch (error: any) {
      setMessage(error.message || 'En feil oppstod');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase!.auth.signOut();
      setMessage('Logget ut');
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  // If Supabase is not enabled, don't show anything
  if (!isSupabaseEnabled()) {
    return null;
  }

  if (loading && !user) {
    return (
      <div className="flex items-center gap-2 text-sm" style={{ color: '#78716c' }}>
        <div style={{
          width: '16px',
          height: '16px',
          border: '2px solid #d97706',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        Laster...
      </div>
    );
  }

  if (user) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.5rem 1rem',
        background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
        borderRadius: '12px',
        border: '1px solid #fbbf24'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: '600',
            fontSize: '14px'
          }}>
            {user.email?.charAt(0).toUpperCase()}
          </div>
          <span style={{ fontSize: '14px', color: '#78716c', fontWeight: '500' }}>
            {user.email}
          </span>
        </div>
        <button
          onClick={handleSignOut}
          style={{
            padding: '0.375rem 0.75rem',
            fontSize: '13px',
            background: 'white',
            border: '1px solid #d6d3d1',
            borderRadius: '8px',
            color: '#57534e',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#fafaf9';
            e.currentTarget.style.borderColor = '#a8a29e';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.borderColor = '#d6d3d1';
          }}
        >
          Logg ut
        </button>
      </div>
    );
  }

  if (!showAuth) {
    return (
      <button
        onClick={() => setShowAuth(true)}
        style={{
          padding: '0.625rem 1.25rem',
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.2s',
          boxShadow: '0 2px 8px rgba(217, 119, 6, 0.25)'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(217, 119, 6, 0.35)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(217, 119, 6, 0.25)';
        }}
      >
        🔐 Logg inn
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      zIndex: 50
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
        maxWidth: '420px',
        width: '100%',
        padding: '2rem',
        animation: 'fadeIn 0.2s ease-out'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem'
        }}>
          <div>
            <h2 style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#292524',
              marginBottom: '0.25rem'
            }}>
              {isSignUp ? '🍷 Opprett konto' : '🍷 Velkommen tilbake'}
            </h2>
            <p style={{
              fontSize: '14px',
              color: '#78716c'
            }}>
              {isSignUp ? 'Synkroniser kjelleren din på tvers av enheter' : 'Logg inn for å synkronisere kjelleren din'}
            </p>
          </div>
          <button
            onClick={() => {
              setShowAuth(false);
              setMessage('');
            }}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: 'none',
              background: '#f5f5f4',
              color: '#78716c',
              fontSize: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#e7e5e4';
              e.currentTarget.style.color = '#292524';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#f5f5f4';
              e.currentTarget.style.color = '#78716c';
            }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleEmailAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label htmlFor="email" style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#44403c',
              marginBottom: '0.5rem'
            }}>
              📧 E-post
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '2px solid #e7e5e4',
                borderRadius: '12px',
                fontSize: '15px',
                outline: 'none',
                transition: 'all 0.2s'
              }}
              placeholder="din@epost.no"
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#f59e0b';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e7e5e4';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          <div>
            <label htmlFor="password" style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#44403c',
              marginBottom: '0.5rem'
            }}>
              🔑 Passord
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '2px solid #e7e5e4',
                borderRadius: '12px',
                fontSize: '15px',
                outline: 'none',
                transition: 'all 0.2s'
              }}
              placeholder="Minimum 6 tegn"
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#f59e0b';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e7e5e4';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          {message && (
            <div style={{
              padding: '1rem',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '500',
              background: message.includes('feil') || message.includes('Error')
                ? 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)'
                : 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
              color: message.includes('feil') || message.includes('Error') ? '#991b1b' : '#065f46',
              border: message.includes('feil') || message.includes('Error')
                ? '1px solid #fca5a5'
                : '1px solid #6ee7b7'
            }}>
              {message.includes('feil') || message.includes('Error') ? '❌ ' : '✅ '}
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.875rem 1.5rem',
              background: loading ? '#d6d3d1' : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: loading ? 'none' : '0 4px 12px rgba(217, 119, 6, 0.3)',
              opacity: loading ? 0.6 : 1
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(217, 119, 6, 0.4)';
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(217, 119, 6, 0.3)';
              }
            }}
          >
            {loading ? '⏳ Vennligst vent...' : isSignUp ? '✨ Opprett konto' : '🍷 Logg inn'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setMessage('');
            }}
            style={{
              fontSize: '14px',
              color: '#d97706',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              textDecoration: 'underline',
              transition: 'color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.color = '#b45309'}
            onMouseOut={(e) => e.currentTarget.style.color = '#d97706'}
          >
            {isSignUp ? 'Har du allerede en konto? Logg inn' : 'Ny bruker? Registrer deg'}
          </button>
        </div>

        <div style={{
          marginTop: '2rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #e7e5e4'
        }}>
          <p style={{
            fontSize: '13px',
            color: '#78716c',
            textAlign: 'center',
            lineHeight: '1.6'
          }}>
            💡 Med en konto synkroniseres vinkjelleren din på tvers av enheter
          </p>
        </div>
      </div>
    </div>
  );
}
