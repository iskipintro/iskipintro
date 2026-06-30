import { Hono } from "hono";
import { z } from "zod";
import type { AppBindings, AppVariables } from "../types/hono";
import { movies } from "../db/schema";
import { eq } from "drizzle-orm";

type Env = { Bindings: AppBindings; Variables: AppVariables };

const movieRoute = new Hono<Env>();

const idParam = z.object({
  id: z.string().min(1),
});

movieRoute.get("/:id", async (c) => {
  const raw = c.req.param("id");
  const parsed = idParam.safeParse({ id: raw });
  if (!parsed.success) {
    return c.json({ error: "Invalid ID" }, 400);
  }

  const { id } = parsed.data;
  const db = c.var.db;

  if (id.startsWith("tt")) {
    const result = await db.select().from(movies).where(eq(movies.imdbId, id)).all();
    if (result.length === 0) return c.json({ error: "Movie not found" }, 404);
    return c.json(result[0]);
  }

  const tmdbId = Number(id);
  if (isNaN(tmdbId)) return c.json({ error: "Invalid ID" }, 400);

  const result = await db.select().from(movies).where(eq(movies.tmdbId, tmdbId)).all();

  if (result.length === 0) {
    return c.json({ error: "Movie not found" }, 404);
  }

  return c.json(result[0]);
});

export default movieRoute;
