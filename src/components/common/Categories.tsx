import { unstable_cache } from "next/cache";
import { SkeletonsArray } from "./SkeletonsArray";
import axiosInstance from "@lib/axiosConfig";
import { IStreamingTypeResponse } from "interfaces/streamingType";
import SafeImage from "./SafeImage";

const getDateCache = unstable_cache(
  async () => {
    const { data }: { data: IStreamingTypeResponse[] } =
      await axiosInstance.get("/streamingTypes");

    if (!data) {
      return { uniqueCategoryNames: [] };
    }

    const categoryMap = new Map();

    data.forEach((streamingType) => {
      streamingType.categories.forEach((category) => {
        if (!categoryMap.has(category.name)) {
          categoryMap.set(category.name, {
            name: category.name,
            poster: category.poster || "/default-movie-portrait.jpg",
          });
        }
      });
    });
    const uniqueCategoryNames = Array.from(categoryMap.values());
    return { uniqueCategoryNames };
  },
  [],
  {
    revalidate: 10,
    tags: ["categoriesStreamings"],
  },
);

export async function Categories() {
  const { uniqueCategoryNames } = await getDateCache();

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
