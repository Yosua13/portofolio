"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Globe, Layers, Smartphone, AppWindow, Terminal, Database, Cloud, Cpu, Server, PenTool, GitBranch, Box } from "lucide-react";
import SectionHeader from "./SectionHeader";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("All");

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
          topText="Abilities"
          mainText="Skills"
          subText="Skill Set"
          bottomText="Technologies and tools I specialize in"
          watermark="SKILLS"
        />

        {/* Submenu Tabs */}
        <div className="flex flex-wrap items-center gap-4">
          {["All", "Frontend", "Backend", "Database", "Tools"].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                ? "bg-cyan-500 text-[#0a0a0a] shadow-lg shadow-cyan-500/25"
                : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Submenu Info Text */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-slate-400 font-light"
        >
          {activeCategory === "All"
            ? "23 skills across 4 categories."
            : `${activeCategory === 'Frontend' ? 7 : activeCategory === 'Backend' ? 4 : activeCategory === 'Database' ? 5 : 7} skills in ${activeCategory}.`}
        </motion.div>

        {/* Skills Grid */}
        <motion.div layout className="flex flex-col gap-8">
          <AnimatePresence mode="popLayout">
            {["Frontend", "Backend", "Database", "Tools"]
              .filter(cat => activeCategory === "All" || activeCategory === cat)
              .map(category => (
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
                      { name: "React", cat: "Frontend", icon: <Globe className="w-4 h-4" /> },
                      { name: "Next.js", cat: "Frontend", icon: <Layers className="w-4 h-4" /> },
                      { name: "TypeScript", cat: "Frontend", icon: <Globe className="w-4 h-4" /> },
                      { name: "Tailwind CSS", cat: "Frontend", icon: <Layers className="w-4 h-4" /> },
                      { name: "Flutter", cat: "Frontend", icon: <Smartphone className="w-4 h-4" /> },
                      { name: "KMP", cat: "Frontend", icon: <Smartphone className="w-4 h-4" /> },
                      { name: "Angular", cat: "Frontend", icon: <AppWindow className="w-4 h-4" /> },
                      
                      { name: "Java", cat: "Backend", icon: <Cpu className="w-4 h-4" /> },
                      { name: "Spring Boot", cat: "Backend", icon: <Server className="w-4 h-4" /> },
                      { name: "Golang", cat: "Backend", icon: <Server className="w-4 h-4" /> },
                      { name: "Node.js", cat: "Backend", icon: <Terminal className="w-4 h-4" /> },
                      
                      { name: "SQL Server", cat: "Database", icon: <Database className="w-4 h-4" /> },
                      { name: "PostgreSQL", cat: "Database", icon: <Database className="w-4 h-4" /> },
                      { name: "MySQL", cat: "Database", icon: <Database className="w-4 h-4" /> },
                      { name: "Firebase", cat: "Database", icon: <Cloud className="w-4 h-4" /> },
                      { name: "Supabase", cat: "Database", icon: <Cloud className="w-4 h-4" /> },
                      
                      { name: "Git", cat: "Tools", icon: <GitBranch className="w-4 h-4" /> },
                      { name: "Docker", cat: "Tools", icon: <Box className="w-4 h-4" /> },
                      { name: "REST API", cat: "Tools", icon: <Terminal className="w-4 h-4" /> },
                      { name: "Postman", cat: "Tools", icon: <Box className="w-4 h-4" /> },
                      { name: "GitHub", cat: "Tools", icon: <GitBranch className="w-4 h-4" /> },
                      { name: "GitLab", cat: "Tools", icon: <GitBranch className="w-4 h-4" /> },
                      { name: "Figma", cat: "Tools", icon: <PenTool className="w-4 h-4" /> }
                    ].filter(skill => skill.cat === category)
                      .map((skill) => (
                        <motion.div
                          key={skill.name}
                          whileHover={{ scale: 1.05 }}
                          className="px-4 py-2 bg-[#0a0a0a] border border-white/5 rounded-xl flex items-center gap-2.5 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300 group cursor-default shadow-sm"
                        >
                          <span className="text-slate-500 group-hover:text-cyan-400 transition-colors">{skill.icon}</span>
                          <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{skill.name}</span>
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
          <h2 className="text-2xl font-bold text-white tracking-tight">Top Expertise</h2>
          <div className="h-px bg-white/10 flex-1"></div>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center gap-12 bg-gradient-to-r from-cyan-500/10 to-transparent p-8 md:p-10 rounded-3xl border border-cyan-500/20">
          <div className="flex gap-6 md:gap-8 items-center shrink-0">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] p-4 flex items-center justify-center group shadow-xl">
              <Image src="/java.png" alt="Java" fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
            </div>
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] p-4 flex items-center justify-center group shadow-xl">
              <Image src="/ts.png" alt="TypeScript" fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
            </div>
          </div>

          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white">Java & TypeScript</h3>
            <p className="text-slate-400 text-lg font-light leading-relaxed">
              I am proficient in <span className="text-cyan-400 font-medium">TypeScript</span> / <span className="text-cyan-400 font-medium">Java</span>. I use these languages extensively for my day-to-day work, building scalable backend services and dynamic frontend architectures.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
