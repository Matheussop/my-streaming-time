import Image from "next/image";

import { faker } from "@faker-js/faker";

import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { unstable_cache } from "next/cache";
import { SkeletonsArray } from "./SkeletonsArray";

const getDateCache = unstable_cache(
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const randomImage = await faker.image.urlPicsumPhotos({
      width: 160,
      height: 220,
    });
    const randomTitle = await faker.music.songName();
    return { randomImage, randomTitle };
  },
  [],
  {
    revalidate: 10,
    tags: ["recommendedStreamings"],
  },
);

export async function Recommended() {
  const { randomImage, randomTitle } = await getDateCache();

  return randomImage ? (
    <Carousel className="flex w-full items-center">
      <CarouselContent className="w-full gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="w-full pl-1 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="p-1">
              <div className="flex flex-col items-center gap-4 overflow-auto rounded-md bg-white/5 px-2 py-4 text-zinc-400 hover:bg-white/30">
                <span className="relative -left-20 top-4 text-4xl font-semibold">
                  {index + 1}
                </span>
                <Image
                  width={160}
                  height={160}
                  src={randomImage}
                  placeholder={"blur"}
                  blurDataURL={"/placeholder_gif.gif"}
                  className="-mt-12 w-[90%] max-w-[220px] overflow-auto rounded-md"
                  alt="Capa do filme {randomTitle}"
                />
                <div>
                  <strong className="font-semibold text-white">
                    {randomTitle}
                  </strong>
                  <p className="text-sm">Tipo do filme</p>
                  <p className="text-sm">Alguma descrição de algum filme</p>
                </div>
              </div>
            </div>
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
