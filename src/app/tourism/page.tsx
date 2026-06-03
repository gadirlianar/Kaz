/* ============================================================
   Tourism Page — Sky Eagle Hub
   Full tourism experience: search, filter, and browse tours.
   ============================================================ */

import type { Metadata } from "next";
import TourSearch from "@/components/tourism/TourSearch";
import PageTransition from "@/components/layout/PageTransition";

export const metadata: Metadata = {
  title: "Турлар мен Билеттер | Sky Eagle — Aysanii",
  description:
    "Ішкі және халықаралық турлар, әуе билеттері, қонақ үй брондау және трансфер қызметі. Sky Eagle — сіздің сенімді саяхат серіктесіңіз.",
};

/**
 * Tourism hub page — showcases the full TourSearch
 * component with all filtering capabilities.
 */
export default function TourismPage() {
  return (
    <PageTransition>
      {/* Hero banner for tourism */}
      <section className="relative py-20 overflow-hidden">
        {/* Background orbs */}
        <div className="orb orb-sky w-[500px] h-[500px] -top-40 -right-40" />
        <div className="orb orb-sky w-[300px] h-[300px] bottom-0 -left-20 opacity-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-medium mb-6">
            ✈️ Sky Eagle Tourism
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Саяхат{" "}
            <span className="gradient-text-sky">әлемі</span>
          </h1>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            Турлар, әуе билеттері, қонақ үйлер мен трансфер — барлық қызметтер бір жерде
          </p>
        </div>
      </section>

      {/* Tour search & results */}
      <TourSearch />
    </PageTransition>
  );
}
