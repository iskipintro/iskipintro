# Contributing to iSkipIntro

We love contributions! This project is open source so that anyone can add playback metadata for their favorite shows.

## How to Contribute

### 1. Find or create an issue

- Browse [open issues](https://github.com/anomalyco/iskipintro/issues)
- If you want to work on something new, open an issue first so we can discuss it

### 2. Fork & clone

```bash
git clone https://github.com/YOUR_USERNAME/iskipintro.git
cd iskipintro
pnpm install
```

### 3. Create a branch

```bash
git checkout -b feat/your-feature-name
```

### 4. Make your changes

- Follow the existing code style
- Run `pnpm typecheck` to check for TypeScript errors
- Add seed data if you're adding new content

### 5. Commit

Use conventional commits:

```
feat: add markers for Rick and Morty
fix: correct end timestamp for Breaking Bad S1E1
docs: update API examples
```

### 6. Push & PR

```bash
git push origin feat/your-feature-name
```

Open a pull request against `main`. Include:

- What your change does
- How to test it
- Any related issue numbers

## What You Can Contribute

### Add markers

The most valuable contribution! Add intro, recap, and credits timestamps for any TV show, anime, or movie.

1. Add the series to `db/seed.sql`
2. Add episodes and markers with accurate timestamps
3. Run `pnpm db:seed` to test

### Improve the API

- Add new endpoints
- Improve error handling
- Add rate limiting
- Add caching with Cloudflare KV

### Build features (Phase 2+)

- User authentication
- Marker submission & voting
- Admin dashboard
- AI detection

### Create SDKs

Wrap the API in your favorite language:

- JavaScript/TypeScript
- Python
- Go
- Rust
- Swift
- Kotlin

### Build plugins

Integrate iSkipIntro into media players:

- Jellyfin
- Kodi
- Plex
- Stremio
- MPV
- VLC

## Code Style

- TypeScript strict mode
- No semicolons (project convention)
- Use the existing patterns in routes/ and db/
- Validate inputs with Zod schemas

## Development

```bash
pnpm dev          # Start local dev server
pnpm typecheck    # Check types
pnpm db:generate  # Generate D1 migrations
pnpm db:migrate   # Apply migrations
pnpm db:seed      # Seed sample data
```

## Questions?

Open a [Discussion](https://github.com/anomalyco/iskipintro/discussions) or ask in an issue.
