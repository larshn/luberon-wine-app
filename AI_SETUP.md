# AI Sommelier Oppsett

Dette dokumentet forklarer hvordan du setter opp AI Sommelier-funksjonen i Luberon Wine App.

## Oversikt

AI Sommelier gir personlige vinråd basert på brukerens vinkjeller ved hjelp av Claude AI. Funksjonen har innebygd sikkerhet slik at bare godkjente brukere kan bruke den.

## Steg 1: Sett opp autorisert bruker-tabell i Supabase

1. Logg inn på [Supabase Dashboard](https://app.supabase.com)
2. Velg ditt prosjekt
3. Gå til **SQL Editor**
4. Åpne filen `supabase/authorized_users_schema.sql`
5. Kopier innholdet og kjør det i SQL Editor
6. Hent din user ID:
   ```sql
   SELECT id, email FROM auth.users;
   ```
7. Autoriser deg selv:
   ```sql
   INSERT INTO authorized_ai_users (user_id, authorized_by, notes)
   VALUES ('DIN-USER-ID-HER', 'Initial setup', 'App creator');
   ```

## Steg 2: Få Anthropic API-nøkkel

1. Gå til [Anthropic Console](https://console.anthropic.com/)
2. Opprett en konto eller logg inn
3. Du får $5 gratis kredit når du registrerer deg
4. Gå til **Settings** → **API Keys**
5. Klikk **Create Key**
6. Kopier API-nøkkelen (den vises bare én gang!)

## Steg 3: Få Supabase Service Role Key

1. Gå til [Supabase Dashboard](https://app.supabase.com)
2. Velg ditt prosjekt
3. Gå til **Settings** → **API**
4. Under "Project API keys", finn **service_role** nøkkelen
5. Klikk for å vise og kopiere den

⚠️ **VIKTIG:** Service Role Key har full tilgang til databasen. Hold den hemmelig!

## Steg 4: Legg til environment variables i Netlify

1. Logg inn på [Netlify](https://app.netlify.com)
2. Velg ditt site
3. Gå til **Site settings** → **Environment variables**
4. Legg til følgende variabler (marker alle som "Secret"):

   - **ANTHROPIC_API_KEY**: Din Anthropic API-nøkkel fra steg 2
   - **SUPABASE_SERVICE_ROLE_KEY**: Service role key fra steg 3
   - **VITE_SUPABASE_URL**: Samme som du allerede har satt opp
   - **VITE_SUPABASE_ANON_KEY**: Samme som du allerede har satt opp

5. Klikk **Save** for hver variabel

## Steg 5: Deploy til Netlify

1. Commit og push endringene til GitHub:
   ```bash
   git add .
   git commit -m "Add AI Sommelier feature with authorization"
   git push
   ```

2. Netlify vil automatisk bygge og deploye appen med de nye Netlify Functions

## Steg 6: Test funksjonen

1. Gå til din Netlify URL
2. Logg inn med din bruker
3. Gå til **Min Vinkjeller**
4. Legg til noen viner hvis du ikke har gjort det allerede
5. Klikk på **🤖 AI Sommelier** knappen
6. Prøv å stille et spørsmål som "Hvilken vin bør jeg drikke først?"

## Autorisere flere brukere

For å gi andre brukere tilgang til AI-funksjonen:

1. Få dem til å registrere seg og logge inn i appen
2. Finn deres user ID i Supabase:
   ```sql
   SELECT id, email FROM auth.users WHERE email = 'deres@email.no';
   ```
3. Legg dem til i authorized_ai_users tabellen:
   ```sql
   INSERT INTO authorized_ai_users (user_id, authorized_by, notes)
   VALUES ('DERES-USER-ID', 'Din email', 'Godkjent bruker');
   ```

## Kostnader

AI Sommelier bruker Claude 3.5 Haiku modellen:
- **Input**: ~$1 per 1 million tokens
- **Output**: ~$5 per 1 million tokens

Typisk kostnad per spørsmål: **$0.003-0.005** (ca. 3-5 øre)

Med $5 gratis kredit kan du få ca. **1000-1500 AI-spørsmål** gratis.

## Feilsøking

### "Du har ikke tilgang til AI-funksjonalitet"
- Sjekk at din user ID er lagt til i `authorized_ai_users` tabellen
- Logg ut og inn igjen

### "En feil oppstod ved behandling av forespørselen"
- Sjekk at alle environment variables er satt i Netlify
- Sjekk Netlify Function logs: **Functions** → **ai-sommelier** → **Function log**

### "Kunne ikke kontakte AI-tjenesten"
- Sjekk at appen er deployet til Netlify (ikke bare lokal)
- Åpne browser console for mer detaljert feilmelding
- Sjekk at ANTHROPIC_API_KEY er gyldig

## Lokal utvikling

For å teste lokalt, installer Netlify CLI:

```bash
npm install -g netlify-cli
cd netlify/functions
npm install
cd ../..
netlify dev
```

Sett environment variables i `.env`:
```
ANTHROPIC_API_KEY=your-key
SUPABASE_SERVICE_ROLE_KEY=your-key
VITE_SUPABASE_URL=your-url
VITE_SUPABASE_ANON_KEY=your-key
```

⚠️ **VIKTIG:** Ikke commit `.env` til Git! Den er allerede i `.gitignore`.

## Sikkerhet

Funksjonen har flere sikkerhetslag:

1. **Autentisering**: Kun innloggede brukere kan kalle funksjonen
2. **Autorisering**: Kun brukere i `authorized_ai_users` tabellen får svar
3. **Row Level Security**: Supabase RLS forhindrer uautorisert tilgang
4. **Server-side validering**: All validering skjer i Netlify Function

Dette sikrer at ingen kan misbruke API-nøkkelen selv om de finner URL-en til funksjonen.
