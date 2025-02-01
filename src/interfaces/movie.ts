export type GenreObject = { id: string; name: string };

export interface IMovie {
  _id: string;
  title: string;
  release_date: string;
  plot: string;
  cast: string[];
  rating: number;
  genre: GenreObject[] | number[];
  poster: string;
  url: string;
}
