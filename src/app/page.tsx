import { SideBar } from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="font-primary flex h-screen flex-col">
      <div className="flex flex-1">
        <aside className="w-64 border-r-2 border-zinc-400 p-6">
          <SideBar />
        </aside>
        <main className="flex-1 p-6"></main>
      </div>
    </div>
  );
}
