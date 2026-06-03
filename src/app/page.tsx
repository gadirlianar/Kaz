/* ============================================================
   Landing Page — Ayshan Home
   Assembles the Hero, Services, Popular Tours, Stats,
   Testimonials, and Partners sections.
   ============================================================ */

import HeroSection from "@/components/hero/HeroSection";
import ServiceCards from "@/components/tourism/ServiceCards";
import PopularTours from "@/components/tourism/PopularTours";
import StatsCounter from "@/components/trust/StatsCounter";
import Testimonials from "@/components/trust/Testimonials";
import PartnersMarquee from "@/components/trust/PartnersMarquee";
import PageTransition from "@/components/layout/PageTransition";

/**
 * Root page — the dual-brand landing page.
 * Sections flow: Hero → Services → Popular Tours → Stats →
 * Testimonials → Partners Marquee
 */
export default function HomePage() {
  return (
    <PageTransition>
      {/* Dual-path hero with Tourism/Education toggle */}
      <HeroSection />

      {/* Sky Eagle services overview */}
      <ServiceCards />

      {/* Featured tour destinations */}
      <PopularTours />

      {/* Animated statistics counters */}
      <StatsCounter />

      {/* Customer reviews carousel — SWOT trust mitigation */}
      <Testimonials />

      {/* Partner logos marquee — credibility building */}
      <PartnersMarquee />
    </PageTransition>
  );
}
