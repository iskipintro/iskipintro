# iSkipIntro

The world's largest open database for playback metadata. Think "TMDB for skip intro/credits."

**Status:** Phase 1 — API, D1 database, search, episode/marker lookup, Swagger docs, and landing page.

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
  app/          — Entry point, landing page
  api/          — API versioning
  db/           — Schema, migrations, seed data
  middleware/   — Auth, rate limiting
  routes/       — Route handlers
  services/     — Business logic
  schemas/      — Zod validation schemas
  types/        — TypeScript type definitions
  utils/        — Helpers
  docs/         — API documentation
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

## Database Schema

| Table | Purpose |
|-------|---------|
| `movies` | Movie metadata from TMDB |
| `series` | TV series metadata |
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
- [x] Landing page + API docs
- [x] Seed data with real marker examples
- [x] Open source (MIT)

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
