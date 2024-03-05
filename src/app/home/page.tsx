import { Recommended } from "@/components/Recommended";
import { SkeletonsArray } from "@/components/SkeletonsArray";
import { TopStreaming } from "@/components/TopStreaming";
import { Suspense } from "react";

const boxLoadingRecommended = () => {
  return (
    <div className="mt-6 grid grid-cols-6 gap-6 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-6">
      <SkeletonsArray
        length={6}
        width="w-full"
        height="h-[27rem] xl:max-h-[27rem] lg:max-h-[20rem] sm:max-h-24 md:max-h-[12rem]"
      />
    </div>
  );
};

export default function Home() {
  return (
    <div className="flex flex-col p-6 font-primary">
      <main>
        <TopStreaming />
        <div className="flex flex-1">
          <div className="mb-4 flex flex-1 flex-col">
            <div className="mt-10 text-2xl font-semibold text-white">
              <h2>Recommended For Matheus Spindula</h2>
              {/* Todo Transformar em uma
    mensagem dinâmica 'relacionado' a cultura pop */}
            </div>
            <Suspense fallback={boxLoadingRecommended()}>
              <Recommended />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
