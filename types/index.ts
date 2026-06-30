export type MarkerType =
  | "INTRO"
  | "RECAP"
  | "OPENING"
  | "ENDING"
  | "CREDITS"
  | "POST_CREDIT"
  | "LOGO"
  | "OTHER";

export type UserRole = "USER" | "MODERATOR" | "ADMIN";

export type SubmissionStatus = "PENDING" | "APPROVED" | "REJECTED";

export type VoteType = "UP" | "DOWN";

export interface MarkerResponse {
  start: number;
  end: number;
}

export interface MarkerWithConfidence {
  type: string;
  startTime: number;
  endTime: number;
  confidence: number | null;
}

export type EpisodeMarkersResponse = Partial<Record<Lowercase<MarkerType>, MarkerResponse>>;

export interface StatsResponse {
  series: number;
  episodes: number;
  markers: number;
  contributors: number;
}

export interface SearchResult {
  type: "series" | "movie";
  id: number;
  tmdb_id: number;
  title: string;
  poster: string | null;
  year: number | null;
}
