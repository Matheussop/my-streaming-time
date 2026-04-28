"use client";

import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdownmenu";
import { LogOut, ChevronUp, User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { SidebarMenuButton } from "@components/ui/sidebar";
import { useAuth } from "@context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

export const UserMenu = () => {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  const initials = user?.username
    ? user.username
        .split(" ")
        .map((name) => name[0]?.toUpperCase())
        .filter(Boolean)
        .slice(0, 2)
        .join("")
    : "MS";

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  if (isLoading) {
    return <LoadingSpinner className="h-8 w-8" />;
  }

  if (!user) {
    return (
      <Button
        variant="outline"
        onClick={() => router.push("/landing")}
        className="w-full rounded-2xl border-white/10 bg-white/4 px-4 text-zinc-100 hover:bg-white/8"
      >
        Entrar
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          aria-label="Abrir menu da conta"
          tooltip="Abrir menu da conta"
          size="lg"
          className="hover:border-primary/20 data-[state=open]:border-primary/25 rounded-2xl border border-white/8 bg-linear-to-r from-white/8 to-white/4 px-3 py-3 transition-all duration-300 hover:bg-white/8 data-[state=open]:bg-white/10"
        >
          <div className="bg-primary/16 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 text-sm font-semibold">
            {initials}
          </div>
          <div className="min-w-0 flex-1 text-left group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-semibold text-zinc-100">
              {user.username}
            </p>
            <p className="mt-0.5 truncate text-xs text-zinc-400">
              Conta conectada
            </p>
          </div>
          <ChevronUp className="ml-auto h-4 w-4 text-zinc-400 transition-transform group-data-[collapsible=icon]:hidden" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-dark-700 w-64 rounded-2xl border-white/10 p-2 text-zinc-100 shadow-2xl"
        align="end"
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center gap-3 rounded-xl bg-white/4 p-3">
            <div className="bg-primary/16 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 text-sm font-semibold">
              {initials}
            </div>
            <div className="min-w-0 space-y-1">
              <p className="text-sm leading-none font-medium text-zinc-100">
                {user.username}
              </p>
              <p className="text-xs leading-none text-zinc-400">Sessão ativa</p>
              <p className="truncate text-xs leading-none text-zinc-500">
                {user.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/8" />
        <DropdownMenuLabel className="px-3 pb-1 text-[0.65rem] font-semibold tracking-[0.22em] text-zinc-500 uppercase">
          Conta
        </DropdownMenuLabel>
        <DropdownMenuItem
          className="cursor-default rounded-xl px-3 py-2.5 text-zinc-400"
          disabled
        >
          <User2 className="h-4 w-4" />
          <div className="flex flex-col">
            <span>Perfil e preferências</span>
            <span className="text-[11px] text-zinc-500">
              Disponível em breve
            </span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/8" />
        <DropdownMenuItem
          className="cursor-pointer rounded-xl px-3 py-2.5 text-zinc-100 focus:bg-white/8 focus:text-white"
          onSelect={handleLogout}
        >
          <LogOut className="text-primary h-4 w-4" />
          <div className="flex flex-col">
            <span>Sair da conta</span>
            <span className="text-[11px] text-zinc-500">
              Encerrar sessão neste dispositivo
            </span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
