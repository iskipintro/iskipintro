import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import type { AppBindings, AppVariables } from "../types/hono";
import { movies } from "../db/schema";
import { eq } from "drizzle-orm";

type Env = { Bindings: AppBindings; Variables: AppVariables };

const movieRoute = new Hono<Env>();

const tmdbIdParam = z.object({
  tmdb_id: z.coerce.number().int().positive(),
});

movieRoute.get("/:tmdb_id", zValidator("param", tmdbIdParam), async (c) => {
  const { tmdb_id } = c.req.valid("param");
  const db = c.var.db;

  const result = await db
    .select()
    .from(movies)
    .where(eq(movies.tmdbId, tmdb_id))
    .all();

  if (result.length === 0) {
    return c.json({ error: "Movie not found" }, 404);
  }

  return c.json(result[0]);
});

export default movieRoute;
