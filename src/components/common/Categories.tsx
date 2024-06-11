import Image from "next/image";
import { faker } from "@faker-js/faker";
import { unstable_cache } from "next/cache";
import { SkeletonsArray } from "./SkeletonsArray";

interface DataProps {
  typeOptionsExample: {
    type: string;
  }[];
  randomImage: string;
}
const getDateCache = unstable_cache(
  async () => {
    const typeOptionsExample = [
      { type: "Ação" },
      { type: "Terror" },
      { type: "Suspense" },
      { type: "Drama" },
      { type: "Romance" },
      { type: "Aventura" },
      { type: "Policial" },
      { type: "Desenhos" },
    ];
    await new Promise((resolve) => setTimeout(resolve, 100));

    const randomImage = await faker.image.urlPicsumPhotos({
      width: 240,
      height: 240,
    });
    // const randomTitle = await faker.music.songName();
    return { randomImage, typeOptionsExample };
  },
  [],
  {
    revalidate: 10,
    tags: ["categoriesStreamings"],
  },
);

export async function Categories() {
  const { randomImage, typeOptionsExample } = await getDateCache();

  return (
    <div className="m-y-10 flex items-center justify-center">
      {randomImage ? (
        <div className="grid grid-cols-4 gap-x-20 gap-y-10">
          {typeOptionsExample.map((object, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-y-4 text-center"
            >
              <strong className="text-lg">{object.type}</strong>
              <div className="flex overflow-auto rounded-md">
                <Image
                  width={240}
                  height={240}
                  src={randomImage}
                  alt={`Capa da categoria ${object.type}`}
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
