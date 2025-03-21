export const LoadingSpinner = () => {
  return (
    <div className="flex h-full flex-1 items-center justify-center">
      <div className="border-secondary border-t-primary mr-3 h-10 w-10 animate-spin rounded-full border-2"></div>
    </div>
  );
};

export default LoadingSpinner;
