import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { CarouselCard } from "./CarouselCard";
import { ICommonMedia } from "@interfaces/commonMedia";
import { serverApi } from "@lib/server/serverApiRequest";
import { AppError } from "@lib/appError";
import console from "console";

export async function getRecommendations() {
  try {
    return {
      data: await serverApi<ICommonMedia[], { limit: number }>(`/commonMedia`, {
        method: "GET",
        params: {
          limit: 10,
        },
        next: {
          revalidate: 60, // Cache por 24 horas
          tags: ["recommendations"],
        },
      }),
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      error: error as AppError,
    };
  }
}
export async function Recommended() {
  const { data: recommendations, error } = await getRecommendations();
  // Client Side request
  // const {
  //   data: recommendations,
  //   isLoading,
  //   error,
  // } = useApiRequest<ICommonMedia[]>(recommendationsApi.getRecommendations, {
  //   immediate: true,
  //   onError: handleError,
  //   onSuccess: handleSuccess,
  // });

  if (error) {
    return <ErrorState error={error} />;
  }

  if (!recommendations.length) {
    return (
      <div className="flex h-[27rem] w-full items-center justify-center">
        <p className="text-center text-gray-500">
          Nenhuma recomendação disponível no momento
        </p>
      </div>
    );
  }

  return (
    <Carousel className="flex items-center">
      <CarouselContent>
        {recommendations.map((media, index) => (
          <CarouselItem className="max-w-[16%]" key={media._id}>
            <CarouselCard
              id={media._id}
              index={index}
              imageUrl={media.url ?? ""}
              title={media.title}
              plot={media.plot ?? ""}
              genre={media.genre ?? []}
              year={
                isNaN(new Date(media.releaseDate).getTime())
                  ? undefined
                  : new Date(media.releaseDate).getFullYear()
              }
              typeStreaming={media.contentType}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

function ErrorState({ error }: { error: AppError }) {
  return (
    <div className="rounded-lg bg-red-50 p-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-red-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            Erro ao carregar recomendações
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>
              {error.statusCode} - {error.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
