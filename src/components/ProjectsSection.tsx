"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Play } from "lucide-react";
import SectionHeader from "./SectionHeader";

const projectsData = [
  {
    id: "hcm-campaign",
    title: "HCM Campaign Assignment System",
    category: "Backend",
    location: "2025 | INTERNAL BUSINESS SYSTEM",
    role: "FULLSTACK / BACKEND ENGINEER",
    headline: "AUTOMATED CAMPAIGN AND REPAIR ORDER ASSIGNMENT ENGINE",
    description: "An internal enterprise web application for managing customer campaigns and repair order assignments based on sales performance scoring, reducing manual work.",
    fullDescription: "HCM Campaign Assignment System automates customer lead distribution to sales representatives. It utilizes a custom scoring algorithm based on historical performance, workload, and campaign constraints to optimize conversion rates and maximize customer engagement.",
    problem: "Sales operations faced substantial delays and tracking errors when manually assigning campaign targets and repair orders to sales reps, leading to missed opportunities and unfair distribution.",
    contribution: "Designed and implemented the core assignment routing engine in Go, optimized SQL queries for high-speed performance evaluation, and integrated the REST API endpoints with the Next.js frontend.",
    impact: "Successfully automated 100% of customer distribution, reduced the assignment process time from hours to seconds, and improved campaign tracking with real-time audit logs.",
    image: "/project1.png",
    tags: ["Go", "MSSQL", "REST API", "Next.js"],
    techStack: ["Go", "MSSQL", "REST API", "Next.js", "TypeScript", "Tailwind CSS"],
    previewTone: "from-cyan-500 via-indigo-500 to-blue-700",
    screens: [
      { title: "Assignment Dashboard", caption: "Queue health, campaign status, and performance score summary." },
      { title: "Routing Rules", caption: "Criteria editor for sales performance, workload, and campaign constraints." },
      { title: "Audit Trail", caption: "Distribution history with filterable logs and action timestamps." }
    ]
  },
  {
    id: "portfolio-experience",
    title: "Interactive Portfolio Experience",
    category: "Frontend",
    location: "2026 | PERSONAL BRANDING",
    role: "FRONTEND ENGINEER",
    headline: "ANIMATED PORTFOLIO WITH GAME-LIKE INTERACTIONS",
    description: "A high-polish portfolio interface with cinematic hero composition, responsive navigation, carousel content, and recruiter-focused sections.",
    fullDescription: "Interactive Portfolio Experience is a portfolio interface designed to communicate engineering skill, visual taste, and product thinking in a single scrollable experience. It combines animation, responsive layout, recruiter snapshots, project case studies, and a lightweight flight-game interaction.",
    problem: "A standard portfolio often looks static and does not quickly show personality, frontend craft, or the ability to build responsive user experiences.",
    contribution: "Built the visual system, responsive layout, animated sections, navigation states, recruiter quick view, theme handling, and project presentation components using Next.js, TypeScript, Tailwind CSS, and Framer Motion.",
    impact: "Improved portfolio storytelling with a more memorable first impression, clearer recruiter scan path, and stronger demonstration of frontend interaction design.",
    image: "/portofolio.png",
    tags: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js", "Responsive UI"],
    previewTone: "from-fuchsia-500 via-indigo-500 to-sky-500",
    screens: [
      { title: "Hero Interface", caption: "Landing viewport with CTA grouping, profile summary, and interactive visual layer." },
      { title: "Recruiter Snapshot", caption: "Fast-scan section for role, stack, availability, and contact actions." },
      { title: "Project Gallery", caption: "Filterable case-study cards with hover preview and detail modal." }
    ]
  },
  {
    id: "lapor-kos",
    title: "Lapor Kos",
    category: "Fullstack",
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
    link: "https://lapor-kos.vercel.app/",
    previewTone: "from-emerald-500 via-teal-500 to-cyan-600",
    screens: [
      { title: "Owner Dashboard", caption: "Room occupancy, payment status, and complaint ticket overview." },
      { title: "Tenant Contract", caption: "Digital tenant profile, room assignment, and billing timeline." },
      { title: "Complaint Ticket", caption: "Maintenance report detail with priority, status, and conversation log." }
    ]
  }
];

export type ProjectData = typeof projectsData[number];

interface ProjectsSectionProps {
  setSelectedProject: (project: ProjectData) => void;
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
      staggerChildren: 0.12
    }
  }
};

function ProjectPreviewVideo({ project }: { project: ProjectData }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-slate-950">
      <div className={`absolute inset-0 bg-gradient-to-br ${project.previewTone} opacity-40 transition-opacity duration-500 group-hover:opacity-70`} />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:28px_28px] opacity-25" />

      <div className="absolute left-5 right-5 top-5 flex items-center justify-between rounded-xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
        </div>
        <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/70">Dummy Preview</span>
      </div>

      <div className="absolute left-7 top-24 h-24 w-32 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm transition-transform duration-700 group-hover:-translate-y-2">
        <span className="block h-3 w-16 rounded-full bg-white/45" />
        <span className="mt-5 block h-8 w-20 rounded-xl bg-white/20" />
      </div>
      <div className="absolute bottom-20 left-7 right-7 grid grid-cols-3 gap-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className="h-20 rounded-2xl border border-white/10 bg-black/25 p-3 backdrop-blur-sm transition-transform duration-700 group-hover:-translate-y-3" style={{ transitionDelay: `${item * 70}ms` }}>
            <span className="block h-2 w-10 rounded-full bg-white/45" />
            <span className="mt-3 block h-7 rounded-xl bg-white/15" />
          </div>
        ))}
      </div>
      <div className="absolute right-6 top-28 h-44 w-28 rounded-3xl border border-white/10 bg-black/25 p-3 backdrop-blur-sm transition-transform duration-700 group-hover:translate-y-2">
        <span className="block h-3 w-16 rounded-full bg-white/45" />
        <span className="mt-5 block h-24 rounded-2xl bg-white/15" />
      </div>

      <div className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="flex items-center gap-3 rounded-full border border-white/20 bg-black/45 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white shadow-2xl backdrop-blur-md">
          <Play className="h-4 w-4 fill-white" />
          Hover Video
        </div>
      </div>

      <div className="absolute bottom-5 left-5 right-5 h-1.5 overflow-hidden rounded-full bg-white/15">
        <div className="h-full w-1/3 rounded-full bg-white transition-transform duration-1000 group-hover:translate-x-[200%]" />
      </div>
    </div>
  );
}

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

      <div className="flex flex-col gap-12">
        {projectsData.map((project, index) => (
          <motion.article
            key={project.id}
            variants={fadeInUp}
            data-project-card
            className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-[#0d0f18]/45 transition-all duration-500 hover:-translate-y-1 hover:border-indigo-500/35 hover:bg-[#0d0f18]/70"
          >
            <div className="absolute inset-0 z-0">
              <Image
                src={project.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-10 blur-[4px] transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/30" />
            </div>

            <div className={`relative z-10 grid min-h-[520px] grid-cols-1 md:grid-cols-2 ${index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 md:p-12">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300">
                      {project.category}
                    </span>
                    <div className="flex items-start gap-3">
                      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase font-sans">
                        {project.title}
                      </h3>
                      {project.link && (
                        <ExternalLink className="mt-1 h-5 w-5 shrink-0 text-slate-400 transition-colors group-hover:text-white" />
                      )}
                    </div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                      {project.location}
                    </span>
                  </div>

                  <span className="inline-block text-[10px] font-bold text-indigo-300 border border-indigo-500/30 px-2.5 py-1 uppercase tracking-[0.2em] bg-indigo-500/5">
                    {project.role}
                  </span>

                  <h4 className="text-xl md:text-2xl font-extrabold text-white tracking-tight uppercase leading-snug font-sans">
                    {project.headline}
                  </h4>

                  <p className="max-w-xl text-sm text-slate-300 font-light leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-wider text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
                  >
                    View Details
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center p-5 sm:p-8 md:p-10">
                <div className="relative w-full max-w-xl overflow-hidden rounded-[22px] border border-white/10 bg-slate-950 shadow-2xl shadow-black/80 aspect-[16/10] transition-transform duration-500 ease-out group-hover:scale-[1.02]">
                  <ProjectPreviewVideo project={project} />
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}
