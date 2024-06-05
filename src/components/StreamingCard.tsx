import { Star } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";

export interface StreamingCardProps {
  title: string;
  type: string;
  rate: number;
  imageUrl: string;
}

export function StreamingCard({
  title,
  type,
  rate,
  imageUrl,
}: StreamingCardProps) {
  const length = 5;
  return (
    <div className="flex w-64 items-center gap-2">
      {imageUrl ? (
        <Image
          width={96}
          height={110}
          src={imageUrl}
          alt={`Capa do filme ${title}`}
        />
      ) : (
        <Skeleton className="h-28 w-24" />
      )}
      <div className="flex flex-col">
        <p className="line-clamp-2 overflow-hidden overflow-ellipsis text-base">
          {title}
        </p>
        <p className="text-sm text-zinc-400">{type}</p>
        <div className="mt-2 flex">
          {Array.from({ length }, (_, index) =>
            index < rate ? (
              <Star key={index} className="fill-yellow text-yellow" />
            ) : (
              <Star key={index} className="text-zinc-400" />
            ),
          )}
        </div>
      </div>
    </div>
  );
}
