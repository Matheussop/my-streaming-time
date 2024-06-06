import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { SkeletonsArray } from "../SkeletonsArray";
import { unstable_cache } from "next/cache";
import { faker } from "@faker-js/faker";
import { CarouselCard } from "./CarouselCard";

const getDateCache = unstable_cache(
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const randomImage = await faker.image.urlPicsumPhotos({
      width: 160,
      height: 220,
    });
    const randomTitle = await faker.music.songName();
    const id = await faker.string.uuid();
    return { randomImage, randomTitle, id };
  },
  [],
  {
    revalidate: 10,
    tags: ["recommendedStreamings"],
  },
);
export async function Recommended() {
  const { randomImage, randomTitle, id } = await getDateCache();

  return randomImage ? (
    <Carousel className="flex w-full items-center">
      <CarouselContent className="w-full gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem
            className="w-full pl-1 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            key={index}
          >
            <CarouselCard
              id={id}
              index={index}
              randomImage={randomImage}
              randomTitle={randomTitle}
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
