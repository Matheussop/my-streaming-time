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
import { useEffect, useState } from "react";
import Image from "next/image";
import { seasonApi } from "api/season";
import { useApiRequest } from "@lib/hooks/useApiRequest";
import { ChevronDown } from "lucide-react";

interface ListBySeasonProps {
  seasonsSummary?: ISeason[] | ISeasonSummary[];
  seriesId?: string;
}

export default function ListBySeason({
  seasonsSummary,
  seriesId,
}: ListBySeasonProps) {
  const [selectedSeason, setSelectedSeason] = useState<string>("1");
  const [seasons, setSeasons] = useState<ISeason[] | ISeasonSummary[]>([]);
  const [episodes, setEpisodes] = useState<Record<string, IEpisode[]>>({});
  const [isAnimating, setIsAnimating] = useState(true);
  const [animationInProgress, setAnimationInProgress] = useState(false);
  const [currentSeasonNumber, setCurrentSeasonNumber] = useState<number | null>(
    null,
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const episodesLimit = 3;

  const { isLoading, error, execute } = useApiRequest<IEpisode[]>(
    (seriesId: string, seasonNumber: number) =>
      seasonApi.getEpisodesBySeasonNumber(seriesId, seasonNumber),
    {
      onSuccess: (data) => {
        setEpisodes((prev) => ({
          ...prev,
          [selectedSeason]: data,
        }));
      },
      onError: (error) => {
        console.error("Erro ao carregar episódios:", error);
      },
    },
  );

  useEffect(() => {
    if (seasonsSummary?.length) {
      setSeasons(seasonsSummary);

      if (seasonsSummary.length > 0 && selectedSeason === "1") {
        const firstSeasonId =
          "seasonId" in seasonsSummary[0]
            ? seasonsSummary[0].seasonId
            : seasonsSummary[0]._id;
        setSelectedSeason(firstSeasonId);
      }
    }
  }, [seasonsSummary, selectedSeason]);

  // Efeito para buscar episódios quando a temporada selecionada mudar
  useEffect(() => {
    if (!selectedSeason || !seriesId || !seasons.length) return;

    const season = seasons.find(
      (s) => ("seasonId" in s ? s.seasonId : s._id) === selectedSeason,
    );

    if (season && !episodes[selectedSeason]) {
      const seasonNumber = season.seasonNumber;
      setCurrentSeasonNumber(seasonNumber);
      execute(seriesId, seasonNumber);
    }
  }, [selectedSeason, seriesId, seasons, execute, episodes]);

  if (!seasonsSummary || seasonsSummary.length === 0) {
    return null;
  }

  const currentSeason = seasons.find(
    (season) =>
      ("seasonId" in season ? season.seasonId : season._id) === selectedSeason,
  );

  const handleSeasonChange = (value: string) => {
    setIsAnimating(false);
    setIsExpanded(false);
    setTimeout(() => {
      setSelectedSeason(value);
      setIsAnimating(true);
    }, 300);
  };

  const toggleExpanded = () => {
    if (animationInProgress) return;
    setAnimationInProgress(true);

    if (isExpanded) {
      // Recolhendo - inicia a animação imediatamente
      const cards = document.querySelectorAll(
        `.episode-card-${selectedSeason}`,
      );

      // Aplicar animação imediatamente em todos os cartões que serão escondidos
      for (let i = cards.length - 1; i >= episodesLimit; i--) {
        const card = cards[i] as HTMLElement;
        // Delay mais curto entre os cartões, mas começando já
        const delay = (cards.length - 1 - i) * 30;

        // Aplicar a transformação imediatamente com opacity reduzida
        card.style.transition = `opacity 250ms ease-out, transform 250ms ease-out ${delay}ms`;
        // Iniciar a animação imediatamente
        window.requestAnimationFrame(() => {
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";
        });
      }

      // Tempo total reduzido para a animação terminar
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
        Math.max((cards.length - episodesLimit) * 30 + 150, 200),
      );
    } else {
      // Expandindo
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

  return (
    <div className="w-full px-4 py-8 md:px-6">
      <h2 className="mb-6 text-3xl font-bold tracking-tighter">Episódios</h2>

      <div className="mb-8 max-w-xs">
        <Select value={selectedSeason} onValueChange={handleSeasonChange}>
          <SelectTrigger className="w-full border-white/20 bg-white/5 text-white">
            <SelectValue placeholder="Selecione uma temporada" />
          </SelectTrigger>
          <SelectContent className="bg-dark-700 border-white/20 text-white">
            {seasons.map((season) => (
              <SelectItem
                key={"seasonId" in season ? season.seasonId : season._id}
                value={"seasonId" in season ? season.seasonId : season._id}
                className="focus:bg-white/10 focus:text-white"
              >
                Temporada {season.seasonNumber}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {currentSeason && (
        <div
          className={`transform transition-all duration-500 ${isAnimating ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <div className="mb-4">
            <h3 className="text-xl font-medium">
              {currentSeason.title || `Temporada ${currentSeason.seasonNumber}`}
            </h3>
            {"plot" in currentSeason && currentSeason.plot && (
              <p className="mt-2 text-gray-400">{currentSeason.plot}</p>
            )}
          </div>

          {isLoading && (
            <div className="flex justify-center py-8">
              <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
            </div>
          )}

          {error && (
            <div className="rounded-md bg-red-500/20 p-4 text-red-200">
              <p>Erro ao carregar episódios. Tente novamente.</p>
            </div>
          )}

          {!isLoading && !error && episodes[selectedSeason] && (
            <>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {episodes[selectedSeason]
                  .slice(
                    0,
                    isExpanded
                      ? episodes[selectedSeason].length
                      : episodesLimit,
                  )
                  .map((episode, index) => {
                    const delayClass =
                      index <= 8 ? `delay-${index * 50}` : "delay-400"; // Limita os atrasos para evitar muitas classes

                    return (
                      <Card
                        key={`episode-${episode._id || index}-${currentSeason.seasonNumber}`}
                        className={`episode-card-${selectedSeason} transform overflow-hidden bg-white/5 transition-all duration-300 hover:bg-white/10 ${isAnimating ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
                        data-index={index}
                      >
                        <div className="flex flex-col p-4">
                          <div className="flex items-center gap-4">
                            {episode.poster && (
                              <Image
                                src={episode.poster}
                                alt={
                                  episode.title ||
                                  `Episódio ${episode.episodeNumber}`
                                }
                                width={120}
                                height={68}
                                className="rounded-md object-cover"
                              />
                            )}
                            <div>
                              <h3 className="font-semibold text-white">
                                {episode.episodeNumber}.{" "}
                                {episode.title ||
                                  `Episódio ${episode.episodeNumber}`}
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
                        </div>
                      </Card>
                    );
                  })}
              </div>

              {episodes[selectedSeason].length > episodesLimit && (
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={toggleExpanded}
                    className={`flex items-center gap-2 rounded-full px-6 py-2 text-white transition-colors ${
                      animationInProgress
                        ? "cursor-not-allowed bg-gray-500 opacity-50"
                        : "bg-primary/20 hover:bg-primary/30"
                    }`}
                    disabled={animationInProgress}
                  >
                    {isExpanded
                      ? "Ver menos"
                      : `Ver mais (${episodes[selectedSeason].length - episodesLimit} episódios)`}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
