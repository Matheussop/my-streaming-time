import { Recommended } from "@components/Recommended/RecommendedList";
import { Categories } from "@components/common/Categories";
import { SkeletonsArray } from "@components/common/SkeletonsArray";
import { TopStreaming } from "@components/common/TopStreaming";
import { Suspense } from "react";

const ContentSectionSkeleton = () => {
  return (
    <div className="mt-6 grid grid-cols-6 gap-6 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-6">
      <SkeletonsArray
        length={6}
        className="h-[27rem] w-full sm:max-h-24 md:max-h-[12rem] lg:max-h-[20rem] xl:max-h-[27rem]"
      />
    </div>
  );
};

// Dynamic greeting message generator
const getGreetingMessage = () => {
  /* TODO Transformar em uma
    mensagem dinâmica 'relacionado' a cultura pop */
  const messages = [
    "Recomendados para você",
    "Escolhidos especialmente para você",
    "Você pode gostar destes",
    "Baseado no seu histórico",
    "Selecionados para o seu gosto",
  ];

  return messages[Math.floor(Math.random() * messages.length)];
};

export default function Home() {
  const greetingMessage = getGreetingMessage();

  return (
    <div className="bg-dark-600 font-primary m-4 mt-2 mr-2 flex flex-col rounded-lg p-6 shadow-lg">
      <main>
        <TopStreaming />
        <div className="flex flex-1 break-all">
          <div className="mb-4 flex flex-1 flex-col">
            <div className="mt-10 mb-4 text-2xl font-semibold text-white">
              <h2>{greetingMessage}</h2>
            </div>
            <Suspense fallback={<ContentSectionSkeleton />}>
              <Recommended />
            </Suspense>
            <div className="mt-10 mb-4 text-2xl font-semibold text-white">
              <h2>Categorias</h2>
            </div>
            <Suspense fallback={<ContentSectionSkeleton />}>
              <Categories />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
