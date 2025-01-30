import { AppError } from "@lib/appError";
import axiosInstance from "@lib/axiosConfig";
import { IMovie } from "interfaces/movie";

export interface ICommonMedia_Response {
  media: IMovie[];
}

export interface IMovies_Response {
  movies: IMovie[];
}

export const getMovies = async (): Promise<IMovies_Response> => {
  try {
    const response = await axiosInstance.get("/movies");
    return { movies: response.data };
  } catch (err) {
    throw new Error("Failed to fetch movies");
  }
};

export const getMoviesByGenre = async (
  genre: string,
  page = 1,
  limit = 10,
): Promise<IMovies_Response> => {
  try {
    const body = { genre, page, limit };
    const { data }: { data: IMovie[] } = await axiosInstance.post(
      "/movies/byGenre",
      body,
    );
    return { movies: data };
  } catch (err) {
    throw AppError.fromError(err);
  }
};

export const getMoviesByType = async (
  type: string,
  page = 1,
  limit = 10,
): Promise<ICommonMedia_Response> => {
  try {
    const { data }: { data: ICommonMedia_Response } = await axiosInstance.get(
      `/commonMedia?mediaType=${type}&limit=${6}`,
    );

    return { media: data.media };
  } catch (err: any) {
    throw AppError.fromError(err);
  }
};

export const getMovieById = async (
  id: string,
  streamingType: string,
): Promise<IMovie> => {
  try {
    const response = await axiosInstance.get(`/${streamingType}/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(`Error fetching movie with id ${id}: ${err}`);
  }
};

export const createMovie = async (movie: any) => {
  try {
    const response = await axiosInstance.post("/movies", movie);
    return response.data;
  } catch (err) {
    console.error("Error creating movie", err);
    throw err;
  }
};

export const updateMovie = async (id: string, movie: any) => {
  try {
    const response = await axiosInstance.put(`/movies/${id}`, movie);
    return response.data;
  } catch (err) {
    console.error(`Error updating movie with id ${id}`, err);
    throw err;
  }
};

export const deleteMovie = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/movies/${id}`);
    return response.data;
  } catch (err) {
    console.error(`Error deleting movie with id ${id}`, err);
    throw err;
  }
};
