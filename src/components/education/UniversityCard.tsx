/* ============================================================
   UniversityCard — Individual university data card
   Displays all required fields from the business report.
   ============================================================ */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  ChevronDown,
  BookOpen,
  Award,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import type { University } from "@/lib/types";

interface UniversityCardProps {
  university: University;
}

/**
 * Comprehensive university data card displaying all required fields:
 * - University Name
 * - Faculties (Факультеттер)
 * - Specialties (Мамандықтар)
 * - Intake Dates (Қабылдау мерзімдері)
 * - Duration (Оқу жылы)
 * - Application Fee (Өтінім ақысы)
 * - Study Fee (Оқу ақысы)
 *
 * Features expandable sections for faculties and specialties.
 */
export default function UniversityCard({ university }: UniversityCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass-card rounded-2xl overflow-hidden group hover:border-kais-500/30 hover:shadow-2xl hover:shadow-kais-500/5 transition-all duration-500"
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start gap-4">
          {/* University logo placeholder */}
          <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-kais-500/10 flex items-center justify-center text-kais-400">
            <BookOpen className="w-7 h-7" />
          </div>

          <div className="flex-1 min-w-0">
            {/* University Name */}
            <h3 className="text-lg font-semibold text-foreground group-hover:text-kais-400 transition-colors truncate">
              {university.name}
            </h3>

            {/* Location + Ranking */}
            <div className="flex items-center gap-3 mt-1.5">
              <span className="flex items-center gap-1 text-sm text-foreground-muted">
                <MapPin className="w-3.5 h-3.5" />
                {university.city}, {university.country}
              </span>
              {university.ranking && (
                <Badge variant="gold" size="sm">
                  <Award className="w-3 h-3" />
                  {university.ranking}
                </Badge>
              )}
            </div>
          </div>

          {/* Country badge */}
          <Badge
            variant={university.country === "Малайзия" ? "sky" : "kais"}
            size="md"
          >
            {university.country === "Малайзия" ? "🇲🇾" : "🇮🇹"}{" "}
            {university.country}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-sm text-foreground-muted leading-relaxed mt-4">
          {university.description}
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="px-6 py-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-glass-border">
        {/* Оқу жылы — Duration */}
        <div>
          <div className="flex items-center gap-1.5 text-xs text-foreground-muted mb-1">
            <Clock className="w-3.5 h-3.5" />
            Оқу жылы
          </div>
          <p className="text-sm font-medium text-foreground">
            {university.duration}
          </p>
        </div>

        {/* Өтінім ақысы — Application Fee */}
        <div>
          <div className="flex items-center gap-1.5 text-xs text-foreground-muted mb-1">
            <FileText className="w-3.5 h-3.5" />
            Өтінім ақысы
          </div>
          <p className="text-sm font-medium text-foreground">
            ${university.applicationFee}
          </p>
        </div>

        {/* Оқу ақысы — Study Fee */}
        <div className="col-span-2 sm:col-span-1">
          <div className="flex items-center gap-1.5 text-xs text-foreground-muted mb-1">
            <DollarSign className="w-3.5 h-3.5" />
            Оқу ақысы
          </div>
          <p className="text-sm font-semibold gradient-text-kais">
            {university.studyFee}
          </p>
        </div>
      </div>

      {/* Қабылдау мерзімдері — Intake Dates */}
      <div className="px-6 py-3 border-t border-glass-border">
        <div className="flex items-center gap-1.5 text-xs text-foreground-muted mb-2">
          <Calendar className="w-3.5 h-3.5" />
          Қабылдау мерзімдері
        </div>
        <div className="flex flex-wrap gap-2">
          {university.intakeDates.map((date) => (
            <Badge key={date} variant="success" size="sm">
              {date}
            </Badge>
          ))}
        </div>
      </div>

      {/* Expandable: Faculties & Specialties */}
      <div className="border-t border-glass-border">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full px-6 py-3 flex items-center justify-between text-sm font-medium text-foreground-muted hover:text-foreground transition-colors cursor-pointer"
        >
          <span>
            Факультеттер мен мамандықтар ({university.faculties.length} факультет,{" "}
            {university.specialties.length} мамандық)
          </span>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-5 space-y-4">
                {/* Факультеттер — Faculties */}
                <div>
                  <h4 className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-2">
                    Факультеттер
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {university.faculties.map((faculty) => (
                      <Badge key={faculty} variant="kais" size="sm">
                        {faculty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Мамандықтар — Specialties */}
                <div>
                  <h4 className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-2">
                    Мамандықтар
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {university.specialties.map((spec) => (
                      <Badge key={spec} variant="neutral" size="sm">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA Footer */}
      <div className="px-6 py-4 border-t border-glass-border flex items-center justify-between">
        {university.featured && (
          <Badge variant="gold" size="md">
            ⭐ Ұсынылады
          </Badge>
        )}
        <div className="ml-auto px-5 py-2.5 rounded-xl bg-kais-500/10 text-kais-400 text-sm font-medium group-hover:bg-kais-500 group-hover:text-white transition-all duration-300 cursor-pointer">
          Өтінім беру
        </div>
      </div>
    </motion.div>
  );
}
