"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Play, Layers, CheckCircle2, ArrowUpRight, Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { useRef, useState, type FocusEvent, type RefObject } from "react";
import SectionHeader from "./SectionHeader";
import { useLanguage, type Language } from "@/context/LanguageContext";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TechIcon } from "@/components/ui/tech-icon";

export interface ProjectScreen {
  title: string;
  caption: string;
  image?: string;
  aspectRatio?: string;
  moduleTag?: string;
}

export interface ProjectStackGroups {
  frontend: string[];
  backend: string[];
  infra: string[];
}

export interface ProjectData {
  id: string;
  title: string;
  filterGroup: "saas" | "platform" | "enterprise";
  category: string;
  role: string;
  headline: string;
  description: string;
  problem: string;
  contribution: string;
  impact: string;
  image?: string;
  video?: string;
  hasVideoFile?: boolean;
  techStack: string[];
  stackGroups: ProjectStackGroups;
  highlights: string[];
  link?: string;
  githubLink?: string;
  previewTone: string;
  screens: ProjectScreen[];
}

interface BilingualText {
  id: string;
  en: string;
}

interface BilingualScreen {
  title: BilingualText;
  caption: BilingualText;
  image?: string;
  aspectRatio?: string;
  moduleTag?: string;
}

interface RawProjectData {
  id: string;
  title: string;
  filterGroup: "saas" | "platform" | "enterprise";
  category: BilingualText;
  role: BilingualText;
  headline: BilingualText;
  description: BilingualText;
  problem: BilingualText;
  contribution: BilingualText;
  impact: BilingualText;
  image?: string;
  video?: string;
  hasVideoFile?: boolean;
  techStack: string[];
  stackGroups: ProjectStackGroups;
  highlights: { id: string[]; en: string[] };
  link?: string;
  githubLink?: string;
  previewTone: string;
  screens: BilingualScreen[];
}

const laporKosScreens: BilingualScreen[] = [
  {
    title: { id: "Portal Login & Otorisasi", en: "Login & Authorization Portal" },
    caption: {
      id: "Akses masuk multi-peran pemilik, staf properti, dan penghuni dengan verifikasi OTP.",
      en: "Multi-role sign-in for owners, property staff, and tenants with OTP verification."
    },
    image: "/assets/projects/lapor-kos/screenshots/00-login.png",
    aspectRatio: "1920 / 901"
  },
  {
    title: { id: "Dashboard Multi-Properti", en: "Multi-Property Dashboard" },
    caption: {
      id: "Ringkasan okupansi kamar, tagihan bulanan, dan metrik SLA komplain secara real-time.",
      en: "Real-time overview of room occupancy, monthly billing, and complaint SLA metrics."
    },
    image: "/assets/projects/lapor-kos/screenshots/01-dashboard.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: { id: "Manajemen & Denah Kamar", en: "Room Inventory & Floorplan" },
    caption: {
      id: "Denah interaktif per lantai untuk kamar kosong, terisi, perbaikan, dan transfer kamar.",
      en: "Interactive floor visualizer tracking vacant, occupied, maintenance, and room transfers."
    },
    image: "/assets/projects/lapor-kos/screenshots/02-manajemen-kamar.png",
    aspectRatio: "1920 / 901"
  },
  {
    title: { id: "Penghuni, Kontrak & Checkout", en: "Tenants, Contracts & Checkout" },
    caption: {
      id: "Kelola profil penghuni, undangan onboarding, kontrak sewa, dan inspeksi checkout.",
      en: "Manage tenant profiles, onboarding invites, active leases, and checkout inspections."
    },
    image: "/assets/projects/lapor-kos/screenshots/03-penghuni-kontrak.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: { id: "Pembayaran Midtrans Snap & Manual", en: "Midtrans Snap & Manual Payments" },
    caption: {
      id: "Pelunasan instan VA, QRIS, E-Wallet via Midtrans atau validasi bukti transfer manual.",
      en: "Instant checkout via VA, QRIS, and E-Wallet with Midtrans or manual transfer validation."
    },
    image: "/assets/projects/lapor-kos/screenshots/04-manajemen-pembayaran.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: { id: "Laporan Operasional & Audit", en: "Operational Analytics & Audit" },
    caption: {
      id: "Rekap operasional hunian, pengeluaran properti, dan log audit aktivitas sistem.",
      en: "Operational summaries, property expenses, and system-wide audit trail records."
    },
    image: "/assets/projects/lapor-kos/screenshots/05-laporan.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: { id: "Peraturan Kos & Visitor Pass", en: "House Rules & Guest Permits" },
    caption: {
      id: "Tata tertib hunian digital serta persetujuan izin tamu dengan QR Visitor Pass.",
      en: "Digital house rules and guest/overnight permit approvals with tokenized Visitor Passes."
    },
    image: "/assets/projects/lapor-kos/screenshots/06-peraturan-kos.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: { id: "Kalender Jatuh Tempo", en: "Contract & Billing Calendar" },
    caption: {
      id: "Kalender FullCalendar untuk jatuh tempo pembayaran, kontrak, dan jadwal checkout.",
      en: "Interactive FullCalendar tracking rent due dates, contract renewals, and checkouts."
    },
    image: "/assets/projects/lapor-kos/screenshots/07-kalender.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: { id: "Triase Komplain Gemini AI", en: "Gemini AI Complaint Triage" },
    caption: {
      id: "Klasifikasi otomatis urgensi kerusakan fasilitas berbasis AI beserta SLA perbaikan.",
      en: "Automated facility issue urgency classification powered by Google Gemini AI."
    },
    image: "/assets/projects/lapor-kos/screenshots/08-komplain.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: { id: "Pengaturan Properti & WhatsApp", en: "Property & Notification Settings" },
    caption: {
      id: "Konfigurasi multi-properti, pengingat WhatsApp Fonnte, email SMTP, dan RBAC.",
      en: "Multi-property configuration, Fonnte WhatsApp alerts, SMTP email, and RBAC settings."
    },
    image: "/assets/projects/lapor-kos/screenshots/09-pengaturan.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: { id: "Form Input Tervalidasi Zod", en: "Zod-Validated Data Forms" },
    caption: {
      id: "Formulir kamar, kontrak, dan transaksi dengan validasi skema React Hook Form & Zod.",
      en: "Schema-validated forms for rooms, contracts, and billing using React Hook Form & Zod."
    },
    image: "/assets/projects/lapor-kos/screenshots/10-form.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: { id: "Laporan Keuangan & Kwitansi SHA-256", en: "Finance & SHA-256 PDF Receipts" },
    caption: {
      id: "Arus kas pemasukan/pengeluaran serta ekspor laporan & kwitansi PDF ber-hash SHA-256.",
      en: "Cashflow reconciliation with instant PDF exports and cryptographic SHA-256 receipts."
    },
    image: "/assets/projects/lapor-kos/screenshots/11-laporan-keuangan.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: { id: "Detail & Riwayat Penghuni", en: "Tenant Profile & History" },
    caption: {
      id: "Rincian profil penghuni, histori pindah kamar, kontrak, dan rekam pembayaran.",
      en: "Detailed tenant profile with room transfer history, contracts, and payment ledger."
    },
    image: "/assets/projects/lapor-kos/screenshots/12-detail-penghuni.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: { id: "Portal Mandiri Penghuni", en: "Tenant Self-Service Portal" },
    caption: {
      id: "Beranda penghuni untuk melihat detail kamar, izin tamu, dan tagihan aktif.",
      en: "Dedicated tenant home displaying room info, guest permits, and active invoices."
    },
    image: "/assets/projects/lapor-kos/screenshots/13-dashboard-penghuni.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: { id: "Komplain Fasilitas Penghuni", en: "Tenant Maintenance Tickets" },
    caption: {
      id: "Pelaporan kerusakan dengan unggahan foto ke Supabase Storage dan status progres.",
      en: "Facility ticket submission with Supabase photo upload and resolution tracking."
    },
    image: "/assets/projects/lapor-kos/screenshots/14-komplain-penghuni.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: { id: "Checkout Midtrans Snap Penghuni", en: "Tenant Midtrans Snap Checkout" },
    caption: {
      id: "Tagihan penghuni dengan popup Midtrans Snap, auto-sync status, dan cetak kwitansi.",
      en: "Tenant billing with Midtrans Snap checkout, real-time sync, and receipt printing."
    },
    image: "/assets/projects/lapor-kos/screenshots/15-tagihan-penghuni.png",
    aspectRatio: "1920 / 902"
  }
];

const flowakScreens: BilingualScreen[] = [
  {
    title: { id: "Portal Login & Sesi Aman", en: "Secure Auth & Session Portal" },
    caption: {
      id: "Autentikasi JWT dengan Argon2/Bcrypt dan pencabutan sesi via Redis Blacklist.",
      en: "JWT auth secured with Argon2/Bcrypt and Redis session blacklisting."
    },
    image: "/assets/projects/flowak/screenshots/01-login.png"
  },
  {
    title: { id: "Project Hub Multi-Tenant", en: "Multi-Tenant Project Hub" },
    caption: {
      id: "Pusat manajemen proyek kolaboratif dengan isolasi akses berbasis peran (RBAC).",
      en: "Collaborative workspace hub with multi-tenant role-based access control."
    },
    image: "/assets/projects/flowak/screenshots/02-landing-page.png"
  },
  {
    title: { id: "Kanvas Visual & API Runner", en: "Interactive Canvas & API Runner" },
    caption: {
      id: "Kanvas graf dengan deteksi siklus, AI flow generator, dan eksekutor cURL API.",
      en: "Interactive graph canvas with cycle detection, AI generation, and cURL API runner."
    },
    image: "/assets/projects/flowak/screenshots/03-kanvas.png"
  },
  {
    title: { id: "Matriks Traceability Fitur", en: "Feature Traceability Matrix" },
    caption: {
      id: "Pemetaan ketertelusuran dari node proses bisnis ke status pengerjaan lintas divisi.",
      en: "End-to-end traceability mapping business nodes to cross-functional delivery status."
    },
    image: "/assets/projects/flowak/screenshots/04-tabel-status.png"
  },
  {
    title: { id: "Inspector Node Multidisiplin", en: "Multi-Discipline Node Inspector" },
    caption: {
      id: "Spesifikasi terstruktur per node meliputi Bisnis/SLA, UI/UX, Frontend, dan Backend.",
      en: "Structured per-node specs covering Business/SLA, UI/UX, Frontend, and Backend."
    },
    image: "/assets/projects/flowak/screenshots/05-spesifikasi-dokumen.png"
  },
  {
    title: { id: "Kalender & Timeline Tim", en: "Team Calendar & Timeline" },
    caption: {
      id: "Penjadwalan tenggat modul dan sinkronisasi milestone tim pengembang.",
      en: "Module delivery scheduling and engineering milestone calendar."
    },
    image: "/assets/projects/flowak/screenshots/06-jadwal-tim.png"
  },
  {
    title: { id: "Analitik Delivery & Audit AI", en: "Delivery Analytics & AI Audit" },
    caption: {
      id: "Metrik velocity sprint dan deteksi bottleneck alur kerja berbasis Gemini AI.",
      en: "Sprint velocity metrics and Gemini AI workflow bottleneck detection."
    },
    image: "/assets/projects/flowak/screenshots/07-analitik.png"
  },
  {
    title: { id: "Real-Time SSE Kanban Board", en: "Real-Time SSE Kanban Board" },
    caption: {
      id: "Papan Kanban bervalidasi state-machine dengan siaran perubahan langsung via SSE.",
      en: "State-machine validated Kanban board with live updates broadcast over SSE."
    },
    image: "/assets/projects/flowak/screenshots/08-kanban.png"
  },
  {
    title: { id: "Anggota & Peran Teknis", en: "Team Members & Roles" },
    caption: {
      id: "Manajemen kolaborator lintas peran PM, UI/UX, Frontend, dan Backend.",
      en: "Collaborator management across PM, UI/UX, Frontend, and Backend roles."
    },
    image: "/assets/projects/flowak/screenshots/09-anggota-tim.png"
  }
];

const sionMinistryScreens: BilingualScreen[] = [
  {
    title: { id: "Landing Page & Portal RBAC", en: "Landing Page & RBAC Portal" },
    caption: {
      id: "Registrasi publik dengan alur persetujuan admin serta login Google OAuth2.",
      en: "Public registration with admin approval workflow and Google OAuth2 sign-in."
    },
    image: "/assets/projects/sion-ministry/screenshots/01-login.png"
  },
  {
    title: { id: "Dashboard & Peta Indonesia", en: "Dashboard & Indonesia Map" },
    caption: {
      id: "Peta interaktif persebaran pelayanan kota/kampus Indonesia beserta grafik Recharts.",
      en: "Interactive Indonesia ministry distribution map with real-time Recharts analytics."
    },
    image: "/assets/projects/sion-ministry/screenshots/02-dashboard.png"
  },
  {
    title: { id: "Data Jemaat, Wilayah & Kampus", en: "Members, Regions & Campuses" },
    caption: {
      id: "Pelacakan tahap pemuridan, relasi mentor-mentee, dan direktori kota/kampus.",
      en: "Discipleship stage tracking, mentor-mentee pairing, and regional directories."
    },
    image: "/assets/projects/sion-ministry/screenshots/03-data-jemaat.png"
  },
  {
    title: { id: "Jurnal PA & Modul Medium-Style", en: "PA Journals & Medium Modules" },
    caption: {
      id: "Jurnal Pendalaman Alkitab offline-first serta ruang baca Modul Belajar bergaya Medium.",
      en: "Offline-first PA journals and full-width Medium-style learning module reader."
    },
    image: "/assets/projects/sion-ministry/screenshots/04-jurnal-pa.png"
  },
  {
    title: { id: "Berita Acara & Storage S3", en: "Activity Reports & S3 Storage" },
    caption: {
      id: "Pelaporan kegiatan lapangan dengan kompresi gambar dan Supabase S3 Storage.",
      en: "Field activity reporting with client image compression and Supabase S3 storage."
    },
    image: "/assets/projects/sion-ministry/screenshots/05-berita-acara.png"
  },
  {
    title: { id: "Donasi & Crowdfunding Misi", en: "Mission Crowdfunding & Care" },
    caption: {
      id: "Pengelolaan kampanye donasi misi, pencatatan donatur, dan progres target.",
      en: "Mission fundraising campaign management, donor ledger, and goal tracking."
    },
    image: "/assets/projects/sion-ministry/screenshots/06-donasi-care.png"
  },
  {
    title: { id: "Sion Careers & Pelayanan", en: "Sion Careers & Opportunities" },
    caption: {
      id: "Papan informasi lowongan pelayanan lengkap dengan pengajuan lamaran.",
      en: "Ministry opportunities board with integrated applicant submissions."
    },
    image: "/assets/projects/sion-ministry/screenshots/07-sion-careers.png"
  },
  {
    title: { id: "Tautan Sumber & Audit Keamanan", en: "Resources & Security Audit" },
    caption: {
      id: "Direktori sumber daya, manajemen user, dan log audit keamanan sistem.",
      en: "Resource directory, user approval controls, and security audit trail."
    },
    image: "/assets/projects/sion-ministry/screenshots/08-tautan-sumber.png"
  }
];

const ministrySchedulingScreens: BilingualScreen[] = [
  {
    title: { id: "Denah Interaktif SVG Main Hall", en: "Interactive SVG Main Hall Floorplan" },
    caption: {
      id: "Pemilihan titik posisi Usher (Samping, Tengah, Balkon, Kolekte) langsung di denah SVG.",
      en: "Visual self-scheduling for Usher stations directly on an interactive SVG floorplan."
    },
    moduleTag: "SVG FLOORPLAN"
  },
  {
    title: { id: "Selector Gerbang Greeter & OM", en: "Greeter Gate & OM Selector" },
    caption: {
      id: "Penugasan posisi Greeter (Pintu Utama, Lobby, Selasar) dan Operational Manager (OM 1–4).",
      en: "Station selectors for Greeters (Main Entrance, Lobby, Corridor) and OM 1–4."
    },
    moduleTag: "STATION ENGINE"
  },
  {
    title: { id: "Tracker Kuota Pelayanan", en: "Monthly Service Quota Validator" },
    caption: {
      id: "Validasi aturan domain otomatis: maksimal 1 shift/hari dan 3 shift/bulan.",
      en: "Automated domain invariant enforcement: max 1 shift/day and 3 shifts/month."
    },
    moduleTag: "DOMAIN RULES"
  },
  {
    title: { id: "Peer-to-Peer Shift Swap", en: "Peer-to-Peer Shift Swap" },
    caption: {
      id: "Pengajuan tukar jadwal antar pelayan dengan notifikasi email Nodemailer otomatis.",
      en: "Peer-to-peer shift swap requests with automated Nodemailer email notifications."
    },
    moduleTag: "SHIFT SWAP"
  },
  {
    title: { id: "Dashboard Koordinator & Ekspor", en: "Coordinator Dashboard & Export" },
    caption: {
      id: "Pemantauan keterisian shift real-time, approval swap, dan ekspor CSV/Cetak.",
      en: "Real-time shift monitoring, swap approvals, and CSV/printable roster export."
    },
    moduleTag: "COORDINATOR HUB"
  },
  {
    title: { id: "Google OAuth2 SSO & Role Requests", en: "Google OAuth2 SSO & Role Management" },
    caption: {
      id: "Login cepat Google SSO dan manajemen permintaan role relawan.",
      en: "Seamless Google OAuth2 Single Sign-On and volunteer role upgrade management."
    },
    moduleTag: "GOOGLE SSO"
  }
];

const logiaLogScreens: BilingualScreen[] = [
  {
    title: { id: "MOD-01: Grafana Live Log Explorer", en: "MOD-01: Grafana Live Log Explorer" },
    caption: {
      id: "Streaming log real-time via SSE dengan query filter, severity tagging, & deduplikasi SHA-256.",
      en: "Real-time SSE log stream with query filtering, severity tags, and SHA-256 deduplication."
    },
    moduleTag: "MOD-01 OBSERVABILITY"
  },
  {
    title: { id: "MOD-02: Postman API Testing Studio", en: "MOD-02: Postman API Testing Studio" },
    caption: {
      id: "Pengujian HTTP/REST interaktif dengan Auth Selector dan HTTP Proxy Engine terintegrasi.",
      en: "Interactive HTTP/REST testing studio with Auth Selector and built-in Proxy Engine."
    },
    moduleTag: "MOD-02 API STUDIO"
  },
  {
    title: { id: "MOD-03/04: 7-Layer GitHub AI Audit", en: "MOD-03/04: 7-Layer GitHub AI Audit" },
    caption: {
      id: "Diagnosis 7-lapis yang mengkorelasikan stack trace, skema DDL DB, dan kode sumber GitHub.",
      en: "7-layer diagnosis correlating stack traces, target DB DDL schemas, and GitHub source."
    },
    moduleTag: "MOD-03/04 AI AUDIT"
  },
  {
    title: { id: "CFG: Target-Agnostic Profiles", en: "CFG: Target-Agnostic Profiles" },
    caption: {
      id: "Konfigurasi dinamis untuk menghubungkan server target, DB read-only, dan repositori GitHub.",
      en: "Dynamic profiles connecting external servers, read-only DB inspectors, and GitHub repos."
    },
    moduleTag: "CFG PROFILES"
  },
  {
    title: { id: "Java 25 Virtual Threads & RabbitMQ DLQ", en: "Java 25 Virtual Threads & RabbitMQ DLQ" },
    caption: {
      id: "Konkurensi tinggi Java 25 LTS, penahan lonjakan log RabbitMQ 4.x, & Upstash Redis TLS.",
      en: "Java 25 LTS concurrency backed by RabbitMQ 4.x DLX/DLQ and Upstash Redis TLS."
    },
    moduleTag: "VIRTUAL THREADS"
  },
  {
    title: { id: "60-30-10 Obsidian & Gold FSD UI", en: "60-30-10 Obsidian & Gold FSD UI" },
    caption: {
      id: "Antarmuka Feature-Sliced Design (FSD) presisi tinggi Obsidian Black & Royal Gold.",
      en: "High-contrast Feature-Sliced Design UI crafted with Obsidian Black & Royal Gold."
    },
    moduleTag: "FSD TACTICAL UI"
  }
];

const rawProjectsData: RawProjectData[] = [
  {
    id: "lapor-kos",
    title: "Lapor Kos",
    filterGroup: "saas",
    category: { id: "Bisnis & SaaS", en: "Business & SaaS" },
    role: { id: "Fullstack Developer", en: "Fullstack Developer" },
    headline: {
      id: "Manajemen Multi-Kos, Billing Midtrans & Triase Komplain AI",
      en: "Multi-Property Boarding SaaS, Midtrans Billing & AI Triage"
    },
    description: {
      id: "Catatan sewa di kertas, tagihan yang terus telat, dan bukti transfer yang menumpuk di chat. Lapor Kos mengubah kekacauan operasional kos menjadi mesin bisnis otomatis—dari pembayaran instan Midtrans hingga triase keluhan berbasis AI.",
      en: "Paper rent ledgers, overdue reminders, and transfer proofs buried in chat threads. Lapor Kos turns chaotic property management into an autonomous business engine—from instant Midtrans checkout to AI complaint triage."
    },
    problem: {
      id: "Pengelola kos kesulitan menangani pembukuan manual lintas properti, verifikasi transfer yang lambat, dan antrean komplain penghuni.",
      en: "Boarding operators struggled with manual multi-property bookkeeping, slow transfer checks, and untracked maintenance tickets."
    },
    contribution: {
      id: "Membangun backend Hexagonal Go 1.25 (Gin) & SPA React 19, integrasi Midtrans Snap + Webhook SHA-512, Redis 7, RabbitMQ 3.13, Fonnte WhatsApp, dan Gemini AI.",
      en: "Built the Go 1.25 Hexagonal backend & React 19 SPA, integrating Midtrans Snap + SHA-512 webhooks, Redis 7, RabbitMQ 3.13, Fonnte WhatsApp, and Gemini AI."
    },
    impact: {
      id: "Mengotomatisasi siklus tagihan hingga pelunasan real-time, mencegah pembayaran ganda, dan mempercepat penanganan fasilitas.",
      en: "Automated billing-to-settlement in real time, eliminated duplicate payments, and accelerated maintenance resolution."
    },
    image: "/assets/projects/lapor-kos/screenshots/01-dashboard.png",
    video: "/assets/projects/lapor-kos/videos/demo.mp4",
    hasVideoFile: true,
    techStack: [
      "React 19", "Go (Gin)", "Midtrans", "RabbitMQ", "Redis 7", "PostgreSQL 15+",
      "Supabase Storage", "Google Gemini AI", "Fonnte WhatsApp", "Vite 8", "TypeScript",
      "React Router v7", "Tailwind CSS v4", "FullCalendar", "Gofpdf", "Docker"
    ],
    stackGroups: {
      frontend: ["React 19", "Vite 8", "TypeScript", "React Router v7", "Tailwind CSS v4", "Zod & React Hook Form", "FullCalendar"],
      backend: ["Go 1.25 (Gin)", "Hexagonal Architecture", "pgx/v5", "JWT & Gomail (OTP)", "Gofpdf (SHA-256 Receipt)"],
      infra: ["PostgreSQL 15+ (Supabase)", "Supabase Storage", "Redis 7", "RabbitMQ 3.13", "Midtrans Snap & Core API", "Google Gemini AI", "Fonnte WhatsApp", "Docker Compose"]
    },
    highlights: {
      id: [
        "Dual Payment Flow Midtrans Snap (VA, QRIS, E-Wallet) + Webhook SHA-512",
        "Isolasi Multi-Properti, Transfer Kamar, Checkout & QR Visitor Pass",
        "Triase Komplain Gemini AI, Pengingat WhatsApp Fonnte & Kwitansi SHA-256"
      ],
      en: [
        "Dual Payment Flow via Midtrans Snap (VA, QRIS, E-Wallet) & SHA-512 Webhooks",
        "Multi-Property Isolation, Room Transfers, Checkout & QR Visitor Passes",
        "Gemini AI Complaint Triage, Fonnte WhatsApp Alerts & SHA-256 PDF Receipts"
      ]
    },
    link: "https://lapor-kos.vercel.app/",
    githubLink: "https://github.com/Yosua13/lapor-kos",
    previewTone: "from-emerald-500 via-teal-500 to-cyan-500",
    screens: laporKosScreens
  },
  {
    id: "flowak",
    title: "Flowak",
    filterGroup: "saas",
    category: { id: "Bisnis & SaaS", en: "Business & SaaS" },
    role: { id: "Product / Fullstack", en: "Product / Fullstack" },
    headline: {
      id: "Pemodelan Alur Bisnis, Spesifikasi Lintas Peran & API Runner",
      en: "Traceability-Native Workflow Modeler & API Contract Runner"
    },
    description: {
      id: "Saat diagram alur terpisah dari spesifikasi API dan papan tugas, proyek IT cepat kehilangan arah. Flowak menyatukan ide bisnis hingga uji cURL endpoint dalam satu kanvas hidup yang selalu sinkron lintas tim.",
      en: "When flowcharts drift apart from API specs and task boards, software projects lose momentum. Flowak fuses business logic, cross-role specs, and live cURL API testing into one synchronized command canvas."
    },
    problem: {
      id: "Tim engineering kehilangan ketertelusuran ketika diagram alur, dokumen SLA, kontrak API, dan Kanban terpisah di banyak aplikasi.",
      en: "Engineering teams lose traceability when flowcharts, SLA specs, API contracts, and Kanban boards live in disconnected tools."
    },
    contribution: {
      id: "Merancang arsitektur Go 1.26 (1 File = 1 Fungsi), RabbitMQ worker daemon + sync fallback, Redis Redlock, SSE hub, dan React 19 + Zustand 5.",
      en: "Architected the Go 1.26 (1 File = 1 Function) backend, RabbitMQ worker daemon, Redis Redlock, live SSE hub, and React 19 + Zustand 5 UI."
    },
    impact: {
      id: "Menyatukan analisis bisnis hingga eksekusi API tanpa konflik edit lewat optimistic locking dan validasi kontrak otomatis.",
      en: "Synchronized business design to API execution with optimistic locking and instant contract validation."
    },
    image: "/assets/projects/flowak/screenshots/02-landing-page.png",
    video: "/assets/projects/flowak/videos/demo.mp4",
    hasVideoFile: true,
    techStack: [
      "React 19", "Go (Gin)", "RabbitMQ", "Redis 9", "PostgreSQL", "TypeScript",
      "Vite 6", "Tailwind CSS v4", "Zustand 5", "TanStack Query v5", "SSE", "Google Gemini AI", "Docker"
    ],
    stackGroups: {
      frontend: ["React 19", "Vite 6", "TypeScript", "Tailwind CSS v4", "Zustand 5", "TanStack React Query v5", "Motion"],
      backend: ["Go 1.26 (Gin)", "Clean Arch (1 File = 1 Func)", "lib/pq", "JWT & Bcrypt", "Server-Sent Events (SSE)"],
      infra: ["PostgreSQL", "Redis 9 (Redlock & Cache)", "RabbitMQ (Worker Daemon)", "Google Gemini AI", "Docker"]
    },
    highlights: {
      id: [
        "Clean Architecture Go (1 File = 1 Fungsi) + Standalone RabbitMQ Worker",
        "Inspector Node Lintas Peran (Bisnis/SLA, UI/UX, FE, BE) & cURL API Runner",
        "Real-Time SSE Kanban Broadcast, Redis Redlock & Optimistic Versioning"
      ],
      en: [
        "Go Clean Architecture (1 File = 1 Function) + Standalone RabbitMQ Worker",
        "Multi-Discipline Node Inspector (Business, UI/UX, FE, BE) & cURL API Runner",
        "Real-Time SSE Kanban Broadcast, Redis Redlock & Optimistic Row Versioning"
      ]
    },
    githubLink: "https://github.com/Yosua13/flowak",
    previewTone: "from-indigo-500 via-sky-500 to-cyan-400",
    screens: flowakScreens
  },
  {
    id: "sion-ministry",
    title: "Sion Ministry v2",
    filterGroup: "platform",
    category: { id: "Komunitas & Sistem", en: "Platforms" },
    role: { id: "Fullstack Developer", en: "Fullstack Developer" },
    headline: {
      id: "Platform Pemuridan Offline-First, Modul Medium-Style & Peta Nasional",
      en: "Offline-First Discipleship LMS & Interactive Indonesia Map"
    },
    description: {
      id: "Jarak dan sinyal yang terputus di pelosok tak lagi menghentikan catatan pelayanan. Dirancang offline-first, Sion Ministry v2 menghubungkan pemuridan, modul baca bergaya Medium, dan peta pertumbuhan lintas kota di seluruh Indonesia.",
      en: "Remote terrain and dropped signals should never silence field ministry. Built offline-first, Sion Ministry v2 connects discipleship journals, Medium-style modules, and live nationwide analytics across Indonesia."
    },
    problem: {
      id: "Pekerja lapangan di daerah minim sinyal kesulitan melapor kegiatan secara real-time sekaligus membaca kurikulum secara nyaman.",
      en: "Remote field workers lacked reliable connectivity for reporting while needing a modern reading and analytics platform."
    },
    contribution: {
      id: "Mengembangkan Sync Engine offline-first React 19, Modul Belajar Medium-style, Peta Indonesia, dan backend Go Fiber v2 + Supabase S3 + Sentry.",
      en: "Engineered the React 19 offline-first sync engine, Medium-style LMS, Indonesia Map, and Go Fiber v2 backend with Supabase S3 & Sentry."
    },
    impact: {
      id: "Menjaga pelaporan lapangan tetap berjalan tanpa internet sekaligus memetakan pertumbuhan komunitas lintas kota & kampus.",
      en: "Enabled uninterrupted offline field reporting while providing centralized nationwide city and campus analytics."
    },
    image: "/assets/projects/sion-ministry/screenshots/02-dashboard.png",
    video: "/assets/projects/sion-ministry/videos/demo.mp4",
    hasVideoFile: true,
    techStack: [
      "React 19", "Go (Fiber v2)", "PostgreSQL 16", "Supabase S3", "Vite 6",
      "TypeScript", "Tailwind CSS v4", "Recharts 3", "Anime.js v4", "Google OAuth2",
      "Sentry", "Google Gemini AI", "Docker"
    ],
    stackGroups: {
      frontend: ["React 19", "Vite 6", "TypeScript", "Tailwind CSS v4", "Motion", "Anime.js v4", "Recharts 3", "Offline-First LocalStorage Sync"],
      backend: ["Go 1.25 (Fiber v2)", "GORM & Go Embed SQL", "3-Role RBAC & Audit Log", "Google OAuth2 (Sheets)", "SMTP Mailer"],
      infra: ["PostgreSQL 16", "Supabase Storage (AWS S3 SDK v2)", "Sentry Go", "Google Gemini AI", "Docker Compose"]
    },
    highlights: {
      id: [
        "Offline-First Sync Engine + Lazy Per-Route Fetching & Eliminasi N+1 Query",
        "Modul Belajar Full-Width Bergaya Medium (Authoring & Multi-Quote Parser)",
        "Peta Interaktif Persebaran Kota/Kampus Indonesia & Supabase S3 Storage"
      ],
      en: [
        "Offline-First Sync Engine + Lazy Per-Route Fetching & N+1 Query Removal",
        "Full-Width Medium-Style Learning Modules with Authoring Suite",
        "Interactive Indonesia City/Campus Map & Supabase S3 Object Storage"
      ]
    },
    link: "https://portal.sionministry.org/",
    githubLink: "https://github.com/Yosua13/sion-ministry",
    previewTone: "from-violet-500 via-fuchsia-500 to-amber-400",
    screens: sionMinistryScreens
  },
  {
    id: "ministry-scheduling",
    title: "Ministry Scheduling",
    filterGroup: "platform",
    category: { id: "Komunitas & Sistem", en: "Platforms" },
    role: { id: "Fullstack Developer", en: "Fullstack Developer" },
    headline: {
      id: "Self-Scheduling Denah Interaktif SVG & Pertukaran Jadwal Peer-to-Peer",
      en: "Interactive SVG Floorplan Self-Scheduling & Peer Shift Swaps"
    },
    description: {
      id: "Berhari-hari menyusun jadwal relawan lewat grup chat hanya untuk berakhir dengan bentrok dan posisi kosong di hari H. Kini pelayan cukup klik titik tugasnya di denah interaktif Main Hall—tervalidasi otomatis dan bebas tukar shift.",
      en: "Days lost juggling volunteer rosters in chat groups—only to face double-bookings and empty posts on Sunday. Now volunteers claim stations right on an interactive Main Hall floorplan with rule-checked P2P shift swaps."
    },
    problem: {
      id: "Penyusunan jadwal ratusan relawan secara manual lewat chat memakan waktu berhari-hari dan rawan bentrok serta posisi kosong.",
      en: "Manual chat-based volunteer scheduling took days every month and caused overlapping shifts and unstaffed stations."
    },
    contribution: {
      id: "Merancang Denah Interaktif SVG Main Hall di React 19 serta backend Clean Architecture NestJS 11 + Fastify, Prisma v6, Google SSO, & Nodemailer.",
      en: "Designed the interactive SVG floorplan in React 19 and built the Clean Architecture NestJS 11 + Fastify, Prisma v6, and Google SSO backend."
    },
    impact: {
      id: "Memangkas waktu koordinasi jadwal bulanan secara drastis dan menjamin seluruh titik tugas terisi sesuai batas kuota.",
      en: "Cut monthly scheduling overhead dramatically while enforcing shift quota limits and transparent swap approvals."
    },
    video: "/assets/projects/ministry-scheduling/videos/demo.mp4",
    hasVideoFile: false,
    techStack: [
      "React 19", "NestJS 11", "Fastify", "Prisma & PostgreSQL 16", "Vite 6",
      "TypeScript", "Tailwind CSS v4", "Google OAuth2", "Nodemailer", "Docker"
    ],
    stackGroups: {
      frontend: ["React 19", "Vite 6", "TypeScript", "Tailwind CSS v4", "Motion", "Canvas Confetti"],
      backend: ["NestJS 11 (Clean Arch)", "Fastify Adapter", "JWT & Google OAuth2 SSO", "Nodemailer (SMTP)", "Helmet & Throttler"],
      infra: ["PostgreSQL 16", "Prisma ORM v6", "Jest & Prettier", "Docker Compose"]
    },
    highlights: {
      id: [
        "Denah Visual Interaktif SVG Main Hall + Selector Greeter & OM 1–4",
        "Validasi Kuota Bulanan Otomatis & Peer-to-Peer Shift Swap via Email",
        "Backend NestJS 11 + Fastify Clean Architecture, Prisma & Ekspor CSV/Cetak"
      ],
      en: [
        "Interactive SVG Main Hall Floorplan + Greeter Gate & OM 1–4 Selectors",
        "Automated Monthly Quota Invariants & Peer-to-Peer Shift Swaps via Email",
        "NestJS 11 + Fastify Clean Architecture, Prisma ORM & CSV/Print Export"
      ]
    },
    githubLink: "https://github.com/Yosua13/ministry-schedule",
    previewTone: "from-cyan-500 via-blue-500 to-indigo-500",
    screens: ministrySchedulingScreens
  },
  {
    id: "logia-log",
    title: "Logia Log",
    filterGroup: "enterprise",
    category: { id: "Enterprise Tools", en: "Enterprise Tools" },
    role: { id: "Fullstack Developer", en: "Fullstack Developer" },
    headline: {
      id: "Observabilitas Real-Time, API Testing Studio & Diagnostik AI 7-Lapis",
      en: "Real-Time Observability, API Studio & 7-Layer GitHub AI Audit"
    },
    description: {
      id: "Tengah malam, server produksi jatuh dan jutaan baris log terus mengalir. Logia Log menyatukan observabilitas sekelas Grafana, studio uji API sekelas Postman, dan audit AI 7-lapis ke kode GitHub agar akar masalah ditemukan dalam hitungan detik.",
      en: "Midnight hits, production goes dark, and raw logs flood the screen. Logia Log unites Grafana-grade live streams, a Postman-style API studio, and 7-layer GitHub AI diagnostics to expose root causes in seconds."
    },
    problem: {
      id: "Engineer membuang waktu berpindah antar alat log, klien API, skema database, dan repo GitHub saat menyelidiki insiden produksi.",
      en: "Engineers waste critical incident response time jumping across log dashboards, API clients, database schemas, and GitHub repos."
    },
    contribution: {
      id: "Membangun backend Java 25 LTS (Virtual Threads) & Spring Boot 4.1.2, partisi PostgreSQL 18.4, RabbitMQ 4.x DLQ, Upstash Redis TLS, & FSD UI.",
      en: "Engineered the Java 25 LTS (Virtual Threads) + Spring Boot 4.1.2 backend, PostgreSQL 18.4 partitions, RabbitMQ 4.x DLQ, Upstash Redis TLS, and FSD UI."
    },
    impact: {
      id: "Memusatkan log real-time, uji API, inspeksi DDL read-only, dan analisis akar masalah kode sumber dalam satu platform taktis.",
      en: "Unified live logs, API testing, read-only DB DDL inspection, and AI source-code root-cause auditing into one tactical console."
    },
    video: "/assets/projects/logia-log/videos/demo.mp4",
    hasVideoFile: false,
    techStack: [
      "Java 25 LTS", "Spring Boot 4.1", "RabbitMQ 4", "PostgreSQL 18.4", "Upstash Redis",
      "React 19", "TypeScript 6", "Vite 8", "Tailwind CSS v4", "SSE", "Google Gemini AI", "Docker"
    ],
    stackGroups: {
      frontend: ["React 19", "Vite 8", "TypeScript 6", "Tailwind CSS v4", "Feature-Sliced Design (FSD)"],
      backend: ["Java 25 LTS (Virtual Threads)", "Spring Boot 4.1.2 (Spring 7)", "Spring Security & Data JPA", "Spring WebSocket / SSE", "Hexagonal Architecture"],
      infra: ["PostgreSQL 18.4 (UUIDv7 & Flyway 12)", "RabbitMQ 4.x (DLX/DLQ)", "Upstash Serverless Redis (TLS)", "GitHub REST/GraphQL", "Google Gemini AI", "Docker Compose"]
    },
    highlights: {
      id: [
        "Java 25 Virtual Threads + Spring Boot 4.1.2 & PostgreSQL 18.4 (UUIDv7)",
        "MOD-01 Grafana Log Explorer (SSE + RabbitMQ DLQ) & MOD-02 Postman API Studio",
        "MOD-03/04 7-Layer GitHub AI Audit + Dynamic Read-Only DB DDL Inspector"
      ],
      en: [
        "Java 25 Virtual Threads + Spring Boot 4.1.2 & PostgreSQL 18.4 (UUIDv7)",
        "MOD-01 Grafana Log Explorer (SSE + RabbitMQ DLQ) & MOD-02 Postman API Studio",
        "MOD-03/04 7-Layer GitHub AI Audit + Dynamic Read-Only DB DDL Inspector"
      ]
    },
    githubLink: "https://github.com/Yosua13/logia-log",
    previewTone: "from-amber-400 via-orange-500 to-rose-500",
    screens: logiaLogScreens
  }
];

export function getProjectsData(language: Language): ProjectData[] {
  return rawProjectsData.map((p) => ({
    id: p.id,
    title: p.title,
    filterGroup: p.filterGroup,
    category: p.category[language],
    role: p.role[language],
    headline: p.headline[language],
    description: p.description[language],
    problem: p.problem[language],
    contribution: p.contribution[language],
    impact: p.impact[language],
    image: p.image,
    video: p.video,
    hasVideoFile: p.hasVideoFile,
    techStack: p.techStack,
    stackGroups: p.stackGroups,
    highlights: p.highlights[language],
    link: p.link,
    githubLink: p.githubLink,
    previewTone: p.previewTone,
    screens: p.screens.map((s) => ({
      title: s.title[language],
      caption: s.caption[language],
      image: s.image,
      aspectRatio: s.aspectRatio,
      moduleTag: s.moduleTag
    }))
  }));
}

function ProjectArchitecturePreview({
  project,
  language
}: {
  project: ProjectData;
  language: Language;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#111113] p-4 sm:p-5 flex flex-col justify-between text-left select-none">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(244,241,234,0.05)_1px,transparent_1px)] [background-size:18px_18px] pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2.5 pt-6 sm:pt-0">
        <span className="text-[10px] font-mono font-medium uppercase tracking-[0.16em] text-neutral-400">
          {project.id} / architecture
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/12 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-emerald-300">
          <CheckCircle2 className="h-3 w-3 text-emerald-400" />
          {language === "id" ? "Rilis" : "Released"}
        </span>
      </div>

      <div className="relative z-10 my-auto space-y-2 py-2">
        {project.highlights.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-2.5 rounded-lg border border-white/10 bg-white/[0.025] px-3 py-1.5 text-[11px] font-medium text-neutral-200 leading-snug"
          >
            <span className="mt-0.5 font-mono text-[10px] font-semibold text-[#ff7a45] shrink-0">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <span className="line-clamp-1">{item}</span>
          </div>
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-2 font-mono text-[9px] font-medium uppercase tracking-wider text-neutral-300">
        <span className="inline-flex items-center gap-1.5">
          <Layers className="h-3 w-3 text-[#ff7a45]" />
          {language === "id" ? "Blueprint Sistem" : "System Blueprint"}
        </span>
        <span className="inline-flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-[#ff7a45]" />
          {language === "id" ? `${project.screens.length} Modul` : `${project.screens.length} Modules`}
        </span>
      </div>
    </div>
  );
}

function ProjectCardMedia({
  project,
  videoRef,
  isPreviewPlaying,
  language
}: {
  project: ProjectData;
  videoRef: RefObject<HTMLVideoElement | null>;
  isPreviewPlaying: boolean;
  language: Language;
}) {
  const [videoError, setVideoError] = useState(false);

  if (!project.hasVideoFile || !project.video || videoError) {
    return <ProjectArchitecturePreview project={project} language={language} />;
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0e0e10]">
      <video
        ref={videoRef}
        src={project.video}
        onError={() => setVideoError(true)}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        muted
        loop
        playsInline
        preload="metadata"
      />

      <div
        className={`pointer-events-none absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/70 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-widest text-white backdrop-blur-md transition-opacity duration-300 ${
          isPreviewPlaying ? "opacity-100" : "opacity-80 group-hover:opacity-100"
        }`}
      >
        <Play className="h-2.5 w-2.5 fill-white" />
        {isPreviewPlaying
          ? language === "id" ? "Diputar" : "Playing"
          : language === "id" ? "Hover Demo" : "Hover Demo"}
      </div>
    </div>
  );
}

function ProjectBentoCard({
  project,
  index,
  featured,
  onSelectProject,
  language
}: {
  project: ProjectData;
  index: number;
  featured: boolean;
  onSelectProject: (project: ProjectData) => void;
  language: Language;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);

  const playPreview = () => {
    if (!project.hasVideoFile || !videoRef.current) return;
    setIsPreviewPlaying(true);
    void videoRef.current.play().catch(() => setIsPreviewPlaying(false));
  };

  const stopPreview = () => {
    if (!project.hasVideoFile || !videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    setIsPreviewPlaying(false);
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      stopPreview();
    }
  };

  const visibleTech = project.techStack.slice(0, 4);
  const remainingTechCount = Math.max(0, project.techStack.length - 4);
  const issueNumber = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.35 }}
      className={featured ? "lg:col-span-2" : ""}
    >
      <SpotlightCard
        tabIndex={0}
        onMouseEnter={playPreview}
        onMouseLeave={stopPreview}
        onFocus={playPreview}
        onBlur={handleBlur}
        className="h-full"
      >
        <div
          className={
            featured
              ? "grid grid-cols-1 lg:grid-cols-[1.18fr_0.82fr] h-full"
              : "flex flex-col h-full"
          }
        >
          {/* Media Preview Area */}
          <div className={featured ? "p-3 sm:p-4 flex items-center" : "p-3 sm:p-4 pb-0"}>
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl border border-[var(--border)] bg-[#0e0e10]">
              {project.image && !project.hasVideoFile && (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-30"
                />
              )}
              <ProjectCardMedia
                project={project}
                videoRef={videoRef}
                isPreviewPlaying={isPreviewPlaying}
                language={language}
              />

              {/* Top-left Category Badge */}
              <div className="absolute top-3 left-3 z-20">
                <span className="inline-flex items-center rounded-full border border-white/20 bg-black/75 px-2.5 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wider text-white backdrop-blur-md">
                  {project.category}
                </span>
              </div>

              {/* Top-right Quick Links */}
              <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} GitHub`}
                    title="GitHub"
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/75 text-neutral-200 transition-colors hover:border-white/55 hover:text-white backdrop-blur-md"
                  >
                    <FaGithub className="h-3.5 w-3.5" />
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} Live Website`}
                    title="Live Demo"
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/75 text-neutral-200 transition-colors hover:border-white/55 hover:text-white backdrop-blur-md"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Story-Driven Editorial Body */}
          <div className="flex flex-1 flex-col justify-between gap-5 p-5 sm:p-6 text-left">
            <div className="space-y-2.5">
              <div className="flex items-baseline justify-between gap-3">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-editorial italic text-2xl sm:text-3xl leading-none text-[var(--muted-foreground)]/60 group-hover:text-[var(--accent-text)] transition-colors">
                    {issueNumber}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-[-0.02em] text-[var(--foreground)]">
                    {project.title}
                  </h3>
                </div>
                <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--accent-text)] shrink-0">
                  {project.role}
                </span>
              </div>

              <p className="text-sm font-medium text-[var(--foreground)]/90 leading-snug">
                {project.headline}
              </p>

              <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed line-clamp-3">
                {project.description}
              </p>
            </div>

            <div className="space-y-4 pt-1">
              <div className="flex flex-wrap items-center gap-1.5">
                {visibleTech.map((tech) => (
                  <Badge key={tech} variant="muted" className="text-[10px] py-1">
                    <TechIcon name={tech} className="h-3 w-3" />
                    {tech}
                  </Badge>
                ))}
                {remainingTechCount > 0 && (
                  <Badge variant="outline" className="text-[10px] py-1">
                    +{remainingTechCount}
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-[var(--border)] pt-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onSelectProject(project)}
                >
                  {language === "id" ? "Lihat Detail" : "Case Study"}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Button>

                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                  {project.screens.length} {language === "id" ? "Tampilan" : "Screens"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectData) => void;
}

export default function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const { language } = useLanguage();
  const [filter, setFilter] = useState<"all" | "saas" | "platform" | "enterprise">("all");
  const allProjects = getProjectsData(language);

  const filteredProjects =
    filter === "all"
      ? allProjects
      : allProjects.filter((project) => project.filterGroup === filter);

  return (
    <section id="projects" className="space-y-8 scroll-mt-28">
      <SectionHeader
        index="01"
        eyebrow={language === "id" ? "Karya Pilihan" : "Selected Works"}
        title={language === "id" ? "Proyek" : "Selected"}
        titleItalic={language === "id" ? "Unggulan" : "Projects"}
        subtitle={
          language === "id"
            ? "5 sistem perangkat lunak yang lahir dari masalah nyata — dirancang untuk dampak bisnis."
            : "5 production software systems born from real-world challenges — built for measurable impact."
        }
        action={
          <Tabs
            value={filter}
            onValueChange={(value) => setFilter(value as typeof filter)}
          >
            <TabsList>
              <TabsTrigger value="all">
                {language === "id" ? "Semua (5)" : "All (5)"}
              </TabsTrigger>
              <TabsTrigger value="saas">
                {language === "id" ? "Bisnis & SaaS" : "Business & SaaS"}
              </TabsTrigger>
              <TabsTrigger value="platform">
                {language === "id" ? "Komunitas" : "Platforms"}
              </TabsTrigger>
              <TabsTrigger value="enterprise">
                Enterprise
              </TabsTrigger>
            </TabsList>
          </Tabs>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project, index) => (
          <ProjectBentoCard
            key={project.id}
            project={project}
            index={index}
            featured={filter === "all" && index === 0}
            onSelectProject={onSelectProject}
            language={language}
          />
        ))}
      </div>
    </section>
  );
}
