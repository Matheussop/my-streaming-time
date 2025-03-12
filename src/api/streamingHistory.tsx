import { AppError } from "@lib/appError";
import axiosInstance from "@lib/axiosConfig";

interface BodyStreamingInHistory {
  contentId: string;
  userId: string;
}

interface BodyAddStreamingInHistory extends BodyStreamingInHistory {
  contentId: string;
  userId: string;
  contentType: string;
  watchedDurationInMinutes: number;
}

export const changeViewedStreaming = async (
  data: BodyAddStreamingInHistory | BodyStreamingInHistory,
  viewed: boolean,
) => {
  try {
    if (viewed) {
      const queryParams = new URLSearchParams();
      queryParams.set("contentId", data.contentId);
      queryParams.set("userId", data.userId);
      await axiosInstance.delete(
        `/user-streaming-history/remove-entry?${queryParams.toString()}`,
      );
    } else {
      await axiosInstance.post(`/user-streaming-history`, data);
    }
  } catch (err) {
    throw AppError.fromError(err);
  }
};

export const getIsViewed = async (
  data: BodyStreamingInHistory,
): Promise<boolean> => {
  try {
    const response = await axiosInstance.get(`/user-streaming-history`, {
      params: data,
    });
    return response.data.viewed;
  } catch (err) {
    throw AppError.fromError(err);
  }
};
