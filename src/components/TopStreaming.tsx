"use client";
import Image from "next/image";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { SkeletonsArray } from "./SkeletonsArray";

// const getDateCache = unstable_cache(
//   async () => {
//     const randomImage = await faker.image.urlPicsumPhotos({
//       width: 120,
//       height: 120,
//     });
//     const randomTitle = await faker.music.songName();
//     const iso = new Date().toISOString();
//     return { randomImage, randomTitle, iso };
//   },
//   [],
//   {
//     revalidate: 10,
//     tags: ["top-streaming"],
//   },
// );

export function TopStreaming() {
  // const { randomImageDefault, randomTitleDefault } = await getDefaultData();
  const [randomImage, setRandomImage] = useState("");
  const [randomTitle, setRandomTitle] = useState("");
  const [typeStreaming, setTypeStreaming] = useState<
    "movies" | "series" | "animes"
  >("series");

  useEffect(() => {
    setRandomImage("");
    setRandomTitle("");

    async function getTitleAndImage() {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setRandomImage(await faker.image.urlPicsumPhotos());
      setRandomTitle(await faker.music.songName());
    }

    getTitleAndImage();
  }, [typeStreaming]);

  const onHandleChangeTypeStreaming = (
    typeStreaming: "movies" | "series" | "animes",
  ) => {
    setTypeStreaming(typeStreaming);
  };

  return (
    <div>
      <div className="mt-10 flex items-center gap-5 text-2xl">
        <Button
          onClick={() => onHandleChangeTypeStreaming("series")}
          className={`flex items-center bg-transparent text-xl hover:text-white ${typeStreaming === "series" ? "font-medium text-primary" : "text-zinc-200"}`}
        >
          Series
        </Button>
        <Button
          onClick={() => onHandleChangeTypeStreaming("movies")}
          className={`flex items-center bg-transparent text-xl hover:text-white ${typeStreaming === "movies" ? "text-primary" : "text-zinc-200"}`}
        >
          Filmes
        </Button>
        <Button
          onClick={() => onHandleChangeTypeStreaming("animes")}
          className={`flex items-center bg-transparent text-xl hover:text-white ${typeStreaming === "animes" ? "text-primary" : "text-zinc-200"}`}
        >
          Animes
        </Button>
      </div>
      {randomImage ? (
        <div className="mt-6 grid grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="group flex h-20 items-center gap-4 rounded bg-white/5 transition-all hover:bg-white/30"
            >
              <Image
                width={104}
                height={104}
                src={randomImage}
                alt="Capa do album {randomTitle}"
              />
              <strong className="flex">{randomTitle}</strong>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-3 gap-6 sm:grid-cols-2 md:grid-cols-3">
          <SkeletonsArray length={6} className="h-20 w-full" />
        </div>
      )}
    </div>
  );
}
