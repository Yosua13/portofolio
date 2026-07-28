"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Play, Clock } from "lucide-react";
import { useRef, useState, type FocusEvent, type RefObject } from "react";
import SectionHeader from "./SectionHeader";

const buildScreens = (
  projectKey: string,
  fileNames: string[],
  screens: { title: string; caption: string }[]
) => screens.map((screen, index) => ({
  ...screen,
  image: `/assets/projects/${projectKey}/screenshots/${fileNames[index]}`
}));

const laporKosScreens = [
  {
    title: "Login",
    caption: "Akses masuk untuk pemilik dan penghuni kos.",
    image: "/assets/projects/lapor-kos/screenshots/00-login.png",
    aspectRatio: "1920 / 901"
  },
  {
    title: "Dashboard",
    caption: "Ringkasan kamar, tagihan, komplain, dan aktivitas kos.",
    image: "/assets/projects/lapor-kos/screenshots/01-dashboard.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: "Manajemen Kamar",
    caption: "Kelola kamar, status hunian, harga, dan fasilitas.",
    image: "/assets/projects/lapor-kos/screenshots/02-manajemen-kamar.png",
    aspectRatio: "1920 / 901"
  },
  {
    title: "Penghuni & Kontrak",
    caption: "Pantau data penghuni, kontrak, dan relasi kamar.",
    image: "/assets/projects/lapor-kos/screenshots/03-penghuni-kontrak.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: "Manajemen Pembayaran",
    caption: "Kelola tagihan, status pembayaran, dan transaksi.",
    image: "/assets/projects/lapor-kos/screenshots/04-manajemen-pembayaran.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: "Laporan",
    caption: "Rekap operasional kos dalam tabel dan grafik.",
    image: "/assets/projects/lapor-kos/screenshots/05-laporan.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: "Peraturan Kos",
    caption: "Kelola aturan kos yang dapat dibaca penghuni.",
    image: "/assets/projects/lapor-kos/screenshots/06-peraturan-kos.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: "Kalender",
    caption: "Jadwal pembayaran, kontrak, dan aktivitas kos.",
    image: "/assets/projects/lapor-kos/screenshots/07-kalender.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: "Komplain",
    caption: "Daftar laporan penghuni dengan status penanganan.",
    image: "/assets/projects/lapor-kos/screenshots/08-komplain.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: "Pengaturan",
    caption: "Konfigurasi akun, preferensi, dan data aplikasi.",
    image: "/assets/projects/lapor-kos/screenshots/09-pengaturan.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: "Form Data",
    caption: "Form input untuk menambah atau mengubah data kos.",
    image: "/assets/projects/lapor-kos/screenshots/10-form.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: "Laporan Keuangan",
    caption: "Ringkasan pemasukan, pengeluaran, dan performa keuangan.",
    image: "/assets/projects/lapor-kos/screenshots/11-laporan-keuangan.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: "Detail Penghuni",
    caption: "Profil penghuni dengan kamar, kontrak, dan tagihan.",
    image: "/assets/projects/lapor-kos/screenshots/12-detail-penghuni.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: "Dashboard Penghuni",
    caption: "Beranda penghuni untuk tagihan dan informasi kos.",
    image: "/assets/projects/lapor-kos/screenshots/13-dashboard-penghuni.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: "Komplain Penghuni",
    caption: "Form dan riwayat komplain dari sisi penghuni.",
    image: "/assets/projects/lapor-kos/screenshots/14-komplain-penghuni.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: "Tagihan Penghuni",
    caption: "Daftar tagihan penghuni beserta status pembayarannya.",
    image: "/assets/projects/lapor-kos/screenshots/15-tagihan-penghuni.png",
    aspectRatio: "1920 / 902"
  }
];

const flowakScreens = [
  {
    title: "Login",
    caption: "Akses masuk pengguna untuk mengelola workflow dan tugas proyek.",
    image: "/assets/projects/flowak/screenshots/01-login.png"
  },
  {
    title: "Landing Page",
    caption: "Halaman utama platform Flowak dan pengenalan fitur.",
    image: "/assets/projects/flowak/screenshots/02-landing-page.png"
  },
  {
    title: "Kanvas Flow Project",
    caption: "Kanvas visual untuk memetakan arsitektur dan alur kerja proyek.",
    image: "/assets/projects/flowak/screenshots/03-kanvas.png"
  },
  {
    title: "Tabel Status Fitur",
    caption: "Daftar status pengerjaan fitur dan progres tim pengembang.",
    image: "/assets/projects/flowak/screenshots/04-tabel-status.png"
  },
  {
    title: "Spesifikasi Dokumen",
    caption: "Dokumentasi teknis, PRD, dan spesifikasi modul.",
    image: "/assets/projects/flowak/screenshots/05-spesifikasi-dokumen.png"
  },
  {
    title: "Jadwal & Waktu Tim",
    caption: "Alokasi waktu pengerjaan dan timeline pengerjaan tim.",
    image: "/assets/projects/flowak/screenshots/06-jadwal-tim.png"
  },
  {
    title: "Analitik Delivery",
    caption: "Grafik performa delivery, sprint velocity, dan metrik proyek.",
    image: "/assets/projects/flowak/screenshots/07-analitik.png"
  },
  {
    title: "Kanban Task Board",
    caption: "Papan kanban tugas dari backlog hingga tahap deployment.",
    image: "/assets/projects/flowak/screenshots/08-kanban.png"
  },
  {
    title: "Anggota & Peran Tim",
    caption: "Manajemen anggota tim, peran, dan pembagian tanggung jawab.",
    image: "/assets/projects/flowak/screenshots/09-anggota-tim.png"
  }
];

const sionMinistryScreens = [
  {
    title: "Login Portal",
    caption: "Halaman akses masuk portal pelayanan Sion Ministry.",
    image: "/assets/projects/sion-ministry/screenshots/01-login.png"
  },
  {
    title: "Dashboard Utama",
    caption: "Ringkasan kegiatan ibadah, pengumuman, dan aktivitas pelayanan.",
    image: "/assets/projects/sion-ministry/screenshots/02-dashboard.png"
  },
  {
    title: "Data & Statistik Jemaat",
    caption: "Manajemen data anggota jemaat dan grafik statistik pertumbuhan.",
    image: "/assets/projects/sion-ministry/screenshots/03-data-jemaat.png"
  },
  {
    title: "Jurnal Penelaahan Alkitab",
    caption: "Modul materi dan jurnal diskusi Penelaahan Alkitab (PA).",
    image: "/assets/projects/sion-ministry/screenshots/04-jurnal-pa.png"
  },
  {
    title: "Berita Acara & Laporan",
    caption: "Dokumentasi resmi berita acara kegiatan dan hasil rapat gereja.",
    image: "/assets/projects/sion-ministry/screenshots/05-berita-acara.png"
  },
  {
    title: "Donasi & Sion Care",
    caption: "Pengelolaan donasi, bantuan sosial, dan program kepedulian jemaat.",
    image: "/assets/projects/sion-ministry/screenshots/06-donasi-care.png"
  },
  {
    title: "Sion Careers & Pelayanan",
    caption: "Informasi lowongan staf pelayanan dan kesempatan berkarya.",
    image: "/assets/projects/sion-ministry/screenshots/07-sion-careers.png"
  },
  {
    title: "Tautan & Sumber Daya",
    caption: "Kumpulan link penting, materi ibadah, dan sumber daya gereja.",
    image: "/assets/projects/sion-ministry/screenshots/08-tautan-sumber.png"
  }
];

const projectsData = [
  {
    id: "lapor-kos",
    title: "Lapor Kos",
    category: "Fullstack",
    location: "2026 | BOARDING HOUSE OPERATIONS",
    role: "FULLSTACK DEVELOPER",
    headline: "BOARDING HOUSE MANAGEMENT, AUTOMATED BILLING, AND AI COMPLAINT WORKFLOW",
    description: "An integrated management platform for boarding house owners to automate monthly rent billing, payment verification, digital receipts, tenant contract tracking, and AI-categorized facility maintenance tickets.",
    fullDescription: "Lapor Kos automates manual boarding house operations for landlords and tenants. It features automated monthly billing calculations, payment tracking with digital receipt generation, a contract renewal calendar, AI-driven facility complaint classification using Google Gemini, and automated WhatsApp billing reminders via Fonnte.",
    problem: "Kos owners face manual administrative overhead with paper or spreadsheet records, resulting in late rent collections, unorganized facility maintenance reports, and slow financial cashflow analysis.",
    contribution: "Architected the decoupled application from Next.js 15 UI, Go Gin REST API, PostgreSQL database schema, Supabase storage, Google Gemini AI complaint prioritization, Fonnte WhatsApp integration, to automated Gofpdf financial report generation.",
    impact: "Centralizes operations into an automated system, boosting billing collection efficiency, accelerating maintenance resolution, and providing instant PDF financial reports.",
    image: "/assets/projects/lapor-kos/screenshots/01-dashboard.png",
    video: "/assets/projects/lapor-kos/videos/demo.mp4",
    tags: ["Next.js", "Golang", "Supabase", "WhatsApp API", "Billing"],
    techStack: ["Next.js 15", "React", "TypeScript", "Tailwind CSS", "Go (Gin)", "PostgreSQL", "Supabase", "Fonnte WhatsApp API", "Google Gemini AI", "Gofpdf", "Docker", "Vercel", "Railway"],
    link: "https://lapor-kos.vercel.app/",
    githubLink: "https://github.com/Yosua13/lapor-kos",
    previewTone: "from-emerald-500 via-teal-500 to-cyan-600",
    screens: laporKosScreens
  },
  {
    id: "flowak",
    title: "Flowak",
    category: "Fullstack",
    location: "2026 | IT PROJECT WORKFLOW",
    role: "PRODUCT / FULLSTACK DEVELOPER",
    headline: "AI-POWERED BUSINESS PROCESS MODELER AND TECHNICAL SYSTEM ARCHITECT",
    description: "A collaborative graph-based platform for modeling business workflows and visual system architecture with AI-generated flow diagrams, endpoint specs, and role task breakdowns.",
    fullDescription: "Flowak transforms business requirements into technical workflow diagrams using Google Gemini AI. It enables product teams (PMs, UI/UX, Frontend, and Backend engineers) to visualize system flow, generate AI flow audits, auto-create mock JSON request/response payloads, and assign role-specific tasks per workflow node.",
    problem: "Development teams lose context when business workflows, technical specs, API endpoint schemas, JSON payloads, and task assignments are scattered across separate chat and document tools.",
    contribution: "Designed the graph canvas architecture, multi-tenant SaaS schema, Express standalone proxy, Go Gin backend API, Zustand state manager, and Gemini AI flow generation, mock payload, and audit handlers.",
    impact: "Aligns cross-functional engineering teams, reduces API integration friction, and accelerates software design velocity.",
    image: "/assets/projects/flowak/screenshots/02-landing-page.png",
    video: "/assets/projects/flowak/videos/demo.mp4",
    tags: ["Task Flow", "Project IT", "Kanban", "AI Architect", "Graph Modeler"],
    techStack: ["React 19", "TypeScript", "Vite", "Tailwind CSS v4", "Zustand", "Go (Gin)", "PostgreSQL", "GORM", "JWT", "Express.js", "Google Gemini AI"],
    githubLink: "https://github.com/Yosua13/flowak",
    previewTone: "from-indigo-500 via-sky-500 to-emerald-500",
    screens: flowakScreens
  },
  {
    id: "sion-ministry",
    title: "Sion Ministry",
    category: "Fullstack",
    location: "2026 | SPIRITUAL COMMUNITY OPERATIONS",
    role: "FULLSTACK DEVELOPER",
    headline: "OFFLINE-FIRST DISCIPLESHIP TRACKING AND SPIRITUAL COMMUNITY PORTAL",
    description: "An offline-first web platform for spiritual communities and field workers to manage discipleship progress, worship schedules, PA journals, prayer channels, and community activities.",
    fullDescription: "Sion Ministry (Sion Academy) provides a discipleship tracking system built with an offline-first architecture. Field workers can log member progress, PA journals, service activity reports, and mission donations offline in remote areas, with automatic background synchronization upon re-establishing internet connection. Includes an AI Assistant powered by Google Gemini.",
    problem: "Ministry workers operating in remote regions frequently lack reliable internet access, hindering real-time reporting of fellowship activities, discipleship journaling, and member care.",
    contribution: "Engineered the local-first storage layer (SionDatabase LocalStorage Cache), Sync Manager queue, Go Fiber API backend, PostgreSQL database, Framer Motion animations, and Gemini-powered theological AI Assistant.",
    impact: "Enables uninterrupted field operation reporting in offline environments and automates sync to centralized database metrics.",
    image: "/assets/projects/sion-ministry/screenshots/02-dashboard.png",
    video: "/assets/projects/sion-ministry/videos/demo.mp4",
    tags: ["Ministry Platform", "Offline-First", "Discipleship", "Spiritual Portal", "AI Assistant"],
    techStack: ["React 19", "Vite 6", "TypeScript", "Tailwind CSS v4", "Framer Motion", "LocalStorage Offline Sync", "Go (Fiber v2)", "GORM", "PostgreSQL", "Google Gemini AI"],
    githubLink: "https://github.com/Yosua13/sion-ministry",
    previewTone: "from-violet-600 via-indigo-600 to-amber-500",
    screens: sionMinistryScreens
  },
  {
    id: "logia-log",
    title: "Logia Log",
    category: "Backend",
    location: "2026 | SERVER OBSERVABILITY",
    role: "BACKEND / TOOLING DEVELOPER",
    headline: "REAL-TIME SERVER LOG DIAGNOSTICS AND AI-ASSISTED OBSERVABILITY TOOL",
    description: "A diagnostic observability tool for ingesting server and VM logs, clustering error stack traces, classifying severity, and generating AI-assisted root cause analysis.",
    fullDescription: "Logia Log is a server observability application designed to read live log streams from VMs and application servers. It clusters error stack traces, tags incident severity, leverages Google Gemini AI for automated root cause diagnosis, and generates actionable command checklists for rapid remediation.",
    problem: "When production servers fail, engineers waste critical time manually scanning massive log files before identifying the exact failure source and remediation steps.",
    contribution: "Designing the Java Spring Boot backend architecture, Spring WebSocket log streaming, RabbitMQ async processing queue, PostgreSQL schema, and Gemini AI root-cause diagnosis pipeline.",
    impact: "Shortens incident Mean Time to Resolution (MTTR) by converting raw log dumps into structured diagnostic insights.",
    tags: ["Log Analyzer", "VM Observability", "Root Cause AI", "Spring Boot", "RabbitMQ"],
    techStack: ["React 19", "TypeScript", "Vite", "Tailwind CSS v4", "Java 21", "Spring Boot", "Spring Security", "Spring Data JPA", "Spring WebSocket", "RabbitMQ", "PostgreSQL", "Google Gemini AI"],
    githubLink: "https://github.com/Yosua13/logia-log",
    previewTone: "from-rose-500 via-red-500 to-amber-500",
    isWip: true,
    screens: []
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

function ProjectPreviewVideo({
  project,
  videoRef,
  isPreviewPlaying
}: {
  project: ProjectData;
  videoRef: RefObject<HTMLVideoElement | null>;
  isPreviewPlaying: boolean;
}) {
  if (project.isWip || !project.video) return null;

  return (
    <div className="relative h-full w-full overflow-hidden bg-slate-950">
      <video
        ref={videoRef}
        src={project.video}
        className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
        muted
        loop
        playsInline
        preload="metadata"
      />

      <div className={`pointer-events-none absolute bottom-9 left-0 right-0 flex justify-center transition-opacity duration-500 ${isPreviewPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
        <div className="project-preview-badge flex items-center gap-2 rounded-full border border-white/20 bg-black/55 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white shadow-2xl backdrop-blur-md">
          <Play className="h-3.5 w-3.5 fill-white" />
          {isPreviewPlaying ? "Playing Demo" : "Hover to Play"}
        </div>
      </div>

      <div className="absolute bottom-5 left-5 right-5 h-1.5 overflow-hidden rounded-full bg-white/15">
        <div className="h-full w-1/3 rounded-full bg-white transition-transform duration-1000 group-hover:translate-x-[200%]" />
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  setSelectedProject
}: {
  project: ProjectData;
  index: number;
  setSelectedProject: (project: ProjectData) => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);

  const playPreview = () => {
    if (project.isWip) return;
    const video = videoRef.current;

    if (!video) return;

    setIsPreviewPlaying(true);
    void video.play().catch(() => setIsPreviewPlaying(false));
  };

  const stopPreview = () => {
    if (project.isWip) return;
    const video = videoRef.current;

    if (!video) return;

    video.pause();
    video.currentTime = 0;
    setIsPreviewPlaying(false);
  };

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      stopPreview();
    }
  };

  return (
    <motion.article
      variants={fadeInUp}
      data-project-card
      tabIndex={0}
      onMouseEnter={playPreview}
      onMouseLeave={stopPreview}
      onFocus={playPreview}
      onBlur={handleBlur}
      className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-[#0d0f18]/45 transition-all duration-500 hover:-translate-y-1 hover:border-indigo-500/35 hover:bg-[#0d0f18]/70 focus:outline-none focus-visible:border-indigo-400 focus-visible:ring-2 focus-visible:ring-indigo-300/40"
    >
      <div className="absolute inset-0 z-0">
        {project.image && !project.isWip && (
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover opacity-15 blur-[3px] transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/30" />
      </div>

      <div className={`relative z-10 grid min-h-[540px] grid-cols-1 md:grid-cols-2 ${index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
        <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 md:p-12">
          <div className="space-y-5">
            <div className="space-y-2">
              <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300">
                {project.category}
              </span>
              <div className="flex items-center gap-3">
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase font-sans">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View GitHub Repository"
                      aria-label={`${project.title} GitHub repository`}
                      className="text-slate-400 transition-colors hover:text-white"
                    >
                      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Visit Live Website"
                      aria-label={`${project.title} live website`}
                      className="text-slate-400 transition-colors hover:text-white"
                    >
                      <ExternalLink className="h-5 w-5 shrink-0" />
                    </a>
                  )}
                </div>
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
              className="project-details-button inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
            >
              View Details
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center p-5 sm:p-8 md:p-10">
          {project.isWip ? (
            <div className="relative w-full max-w-xl overflow-hidden rounded-[22px] border border-amber-500/30 bg-slate-950/90 shadow-2xl shadow-black/80 aspect-[16/10] flex flex-col items-center justify-center p-6 text-center group-hover:border-amber-400/50 transition-colors">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(245,158,11,0.12),transparent_60%)] pointer-events-none" />
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/15 text-amber-400 shadow-inner">
                  <Clock className="h-7 w-7 animate-pulse" />
                </div>
                <div className="space-y-1.5">
                  <span className="inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-amber-300">
                    Work in Progress
                  </span>
                  <h5 className="text-lg font-extrabold text-white tracking-tight uppercase font-sans">
                    Under Active Development
                  </h5>
                  <p className="max-w-xs text-xs text-slate-400 font-light leading-relaxed">
                    Media preview and full demonstration will be available upon feature release.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative w-full max-w-xl overflow-hidden rounded-[22px] border border-white/10 bg-slate-950 shadow-2xl shadow-black/80 aspect-[16/10] transition-transform duration-500 ease-out group-hover:scale-[1.02]">
              <ProjectPreviewVideo
                project={project}
                videoRef={videoRef}
                isPreviewPlaying={isPreviewPlaying}
              />
            </div>
          )}
        </div>
      </div>
    </motion.article>
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
          bottomText="Dummy media previews for featured portfolio"
          watermark="YOSUA"
        />
      </motion.div>

      <div className="flex flex-col gap-12">
        {projectsData.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            setSelectedProject={setSelectedProject}
          />
        ))}
      </div>
    </motion.section>
  );
}
