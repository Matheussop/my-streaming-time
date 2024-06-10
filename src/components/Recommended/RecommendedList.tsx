import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { SkeletonsArray } from "../SkeletonsArray";
import { unstable_cache } from "next/cache";
import { CarouselCard } from "./CarouselCard";
import { IMovie_Api, getMovies } from "@/app/api/movies";

interface IMovie {
  movieId: string;
  movieImg: string;
  movieTitle: string;
  movieReleaseDate: number;
  movieRating: number;
  moviePlot: string;
  movieYear: number;
}
const getDateCache = unstable_cache(
  async () => {
    const data = await getMovies();

    if (data.movies.length > 0) {
      const moviesList: IMovie[] = data.movies.map((movie: IMovie_Api) => ({
        movieId: movie.id,
        movieImg: movie.url,
        movieTitle: movie.title,
        movieReleaseDate: movie.year,
        movieRating: movie.rating,
        moviePlot: movie.plot,
        movieYear: movie.year,
      }));
      console.log(moviesList);
      return moviesList;
    }
    return [] as IMovie[];
  },
  [],
  {
    revalidate: 5000,
    tags: ["recommendedStreamings"],
  },
);
export async function Recommended() {
  const moviesList = await getDateCache();
  return moviesList.length > 0 ? (
    <Carousel className="flex items-center">
      <CarouselContent className="gap-6">
        {moviesList.map((movie, index) => (
          <CarouselItem className="max-w-[15%] pl-1 " key={index}>
            <CarouselCard
              id={movie.movieId}
              index={index}
              imageUrl={movie.movieImg}
              titleStreaming={movie.movieTitle}
              plot={movie.moviePlot}
              year={movie.movieYear}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  ) : (
    <div className="mt-6 grid grid-cols-6 gap-6 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-6">
      <SkeletonsArray
        length={6}
        className="h-[27rem] w-full sm:max-h-24 md:max-h-[12rem] lg:max-h-[20rem] xl:max-h-[27rem]"
      />
    </div>
  );
}
