import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import type { AppBindings, AppVariables } from "../types/hono";
import { series, movies } from "../db/schema";
import { like } from "drizzle-orm";

type Env = { Bindings: AppBindings; Variables: AppVariables };

const searchRoute = new Hono<Env>();

const searchQuery = z.object({
  q: z.string().min(1).max(200),
});

searchRoute.get("/", zValidator("query", searchQuery), async (c) => {
  const { q } = c.req.valid("query");
  const db = c.var.db;
  const query = `%${q}%`;

  const [seriesResults, movieResults] = await Promise.all([
    db
      .select({ id: series.id, tmdbId: series.tmdbId, imdbId: series.imdbId, title: series.title, poster: series.poster })
      .from(series)
      .where(like(series.title, query))
      .all(),
    db
      .select({ id: movies.id, tmdbId: movies.tmdbId, imdbId: movies.imdbId, title: movies.title, poster: movies.poster, year: movies.year })
      .from(movies)
      .where(like(movies.title, query))
      .all(),
  ]);

  const results = [
    ...seriesResults.map((s) => ({
      type: "series" as const,
      id: s.id,
      tmdb_id: s.tmdbId,
      imdb_id: s.imdbId,
      title: s.title,
      poster: s.poster,
      year: null as number | null,
    })),
    ...movieResults.map((m) => ({
      type: "movie" as const,
      id: m.id,
      tmdb_id: m.tmdbId,
      imdb_id: m.imdbId,
      title: m.title,
      poster: m.poster,
      year: m.year,
    })),
  ];

  return c.json(results);
});

export default searchRoute;
