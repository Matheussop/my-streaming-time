import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@components/theme-provider";
import { AppProvider } from "../context/AppContext";
import dynamic from "next/dynamic";

// Dynamically import the ErrorBoundary component
const ErrorBoundary = dynamic(
  () => import("@components/common/ErrorBoundary"),
  {
    ssr: false,
  },
);

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
        className={`${inter.variable} bg-background min-h-screen font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ErrorBoundary>
            <AppProvider>{children}</AppProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
