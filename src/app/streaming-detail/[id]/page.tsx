import Image from "next/image";

export default function Streaming({ params }: { params: { id: string } }) {
  return (
    <div className="m-4 flex min-h-[100dvh] flex-col rounded-lg bg-dark-600 p-6 shadow-lg">
      <section className="w-full pt-12 md:pt-24 lg:pt-32">
        <div className="container space-y-10 xl:space-y-16">
          <div className="mx-auto grid max-w-[1300px] gap-4 px-4 sm:px-6 md:grid-cols-2 md:gap-16 md:px-10">
            <div>
              <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                The Lord of the Rings: The Fellowship of the Ring
              </h1>
              <div className="text-lg font-medium text-gray-500 dark:text-gray-400">
                2001
              </div>
            </div>
            <Image
              src="/placeholder.svg"
              alt="Movie Poster"
              width={200}
              height={200}
              className="mx-auto aspect-[16/9] overflow-hidden rounded-xl object-cover"
            />
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
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                The future of civilization rests in the fate of the One Ring,
                which has been lost for centuries. Powerful forces are
                unrelenting in their search for it. But fate has placed it in
                the hands of a young Hobbit named Frodo Baggins, who inherits
                the Ring and steps into legend. A daunting task lies ahead for
                Frodo when he becomes the Ringbearer - to destroy the One Ring
                in the fires of Mount Doom where it was forged.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tighter">
                Cast &amp; Crew
              </h2>
              <ul className="mt-4 space-y-2">
                <li>
                  <div className="font-medium">Directed by</div>
                  <div className="text-gray-500 dark:text-gray-400">
                    Peter Jackson
                  </div>
                </li>
                <li>
                  <div className="font-medium">Starring</div>
                  <div className="text-gray-500 dark:text-gray-400">
                    Elijah Wood, Ian McKellen, Viggo Mortensen, Sean Astin
                  </div>
                </li>
                <li>
                  <div className="font-medium">Screenplay</div>
                  <div className="text-gray-500 dark:text-gray-400">
                    Fran Walsh, Philippa Boyens, Peter Jackson, Stephen Sinclair
                  </div>
                </li>
                <li>
                  <div className="font-medium">Music</div>
                  <div className="text-gray-500 dark:text-gray-400">
                    Howard Shore
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
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
                <div className="text-gray-500 dark:text-gray-400">
                  Fantasy, Adventure
                </div>
              </div>
              <div>
                <div className="font-medium">Runtime</div>
                <div className="text-gray-500 dark:text-gray-400">2h 58m</div>
              </div>
              <div>
                <div className="font-medium">Ratings</div>
                <div className="text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-primary" />
                    <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
                    8.8/10
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
