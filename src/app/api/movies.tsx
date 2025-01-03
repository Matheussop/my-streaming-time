import axiosInstance from "@lib/axiosConfig";

export interface IMovie_Api {
  _id: string;
  title: string;
  release_date: number;
  plot: string;
  rating: number;
  url: string;
}
export interface IMovies_Response {
  movies: IMovie_Api[];
}

export const getMovies = async (): Promise<IMovies_Response> => {
  try {
    const response = await axiosInstance.get("/movies");
    return { movies: response.data };
  } catch (err) {
    throw new Error("Failed to fetch movies");
  }
};

export const getMovieById = async (id: string): Promise<IMovie_Api> => {
  try {
    const response = await axiosInstance.get(`/movies/${id}`);
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
