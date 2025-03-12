"use client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@components/ui/hover-card";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CarouselCardProps {
  id: string;
  index: number;
  imageUrl: string;
  titleStreaming: string;
  plot: string;
  year: number;
}
export function CarouselCard({
  id,
  imageUrl,
  titleStreaming,
  plot,
  year,
}: CarouselCardProps) {
  const router = useRouter();
  function handleRedirectToDetail() {
    router.push(`/streaming-detail/${id}`);
  }

  return (
    <div onClick={handleRedirectToDetail}>
      <HoverCard openDelay={500}>
        <HoverCardTrigger>
          <div className="p-1">
            <div className="flex flex-col items-center gap-4 overflow-auto rounded-md bg-white/5 px-2 py-4 pt-20 text-zinc-400 hover:bg-white/30">
              <Image
                width={220}
                height={280}
                src={imageUrl}
                placeholder={"blur"}
                blurDataURL={"/placeholder_gif.gif"}
                className="-mt-16 h-[300px] w-auto overflow-auto rounded-md sm:h-[50px] md:h-[200px] 2xl:h-[300px]"
                alt={`Capa do filme ${titleStreaming}`}
              />
              <div className="items-start">
                <strong className="line-clamp-3 font-semibold text-white">
                  {titleStreaming}
                </strong>
                <p className="text-sm">TODO make logic genre</p>
                <div className="flex text-sm">
                  <p className="mr-1 after:content-['_•_']">Time: 1h 58m</p>
                  <p className="before:content-['_']">{year}</p>
                </div>
              </div>
            </div>
          </div>
        </HoverCardTrigger>

        <HoverCardContent className="bg-dark-700 absolute left-4 border-none md:bottom-[10%] xl:bottom-80">
          <div className="text-zinc-400">
            <strong className="font-semibold text-white">
              {titleStreaming}
            </strong>
            <p className="text-sm">Tipo do filme</p>
            <p className="line-clamp-12 text-sm text-balance">{plot}</p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
