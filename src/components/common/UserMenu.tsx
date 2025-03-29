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
import SafeImage from "./SafeImage";
import { SidebarMenuButton } from "@components/ui/sidebar";

interface User {
  name: string;
  email: string;
  avatar?: string;
}

const useAuthMock = () => ({
  user: {
    name: "John Doe",
    email: "john.doe@example.com",
  } as User,
  logout: async () => {
    console.log("logout");
  },
  isLoading: false,
});

export const UserMenu = () => {
  const { user, logout, isLoading } = useAuthMock();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/auth");
  };

  if (isLoading) {
    return <div className="h-10 w-10 animate-pulse rounded-full bg-gray-700" />;
  }

  if (!user) {
    return (
      <Button
        variant="outline"
        onClick={() => router.push("/auth")}
        className="px-4"
      >
        Login
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton className="bg-zinc-700 transition duration-300">
          <User2 /> {user.name}
          <ChevronUp className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">{user.name}</p>
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
