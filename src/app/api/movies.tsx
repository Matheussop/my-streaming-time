import axios from "axios";

const API_URL = "http://localhost:5000/movies";

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
    const response = await axios.get(API_URL);
    return { movies: response.data };
  } catch (err) {
    console.error("Error fetching movies", err);
    throw err;
  }
};

export const getMovieById = async (id: string): Promise<IMovie_Api> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (err) {
    console.error(`Error fetching movie with id ${id}`, err);
    throw err;
  }
};

export const createMovie = async (movie: any) => {
  try {
    const response = await axios.post(API_URL, movie);
    return response.data;
  } catch (err) {
    console.error("Error creating movie", err);
    throw err;
  }
};

export const updateMovie = async (id: string, movie: any) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, movie);
    return response.data;
  } catch (err) {
    console.error(`Error updating movie with id ${id}`, err);
    throw err;
  }
};

export const deleteMovie = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (err) {
    console.error(`Error deleting movie with id ${id}`, err);
    throw err;
  }
};
