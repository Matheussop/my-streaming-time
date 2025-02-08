"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";

interface ScreenTimeData {
  totalMinutes: number;
  categories: {
    movies: { [key: string]: number };
    series: { [key: string]: number };
  };
}

export default function ScreenTime() {
  const [screenTime, setScreenTime] = useState<ScreenTimeData | null>(null);

  useEffect(() => {
    const fetchScreenTime = async () => {
      // Dados fictícios
      const data: ScreenTimeData = {
        totalMinutes: 2000,
        categories: {
          movies: {
            Action: 300,
            Comedy: 400,
            Drama: 500,
            Horror: 200,
            "Sci-Fi": 100,
          },
          series: {
            Action: 150,
            Comedy: 500,
            Drama: 1000,
            Horror: 250,
            "Sci-Fi": 100,
          },
        },
      };
      setScreenTime(data);
    };

    fetchScreenTime();
  }, []);

  if (!screenTime) {
    return <div>Loading...</div>;
  }

  const formatTime = (minutes: number) => {
    const days = Math.floor(minutes / 1440);
    const hours = Math.floor((minutes % 1440) / 60);
    const mins = minutes % 60;
    const daysStr = days > 1 ? `${days} dias ` : days === 1 ? "1 dia " : "";
    const hoursStr =
      hours > 1 ? `${hours} horas ` : hours === 1 ? "1 hora " : "";
    const minsStr = mins > 1 ? `${mins} minutos` : mins === 1 ? "1 minuto" : "";
    return `${daysStr} ${hoursStr} ${minsStr}`;
  };

  return (
    <div className="m-4 flex min-h-[100dvh] flex-row justify-evenly rounded-lg bg-dark-600 p-6 shadow-lg md:grid-cols-2 md:gap-16 md:px-10">
      <section className="w-full pt-12 md:pt-24 lg:pt-32">
        <div className="container space-y-10 xl:space-y-16">
          <div className="mx-auto grid max-w-[1300px] justify-center gap-4 px-4 sm:px-6">
            <div>
              <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                Screen Time
              </h1>
              <div className="text-lg font-medium text-gray-400">
                Total Time Watched: {formatTime(screenTime.totalMinutes)}
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg bg-gray-700 p-4 shadow-md">
                <h3 className="text-xl font-bold">Total Movies</h3>
                <p className="text-lg font-medium text-gray-400">
                  {Object.keys(screenTime.categories.movies).length}
                </p>
              </div>
              <div className="rounded-lg bg-gray-700 p-4 shadow-md">
                <h3 className="text-xl font-bold">Total Movie Time</h3>
                <p className="text-lg font-medium text-gray-400">
                  {formatTime(
                    Object.values(screenTime.categories.movies).reduce(
                      (acc, minutes) => acc + minutes,
                      0,
                    ),
                  )}
                </p>
              </div>
              <div className="rounded-lg bg-gray-700 p-4 shadow-md">
                <h3 className="text-xl font-bold">Favorite Genre</h3>
                <p className="text-lg font-medium text-gray-400">
                  {Object.keys(screenTime.categories.movies).length}
                </p>
              </div>
              <div className="rounded-lg bg-gray-700 p-4 shadow-md">
                <h3 className="text-xl font-bold">Favorite Movie</h3>
                <p className="text-lg font-medium text-gray-400">Dune</p>
              </div>
              <div className="rounded-lg bg-gray-700 p-4 shadow-md">
                <h3 className="text-xl font-bold">Total Episodes Series</h3>
                <p className="text-lg font-medium text-gray-400">
                  {Object.keys(screenTime.categories.series).length}
                </p>
              </div>
              <div className="rounded-lg bg-gray-700 p-4 shadow-md">
                <h3 className="text-xl font-bold">Total Series Time</h3>
                <p className="text-lg font-medium text-gray-400">
                  {formatTime(
                    Object.values(screenTime.categories.series).reduce(
                      (acc, minutes) => acc + minutes,
                      0,
                    ),
                  )}
                </p>
              </div>
              <div className="rounded-lg bg-gray-700 p-4 shadow-md">
                <h3 className="text-xl font-bold">Favorite Genre</h3>
                <p className="text-lg font-medium text-gray-400">
                  {Object.keys(screenTime.categories.movies).length}
                </p>
              </div>
              <div className="rounded-lg bg-gray-700 p-4 shadow-md">
                <h3 className="text-xl font-bold">Favorite Series</h3>
                <p className="text-lg font-medium text-gray-400">One Piece</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <Tabs className="w-[50vw]" defaultValue="movies">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="movies">Movies</TabsTrigger>
              <TabsTrigger value="series">Series</TabsTrigger>
            </TabsList>
            <TabsContent value="movies">
              <div className="grid gap-10 sm:px-10 md:grid-cols-2 md:gap-16">
                <div>
                  <h2 className="text-3xl font-bold tracking-tighter">
                    Time Watched by Category
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {Object.entries(screenTime.categories.movies).map(
                      ([category, minutes]) => (
                        <li key={category}>
                          <div className="font-medium">{category}</div>
                          <div className="text-gray-400">
                            {formatTime(minutes)}
                          </div>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="series">
              <div className="grid gap-10 sm:px-10 md:grid-cols-2 md:gap-16">
                <div>
                  <h2 className="text-3xl font-bold tracking-tighter">
                    Time Watched by Category
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {Object.entries(screenTime.categories.series).map(
                      ([category, minutes]) => (
                        <li key={category}>
                          <div className="font-medium">{category}</div>
                          <div className="text-gray-400">
                            {formatTime(minutes)}
                          </div>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
