/* ================================================================
   Root Layout — Ayshan
   
   Typography: Outfit (geometric sans-serif — modern, warm, wide)
   Language: kk (Kazakh)
   Aesthetic: Clean Minimalist / Scandinavian
   ================================================================ */

import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

/* ── Primary: Outfit — geometric, modern, wide ── */
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

/* ── Mono: Geist Mono — for data/code contexts ── */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/* ── SEO Metadata (Kazakh) ── */
export const metadata: Metadata = {
  title: "Ayshan — Саяхат пен білімге жол ашамыз",
  description:
    "Sky Eagle туризм — ішкі және халықаралық турлар, билеттер, қонақ үйлер. Kais Exchange — Малайзия мен Италия университеттерінде оқу мүмкіндіктері. Бір платформа, екі бағыт.",
  keywords: [
    "туризм Қазақстан",
    "шетелде оқу",
    "Малайзия университеттері",
    "Италия университеттері",
    "әуе билеттері",
    "Sky Eagle",
    "Kais Exchange",
    "Ayshan",
  ],
  openGraph: {
    title: "Ayshan — Саяхат пен білімге жол ашамыз",
    description:
      "Турлар мен шетелде оқу — барлығы бір жерде. Sky Eagle & Kais Exchange.",
    type: "website",
    locale: "kk_KZ",
    siteName: "Ayshan",
  },
};

/**
 * Root layout structure:
 * - Outfit font (geometric sans) as primary typeface
 * - Kazakh language declaration (lang="kk")
 * - Flex column layout: Navbar → Content → Footer
 * - Warm alabaster canvas (#FAFAF7) background via CSS
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="kk"
      className={`${outfit.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
