"use client";
import Image from "next/image";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import Loading from "@/app/home/loading";

interface TopStreamingProps {
  typeOfStreaming: string;
}
export function TopStreaming({ typeOfStreaming }: TopStreamingProps) {
  const [randomImage, setRandomImage] = useState<string>("");
  const [randomTitle, setRandomTitle] = useState<string>("");

  useEffect(() => {
    setRandomImage("");
    setRandomTitle("");
    async function getTitleAndImage() {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setRandomImage(await faker.image.urlPicsumPhotos());
      setRandomTitle(await faker.music.songName());
    }

    getTitleAndImage();
  }, [typeOfStreaming]);

  return randomImage ? (
    <div className="mt-6 grid grid-cols-3 gap-6">
      <div className="group flex items-center gap-4 rounded bg-white/5 transition-all hover:bg-white/30">
        <Image
          width={104}
          height={104}
          src={randomImage}
          alt="Capa do album {randomTitle}"
        />
        <strong className="flex">{randomTitle}</strong>
      </div>
      <div className="group flex items-center gap-4 rounded bg-white/5 transition hover:bg-white/30">
        <Image
          width={104}
          height={104}
          src={randomImage}
          alt="Capa do album {randomTitle}"
        />
        <strong className="flex">{randomTitle}</strong>
      </div>
      <div className="group flex items-center gap-4 rounded bg-white/5 transition hover:bg-white/30">
        <Image
          width={104}
          height={104}
          src={randomImage}
          alt="Capa do album {randomTitle}"
        />
        <strong className="flex">{randomTitle}</strong>
      </div>
      <div className="group flex items-center gap-4 rounded bg-white/5 transition hover:bg-white/30">
        <Image
          width={104}
          height={104}
          src={randomImage}
          alt="Capa do album {randomTitle}"
        />
        <strong className="flex">{randomTitle}</strong>
      </div>
      <div className="group flex items-center gap-4 rounded bg-white/5 transition hover:bg-white/30">
        <Image
          width={104}
          height={104}
          src={randomImage}
          alt="Capa do album {randomTitle}"
        />
        <strong className="flex">{randomTitle}</strong>
      </div>
      <div className="group flex items-center gap-4 rounded bg-white/5 transition hover:bg-white/30">
        <Image
          width={104}
          height={104}
          src={randomImage}
          alt="Capa do album {randomTitle}"
        />
        <strong className="flex">{randomTitle}</strong>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
