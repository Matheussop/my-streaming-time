"use client";
import { getMediaById } from "api/movies";
import Image from "next/image";
import { useState, useEffect } from "react";

import { notFound, useRouter, useSearchParams } from "next/navigation";
import { IMovie } from "@interfaces/movie";
import { Button } from "@components/ui/button";
import { changeViewedStreaming, getIsViewed } from "api/streamingHistory";
import { toast } from "sonner";

interface VisualMovieProps extends IMovie {
  ratingValue: string;
  stars: number;
  year: number;
}
const getDateCache = async (
  id: string,
  streamingType: string,
): Promise<VisualMovieProps> => {
  try {
    const data = await getMediaById(id, streamingType);
    const streamingObj: VisualMovieProps = {
      _id: data._id,
      title: data.title,
      plot: data.plot,
      rating: data.rating,
      ratingValue: data.rating?.toFixed(0) ?? "0",
      stars: Math.round(data.rating ?? 0 / 2),
      poster: data.poster ?? "",
      url: data.url,
      year: new Date(data.releaseDate).getFullYear(),
      releaseDate: data.releaseDate,
      cast: data.cast,
      genre: data.genre,
      durationTime: data.durationTime,
      contentType: data.contentType,
    };
    return streamingObj;
  } catch (error) {
    notFound();
  }
};

export default function Streaming({ params }: { params: { id: string } }) {
  const totalStars = 5;
  const router = useRouter();
  const { id } = params;
  const searchParams = useSearchParams();
  const [viewed, setViewed] = useState(false);
  let typeStreaming = searchParams.get("typeStreaming")
    ? searchParams.get("typeStreaming")
    : "movies";

  const [streaming, setStreaming] = useState<VisualMovieProps>(
    {} as VisualMovieProps,
  );

  useEffect(() => {
    if (id) {
      const fetchMovie = async () => {
        const movieData = await getDateCache(
          id as string,
          typeStreaming as string,
        );

        setStreaming(movieData);
      };
      const isViewed = async () => {
        const data = {
          contentId: id,
          userId: "67745a741402bcf82462362a",
        };
        const isViewed = await getIsViewed(data);
        setViewed(isViewed);
      };
      fetchMovie();
      isViewed();
    }
  }, [id, typeStreaming, router]);

  if (!streaming || !streaming.title) {
    return <div>Loading...</div>;
  }

  const changeViewOfStreaming = async (streamingViewed: boolean) => {
    const data = {
      userId: "67745a741402bcf82462362a",
      contentId: id,
      contentType: typeStreaming === "movies" ? "movie" : typeStreaming,
      title: streaming.title,
      watchedDurationInMinutes: 120,
    };
    await changeViewedStreaming(data, streamingViewed); //TODO add userID on the request
  };

  const handleMarkIsViewed = (streamingViewed: boolean) => {
    changeViewOfStreaming(streamingViewed)
      .then(() => {
        setViewed((prev: boolean) => !prev);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="bg-dark-600 m-4 flex min-h-[100dvh] flex-col rounded-lg p-6 shadow-lg">
      <section className="w-full pt-12 md:pt-24 lg:pt-32">
        <div className="container space-y-10 xl:space-y-16">
          <div className="mx-auto grid max-w-[1300px] gap-4 px-4 sm:px-6 md:grid-cols-2 md:gap-16 md:px-10">
            <div>
              <Button
                className={`flex justify-center gap-2 rounded-full text-white ${viewed ? "bg-primary hover:bg-primary" : "bg-amber-500"}`}
                onClick={() => handleMarkIsViewed(viewed)}
              >
                <span>{viewed ? "Viewed" : "Not watch + "}</span>
              </Button>
              <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                {streaming.title}
              </h1>
              <div className="text-lg font-medium text-gray-400">
                {streaming.year}
              </div>
            </div>
            <div>
              <Image
                alt="Movie Poster"
                src={streaming.poster ?? ""}
                width={600}
                height={350}
                placeholder={"blur"}
                blurDataURL={"/placeholder_gif.gif"}
                className="mx-auto aspect-16/9 overflow-hidden rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 sm:px-10 md:grid-cols-2 md:gap-16">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter">
                Plot Summary
              </h2>
              <p className="mt-4 text-gray-400">{streaming.plot}</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tighter">
                Cast &amp; Crew
              </h2>
              <ul className="mt-4 space-y-2">
                <li>
                  <div className="font-medium">Directed by</div>
                  <div className="text-gray-400">Peter Jackson</div>
                </li>
                <li>
                  <div className="font-medium">Starring</div>
                  <div className="text-gray-400">
                    Elijah Wood, Ian McKellen, Viggo Mortensen, Sean Astin
                  </div>
                </li>
                <li>
                  <div className="font-medium">Screenplay</div>
                  <div className="text-gray-400">
                    Fran Walsh, Philippa Boyens, Peter Jackson, Stephen Sinclair
                  </div>
                </li>
                <li>
                  <div className="font-medium">Music</div>
                  <div className="text-gray-400">Howard Shore</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="shadow-lgmd:py-24 bg-primary/75 mb-4 w-full rounded-lg p-6 py-12 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter">
                Additional Details
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <div className="font-medium">Genre</div>
                <div className="text-white/80">
                  <ul>
                    {streaming.genre.map((item, index) => {
                      if (typeof item === "number") {
                        return <li key={index}>{item}</li>;
                      } else {
                        return <li key={index}>{item.name}</li>;
                      }
                    })}
                  </ul>
                </div>
              </div>
              <div>
                <div className="font-medium">Runtime</div>
                <div className="text-white/80">2h 58m</div>
              </div>
              <div>
                <div className="font-medium">Ratings</div>
                <div className="text-white/80">
                  <div className="flex items-center gap-1">
                    {[...Array(totalStars)].map((_, index) => (
                      <StarIcon
                        key={index}
                        className={`h-5 w-5 stroke-gray-700 ${streaming.stars > index ? "fill-yellow" : "fill-gray-300"}`}
                      />
                    ))}
                    <span className="ml-2 text-white">
                      {streaming.ratingValue}/10
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
