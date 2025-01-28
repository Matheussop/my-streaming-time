import { getMovieById } from "@app/api/movies";
import Image from "next/image";
import { notFound } from "next/navigation";

const getDateCache = async (id: string) => {
  try {
    const data = await getMovieById(id);
    const streamingObj = {
      title: data.title,
      plot: data.plot,
      rating: data.rating.toFixed(1),
      stars: Math.round(data.rating / 2),
      poster: data.poster,
      url: data.url,
      year: new Date(data.release_date).getFullYear(),
    };
    return streamingObj;
  } catch (error) {
    notFound();
  }
};

export default async function Streaming({
  params,
}: {
  params: { id: string };
}) {
  const totalStars = 5;

  const { title, year, plot, rating, stars, poster } = await getDateCache(
    params.id,
  );
  return (
    <div className="m-4 flex min-h-[100dvh] flex-col rounded-lg bg-dark-600 p-6 shadow-lg">
      <section className="w-full pt-12 md:pt-24 lg:pt-32">
        <div className="container space-y-10 xl:space-y-16">
          <div className="mx-auto grid max-w-[1300px] gap-4 px-4 sm:px-6 md:grid-cols-2 md:gap-16 md:px-10">
            <div>
              <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                {title}
              </h1>
              <div className="text-lg font-medium text-gray-400">{year}</div>
            </div>
            <div>
              <Image
                alt="Movie Poster"
                src={poster}
                width={600}
                height={350}
                placeholder={"blur"}
                blurDataURL={"/placeholder_gif.gif"}
                className="mx-auto aspect-[16/9] overflow-hidden rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 sm:px-10 md:grid-cols-2 md:gap-16">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter">
                Plot Summary
              </h2>
              <p className="mt-4 text-gray-400">{plot}</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tighter">
                Cast &amp; Crew
              </h2>
              <ul className="mt-4 space-y-2">
                <li>
                  <div className="font-medium">Directed by</div>
                  <div className="text-gray-400">Peter Jackson</div>
                </li>
                <li>
                  <div className="font-medium">Starring</div>
                  <div className="text-gray-400">
                    Elijah Wood, Ian McKellen, Viggo Mortensen, Sean Astin
                  </div>
                </li>
                <li>
                  <div className="font-medium">Screenplay</div>
                  <div className="text-gray-400">
                    Fran Walsh, Philippa Boyens, Peter Jackson, Stephen Sinclair
                  </div>
                </li>
                <li>
                  <div className="font-medium">Music</div>
                  <div className="text-gray-400">Howard Shore</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-4 w-full rounded-lg bg-primary/80 p-6 py-12 shadow-lg dark:bg-gray-800 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter">
                Additional Details
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <div className="font-medium">Genre</div>
                <div className="text-white/80">Fantasy, Adventure</div>
              </div>
              <div>
                <div className="font-medium">Runtime</div>
                <div className="text-white/80">2h 58m</div>
              </div>
              <div>
                <div className="font-medium">Ratings</div>
                <div className="text-white/80">
                  <div className="flex items-center gap-1">
                    {[...Array(totalStars)].map((_, index) => (
                      <StarIcon
                        key={index}
                        className={`h-5 w-5 stroke-gray-700 ${stars > index ? "fill-yellow" : "fill-gray-300"}`}
                      />
                    ))}
                    <span className="ml-2 text-white">{rating}/10</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
