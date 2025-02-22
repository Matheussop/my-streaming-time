import type { Metadata } from "next";
import { Roboto, Titan_One } from "next/font/google";
import "./globals.css";
import { SideBar } from "@components/common/Sidebar";
import { Toaster } from "sonner";
import ClientProvider from "./providers/clientProviders";
import { SidebarProvider, SidebarTrigger } from "@components/ui/sidebar";
import { AppSidebar } from "@components/ui/app-sidebar";
import { ThemeProvider } from "@components/theme-provider";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const titan_One = Titan_One({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-titan-one",
});

export const metadata: Metadata = {
  title: "My Streaming Time",
  description: "Generated by My Streaming Time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${roboto.variable} ${titan_One.variable}`}>
      <body className="bg-dark-700 text-zinc-100">
        {/* <SideBar /> */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />
            <ClientProvider>
              <div className="flex-1 ">
                <SidebarTrigger />
                {children}
              </div>
            </ClientProvider>
          </SidebarProvider>

          <Toaster toastOptions={toastOptions} theme="dark" />
        </ThemeProvider>
      </body>
    </html>
  );
}

const toastOptions = {
  classNames: {
    toast: "bg-dark-700 text-zinc-100 border-none",
  },
};
