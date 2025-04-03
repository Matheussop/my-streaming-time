import { validateToken } from "@api/auth";
import { AppSidebar } from "@components/ui/app-sidebar";
import { SidebarProvider } from "@components/ui/sidebar";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { User } from "@interfaces/user";
interface PrivateLayoutProps {
  children: ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const isValid = await validateToken();

  if (!isValid) {
    return redirect("/login");
  }

  return (
    <SidebarProvider>
      <AppSidebar user={isValid.user as User} />
      <div className="flex-1">{children}</div>
    </SidebarProvider>
  );
}
