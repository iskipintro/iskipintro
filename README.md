# iSkipIntro

The world's largest open database for playback metadata. Think "TMDB for skip intro/credits."

**Status:** Phase 1

## Contribute Markers

<!-- ACTION BUTTON -->
<a href="./actions/workflows/submit-marker.yml">
  <img src="https://img.shields.io/badge/➡️_Submit_Marker-Run_Workflow-f59e0b?style=for-the-badge" alt="Submit Marker">
</a>

<a href="./issues/new?template=submit-marker.yml">
  <img src="https://img.shields.io/badge/📝_Submit_via_Issue-Open_Form-2563eb?style=for-the-badge" alt="Submit via Issue">
</a>

<a href="./tree/main/data">
  <img src="https://img.shields.io/badge/📂_Browse_Data-View_Files-059669?style=for-the-badge" alt="Browse Data">
</a>

### How it works

**1. Click "Submit Marker"** → fills out the form in GitHub Actions

**2. Workflow creates a PR** → YAML file added to `data/` automatically

**3. Maintainer merges** → data deploys to the API. You get credit on your GitHub profile.

No forks, no Git commands, no manual YAML editing needed.

Contributors submit markers via the web form or by editing YAML files directly. Every submission becomes a **pull request** on the [iskipintro-data](https://github.com/anomalyco/iskipintro-data) repository.

```
User fills form → GitHub API creates branch → Pull Request → GitHub Actions validate → Merge → Auto-deploy to D1
```

No database access needed. GitHub is the CMS.

## Quick Start

```bash
pnpm install
npx wrangler d1 create iskipintro-db
# update wrangler.jsonc with the database_id
pnpm db:generate
pnpm db:migrate
pnpm db:seed
pnpm dev
```

## Tech Stack

| Layer | Choice |
|-------|--------|
| Runtime | Cloudflare Workers |
| Language | TypeScript |
| Framework | Hono |
| Database | Cloudflare D1 |
| ORM | Drizzle |
| Validation | Zod |
| Auth | JWT / API Keys |
| Deployment | Wrangler |

## Folder Structure

```
iskipintro/
  app/            — Entry point, landing page
  api/            — API versioning
  data/           — YAML marker files (the open dataset)
  db/             — Schema, migrations, seed data
  middleware/     — Auth, rate limiting
  routes/         — Route handlers
  services/       — Business logic (anime import, GitHub PR)
  schemas/        — Zod validation schemas
  types/          — TypeScript type definitions
  utils/          — Helpers
  docs/           — API documentation
  .github/        — GitHub Actions workflows
```

## API Endpoints

### Search
```
GET /v1/search?q=breaking+bad
```

### Movies
```
GET /v1/movie/{id}
```
Accepts TMDB ID (`680`) or IMDb ID (`tt0110912`).

### Series
```
GET /v1/series/{id}
```
Accepts TMDB ID or IMDb ID.

### Seasons
```
GET /v1/season/{id}
```

### Episodes
```
GET /v1/episode/{id}
```

### Markers
```
GET /v1/markers/{episode_id}
```

```json
{
  "intro":    { "start": 41.2, "end": 132.4 },
  "recap":    { "start": 0,   "end": 41 },
  "credits":  { "start": 3021, "end": 3101 }
}
```

### Popular / Recent / Stats
```
GET /v1/popular
GET /v1/recent
GET /v1/stats
```

### Import Anime (Admin)
```
POST /v1/import/jikan   {"id": 1}     # MyAnimeList via Jikan API
POST /v1/import/anilist {"id": 1}     # AniList GraphQL API
POST /v1/import/kitsu   {"id": 1}     # Kitsu JSON:API
```
Fetches series + episodes from the source and upserts into the database.

## Database Schema

| Table | Purpose |
|-------|---------|
| `movies` | Movie metadata (TMDB, IMDb, MAL, AniList, Kitsu) |
| `series` | TV series and anime metadata |
| `seasons` | Season numbers linked to series |
| `episodes` | Episode metadata linked to seasons |
| `markers` | Timestamps for intro/recap/credits/etc |
| `users` | User accounts |
| `submissions` | Community marker submissions |
| `votes` | Up/down votes on submissions |

### Marker Types
`INTRO` `RECAP` `OPENING` `ENDING` `CREDITS` `POST_CREDIT` `LOGO` `OTHER`

## Roadmap

### Phase 1 (current)
- [x] API with Hono + D1 + Drizzle
- [x] Search, episode, marker lookup
- [x] Landing page + Submit Marker form + GitHub login
- [x] Seed data with real marker examples
- [x] Open source (MIT)
- [x] Anime data import (Jikan/MAL, AniList, Kitsu APIs)
- [x] IMDb ID support alongside TMDB
- [x] YAML-based data repository (`data/` directory)
- [x] GitHub PR contribution workflow (form → branch → PR → merge → deploy)
- [x] GitHub Actions: validate data PRs, auto-deploy on merge
- [x] GitHub OAuth login for non-technical contributors

### Phase 2
- [ ] User authentication (JWT)
- [ ] Marker submission
- [ ] Voting system
- [ ] Confidence scoring

### Phase 3
- [ ] Admin dashboard
- [ ] Moderation tools
- [ ] Public statistics
- [ ] Contributor profiles

### Phase 4
- [ ] AI-assisted marker detection
- [ ] Video fingerprinting
- [ ] SDKs (JS, Python, Go, Rust)
- [ ] Media player plugins (Jellyfin, Kodi, Plex, MPV, VLC)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

All contributions are welcome — whether it's adding markers for your favorite show, fixing a bug, or building new features.

## License

MIT
