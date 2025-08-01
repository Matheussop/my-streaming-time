"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Card } from "@components/ui/card";
import { IEpisode, ISeason, ISeasonSummary } from "@interfaces/series";
import { useEffect, useState, useRef } from "react";
import { seasonApi } from "api/season";
import { useApiRequest } from "@lib/hooks/useApiRequest";
import { ChevronDown, Info } from "lucide-react";
import SafeImage from "@components/common/SafeImage";
import { Button } from "@components/ui/button";
import { toast } from "sonner";
import {
  IEpisodeWatched,
  IWatchHistoryEntry,
} from "@interfaces/userStremingHistory";
import { userStreamingHistoryApi } from "api/userStreamingHistoryApi";

import { useEpisodeModal } from "@lib/hooks/useEpisodeModal";
import { useAuth } from "@context/AuthContext";

interface ListBySeasonProps {
  seasonsSummary?: ISeason[] | ISeasonSummary[];
  seriesId?: string;
}

interface IEpisodeShow extends IEpisode {
  watched: boolean;
}

export default function ListBySeason({
  seasonsSummary,
  seriesId,
}: ListBySeasonProps) {
  const [selectedSeasonId, setSelectedSeasonId] = useState<string>("1");
  const [seasons, setSeasons] = useState<ISeason[] | ISeasonSummary[]>([]);
  const [userEpisodesWatched, setUserEpisodesWatched] = useState<
    Record<string, IEpisodeWatched>
  >({});
  const [episodes, setEpisodes] = useState<Record<string, IEpisodeShow[]>>({});
  const [isAnimating, setIsAnimating] = useState(true);
  const [animationInProgress, setAnimationInProgress] = useState(false);
  const [currentSeasonData, setCurrentSeasonData] = useState<ISeason>(
    {} as ISeason,
  );
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const { openModal } = useEpisodeModal();
  const episodesRequestedRef = useRef(false);

  const episodesLimit = 3;

  const {
    isLoading: isLoadingUserEpisodesWatched,
    execute: executeUserEpisodesWatched,
  } = useApiRequest<Record<string, IEpisodeWatched>>(
    (userId: string, contentId: string) =>
      userStreamingHistoryApi.getEpisodesWatched(userId, contentId),
    {
      onSuccess: (data: Record<string, IEpisodeWatched>) => {
        if (data) {
          setUserEpisodesWatched(data);
        }
        if (seasonsSummary?.length) {
          setSeasons(seasonsSummary);
          if (seasonsSummary.length > 0 && selectedSeasonId === "1") {
            const firstSeasonId =
              "seasonId" in seasonsSummary[0]
                ? seasonsSummary[0].seasonId
                : seasonsSummary[0]._id;
            setSelectedSeasonId(firstSeasonId);
          }
        }
      },
    },
  );

  const {
    isLoading,
    error,
    execute: executeSeason,
  } = useApiRequest<ISeason>(
    (seriesId: string, seasonNumber: number) =>
      seasonApi.getEpisodesBySeasonNumber(seriesId, seasonNumber),
    {
      onSuccess: (data: ISeason) => {
        setCurrentSeasonData(data);

        const episodes = data.episodes?.map((episode) => ({
          ...episode,
          watched: episode._id in userEpisodesWatched,
        }));

        setEpisodes((prev) => ({
          ...prev,
          [selectedSeasonId]: episodes || [],
        }));
      },
      onError: (error) => {
        console.error("Error loading episodes:", error);
      },
    },
  );

  const { execute: executeMarkIsViewed } = useApiRequest<IWatchHistoryEntry>(
    (userId: string, contentId: string, episodeData: IEpisodeShow) =>
      userStreamingHistoryApi.markIsViewed(userId, contentId, episodeData),
    {
      onSuccess: (data: IWatchHistoryEntry) => {
        if (!data.seriesProgress) {
          console.error("No series progress found");
          return;
        }
        const episodesWatched: Record<string, IEpisodeWatched> =
          data.seriesProgress[seriesId!].episodesWatched;
        setUserEpisodesWatched((prev) => ({
          ...prev,
          ...episodesWatched,
        }));

        const episodesAtt = episodes[selectedSeasonId]?.map((episode) => ({
          ...episode,
          watched: episode._id in episodesWatched,
        }));

        setEpisodes((prev) => ({
          ...prev,
          [selectedSeasonId]: episodesAtt || [],
        }));
      },
    },
  );

  const { execute: executeUnMarkIsViewed } = useApiRequest<IWatchHistoryEntry>(
    (userId: string, contentId: string, episodeId: string) =>
      userStreamingHistoryApi.unMarkIsViewed(userId, contentId, episodeId),
    {
      onSuccess: (data: IWatchHistoryEntry) => {
        if (!data.seriesProgress) {
          console.error("No series progress found");
          return;
        }
        const episodesWatched: Record<string, IEpisodeWatched> =
          data.seriesProgress[seriesId!].episodesWatched;
        setUserEpisodesWatched((prev) => ({
          ...prev,
          ...episodesWatched,
        }));

        const episodesAtt = episodes[selectedSeasonId]?.map((episode) => ({
          ...episode,
          watched: episode._id in episodesWatched,
        }));

        setEpisodes((prev) => ({
          ...prev,
          [selectedSeasonId]: episodesAtt || [],
        }));
      },
    },
  );

  const { execute: executeMarkAllSeason } = useApiRequest<IWatchHistoryEntry>(
    (userId: string, contentId: string, seasonNumber: number) =>
      userStreamingHistoryApi.markSeasonWatched(
        userId,
        contentId,
        seasonNumber,
      ),
    {
      onSuccess: (data: IWatchHistoryEntry) => {
        if (!data.seriesProgress) {
          console.error("No series progress found");
          return;
        }
        const episodesWatched: Record<string, IEpisodeWatched> =
          data.seriesProgress[seriesId!].episodesWatched;
        setUserEpisodesWatched((prev) => ({
          ...prev,
          ...episodesWatched,
        }));

        const episodesAtt = episodes[selectedSeasonId]?.map((episode) => ({
          ...episode,
          watched: episode._id in episodesWatched,
        }));

        setEpisodes((prev) => ({
          ...prev,
          [selectedSeasonId]: episodesAtt || [],
        }));
      },
    },
  );

  const { execute: executeUnMarkAllSeason } = useApiRequest<IWatchHistoryEntry>(
    (userId: string, contentId: string, seasonNumber: number) =>
      userStreamingHistoryApi.unMarkSeasonWatched(
        userId,
        contentId,
        seasonNumber,
      ),
    {
      onSuccess: (data: IWatchHistoryEntry) => {
        if (!data.seriesProgress) {
          console.error("No series progress found");
          return;
        }
        const episodesWatched: Record<string, IEpisodeWatched> =
          data.seriesProgress[seriesId!].episodesWatched;
        setUserEpisodesWatched((prev) => ({
          ...prev,
          ...episodesWatched,
        }));

        const episodesAtt = episodes[selectedSeasonId]?.map((episode) => ({
          ...episode,
          watched: episode._id in episodesWatched,
        }));

        setEpisodes((prev) => ({
          ...prev,
          [selectedSeasonId]: episodesAtt || [],
        }));
      },
    },
  );

  const currentSeason = seasons.find(
    (season) =>
      ("seasonId" in season ? season.seasonId : season._id) ===
      selectedSeasonId,
  );

  useEffect(() => {
    if (!episodesRequestedRef.current && seriesId && user?._id) {
      const userId = user?._id ?? "";
      episodesRequestedRef.current = true;
      executeUserEpisodesWatched(userId, seriesId);
    }
  }, [seriesId, executeUserEpisodesWatched, user]);

  const handleMarkIsViewed = (viewed: boolean, episode: IEpisodeShow) => {
    const episodeData = {
      episodeId: episode._id,
      seasonNumber: currentSeasonData.seasonNumber,
      episodeNumber: episode.episodeNumber,
      // watchedAt: new Date(),
      watchedDurationInMinutes: episode.durationInMinutes,
    };
    const userId = user?._id ?? "";
    if (viewed) {
      toast.promise(executeUnMarkIsViewed(userId, seriesId, episode._id), {
        loading: "Removing from watched...",
        success: "Episode removed from watched!",
        error: "Error removing episode from watched!",
      });
    } else {
      toast.promise(executeMarkIsViewed(userId, seriesId, episodeData), {
        loading: "Marking as watched...",
        success: "Episode marked as watched!",
        error: "Error marking episode as watched!",
      });
    }
  };

  useEffect(() => {
    const season = currentSeason;
    if (season && !episodes[selectedSeasonId]) {
      const seasonNumber = season.seasonNumber;
      executeSeason(seriesId, seasonNumber);
    } else if (currentSeasonData.seasonNumber !== season?.seasonNumber) {
      setCurrentSeasonData(season as ISeason);
    }
  }, [
    selectedSeasonId,
    seriesId,
    seasons,
    executeSeason,
    episodes,
    currentSeason,
    currentSeasonData,
  ]);

  if (!seasonsSummary || seasonsSummary.length === 0) {
    return null;
  }

  const handleSeasonChange = (value: string) => {
    setIsAnimating(false);
    setIsExpanded(false);
    currentSeason!.plot = currentSeasonData.plot;
    setTimeout(() => {
      setSelectedSeasonId(value);
      setIsAnimating(true);
    }, 300);
  };

  const toggleExpanded = () => {
    if (animationInProgress) return;
    setAnimationInProgress(true);

    if (isExpanded) {
      const cards = document.querySelectorAll(
        `.episode-card-${selectedSeasonId}`,
      );

      // Apply animation immediately to all cards that will be hidden
      for (let i = cards.length - 1; i >= episodesLimit; i--) {
        const card = cards[i] as HTMLElement;
        // Shorter delay between cards, but starting immediately
        const delay = (cards.length - 1 - i) * 30;

        // Apply transformation immediately with reduced opacity
        card.style.transition = `opacity 250ms ease-out, transform 250ms ease-out ${delay}ms`;
        // Start animation immediately
        window.requestAnimationFrame(() => {
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";
        });
      }

      // Reduced total time for animation to finish
      setTimeout(
        () => {
          setIsAnimating(false);
          setTimeout(() => {
            setIsExpanded(false);
            setTimeout(() => {
              setIsAnimating(true);
              setAnimationInProgress(false);
            }, 20);
          }, 20);
        },
        Math.max((cards.length - episodesLimit) * 10, 200),
      );
    } else {
      // Expanding
      console.log(
        `[DEBUG] toggleExpanded - Expandindo lista: total=${episodes[selectedSeasonId]?.length}`,
      );
      setIsAnimating(false);
      setTimeout(() => {
        setIsExpanded(true);
        setTimeout(() => {
          setIsAnimating(true);
          setAnimationInProgress(false);
        }, 50);
      }, 150);
    }
  };

  const handleMarkSeasonWatched = () => {
    const userId = user?._id ?? "";

    toast.promise(
      executeMarkAllSeason(userId, seriesId, currentSeasonData.seasonNumber),
      {
        loading: "Adding from watched...",
        success: "Season add from watched!",
        error: "Error add season from watched!",
      },
    );
  };

  const handleUnMarkSeasonWatched = () => {
    const userId = user?._id ?? "";

    toast.promise(
      executeUnMarkAllSeason(userId, seriesId, currentSeasonData.seasonNumber),
      {
        loading: "Removing from watched...",
        success: "Season remove from watched!",
        error: "Error removing season from watched!",
      },
    );
  };

  return (
    <div className="w-full px-4 py-8 md:px-6">
      <h2 className="mb-6 text-3xl font-bold tracking-tighter">Episodes</h2>
      <div className="mb-8 max-w-xs">
        <Select value={selectedSeasonId} onValueChange={handleSeasonChange}>
          <SelectTrigger className="w-full border-white/20 bg-white/5 text-white">
            <SelectValue placeholder="Select a season" />
          </SelectTrigger>
          <SelectContent className="bg-dark-700 max-h-[300px] border-white/20 text-white">
            {seasons.map((season) => (
              <SelectItem
                key={"seasonId" in season ? season.seasonId : season._id}
                value={"seasonId" in season ? season.seasonId : season._id}
                className="focus:bg-white/10 focus:text-white"
              >
                {season.title} - Season {season.seasonNumber}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {currentSeason && (
        <div
          className={`transform transition-all duration-500 ${isAnimating ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <div className="align-center flex flex-row justify-between">
            <div className="mb-4 flex-2/3">
              <h3 className="text-xl font-medium">
                {currentSeasonData?.title ||
                  `Season ${currentSeasonData?.seasonNumber}`}
              </h3>
              {"plot" in currentSeasonData && currentSeasonData?.plot && (
                <p className="mt-2 text-gray-400">{currentSeasonData.plot}</p>
              )}
            </div>
            <div className="mr-1 flex-1/3 content-center text-end">
              <Button className="mr-2" onClick={handleMarkSeasonWatched}>
                Mark all watched
              </Button>
              <Button onClick={handleUnMarkSeasonWatched}>
                UnMark all watched
              </Button>
            </div>
          </div>

          {isLoading && (
            <div className="flex justify-center py-8">
              <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
            </div>
          )}

          {error && (
            <div className="rounded-md bg-red-500/20 p-4 text-red-200">
              <p>Error loading episodes. Try again.</p>
            </div>
          )}

          {!isLoading && !error && episodes[selectedSeasonId] && (
            <>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {episodes[selectedSeasonId]
                  ?.slice(
                    0,
                    isExpanded
                      ? episodes[selectedSeasonId]?.length
                      : episodesLimit,
                  )
                  .map((episode, index) => {
                    return (
                      <Card
                        key={`episode-${episode._id || index}-${currentSeason.seasonNumber}`}
                        className={`episode-card-${selectedSeasonId} transform overflow-hidden bg-white/5 transition-all duration-300 hover:scale-105 hover:bg-white/10 ${isAnimating ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
                        data-index={index}
                      >
                        <div className="flex flex-col p-4">
                          <div className="flex items-center gap-4">
                            {episode.poster && (
                              <SafeImage
                                src={episode.poster}
                                alt={
                                  episode.title ||
                                  `Episode ${episode.episodeNumber}`
                                }
                                width={120}
                                height={68}
                                className="max-h-16 rounded-md object-cover"
                              />
                            )}
                            <div>
                              <h3 className="font-semibold text-white">
                                {episode.episodeNumber}.{" "}
                                {episode.title ||
                                  `Episode ${episode.episodeNumber}`}
                              </h3>
                              <p className="text-sm text-gray-400">
                                {episode.durationInMinutes &&
                                  `${episode.durationInMinutes} min`}
                              </p>
                            </div>
                          </div>
                          {episode.plot && (
                            <p className="mt-3 line-clamp-2 text-sm text-gray-400">
                              {episode.plot}
                            </p>
                          )}
                          <div className="mt-auto flex items-center justify-between gap-2">
                            <Button
                              className={`h-8 rounded-md px-3 text-sm font-medium ${
                                episode.watched
                                  ? "bg-primary/90 hover:bg-primary/100 text-white"
                                  : "hover:bg-primary/50 bg-white/10 text-white"
                              }, ${
                                new Date(episode.releaseDate) > new Date() &&
                                "invisible"
                              }`}
                              onClick={() =>
                                handleMarkIsViewed(episode.watched, episode)
                              }
                            >
                              {episode.watched ? "Viewed" : "Not watched"}
                            </Button>

                            <Button
                              className="h-8 rounded-md bg-transparent px-3 text-sm font-medium text-white hover:bg-white/10"
                              onClick={() => openModal(episode)}
                            >
                              <Info size={18} className="mr-2" /> More Details
                            </Button>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
              </div>

              {(episodes[selectedSeasonId]?.length ?? 0) > episodesLimit && (
                <div className="mt-8 flex justify-center">
                  <Button
                    onClick={toggleExpanded}
                    className={`flex items-center gap-2 rounded-full px-6 py-2 text-white transition-colors ${
                      animationInProgress
                        ? "cursor-not-allowed bg-gray-500 opacity-50"
                        : "bg-primary/20 hover:bg-primary/30"
                    }`}
                    disabled={animationInProgress}
                  >
                    {isExpanded
                      ? "See less"
                      : `See more (${(episodes[selectedSeasonId]?.length ?? 0) - episodesLimit} episodes)`}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
