"use client";

import Image from "next/image";
import {
  Award,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Code2,
  Download,
  ExternalLink,
  Eye,
  FileText,
  GraduationCap,
  MapPin,
  Trophy,
  Users
} from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/context/LanguageContext";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { getTechBrandMeta } from "@/components/ui/tech-icon";

interface SkillTile {
  name: string;
  role: string;
}

interface CareerEntry {
  id: string;
  role: string;
  org: string;
  location: string;
  period: string;
  badge: string;
  badgeVariant: "emerald" | "accent" | "cyan";
  logo?: string;
  logoStyle?: "dark-cover" | "light-contain";
  summary: string;
  points: string[];
  stack: string[];
}

interface OrganizationEntry {
  id: string;
  num: string;
  role: string;
  org: string;
  period: string;
  badge: string;
  badgeVariant: "amber" | "violet" | "cyan";
  icon: "users" | "dorm" | "code";
  summary: string;
  points: string[];
}

export default function AboutHubSection() {
  const { language } = useLanguage();

  const skillCategories: { id: string; label: string; items: SkillTile[] }[] = [
    {
      id: "frontend",
      label: "Frontend",
      items: [
        { name: "React 19", role: "SPA & UI" },
        { name: "Next.js", role: "App Router" },
        { name: "Angular", role: "Enterprise UI" },
        { name: "TypeScript", role: "Type-Safe" },
        { name: "Tailwind CSS v4", role: "Design System" },
        { name: "Flutter", role: "Mobile App" },
        { name: "Vite", role: "Build Tool" }
      ]
    },
    {
      id: "backend",
      label: "Backend",
      items: [
        { name: "Java (21 / 25 LTS)", role: "Enterprise Core" },
        { name: "Spring Boot", role: "Microservices" },
        { name: "Golang (Gin / Fiber)", role: "High Concurrency" },
        { name: "NestJS & Fastify", role: "Clean Node API" },
        { name: "RabbitMQ", role: "Message Broker" },
        { name: "Node.js", role: "Runtime" }
      ]
    },
    {
      id: "database",
      label: "Database",
      items: [
        { name: "PostgreSQL", role: "Primary RDBMS" },
        { name: "Oracle Database", role: "Enterprise DB" },
        { name: "SQL Server", role: "Corporate DB" },
        { name: "MySQL", role: "Web RDBMS" },
        { name: "Redis / Upstash", role: "Cache & Lock" },
        { name: "Supabase", role: "Cloud & S3" },
        { name: "Firebase", role: "Realtime & Auth" }
      ]
    },
    {
      id: "ai-devops",
      label: language === "id" ? "AI & Tools" : "AI & DevOps",
      items: [
        { name: "OpenAI / Codex", role: "AI Engineering" },
        { name: "Antigravity / Gemini", role: "AI Agent & LLM" },
        { name: "Docker", role: "Containers" },
        { name: "Kubernetes", role: "Orchestration" },
        { name: "Prisma ORM", role: "Schema & Query" },
        { name: "Midtrans API", role: "Payment Gateway" },
        { name: "Git / GitHub / GitLab", role: "Version Control" },
        { name: "Postman", role: "API Testing" },
        { name: "Sentry", role: "Observability" }
      ]
    }
  ];

  const careerItems: CareerEntry[] = [
    {
      id: "freelance-semai",
      role:
        language === "id"
          ? "Software Developer — Freelance & Independen"
          : "Software Developer — Freelance & Independent",
      org:
        language === "id"
          ? "Proyek Klien Independen · Yayasan SEMAI, GBI Stairway MW 13.30 & Apotek"
          : "Independent Client Projects · Yayasan SEMAI, GBI Stairway MW 13.30 & Pharmacy POS",
      location: "Bandung, Indonesia",
      period: language === "id" ? "Jun 2026 — Sekarang" : "Jun 2026 — Present",
      badge: language === "id" ? "Aktif · Freelance" : "Active · Freelance",
      badgeVariant: "emerald",
      logo: "/assets/images/brand/app-icon.png",
      logoStyle: "dark-cover",
      summary:
        language === "id"
          ? "Menangani pengembangan software end-to-end bagi organisasi dan bisnis secara langsung — mencakup platform digital Sion Ministry (Yayasan SEMAI), sistem penjadwalan Ministry Schedule (GBI Stairway MW 13.30), serta pengembangan aplikasi Kasir POS untuk Apotek (klien menyusul)."
          : "Delivering end-to-end custom software for organizations and SMEs — including Sion Ministry (Yayasan SEMAI), Ministry Schedule (GBI Stairway MW 13.30), and a Pharmacy Point of Sale (POS) application (client onboarding).",
      points:
        language === "id"
          ? [
              "Sion Ministry — Klien: Yayasan SEMAI: Membangun platform digital terintegrasi (React/Vite, Go Fiber, GORM, PostgreSQL) berisi 8+ modul inti (anggota, event, notulensi, jurnal PA, donasi, lowongan, tautan, asisten AI), otorisasi RBAC multi-peran, pengujian fitur, serta penyusunan PRD & System Design.",
              "Ministry Schedule — Klien: GBI Stairway MW 13.30: Merancang dan mengembangkan sistem penjadwalan pelayanan ibadah, plotting peran pelayan, serta koordinasi jadwal lintas tim agar operasional pelayanan lebih tertata.",
              "Aplikasi Kasir POS Apotek — Klien: Apotek (Menyusul): Mengembangkan sistem Point of Sale (POS) khusus operasional apotek meliputi transaksi kasir cepat, manajemen stok obat, dan pelaporan penjualan harian."
            ]
          : [
              "Sion Ministry — Client: Yayasan SEMAI: Engineered an integrated digital platform (React/Vite, Go Fiber, GORM, PostgreSQL) with 8+ core modules (members, events, minutes, journals, donations, jobs, links, AI assistant), multi-role RBAC, QA testing, PRD, and System Design.",
              "Ministry Schedule — Client: GBI Stairway MW 13.30: Designed and built a ministry roster & scheduling system streamlining volunteer role plotting and service coordination.",
              "Pharmacy POS Application — Client: Pharmacy (Upcoming): Developing a dedicated Point of Sale (POS) system for pharmacy workflows covering fast checkout, medicine inventory tracking, and daily sales reporting."
            ],
      stack: [
        "React / Vite",
        "Next.js",
        "Go Fiber",
        "GORM",
        "PostgreSQL",
        "RBAC",
        "POS System",
        "PRD & System Design"
      ]
    },
    {
      id: "tabeldata-fullstack",
      role:
        language === "id"
          ? "Full Stack Developer (Kontrak)"
          : "Full Stack Developer (Contract)",
      org: "PT Tabel Data Informatika",
      location: "Bandung, Indonesia",
      period: language === "id" ? "Okt 2025 — Nov 2026" : "Oct 2025 — Nov 2026",
      badge: language === "id" ? "Kontrak · Selesai" : "Contract · Ended",
      badgeVariant: "accent",
      logo: "/assets/images/companies/tabel-data.png",
      summary:
        language === "id"
          ? "Mengembangkan modul inti keuangan secara end-to-end, menjaga stabilitas layanan transaksi enterprise di lingkungan produksi, serta mengoptimasi performa database dan rilis CI/CD."
          : "Engineered core financial modules end-to-end, hardened production enterprise transaction services, and tuned SQL pooling and GitLab CI/CD pipelines.",
      points:
        language === "id"
          ? [
              "Membangun 1 modul inti keuangan secara end-to-end memakai React JS (runtime Bun) di frontend dan Golang berarsitektur Hexagonal di backend, serta menangani technical support & perbaikan bug di 3 aplikasi enterprise (Java Spring Boot, Golang, Angular).",
              "Menyelesaikan bug kritis dan inkonsistensi data pada layanan transaksi keuangan Java Spring Boot, menghilangkan anomali kalkulasi dan menekan bug produksi hingga 80%.",
              "Mengoptimasi query SQL kompleks dan konfigurasi connection pool pada PostgreSQL dan Oracle guna mencegah pool exhaustion serta menurunkan insiden database timeout hingga 40%.",
              "Menjalankan pengujian menyeluruh, validasi API menggunakan Postman, serta verifikasi environment di pipeline GitLab CI/CD pada Docker & Kubernetes untuk memastikan 100% keberhasilan rilis produksi."
            ]
          : [
              "Built 1 core financial module end-to-end using React JS (Bun runtime) on the frontend and Golang Hexagonal Architecture on the backend, while supporting and bug-fixing 3 enterprise apps (Java Spring Boot, Golang, Angular).",
              "Resolved critical defects and data inconsistencies across Java Spring Boot financial transaction services, eliminating calculation anomalies and reducing production bugs by up to 80%.",
              "Optimized complex SQL queries and connection pool settings in PostgreSQL and Oracle, preventing connection pool exhaustion and cutting database timeouts by up to 40%.",
              "Executed end-to-end testing, Postman API validation, and environment checks inside GitLab CI/CD pipelines on Docker and Kubernetes for 100% release success."
            ],
      stack: [
        "Java",
        "Spring Boot",
        "Angular",
        "React JS",
        "Golang",
        "Bun",
        "Jasper",
        "PostgreSQL",
        "Oracle",
        "MinIO",
        "Docker",
        "Kubernetes",
        "GitLab CI/CD",
        "Postman",
        "Antigravity",
        "Codex"
      ]
    },
    {
      id: "tabeldata-mobile-intern",
      role:
        language === "id"
          ? "Mobile Developer (Intern)"
          : "Mobile Developer (Internship)",
      org: "PT Tabel Data Informatika",
      location: "Bandung, Indonesia",
      period: language === "id" ? "Agu 2024 — Jun 2025" : "Aug 2024 — Jun 2025",
      badge: language === "id" ? "Magang / Intern" : "Internship",
      badgeVariant: "cyan",
      logo: "/assets/images/companies/tabel-data.png",
      summary:
        language === "id"
          ? "Mengembangkan, memelihara, dan merilis aplikasi mobile lintas platform Android & iOS berbasis Flutter dengan fokus pada performa, state management modular, dan kompatibilitas versi."
          : "Built, maintained, and deployed cross-platform Flutter mobile applications for Android and iOS with modular state management and multi-version framework migrations.",
      points:
        language === "id"
          ? [
              "Mengembangkan dan memelihara 6 aplikasi mobile Flutter untuk Android dan iOS dengan fokus pada performa dan pengalaman pengguna.",
              "Menyelesaikan 2 hingga 7 sprint task per minggu secara konsisten sesuai target pengembangan sprint proyek.",
              "Mengelola 85% proses deployment aplikasi mobile ke Google Play Store dan Apple App Store sekaligus mendokumentasikan changelog tiap pembaruan versi.",
              "Menerapkan state management BLoC, Cubit, dan Provider agar codebase modular, terstruktur, dan mudah dirawat.",
              "Melakukan refactoring aplikasi Flutter dari versi 2.8.1 → 3.29.0 dan 3.0.5 → 3.27.0 untuk meningkatkan performa dan kompatibilitas SDK terbaru."
            ]
          : [
              "Developed and maintained 6 cross-platform Flutter applications for Android and iOS focused on responsiveness and user experience.",
              "Completed 2 to 7 sprint tasks per week aligned with sprint delivery schedules.",
              "Handled 85% of production deployments to Google Play Store and Apple App Store while documenting version changelogs.",
              "Architected modular state management using BLoC, Cubit, and Provider.",
              "Refactored Flutter codebases from v2.8.1 → v3.29.0 and v3.0.5 → v3.27.0 for framework compatibility and performance gains."
            ],
      stack: [
        "Dart",
        "Flutter",
        "Kotlin Multiplatform",
        "SwiftUI",
        "PostgreSQL",
        "BLoC / Cubit / Provider",
        "Figma",
        "GitLab",
        "Google Play Console",
        "App Store Connect"
      ]
    }
  ];

  const organizationItems: OrganizationEntry[] = [
    {
      id: "pmk-tass",
      num: "01",
      role: language === "id" ? "Ketua PMK TASS" : "Chairman of PMK TASS",
      org: "PMK TASS · Telkom University",
      period: language === "id" ? "Masa Studi D3 (2022–2025)" : "University Tenure (2022–2025)",
      badge: language === "id" ? "Kepemimpinan" : "Leadership",
      badgeVariant: "amber",
      icon: "users",
      summary:
        language === "id"
          ? "Memimpin organisasi kemahasiswaan Persekutuan Mahasiswa Kristen Fakultas Ilmu Terapan (PMK TASS) dalam merancang program kerja dan membangun keterlibatan anggota."
          : "Led the Christian Student Fellowship of School of Applied Science (PMK TASS) in strategic programming and community growth.",
      points:
        language === "id"
          ? [
              "Berhasil meningkatkan partisipasi anggota sebesar +70% melalui program pembinaan dan inisiatif kegiatan yang lebih interaktif.",
              "Mengoordinasikan tim kepengurusan lintas divisi untuk kelancaran acara rutin, kaderisasi, dan kolaborasi kampus."
            ]
          : [
              "Grew active member participation by 70% through engaging programs and community-first initiatives.",
              "Coordinated multi-division student committees for recurring events, mentoring, and campus collaboration."
            ]
    },
    {
      id: "senior-resident",
      num: "02",
      role: "Senior Resident",
      org:
        language === "id"
          ? "Asrama Telkom University"
          : "Telkom University Dormitory",
      period: language === "id" ? "Masa Studi D3 (2022–2025)" : "University Tenure (2022–2025)",
      badge: language === "id" ? "Pembinaan Asrama" : "Dormitory Leadership",
      badgeVariant: "violet",
      icon: "dorm",
      summary:
        language === "id"
          ? "Bertugas mengelola administrasi harian asrama mahasiswa sekaligus membimbing kehidupan berkomunitas bagi mahasiswa baru tingkat pertama."
          : "Managed dormitory administrative operations while serving as a senior mentor supporting incoming first-year residents.",
      points:
        language === "id"
          ? [
              "Mengelola administrasi asrama, pelaporan penghuni, dan ketertiban lingkungan tempat tinggal mahasiswa secara terstruktur.",
              "Menjadi senior pendamping yang membantu mahasiswa baru beradaptasi dengan kehidupan akademik dan sosial di asrama."
            ]
          : [
              "Managed dormitory administration, resident coordination, and operational compliance cleanly.",
              "Mentored incoming students in adapting smoothly to campus life and residential community standards."
            ]
    },
    {
      id: "practicum-assistant",
      num: "03",
      role:
        language === "id"
          ? "Asisten Praktikum Pemrograman Web"
          : "Web Programming Practicum Assistant",
      org:
        language === "id"
          ? "Fakultas Ilmu Terapan · Telkom University"
          : "School of Applied Science · Telkom University",
      period: language === "id" ? "Masa Studi D3 (2022–2025)" : "University Tenure (2022–2025)",
      badge: language === "id" ? "Asisten Lab" : "Lab Assistant",
      badgeVariant: "cyan",
      icon: "code",
      summary:
        language === "id"
          ? "Mendampingi dosen dan mahasiswa selama sesi laboratorium pemrograman berbasis web melalui bimbingan praktik langsung."
          : "Supported faculty and students during laboratory sessions for web-based application development.",
      points:
        language === "id"
          ? [
              "Membimbing mahasiswa memahami fundamental pengembangan web, debugging kode, dan penyelesaian studi kasus praktikum.",
              "Membantu kelancaran pelaksanaan modul lab serta evaluasi tugas praktikum mahasiswa."
            ]
          : [
              "Mentored students in core web development concepts, live debugging, and hands-on lab exercises.",
              "Supported laboratory module facilitation and practical assignment assessments."
            ]
    }
  ];

  const educationHighlights =
    language === "id"
      ? [
          {
            title: "Top 150 Innovillage (Vegetara)",
            desc: "Diakui atas pengembangan platform sistem informasi & marketplace hasil tani Kampung Enam, Tarakan dengan dampak sosial positif."
          },
          {
            title: "Penerima Pendanaan P2MD",
            desc: "Meraih pendanaan Program Pemberdayaan Masyarakat Desa untuk mendukung implementasi inovasi digital bagi komunitas."
          },
          {
            title: "Tugas Akhir Flutter Mobile",
            desc: "Mengembangkan aplikasi Hasjrat Yamaha berbasis Flutter & Dart untuk digitalisasi laporan kegiatan Sales Business Development Unit."
          },
          {
            title: "Kepemimpinan & Asisten Lab",
            desc: "Menjabat Ketua PMK TASS (+70% partisipasi anggota), Senior Resident Asrama, serta Asisten Praktikum Pemrograman Berbasis Web."
          }
        ]
      : [
          {
            title: "Top 150 Innovillage (Vegetara)",
            desc: "Recognized for building a digital harvest monitoring & marketplace platform empowering vegetable farmers in Kampung Enam, Tarakan."
          },
          {
            title: "P2MD Funding Awardee",
            desc: "Awarded national community empowerment funding supporting technology-driven social innovation projects."
          },
          {
            title: "Flutter Mobile Final Project",
            desc: "Built the Hasjrat Yamaha Flutter & Dart app to digitalize Sales Business Development Unit field activity reporting."
          },
          {
            title: "Leadership & Lab Assistant",
            desc: "Served as Chairman of PMK TASS (+70% participation growth), Dormitory Senior Resident, and Web Programming Practicum Assistant."
          }
        ];

  const oracleSkills = [
    "Core Java",
    "Object-Oriented Programming (OOP)",
    "Data Structures",
    "Exception Handling",
    "Enterprise Foundations"
  ];

  const renderOrgIcon = (kind: OrganizationEntry["icon"]) => {
    if (kind === "users") return <Users className="h-4 w-4" />;
    if (kind === "dorm") return <Building2 className="h-4 w-4" />;
    return <Code2 className="h-4 w-4" />;
  };

  return (
    <section id="profile" className="space-y-12 scroll-mt-28">
      <SectionHeader
        index="03"
        eyebrow={language === "id" ? "Profil & Rekam Jejak" : "Profile & Dossier"}
        title={language === "id" ? "Tentang, Karier &" : "About, Career &"}
        titleItalic={language === "id" ? "Keahlian" : "Capabilities"}
        subtitle={
          language === "id"
            ? "Ringkasan profil, ekosistem teknologi, pemisahan detail karier, organisasi, pendidikan, sertifikasi, dan pratinjau CV."
            : "Overview of background, tooling ecosystem, and separated records for career, organizations, education, certifications, and resume."
        }
      />

      {/* Row 1: Editorial Profile Bio (5 cols) + Categorized Brand Stack (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <SpotlightCard className="lg:col-span-5 p-6 sm:p-7">
          <div className="flex flex-col justify-between gap-6 h-full text-left">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-elevated)]">
                <Image
                  src="/assets/images/profile/profile.jpg"
                  alt="Yosua Reynaldi Manurun"
                  fill
                  sizes="80px"
                  className="object-cover object-[center_20%]"
                />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-[var(--foreground)] leading-tight">
                  Yosua Reynaldi Manurun
                </h3>
                <p className="font-mono text-[11px] font-medium uppercase tracking-wider text-[var(--accent-text)] mt-1">
                  Fullstack Software Engineer
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-[var(--muted-foreground)]">
              {language === "id"
                ? "Berpengalaman lebih dari 2 tahun membangun sistem enterprise (Angular, Java Spring Boot, Golang, Oracle, RabbitMQ) sekaligus membantu UMKM meluncurkan Company Profile, Toko Online, Kasir POS, sistem tiketing, dan otomatisasi AI."
                : "Over 2 years of experience engineering enterprise systems (Angular, Java Spring Boot, Golang, Oracle, RabbitMQ) while helping SMEs launch Company Profiles, Online Stores, POS apps, ticketing platforms, and AI workflows."}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <Badge variant="muted">
                <MapPin className="h-3 w-3 text-[var(--accent-text)]" />
                Bandung, ID
              </Badge>
              <Badge variant="outline">
                <Briefcase className="h-3 w-3" />
                {language === "id" ? "2+ Thn Pengalaman" : "2+ Yr Exp"}
              </Badge>
              <Badge variant="emerald">
                {language === "id"
                  ? "Freelance · Siap Kerja Tetap"
                  : "Freelance · Open Full-Time"}
              </Badge>
            </div>
          </div>
        </SpotlightCard>

        <SpotlightCard className="lg:col-span-7 p-4 sm:p-7">
          <div className="flex flex-col justify-between gap-4 h-full text-left">
            <Tabs defaultValue="frontend" className="w-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--accent-text)]">
                    {language === "id" ? "Teknologi & Ekosistem AI" : "Tech Stack & AI Ecosystem"}
                  </span>
                  <h3 className="text-base sm:text-lg font-semibold tracking-tight text-[var(--foreground)] mt-0.5">
                    {language === "id" ? "Keahlian & Perangkat Utama" : "Core Stack & Tooling"}
                  </h3>
                </div>
                <TabsList className="grid grid-cols-2 sm:inline-flex w-full sm:w-auto">
                  {skillCategories.map((cat) => (
                    <TabsTrigger key={cat.id} value={cat.id} className="px-3 py-1 text-[10px]">
                      {cat.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {skillCategories.map((cat) => (
                <TabsContent key={cat.id} value={cat.id} className="mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {cat.items.map((skill) => {
                      const meta = getTechBrandMeta(skill.name);
                      return (
                        <div
                          key={skill.name}
                          className="group/tile flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-2.5 transition-colors duration-200 hover:border-[var(--border-strong)]"
                        >
                          <div
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] transition-transform duration-200 group-hover/tile:scale-105"
                            style={{
                              backgroundColor: meta.tintBg,
                              color: meta.color
                            }}
                          >
                            {meta.renderIcon("h-4 w-4")}
                          </div>
                          <div className="min-w-0">
                            <span className="block truncate text-xs font-semibold text-[var(--foreground)]">
                              {skill.name}
                            </span>
                            <span className="block truncate font-mono text-[10px] text-[var(--muted-foreground)]">
                              {skill.role}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </SpotlightCard>
      </div>

      {/* Row 2: Open Editorial Dossier (Career / Organizations / Education / Certifications) */}
      <div className="space-y-2 text-left">
        <Tabs defaultValue="career" className="w-full">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 pb-6">
            <div>
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--accent-text)]">
                {language === "id" ? "Rekam Jejak Terpisah" : "Separated Track Record"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[var(--foreground)] mt-1">
                {language === "id" ? (
                  <>
                    Karier, Organisasi,{" "}
                    <span className="font-editorial italic font-normal text-[var(--accent-text)]">
                      Pendidikan &amp; Sertifikasi
                    </span>
                  </>
                ) : (
                  <>
                    Career, Organizations,{" "}
                    <span className="font-editorial italic font-normal text-[var(--accent-text)]">
                      Education &amp; Certifications
                    </span>
                  </>
                )}
              </h3>
            </div>

            <TabsList className="grid grid-cols-2 sm:inline-flex w-full lg:w-auto justify-start">
              <TabsTrigger value="career" className="px-3 sm:px-3.5 py-1.5 text-[10px]">
                <Briefcase className="h-3.5 w-3.5" />
                {language === "id" ? "Karier (3)" : "Career (3)"}
              </TabsTrigger>
              <TabsTrigger value="organizations" className="px-3 sm:px-3.5 py-1.5 text-[10px]">
                <Users className="h-3.5 w-3.5" />
                {language === "id" ? "Organisasi (3)" : "Organizations (3)"}
              </TabsTrigger>
              <TabsTrigger value="education" className="px-3 sm:px-3.5 py-1.5 text-[10px]">
                <GraduationCap className="h-3.5 w-3.5" />
                {language === "id" ? "Pendidikan (1)" : "Education (1)"}
              </TabsTrigger>
              <TabsTrigger value="certifications" className="px-3 sm:px-3.5 py-1.5 text-[10px]">
                <Award className="h-3.5 w-3.5" />
                {language === "id" ? "Sertifikasi (1)" : "Certifications (1)"}
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab 1: Swiss Two-Column Hairline Timeline for Career */}
          <TabsContent value="career" className="mt-0">
            <div className="border-t border-[var(--border)] divide-y divide-[var(--border)]">
              {careerItems.map((job) => (
                <div
                  key={job.id}
                  className="grid grid-cols-1 lg:grid-cols-[270px_1fr] gap-4 lg:gap-6 py-6 sm:py-8 transition-colors hover:bg-[var(--surface)]/45 px-0 sm:px-3 mx-0 sm:-mx-3 rounded-xl"
                >
                  {/* Left Architectural Rail (Compact horizontal bar on mobile/tablet, vertical rail on desktop) */}
                  <div className="flex flex-wrap lg:flex-col items-center lg:items-start justify-between lg:justify-start gap-3">
                    <div className="flex items-center gap-3">
                      {job.logo ? (
                        <div
                          className={`relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border ${
                            job.logoStyle === "dark-cover"
                              ? "border-[var(--border-strong)] bg-black"
                              : "border-[var(--border)] bg-white p-1.5"
                          }`}
                        >
                          <Image
                            src={job.logo}
                            alt={job.org}
                            width={44}
                            height={44}
                            className={`h-full w-full ${
                              job.logoStyle === "dark-cover" ? "object-cover" : "object-contain"
                            }`}
                          />
                        </div>
                      ) : (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--accent-text)]">
                          <Briefcase className="h-5 w-5" />
                        </div>
                      )}
                      <Badge variant={job.badgeVariant} className="text-[9px]">
                        {job.badge}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap lg:flex-col items-center lg:items-start gap-x-4 gap-y-1 font-mono text-[11px] text-[var(--muted-foreground)]">
                      <p className="inline-flex items-center gap-1.5 text-[var(--foreground)] font-medium">
                        <Calendar className="h-3.5 w-3.5 text-[var(--accent-text)] shrink-0" />
                        {job.period}
                      </p>
                      <p className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        {job.location}
                      </p>
                    </div>
                  </div>

                  {/* Right Editorial Body */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl sm:text-2xl font-semibold tracking-[-0.02em] text-[var(--foreground)]">
                        {job.role}
                      </h4>
                      <p className="font-mono text-xs font-medium uppercase tracking-wider text-[var(--accent-text)] mt-1">
                        {job.org}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm leading-relaxed text-[var(--foreground)]/85 max-w-3xl">
                      {job.summary}
                    </p>

                    <ul className="space-y-2.5 max-w-3xl">
                      {job.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-[var(--muted-foreground)]"
                        >
                          <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-[var(--accent-text)]" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {job.stack.map((tech) => (
                        <Badge key={tech} variant="muted" className="text-[10px]">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Tab 2: 3-Column Editorial Hairline Ledger for Organizations */}
          <TabsContent value="organizations" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 border-y border-[var(--border)] lg:divide-x divide-y lg:divide-y-0 divide-[var(--border)]">
              {organizationItems.map((org) => (
                <div
                  key={org.id}
                  className="group flex flex-col justify-between gap-5 py-6 lg:py-7 lg:px-6 first:lg:pl-0 last:lg:pr-0"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="font-editorial italic text-3xl leading-none text-[var(--muted-foreground)]/50 group-hover:text-[var(--accent-text)] transition-colors">
                          {org.num}
                        </span>
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--foreground)]">
                          {renderOrgIcon(org.icon)}
                        </div>
                      </div>
                      <Badge variant={org.badgeVariant} className="text-[9px]">
                        {org.badge}
                      </Badge>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
                        {org.role}
                      </h4>
                      <p className="font-mono text-[11px] font-medium uppercase tracking-wider text-[var(--accent-text)] mt-1">
                        {org.org}
                      </p>
                      <p className="inline-flex items-center gap-1 font-mono text-[11px] text-[var(--muted-foreground)] mt-1">
                        <Calendar className="h-3 w-3" />
                        {org.period}
                      </p>
                    </div>

                    <p className="text-xs leading-relaxed text-[var(--foreground)]/85">
                      {org.summary}
                    </p>

                    <ul className="space-y-2 pt-2 border-t border-[var(--border)]">
                      {org.points.map((pt) => (
                        <li
                          key={pt}
                          className="flex items-start gap-2 text-xs leading-relaxed text-[var(--muted-foreground)]"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5 text-[var(--accent-text)]" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Tab 3: Swiss Academic Spread for Education */}
          <TabsContent value="education" className="mt-0">
            <div className="border-y border-[var(--border)] py-8 grid grid-cols-1 lg:grid-cols-[270px_1fr] gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-[var(--border)] bg-white p-1.5">
                    <Image
                      src="/assets/images/companies/telkom-university.png"
                      alt="Telkom University"
                      width={40}
                      height={40}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <Badge variant="violet" className="text-[10px]">
                    {language === "id" ? "IPK 3.87 / 4.00" : "GPA 3.87 / 4.00"}
                  </Badge>
                </div>

                <div className="space-y-1 font-mono text-[11px] text-[var(--muted-foreground)]">
                  <p className="inline-flex items-center gap-1.5 text-[var(--foreground)] font-medium">
                    <Calendar className="h-3.5 w-3.5 text-[var(--accent-text)] shrink-0" />
                    Sep 2022 — Jul 2025
                  </p>
                  <p className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    Bandung, Indonesia
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <h4 className="text-xl sm:text-2xl font-semibold tracking-[-0.02em] text-[var(--foreground)]">
                    {language === "id"
                      ? "D3 Rekayasa Perangkat Lunak Aplikasi"
                      : "Diploma in D3 Application Software Engineering"}
                  </h4>
                  <p className="font-mono text-xs font-medium uppercase tracking-wider text-[var(--accent-text)] mt-1">
                    Telkom University · Fakultas Ilmu Terapan
                  </p>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed text-[var(--foreground)]/85 max-w-3xl">
                  {language === "id"
                    ? "Menyelesaikan studi rekayasa perangkat lunak aplikasi dengan fokus terapan pada pengembangan aplikasi web & mobile, basis data, rekayasa sistem, serta kontribusi aktif dalam kompetisi inovasi sosial dan kepemimpinan mahasiswa."
                    : "Completed applied software engineering studies focused on web & mobile development, relational databases, system architecture, social innovation competitions, and student leadership."}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 border border-[var(--border)] rounded-xl overflow-hidden divide-y sm:divide-y-0 divide-[var(--border)] bg-[var(--surface)]">
                  {educationHighlights.map((hl, idx) => (
                    <div
                      key={hl.title}
                      className={`p-4 space-y-1.5 ${
                        idx >= 2 ? "sm:border-t sm:border-[var(--border)]" : ""
                      } ${idx % 2 === 1 ? "sm:border-l sm:border-[var(--border)]" : ""}`}
                    >
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-[var(--accent-text)] shrink-0" />
                        <h5 className="text-xs sm:text-sm font-semibold text-[var(--foreground)]">
                          {hl.title}
                        </h5>
                      </div>
                      <p className="text-xs leading-relaxed text-[var(--muted-foreground)]">
                        {hl.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tab 4: Clean Credential Row for Certifications */}
          <TabsContent value="certifications" className="mt-0">
            <div className="border-y border-[var(--border)] py-8 grid grid-cols-1 lg:grid-cols-[270px_1fr] gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-white p-1.5 text-[#F80000]">
                    {getTechBrandMeta("Oracle").renderIcon("h-7 w-7")}
                  </div>
                  <Badge variant="amber" className="text-[10px]">
                    {language === "id" ? "Sertifikasi Profesional" : "Professional Certification"}
                  </Badge>
                </div>

                <div className="space-y-1 font-mono text-[11px] text-[var(--muted-foreground)]">
                  <p className="inline-flex items-center gap-1.5 text-[var(--foreground)] font-medium">
                    <Calendar className="h-3.5 w-3.5 text-[var(--accent-text)] shrink-0" />
                    Mar 2023 — Jun 2023
                  </p>
                  <p className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    Bandung, Indonesia
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xl sm:text-2xl font-semibold tracking-[-0.02em] text-[var(--foreground)]">
                    Certificate in Java Programming
                  </h4>
                  <p className="font-mono text-xs font-medium uppercase tracking-wider text-[var(--accent-text)] mt-1">
                    Oracle Corporation
                  </p>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed text-[var(--foreground)]/85 max-w-3xl">
                  {language === "id"
                    ? "Menuntaskan program sertifikasi pemrograman Java resmi dari Oracle sebagai fondasi pengembangan backend Java Spring Boot dan sistem bisnis berskala enterprise."
                    : "Completed Oracle's official Java Programming certification program establishing strong backend fundamentals for Java Spring Boot enterprise engineering."}
                </p>

                <ul className="space-y-2 max-w-3xl">
                  <li className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--muted-foreground)]">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-[var(--accent-text)]" />
                    <span>
                      {language === "id"
                        ? "Menguasai inti bahasa Java, prinsip Object-Oriented Programming (OOP), struktur data, dan exception handling untuk aplikasi skala enterprise."
                        : "Mastered core Java programming, Object-Oriented Programming (OOP) principles, data structures, and exception handling for enterprise application development."}
                    </span>
                  </li>
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {oracleSkills.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-[10px]">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Row 3: Minimalist Horizontal Curriculum Vitae Strip */}
      <div className="border-y border-[var(--border)] py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-left">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--accent-text)]">
            <FileText className="h-4 w-4" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm sm:text-base font-semibold tracking-tight text-[var(--foreground)]">
                Curriculum Vitae — Yosua Reynaldi M.
              </h3>
              <Badge variant="outline">PDF</Badge>
            </div>
            <p className="text-xs text-[var(--muted-foreground)] mt-0.5 leading-relaxed">
              {language === "id"
                ? "Ringkasan lengkap pengalaman kerja, organisasi, pendidikan, dan proyek dalam format siap cetak."
                : "Printable PDF summary of engineering work history, leadership, education, and software projects."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 w-full sm:w-auto shrink-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="accent" size="md" className="w-full sm:w-auto">
                <Eye className="h-4 w-4" />
                {language === "id" ? "Pratinjau CV" : "Preview CV"}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader className="border-b border-[var(--border)] p-4 sm:p-5 pr-12 sm:pr-14">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <DialogTitle className="text-base sm:text-lg">
                      Curriculum Vitae — Yosua Reynaldi M.
                    </DialogTitle>
                    <DialogDescription className="text-xs">
                      Yosua Reynaldi Manurun-resume.pdf
                    </DialogDescription>
                  </div>
                  <Button variant="outline" size="sm" className="w-fit" asChild>
                    <a
                      href="/assets/documents/cv/Yosua Reynaldi Manurun-resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {language === "id" ? "Buka Tab Baru" : "New Tab"}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                </div>
              </DialogHeader>
              <div className="h-[65vh] sm:h-[75vh] w-full bg-white">
                <iframe
                  src="/assets/documents/cv/Yosua Reynaldi Manurun-resume.pdf#toolbar=0&navpanes=0&scrollbar=1"
                  className="h-full w-full border-none"
                  title="Yosua Reynaldi Manurun Resume"
                />
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline" size="md" className="w-full sm:w-auto" asChild>
            <a
              href="/assets/documents/cv/Yosua Reynaldi Manurun-resume.pdf"
              download="Yosua Reynaldi Manurun-resume.pdf"
            >
              <Download className="h-4 w-4" />
              {language === "id" ? "Unduh PDF" : "Download PDF"}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
