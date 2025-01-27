"use client";

import { cn } from "@lib/utils";
import Image from "next/image";
import React from "react";

interface SafeImageProps extends React.ComponentProps<typeof Image> {}

const SafeImage: React.FC<SafeImageProps> = ({
  alt,
  width = 1000,
  height = 1000,
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
      className={cn("object-cover", rest.className)}
      alt={alt}
      onError={handleImageError}
      {...rest}
    />
  );
};

export default SafeImage;
