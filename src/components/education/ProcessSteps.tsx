/* ============================================================
   ProcessSteps — Application process timeline
   Shows step-by-step process for studying abroad through Kais Exchange.
   ============================================================ */

"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  Search,
  FileCheck,
  Send,
  Stamp,
  Plane,
} from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

/** Process steps data */
const steps = [
  {
    step: 1,
    title: "Тегін кеңес алу",
    description:
      "Бізбен хабарласыңыз. Сіздің мақсаттарыңыз бен мүмкіндіктеріңізді талқылаймыз.",
    icon: <MessageSquare className="w-6 h-6" />,
  },
  {
    step: 2,
    title: "Университет таңдау",
    description:
      "Сіздің қалауыңыз бен бюджетіңізге сай ең жақсы университеттерді ұсынамыз.",
    icon: <Search className="w-6 h-6" />,
  },
  {
    step: 3,
    title: "Құжаттарды дайындау",
    description:
      "Өтінім хаты, мотивациялық хат, аудармалар — барлық құжаттарды біз дайындаймыз.",
    icon: <FileCheck className="w-6 h-6" />,
  },
  {
    step: 4,
    title: "Өтінімді жіберу",
    description:
      "Университетке өтінімді жіберіп, қабылдау процесін қадағалаймыз.",
    icon: <Send className="w-6 h-6" />,
  },
  {
    step: 5,
    title: "Виза алу",
    description:
      "Виза құжаттарын дайындау, елшілікке жазылу және сұхбатқа дайындық.",
    icon: <Stamp className="w-6 h-6" />,
  },
  {
    step: 6,
    title: "Ұшу және бейімделу",
    description:
      "Әуе билетін брондау, тұрғын үй табу және жаңа елге бейімделуге көмек.",
    icon: <Plane className="w-6 h-6" />,
  },
];

/**
 * Visual timeline showing the 6-step process of applying
 * to study abroad through Kais Exchange. Features animated
 * step reveals and connecting lines.
 */
export default function ProcessSteps() {
  return (
    <section className="py-24" id="process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16" direction="up">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Қалай{" "}
            <span className="gradient-text-kais">жұмыс істейді?</span>
          </h2>
          <p className="text-foreground-muted max-w-2xl mx-auto">
            Шетелде оқуға дейінгі 6 қарапайым қадам
          </p>
        </AnimatedSection>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <AnimatedSection
              key={step.step}
              direction="up"
              delay={index * 0.1}
            >
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="glass-card rounded-2xl p-7 relative overflow-hidden group hover:border-kais-500/30 transition-all duration-500"
              >
                {/* Step number watermark */}
                <div className="absolute -top-4 -right-2 text-8xl font-black text-kais-500/5 group-hover:text-kais-500/10 transition-colors select-none">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="relative z-10 w-14 h-14 rounded-xl bg-kais-500/10 flex items-center justify-center text-kais-400 mb-5 group-hover:bg-kais-500/20 transition-colors">
                  {step.icon}
                </div>

                {/* Step indicator */}
                <div className="relative z-10 flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-kais-400 uppercase tracking-wider">
                    Қадам {step.step}
                  </span>
                  <div className="flex-1 h-px bg-glass-border" />
                </div>

                {/* Title */}
                <h3 className="relative z-10 text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-sm text-foreground-muted leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
