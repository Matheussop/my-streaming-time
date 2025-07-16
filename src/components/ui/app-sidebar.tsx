"use client";
import { Building, Clock, Home, Settings, MenuIcon } from "lucide-react";

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
  SidebarHoverTrigger,
  useSidebar,
} from "./sidebar";
import { Logo } from "@components/common/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserMenu } from "@components/common/UserMenu";
import { useAuth } from "@context/AuthContext";

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
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <>
      <Sidebar>
        <SidebarHeader className="my-4 flex items-center justify-between">
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
              <UserMenu />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {/* Trigger que aparece quando o usuário passa o mouse próximo à borda e a sidebar está fechada */}
      {true && (
        <SidebarHoverTrigger
          icon={<MenuIcon className="text-primary" />}
          isCollapsed={isCollapsed}
          tooltip={state === "expanded" ? "Esconder Menu" : "Abrir Menu"}
        />
      )}
    </>
  );
}
