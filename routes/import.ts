import { Hono } from "hono";
import { z } from "zod";
import type { AppBindings, AppVariables } from "../types/hono";
import { importFromJikan, importFromAnilist, importFromKitsu } from "../services/anime/import";

type Env = { Bindings: AppBindings; Variables: AppVariables };

const importRoute = new Hono<Env>();

const importBody = z.object({
  id: z.union([z.string(), z.number()]),
});

importRoute.post("/jikan", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const parsed = importBody.safeParse(body);
  if (!parsed.success) return c.json({ error: "id required" }, 400);

  const db = c.var.db;
  const result = await importFromJikan(db, String(parsed.data.id));
  return c.json({ success: true, ...result });
});

importRoute.post("/anilist", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const parsed = importBody.safeParse(body);
  if (!parsed.success) return c.json({ error: "id required" }, 400);

  const db = c.var.db;
  const result = await importFromAnilist(db, String(parsed.data.id));
  return c.json({ success: true, ...result });
});

importRoute.post("/kitsu", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const parsed = importBody.safeParse(body);
  if (!parsed.success) return c.json({ error: "id required" }, 400);

  const db = c.var.db;
  const result = await importFromKitsu(db, String(parsed.data.id));
  return c.json({ success: true, ...result });
});

export default importRoute;
