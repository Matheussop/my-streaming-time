"use client";
import { useCallback } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { SkeletonsArray } from "../common/SkeletonsArray";
import { unstable_cache } from "next/cache";
import { CarouselCard } from "./CarouselCard";
import { getCommonMedia } from "api/commonContents";
import { ICommonMedia } from "@interfaces/commonMedia";
import { recommendationsApi } from "api/apiService";
import { useApiRequest } from "@lib/hooks/useApiRequest";
import { toast } from "sonner";
import ErrorBoundary from "@components/common/ErrorBoundary";

const RecommendedContent = () => {
  const handleError = useCallback((error: Error) => {
    toast.error(`Erro ao carregar recomendações: ${error.message}`);
  }, []);

  const handleSuccess = useCallback((data: ICommonMedia[]) => {
    if (data.length === 0) {
      toast.info("Nenhuma recomendação encontrada");
    }
  }, []);

  const {
    data: recommendations,
    isLoading,
    error,
  } = useApiRequest<ICommonMedia[]>(recommendationsApi.getRecommendations, {
    immediate: true,
    onError: handleError,
    onSuccess: handleSuccess,
  });

  if (isLoading || !recommendations) {
    return (
      <div className="mt-6 grid animate-pulse grid-cols-6 gap-6 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-[27rem] w-full rounded-lg bg-gray-700/20 sm:max-h-24 md:max-h-[12rem] lg:max-h-[20rem] xl:max-h-[27rem]"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[27rem] w-full items-center justify-center rounded-lg bg-red-500/10">
        <p className="text-center text-red-500">
          Erro ao carregar recomendações
        </p>
      </div>
    );
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
              titleStreaming={media.title}
              plot={media.plot ?? ""}
              year={new Date(media.releaseDate).getFullYear()}
              typeStreaming={media.contentType}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export function Recommended() {
  return (
    <ErrorBoundary>
      <RecommendedContent />
    </ErrorBoundary>
  );
}
