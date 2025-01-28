"use client";

import { cn } from "@lib/utils";
import Image from "next/image";
import React from "react";

interface SafeImageProps extends React.ComponentProps<typeof Image> {}

const SafeImage: React.FC<SafeImageProps> = ({
  alt,
  width = 1000,
  height = 1000,
  className,
  ...rest
}) => {
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    const target = e.target as HTMLImageElement;
    target.src = "/default-movie-portrait.jpg";
    target.srcset = "/default-movie-portrait.jpg";
  };

  return (
    <Image
      width={width}
      height={height}
      className={cn("object-cover", className)}
      blurDataURL={"/blurred_image.png"}
      alt={alt}
      onError={handleImageError}
      {...rest}
    />
  );
};

export default SafeImage;
