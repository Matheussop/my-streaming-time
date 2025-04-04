"use client";
import { getMediaById } from "api/movies";
import { useState, useEffect, use } from "react";

import { notFound, useRouter, useSearchParams } from "next/navigation";
import { IMovie } from "@interfaces/movie";
import { Button } from "@components/ui/button";
import { changeViewedStreaming, getIsViewed } from "api/streamingHistory";
import { toast } from "sonner";
import { IGenreReference } from "@interfaces/streamingType";
import { ISeries } from "@interfaces/series";
import Loading from "./loading";
import { Star } from "lucide-react";
import ListBySeason from "@components/episodes/ListBySeason";
import SafeImage from "@components/common/SafeImage";
import { EpisodeModalProvider } from "@context/EpisodeModalContext";
import { useAuth } from "@context/AuthContext";

const backgroundColorGenre = [
  "bg-red-700",
  "bg-blue-700",
  "bg-green-700",
  "bg-yellow-700",
  "bg-purple-700",
  "bg-pink-700",
  "bg-orange-700",
];

interface VisualMovieProps extends IMovie {
  ratingValue: string;
  stars: number;
  releaseDateFormatted: string;
}

interface VisualSeriesProps extends ISeries {
  ratingValue: string;
  stars: number;
  releaseDateFormatted: string;
}

type VisualStreamingProps = VisualMovieProps | VisualSeriesProps;

const getDateCache = async (
  id: string,
  streamingType: string,
): Promise<VisualStreamingProps> => {
  try {
    const data = await getMediaById(id, streamingType);
    const streamingObj: VisualMovieProps | VisualSeriesProps = {
      plot: data.plot,
      rating: data.rating,
      ratingValue: data.rating?.toFixed(0) ?? "0",
      stars: Math.round(data.rating ?? 0 / 2),
      poster: data.poster ?? "",
      url: data.url,
      //change to Brazilian format
      releaseDateFormatted: new Date(data.releaseDate).toLocaleDateString(
        "pt-BR",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        },
      ),
      cast: data.cast,
      ...data,
    };
    return streamingObj;
  } catch (error) {
    notFound();
  }
};

export default function Streaming({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const totalStars = 5;
  const router = useRouter();
  const { id } = use(params);
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [viewed, setViewed] = useState(false);
  let typeStreaming = searchParams.get("typeStreaming")
    ? searchParams.get("typeStreaming")
    : "movies";

  const [streaming, setStreaming] = useState<VisualStreamingProps>(
    {} as VisualStreamingProps,
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
          userId: user?._id ?? "",
        };
        const isViewed = await getIsViewed(data);
        setViewed(isViewed);
      };
      fetchMovie();
      isViewed();
    }
  }, [id, typeStreaming, router, user]);

  if (!streaming || !streaming.title) {
    return <Loading />;
  }

  const changeViewOfStreaming = async (streamingViewed: boolean) => {
    const watchedDurationInMinutes =
      "durationTime" in streaming && streaming.durationTime;
    console.log(user?._id);
    const data = {
      userId: user?._id ?? "",
      contentId: id,
      contentType: typeStreaming === "movies" ? "movie" : typeStreaming,
      title: streaming.title,
      watchedDurationInMinutes: watchedDurationInMinutes,
    };
    await changeViewedStreaming(data, streamingViewed);
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
    <EpisodeModalProvider>
      <div className="bg-dark-600 m-4 flex min-h-[100dvh] flex-col rounded-lg p-6 shadow-lg">
        <section className="w-full pt-12 md:pt-24 lg:pt-32">
          <div className="container space-y-10 xl:space-y-16">
            <div className="mx-auto grid max-w-[1300px] gap-4 px-4 sm:px-6 md:grid-cols-2 md:gap-16 md:px-10">
              <div>
                {typeStreaming === "movies" && (
                  <Button
                    className={`flex justify-center gap-2 rounded-full text-white ${viewed ? "bg-primary hover:bg-primary" : "bg-amber-500"}`}
                    onClick={() => handleMarkIsViewed(viewed)}
                  >
                    <span>{viewed ? "Viewed" : "Not watch + "}</span>
                  </Button>
                )}
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  {streaming.title}
                </h1>
                <div className="text-lg font-medium text-gray-400">
                  {streaming.releaseDateFormatted}
                </div>
                <div className="mt-2 text-white/80">
                  <ul className="flex flex-wrap gap-2">
                    {(streaming.genre as IGenreReference[]).map(
                      (item: IGenreReference, index: number) => (
                        <li
                          key={index}
                          className={`${backgroundColorGenre[index]} rounded-full px-2 py-1 text-sm font-medium text-white/90`}
                        >
                          {item.name}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
                <div className="mt-2 text-white/80">
                  {"totalEpisodes" in streaming &&
                    "totalSeasons" in streaming && (
                      <div>
                        {streaming.totalEpisodes} episodes -{" "}
                        {streaming.totalSeasons} seasons
                      </div>
                    )}
                </div>
                <div>
                  {streaming.status && (
                    <div className="mt-2 text-white/80">{streaming.status}</div>
                  )}
                </div>
              </div>
              <div>
                <SafeImage
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
                      Fran Walsh, Philippa Boyens, Peter Jackson, Stephen
                      Sinclair
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
        <section>
          {"totalEpisodes" in streaming && "totalSeasons" in streaming && (
            <ListBySeason
              seasonsSummary={streaming.seasonsSummary}
              seriesId={streaming._id}
            />
          )}
        </section>
        <section className="bg-primary/75 mb-4 w-full rounded-lg p-6 py-12 shadow-lg md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter">
                  Additional Details
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <div className="font-medium">Trailer</div>
                  <div>
                    {streaming.videoUrl ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${streaming.videoUrl}`}
                        width="100%"
                        height="250"
                        title="Trailer"
                      ></iframe>
                    ) : (
                      <div className="text-gray-400">No trailer available</div>
                    )}
                  </div>
                </div>
                <div>
                  <div className="font-medium">Runtime</div>
                  <div className="text-white/80">
                    {"durationTime" in streaming && streaming.durationTime
                      ? streaming.durationTime + " min"
                      : "totalEpisodes" in streaming && streaming.totalEpisodes
                        ? streaming.totalEpisodes + " episodes"
                        : "N/A"}
                  </div>
                </div>
                <div>
                  <div className="font-medium">Ratings</div>
                  <div className="text-white/80">
                    <div className="flex items-center gap-1">
                      {[...Array(totalStars)].map((_, index) => (
                        <Star
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
    </EpisodeModalProvider>
  );
}
