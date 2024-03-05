import { Skeleton } from "./ui/skeleton";

interface Props {
  length: number;
  width: string;
  height: string;
}
export function SkeletonsArray({ length, width, height }: Props) {
  return Array.from({ length }, (_, index) => (
    <Skeleton key={index} className={`h-${height} w-${width}`} />
  ));
}
