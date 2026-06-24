"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import SectionHeader from "./SectionHeader";

const projectsData = [
  {
    id: "hcm-campaign",
    title: "HCM Campaign Assignment System",
    location: "2025 | BANDUNG, INDONESIA",
    role: "BACKEND ENGINEER",
    headline: "AUTOMATED CAMPAIGN AND REPAIR ORDER ASSIGNMENT ENGINE",
    description: "An internal enterprise web application for managing customer campaigns and repair order assignments based on sales performance scoring, reducing manual work.",
    fullDescription: "HCM Campaign Assignment System automates customer lead distribution to sales representatives. It utilizes a custom scoring algorithm based on historical performance, workload, and campaign constraints to optimize conversion rates and maximize customer engagement.",
    problem: "Sales operations faced substantial delays and tracking errors when manually assigning campaign targets and repair orders to sales reps, leading to missed opportunities and unfair distribution.",
    contribution: "Designed and implemented the core assignment routing engine in Go, optimized SQL queries for high-speed performance evaluation, and integrated the REST API endpoints with the Next.js frontend.",
    impact: "Successfully automated 100% of customer distribution, reduced the assignment process time from hours to seconds, and improved campaign tracking with real-time audit logs.",
    image: "/project1.png",
    tags: ["Go", "MSSQL", "REST API", "Next.js"],
    techStack: ["Go", "MSSQL", "REST API", "Next.js", "TypeScript", "Tailwind CSS"],
    link: "#"
  },
  {
    id: "lapor-kos",
    title: "Lapor Kos",
    location: "2026 | BANDUNG, INDONESIA",
    role: "FULLSTACK DEV",
    headline: "AN INTEGRATED BOARDING HOUSE MANAGEMENT AND COMPLAINT SYSTEM",
    description: "A comprehensive web application for boarding house management, facilitating room inventory, tenant contracts, billing/payments, and tenant complaint ticketing.",
    fullDescription: "Lapor Kos is an all-in-one boarding house management system designed to streamline communication and operations between landlords and tenants. The platform handles room availability tracking, digital rental agreements/contracts, automated billing, payment records, and a structured ticketing pipeline for complaints and maintenance reports.",
    problem: "Landlords struggled to manage boarding house tenants, track rent payments, and handle facility complaints efficiently, leading to late payments and unresolved maintenance requests.",
    contribution: "Built the entire application end-to-end, utilizing Next.js for a seamless UI, Golang for the secure backend API, and Supabase for real-time database sync and authentication. Implemented WhatsApp automated notifications via Fonnte.",
    impact: "Reduced late payments by 40% using automated alerts, streamlined landlord-tenant communication, and provided a centralized dashboard for room contracts.",
    image: "/portofolio.png",
    tags: ["Next.js", "Golang", "Supabase"],
    techStack: ["Next.js", "Tailwind CSS", "Golang", "Gin", "Supabase", "Fonnte (WA Gateway)", "Vercel", "Railway"],
    link: "https://lapor-kos.vercel.app/"
  }
];

interface ProjectsSectionProps {
  setSelectedProject: (project: typeof projectsData[number]) => void;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function ProjectsSection({ setSelectedProject }: ProjectsSectionProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      id="projects"
      className="space-y-10 scroll-mt-32"
    >
      <motion.div variants={fadeInUp}>
        <SectionHeader
          topText="Featured Works"
          mainText="Projects"
          subText="Overview"
          bottomText="List of Featured Portfolio"
          watermark="YOSUA"
        />
      </motion.div>

      <div className="flex flex-col gap-16">
        {projectsData.map((project) => (
          <motion.div
            key={project.id}
            variants={fadeInUp}
            className="group relative rounded-none overflow-hidden border border-white/10 bg-[#0d0f18]/45 min-h-[500px] flex flex-col md:flex-row items-stretch transition-colors hover:bg-[#0d0f18]/70"
          >
            {/* Background Image with Dark Overlay */}
            <div className="absolute inset-0 z-0">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-15 filter blur-[4px] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent"></div>
            </div>

            {/* Left Side: Info */}
            <div className="relative z-10 w-full md:w-[50%] p-8 md:p-12 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                {/* Project Header */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-black text-white tracking-widest uppercase font-sans">
                      {project.title}
                    </h3>
                    <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                  </div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                    {project.location}
                  </span>
                </div>

                {/* Role Tag */}
                <span className="inline-block text-[10px] font-bold text-indigo-400 border border-indigo-500/30 px-2.5 py-0.5 uppercase tracking-[0.2em] bg-indigo-500/5">
                  {project.role}
                </span>

                {/* Headline */}
                <h4 className="text-xl md:text-2xl font-extrabold text-white tracking-tight uppercase leading-snug font-sans">
                  {project.headline}
                </h4>

                {/* Description */}
                <p className="text-sm text-slate-300 font-light leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tech stack & CTA */}
              <div className="space-y-6 pt-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-wider text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center justify-center px-6 py-3 border border-white/20 hover:border-white text-white hover:bg-white hover:text-black font-bold uppercase tracking-widest text-[10px] transition-all duration-300 rounded-none cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side: Mockup Screenshot */}
            <div className="relative z-10 w-full md:w-[50%] p-8 md:p-12 flex items-center justify-center bg-black/30 md:bg-transparent overflow-hidden">
              <div className="relative w-full aspect-[16/10] border border-white/10 shadow-2xl shadow-black/80 transform md:rotate-[-2deg] group-hover:rotate-0 md:translate-x-6 group-hover:translate-x-2 transition-all duration-500 ease-out overflow-hidden bg-slate-950">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
