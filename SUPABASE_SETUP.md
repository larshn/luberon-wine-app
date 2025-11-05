# 🗄️ Supabase Setup Guide

Denne guiden viser hvordan du setter opp Supabase for persistent lagring av vinkjelleren din.

## 📋 Hva du trenger

- En gratis Supabase-konto (https://supabase.com)
- 10-15 minutter

## 🚀 Steg-for-steg oppsett

### Steg 1: Opprett Supabase-prosjekt

1. Gå til **https://supabase.com**
2. Klikk på "Start your project"
3. Logg inn med GitHub (anbefalt) eller e-post
4. Klikk "New Project"
5. Fyll ut:
   - **Name**: `luberon-wine-app` (eller valgfritt navn)
   - **Database Password**: Lag et sterkt passord (lagre dette!)
   - **Region**: Velg nærmeste region (f.eks. `Europe West (London)`)
6. Klikk "Create new project"
7. Vent 1-2 minutter mens prosjektet settes opp

### Steg 2: Opprett database-tabeller

1. I Supabase-dashboardet, klikk på "SQL Editor" i venstre meny
2. Klikk "New Query"
3. Åpne filen `supabase/schema.sql` i dette prosjektet
4. Kopier **hele** innholdet fra `schema.sql`
5. Lim inn i SQL Editor i Supabase
6. Klikk "Run" (eller trykk Cmd/Ctrl + Enter)
7. Du skal se melding: "Success. No rows returned"

**Sjekk at det fungerte:**
- Gå til "Table Editor" i venstre meny
- Du skal se tabellen `cellar_wines`

### Steg 3: Hent API-nøkler

1. I Supabase-dashboardet, klikk på "Settings" (tannhjul-ikonet)
2. Klikk på "API" i venstre meny
3. Finn:
   - **Project URL** - Noe som: `https://xxxyyzzz.supabase.co`
   - **anon public** key - En lang tekst-streng

### Steg 4: Konfigurer appen lokalt

1. I prosjektroten, kopier `.env.example` til `.env`:
   ```bash
   cp .env.example .env
   ```

2. Åpne `.env` og fyll inn verdiene fra Supabase:
   ```env
   VITE_SUPABASE_URL=https://xxxyyzzz.supabase.co
   VITE_SUPABASE_ANON_KEY=din-anon-key-her
   ```

3. Start utviklingsserveren på nytt:
   ```bash
   npm run dev
   ```

### Steg 5: Konfigurer Netlify (for produksjon)

1. Gå til Netlify Dashboard
2. Velg ditt prosjekt
3. Gå til "Site configuration" → "Environment variables"
4. Legg til to nye variabler:
   - **Key**: `VITE_SUPABASE_URL`
     **Value**: Din Supabase Project URL
   - **Key**: `VITE_SUPABASE_ANON_KEY`
     **Value**: Din Supabase anon public key

5. Redeploy siden:
   - Gå til "Deploys"
   - Klikk "Trigger deploy" → "Deploy site"

## ✅ Test at det fungerer

1. Åpne appen i nettleseren
2. Du skal se "Logg inn / Registrer"-knapp i toppen
3. Klikk og registrer en ny bruker
4. Sjekk e-posten din for bekreftelseslenke (hvis email confirmation er aktivert)
5. Legg til en vin i kjelleren
6. Gå til Supabase Dashboard → Table Editor → `cellar_wines`
7. Du skal se vinen din i databasen! 🎉

## 🔐 Sikkerhet

Appen bruker Supabase Row Level Security (RLS):
- ✅ Brukere ser kun sine egne viner
- ✅ Brukere kan kun endre sine egne viner
- ✅ All kommunikasjon er kryptert (HTTPS)

## 🔄 Migrering fra Local Storage

Hvis du allerede har viner lagret i Local Storage:

1. Logg inn med den nye autentiseringen
2. Dine eksisterende viner vil automatisk bli synkronisert til Supabase
3. Vinene vil nå være tilgjengelige på alle enheter hvor du logger inn

## 📱 Bruke på flere enheter

1. Åpne appen på en annen enhet
2. Logg inn med samme e-post/passord
3. Din vinkjeller synkroniseres automatisk!

## 🆘 Feilsøking

### "Supabase credentials not found"
- Sjekk at `.env`-filen eksisterer og har riktige verdier
- Restart utviklingsserveren

### "User not found" eller "Invalid login credentials"
- Dobbelsjekk e-post og passord
- Sjekk om du må bekrefte e-posten din først

### Viner vises ikke
- Sjekk at du er logget inn
- Åpne nettleserens konsoll (F12) for feilmeldinger
- Gå til Supabase Dashboard og sjekk "Table Editor"

### Email confirmation
Som standard krever Supabase e-postbekreftelse. For å deaktivere dette (kun utvikling):
1. Gå til Supabase Dashboard
2. Authentication → Settings
3. Finn "Enable email confirmations"
4. Slå av

## 💰 Kostnader

**Supabase Free Tier inkluderer:**
- ✅ 500 MB database
- ✅ 1 GB fillagring
- ✅ 2 GB båndbredde per måned
- ✅ 50,000 monthly active users
- ✅ Social OAuth providers

Dette er **mer enn nok** for personlig bruk! 🎉

## 📚 Mer informasjon

- [Supabase Dokumentasjon](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

**Tips:** Appen fungerer fortsatt offline og med Local Storage hvis Supabase ikke er konfigurert!
