"use client";
import {
  Building,
  ChevronUp,
  Clock,
  Home,
  Settings,
  User2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./sidebar";
import { Logo } from "@components/common/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Community",
    url: "/community",
    icon: Building,
  },
  {
    title: "Screen Time",
    url: "/screen-time",
    icon: Clock,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarHeader className="my-4">
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="items-center justify-between">
          <SidebarGroupContent>
            <SidebarGroupLabel>
              <p>Navegação</p>
            </SidebarGroupLabel>
            <SidebarMenu className="gap-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={`gap-3 px-4 py-2 text-sm font-semibold transition duration-300 ${
                        pathname === item.url
                          ? "bg-primary text-white shadow-lg"
                          : "bg-zinc-700 text-zinc-200 hover:text-white"
                      }`}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="focus-visible:outline-hidden">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="bg-zinc-700 transition duration-300">
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-(--radix-popper-anchor-width)"
              >
                <DropdownMenuItem className="rounded-t-sm bg-zinc-700 px-2 py-2 transition duration-300 hover:bg-zinc-800">
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-t-sm bg-zinc-700 px-2 py-2 transition duration-300 hover:bg-zinc-800">
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
