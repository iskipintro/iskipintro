import { eq } from "drizzle-orm";
import { series, seasons, episodes } from "../../db/schema";
import type { AnimeSeriesData } from "./types";
import * as jikan from "./jikan";
import * as anilist from "./anilist";
import * as kitsu from "./kitsu";

type DbInstance = any;

export async function importFromJikan(db: DbInstance, malId: string) {
  const data = await jikan.fetchSeriesWithEpisodes(malId);
  return upsertAnimeSeries(db, data);
}

export async function importFromAnilist(db: DbInstance, anilistId: string) {
  const data = await anilist.fetchSeriesWithEpisodes(anilistId);
  return upsertAnimeSeries(db, data);
}

export async function importFromKitsu(db: DbInstance, kitsuId: string) {
  const data = await kitsu.fetchSeriesWithEpisodes(kitsuId);
  return upsertAnimeSeries(db, data);
}

async function upsertAnimeSeries(db: DbInstance, data: AnimeSeriesData) {
  const existing = data.malId
    ? await db.select().from(series).where(eq(series.malId, data.malId)).all()
    : data.anilistId
      ? await db.select().from(series).where(eq(series.anilistId, data.anilistId)).all()
      : data.kitsuId
        ? await db.select().from(series).where(eq(series.kitsuId, data.kitsuId)).all()
        : [];

  let seriesId: number;

  if (existing.length > 0) {
    seriesId = existing[0].id;
  } else {
    const insertData: Record<string, unknown> = {
      title: data.title,
      poster: data.poster ?? null,
      backdrop: data.backdrop ?? null,
      year: data.year ?? null,
    };
    if (data.malId) insertData.malId = data.malId;
    if (data.anilistId) insertData.anilistId = data.anilistId;
    if (data.kitsuId) insertData.kitsuId = data.kitsuId;
    if (data.tmdbId) insertData.tmdbId = data.tmdbId;
    if (data.imdbId) insertData.imdbId = data.imdbId;

    const result = await db.insert(series).values(insertData as any).returning();
    seriesId = result[0].id;
  }

  const seasonList = await db
    .select()
    .from(seasons)
    .where(eq(seasons.seriesId, seriesId))
    .all();

  let currentSeason = seasonList.length > 0 ? seasonList[0] : null;

  if (!currentSeason) {
    const result = await db
      .insert(seasons)
      .values({ seriesId, seasonNumber: 1 })
      .returning();
    currentSeason = result[0];
  }

  for (const ep of data.episodes ?? []) {
    const existingEp = ep.malEpisodeId
      ? await db
          .select()
          .from(episodes)
          .where(eq(episodes.malEpisodeId, ep.malEpisodeId))
          .all()
      : [];

    if (existingEp.length === 0) {
      const epData: Record<string, unknown> = {
        seasonId: currentSeason.id,
        episodeNumber: ep.episodeNumber,
        title: ep.title ?? null,
        runtime: ep.runtime ?? null,
        airDate: ep.airDate ?? null,
      };
      if (ep.malEpisodeId) epData.malEpisodeId = ep.malEpisodeId;
      if (ep.anilistEpisodeId) epData.anilistEpisodeId = ep.anilistEpisodeId;

      await db.insert(episodes).values(epData as any).returning();
    }
  }

  return { seriesId, seasonId: currentSeason.id };
}
