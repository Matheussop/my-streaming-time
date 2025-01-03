import Image from "next/image";
import { faker } from "@faker-js/faker";
import { unstable_cache } from "next/cache";
import { SkeletonsArray } from "./SkeletonsArray";
import axiosInstance from "@lib/axiosConfig";
import { IStreamingTypeResponse } from "interfaces/streamingType";

const getDateCache = unstable_cache(
  async () => {
    const { data }: { data: IStreamingTypeResponse[] } =
      await axiosInstance.get("/streamingTypes");

    const randomImage = await faker.image.urlPicsumPhotos({
      width: 240,
      height: 240,
    });

    if (!data) {
      return { randomImage, uniqueCategoryNames: [] };
    }

    const uniqueCategoryNames = Array.from(
      new Set(
        data.flatMap((streamingType) =>
          streamingType.categories.map((category) => category.name),
        ),
      ),
    );

    return { randomImage, uniqueCategoryNames };
  },
  [],
  {
    revalidate: 10,
    tags: ["categoriesStreamings"],
  },
);

export async function Categories() {
  const { randomImage, uniqueCategoryNames } = await getDateCache();

  return (
    <div className="m-y-10 flex items-center justify-center">
      {uniqueCategoryNames.length > 0 ? (
        <div className="grid grid-cols-4 gap-x-20 gap-y-10">
          {uniqueCategoryNames.map((object, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-y-4 text-center"
            >
              <strong className="text-lg">{object}</strong>
              <div className="flex overflow-auto rounded-md">
                <Image
                  width={240}
                  height={240}
                  src={randomImage}
                  alt={`Capa da categoria ${object}`}
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
