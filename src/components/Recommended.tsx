"use client";
import { useEffect, useState } from "react";
import Loading from "@/app/home/loading";
import Image from "next/image";

import { faker } from "@faker-js/faker";
export function Recommended() {
  const [randomImage, setRandomImage] = useState<string>("");
  const [randomTitle, setRandomTitle] = useState<string>("");

  useEffect(() => {
    async function getTitleAndImage() {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      setRandomImage(await faker.image.urlPicsumPhotos());
      setRandomTitle(await faker.music.songName());
    }

    getTitleAndImage();
  }, []);

  return randomImage ? (
    <div className="mt-6 grid grid-cols-6 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
      <div className="flex flex-col items-center gap-4 rounded bg-white/5 px-2 py-4 text-zinc-400 hover:bg-white/30">
        <Image
          width={160}
          height={160}
          className="w-full"
          src={randomImage}
          alt="Capa do album {randomTitle}"
        />
        <div>
          <strong className="font-semibold text-white">{randomTitle}</strong>
          <p className="text-sm">Artist</p>
          <p className="text-sm">Some description off album</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 rounded bg-white/5 px-2 py-4 text-zinc-400 hover:bg-white/30">
        <Image
          width={160}
          height={160}
          className="w-full"
          src={randomImage}
          alt="Capa do album {randomTitle}"
        />
        <div>
          <strong className="font-semibold text-white">{randomTitle}</strong>
          <p className="text-sm">Artist</p>
          <p className="text-sm">Some description off album</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 rounded bg-white/5 px-2 py-4 text-zinc-400 hover:bg-white/30">
        <Image
          width={160}
          height={160}
          className="w-full"
          src={randomImage}
          alt="Capa do album {randomTitle}"
        />
        <div>
          <strong className="font-semibold text-white">{randomTitle}</strong>
          <p className="text-sm">Artist</p>
          <p className="text-sm">Some description off album</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 rounded bg-white/5 px-2 py-4 text-zinc-400 hover:bg-white/30">
        <Image
          width={160}
          height={160}
          className="w-full"
          src={randomImage}
          alt="Capa do album {randomTitle}"
        />
        <div>
          <strong className="font-semibold text-white">{randomTitle}</strong>
          <p className="text-sm">Artist</p>
          <p className="text-sm">Some description off album</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 rounded bg-white/5 px-2 py-4 text-zinc-400 hover:bg-white/30">
        <Image
          width={160}
          height={160}
          className="w-full"
          src={randomImage}
          alt="Capa do album {randomTitle}"
        />
        <div>
          <strong className="font-semibold text-white">{randomTitle}</strong>
          <p className="text-sm">Artist</p>
          <p className="text-sm">Some description off album</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 rounded bg-white/5 px-2 py-4 text-zinc-400 hover:bg-white/30 ">
        <Image
          width={160}
          height={160}
          className="w-full"
          src={randomImage}
          alt="Capa do album {randomTitle}"
        />
        <div>
          <strong className="font-semibold text-white">{randomTitle}</strong>
          <p className="text-sm">Artist</p>
          <p className="text-sm">Some description off album</p>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
