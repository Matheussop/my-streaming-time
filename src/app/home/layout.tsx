import { RightBar } from "@/components/RightBar";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mr-64 flex h-full">
      {children}
      <RightBar />
    </div>
  );
}
