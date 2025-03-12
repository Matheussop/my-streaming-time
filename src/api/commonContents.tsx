import { IMovie } from "@interfaces/movie";

import { ICommonMedia } from "@interfaces/commonMedia";
import { AppError } from "@lib/appError";
import axiosInstance from "@lib/axiosConfig";
import { ISeries } from "@interfaces/series";

export const getCommonMedia = async (): Promise<ICommonMedia[]> => {
  try {
    const response = await axiosInstance.get(`/commonMedia`);
    return response.data;
  } catch (err) {
    throw AppError.fromError(err);
  }
};

export const getCommonMediaByType = async (
  type: string,
  page = 1,
  limit = 6,
): Promise<IMovie[] | ISeries[]> => {
  try {
    let response;
    const body = { page, limit };
    if (type === "movies") {
      response = await axiosInstance.get(`/movies`, { params: body });
    } else if (type === "series") {
      response = await axiosInstance.get(`/series`, { params: body });
    } else {
      throw new Error("Invalid streaming type");
    }
    return response.data;
  } catch (err: any) {
    throw AppError.fromError(err);
  }
};
