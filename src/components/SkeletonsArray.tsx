import { Skeleton } from "./ui/skeleton";
import { tv } from "tailwind-variants";

interface Props {
  length: number;
  className?: string;
}

const skeletons = tv({});
export function SkeletonsArray({ length, className }: Props) {
  return Array.from({ length }, (_, index) => (
    <Skeleton key={index} className={(skeletons(), className)} />
  ));
}
