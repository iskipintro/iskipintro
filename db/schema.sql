-- iSkipIntro D1 Schema
-- Run this on a fresh D1 database before deploying data

CREATE TABLE IF NOT EXISTS movies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tmdb_id INTEGER UNIQUE,
  imdb_id TEXT UNIQUE,
  mal_id INTEGER UNIQUE,
  anilist_id INTEGER UNIQUE,
  kitsu_id INTEGER UNIQUE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  year INTEGER,
  poster TEXT,
  backdrop TEXT,
  created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE IF NOT EXISTS series (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tmdb_id INTEGER UNIQUE,
  imdb_id TEXT UNIQUE,
  mal_id INTEGER UNIQUE,
  anilist_id INTEGER UNIQUE,
  kitsu_id INTEGER UNIQUE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  poster TEXT,
  backdrop TEXT,
  created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE IF NOT EXISTS seasons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  series_id INTEGER NOT NULL REFERENCES series(id),
  season_number INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS episodes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  season_id INTEGER NOT NULL REFERENCES seasons(id),
  episode_number INTEGER NOT NULL,
  tmdb_episode_id INTEGER,
  imdb_id TEXT,
  mal_episode_id INTEGER,
  anilist_episode_id INTEGER,
  title TEXT,
  runtime INTEGER,
  air_date TEXT,
  aired TEXT
);

CREATE TABLE IF NOT EXISTS markers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  episode_id INTEGER NOT NULL REFERENCES episodes(id),
  type TEXT NOT NULL,
  start_time REAL NOT NULL,
  end_time REAL NOT NULL,
  confidence REAL DEFAULT 1.0,
  verified INTEGER DEFAULT 0,
  source TEXT NOT NULL DEFAULT 'manual',
  created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  updated_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'USER',
  api_key TEXT UNIQUE,
  created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE IF NOT EXISTS submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  marker_id INTEGER REFERENCES markers(id),
  user_id INTEGER REFERENCES users(id),
  episode_id INTEGER REFERENCES episodes(id),
  type TEXT NOT NULL,
  start_time REAL NOT NULL,
  end_time REAL NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING',
  created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE IF NOT EXISTS votes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  submission_id INTEGER NOT NULL REFERENCES submissions(id),
  user_id INTEGER NOT NULL REFERENCES users(id),
  vote TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_series_title ON series(title);
CREATE INDEX IF NOT EXISTS idx_series_slug ON series(slug);
CREATE INDEX IF NOT EXISTS idx_seasons_series ON seasons(series_id);
CREATE INDEX IF NOT EXISTS idx_episodes_season ON episodes(season_id);
CREATE INDEX IF NOT EXISTS idx_markers_episode ON markers(episode_id);
CREATE INDEX IF NOT EXISTS idx_markers_type ON markers(type);
