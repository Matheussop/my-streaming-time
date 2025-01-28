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
  const defaultImage = "/default-movie-portrait.jpg";
  const defaultAlt = "Default image";

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    const target = e.target as HTMLImageElement;
    target.src = defaultImage;
    target.srcset = defaultImage;
  };

  return (
    <Image
      width={width}
      height={height}
      className={cn("object-cover", className)}
      blurDataURL={"/blurred_image.png"}
      alt={alt || defaultAlt}
      onError={handleImageError}
      {...rest}
    />
  );
};

export default SafeImage;
