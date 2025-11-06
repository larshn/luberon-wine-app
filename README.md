# 🍷 Luberon på Glass

En omfattende webapp for å utforske og administrere viner fra Luberon-regionen i Provence, Frankrike.

## Funksjoner

### Vinkatalog
- **15 autentiske Luberon-viner** fra kjente produsenter som Château La Canorgue, Château Val Joanis, og flere
- Detaljert informasjon om hver vin inkludert druetyper, smaksnotater, og årgang
- Avansert søk og filtrering på tvers av alle felt
- Sortering etter navn, årgang, eller pris

### Lagringsanbefalinger
- Tydelige anbefalinger for når hver vin skal drikkes vs. lagres
- Visuell indikator for lagringstid (drikk nå, kort-/mellomlang-/langsiktig lagring)
- Optimalt drikkvindu basert på årgang
- Status for nåværende alder av vinen

### Matparinger
- Provencalske matanbefalinger for hver vin
- Detaljerte beskrivelser av rettene som passer best
- Inspirasjoner fra det franske kjøkken

### Min Vinkjeller
- Personlig oversikt over vinene du eier
- Legg til/fjern flasker fra din samling
- Notater og plasseringsinformasjon for hver vin
- Estimert verdi av samlingen
- **Eksport/import-funksjonalitet** for backup eller deling mellom enheter
- **AI Sommelier & Kokk** - AI-drevet vinassistent som kan:
  - Gi personlige vinråd basert på din kjeller
  - Anbefale konkrete viner fra katalogen du burde kjøpe
  - Lage oppskrifter med vinpairing
  - Foreslå menyer og matparinger
  - (krever godkjenning)

## Teknisk oppsett

- **React 19** med TypeScript
- **Vite** for rask utvikling og optimaliserte builds
- **Tailwind CSS v4** for moderne, responsivt design
- **Supabase** (valgfritt) for sky-basert lagring på tvers av enheter
- **Local Storage** som fallback - fungerer helt uten database
- Brukerautentisering med Supabase Auth

## Kom i gang

### Installasjon

```bash
npm install
```

### Kjør utviklingsserver

```bash
npm run dev
```

Appen vil åpne på `http://localhost:5173`

### Bygg for produksjon

```bash
npm run build
```

### Forhåndsvis produksjons-build

```bash
npm run preview
```

### Sett opp Supabase (valgfritt)

For å aktivere sky-basert lagring og synkronisering på tvers av enheter:

1. Les den detaljerte guiden: **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)**
2. Opprett en gratis Supabase-konto
3. Kjør SQL-scriptet i `supabase/schema.sql`
4. Legg til miljøvariabler i `.env` (se `.env.example`)

**Merk:** Appen fungerer perfekt uten Supabase også! Data lagres da kun lokalt i nettleseren.

### Sett opp AI Sommelier (valgfritt)

For å aktivere AI-baserte vinråd:

1. Les den detaljerte guiden: **[AI_SETUP.md](./AI_SETUP.md)**
2. Opprett en Anthropic API-konto (får $5 gratis kredit)
3. Autoriser brukere i Supabase
4. Legg til API-nøkler i Netlify miljøvariabler

AI Sommelier gir personlige anbefalinger basert på din vinkjeller. Funksjonen er sikret slik at bare godkjente brukere kan bruke den.

## Bruk

### Utforsk vinkataloget
1. Naviger til **Vinkatalog**-fanen
2. Bruk søkefeltet for å finne spesifikke viner, produsenter, eller druetyper
3. Filtrer på farge (rød, hvit, rosé) eller produsent
4. Sorter etter navn, årgang, eller pris
5. Klikk på en vin for å se fullstendige detaljer

### Administrer din vinkjeller
1. Fra vindetaljer, klikk "Legg til i kjeller"
2. Naviger til **Min Vinkjeller**-fanen for å se samlingen din
3. Legg til notater eller plassering for hver vin
4. Fjern flasker når du drikker dem
5. Eksporter din kjeller for backup

### Eksporter/importer kjeller
- **Eksport**: Klikk "Eksporter kjeller" for å laste ned en JSON-fil med samlingen
- **Import**: Klikk "Importer kjeller" og lim inn innholdet fra en eksportert fil

### Bruk AI Sommelier & Kokk
1. Naviger til **Min Vinkjeller**-fanen (krever at du er innlogget)
2. Klikk på **🤖 AI Sommelier & Kokk** for å åpne panelet
3. Velg mellom **Vinråd** eller **Matlagingsråd** fanen
4. Velg et foreslått spørsmål eller skriv ditt eget
5. Få personlige svar basert på din vinkjeller

**Vinråd - Eksempler:**
- "Hvilken vin bør jeg drikke først?"
- "Hvilke viner burde jeg kjøpe inn?" (AI anbefaler konkrete viner fra katalogen)
- "Anbefal viner jeg mangler for god variasjon"
- "Hva passer til en sommerfest?"
- "Anbefal en vin til biff"

**Matlagingsråd - Eksempler:**
- "Gi meg en oppskrift på bouillabaisse"
- "Lag en provencalsk meny med vinpairing"
- "Oppskrift på ratatouille som passer til mine viner"
- "Lag en treretters meny for 4 personer"

**Merk:** AI-funksjonen krever at du er godkjent. Se [AI_SETUP.md](./AI_SETUP.md) for oppsett.

## Vindata

Appen inneholder 15 håndplukkede viner fra Luberon AOP, inkludert:
- Château La Canorgue (kjent fra filmen "A Good Year")
- Château Val Joanis
- Domaine de Fontenille
- Château de Mille
- og flere...

Alle viner inkluderer autentisk informasjon om druetyper, smaksprofiler, og anbefalinger.

## Responsive design

Appen er fullstendig responsiv og fungerer like bra på:
- 📱 Mobil
- 💻 Desktop
- 📱 Tablet

## Lisens

Dette prosjektet er laget som et MVP-eksempel.

---

🍇 Laget med kjærlighet til Luberon-viner
