interface IGenreReference {
  _id: string;
  id: number;
  name: string;
}

export interface ICommonMedia {
  _id: string;
  title: string;
  releaseDate: string;
  contentType: string;
  plot?: string;
  cast?: string[];
  rating?: number;
  genre: number[] | IGenreReference[];
  status?: string;
  tmdbId?: number;
  poster?: string;
  url?: string;
}
