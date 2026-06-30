import { Hono } from "hono";
import { z } from "zod";
import type { AppBindings, AppVariables } from "../types/hono";
import { createPullRequest } from "../services/github";

type Env = { Bindings: AppBindings; Variables: AppVariables };

const submitRoute = new Hono<Env>();

const submitBody = z.object({
  token: z.string().min(1),
  series: z.string().min(1),
  season: z.number().int().positive(),
  episode: z.number().int().positive(),
  markers: z
    .array(
      z.object({
        type: z.enum(["INTRO", "RECAP", "OPENING", "ENDING", "CREDITS", "POST_CREDIT", "LOGO", "OTHER"]),
        start: z.number().min(0),
        end: z.number().min(0),
        confidence: z.number().min(0).max(1).optional(),
        source: z.string().optional(),
      })
    )
    .min(1),
  comment: z.string().max(500).optional(),
});

submitRoute.post("/", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const parsed = submitBody.safeParse(body);

  if (!parsed.success) {
    return c.json({ error: "Invalid submission", details: parsed.error.flatten() }, 400);
  }

  const { token, series, season, episode, markers, comment } = parsed.data;

  for (const m of markers) {
    if (m.start >= m.end) {
      return c.json({ error: `Marker ${m.type}: start must be before end` }, 400);
    }
  }

  try {
    const result = await createPullRequest(token, {
      series,
      season,
      episode,
      markers: markers.map((m) => ({
        type: m.type,
        start: m.start,
        end: m.end,
        confidence: m.confidence ?? 0.95,
        source: m.source ?? "manual",
      })),
      contributor: "web-contributor",
    });

    return c.json({
      success: true,
      pr_url: result.html_url,
      pr_number: result.number,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return c.json({ error: message }, 500);
  }
});

export default submitRoute;
