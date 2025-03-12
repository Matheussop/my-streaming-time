export interface IGenreReference {
  _id: string;
  id: number;
  name: string;
  poster: string;
}
export interface IStreamingType {
  name: string;
  supportedGenres?: IGenreReference[];
  description?: string;
  isActive?: boolean;
}
