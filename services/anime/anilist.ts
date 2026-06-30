import type { AnimeSeriesData, AnimeEpisodeData } from "./types";

const ENDPOINT = "https://graphql.anilist.co";

const SERIES_QUERY = `
query ($id: Int) {
  Media(id: $id, type: ANIME) {
    id
    title {
      romaji
      english
      native
    }
    coverImage {
      large
      extraLarge
    }
    bannerImage
    startDate { year }
    episodes
    seasonYear
    idMal
    idTmdb
  }
}
`;

const EPISODES_QUERY = `
query ($id: Int, $page: Int, $perPage: Int) {
  Media(id: $id, type: ANIME) {
    episodesList: airingSchedule(perPage: $perPage, page: $page) {
      nodes {
        episode
        airingAt
        timeUntilAiring
      }
    }
  }
}
`;

function gql(query: string, variables: Record<string, unknown>) {
  return fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
}

export async function fetchSeries(anilistId: string): Promise<AnimeSeriesData> {
  const res = await gql(SERIES_QUERY, { id: Number(anilistId) });
  const json = await res.json() as {
    data: {
      Media: {
        id: number;
        title: { romaji?: string; english?: string; native?: string };
        coverImage: { large?: string; extraLarge?: string };
        bannerImage?: string;
        startDate?: { year?: number };
        episodes?: number;
        seasonYear?: number;
        idMal?: number;
        idTmdb?: number;
      };
    };
  };

  const data = json.data.Media;

  return {
    anilistId: data.id,
    malId: data.idMal,
    tmdbId: data.idTmdb,
    title: data.title.english ?? data.title.romaji ?? data.title.native ?? "Unknown",
    poster: data.coverImage.extraLarge ?? data.coverImage.large,
    backdrop: data.bannerImage ?? undefined,
    year: data.seasonYear ?? data.startDate?.year,
  };
}

export async function fetchEpisodes(anilistId: string): Promise<AnimeEpisodeData[]> {
  const episodes: AnimeEpisodeData[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const res = await gql(EPISODES_QUERY, { id: Number(anilistId), page, perPage: 50 });
    const json = await res.json() as {
      data: {
        Media: {
          episodesList: {
            nodes: Array<{
              episode: number;
              airingAt?: number;
              timeUntilAiring?: number;
            }>;
          };
        };
      };
    };

    const nodes = json.data?.Media?.episodesList?.nodes ?? [];
    if (nodes.length === 0) break;

    for (const ep of nodes) {
      episodes.push({
        episodeNumber: ep.episode,
        anilistEpisodeId: ep.episode,
        airDate: ep.airingAt ? new Date(ep.airingAt * 1000).toISOString().split("T")[0] : undefined,
      });
    }

    if (nodes.length < 50) hasMore = false;
    page++;
  }

  return episodes;
}

export async function fetchSeriesWithEpisodes(anilistId: string): Promise<AnimeSeriesData> {
  const series = await fetchSeries(anilistId);
  const episodes = await fetchEpisodes(anilistId);
  series.episodes = episodes;
  return series;
}
