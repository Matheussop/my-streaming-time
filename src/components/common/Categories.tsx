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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
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

        setUniqueCategoryNames(Array.from(categoryMap.values()));
      } catch (error) {
        console.error("Error fetching categories:", error);
        setUniqueCategoryNames([]);
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
              <div className="flex overflow-auto rounded-md">
                <SafeImage
                  placeholder={"blur"}
                  src={object.poster}
                  className="h-40"
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
