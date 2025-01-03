"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { SkeletonsArray } from "./SkeletonsArray";
import { tv } from "tailwind-variants";

// TODO estudar uma formar de separar o menu dos cards
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

const menuButtons = tv({
  base: "font-medium flex items-center bg-transparent text-xl hover:text-white hover:border-transparent",
  variants: {
    status: {
      active:
        "font-bold rounded-none border-b-2 border-b-primary text-primary hover:rounded-sm ",
    },
  },
});

export function TopStreaming() {
  // const { randomImageDefault, randomTitleDefault } = await getDefaultData();
  const [randomImage, setRandomImage] = useState("");
  const [randomTitle, setRandomTitle] = useState("");
  const [typeStreaming, setTypeStreaming] = useState<
    "movies" | "series" | "animes"
  >("series");

  useEffect(() => {
    async function getTitleAndImage() {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setRandomImage("/default-movie-portrait.jpg");
      setRandomTitle("Random Title");
    }

    getTitleAndImage();
  }, []);

  const onHandleChangeTypeStreaming = (
    typeStreaming: "movies" | "series" | "animes",
  ) => {
    setTypeStreaming(typeStreaming);
  };

  return (
    <div>
      <div className="flex items-center gap-5  text-2xl font-bold">
        <Button
          onClick={() => onHandleChangeTypeStreaming("series")}
          className={`${typeStreaming === "series" ? menuButtons({ status: "active" }) : menuButtons()}`}
        >
          Series
        </Button>
        <Button
          onClick={() => onHandleChangeTypeStreaming("movies")}
          className={`${typeStreaming === "movies" ? menuButtons({ status: "active" }) : menuButtons()}`}
        >
          Filmes
        </Button>
        <Button
          onClick={() => onHandleChangeTypeStreaming("animes")}
          className={`${typeStreaming === "animes" ? menuButtons({ status: "active" }) : menuButtons()}`}
        >
          Animes
        </Button>
      </div>
      {randomImage ? (
        <div className="mt-6 grid grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="group flex items-center gap-4 overflow-auto rounded-md bg-white/5 transition-all hover:bg-white/30"
            >
              <Image
                width={104}
                height={104}
                src={randomImage}
                alt={`Capa do filme ${randomTitle}`}
              />
              <strong>{randomTitle}</strong>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="mt-6 grid grid-cols-3 gap-6 sm:grid-cols-2 md:grid-cols-3 "
          data-testid="skeletons-array"
        >
          <SkeletonsArray length={6} className="h-20 w-full" />
        </div>
      )}
    </div>
  );
}
