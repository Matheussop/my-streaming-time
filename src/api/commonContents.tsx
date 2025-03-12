import { ICommonMedia } from "@interfaces/commonMedia";
import { AppError } from "@lib/appError";
import axiosInstance from "@lib/axiosConfig";

export const getCommonMedia = async (): Promise<ICommonMedia[]> => {
  try {
    const response = await axiosInstance.get(`/commonMedia`);
    return response.data;
  } catch (err) {
    throw AppError.fromError(err);
  }
};
