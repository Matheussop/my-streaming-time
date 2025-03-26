"use client";
import SafeImage from "@components/common/SafeImage";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@components/ui/hover-card";
import { ICommonMedia } from "@interfaces/commonMedia";
import { IGenreReference } from "@interfaces/streamingType";
import { useRouter } from "next/navigation";

interface CarouselCardProps extends ICommonMedia {
  id: string;
  index: number;
  imageUrl: string;
  year: number;
  typeStreaming: string;
}
export function CarouselCard({
  id,
  imageUrl,
  title,
  plot,
  year,
  typeStreaming,
  genre,
}: Partial<CarouselCardProps>) {
  const router = useRouter();

  const genreName = (genre: IGenreReference[], limit: number) => {
    return genre
      .slice(0, limit)
      .map((g) => g.name)
      .join(", ");
  };

  function handleRedirectToDetail() {
    const type = typeStreaming === "movie" ? "movies" : "series";
    router.push(`/streaming-detail/${id}?typeStreaming=${type}`);
  }

  const genreFormat = genreName(genre as IGenreReference[], 2);
  const genreFull = genreName(genre as IGenreReference[], genre?.length ?? 0);
  return (
    <div onClick={handleRedirectToDetail}>
      <HoverCard openDelay={500}>
        <HoverCardTrigger>
          <div className="p-1">
            <div className="flex flex-col items-center gap-4 overflow-auto rounded-md bg-white/5 px-2 py-4 pt-20 text-zinc-400 hover:bg-white/30">
              <SafeImage
                width={220}
                height={280}
                src={imageUrl ?? ""}
                className="-mt-16 h-[300px] w-auto overflow-auto rounded-md sm:h-[50px] md:h-[200px] 2xl:h-[300px]"
                alt={`Capa do filme ${title}`}
              />
              <div className="items-start">
                <strong className="line-clamp-2 min-h-[3em] font-semibold text-white">
                  {title}
                </strong>
                <p className="line-clamp-1 text-sm text-balance">
                  {genreFormat}
                </p>
                <div className="flex text-sm">
                  <p className="mr-1 after:content-['_•_']">Time: 1h 58m</p>
                  <p className="before:content-['_']">{year ?? "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </HoverCardTrigger>

        <HoverCardContent className="bg-dark-700 absolute left-4 border-none md:bottom-[10%] xl:bottom-80">
          <div className="text-zinc-400">
            <strong className="font-semibold text-white">{title}</strong>
            <p className="text-sm">{typeStreaming?.toUpperCase()}</p>
            <p className="line-clamp-12 text-sm text-balance">{plot}</p>
            <p className="mt-2 line-clamp-4 text-sm text-balance">
              Genre: {genreFull}
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
