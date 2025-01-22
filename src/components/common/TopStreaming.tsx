"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { SkeletonsArray } from "./SkeletonsArray";
import { tv } from "tailwind-variants";
import { getMoviesByType } from "@app/api/movies";
import { IMovie } from "@interfaces/movie";

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
  const [streaming, setStreaming] = useState<IMovie[]>([] as IMovie[]);
  const [typeStreaming, setTypeStreaming] = useState<
    "movies" | "series" | "animes"
  >("series");

  useEffect(() => {
    async function getTitleAndImage() {
      const streamingData = await getMoviesByType(typeStreaming);
      setStreaming(streamingData.media);
    }

    if (!streaming || streaming.length <= 0) {
      getTitleAndImage();
    }
  }, [streaming, typeStreaming]);

  const onHandleChangeTypeStreaming = (
    typeStreaming: "movies" | "series" | "animes",
  ) => {
    setStreaming([]);
    setTypeStreaming(typeStreaming);
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    const target = e.target as HTMLImageElement;
    target.src = "/default-movie-portrait.jpg";
    target.srcset = "/default-movie-portrait.jpg";
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
      {streaming && streaming.length > 0 ? (
        <div className="mt-6 grid grid-cols-3 gap-6">
          {streaming.map((media, index) => (
            <div
              key={index}
              className="group flex h-28 w-full items-center gap-4 overflow-auto rounded-md bg-white/5 transition-all hover:bg-white/30"
            >
              <Image
                width={1000}
                height={100}
                placeholder={"blur"}
                blurDataURL={"/blurred_image.png"}
                src={media.poster}
                onError={handleImageError}
                alt={`Capa do filme ${media.title}`}
                className="h-28 w-60 object-cover"
              />
              <strong>{media.title}</strong>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="mt-6 grid grid-cols-3 gap-6 sm:grid-cols-2 md:grid-cols-3 "
          data-testid="skeletons-array"
        >
          <SkeletonsArray length={6} className="h-28 w-full" />
        </div>
      )}
    </div>
  );
}
