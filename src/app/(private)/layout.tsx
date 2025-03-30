import { AppSidebar } from "@components/ui/app-sidebar";
import { SidebarProvider } from "@components/ui/sidebar";
import { ReactNode } from "react";

interface PrivateLayoutProps {
  children: ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex-1">{children}</div>
    </SidebarProvider>
  );
}
