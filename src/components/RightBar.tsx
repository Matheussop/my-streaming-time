import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { CardMovie } from "./CardMovie";

export function RightBar() {
  const imageTest =
    "https://br.web.img3.acsta.net/c_310_420/pictures/23/05/26/17/47/1900372.jpg";
  return (
    <div className="fixed bottom-0 right-0 z-10 h-screen w-64 border-l-2 border-zinc-400 bg-dark-700 px-2">
      <div className="mt-10 flex h-screen flex-col">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Pesquisar"
            className="rounded-2xl border-2 border-zinc-400 bg-dark-700 outline-none ring-offset-transparent focus:ring-0 focus-visible:border-primary"
          />
          <Search />
        </div>
        <div className="mt-8 ">
          <h1 className="text-lg text-zinc-200">Últimos assistidos</h1>
          <CardMovie
            title="Dune Part Two ou tres ou quatro"
            type="Action"
            rate={5}
            imageUrl={imageTest}
          />
        </div>
      </div>
    </div>
  );
}
