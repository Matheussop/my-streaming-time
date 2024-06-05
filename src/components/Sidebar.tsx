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
    <aside className="m-4 rounded-lg bg-dark-600 p-6 shadow-lg">
      <div className="flex w-full items-center justify-between align-middle">
        <div className="flex items-center space-x-5">
          <div className="my-3">
            <Logo />
          </div>
          <nav className="flex space-x-5">
            <Link
              href="/home"
              className={`flex items-center gap-3 rounded-full px-4 py-2 text-sm font-semibold transition duration-300 ${
                pathname === "/home"
                  ? "bg-primary text-white shadow-lg"
                  : "bg-zinc-700 text-zinc-200 hover:bg-primary hover:text-white"
              }`}
            >
              <HomeIcon size={24} color="white" />
              Home
            </Link>
            <Link
              href="/community"
              className={`flex items-center gap-3 rounded-full px-4 py-2 text-sm font-semibold transition duration-300 ${
                pathname === "/community"
                  ? "bg-primary text-white shadow-lg"
                  : "bg-zinc-700 text-zinc-200 hover:bg-primary hover:text-white"
              }`}
            >
              <Building size={24} color="white" />
              Comunidade
            </Link>
            <Link
              href="/Time"
              className={`flex items-center gap-3 rounded-full px-4 py-2 text-sm font-semibold transition duration-300 ${
                pathname === "/Time"
                  ? "bg-primary text-white shadow-lg"
                  : "bg-zinc-700 text-zinc-200 hover:bg-primary hover:text-white"
              }`}
            >
              <Timer size={24} color="white" />
              Tempo de tela
            </Link>
            <Link
              href="/Settings"
              className={`flex items-center gap-3 rounded-full px-4 py-2 text-sm font-semibold transition duration-300 ${
                pathname === "/Settings"
                  ? "bg-primary text-white shadow-lg"
                  : "bg-zinc-700 text-zinc-200 hover:bg-primary hover:text-white"
              }`}
            >
              <Settings size={24} color="white" />
              Configurações
            </Link>
            <Link
              href="/Logout"
              className={`flex items-center gap-3 rounded-full px-4 py-2 text-sm font-semibold transition duration-300 ${
                pathname === "/Logout"
                  ? "bg-primary text-white shadow-lg"
                  : "bg-zinc-700 text-zinc-200 hover:bg-primary hover:text-white"
              }`}
            >
              <LogOut size={24} color="white" />
              Sair
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 rounded-full bg-zinc-400 p-2"></div>
          <p>Matheus Luiz</p>
        </div>
      </div>
    </aside>
  );
}
