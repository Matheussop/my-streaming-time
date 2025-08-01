import { IEpisode } from "@interfaces/series";
import axiosInstance from "@lib/axiosConfig";

export const userStreamingHistoryApi = {
  markIsViewed: async (
    userId: string,
    contentId: string,
    episodeData: IEpisode,
  ) => {
    const response = await axiosInstance.post(
      `/user-streaming-history/add-episode`,
      {
        userId,
        contentId,
        episodeData,
      },
    );
    return response.data.history;
  },

  unMarkIsViewed: async (
    userId: string,
    contentId: string,
    episodeId: string,
  ) => {
    const response = await axiosInstance.delete(
      `/user-streaming-history/remove-episode`,
      {
        params: {
          userId,
          contentId,
          episodeId,
        },
      },
    );
    return response.data.history;
  },

  getEpisodesWatched: async (userId: string, contentId: string) => {
    const response = await axiosInstance.get(
      `/user-streaming-history/get-episodes-watched`,
      {
        params: {
          userId,
          contentId,
        },
      },
    );
    return response.data;
  },

  getStats: async (userId: string) => {
    const response = await axiosInstance.get(`/statistics/${userId}`);
    return response.data;
  },

  markSeasonWatched: async (
    userId: string,
    contentId: string,
    seasonNumber: number,
  ) => {
    const response = await axiosInstance.post(
      `/user-streaming-history/mark-season-watched`,
      {
        userId,
        contentId,
        seasonNumber,
      },
    );
    return response.data.history;
  },

  unMarkSeasonWatched: async (
    userId: string,
    contentId: string,
    seasonNumber: number,
  ) => {
    const response = await axiosInstance.post(
      `/user-streaming-history/unMark-season-watched`,
      {
        userId,
        contentId,
        seasonNumber,
      },
    );
    return response.data.history;
  },
};
