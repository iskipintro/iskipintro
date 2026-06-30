import { Hono } from "hono";
import type { AppBindings, AppVariables } from "../types/hono";
import { markers, episodes, seasons, series as seriesTable } from "../db/schema";
import { desc, eq } from "drizzle-orm";

type Env = { Bindings: AppBindings; Variables: AppVariables };

const recentRoute = new Hono<Env>();

recentRoute.get("/", async (c) => {
  const db = c.var.db;

  const recentMarkers = await db
    .select({
      id: markers.id,
      episodeId: markers.episodeId,
      type: markers.type,
      startTime: markers.startTime,
      endTime: markers.endTime,
      createdAt: markers.createdAt,
    })
    .from(markers)
    .orderBy(desc(markers.createdAt))
    .limit(20)
    .all();

  return c.json(recentMarkers);
});

export default recentRoute;
