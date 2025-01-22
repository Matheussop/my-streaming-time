import MovieSearch from "./MovieSearch";

export function RightBar() {
  return (
    <div className="m-4 mt-2 h-[84vh] rounded-lg bg-dark-600 p-6 shadow-lg ">
      <div className="flex flex-col">
        <MovieSearch />
        <div className="mt-8 "></div>
      </div>
    </div>
  );
}
