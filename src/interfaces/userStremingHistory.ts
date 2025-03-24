export interface IEpisodeWatched {
  episodeId: string;
  seasonNumber: number;
  episodeNumber: number;
  watchedAt: Date;
  watchedDurationInMinutes: number;
  completionPercentage: number;
}
export interface ISeriesProgress {
  totalEpisodes: number;
  watchedEpisodes: number;
  lastWatched?: {
    seasonNumber: number;
    episodeNumber: number;
    episodeId: string;
    completionPercentage: number;
    watchedAt: Date;
  };
  episodesWatched: Record<string, IEpisodeWatched>;
  nextToWatch?: {
    seasonNumber: number;
    episodeNumber: number;
    episodeId: string;
  };
  completed: boolean;
}
export interface IWatchHistoryEntry {
  contentId: string; // Reference to content (movie/series)
  contentType: "movie" | "series";
  title: string; // Denormalized for performance
  seriesProgress?: Record<string, ISeriesProgress>;
  watchedAt?: Date; // When it was watched
  watchedDurationInMinutes: number;
  completionPercentage?: number; // 0-100%
  rating?: number; // User rating
}

export interface IUserStreamingHistory {
  userId: string;
  watchHistory: IWatchHistoryEntry[];
  totalWatchTimeInMinutes?: number;
}
