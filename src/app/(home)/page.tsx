import { Recommended } from "@components/Recommended/RecommendedList";
import { Categories } from "@components/common/Categories";
import { SkeletonsArray } from "@components/common/SkeletonsArray";
import { TopStreaming } from "@components/common/TopStreaming";
import { Suspense } from "react";

const boxLoading = () => {
  return (
    <div className="mt-6 grid grid-cols-6 gap-6 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-6">
      <SkeletonsArray
        length={6}
        className="h-[27rem] w-full sm:max-h-24 md:max-h-[12rem] lg:max-h-[20rem] xl:max-h-[27rem]"
      />
    </div>
  );
};

export default function Home() {
  return (
    <div className="bg-dark-600 font-primary m-4 mt-2 mr-2 flex flex-col rounded-lg p-6 shadow-lg">
      <main>
        <TopStreaming />
        <div className="flex flex-1 break-all">
          <div className="mb-4 flex flex-1 flex-col">
            <div className="mt-10 mb-4 text-2xl font-semibold text-white">
              <h2>Recomendados para Matheus Luiz</h2>
              {/* TODO Transformar em uma
    mensagem dinâmica 'relacionado' a cultura pop */}
            </div>
            <Suspense fallback={boxLoading()}>
              <Recommended />
            </Suspense>
            <div className="mt-10 mb-4 text-2xl font-semibold text-white">
              <h2>Categorias</h2>
            </div>
            <Suspense fallback={boxLoading()}>
              <Categories />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
