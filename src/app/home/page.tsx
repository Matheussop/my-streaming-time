"use client";

import { Recommended } from "@/components/Recommended";
import { TopStreaming } from "@/components/TopStreaming";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [typeStreaming, setTypeStreaming] = useState<
    "movies" | "series" | "animes"
  >("series");

  const onHandleChangeTypeStreaming = (
    typeStreaming: "movies" | "series" | "animes",
  ) => {
    setTypeStreaming(typeStreaming);
  };

  return (
    <div className="flex w-screen flex-col p-6 font-primary">
      <section className="flex flex-col">
        <div className="mt-10 flex items-center gap-5 text-2xl">
          <Button
            onClick={() => onHandleChangeTypeStreaming("series")}
            className={`flex items-center bg-transparent text-xl hover:text-white ${typeStreaming === "series" ? "text-primary" : "text-zinc-200"}`}
          >
            Series
          </Button>
          <Button
            onClick={() => onHandleChangeTypeStreaming("movies")}
            className={`flex items-center bg-transparent text-xl hover:text-white ${typeStreaming === "movies" ? "text-primary" : "text-zinc-200"}`}
          >
            Filmes
          </Button>
          <Button
            onClick={() => onHandleChangeTypeStreaming("animes")}
            className={`flex items-center bg-transparent text-xl hover:text-white ${typeStreaming === "animes" ? "text-primary" : "text-zinc-200"}`}
          >
            Animes
          </Button>
        </div>
      </section>
      <div className="flex flex-1">
        <main className="flex-1 ">
          <div>
            <TopStreaming typeOfStreaming={typeStreaming} />
          </div>
          <div className="h-full">
            <div className="mt-10 text-2xl font-semibold text-white">
              <h2>Made For Matheus Spindula</h2>
              {/* Todo Transformar em uma
    mensagem dinâmica 'relacionado' a cultura pop */}
            </div>
            <Recommended />
          </div>
        </main>
      </div>
    </div>
  );
}
