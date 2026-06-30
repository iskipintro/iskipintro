import type { EpisodeMarkersResponse, MarkerWithConfidence } from "../types";
import { markers } from "../db/schema";
import { eq, and } from "drizzle-orm";

export function groupMarkersByType(
  markerList: MarkerWithConfidence[]
): EpisodeMarkersResponse {
  const result: EpisodeMarkersResponse = {};

  for (const marker of markerList) {
    const type = marker.type.toLowerCase() as keyof EpisodeMarkersResponse;
    if (!result[type]) {
      result[type] = {
        start: marker.startTime,
        end: marker.endTime,
      };
    }
  }

  return result;
}

export async function getMarkersForEpisode(
  db: any,
  episodeId: number
): Promise<EpisodeMarkersResponse> {
  const result = await db
    .select()
    .from(markers)
    .where(and(eq(markers.episodeId, episodeId), eq(markers.verified, true)))
    .all();

  return groupMarkersByType(
    result.map((m: any) => ({
      type: m.type,
      startTime: m.startTime,
      endTime: m.endTime,
      confidence: m.confidence,
    }))
  );
}
