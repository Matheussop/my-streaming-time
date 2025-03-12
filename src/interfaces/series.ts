import { ICommonMedia } from "./commonMedia";

interface ISeasonSummary {
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
