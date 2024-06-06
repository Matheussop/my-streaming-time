"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

interface CarouselCardProps {
  id: string;
  index: number;
  randomImage: string;
  randomTitle: string;
}
export function CarouselCard({
  id,
  index,
  randomImage,
  randomTitle,
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
            <div className="flex flex-col items-center gap-4 overflow-auto rounded-md bg-white/5 px-2 py-4 text-zinc-400 hover:bg-white/30">
              <span className="relative -left-20 top-4 text-4xl font-semibold">
                {index + 1}
              </span>
              <Image
                width={160}
                height={160}
                src={randomImage}
                placeholder={"blur"}
                blurDataURL={"/placeholder_gif.gif"}
                className="-mt-12 w-[90%] max-w-[220px] overflow-auto rounded-md"
                alt={`Capa do filme ${randomTitle}`}
              />
              <div className="items-start">
                <strong className="line-clamp-3 font-semibold text-white">
                  {randomTitle}
                </strong>
                <p className="text-sm">Tipo do filme</p>
                <div className="flex text-sm">
                  <p className="mr-1 after:content-['_•_']">Time: 1h 58m</p>
                  <p className="before:content-['_'] ">2021</p>
                </div>
              </div>
            </div>
          </div>
        </HoverCardTrigger>

        <HoverCardContent className="fixed bottom-80 left-4 border-none bg-dark-700">
          <div className="text-zinc-400">
            <strong className="font-semibold text-white">{randomTitle}</strong>
            <p className="text-sm">Tipo do filme</p>
            <p className="line-clamp-12 text-balance text-sm">
              Alguma descrição de algum filme Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Laudantium, nesciunt excepturi
              eligendi sunt ullam recusandae voluptates dolores impedit sit
              error quisquam rem obcaecati temporibus suscipit, commodi quo sint
              magnam molestias! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Laudantium, nesciunt excepturi eligendi sunt
              ullam recusandae voluptates dolores impedit sit error quisquam rem
              obcaecati temporibus suscipit, commodi quo sint magnam molestias!
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
