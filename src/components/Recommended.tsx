import Loading from "@/app/home/loading";
import Image from "next/image";

import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

interface DataProps {
  randomImage: string;
  randomTitle: string;
}
export async function getData(): Promise<DataProps> {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const randomImage =
    "https://m.media-amazon.com/images/I/71tnjmKWwJL._AC_UF1000,1000_QL80_.jpg";
  const randomTitle = "Solo Leveling";

  return {
    randomImage,
    randomTitle,
  };
}

export async function Recommended() {
  const { randomImage, randomTitle } = await getData();

  return randomImage ? (
    <Carousel className="flex w-full items-center">
      <CarouselContent className="w-full gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="w-full pl-1 md:basis-1/3 lg:basis-1/5"
          >
            <div className="p-1">
              <div className="flex flex-col items-center gap-4 rounded bg-white/5 px-2 py-4 text-zinc-400 hover:bg-white/30">
                <Image
                  width={160}
                  height={160}
                  src={randomImage}
                  className="w-full"
                  alt="Capa do album {randomTitle}"
                />
                <div>
                  <strong className="font-semibold text-white">
                    {randomTitle}
                  </strong>
                  <p className="text-sm">Artist</p>
                  <p className="text-sm">Some description off album</p>
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  ) : (
    <Loading />
  );
}
