import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { SkeletonsArray } from "../common/SkeletonsArray";
import { unstable_cache } from "next/cache";
import { CarouselCard } from "./CarouselCard";
import { getCommonMedia } from "api/commonContents";
import { ICommonMedia } from "@interfaces/commonMedia";

const getDateCache = unstable_cache(
  async () => {
    try {
      const data = await getCommonMedia();
      if (data.length > 0) {
        const moviesList: ICommonMedia[] = data.map((media: ICommonMedia) => ({
          _id: media._id,
          url: media.url,
          title: media.title,
          contentType: media.contentType === "movie" ? "movies" : "series",
          releaseDate: media.releaseDate,
          rating: media.rating,
          plot: media.plot,
          year: new Date(media.releaseDate).getFullYear(),
          genre: media.genre,
          poster: media.poster,
          tmdbId: media.tmdbId,
          cast: media.cast,
          status: media.status,
        }));
        return moviesList;
      } else {
        return [] as ICommonMedia[];
      }
    } catch (error) {
      console.error(error);
      return [] as ICommonMedia[];
    }
  },
  [],
  {
    revalidate: 10,
    tags: ["recommendedStreamings"],
  },
);
export async function Recommended() {
  const commonMediaList = await getDateCache();
  return commonMediaList.length > 0 ? (
    <Carousel className="flex items-center">
      <CarouselContent>
        {commonMediaList.map((media, index) => (
          <CarouselItem className="max-w-[16%]" key={index}>
            <CarouselCard
              id={media._id}
              index={index}
              imageUrl={media.url ?? ""}
              titleStreaming={media.title}
              plot={media.plot ?? ""}
              year={new Date(media.releaseDate).getFullYear()}
              typeStreaming={media.contentType}
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
