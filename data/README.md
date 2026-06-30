# iSkipIntro Data

This directory is the **single source of truth** for all playback metadata.

## Structure

```
data/
  series/
    <series-name>/
      season-<N>/
        episode-<N>.yaml
  movies/
    <movie-name>.yaml
```

## Adding markers

1. Find or create the YAML file for the episode/movie
2. Add your markers:

```yaml
series: Series Name
season: 1
episode: 1
title: Episode Title
markers:
  - type: INTRO
    start: 90
    end: 132.4
    confidence: 0.99
    source: manual
  - type: CREDITS
    start: 3021
    end: 3101
    confidence: 0.95
    source: manual
```

## Marker Types

`INTRO` `RECAP` `OPENING` `ENDING` `CREDITS` `POST_CREDIT` `LOGO` `OTHER`

## Source Field

- `manual` — hand-timed by a contributor
- `jikan` — imported from MyAnimeList via Jikan API
- `anilist` — imported from AniList
- `kitsu` — imported from Kitsu
- `tmdb` — from TMDB
- `imdb` — from IMDb
- `ai` — AI-detected

## Validation

All PRs are automatically validated by GitHub Actions:

- YAML syntax check
- Schema validation (required fields, types)
- Timestamp order (start < end)
- No duplicates across markers
- Episode matches existing series/season

## Preview

Merged PRs automatically deploy to the API.
