export type GenreObject = { id: string; name: string };

export interface ISeries {
  _id: string;
  title: string;
  release_date: string;
  plot: string;
  cast: string[];
  rating: number;
  numberEpisodes: number;
  numberSeasons: number;
  genre: GenreObject[] | number[];
  poster: string;
  url: string;
}
