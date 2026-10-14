import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { TooltipProvider } from "@/components/ui/tooltip";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SneakAi",
  description:
    "Physical LLM Distribution Network — Decoupling AI from High-Speed Internet",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <Header />
        <main className="bg-zinc-950 text-zinc-100 font-sans selection:bg-orange-500 selection:text-zinc-950">
          <TooltipProvider>{children}</TooltipProvider>
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
