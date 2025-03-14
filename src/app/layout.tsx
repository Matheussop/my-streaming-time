import type { Metadata } from "next";
import { Inter, Roboto, Titan_One } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@components/theme-provider";
import { AppProvider } from "../context/AppContext";
import dynamic from "next/dynamic";
import { AppSidebar } from "@components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@components/ui/sidebar";
import ClientProvider from "providers/clientProviders";
import { Toaster } from "sonner";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

// Dynamically import the ErrorBoundary component
const ErrorBoundary = dynamic(
  () => import("@components/common/ErrorBoundary"),
  {
    ssr: false,
  },
);

const titan_One = Titan_One({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-titan-one",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

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
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${roboto.variable} ${titan_One.variable} bg-background min-h-screen font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />
            <ClientProvider>
              <ErrorBoundary>
                <div className="flex-1">
                  <SidebarTrigger />
                  <AppProvider>{children}</AppProvider>
                </div>
              </ErrorBoundary>
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
