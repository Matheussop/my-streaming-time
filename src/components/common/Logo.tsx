import { cn } from "@lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("font-secondary my-1 flex text-xl", className)}>
      <p className="font-outline-1">My</p>
      <span className="font-outline-1 text-primary px-1">STREAMING</span>
      <p className="font-outline-1">Time</p>
    </div>
  );
}
