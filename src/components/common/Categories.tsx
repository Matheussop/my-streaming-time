"use client";
import { SkeletonsArray } from "./SkeletonsArray";
import axiosInstance from "@lib/axiosConfig";
import { IGenreReference, IStreamingType } from "interfaces/streamingType";
import SafeImage from "./SafeImage";
import { useAppContext } from "context/AppContext";
import { useEffect, useState } from "react";

export function Categories() {
  const { getStreamingTypeContext } = useAppContext();
  const [uniqueCategoryNames, setUniqueCategoryNames] = useState<
    IGenreReference[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);

        const { data }: { data: IStreamingType } = await axiosInstance.get(
          `/streamingTypes/name/${getStreamingTypeContext}`,
        );

        if (!data || !data.supportedGenres) {
          setUniqueCategoryNames([]);
          return;
        }

        const categoryMap = new Map();

        data.supportedGenres.forEach((genre) => {
          categoryMap.set(genre.name, {
            name: genre.name,
            poster: genre.poster || "/default-movie-portrait.jpg",
          });
        });

        const newCategories = Array.from(categoryMap.values());

        // Small delay to ensure smooth transition
        setTimeout(() => {
          setUniqueCategoryNames(newCategories);
          setIsLoading(false);
        }, 300);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setUniqueCategoryNames([]);
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [getStreamingTypeContext]);

  return (
    <div className="m-y-10 flex items-center justify-center">
      {uniqueCategoryNames.length > 0 ? (
        <div className="grid grid-cols-4 gap-x-16 gap-y-8">
          {uniqueCategoryNames.map((object, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-y-4 text-center"
            >
              <strong className="text-lg">{object.name}</strong>
              <div className="relative flex overflow-auto rounded-md">
                {isLoading && (
                  <div className="bg-opacity-50 absolute inset-0 z-10 flex items-center justify-center bg-black transition-opacity duration-300">
                    <SafeImage
                      src="/default-movie-portrait.jpg"
                      className="relative z-0 h-40"
                      alt="Carregando imagem"
                    />
                  </div>
                )}
                <SafeImage
                  placeholder={"blur"}
                  src={object.poster}
                  className="relative z-0 h-40"
                  alt={`Capa da categoria ${object.name}`}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-3 gap-6 sm:grid-cols-2 md:grid-cols-3">
          <SkeletonsArray length={6} className="h-20 w-20" />
        </div>
      )}
    </div>
  );
}
