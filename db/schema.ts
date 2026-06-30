import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const movies = sqliteTable("movies", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  tmdbId: integer("tmdb_id").unique(),
  imdbId: text("imdb_id").unique(),
  malId: integer("mal_id").unique(),
  anilistId: integer("anilist_id").unique(),
  kitsuId: integer("kitsu_id").unique(),
  title: text("title").notNull(),
  slug: text("slug").unique(),
  year: integer("year"),
  poster: text("poster"),
  backdrop: text("backdrop"),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const series = sqliteTable("series", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  tmdbId: integer("tmdb_id").unique(),
  imdbId: text("imdb_id").unique(),
  malId: integer("mal_id").unique(),
  anilistId: integer("anilist_id").unique(),
  kitsuId: integer("kitsu_id").unique(),
  title: text("title").notNull(),
  slug: text("slug").unique(),
  poster: text("poster"),
  backdrop: text("backdrop"),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const seasons = sqliteTable("seasons", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  seriesId: integer("series_id")
    .notNull()
    .references(() => series.id),
  seasonNumber: integer("season_number").notNull(),
});

export const episodes = sqliteTable("episodes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  seasonId: integer("season_id")
    .notNull()
    .references(() => seasons.id),
  episodeNumber: integer("episode_number").notNull(),
  tmdbEpisodeId: integer("tmdb_episode_id"),
  imdbId: text("imdb_id"),
  malEpisodeId: integer("mal_episode_id"),
  anilistEpisodeId: integer("anilist_episode_id"),
  title: text("title"),
  runtime: integer("runtime"),
  airDate: text("air_date"),
  aired: text("aired"),
});

export const markers = sqliteTable("markers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  episodeId: integer("episode_id")
    .notNull()
    .references(() => episodes.id),
  type: text("type").notNull(),
  startTime: real("start_time").notNull(),
  endTime: real("end_time").notNull(),
  confidence: real("confidence").default(1.0),
  verified: integer("verified", { mode: "boolean" }).default(false),
  source: text("source").notNull().default("manual"),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("USER"),
  apiKey: text("api_key").unique(),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const submissions = sqliteTable("submissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  markerId: integer("marker_id").references(() => markers.id),
  userId: integer("user_id").references(() => users.id),
  episodeId: integer("episode_id").references(() => episodes.id),
  type: text("type").notNull(),
  startTime: real("start_time").notNull(),
  endTime: real("end_time").notNull(),
  status: text("status").notNull().default("PENDING"),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const votes = sqliteTable("votes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  submissionId: integer("submission_id")
    .notNull()
    .references(() => submissions.id),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  vote: text("vote").notNull(),
});
