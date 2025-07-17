import { RightBar } from "@components/common/RightBar";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full justify-between">
      {children}
      <RightBar />
    </div>
  );
}
