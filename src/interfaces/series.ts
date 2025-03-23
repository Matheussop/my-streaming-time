import { ICommonMedia } from "./commonMedia";

export interface IEpisode {
  _id: string;
  episodeNumber: number;
  title: string;
  plot: string;
  durationInMinutes: number;
  releaseDate: string;
  poster: string;
}

export interface ISeason{
  _id: string;
  seriesId: string;
  seasonNumber: number;
  title: string;
  plot: string;
  releaseDate: string;
  poster?: string;
  episodes?: IEpisode[];
  episodeCount?: number;
}

export interface ISeasonSummary {
  seasonId: string;
  seasonNumber: number;
  title: string;
  episodeCount: number;
  releaseDate: string;
}

export interface ISeries extends ICommonMedia {
  totalEpisodes: number;
  totalSeasons: number;
  seasonsSummary?: ISeasonSummary[];
}
