/* ============================================================
   ServiceCards — Tourism services overview
   Highlights Sky Eagle's four core services with animated cards.
   ============================================================ */

"use client";

import { motion } from "framer-motion";
import { Plane, Hotel, Bus, Map } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

/** Service data for the four core tourism offerings */
const services = [
  {
    id: "service-tours",
    icon: <Map className="w-7 h-7" />,
    title: "Турлар",
    description:
      "Ішкі және халықаралық бағыттар бойынша ұйымдастырылған турлар. Барлығы қамтылған пакеттер.",
    color: "sky" as const,
  },
  {
    id: "service-flights",
    icon: <Plane className="w-7 h-7" />,
    title: "Әуе билеттері",
    description:
      "Әлемнің кез-келген бағытына арзан әуе билеттері. Студенттерге арнайы бағалар.",
    color: "sky" as const,
  },
  {
    id: "service-hotels",
    icon: <Hotel className="w-7 h-7" />,
    title: "Қонақ үй брондау",
    description:
      "3-ден 5 жұлдызға дейінгі қонақ үйлер. Ең жақсы бағалармен кепілдендірілген.",
    color: "gold" as const,
  },
  {
    id: "service-transfers",
    icon: <Bus className="w-7 h-7" />,
    title: "Трансфер",
    description:
      "Әуежайдан қонақ үйге және керісінше. VIP және стандарт қызметтер. 24/7.",
    color: "sky" as const,
  },
];

const colorMap = {
  sky: {
    bg: "bg-sky-500/10",
    text: "text-sky-400",
    border: "hover:border-sky-500/30",
    shadow: "hover:shadow-sky-500/5",
  },
  gold: {
    bg: "bg-gold-500/10",
    text: "text-gold-400",
    border: "hover:border-gold-500/30",
    shadow: "hover:shadow-gold-500/5",
  },
};

/**
 * Four-card grid showcasing Sky Eagle's core tourism services.
 * Each card has an icon, title, description, and hover effects.
 */
export default function ServiceCards() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16" direction="up">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Біздің{" "}
            <span className="gradient-text-sky">қызметтер</span>
          </h2>
          <p className="text-foreground-muted max-w-2xl mx-auto">
            Sky Eagle — сіздің саяхатыңыздың барлық кезеңін қамтамасыз етеді
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <AnimatedSection
              key={service.id}
              direction="up"
              delay={index * 0.1}
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`
                  glass-card rounded-2xl p-7 h-full
                  transition-all duration-500
                  ${colorMap[service.color].border}
                  ${colorMap[service.color].shadow}
                  hover:shadow-2xl
                `}
              >
                {/* Icon */}
                <div
                  className={`
                    w-14 h-14 rounded-xl flex items-center justify-center mb-5
                    ${colorMap[service.color].bg}
                    ${colorMap[service.color].text}
                  `}
                >
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
