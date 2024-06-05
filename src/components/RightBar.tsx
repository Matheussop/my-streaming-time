import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { StreamingCard } from "./StreamingCard";

export function RightBar() {
  const imageTest =
    "https://br.web.img3.acsta.net/c_310_420/pictures/23/05/26/17/47/1900372.jpg";
  return (
    <div className="m-4 mt-2 rounded-lg bg-dark-600 p-6 shadow-lg">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Pesquisar"
            className="rounded-2xl border-2 border-zinc-400 bg-dark-600 bg-opacity-85 outline-none ring-offset-transparent focus:ring-0 focus-visible:border-primary"
          />
          <Search />
        </div>
        <div className="mt-8 ">
          <h1 className="text-lg text-zinc-200">Últimos assistidos</h1>
          <StreamingCard
            title="Dune Part Two ou tres ou quatro ou cinto ou cinco ou seis ou sete ou oito ou nove ou dez ou on"
            type="Action"
            rate={5}
            imageUrl={imageTest}
          />
        </div>
      </div>
    </div>
  );
}
