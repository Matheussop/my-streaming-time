import { IMovie } from "@interfaces/movie";
import { ISeries } from "@interfaces/series";
import { ICommonMedia } from "@interfaces/commonMedia";
import { AppError } from "@lib/appError";
import axiosInstance from "@lib/axiosConfig";
import { StreamingType } from "@context/AppContext";

// Types for API parameters
interface PaginationParams {
  page?: number;
  limit?: number;
}

// Common Media API
export const mediaApi = {
  // Get all common media
  getAll: async (): Promise<ICommonMedia[]> => {
    try {
      const response = await axiosInstance.get(`/commonMedia`);
      return response.data;
    } catch (err) {
      throw AppError.fromError(err);
    }
  },

  // Get media by type with pagination
  getByType: async (
    type: StreamingType,
    params: PaginationParams = { page: 1, limit: 6 },
  ): Promise<IMovie[] | ISeries[]> => {
    try {
      if (type !== "movies" && type !== "series" && type !== "animes") {
        throw new Error("Invalid streaming type");
      }

      const endpoint = type === "animes" ? "/series" : `/${type}`;
      const response = await axiosInstance.get(endpoint, { params });
      return response.data;
    } catch (err) {
      throw AppError.fromError(err);
    }
  },

  // Get media by ID
  getById: async (
    type: StreamingType,
    id: string,
  ): Promise<IMovie | ISeries> => {
    try {
      if (type !== "movies" && type !== "series" && type !== "animes") {
        throw new Error("Invalid streaming type");
      }

      const endpoint = type === "animes" ? "/series" : `/${type}`;
      const response = await axiosInstance.get(`${endpoint}/${id}`);
      return response.data;
    } catch (err) {
      throw AppError.fromError(err);
    }
  },
};

// Streaming History API
export const historyApi = {
  // Get streaming history
  getHistory: async (
    params: PaginationParams = { page: 1, limit: 10 },
  ): Promise<any[]> => {
    try {
      const response = await axiosInstance.get("/streaming-history", {
        params,
      });
      return response.data;
    } catch (err) {
      throw AppError.fromError(err);
    }
  },

  // Add to streaming history
  addToHistory: async (
    mediaId: string,
    mediaType: StreamingType,
  ): Promise<any> => {
    try {
      const response = await axiosInstance.post("/streaming-history", {
        mediaId,
        mediaType,
        watchedAt: new Date().toISOString(),
      });
      return response.data;
    } catch (err) {
      throw AppError.fromError(err);
    }
  },
};

// Recommendations API
export const recommendationsApi = {
  // Get recommendations
  getRecommendations: async (limit: number = 6): Promise<ICommonMedia[]> => {
    try {
      const response = await axiosInstance.get("/recommendations", {
        params: { limit },
      });
      return response.data;
    } catch (err) {
      throw AppError.fromError(err);
    }
  },
};
