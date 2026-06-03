"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Calendar, BookOpen, GraduationCap, ArrowRight } from "lucide-react";
import universitiesData from "@/data/universities.json";

// Extract all unique faculties and intakes for the filters
const allFaculties = Array.from(
  new Set(universitiesData.flatMap((uni) => uni.faculties))
).sort();

const allIntakes = Array.from(
  new Set(
    universitiesData.flatMap((uni) =>
      uni.bachelorIntake.split(", ").map((i) => i.trim())
    )
  )
).sort();

export default function UniversityGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState<string | "all">("all");
  const [selectedIntake, setSelectedIntake] = useState<string | "all">("all");

  const filteredUniversities = useMemo(() => {
    return universitiesData.filter((uni) => {
      const matchesSearch = uni.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFaculty = selectedFaculty === "all" || uni.faculties.includes(selectedFaculty);
      const matchesIntake = selectedIntake === "all" || uni.bachelorIntake.includes(selectedIntake);
      return matchesSearch && matchesFaculty && matchesIntake;
    });
  }, [searchQuery, selectedFaculty, selectedIntake]);

  return (
    <section className="py-24 bg-canvas min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-primary mb-4"
          >
            Университеттер <span className="gradient-text-kais">Дерекқоры</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-secondary max-w-2xl mx-auto"
          >
            Өзіңізге сәйкес келетін бағдарламаны табыңыз
          </motion.p>
        </div>

        {/* Filters Section */}
        <div className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between glass-card p-4 rounded-2xl">
          {/* Search */}
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
            <input
              type="text"
              placeholder="Университетті іздеу..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-border-subtle rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-edu/50 transition-shadow"
            />
          </div>

          {/* Dropdowns */}
          <div className="flex w-full md:w-auto gap-4">
            <select
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
              className="w-full md:w-48 bg-surface border border-border-subtle rounded-xl px-4 py-3 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-edu/50 appearance-none cursor-pointer"
            >
              <option value="all">Барлық факультеттер</option>
              {allFaculties.map((fac) => (
                <option key={fac} value={fac}>{fac}</option>
              ))}
            </select>

            <select
              value={selectedIntake}
              onChange={(e) => setSelectedIntake(e.target.value)}
              className="w-full md:w-48 bg-surface border border-border-subtle rounded-xl px-4 py-3 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-edu/50 appearance-none cursor-pointer"
            >
              <option value="all">Қабылдау айы</option>
              {allIntakes.map((intake) => (
                <option key={intake} value={intake}>{intake}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredUniversities.length > 0 ? (
              filteredUniversities.map((uni, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  key={uni.id}
                  className="card-elevated overflow-hidden flex flex-col group"
                >
                  <div className="p-8 flex-1">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "var(--edu-wash)" }}>
                        <GraduationCap className="w-6 h-6" style={{ color: "var(--edu-dark)" }} />
                      </div>
                      <div className="flex items-center gap-1 text-sm text-secondary bg-surface px-3 py-1 rounded-full border border-border-subtle">
                        <MapPin className="w-4 h-4" />
                        {uni.city}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-edu transition-colors">
                      {uni.name}
                    </h3>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-3 text-sm">
                        <BookOpen className="w-4 h-4 text-edu shrink-0 mt-0.5" />
                        <span className="text-secondary leading-relaxed">
                          {uni.faculties.slice(0, 3).join(", ")}
                          {uni.faculties.length > 3 && <span className="text-secondary-light"> + тағы {uni.faculties.length - 3}</span>}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Calendar className="w-4 h-4 text-edu shrink-0" />
                        <span className="text-secondary">{uni.bachelorIntake}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border-t border-border-subtle bg-surface/50 flex items-end justify-between">
                    <div>
                      <p className="text-[11px] text-secondary-faint uppercase tracking-widest mb-1">Оқу ақысы (Жылына)</p>
                      <p className="text-xl font-bold text-primary">
                        RM {uni.studyFeeRM.toLocaleString()}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-edu flex items-center justify-center group-hover:scale-105 transition-transform cursor-pointer shadow-md shadow-edu/20">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full py-20 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center mx-auto mb-4 border border-border-subtle">
                  <Search className="w-8 h-8 text-secondary-faint" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">Ештеңе табылмады</h3>
                <p className="text-secondary">Іздеу шарттарын өзгертіп көріңіз.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
