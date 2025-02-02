import { AppError } from "@lib/appError";
import axiosInstance from "@lib/axiosConfig";

interface StreamingHistorySearch {
  streamingId: string;
  userId: string;
}

interface BodyAddStreamingInHistory extends StreamingHistorySearch {
  title: string;
  durationInMinutes: number;
}

export const changeViewedStreaming = async (
  data: BodyAddStreamingInHistory,
  viewed: boolean,
) => {
  try {
    if (viewed) {
      await axiosInstance.post(`/user-streaming-history`, data);
    } else {
      const { title, durationInMinutes, ...putData } = data;
      await axiosInstance.put(`/user-streaming-history`, putData);
    }
  } catch (err) {
    throw AppError.fromError(err);
  }
};

export const getIsViewed = async (data: StreamingHistorySearch) => {
  try {
    // const response = await axiosInstance.get(`/user-streaming-history`, {
    //   params: data,
    // });
    // return response.data.viewed;
  } catch (err) {
    throw AppError.fromError(err);
  }
};
