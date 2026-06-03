/* ============================================================
   PopularTours — Featured tours grid for landing page
   Shows only featured/promoted tours with premium visual styling.
   ============================================================ */

"use client";

import { tours } from "@/data/tours";
import TourCard from "./TourCard";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

/**
 * Featured tours section for the landing page.
 * Displays the top 4 featured tours in a responsive grid.
 */
export default function PopularTours() {
  const featuredTours = tours.filter((t) => t.featured).slice(0, 4);

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16" direction="up">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Танымал{" "}
            <span className="gradient-text-sky">бағыттар</span>
          </h2>
          <p className="text-foreground-muted max-w-2xl mx-auto">
            Клиенттеріміздің ең көп таңдайтын саяхат бағыттары
          </p>
        </AnimatedSection>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredTours.map((tour, index) => (
            <AnimatedSection key={tour.id} direction="up" delay={index * 0.1}>
              <TourCard tour={tour} />
            </AnimatedSection>
          ))}
        </div>

        {/* View all CTA */}
        <AnimatedSection className="text-center" direction="up" delay={0.4}>
          <Link href="/tourism">
            <Button
              variant="outline"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Барлық турларды қарау
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
