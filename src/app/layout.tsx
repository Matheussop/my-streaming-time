import type { Metadata } from "next";
import { Roboto, Titan_One } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@components/theme-provider";
import { AppSidebar } from "@components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@components/ui/sidebar";
import ClientProvider from "providers/clientProviders";
import { Toaster } from "sonner";

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
  description: "Track your streaming time across different platforms",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="pt-BR"
      className={`${titan_One.variable} ${roboto.variable}`}
    >
      <body className={`bg-background min-h-screen text-zinc-100`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />
            <ClientProvider>
              <div className="flex-1">
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
