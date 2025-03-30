import { cn } from "@lib/utils";

interface LoadingSpinnerProps {
  className?: string;
}

export const LoadingSpinner = ({ className }: LoadingSpinnerProps) => {
  return (
    <div className="flex h-full flex-1 items-center justify-center">
      <div
        className={cn(
          "border-secondary border-t-primary mr-3 h-10 w-10 animate-spin rounded-full border-2",
          className,
        )}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
