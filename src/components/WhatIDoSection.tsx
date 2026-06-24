"use client";

import { motion, Variants } from "framer-motion";
import { Server, Terminal, Database, Laptop, ShieldAlert, Cpu } from "lucide-react";
import SectionHeader from "./SectionHeader";

const services = [
  {
    icon: <Server className="w-8 h-8 text-cyan-400" />,
    title: "Backend Development",
    description: "Building high-performance, robust, and scalable server architectures using modern technologies like Java, Spring Boot, and Golang."
  },
  {
    icon: <Terminal className="w-8 h-8 text-indigo-400" />,
    title: "API Development & Integration",
    description: "Designing secure, documented, and versioned RESTful APIs with clean request validation, authentication pipelines, and webhook handlers."
  },
  {
    icon: <Database className="w-8 h-8 text-pink-400" />,
    title: "Database Design & Optimization",
    description: "Creating efficient relational structures, optimizing queries and indexing, and tuning SQL Server, PostgreSQL, and MySQL databases."
  },
  {
    icon: <Laptop className="w-8 h-8 text-emerald-400" />,
    title: "Frontend Implementation",
    description: "Translating mockups into pixel-perfect, interactive, and responsive web user interfaces with Next.js, TypeScript, and Tailwind CSS."
  },
  {
    icon: <ShieldAlert className="w-8 h-8 text-orange-400" />,
    title: "Dashboards & Admin Panels",
    description: "Building intuitive operational tools, admin portals, and data visualization centers to manage business workflows and track performance metrics."
  },
  {
    icon: <Cpu className="w-8 h-8 text-yellow-400" />,
    title: "Business Workflow Automation",
    description: "Automating repetitive processes, integrating automated email/WhatsApp gateways (e.g. Fonnte), and scheduling cron tasks to reduce manual labor."
  }
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function WhatIDoSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      id="what-i-do"
      className="space-y-10 scroll-mt-32"
    >
      <motion.div variants={fadeInUp}>
        <SectionHeader
          topText="Services & Expertise"
          mainText="What I Do"
          subText="Solutions"
          bottomText="How I can help build your business"
          watermark="ENGINEER"
        />
      </motion.div>

      <motion.div 
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            className="group relative bg-[#0d0f18]/40 border border-white/5 hover:border-indigo-500/30 rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-500/5 overflow-hidden flex flex-col items-start gap-4 text-left"
          >
            {/* Background Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            {/* Top Corner Bracket */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/0 group-hover:border-white/10 group-hover:w-3 group-hover:h-3 transition-all duration-300"></div>

            {/* Icon Wrapper */}
            <div className="p-3 bg-white/5 border border-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-inner">
              {service.icon}
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors tracking-wide">
                {service.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                {service.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
