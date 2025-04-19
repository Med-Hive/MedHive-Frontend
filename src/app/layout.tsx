// src/app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { SessionProvider } from "../utils/supabase/usercontext";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MedHive - Federated Medical AI",
  description: "Privacy-preserving collaborative machine learning for healthcare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="fixed inset-0 z-0">
          <HeroGeometric />
        </div>
        <div className="relative z-10">
          <SessionProvider>
            {children}
          </SessionProvider>
        </div>
        <Toaster />
      </body>
    </html>
  );
}