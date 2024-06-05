import type { Metadata } from "next";
import { Roboto, Titan_One } from "next/font/google";
import "./globals.css";
import { SideBar } from "@/components/Sidebar";

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
    <html lang="pt-BR">
      <body
        className={`bg-dark-700 ${roboto.variable} ${titan_One.variable}  text-zinc-100`}
      >
        <SideBar />
        <div className="w-screen flex-1">{children}</div>
      </body>
    </html>
  );
}
