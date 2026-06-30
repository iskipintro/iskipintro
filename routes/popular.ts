import { Hono } from "hono";
import type { AppBindings, AppVariables } from "../types/hono";
import { series, movies } from "../db/schema";
import { sql } from "drizzle-orm";

type Env = { Bindings: AppBindings; Variables: AppVariables };

const popularRoute = new Hono<Env>();

popularRoute.get("/", async (c) => {
  const db = c.var.db;

  const [popularSeries, popularMovies] = await Promise.all([
    db
      .select({
        id: series.id,
        tmdbId: series.tmdbId,
        title: series.title,
        poster: series.poster,
      })
      .from(series)
      .orderBy(sql`RANDOM()`)
      .limit(20)
      .all(),
    db
      .select({
        id: movies.id,
        tmdbId: movies.tmdbId,
        title: movies.title,
        poster: movies.poster,
        year: movies.year,
      })
      .from(movies)
      .orderBy(sql`RANDOM()`)
      .limit(10)
      .all(),
  ]);

  return c.json({
    series: popularSeries,
    movies: popularMovies,
  });
});

export default popularRoute;
