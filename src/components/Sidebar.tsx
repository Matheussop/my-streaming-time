"use client";
import {
  Building,
  Home as HomeIcon,
  LogOut,
  Settings,
  Timer,
} from "lucide-react";
import { Logo } from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SideBar() {
  const pathname = usePathname();

  return (
    <aside className="fixed bottom-0 left-0 z-10 h-full w-64 border-r-2 border-zinc-400 bg-dark-600 p-6">
      <div className="flex h-full flex-col">
        <div className="flex-1 flex-col">
          <div className="my-3">
            <Logo />
          </div>
          <nav className="mt-10 space-y-5">
            <Link
              href="/home"
              className={`flex items-center gap-3 text-sm font-semibold  ${pathname === "/home" ? "text-primary" : "text-zinc-200"}`}
            >
              <div
                className={`rounded-full p-1 ${pathname === "/home" ? "bg-primary" : "fill-white"}`}
              >
                <HomeIcon size={24} color="white" />
              </div>
              Home
            </Link>
            <Link
              href="/community"
              className={`flex items-center gap-3 text-sm font-semibold  ${pathname === "/community" ? "text-primary" : "text-zinc-200"}`}
            >
              <div
                className={`rounded-full p-1 ${pathname === "/community" ? "bg-primary" : "fill-white"}`}
              >
                <Building size={24} color="white" />
              </div>
              Comunidade
            </Link>
          </nav>
          <div className="pt-8">
            <h3>Extras</h3>
            <div className="mt-4">
              <Link
                className={`flex items-center gap-3 text-sm font-semibold  ${pathname === "/Time" ? "text-primary" : "text-zinc-200"}`}
                href="/Time"
              >
                <div
                  className={`rounded-full p-1 ${pathname === "/Time" ? "bg-primary" : "fill-white"}`}
                >
                  <Timer size={24} color="white" />
                </div>
                Tempo de tela
              </Link>
            </div>
          </div>
          <div className="pt-8">
            <h3>Gerais</h3>
            <div className="mt-4">
              <Link
                className={`flex items-center gap-3 text-sm font-semibold  ${pathname === "/Settings" ? "text-primary" : "text-zinc-200"}`}
                href="/Settings"
              >
                <div
                  className={`rounded-full p-1 ${pathname === "/Settings" ? "bg-primary" : "fill-white"}`}
                >
                  <Settings size={24} color="white" />
                </div>
                Configurações
              </Link>
              <Link
                className={`flex items-center gap-2 py-2  ${pathname === "/Logout" ? "text-primary" : "text-zinc-200"}`}
                href="/Logout"
              >
                <div
                  className={`rounded-full p-1 ${pathname === "/Logout" ? "bg-primary" : "fill-white"}`}
                >
                  <LogOut size={24} color="white" />
                </div>
                Sair
              </Link>
            </div>
          </div>
        </div>
        <div className="mr-2 flex items-center space-x-4">
          <div className="h-10 w-10 rounded-full bg-zinc-400 p-2"></div>
          <p>Matheus Luiz</p>
        </div>
      </div>
    </aside>
  );
}
