import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { SkeletonsArray } from "../common/SkeletonsArray";
import { unstable_cache } from "next/cache";
import { CarouselCard } from "./CarouselCard";
import { getMovies } from "@app/api/movies";
import { IMovie } from "@interfaces/movie";
interface IRecommendMovie {
  movieId: string;
  movieImg: string;
  movieTitle: string;
  movieReleaseDate: string;
  movieRating: number;
  moviePlot: string;
  movieYear: number;
}
const getDateCache = unstable_cache(
  async () => {
    try {
      const data = await getMovies();
      if (data.movies.length > 0) {
        const moviesList: IRecommendMovie[] = data.movies.map(
          (movie: IMovie) => ({
            movieId: movie._id,
            movieImg: movie.url,
            movieTitle: movie.title,
            movieReleaseDate: movie.release_date,
            movieRating: movie.rating,
            moviePlot: movie.plot,
            movieYear: new Date(movie.release_date).getFullYear(),
          }),
        );
        return moviesList;
      } else {
        return [] as IRecommendMovie[];
      }
    } catch (error) {
      console.error(error);
      return [] as IRecommendMovie[];
    }
  },
  [],
  {
    revalidate: 10,
    tags: ["recommendedStreamings"],
  },
);
export async function Recommended() {
  const moviesList = await getDateCache();
  return moviesList.length > 0 ? (
    <Carousel className="flex items-center">
      <CarouselContent>
        {moviesList.map((movie, index) => (
          <CarouselItem className="max-w-[16%] " key={index}>
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
