/* ================================================================
   Root Layout — Ayshan
   Typography: Inter (geometric sans-serif — tight tracking)
   Language: kk (Kazakh)
   ================================================================ */

import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ayshan — Саяхат пен білімге жол ашамыз",
  description:
    "Sky Eagle туризм — ішкі және халықаралық турлар, билеттер, қонақ үйлер. Kais Exchange — Малайзия мен Италия университеттерінде оқу мүмкіндіктері.",
  keywords: [
    "туризм Қазақстан",
    "шетелде оқу",
    "Малайзия университеттері",
    "Италия университеттері",
    "Sky Eagle",
    "Kais Exchange",
    "Ayshan",
  ],
  openGraph: {
    title: "Ayshan — Саяхат пен білімге жол ашамыз",
    description: "Турлар мен шетелде оқу — барлығы бір жерде.",
    type: "website",
    locale: "kk_KZ",
    siteName: "Ayshan",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="kk"
      className={`${inter.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
