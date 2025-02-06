import { IStreamingType } from "@app/context/AppContext";
import { ISeries } from "@interfaces/series";
import { AppError } from "@lib/appError";
import axiosInstance from "@lib/axiosConfig";
import { IMovie } from "interfaces/movie";

export interface ICommonMedia_Response {
  media: IMovie[];
}

export interface IMovies_Response {
  movies: IMovie[];
}

export interface ISeries_Response {
  series: ISeries[];
}

export interface ISearch_Movie_Response extends IMovies_Response {
  page: number;
}

export interface ISearch_Serie_Response extends ISeries_Response {
  page: number;
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

export const getMediaById = async (
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

export const findOrAddMovie = async (
  streamingType: IStreamingType,
  title: string,
  page: number,
  limit: number,
): Promise<ISearch_Movie_Response | ISearch_Serie_Response> => {
  try {
    let response;
    if (streamingType === "movies") {
      response = await axiosInstance.post(`/movies/findOrAddMovie`, {
        title,
        page,
        limit,
      });
    } else if (streamingType === "series") {
      response = await axiosInstance.post(`/series/findOrAddSerie`, {
        title,
        page,
        limit,
      });
    } else if (streamingType === "animes") {
      response = await axiosInstance.post(`/animes/search`, {
        title,
        page,
        limit,
      });
    } else {
      throw new Error("Invalid streaming type");
    }

    return response.data;
  } catch (err) {
    console.error(`Failed to fetch ${streamingType}`, err);
    throw err;
  }
};
