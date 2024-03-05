import Loading from "@/app/home/loading";
import Image from "next/image";

import { faker } from "@faker-js/faker";

interface DataProps {
  randomImage: string;
  randomTitle: string;
}
export async function getData(): Promise<DataProps> {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const randomImage =
    "https://m.media-amazon.com/images/I/71tnjmKWwJL._AC_UF1000,1000_QL80_.jpg";
  const randomTitle = "Solo Leveling";

  return {
    randomImage,
    randomTitle,
  };
}

export async function Recommended() {
  const { randomImage, randomTitle } = await getData();

  return randomImage ? (
    <div className="mt-6 grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-6">
      <div className="flex flex-col items-center gap-4 rounded bg-white/5 px-2 py-4 text-zinc-400 hover:bg-white/30">
        <Image
          width={160}
          height={160}
          className="w-full"
          src={randomImage}
          alt="Capa do album {randomTitle}"
        />
        <div>
          <strong className="font-semibold text-white">{randomTitle}</strong>
          <p className="text-sm">Artist</p>
          <p className="text-sm">Some description off album</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 rounded bg-white/5 px-2 py-4 text-zinc-400 hover:bg-white/30">
        <Image
          width={160}
          height={160}
          className="w-full"
          src={randomImage}
          alt="Capa do album {randomTitle}"
        />
        <div>
          <strong className="font-semibold text-white">{randomTitle}</strong>
          <p className="text-sm">Artist</p>
          <p className="text-sm">Some description off album</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 rounded bg-white/5 px-2 py-4 text-zinc-400 hover:bg-white/30">
        <Image
          width={160}
          height={160}
          className="w-full"
          src={randomImage}
          alt="Capa do album {randomTitle}"
        />
        <div>
          <strong className="font-semibold text-white">{randomTitle}</strong>
          <p className="text-sm">Artist</p>
          <p className="text-sm">Some description off album</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 rounded bg-white/5 px-2 py-4 text-zinc-400 hover:bg-white/30">
        <Image
          width={160}
          height={160}
          className="w-full"
          src={randomImage}
          alt="Capa do album {randomTitle}"
        />
        <div>
          <strong className="font-semibold text-white">{randomTitle}</strong>
          <p className="text-sm">Artist</p>
          <p className="text-sm">Some description off album</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 rounded bg-white/5 px-2 py-4 text-zinc-400 hover:bg-white/30">
        <Image
          width={160}
          height={160}
          className="w-full"
          src={randomImage}
          alt="Capa do album {randomTitle}"
        />
        <div>
          <strong className="font-semibold text-white">{randomTitle}</strong>
          <p className="text-sm">Artist</p>
          <p className="text-sm">Some description off album</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 rounded bg-white/5 px-2 py-4 text-zinc-400 hover:bg-white/30">
        <Image
          width={160}
          height={160}
          className="w-full"
          src={randomImage}
          alt="Capa do album {randomTitle}"
        />
        <div>
          <strong className="font-semibold text-white">{randomTitle}</strong>
          <p className="text-sm">Artist</p>
          <p className="text-sm">Some description off album</p>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
