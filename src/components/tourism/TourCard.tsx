/* ============================================================
   TourCard — Individual tour result card
   Displays tour info with hover animations and gradient pricing.
   ============================================================ */

"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Star, Plane, Hotel, Bus, Map } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";
import type { Tour } from "@/lib/types";

interface TourCardProps {
  tour: Tour;
}

/** Category icon mapping */
const categoryIcons = {
  тур: <Map className="w-4 h-4" />,
  билет: <Plane className="w-4 h-4" />,
  "қонақ үй": <Hotel className="w-4 h-4" />,
  трансфер: <Bus className="w-4 h-4" />,
};

/**
 * Rich tour card with image placeholder, rating stars,
 * category badge, pricing display, and hover lift animation.
 */
export default function TourCard({ tour }: TourCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass-card rounded-2xl overflow-hidden group cursor-pointer transition-all duration-500 hover:border-sky-500/30 hover:shadow-2xl hover:shadow-sky-500/5"
    >
      {/* Image area */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={tour.imageUrl} 
          alt={tour.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={tour.type === "халықаралық" ? "sky" : "success"}>
            {tour.type === "халықаралық" ? "Халықаралық" : "Ішкі"}
          </Badge>
          <Badge variant="neutral">
            {categoryIcons[tour.category]}
            <span className="ml-1 capitalize">{tour.category}</span>
          </Badge>
        </div>

        {/* Rating */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-lg bg-black/40 backdrop-blur-sm">
          <Star className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
          <span className="text-xs font-medium text-white">
            {tour.rating}
          </span>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--glass-bg)] to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-sky-400 transition-colors">
          {tour.title}
        </h3>

        {/* Meta row */}
        <div className="flex items-center gap-4 text-sm text-foreground-muted mb-3">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {tour.country}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {tour.duration}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 line-clamp-2">
          {tour.description}
        </p>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-glass-border">
          <div>
            <p className="text-xs text-foreground-muted">Бағасы</p>
            <p className="text-xl font-bold gradient-text-sky">
              {formatCurrency(tour.price, tour.currency)}
            </p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-sky-500/10 text-sky-400 text-sm font-medium group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
            Толығырақ
          </div>
        </div>
      </div>
    </motion.div>
  );
}
