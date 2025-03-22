"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { SkeletonsArray } from "./SkeletonsArray";
import { tv } from "tailwind-variants";
import { IMovie } from "@interfaces/movie";
import { toast } from "sonner";
import { AppError } from "@lib/appError";
import { useRouter } from "next/navigation";
import { useSetStreamingType, useStreamingType } from "context/AppContext";
import { getCommonMediaByType } from "api/commonContents";
import { ISeries } from "@interfaces/series";
import SafeImage from "./SafeImage";

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
  const [streaming, setStreaming] = useState<IMovie[] | ISeries[]>(
    [] as IMovie[] | ISeries[],
  );
  const router = useRouter();
  const setStreamingTypeContext = useSetStreamingType();
  const currentStreamingType = useStreamingType();
  const [typeStreaming, setTypeStreaming] = useState<
    "movies" | "series" | "animes"
  >(currentStreamingType || "series");

  useEffect(() => {
    async function getMediaByType() {
      toast.promise(getCommonMediaByType(typeStreaming), {
        loading: `Recuperando dado de ${typeStreaming}...`,
        success: (data) => {
          setStreaming(data);
          return `Dados recuperados com sucesso`;
        },
        error: (apiErro: AppError) => {
          return `Erro: ${apiErro.message} (Status: ${apiErro.statusCode})`;
        },
      });
    }

    getMediaByType();
  }, [typeStreaming]);

  const handleRedirectToDetail = (id: string) => {
    router.push(`/streaming-detail/${id}?typeStreaming=${typeStreaming}`);
  };

  const onHandleChangeTypeStreaming = (
    typeStreaming: "movies" | "series" | "animes",
  ) => {
    setStreaming([]);
    setStreamingTypeContext(typeStreaming);
    setTypeStreaming(typeStreaming);
  };

  return (
    <div>
      <div className="flex items-center gap-5 text-2xl font-bold">
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
              onClick={() => handleRedirectToDetail(media._id)}
            >
              <SafeImage
                width={1000}
                height={100}
                src={media.poster ?? ""}
                alt={`Capa do filme ${media.title}`}
                className="h-28 w-60 object-cover"
              />
              <strong>{media.title}</strong>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="mt-6 grid grid-cols-3 gap-6 sm:grid-cols-2 md:grid-cols-3"
          data-testid="skeletons-array"
        >
          <SkeletonsArray length={6} className="h-28 w-full" />
        </div>
      )}
    </div>
  );
}
