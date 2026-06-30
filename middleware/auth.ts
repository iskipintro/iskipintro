import type { Context, Next } from "hono";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export async function apiKeyAuth(c: Context, next: Next) {
  const apiKey = c.req.header("x-api-key");

  if (!apiKey) {
    return c.json({ error: "API key required" }, 401);
  }

  const db = c.get("db");
  const result = await db
    .select()
    .from(users)
    .where(eq(users.apiKey, apiKey))
    .all();

  if (result.length === 0) {
    return c.json({ error: "Invalid API key" }, 401);
  }

  c.set("user", result[0]);
  await next();
}
