"use client";
import GenreChart from "@components/Chart/genre";
import { useApiRequest } from "@lib/hooks/useApiRequest";
import { useAuth } from "@context/AuthContext";
import { userStreamingHistoryApi } from "@api/userStreamingHistoryApi";
import { useEffect, useState } from "react";

interface WatchTimeStats {
  totalWatchTimeInMinutes: number;
  averageWatchTimePerDay: number;
  averageWatchTimePerSession: number;
  watchTimeByContentType: {
    series: number;
    movie: number;
  };
}

interface ContentTypeDistribution {
  totalContent: number;
  byType: {
    series: number;
    movie: number;
  };
  percentageByType: {
    series: number;
    movie: number;
  };
}

interface SeriesProgress {
  title: string;
  totalEpisodes: number;
  watchedEpisodes: number;
  completionPercentage: number;
  totalWatchTimeInMinutes: number;
  averageEpisodeLength: number;
}

interface SeriesProgressStats {
  series: SeriesProgress[];
  mostWatchedSeries: SeriesProgress;
  leastWatchedSeries: SeriesProgress;
  averageCompletionPercentage: number;
}

interface WatchingPatternStats {
  mostActiveDate: string;
  mostActiveDay: string;
  mostActiveHour: number;
  watchCountByDay: Record<string, number>;
  watchCountByHour: Record<string, number>;
  averageTimeBetweenEpisodes: number;
}

interface GenrePreferenceStats {
  genreCounts: Record<string, number>;
  genrePercentages: Record<string, number>;
  topGenres: Array<{
    genre: string;
    count: number;
    percentage: number;
  }>;
  watchTimeByGenre: Record<string, number>;
  averageCompletionByGenre: Record<string, number>;
}

interface ScreenTimeData {
  watchTimeStats: WatchTimeStats;
  contentTypeDistribution: ContentTypeDistribution;
  seriesProgressStats: SeriesProgressStats;
  watchingPatternStats: WatchingPatternStats;
  genrePreferenceStats: GenrePreferenceStats;
}

export default function ScreenTime() {
  const formatTime = (minutes: number) => {
    const days = Math.floor(minutes / 1440);
    const hours = Math.floor((minutes % 1440) / 60);
    const mins = minutes % 60;
    const daysStr = days > 1 ? `${days} dias ` : days === 1 ? "1 dia " : "";
    const hoursStr =
      hours > 1 ? `${hours} horas ` : hours === 1 ? "1 hora " : "";
    const minsStr = mins > 1 ? `${mins} minutos` : mins === 1 ? "1 minuto" : "";
    return `${daysStr}${hoursStr}${minsStr}`;
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const [data, setData] = useState<ScreenTimeData | null>(null);

  const { user } = useAuth();
  const { isLoading, execute: executeData } = useApiRequest<ScreenTimeData>(
    (userId: string) => userStreamingHistoryApi.getStats(userId),
    {
      onSuccess: (data) => {
        setData(data);
      },
    },
  );

  useEffect(() => {
    executeData(user?._id);
  }, [executeData, user?._id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <div className="bg-dark-600 m-4 flex min-h-[100dvh] flex-col gap-8 rounded-lg p-6 shadow-lg">
      {/* Seção de Estatísticas Gerais */}
      <section className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Screen Time
        </h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="rounded-lg bg-gray-700 p-4 shadow-md">
            <h3 className="text-lg font-semibold">Tempo Total Assistido</h3>
            <p className="text-2xl font-bold">
              {formatTime(data.watchTimeStats.totalWatchTimeInMinutes)}
            </p>
          </div>

          <div className="rounded-lg bg-gray-700 p-4 shadow-md">
            <h3 className="text-lg font-semibold">Média Diária</h3>
            <p className="text-2xl font-bold">
              {formatTime(data.watchTimeStats.averageWatchTimePerDay)}
            </p>
          </div>

          <div className="rounded-lg bg-gray-700 p-4 shadow-md">
            <h3 className="text-lg font-semibold">Média por Sessão</h3>
            <p className="text-2xl font-bold">
              {formatTime(
                Math.round(data.watchTimeStats.averageWatchTimePerSession),
              )}
            </p>
          </div>

          <div className="rounded-lg bg-gray-700 p-4 shadow-md">
            <h3 className="text-lg font-semibold">Total de Conteúdo</h3>
            <p className="text-2xl font-bold">
              {data.contentTypeDistribution.totalContent}
            </p>
          </div>
        </div>
      </section>

      {/* Seção de Distribuição por Tipo */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Distribuição por Tipo</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-gray-700 p-4 shadow-md">
            <h3 className="text-lg font-semibold">Séries</h3>
            <p className="text-xl font-bold">
              {data.contentTypeDistribution.byType.series} (
              {formatPercentage(
                data.contentTypeDistribution.percentageByType.series,
              )}
              )
            </p>
          </div>
          <div className="rounded-lg bg-gray-700 p-4 shadow-md">
            <h3 className="text-lg font-semibold">Filmes</h3>
            <p className="text-xl font-bold">
              {data.contentTypeDistribution.byType.movie} (
              {formatPercentage(
                data.contentTypeDistribution.percentageByType.movie,
              )}
              )
            </p>
          </div>
        </div>
      </section>

      {/* Seção de Progresso das Séries */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Progresso das Séries</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.seriesProgressStats.series.map((series, index) => (
            <div key={index} className="rounded-lg bg-gray-700 p-4 shadow-md">
              <h3 className="text-lg font-semibold">{series.title}</h3>
              <div className="mt-2 space-y-1">
                <p>
                  Episódios: {series.watchedEpisodes}/{series.totalEpisodes}
                </p>
                <p>
                  Progresso: {formatPercentage(series.completionPercentage)}
                </p>
                <p>Tempo Total: {formatTime(series.totalWatchTimeInMinutes)}</p>
                <p>Duração Média: {formatTime(series.averageEpisodeLength)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seção de Padrões de Visualização */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Padrões de Visualização</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div className="rounded-lg bg-gray-700 p-4 shadow-md">
            <h3 className="text-lg font-semibold">Dia Mais Ativo</h3>
            <p className="text-xl font-bold">
              {data.watchingPatternStats.mostActiveDay}
            </p>
          </div>
          <div className="rounded-lg bg-gray-700 p-4 shadow-md">
            <h3 className="text-lg font-semibold">Horário Mais Ativo</h3>
            <p className="text-xl font-bold">
              {data.watchingPatternStats.mostActiveHour}h
            </p>
          </div>
        </div>
      </section>

      {/* Seção de Preferências de Gênero */}
      <section className="flex flex-col space-y-4">
        <h2 className="text-2xl font-bold">Top 10 Gêneros</h2>
        <div className="flex flex-row justify-evenly gap-8">
          {/* Gráfico de Gêneros */}
          <div className="h-[60%] w-[60%] rounded-lg bg-gray-700 p-6 shadow-md">
            <h3 className="mb-4 text-lg font-semibold">
              Distribuição de Gêneros
            </h3>
            <div className="h-full w-full">
              <GenreChart
                data={data.genrePreferenceStats.topGenres.map((genre) => ({
                  genre: genre.genre,
                  quantity: genre.percentage,
                }))}
              />
            </div>
          </div>

          {/* Cards de Gêneros */}
          <div className="grid h-[40%] w-[40%] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {data.genrePreferenceStats.topGenres.map((genre, index) => (
              <div key={index} className="rounded-lg bg-gray-700 p-4 shadow-md">
                <h3 className="text-lg font-semibold">{genre.genre}</h3>
                <p className="text-xl font-bold">
                  {formatPercentage(genre.percentage)}
                </p>
                <p className="text-sm text-gray-400">{genre.count} conteúdos</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
