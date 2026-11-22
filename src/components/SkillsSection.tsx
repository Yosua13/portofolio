"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Globe, Layers, Smartphone, AppWindow, Terminal, Database, Cloud, Cpu, Server, PenTool, GitBranch, Box } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/context/LanguageContext";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function SkillsSection() {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");

  const categoryLabels: Record<string, string> = {
    All: language === "id" ? "Semua" : "All",
    Frontend: "Frontend",
    Backend: "Backend",
    Database: "Database",
    Tools: "Tools"
  };

  const levelLabels: Record<string, string> = {
    Expert: language === "id" ? "Mahir" : "Expert",
    Proficient: language === "id" ? "Kompeten" : "Proficient",
    Intermediate: language === "id" ? "Menengah" : "Intermediate"
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      id="skills"
      className="space-y-10 scroll-mt-32"
    >
      <div className="space-y-10">
        <SectionHeader
          topText={language === "id" ? "Kapabilitas Teknis" : "Abilities"}
          mainText="Skills"
          subText={language === "id" ? "Keahlian Teknologi" : "Skill Set"}
          bottomText={
            language === "id"
              ? "Teknologi dan perangkat pengembangan yang saya kuasai"
              : "Technologies and tools I specialize in"
          }
          watermark="SKILLS"
        />

        {/* Submenu Tabs */}
        <div className="flex flex-wrap items-center gap-4">
          {["All", "Frontend", "Backend", "Database", "Tools"].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 overflow-hidden border border-white/5 cursor-pointer ${
                activeCategory === category
                  ? "text-[#0a0a0a] shadow-lg shadow-cyan-500/25"
                  : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="relative z-10">{categoryLabels[category]}</span>
              {activeCategory === category && (
                <motion.div
                  layoutId="active-skill-tab"
                  className="absolute inset-0 bg-cyan-500"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Submenu Info Text */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-slate-300 font-light"
        >
          {activeCategory === "All"
            ? language === "id"
              ? "26 keahlian di 4 kategori utama."
              : "26 skills across 4 categories."
            : language === "id"
            ? `${activeCategory === "Frontend" ? 7 : activeCategory === "Backend" ? 5 : activeCategory === "Database" ? 6 : 8} keahlian pada kategori ${activeCategory}.`
            : `${activeCategory === "Frontend" ? 7 : activeCategory === "Backend" ? 5 : activeCategory === "Database" ? 6 : 8} skills in ${activeCategory}.`}
        </motion.div>

        {/* Skills Grid */}
        <motion.div layout className="flex flex-col gap-8">
          <AnimatePresence mode="popLayout">
            {["Frontend", "Backend", "Database", "Tools"]
              .filter((cat) => activeCategory === "All" || activeCategory === cat)
              .map((category) => (
                <motion.div
                  key={category}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8"
                >
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-4">
                    <span className="text-cyan-400 capitalize">{category}</span>
                    <div className="h-px bg-white/10 flex-1"></div>
                  </h3>

                  <div className="flex flex-wrap gap-3 md:gap-4">
                    {[
                      { name: "React 19", cat: "Frontend", icon: <Globe className="w-4 h-4" />, level: "Expert" },
                      { name: "Next.js", cat: "Frontend", icon: <Layers className="w-4 h-4" />, level: "Proficient" },
                      { name: "TypeScript", cat: "Frontend", icon: <Globe className="w-4 h-4" />, level: "Expert" },
                      { name: "Tailwind CSS v4", cat: "Frontend", icon: <Layers className="w-4 h-4" />, level: "Expert" },
                      { name: "Flutter", cat: "Frontend", icon: <Smartphone className="w-4 h-4" />, level: "Proficient" },
                      { name: "KMP", cat: "Frontend", icon: <Smartphone className="w-4 h-4" />, level: "Intermediate" },
                      { name: "Angular", cat: "Frontend", icon: <AppWindow className="w-4 h-4" />, level: "Intermediate" },

                      { name: "Java (21 / 25 LTS)", cat: "Backend", icon: <Cpu className="w-4 h-4" />, level: "Expert" },
                      { name: "Spring Boot", cat: "Backend", icon: <Server className="w-4 h-4" />, level: "Expert" },
                      { name: "Golang (Gin / Fiber)", cat: "Backend", icon: <Server className="w-4 h-4" />, level: "Expert" },
                      { name: "NestJS & Fastify", cat: "Backend", icon: <Server className="w-4 h-4" />, level: "Proficient" },
                      { name: "Node.js", cat: "Backend", icon: <Terminal className="w-4 h-4" />, level: "Proficient" },

                      { name: "PostgreSQL", cat: "Database", icon: <Database className="w-4 h-4" />, level: "Expert" },
                      { name: "SQL Server", cat: "Database", icon: <Database className="w-4 h-4" />, level: "Expert" },
                      { name: "MySQL", cat: "Database", icon: <Database className="w-4 h-4" />, level: "Proficient" },
                      { name: "Redis / Upstash", cat: "Database", icon: <Database className="w-4 h-4" />, level: "Proficient" },
                      { name: "Supabase", cat: "Database", icon: <Cloud className="w-4 h-4" />, level: "Expert" },
                      { name: "Firebase", cat: "Database", icon: <Cloud className="w-4 h-4" />, level: "Proficient" },

                      { name: "RabbitMQ", cat: "Tools", icon: <Box className="w-4 h-4" />, level: "Proficient" },
                      { name: "Docker", cat: "Tools", icon: <Box className="w-4 h-4" />, level: "Proficient" },
                      { name: "Midtrans & API Gateway", cat: "Tools", icon: <Terminal className="w-4 h-4" />, level: "Expert" },
                      { name: "Git", cat: "Tools", icon: <GitBranch className="w-4 h-4" />, level: "Expert" },
                      { name: "REST API & SSE", cat: "Tools", icon: <Terminal className="w-4 h-4" />, level: "Expert" },
                      { name: "Postman", cat: "Tools", icon: <Box className="w-4 h-4" />, level: "Expert" },
                      { name: "GitHub / GitLab", cat: "Tools", icon: <GitBranch className="w-4 h-4" />, level: "Expert" },
                      { name: "Figma", cat: "Tools", icon: <PenTool className="w-4 h-4" />, level: "Intermediate" }
                    ]
                      .filter((skill) => skill.cat === category)
                      .map((skill) => (
                        <motion.div
                          key={skill.name}
                          whileHover={{ scale: 1.05 }}
                          className="px-4 py-2 bg-[#0a0a0a] border border-white/5 rounded-xl flex items-center justify-between gap-4 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300 group cursor-default shadow-sm min-h-[44px]"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-slate-500 group-hover:text-cyan-400 transition-colors">{skill.icon}</span>
                            <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{skill.name}</span>
                          </div>
                          <span className="text-[8px] px-1.5 py-0.5 bg-white/5 text-slate-500 rounded group-hover:bg-cyan-500/20 group-hover:text-cyan-300 transition-colors uppercase tracking-wider font-bold shrink-0">
                            {levelLabels[skill.level] ?? skill.level}
                          </span>
                        </motion.div>
                      ))}
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Mastered Technologies */}
      <div className="space-y-10 pt-10">
        <motion.div variants={fadeInUp} className="flex items-center gap-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {language === "id" ? "Keahlian Utama" : "Top Expertise"}
          </h2>
          <div className="h-px bg-white/10 flex-1"></div>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center gap-12 bg-gradient-to-r from-cyan-500/10 to-transparent p-8 md:p-10 rounded-3xl border border-cyan-500/20">
          <div className="flex gap-6 md:gap-8 items-center shrink-0">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] p-4 flex items-center justify-center group shadow-xl">
              <Image src="/assets/images/skills/java.png" alt="Java" fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
            </div>
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] p-4 flex items-center justify-center group shadow-xl">
              <Image src="/assets/images/skills/typescript.png" alt="TypeScript" fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
            </div>
          </div>

          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white">Java, Golang &amp; TypeScript</h3>
            <p className="text-slate-400 text-lg font-light leading-relaxed">
              {language === "id" ? (
                <>
                  Saya sangat mahir menggunakan <span className="text-cyan-400 font-medium">TypeScript</span>, <span className="text-cyan-400 font-medium">Java (Spring Boot)</span>, dan <span className="text-cyan-400 font-medium">Golang</span>. Kombinasi teknologi ini saya gunakan sehari-hari untuk membangun layanan backend berkinerja tinggi serta antarmuka frontend yang modern dan mudah dipelihara.
                </>
              ) : (
                <>
                  I am highly proficient in <span className="text-cyan-400 font-medium">TypeScript</span>, <span className="text-cyan-400 font-medium">Java (Spring Boot)</span>, and <span className="text-cyan-400 font-medium">Golang</span>. I use these languages extensively in my day-to-day engineering to build high-concurrency backend services and dynamic frontend architectures.
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
