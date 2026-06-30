import type { AnimeSeriesData, AnimeEpisodeData } from "./types";

const BASE = "https://kitsu.io/api/edge";

interface KitsuAnime {
  id: string;
  attributes: {
    slug: string;
    canonicalTitle: string;
    titles: Record<string, string>;
    synopsis?: string;
    posterImage?: { large?: string; medium?: string; original?: string };
    coverImage?: { large?: string; original?: string };
    startDate?: string;
    episodeCount?: number;
    averageRating?: string;
  };
}

interface KitsuEpisode {
  id: string;
  attributes: {
    number: number;
    canonicalTitle?: string;
    titles?: Record<string, string>;
    synopsis?: string;
    airdate?: string;
    length?: number;
    thumbnail?: { original?: string };
  };
}

function kitsuFetch(path: string) {
  return fetch(`${BASE}${path}`, {
    headers: { Accept: "application/vnd.api+json" },
  });
}

export async function fetchSeries(kitsuId: string): Promise<AnimeSeriesData> {
  const res = await kitsuFetch(`/anime/${kitsuId}`);
  if (!res.ok) {
    throw new Error(`Kitsu API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json() as { data: KitsuAnime };
  const data = json.data;
  const attrs = data.attributes;

  return {
    kitsuId: Number(data.id),
    title: attrs.canonicalTitle,
    poster: attrs.posterImage?.large ?? attrs.posterImage?.medium,
    backdrop: attrs.coverImage?.large ?? attrs.coverImage?.original,
    year: attrs.startDate ? new Date(attrs.startDate).getFullYear() : undefined,
  };
}

export async function fetchEpisodes(kitsuId: string): Promise<AnimeEpisodeData[]> {
  const episodes: AnimeEpisodeData[] = [];
  let pageOffset = 0;

  while (true) {
    const res = await kitsuFetch(`/anime/${kitsuId}/episodes?page[limit]=20&page[offset]=${pageOffset}`);
    if (!res.ok) break;

    const json = await res.json() as { data: KitsuEpisode[]; links?: { next?: string } };
    const pageData = json.data;
    if (pageData.length === 0) break;

    for (const ep of pageData) {
      const attrs = ep.attributes;
      episodes.push({
        episodeNumber: attrs.number,
        title: attrs.canonicalTitle,
        runtime: attrs.length,
        airDate: attrs.airdate,
      });
    }

    if (!json.links?.next) break;
    pageOffset += 20;
  }

  return episodes;
}

export async function fetchSeriesWithEpisodes(kitsuId: string): Promise<AnimeSeriesData> {
  const series = await fetchSeries(kitsuId);
  const episodes = await fetchEpisodes(kitsuId);
  series.episodes = episodes;
  return series;
}
