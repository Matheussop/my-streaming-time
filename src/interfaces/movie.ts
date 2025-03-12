import { ICommonMedia } from "./commonMedia";

export type GenreObject = { id: string; name: string };

export interface IMovie extends ICommonMedia {
  durationTime: number;
}
