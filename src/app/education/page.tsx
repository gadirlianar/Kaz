/* ============================================================
   Education Page — Kais Exchange Hub
   University database, process steps, and application info.
   ============================================================ */

import type { Metadata } from "next";
import UniversityDatabase from "@/components/education/UniversityDatabase";
import ProcessSteps from "@/components/education/ProcessSteps";
import PageTransition from "@/components/layout/PageTransition";

export const metadata: Metadata = {
  title: "Шетелде Оқу — Университеттер | Kais Exchange — Ayshan",
  description:
    "Малайзия мен Италияның үздік университеттерінде оқу. Құжат дайындау, виза қолдауы, толық сүйемелдеу. Kais Exchange — шетелде білім алудың сенімді жолы.",
};

/**
 * Education hub page — showcases the interactive university
 * database and the step-by-step application process.
 */
export default function EducationPage() {
  return (
    <PageTransition>
      {/* Hero banner for education */}
      <section className="relative py-20 overflow-hidden">
        {/* Background orbs */}
        <div className="orb orb-kais w-[500px] h-[500px] -top-40 -left-40" />
        <div className="orb orb-kais w-[300px] h-[300px] bottom-0 -right-20 opacity-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-kais-500/10 border border-kais-500/20 text-kais-400 text-sm font-medium mb-6">
            🎓 Kais Exchange
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Шетелде{" "}
            <span className="gradient-text-kais">білім алу</span>
          </h1>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            Малайзия мен Италияның үздік университеттерін зерттеп, өтінім беріңіз
          </p>
        </div>
      </section>

      {/* Interactive university database */}
      <UniversityDatabase />

      {/* Application process timeline */}
      <ProcessSteps />
    </PageTransition>
  );
}
