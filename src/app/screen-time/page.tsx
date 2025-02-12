"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import GenreChart from "@components/Chart/genre";

const dataGlobalMetrics = [
  { label: "Total Movies", value: "24" },
  { label: "Total Movie Time", value: "320" },
  { label: "Favorite Genre", value: "Action" },
  { label: "Favorite Movie", value: "Dune" },
  { label: "Total Series", value: "24" },
  { label: "Total Series Time", value: "1000" },
  { label: "Favorite Genre", value: "Drama" },
  { label: "Favorite Series", value: "Mr Robot" },
];
export default function ScreenTime() {
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
    <div className="m-4 flex min-h-[100dvh] flex-row justify-evenly rounded-lg bg-dark-600 p-6 shadow-lg">
      <section className="w-full pt-12 md:pt-24 lg:pt-32">
        <div className="container space-y-10 xl:space-y-16">
          <div className="mx-auto grid max-w-[1300px] justify-center gap-4 px-4 sm:px-6">
            <div>
              <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                Screen Time
              </h1>
              <div className="text-lg font-medium text-gray-400">
                Total Time Watched: {formatTime(2000)}
              </div>
            </div>
          </div>
          <div>
            <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {dataGlobalMetrics.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-gray-700 p-4 shadow-md"
                >
                  <h3 className="text-xl font-bold">{item.label}</h3>
                  <p className="text-lg font-medium text-gray-400">
                    {item.value}
                  </p>
                </div>
              ))}
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
                  <h2 className="mb-4 text-3xl font-bold tracking-tighter">
                    Time Watched by Category
                  </h2>
                  <GenreChart />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="series">
              <div className="grid gap-10 sm:px-10 md:grid-cols-2 md:gap-16">
                <div>
                  <h2 className="mb-4 text-3xl font-bold tracking-tighter">
                    Time Watched by Category
                  </h2>
                  <GenreChart />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
