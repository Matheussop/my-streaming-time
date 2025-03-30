import { Skeleton } from "@components/ui/skeleton";

export default function Loading() {
  return (
    <div className="bg-dark-600 m-4 flex min-h-[100dvh] flex-col rounded-lg p-6 shadow-lg">
      <section className="w-full pt-12 md:pt-24 lg:pt-32">
        <div className="container space-y-10 xl:space-y-16">
          <div className="mx-auto grid max-w-[1300px] gap-4 px-4 sm:px-6 md:grid-cols-2 md:gap-16 md:px-10">
            <div className="space-y-4">
              <Skeleton className="h-10 w-32 rounded-full" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <div className="flex flex-wrap gap-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-8 w-24 rounded-full" />
                ))}
              </div>
            </div>
            <div>
              <Skeleton className="aspect-16/9 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 sm:px-10 md:grid-cols-2 md:gap-16">
            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-32 w-full" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-primary/75 mb-4 w-full rounded-lg p-6 py-12 shadow-lg md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-2">
            <Skeleton className="h-8 w-48" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-32 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
