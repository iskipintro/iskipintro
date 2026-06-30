import { z } from "zod";

export const searchQuerySchema = z.object({
  q: z.string().min(1).max(200),
});

export const submitBodySchema = z.object({
  episode_id: z.number().int().positive(),
  type: z.enum([
    "INTRO",
    "RECAP",
    "OPENING",
    "ENDING",
    "CREDITS",
    "POST_CREDIT",
    "LOGO",
    "OTHER",
  ]),
  start: z.number().min(0),
  end: z.number().min(0),
});

export const voteBodySchema = z.object({
  submission_id: z.number().int().positive(),
  vote: z.enum(["UP", "DOWN"]),
});

export const reportBodySchema = z.object({
  marker_id: z.number().int().positive(),
  reason: z.string().min(1).max(500),
});

export const tmdbIdParamSchema = z.object({
  tmdb_id: z.coerce.number().int().positive(),
});

export const episodeIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const seasonIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});
