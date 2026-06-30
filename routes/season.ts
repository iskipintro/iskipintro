import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import type { AppBindings, AppVariables } from "../types/hono";
import { seasons, episodes } from "../db/schema";
import { eq } from "drizzle-orm";

type Env = { Bindings: AppBindings; Variables: AppVariables };

const seasonRoute = new Hono<Env>();

const seasonIdParam = z.object({
  id: z.coerce.number().int().positive(),
});

seasonRoute.get("/:id", zValidator("param", seasonIdParam), async (c) => {
  const { id } = c.req.valid("param");
  const db = c.var.db;

  const seasonList = await db
    .select()
    .from(seasons)
    .where(eq(seasons.id, id))
    .all();

  if (seasonList.length === 0) {
    return c.json({ error: "Season not found" }, 404);
  }

  const season = seasonList[0];
  const episodeList = await db
    .select()
    .from(episodes)
    .where(eq(episodes.seasonId, season.id))
    .orderBy(episodes.episodeNumber)
    .all();

  return c.json({ ...season, episodes: episodeList });
});

export default seasonRoute;
