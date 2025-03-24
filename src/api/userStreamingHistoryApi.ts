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
};
