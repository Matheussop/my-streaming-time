"use client";
import { use, useEffect, useState } from "react";
import { Button } from "@components/ui/button";
import { SkeletonsArray } from "@components/common/SkeletonsArray";
import { tv } from "tailwind-variants";
import { IMovie } from "@interfaces/movie";
import { toast } from "sonner";
import { AppError } from "@lib/appError";
import { useRouter } from "next/navigation";
import { useSetStreamingType, useStreamingType } from "context/AppContext";
import { getCommonMediaByGenre } from "api/commonContents";
import { ISeries } from "@interfaces/series";
import SafeImage from "@components/common/SafeImage";

const menuButtons = tv({
  base: "font-medium flex items-center bg-transparent text-xl hover:text-white hover:border-transparent",
  variants: {
    status: {
      active:
        "font-bold rounded-none border-b-2 border-b-primary text-primary hover:rounded-sm ",
    },
  },
});

export default function CategoryPage({
  params,
}: {
  params: Promise<{ genreName: string }>;
}) {
  const { genreName } = use(params);
  const decodedGenreName = decodeURIComponent(genreName);

  const [streaming, setStreaming] = useState<IMovie[] | ISeries[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const setStreamingTypeContext = useSetStreamingType();
  const currentStreamingType = useStreamingType();
  const [typeStreaming, setTypeStreaming] = useState<
    "movies" | "series" | "animes" | "all"
  >(currentStreamingType || "all");

  // Ensures that the component only tries to use the router after mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    async function getMediaByGenre() {
      setIsLoading(true);
      toast.promise(getCommonMediaByGenre(decodedGenreName, typeStreaming), {
        loading: `Buscando ${typeStreaming === "all" ? "todas as mídias" : typeStreaming} do gênero ${decodedGenreName}...`,
        success: (data) => {
          setStreaming(data);
          setIsLoading(false);
          return `Dados recuperados com sucesso`;
        },
        error: (apiErro: AppError) => {
          setIsLoading(false);
          return `Erro: ${apiErro.message} (Status: ${apiErro.statusCode})`;
        },
      });
    }

    getMediaByGenre();
  }, [decodedGenreName, typeStreaming, isMounted]);

  const handleRedirectToDetail = (id: string) => {
    if (!isMounted) return;
    router.push(
      `/streaming-detail/${id}?typeStreaming=${typeStreaming === "all" ? currentStreamingType : typeStreaming}`,
    );
  };

  const onHandleChangeTypeStreaming = (
    type: "movies" | "series" | "animes" | "all",
  ) => {
    if (!isMounted) return;
    setStreaming([]);
    if (type !== "all") {
      setStreamingTypeContext(type);
    }
    setTypeStreaming(type);
  };

  return (
    <div className="container py-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Gênero: {decodedGenreName}</h1>
        <p className="text-gray-400">
          Encontre todas as mídias do gênero selecionado
        </p>
      </div>

      <div className="flex items-center gap-5 text-2xl font-bold">
        <Button
          onClick={() => onHandleChangeTypeStreaming("all")}
          className={`${typeStreaming === "all" ? menuButtons({ status: "active" }) : menuButtons()}`}
        >
          Todos
        </Button>
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

      {isLoading ? (
        <div
          className="mt-6 grid grid-cols-3 gap-6 sm:grid-cols-2 md:grid-cols-3"
          data-testid="skeletons-array"
        >
          <SkeletonsArray length={6} className="h-28 w-full" />
        </div>
      ) : streaming && streaming.length > 0 ? (
        <div className="mt-6 grid grid-cols-3 gap-6">
          {streaming.map((media, index) => (
            <div
              key={index}
              className="group flex h-28 w-full cursor-pointer items-center gap-4 overflow-auto rounded-md bg-white/5 transition-all hover:bg-white/30"
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
        <div className="flex h-60 items-center justify-center">
          <p className="text-xl">Nenhuma mídia encontrada para este gênero.</p>
        </div>
      )}
    </div>
  );
}
