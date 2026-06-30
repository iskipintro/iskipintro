import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import type { AppBindings, AppVariables } from "../types/hono";
import { episodes, seasons, series as seriesTable } from "../db/schema";
import { eq } from "drizzle-orm";

type Env = { Bindings: AppBindings; Variables: AppVariables };

const episodeRoute = new Hono<Env>();

const episodeIdParam = z.object({
  id: z.coerce.number().int().positive(),
});

episodeRoute.get("/:id", zValidator("param", episodeIdParam), async (c) => {
  const { id } = c.req.valid("param");
  const db = c.var.db;

  const episodeList = await db
    .select()
    .from(episodes)
    .where(eq(episodes.id, id))
    .all();

  if (episodeList.length === 0) {
    return c.json({ error: "Episode not found" }, 404);
  }

  const episode = episodeList[0];
  const seasonList = await db
    .select()
    .from(seasons)
    .where(eq(seasons.id, episode.seasonId))
    .all();

  const season = seasonList[0];
  const seriesList = await db
    .select()
    .from(seriesTable)
    .where(eq(seriesTable.id, season.seriesId))
    .all();

  const seriesInfo = seriesList[0];

  return c.json({
    ...episode,
    season_number: season.seasonNumber,
    series_id: season.seriesId,
    series_title: seriesInfo?.title ?? null,
  });
});

export default episodeRoute;
