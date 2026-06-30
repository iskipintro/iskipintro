import { Hono } from "hono";
import { z } from "zod";
import type { AppBindings, AppVariables } from "../types/hono";
import { series as seriesTable, seasons } from "../db/schema";
import { eq } from "drizzle-orm";

type Env = { Bindings: AppBindings; Variables: AppVariables };

const seriesRoute = new Hono<Env>();

const idParam = z.object({
  id: z.string().min(1),
});

seriesRoute.get("/:id", async (c) => {
  const raw = c.req.param("id");
  const parsed = idParam.safeParse({ id: raw });
  if (!parsed.success) {
    return c.json({ error: "Invalid ID" }, 400);
  }

  const { id } = parsed.data;
  const db = c.var.db;

  if (id.startsWith("tt")) {
    const result = await db.select().from(seriesTable).where(eq(seriesTable.imdbId, id)).all();
    if (result.length === 0) return c.json({ error: "Series not found" }, 404);
    const s = result[0];
    const seasonList = await db.select().from(seasons).where(eq(seasons.seriesId, s.id)).all();
    return c.json({ ...s, seasons: seasonList });
  }

  const tmdbId = Number(id);
  if (isNaN(tmdbId)) return c.json({ error: "Invalid ID" }, 400);

  const result = await db.select().from(seriesTable).where(eq(seriesTable.tmdbId, tmdbId)).all();

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
