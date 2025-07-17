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
import { User, LogOut, Settings, ChevronUp, User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { SidebarMenuButton } from "@components/ui/sidebar";
import { useAuth } from "@context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

export const UserMenu = () => {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    logout().then(() => {
      router.push("/");
    });
  };

  if (isLoading) {
    return <LoadingSpinner className="h-8 w-8" />;
  }

  if (!user) {
    return (
      <Button
        variant="outline"
        onClick={() => router.push("/landing")}
        className="px-4"
      >
        Logout
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton className="bg-zinc-700 transition duration-300">
          <User2 /> {user.username}
          <ChevronUp className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">{user.username}</p>
            <p className="text-muted-foreground text-xs leading-none">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={() => router.push("/profile")}
        >
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={() => router.push("/settings")}
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Configuration</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onSelect={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
