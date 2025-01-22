"use client";
import { Star } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import { useState } from "react";

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
  const [src, setSrc] = useState(imageUrl);

  const handleImageError = (e: any) => {
    setSrc("/default-movie-portrait.jpg"); // Caminho relativo à pasta public
  };

  return (
    <div className="flex w-64 items-center gap-2">
      <div className="flex min-w-24 overflow-auto">
        {imageUrl ? (
          <Image
            width={250}
            height={250}
            placeholder={"blur"}
            blurDataURL={"/blurred_image.png"}
            src={src}
            alt={`Capa do filme ${title}`}
            onError={handleImageError}
            data-testid="image_movie"
            className="h-auto w-24 overflow-auto rounded-md"
          />
        ) : (
          <Skeleton className="h-40 w-24" data-testid="progress_bar" />
        )}
      </div>
      <div className="flex flex-col">
        <p className="line-clamp-2 overflow-hidden overflow-ellipsis text-base">
          {title}
        </p>
        <p className="text-sm text-zinc-400">{type}</p>
        <div className="mt-2 flex">
          {Array.from({ length }, (_, index) =>
            index < rate ? (
              <Star
                key={index}
                className="fill-yellow text-yellow"
                data-testid="star"
              />
            ) : (
              <Star key={index} className="text-zinc-400" data-testid="star" />
            ),
          )}
        </div>
      </div>
    </div>
  );
}
