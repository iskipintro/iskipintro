import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import type { AppBindings, AppVariables } from "../types/hono";
import { series as seriesTable, seasons } from "../db/schema";
import { eq } from "drizzle-orm";

type Env = { Bindings: AppBindings; Variables: AppVariables };

const seriesRoute = new Hono<Env>();

const tmdbIdParam = z.object({
  tmdb_id: z.coerce.number().int().positive(),
});

seriesRoute.get("/:tmdb_id", zValidator("param", tmdbIdParam), async (c) => {
  const { tmdb_id } = c.req.valid("param");
  const db = c.var.db;

  const result = await db
    .select()
    .from(seriesTable)
    .where(eq(seriesTable.tmdbId, tmdb_id))
    .all();

  if (result.length === 0) {
    return c.json({ error: "Series not found" }, 404);
  }

  const s = result[0];
  const seasonList = await db
    .select()
    .from(seasons)
    .where(eq(seasons.seriesId, s.id))
    .all();

  return c.json({ ...s, seasons: seasonList });
});

export default seriesRoute;
