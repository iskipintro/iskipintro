import { Hono } from "hono";
import type { AppBindings, AppVariables } from "../types/hono";
import { series, episodes, markers, users } from "../db/schema";
import { sql } from "drizzle-orm";

type Env = { Bindings: AppBindings; Variables: AppVariables };

const statsRoute = new Hono<Env>();

statsRoute.get("/", async (c) => {
  const db = c.var.db;

  const [seriesResult, episodesResult, markersResult, contributorsResult] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(series).all(),
    db.select({ count: sql<number>`count(*)` }).from(episodes).all(),
    db.select({ count: sql<number>`count(*)` }).from(markers).all(),
    db.select({ count: sql<number>`count(*)` }).from(users).all(),
  ]);

  return c.json({
    series: seriesResult[0]?.count ?? 0,
    episodes: episodesResult[0]?.count ?? 0,
    markers: markersResult[0]?.count ?? 0,
    contributors: contributorsResult[0]?.count ?? 0,
  });
});

export default statsRoute;
