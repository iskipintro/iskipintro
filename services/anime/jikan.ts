import type { AnimeSeriesData, AnimeEpisodeData } from "./types";

const BASE = "https://api.jikan.moe/v4";

interface JikanAnime {
  mal_id: number;
  title: string;
  title_english?: string;
  images: {
    jpg: { large_image_url?: string; image_url?: string };
  };
  year?: number;
  aired?: { from?: string };
  episodes?: number;
  type?: string;
  scoring?: number;
}

interface JikanEpisode {
  mal_id: number;
  title?: string;
  title_japanese?: string;
  episode: number;
  aired?: string;
  score?: number;
  filler?: boolean;
  recap?: boolean;
  forum_url?: string;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchSeries(malId: string): Promise<AnimeSeriesData> {
  const res = await fetch(`${BASE}/anime/${malId}`);
  if (!res.ok) {
    throw new Error(`Jikan API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json() as { data: JikanAnime };
  const data = json.data;
  const year = data.year ?? (data.aired?.from ? new Date(data.aired.from).getFullYear() : undefined);

  return {
    malId: data.mal_id,
    title: data.title_english ?? data.title,
    poster: data.images.jpg.large_image_url ?? data.images.jpg.image_url,
    year,
  };
}

export async function fetchEpisodes(malId: string): Promise<AnimeEpisodeData[]> {
  const episodes: AnimeEpisodeData[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const res = await fetch(`${BASE}/anime/${malId}/episodes?page=${page}`);
    if (!res.ok) break;

    const json = await res.json() as { data: JikanEpisode[]; pagination: { has_next_page: boolean } };
    const pageData = json.data;

    for (const ep of pageData) {
      episodes.push({
        episodeNumber: ep.episode,
        malEpisodeId: ep.mal_id,
        title: ep.title,
        airDate: ep.aired,
      });
    }

    hasMore = json.pagination.has_next_page;
    page++;
    await sleep(400);
  }

  return episodes;
}

export async function fetchSeriesWithEpisodes(malId: string): Promise<AnimeSeriesData> {
  const series = await fetchSeries(malId);
  const episodes = await fetchEpisodes(malId);
  series.episodes = episodes;
  return series;
}
