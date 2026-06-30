<p align="center">
  <strong style="font-size: 2.5em;">iSkipIntro</strong>
</p>

<p align="center">
  <b>The open playback metadata database</b><br>
  Machine-readable skip-intro, skip-recap, and credits timestamps for every movie, series, and anime.
</p>

<p align="center">
  <a href="https://api.sujeetunbeatable.workers.dev"><b>API</b></a> ·
  <a href="https://github.com/iskipintro/iskipintro"><b>GitHub</b></a> ·
  <a href="https://github.com/iskipintro/iskipintro/blob/main/CONTRIBUTING.md"><b>Contributing</b></a> ·
  <a href="LICENSE"><b>MIT License</b></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fapi.sujeetunbeatable.workers.dev%2Fv1%2Fstats&query=%24.series&label=Series&color=8A2BE2" alt="Series">
  <img src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fapi.sujeetunbeatable.workers.dev%2Fv1%2Fstats&query=%24.movies&label=Movies&color=00C853" alt="Movies">
  <img src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fapi.sujeetunbeatable.workers.dev%2Fv1%2Fstats&query=%24.anime&label=Anime&color=FF6D00" alt="Anime">
  <img src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fapi.sujeetunbeatable.workers.dev%2Fv1%2Fstats&query=%24.episodes&label=Episodes&color=2962FF" alt="Episodes">
  <img src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fapi.sujeetunbeatable.workers.dev%2Fv1%2Fstats&query=%24.markers&label=Markers&color=FF1744" alt="Markers">
  <br>
  <img src="https://img.shields.io/badge/API-Hono_+_D1_+_Drizzle-000000?logo=cloudflare" alt="Stack">
  <img src="https://img.shields.io/badge/data-YAML_with_PRs-181717?logo=github" alt="Data">
</p>

---

## Getting Started

```bash
curl https://api.sujeetunbeatable.workers.dev/v1/stats
```

Returns live database statistics — no API key required.

### Search

```bash
curl "https://api.sujeetunbeatable.workers.dev/v1/search?q=breaking+bad"
```

### Movie Markers

```bash
curl https://api.sujeetunbeatable.workers.dev/v1/movies/155/timestamps
```

### Series Markers

```bash
curl https://api.sujeetunbeatable.workers.dev/v1/series/1396/timestamps
curl https://api.sujeetunbeatable.workers.dev/v1/series/1396/season/1/episode/1/timestamps
```

### Popular & Recent

```bash
curl https://api.sujeetunbeatable.workers.dev/v1/popular
curl https://api.sujeetunbeatable.workers.dev/v1/recent
```

## Data Format

All contributions are stored as plain YAML in the [data/](https://github.com/iskipintro/iskipintro/tree/main/data) directory, organized by content type:

```
data/
├── movies/
│   ├── the-dark-knight.yaml
│   └── ...
└── series/
    ├── breaking-bad/
    │   └── season-01/
    │       ├── episode-01.yaml
    │       └── ...
    └── ...
```

## Contributing

Submit markers via [GitHub Issues](https://github.com/iskipintro/iskipintro/issues/new/choose) or by running the [Submit Marker workflow](https://github.com/iskipintro/iskipintro/actions/workflows/submit-marker.yml). A pull request is created automatically — no forking or Git required.

Supported marker types: `INTRO`, `RECAP`, `OPENING`, `ENDING`, `CREDITS`, `POST_CREDIT`, `LOGO`, `OTHER`

## Stack

| Layer | Technology |
|-------|-----------|
| Runtime | [Cloudflare Workers](https://workers.cloudflare.com/) |
| Framework | [Hono](https://hono.dev/) |
| Database | [D1 (SQLite)](https://developers.cloudflare.com/d1/) |
| ORM | [Drizzle](https://orm.drizzle.team/) |
| Validation | [Zod](https://zod.dev/) |
| Data storage | YAML + Git |
| Deployment | GitHub Actions |

## License

MIT — see [LICENSE](LICENSE).
