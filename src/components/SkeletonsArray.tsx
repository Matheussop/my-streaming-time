import { Skeleton } from "./ui/skeleton";

interface Props {
  length: number;
  className?: string;
  height: string;
  width: string;
}
export function SkeletonsArray({ length, height, width }: Props) {
  return Array.from({ length }, (_, index) => (
    <Skeleton key={index} className={`${height} ${width} `} />
  ));
}
