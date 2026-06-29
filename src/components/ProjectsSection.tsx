"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Play } from "lucide-react";
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

const projectsData = [
  {
    id: "lapor-kos",
    title: "Lapor Kos",
    category: "Fullstack",
    location: "2026 | BOARDING HOUSE OPERATIONS",
    role: "FULLSTACK DEVELOPER",
    headline: "BOARDING HOUSE MANAGEMENT, BILLING, AND COMPLAINT WORKFLOW",
    description: "A management platform for boarding house owners to track rooms, tenants, payments, contracts, and maintenance complaints in one operational dashboard.",
    fullDescription: "Lapor Kos is an all-in-one boarding house management system designed to streamline operations between landlords and tenants. The platform handles room availability, tenant contracts, payment records, automated billing reminders, and structured complaint tickets for facility maintenance.",
    problem: "Kos owners often manage room occupancy, rent payments, and tenant complaints manually, making it difficult to track late payments, room status, and unresolved facility reports.",
    contribution: "Built the full application flow from dashboard UI, room and tenant modules, complaint ticketing, backend API, database schema, and notification-ready workflows.",
    impact: "Creates a centralized operating system for kos management, making tenant data, billing status, and facility issues easier to monitor and resolve.",
    image: "/assets/projects/lapor-kos/cover.svg",
    video: "/assets/projects/lapor-kos/videos/demo.mp4",
    tags: ["Next.js", "Golang", "Supabase", "Billing"],
    techStack: ["Next.js", "Tailwind CSS", "Golang", "Gin", "Supabase", "Fonnte", "Vercel", "Railway", "Gemini API"],
    link: "https://lapor-kos.vercel.app/",
    previewTone: "from-emerald-500 via-teal-500 to-cyan-600",
    screens: laporKosScreens
  },
  {
    id: "flowak",
    title: "Flowak",
    category: "Fullstack",
    location: "2026 | IT PROJECT WORKFLOW",
    role: "PRODUCT / FULLSTACK DEVELOPER",
    headline: "FLOW MANAGEMENT AND DEVELOPMENT TASK ORCHESTRATION",
    description: "An IT project workflow application for managing development flow, task ownership, work status, blockers, and delivery progress across a project team.",
    fullDescription: "Flowak is a workflow and task management application built for IT project teams. It helps teams map project flow, break development work into trackable tasks, assign ownership, monitor blockers, and keep delivery progress visible across design, frontend, backend, QA, and deployment stages.",
    problem: "Development teams often lose context when project tasks, blockers, discussions, and delivery flow are scattered across chat, documents, and manual status updates.",
    contribution: "Designed the product flow, dashboard hierarchy, task board, status tracking, project activity timeline, and dummy analytics views for delivery monitoring.",
    impact: "Improves visibility across project execution, helping teams understand what is being worked on, what is blocked, and what needs attention next.",
    image: "/assets/projects/flowak/cover.svg",
    video: "/assets/projects/flowak/videos/demo.mp4",
    tags: ["Task Flow", "Project IT", "Kanban", "Dashboard"],
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Zustand", "Go", "Gin", "PostgreSQL", "JWT", "bcrypt", "Gemini API"],
    previewTone: "from-indigo-500 via-sky-500 to-emerald-500",
    screens: buildScreens("flowak", [
      "01-project-flow-board.svg",
      "02-task-detail.svg",
      "03-delivery-analytics.svg",
      "04-ai-flow-audit.svg",
      "05-mock-payload.svg",
      "06-project-overview.svg"
    ], [
      { title: "Project Flow Board", caption: "Kanban-style development flow from backlog to deployment." },
      { title: "Task Detail", caption: "Ownership, priority, checklist, blockers, and discussion context." },
      { title: "Delivery Analytics", caption: "Sprint velocity, blocked work, and progress summary." },
      { title: "AI Flow Audit", caption: "Gemini-powered flow risk, missing task, and bottleneck insight." },
      { title: "Mock Payload", caption: "Generated payload examples for frontend and backend alignment." },
      { title: "Project Overview", caption: "Delivery progress, active sprint, blockers, and owner summary." }
    ])
  },
  {
    id: "sion-ministry",
    title: "Sion Ministry",
    category: "Fullstack",
    location: "2026 | SPIRITUAL COMMUNITY OPERATIONS",
    role: "FULLSTACK DEVELOPER",
    headline: "SPIRITUAL PORTAL, WORSHIP SCHEDULER, AND ACTIVITY MONITORING",
    description: "A web platform for the Sion Ministry community to view and manage spiritual activities, services, prayer requests, and community announcements.",
    fullDescription: "Sion Ministry is a digital hub designed to support a spiritual community. It facilitates members in viewing and registering for upcoming services, retreats, and group activities, while enabling ministry leaders to coordinate schedules, prayer requests, content, and attendance.",
    problem: "Spiritual communities often face challenges in coordinating events, collecting prayer requests, and tracking member participation through scattered communication channels.",
    contribution: "Developed the scheduling module, community prayer board, event registration flow, back-office administration panel, and attendance tracking analytics.",
    impact: "Centralizes event coordination and community updates, boosting member engagement and offering administrators clear visibility into activity attendance.",
    image: "/assets/projects/sion-ministry/cover.svg",
    video: "/assets/projects/sion-ministry/videos/demo.mp4",
    tags: ["Ministry Platform", "Worship Scheduler", "Community", "Spiritual Portal"],
    techStack: ["Next.js", "Tailwind CSS", "Go", "Gin", "PostgreSQL", "Supabase", "Gemini API"],
    previewTone: "from-violet-600 via-indigo-600 to-amber-500",
    screens: buildScreens("sion-ministry", [
      "01-dashboard.svg",
      "02-jadwal-ibadah.svg",
      "03-pendaftaran-kegiatan.svg",
      "04-kanal-doa.svg",
      "05-manajemen-konten.svg",
      "06-laporan-absensi.svg"
    ], [
      { title: "Dashboard", caption: "Overview of upcoming services, announcements, and quick actions" },
      { title: "Jadwal Ibadah", caption: "Worship schedule, sermon topics, and location details" },
      { title: "Pendaftaran Kegiatan", caption: "Register for retreats, bible study, and fellowship events" },
      { title: "Kanal Doa", caption: "Submit prayer requests, track active prayers, and assign intercessors" },
      { title: "Manajemen Konten", caption: "Admin tools to publish new events, updates, and materials" },
      { title: "Laporan Absensi", caption: "Attendance graphs, community growth charts, and activity summaries" }
    ])
  },
  {
    id: "logia-log",
    title: "Logia Log",
    category: "Backend",
    location: "2026 | SERVER OBSERVABILITY",
    role: "BACKEND / TOOLING DEVELOPER",
    headline: "LOG ERROR ANALYSIS WITH ROOT CAUSE AND RECOMMENDATION OUTPUT",
    description: "A diagnostic tool for reading VM or application server logs, identifying likely error causes, and generating actionable recommendations for resolution.",
    fullDescription: "Logia Log is a server log analysis application that reads logs from VMs or application servers, detects abnormal patterns, classifies error severity, explains likely root causes, and provides practical recommendations to help engineers resolve issues faster.",
    problem: "When production applications fail, engineers often spend too much time scanning long log files manually before understanding the actual root cause and next action.",
    contribution: "Created the concept for log ingestion, error grouping, severity tagging, root-cause summary, and recommendation panels for operational debugging workflows.",
    impact: "Shortens troubleshooting time by turning raw logs into prioritized insights, readable summaries, and suggested remediation steps.",
    image: "/assets/projects/logia-log/cover.svg",
    video: "/assets/projects/logia-log/videos/demo.mp4",
    tags: ["Log Analyzer", "VM", "Root Cause", "Recommendation"],
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Java", "Spring Boot", "JWT", "Gemini API", "RabbitMQ"],
    previewTone: "from-rose-500 via-red-500 to-amber-500",
    screens: buildScreens("logia-log", [
      "01-log-stream.svg",
      "02-root-cause.svg",
      "03-recommendation.svg",
      "04-error-cluster.svg",
      "05-rabbitmq-queue.svg",
      "06-incident-report.svg"
    ], [
      { title: "Log Stream", caption: "Live-style log reader with severity grouping and timestamps." },
      { title: "Root Cause", caption: "Readable diagnosis explaining the likely source of failure." },
      { title: "Recommendation", caption: "Suggested remediation steps for engineers and operators." },
      { title: "Error Cluster", caption: "Grouped stack traces, frequency, and impacted service." },
      { title: "RabbitMQ Queue", caption: "Async analysis jobs, retry count, and processing status." },
      { title: "Incident Report", caption: "Readable summary, timeline, and exported investigation result." }
    ])
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
  return (
    <div className="relative h-full w-full overflow-hidden bg-slate-950">
      <div className={`absolute inset-0 bg-gradient-to-br ${project.previewTone} opacity-45 transition-opacity duration-500 group-hover:opacity-75`} />
      <video
        ref={videoRef}
        src={project.video}
        className="absolute inset-0 h-full w-full object-cover opacity-45 mix-blend-screen transition-all duration-700 group-hover:scale-105 group-hover:opacity-70"
        muted
        loop
        playsInline
        preload="metadata"
      />
      <Image
        src={project.image}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover opacity-35 mix-blend-screen transition-all duration-700 group-hover:scale-105 group-hover:opacity-50"
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:28px_28px] opacity-25" />

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
    const video = videoRef.current;

    if (!video) return;

    setIsPreviewPlaying(true);
    void video.play().catch(() => setIsPreviewPlaying(false));
  };

  const stopPreview = () => {
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
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover opacity-15 blur-[3px] transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/30" />
      </div>

      <div className={`relative z-10 grid min-h-[540px] grid-cols-1 md:grid-cols-2 ${index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
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
              className="project-details-button inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
            >
              View Details
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center p-5 sm:p-8 md:p-10">
          <div className="relative w-full max-w-xl overflow-hidden rounded-[22px] border border-white/10 bg-slate-950 shadow-2xl shadow-black/80 aspect-[16/10] transition-transform duration-500 ease-out group-hover:scale-[1.02]">
            <ProjectPreviewVideo
              project={project}
              videoRef={videoRef}
              isPreviewPlaying={isPreviewPlaying}
            />
          </div>
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
