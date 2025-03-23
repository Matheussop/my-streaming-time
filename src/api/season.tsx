import { IEpisode } from "@interfaces/series";
import { AppError } from "@lib/appError";
import axiosInstance from "@lib/axiosConfig";

export const seasonApi = {
  // Get episodes by season number
  getEpisodesBySeasonNumber: async (serieId: string, season: number): Promise<IEpisode[]> => {
    try {
      const response = await axiosInstance.get(`/seasons/episodes/${serieId}/${season}`);
      return response.data;
    } catch (err) {
      throw AppError.fromError(err);
    }
  },
};
