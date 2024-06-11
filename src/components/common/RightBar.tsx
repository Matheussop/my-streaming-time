import MovieSearch from "./MovieSearch";

export function RightBar() {
  const imageTest =
    "https://br.web.img3.acsta.net/c_310_420/pictures/23/05/26/17/47/1900372.jpg";
  return (
    <div className="m-4 mt-2 h-[84vh] rounded-lg bg-dark-600 p-6 shadow-lg ">
      <div className="flex flex-col">
        <MovieSearch />
        <div className="mt-8 "></div>
      </div>
    </div>
  );
}
