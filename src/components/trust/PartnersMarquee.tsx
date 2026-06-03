/* ============================================================
   PartnersMarquee — Auto-scrolling partner/university logos
   Infinite marquee animation for trust building.
   ============================================================ */

"use client";

import { partners } from "@/data/partners";
import AnimatedSection from "@/components/ui/AnimatedSection";

/**
 * Horizontal infinite scroll marquee displaying partner logos.
 * Uses CSS animation for smooth, GPU-accelerated scrolling.
 * Duplicates the list for seamless looping.
 */
export default function PartnersMarquee() {
  // Double the array to create seamless infinite loop
  const doubledPartners = [...partners, ...partners];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Section Header */}
      <AnimatedSection className="text-center mb-12" direction="up">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Біздің{" "}
          <span className="gradient-text-sky">серіктестер</span>
        </h2>
        <p className="text-foreground-muted max-w-2xl mx-auto">
          Әлемнің жетекші университеттері мен туристік компанияларымен серіктестік
        </p>
      </AnimatedSection>

      {/* Marquee Container */}
      <div className="relative">
        {/* Left fade gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

        {/* Scrolling track */}
        <div className="flex animate-marquee w-max">
          {doubledPartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex-shrink-0 mx-6 group"
            >
              <div className="glass-card rounded-xl px-8 py-5 flex items-center gap-3 hover:border-foreground-muted/30 transition-all duration-300 cursor-default">
                {/* Logo placeholder — styled initial circle */}
                <div
                  className={`
                    w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold
                    ${
                      partner.type === "university"
                        ? "bg-kais-500/20 text-kais-400"
                        : partner.type === "airline"
                          ? "bg-sky-500/20 text-sky-400"
                          : partner.type === "hotel"
                            ? "bg-gold-500/20 text-gold-400"
                            : "bg-emerald-500/20 text-emerald-400"
                    }
                  `}
                >
                  {partner.name
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <span className="text-sm font-medium text-foreground-muted group-hover:text-foreground whitespace-nowrap transition-colors">
                  {partner.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
