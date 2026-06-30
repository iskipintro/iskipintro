export interface AnimeSeriesData {
  title: string;
  malId?: number;
  anilistId?: number;
  kitsuId?: number;
  tmdbId?: number;
  imdbId?: string;
  poster?: string;
  backdrop?: string;
  year?: number;
  episodes?: AnimeEpisodeData[];
}

export interface AnimeEpisodeData {
  episodeNumber: number;
  malEpisodeId?: number;
  anilistEpisodeId?: number;
  title?: string;
  runtime?: number;
  airDate?: string;
}

export interface AnimeSource {
  name: string;
  fetchSeries(id: string): Promise<AnimeSeriesData>;
}
