import { SkeletonsArray } from "@components/common/SkeletonsArray";

export default function CategoryLoading() {
  return (
    <div className="container py-6">
      <div className="mb-8">
        <div className="mb-2 h-10 w-64 animate-pulse rounded bg-white/10"></div>
        <div className="h-5 w-96 animate-pulse rounded bg-white/5"></div>
      </div>

      <div className="mb-6 flex items-center gap-5">
        <div className="h-10 w-20 animate-pulse rounded bg-white/10"></div>
        <div className="h-10 w-20 animate-pulse rounded bg-white/10"></div>
        <div className="h-10 w-20 animate-pulse rounded bg-white/10"></div>
        <div className="h-10 w-20 animate-pulse rounded bg-white/10"></div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-6 sm:grid-cols-2 md:grid-cols-3">
        <SkeletonsArray length={6} className="h-28 w-full" />
      </div>
    </div>
  );
}
