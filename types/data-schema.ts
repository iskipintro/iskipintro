import { z } from "zod";

export const MarkerEntrySchema = z.object({
  type: z.enum(["INTRO", "RECAP", "OPENING", "ENDING", "CREDITS", "POST_CREDIT", "LOGO", "OTHER"]),
  start: z.number().min(0),
  end: z.number().min(0),
  confidence: z.number().min(0).max(1).optional(),
  source: z.enum(["manual", "jikan", "anilist", "kitsu", "tmdb", "imdb", "ai"]).optional(),
});

export const EpisodeDataSchema = z.object({
  series: z.string(),
  season: z.number().int().positive(),
  episode: z.number().int().positive(),
  title: z.string().optional(),
  markers: z.array(MarkerEntrySchema),
});

export type MarkerEntry = z.infer<typeof MarkerEntrySchema>;
export type EpisodeData = z.infer<typeof EpisodeDataSchema>;
