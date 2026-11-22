"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Play, Layers, CheckCircle2, Sparkles } from "lucide-react";
import { useRef, useState, type FocusEvent, type RefObject } from "react";
import SectionHeader from "./SectionHeader";
import { useLanguage, type Language } from "@/context/LanguageContext";

export interface ProjectScreen {
  title: string;
  caption: string;
  image?: string;
  aspectRatio?: string;
  moduleTag?: string;
}

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  location: string;
  role: string;
  headline: string;
  description: string;
  fullDescription: string;
  problem: string;
  contribution: string;
  impact: string;
  image?: string;
  video?: string;
  hasVideoFile?: boolean;
  tags: string[];
  techStack: string[];
  highlights: string[];
  link?: string;
  githubLink?: string;
  previewTone: string;
  screens: ProjectScreen[];
  isWip?: boolean;
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
  category: BilingualText;
  location: BilingualText;
  role: BilingualText;
  headline: BilingualText;
  description: BilingualText;
  fullDescription: BilingualText;
  problem: BilingualText;
  contribution: BilingualText;
  impact: BilingualText;
  image?: string;
  video?: string;
  hasVideoFile?: boolean;
  tags: string[];
  techStack: string[];
  highlights: { id: string[]; en: string[] };
  link?: string;
  githubLink?: string;
  previewTone: string;
  screens: BilingualScreen[];
  isWip?: boolean;
}

const laporKosScreens: BilingualScreen[] = [
  {
    title: { id: "Portal Login & Otorisasi", en: "Login & Authorization Portal" },
    caption: {
      id: "Akses masuk multi-peran untuk pemilik kos, staf properti, dan penghuni dilengkapi verifikasi OTP & aktivasi undangan.",
      en: "Multi-role sign-in for boarding house owners, property staff, and tenants with OTP verification and invitation activation."
    },
    image: "/assets/projects/lapor-kos/screenshots/00-login.png",
    aspectRatio: "1920 / 901"
  },
  {
    title: { id: "Dashboard Operasional Multi-Properti", en: "Multi-Property Operations Dashboard" },
    caption: {
      id: "Ringkasan okupansi kamar, tagihan bulanan, metrik SLA komplain, dan aktivitas lintas properti kos secara real-time.",
      en: "Real-time overview of room occupancy, monthly billing, complaint SLA metrics, and cross-property activities."
    },
    image: "/assets/projects/lapor-kos/screenshots/01-dashboard.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: { id: "Visualisasi & Manajemen Kamar", en: "Room Visualization & Inventory" },
    caption: {
      id: "Denah interaktif per lantai untuk memantau kamar kosong, terisi, perbaikan, tarif sewa, serta riwayat pindah kamar.",
      en: "Interactive floor-by-floor visualizer tracking vacant, occupied, and maintenance rooms, pricing, and room transfers."
    },
    image: "/assets/projects/lapor-kos/screenshots/02-manajemen-kamar.png",
    aspectRatio: "1920 / 901"
  },
  {
    title: { id: "Manajemen Penghuni, Kontrak & Checkout", en: "Tenants, Contracts & Checkout Workflow" },
    caption: {
      id: "Kelola data penghuni, dokumen identitas, undangan penghuni baru, kontrak sewa aktif, dan inspeksi checkout.",
      en: "Manage tenant profiles, identity documents, onboarding invitations, active lease contracts, and checkout inspections."
    },
    image: "/assets/projects/lapor-kos/screenshots/03-penghuni-kontrak.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: { id: "Manajemen Pembayaran & Midtrans Gateway", en: "Payment Verification & Midtrans Gateway" },
    caption: {
      id: "Dual payment flow: pelunasan instan via Midtrans Snap (VA, QRIS, E-Wallet) maupun verifikasi bukti transfer manual.",
      en: "Dual payment flow supporting instant Midtrans Snap checkout (VA, QRIS, E-Wallet) and manual transfer verification."
    },
    image: "/assets/projects/lapor-kos/screenshots/04-manajemen-pembayaran.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: { id: "Laporan Operasional & Audit", en: "Operational Analytics & Audit Trail" },
    caption: {
      id: "Rekap operasional hunian, pengeluaran properti, dan pencatatan audit log aktivitas sistem dalam tabel & grafik.",
      en: "Comprehensive operational summaries, property expenses, and system audit trail tables and charts."
    },
    image: "/assets/projects/lapor-kos/screenshots/05-laporan.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: { id: "Peraturan Kos & Izin Tamu Digital", en: "Digital House Rules & Guest Permits" },
    caption: {
      id: "Pengelolaan tata tertib hunian digital serta sistem persetujuan izin kunjungan/menginap tamu dengan QR Visitor Pass.",
      en: "Digital house rules management and guest/overnight visitor permit approval with tokenized Visitor Passes."
    },
    image: "/assets/projects/lapor-kos/screenshots/06-peraturan-kos.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: { id: "Kalender Jatuh Tempo & Jadwal", en: "Contract & Billing Calendar" },
    caption: {
      id: "Kalender interaktif FullCalendar untuk memantau jatuh tempo pembayaran, perpanjangan kontrak, dan jadwal checkout.",
      en: "Interactive FullCalendar view tracking rent due dates, contract renewals, and scheduled tenant checkouts."
    },
    image: "/assets/projects/lapor-kos/screenshots/07-kalender.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: { id: "Triase Komplain AI & Work Orders", en: "AI Complaint Triage & Work Orders" },
    caption: {
      id: "Klasifikasi otomatis tingkat urgensi kerusakan fasilitas menggunakan Google Gemini AI beserta pantauan SLA perbaikan.",
      en: "Automated facility issue urgency classification powered by Google Gemini AI with SLA and work order tracking."
    },
    image: "/assets/projects/lapor-kos/screenshots/08-komplain.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: { id: "Pengaturan Properti & Notifikasi", en: "Property & Notification Settings" },
    caption: {
      id: "Konfigurasi multi-properti, preferensi pengingat WhatsApp Fonnte, email SMTP, dan kontrol akses berbasis peran (RBAC).",
      en: "Multi-property configuration, Fonnte WhatsApp reminder preferences, SMTP email settings, and RBAC controls."
    },
    image: "/assets/projects/lapor-kos/screenshots/09-pengaturan.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: { id: "Form Input Tervalidasi Zod", en: "Zod-Validated Data Forms" },
    caption: {
      id: "Formulir input data kamar, kontrak, dan transaksi dengan validasi skema ketat menggunakan React Hook Form & Zod.",
      en: "Strict schema-validated forms for rooms, contracts, and transactions built with React Hook Form and Zod."
    },
    image: "/assets/projects/lapor-kos/screenshots/10-form.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: { id: "Laporan Keuangan & Kwitansi PDF SHA-256", en: "Financial Reports & SHA-256 PDF Receipts" },
    caption: {
      id: "Ringkasan arus kas pemasukan/pengeluaran dan ekspor laporan PDF formal serta kwitansi digital ber-hash SHA-256.",
      en: "Cashflow income/expense reconciliation with instant formal PDF report export and SHA-256 digital receipts."
    },
    image: "/assets/projects/lapor-kos/screenshots/11-laporan-keuangan.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: { id: "Detail Profil & Riwayat Kamar Penghuni", en: "Tenant Profile & Room History" },
    caption: {
      id: "Rincian profil penghuni lengkap dengan histori perpindahan kamar, dokumen kontrak, dan rekam jejak pembayaran.",
      en: "Comprehensive tenant profile with room transfer history, contract documents, and complete payment ledger."
    },
    image: "/assets/projects/lapor-kos/screenshots/12-detail-penghuni.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: { id: "Portal Mandiri Penghuni", en: "Tenant Self-Service Portal" },
    caption: {
      id: "Beranda khusus penghuni untuk melihat informasi kamar, pengumuman, izin tamu, dan tagihan aktif.",
      en: "Dedicated tenant dashboard displaying room details, announcements, guest permits, and active invoices."
    },
    image: "/assets/projects/lapor-kos/screenshots/13-dashboard-penghuni.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: { id: "Pelaporan Komplain Fasilitas Penghuni", en: "Tenant Facility Complaint Submission" },
    caption: {
      id: "Pengajuan laporan kerusakan fasilitas dengan unggahan foto ke Supabase Storage dan pelacakan progres penyelesaian.",
      en: "Facility maintenance ticket submission with Supabase Storage photo upload and resolution timeline tracking."
    },
    image: "/assets/projects/lapor-kos/screenshots/14-komplain-penghuni.png",
    aspectRatio: "1920 / 902"
  },
  {
    title: { id: "Pembayaran Instan Midtrans Snap Penghuni", en: "Tenant Midtrans Snap Instant Checkout" },
    caption: {
      id: "Halaman tagihan penghuni dengan popup Midtrans Snap (VA, QRIS, E-Wallet), auto-sync status, dan cetak kwitansi resmi.",
      en: "Tenant billing view with Midtrans Snap popup checkout, real-time payment status auto-sync, and receipt printing."
    },
    image: "/assets/projects/lapor-kos/screenshots/15-tagihan-penghuni.png",
    aspectRatio: "1920 / 902"
  }
];

const flowakScreens: BilingualScreen[] = [
  {
    title: { id: "Portal Login & Sesi Aman", en: "Secure Auth & Session Portal" },
    caption: {
      id: "Autentikasi JWT dengan hashing Argon2/Bcrypt dan proteksi pencabutan sesi via Redis Blacklist.",
      en: "JWT authentication secured with Argon2/Bcrypt hashing and Redis session blacklisting."
    },
    image: "/assets/projects/flowak/screenshots/01-login.png"
  },
  {
    title: { id: "Project Hub & Workspace Multi-Tenant", en: "Project Hub & Multi-Tenant Workspace" },
    caption: {
      id: "Pusat pengelolaan proyek kolaboratif dengan isolasi akses berbasis peran (Multi-Tenant RBAC).",
      en: "Collaborative project management hub with multi-tenant role-based access control (RBAC)."
    },
    image: "/assets/projects/flowak/screenshots/02-landing-page.png"
  },
  {
    title: { id: "Kanvas Visual Pemodelan Alur & Kontrak API", en: "Interactive Flow Canvas & API Contract Runner" },
    caption: {
      id: "Kanvas graf interaktif dengan deteksi siklus (cycle detection), AI flow generator, dan eksekusi uji cURL API langsung.",
      en: "Interactive graph canvas featuring cycle detection, AI flow generation, and server-side cURL API contract runner."
    },
    image: "/assets/projects/flowak/screenshots/03-kanvas.png"
  },
  {
    title: { id: "Matriks Status & Traceability Fitur", en: "Feature Traceability & Status Matrix" },
    caption: {
      id: "Pemetaan ketertelusuran (traceability) dari node proses bisnis ke status pengerjaan lintas divisi secara real-time.",
      en: "End-to-end traceability matrix mapping business process nodes to cross-functional delivery status."
    },
    image: "/assets/projects/flowak/screenshots/04-tabel-status.png"
  },
  {
    title: { id: "Spesifikasi Multidisiplin (Bisnis, UI/UX, FE, BE)", en: "Multi-Discipline Node Inspector & Specs" },
    caption: {
      id: "Dokumentasi terstruktur per node meliputi aktor, input/output, aturan bisnis, SLA, kontrak endpoint, dan payload JSON.",
      en: "Structured per-node specifications covering actors, I/O, business rules, SLAs, API endpoints, and JSON payloads."
    },
    image: "/assets/projects/flowak/screenshots/05-spesifikasi-dokumen.png"
  },
  {
    title: { id: "Kalender & Timeline Eksekusi Tim", en: "Team Execution Calendar & Timeline" },
    caption: {
      id: "Penjadwalan tenggat waktu pengerjaan modul dan sinkronisasi milestone tim pengembang.",
      en: "Module delivery scheduling and engineering milestone synchronization calendar."
    },
    image: "/assets/projects/flowak/screenshots/06-jadwal-tim.png"
  },
  {
    title: { id: "Analitik Delivery & Audit AI", en: "Delivery Analytics & AI System Audit" },
    caption: {
      id: "Metrik kecepatan sprint, deteksi bottleneck alur kerja berbasis Google Gemini AI, dan grafik penyelesaian work item.",
      en: "Sprint velocity metrics, Gemini AI workflow bottleneck detection, and work item completion analytics."
    },
    image: "/assets/projects/flowak/screenshots/07-analitik.png"
  },
  {
    title: { id: "Real-Time SSE Kanban Board", en: "Real-Time SSE Kanban Task Board" },
    caption: {
      id: "Papan Kanban dengan validasi state-machine domain, artefak work item, dan siaran perubahan langsung via SSE & RabbitMQ.",
      en: "State-machine validated Kanban board with work item artifacts and live updates broadcast via RabbitMQ & SSE."
    },
    image: "/assets/projects/flowak/screenshots/08-kanban.png"
  },
  {
    title: { id: "Manajemen Anggota & Peran Teknis", en: "Team Members & Engineering Roles" },
    caption: {
      id: "Pengelolaan kolaborator proyek beserta pembagian tanggung jawab PM, UI/UX, Frontend, dan Backend.",
      en: "Project collaborator management and role assignments across PM, UI/UX, Frontend, and Backend."
    },
    image: "/assets/projects/flowak/screenshots/09-anggota-tim.png"
  }
];

const sionMinistryScreens: BilingualScreen[] = [
  {
    title: { id: "Landing Page & Portal Login RBAC", en: "Landing Page & RBAC Login Portal" },
    caption: {
      id: "Halaman sambutan publik, registrasi jemaat/pekerja dengan alur persetujuan admin, serta login Google OAuth2.",
      en: "Public landing page, member/worker registration with admin approval workflow, and Google OAuth2 sign-in."
    },
    image: "/assets/projects/sion-ministry/screenshots/01-login.png"
  },
  {
    title: { id: "Dashboard Statistik & Peta Pelayanan Indonesia", en: "Analytics Dashboard & Interactive Indonesia Map" },
    caption: {
      id: "Visualisasi peta interaktif persebaran pelayanan di seluruh kota/kampus Indonesia beserta grafik pertumbuhan real-time.",
      en: "Interactive Indonesian map visualizing ministry distribution across cities and campuses with real-time Recharts analytics."
    },
    image: "/assets/projects/sion-ministry/screenshots/02-dashboard.png"
  },
  {
    title: { id: "Manajemen Jemaat, Wilayah & Kampus", en: "Member, Region & Campus Management" },
    caption: {
      id: "Pelacakan tahap pemuridan (discipleship stage), relasi mentor-mentee, serta database kota dan kampus pelayanan.",
      en: "Discipleship stage tracking, mentor-mentee relationships, and regional city/campus directory management."
    },
    image: "/assets/projects/sion-ministry/screenshots/03-data-jemaat.png"
  },
  {
    title: { id: "Jurnal Pendampingan (PA) & Modul Medium-Style", en: "PA Mentoring Journals & Medium-Style Modules" },
    caption: {
      id: "Pencatatan jurnal PA offline-first serta ruang baca Modul Belajar bergaya Medium dengan authoring editor & gambar inline.",
      en: "Offline-first Bible study (PA) journaling and full-width Medium-style learning modules with dedicated authoring pages."
    },
    image: "/assets/projects/sion-ministry/screenshots/04-jurnal-pa.png"
  },
  {
    title: { id: "Laporan Berita Acara & Dokumentasi S3", en: "Activity Reports (Berita Acara) & S3 Media" },
    caption: {
      id: "Pelaporan kegiatan pelayanan lapangan dengan kompresi gambar sisi klien dan penyimpanan objek Supabase S3.",
      en: "Field ministry activity reporting with client-side image compression and Supabase S3-compatible object storage."
    },
    image: "/assets/projects/sion-ministry/screenshots/05-berita-acara.png"
  },
  {
    title: { id: "Crowdfunding Misi & Donasi Sion Care", en: "Mission Crowdfunding & Sion Care Donations" },
    caption: {
      id: "Pengelolaan kampanye penggalangan dana misi, pencatatan donatur, dan pelacakan progres target bantuan sosial.",
      en: "Mission fundraising campaign management, donor ledger tracking, and social care target progress."
    },
    image: "/assets/projects/sion-ministry/screenshots/06-donasi-care.png"
  },
  {
    title: { id: "Portal Karier & Lowongan Pelayanan", en: "Sion Careers & Ministry Opportunities" },
    caption: {
      id: "Papan informasi lowongan pelayanan dan misi lengkap dengan pengajuan lamaran serta rincian kualifikasi tugas.",
      en: "Ministry job board and mission opportunities portal with application submission and role details."
    },
    image: "/assets/projects/sion-ministry/screenshots/07-sion-careers.png"
  },
  {
    title: { id: "Tautan Sumber Daya, Manajemen User & Audit Keamanan", en: "Resource Links, User Management & Security Audit" },
    caption: {
      id: "Pusat dokumen pemuridan, aktivasi akun pekerja/jemaat, riwayat aktivitas profil, dan log audit keamanan sistem.",
      en: "Discipleship resource directory, user account approval, profile activity history, and security audit logs."
    },
    image: "/assets/projects/sion-ministry/screenshots/08-tautan-sumber.png"
  }
];

const ministrySchedulingScreens: BilingualScreen[] = [
  {
    title: { id: "Denah Interaktif SVG Main Hall (Usher)", en: "Interactive SVG Main Hall Floorplan (Usher)" },
    caption: {
      id: "Pemilihan posisi tugas Usher (Samping Kiri/Kanan, Tengah, Balkon, Kolekte) secara visual melalui denah SVG interaktif.",
      en: "Visual self-scheduling for Usher stations (Left/Right Wing, Center, Balcony, Offering) on an interactive SVG floorplan."
    },
    moduleTag: "SVG FLOORPLAN"
  },
  {
    title: { id: "Selector Gerbang Greeter & Stasiun OM", en: "Greeter Gate & Operational Manager Selector" },
    caption: {
      id: "Penugasan titik pelayanan Greeter (Pintu Utama, Lobby, Selasar) dan stasiun Operational Manager (OM 1–4).",
      en: "Dedicated station assignment selectors for Greeters (Main Entrance, Lobby, Corridor) and Operational Managers (OM 1–4)."
    },
    moduleTag: "STATION ENGINE"
  },
  {
    title: { id: "Tracker Kuota Kewajiban Bulanan", en: "Monthly Service Quota & Rule Validator" },
    caption: {
      id: "Indikator progres pemenuhan kuota pelayanan bulanan dengan validasi domain (maks 1 shift/hari & 3 shift/bulan).",
      en: "Monthly obligation progress bar enforcing domain scheduling invariants (max 1 shift/day and 3 shifts/month)."
    },
    moduleTag: "DOMAIN RULES"
  },
  {
    title: { id: "Peer-to-Peer Shift Swap & Notifikasi Email", en: "Peer-to-Peer Shift Swap & Email Alerts" },
    caption: {
      id: "Alur pengajuan tukar jadwal antar pelayan dengan notifikasi email Nodemailer otomatis dan persetujuan koordinator.",
      en: "Transparent peer-to-peer shift swap requests with automated Nodemailer email notifications and coordinator approval."
    },
    moduleTag: "SHIFT SWAP"
  },
  {
    title: { id: "Dashboard Koordinator & Ekspor Jadwal", en: "Coordinator Dashboard & Schedule Exporter" },
    caption: {
      id: "Pemantauan keterisian shift real-time, persetujuan tukar jadwal, direktori relawan, dan ekspor jadwal ke CSV/Cetak.",
      en: "Real-time shift fulfillment monitoring, swap approvals, volunteer directory, and CSV/printable schedule export."
    },
    moduleTag: "COORDINATOR HUB"
  },
  {
    title: { id: "Autentikasi Google SSO & Manajemen Role", en: "Google OAuth2 SSO & Role Request Management" },
    caption: {
      id: "Login cepat menggunakan Google SSO serta halaman administrasi persetujuan permintaan role pelayan dan koordinator.",
      en: "Seamless Google OAuth2 Single Sign-On and administrative portal for reviewing volunteer role upgrade requests."
    },
    moduleTag: "GOOGLE SSO & RBAC"
  }
];

const logiaLogScreens: BilingualScreen[] = [
  {
    title: { id: "MOD-01: Grafana-Style Live Log Explorer", en: "MOD-01: Grafana-Style Live Log Explorer" },
    caption: {
      id: "Streaming log real-time via Server-Sent Events (SSE) dengan filter query taktis, klasifikasi severity, dan deduplikasi SHA-256.",
      en: "Real-time Server-Sent Events (SSE) log streaming with tactical query filtering, severity tagging, and SHA-256 deduplication."
    },
    moduleTag: "MOD-01 OBSERVABILITY"
  },
  {
    title: { id: "MOD-02: Postman-Style Interactive API Studio", en: "MOD-02: Postman-Style Interactive API Studio" },
    caption: {
      id: "Studio pengujian HTTP/REST interaktif dengan Auth Type Selector, request builder, dan HTTP Proxy Engine terintegrasi.",
      en: "Interactive HTTP/REST testing studio with Auth Type Selector, custom request builder, and backend HTTP Proxy Engine."
    },
    moduleTag: "MOD-02 API STUDIO"
  },
  {
    title: { id: "MOD-03/04: 7-Layer Deep GitHub AI Diagnostic", en: "MOD-03/04: 7-Layer Deep GitHub AI Diagnostic" },
    caption: {
      id: "Diagnosis akar masalah 7-lapis yang mengkorelasikan stack trace error, skema DDL database target, dan kode sumber GitHub.",
      en: "7-layer root-cause diagnosis correlating error stack traces, live target DB DDL schemas, and GitHub source code."
    },
    moduleTag: "MOD-03/04 AI AUDIT"
  },
  {
    title: { id: "CFG: Target-Agnostic Connection Profiles", en: "CFG: Target-Agnostic Connection Profiles" },
    caption: {
      id: "Konfigurasi dinamis untuk menghubungkan berbagai server target, inspeksi DDL database read-only, dan repositori GitHub.",
      en: "Dynamic target-agnostic profile configuration connecting external servers, read-only DB DDL inspectors, and GitHub repos."
    },
    moduleTag: "CFG TARGET PROFILES"
  },
  {
    title: { id: "RabbitMQ 4 Spike Absorber & Upstash Redis Dedup", en: "RabbitMQ 4 Spike Absorber & Upstash Redis Dedup" },
    caption: {
      id: "Arsitektur Java 25 Virtual Threads dengan RabbitMQ Dead-Letter Queue (DLX/DLQ) dan Upstash Serverless Redis TLS.",
      en: "Java 25 Virtual Threads pipeline backed by RabbitMQ Dead-Letter Queues (DLX/DLQ) and Upstash Serverless Redis TLS."
    },
    moduleTag: "VIRTUAL THREADS & DLQ"
  },
  {
    title: { id: "60-30-10 Obsidian Black & Royal Gold Tactical UI", en: "60-30-10 Obsidian Black & Royal Gold Tactical UI" },
    caption: {
      id: "Sistem desain Feature-Sliced Design (FSD) presisi tinggi dengan estetika tajam Obsidian Black & Royal Gold.",
      en: "High-contrast Feature-Sliced Design (FSD) frontend engineered with a 60-30-10 Obsidian Black and Royal Gold aesthetic."
    },
    moduleTag: "FSD TACTICAL UI"
  }
];

const rawProjectsData: RawProjectData[] = [
  {
    id: "lapor-kos",
    title: "Lapor Kos",
    category: { id: "Fullstack SaaS", en: "Fullstack SaaS" },
    location: { id: "2026 | MANAJEMEN PROPERTI & HUNIAN KOS", en: "2026 | SMART BOARDING HOUSE OPERATIONS" },
    role: { id: "FULLSTACK DEVELOPER", en: "FULLSTACK DEVELOPER" },
    headline: {
      id: "PLATFORM MANAJEMEN MULTI-KOS, PEMBAYARAN OTOMATIS MIDTRANS, & TRIASE KOMPLAIN AI",
      en: "MULTI-PROPERTY BOARDING MANAGEMENT, MIDTRANS AUTO-BILLING, AND AI COMPLAINT TRIAGE"
    },
    description: {
      id: "Platform manajemen properti kos pintar dua arah (Pemilik & Penghuni) dengan dukungan multi-properti, pembayaran instan Midtrans Snap (VA, QRIS, E-Wallet), kwitansi PDF SHA-256, izin tamu digital, dan triase komplain fasilitas berbasis Google Gemini AI.",
      en: "A smart two-way boarding property management platform supporting multi-property isolation, instant Midtrans Snap checkout (VA, QRIS, E-Wallet), SHA-256 digital PDF receipts, guest permits, and Gemini AI facility complaint triage."
    },
    fullDescription: {
      id: "Lapor Kos mendigitalisasi operasional rumah kos secara menyeluruh bagi pemilik, staf properti, dan penghuni. Sistem ini dilengkapi manajemen multi-properti, denah visualisasi kamar per lantai, mesin penagihan bulanan otomatis, Dual Payment Flow melalui Midtrans Snap Sandbox (Virtual Account BCA/Mandiri/BNI/BRI/Permata, QRIS, GoPay/ShopeePay) dengan verifikasi webhook SHA-512 & sinkronisasi status real-time maupun transfer manual, penerbitan kwitansi PDF ber-hash kriptografis SHA-256, manajemen pindah kamar & inspeksi checkout, izin tamu dengan QR Visitor Pass, triase keluhan kerusakan berbasis Google Gemini AI, serta pengingat WhatsApp otomatis via Fonnte.",
      en: "Lapor Kos digitalizes end-to-end boarding house operations for property owners, staff, and tenants. It features multi-property data isolation, interactive floor-by-floor room visualizers, an automated monthly billing engine, Dual Payment Flow via Midtrans Snap Sandbox (BCA/Mandiri/BNI/BRI/Permata VA, QRIS, GoPay/ShopeePay) with SHA-512 webhook verification and real-time status polling alongside manual transfer fallback, cryptographic SHA-256 digital PDF receipts, room transfer and checkout inspection workflows, tokenized guest visitor passes, Google Gemini AI complaint triage, and automated Fonnte WhatsApp reminders."
    },
    problem: {
      id: "Pengelola kos sering kewalahan menangani pembukuan manual di banyak properti, rekonsiliasi bukti transfer yang lambat dan rawan pembayaran ganda, keterlambatan penagihan sewa, serta laporan kerusakan fasilitas dan izin tamu yang tidak terorganisir.",
      en: "Boarding house operators struggle with manual bookkeeping across properties, slow bank transfer reconciliation prone to duplicate submissions, late rent collections, and unorganized facility maintenance and guest permit tracking."
    },
    contribution: {
      id: "Merancang arsitektur Hexagonal (Ports & Adapters) pada backend Go 1.25 (Gin) dan SPA React 19 + Vite 8 + React Router v7; mengintegrasikan Midtrans Snap & Core API v2 beserta proteksi lock pembayaran ganda, Redis 7 rate-limiter & session blacklist, RabbitMQ 3.13 event broker, PostgreSQL/Supabase, Google Gemini AI, Fonnte WhatsApp Gateway, serta generator laporan/kwitansi PDF Gofpdf.",
      en: "Architected the decoupled Hexagonal (Ports & Adapters) Go 1.25 Gin backend and React 19 + Vite 8 + React Router v7 SPA; integrated Midtrans Snap & Core API v2 with duplicate-payment locking, Redis 7 sliding-window rate limiting, RabbitMQ 3.13 event queues, PostgreSQL/Supabase, Google Gemini AI triage, Fonnte WhatsApp notifications, and Gofpdf SHA-256 receipt generation."
    },
    impact: {
      id: "Mengotomatisasi siklus penagihan hingga pelunasan secara real-time, menghilangkan gesekan verifikasi pembayaran dengan Midtrans & kwitansi SHA-256, serta mempercepat penanganan komplain fasilitas melalui prioritas SLA berbasis AI.",
      en: "Automates the entire billing-to-settlement lifecycle in real time, eliminates manual payment verification friction with Midtrans and SHA-256 receipts, and accelerates maintenance resolution with AI-driven SLA prioritization."
    },
    image: "/assets/projects/lapor-kos/screenshots/01-dashboard.png",
    video: "/assets/projects/lapor-kos/videos/demo.mp4",
    hasVideoFile: true,
    tags: ["Multi-Property SaaS", "Midtrans Snap", "Golang Hexagonal", "Redis & RabbitMQ", "Gemini AI", "WhatsApp API"],
    techStack: [
      "React 19",
      "Vite 8",
      "TypeScript",
      "React Router v7",
      "Tailwind CSS v4",
      "Zod & React Hook Form",
      "FullCalendar",
      "Go 1.25 (Gin)",
      "Hexagonal Architecture",
      "PostgreSQL 15+ (pgx/v5)",
      "Supabase Storage",
      "Redis 7",
      "RabbitMQ 3.13",
      "Midtrans Payment Gateway",
      "Google Gemini AI",
      "Fonnte WhatsApp API",
      "Gofpdf (SHA-256 Receipt)",
      "Gomail (SMTP/OTP)",
      "Docker Compose"
    ],
    highlights: {
      id: [
        "Dual Payment Flow: Midtrans Snap (VA, QRIS, E-Wallet) + Webhook SHA-512 & Auto-Sync",
        "Manajemen Multi-Properti, Transfer Pindah Kamar, Inspeksi Checkout & Visitor Pass Tamu",
        "Triase Komplain Fasilitas Google Gemini AI, Pengingat WhatsApp Fonnte & Kwitansi PDF SHA-256"
      ],
      en: [
        "Dual Payment Flow: Midtrans Snap (VA, QRIS, E-Wallet) + SHA-512 Webhook & Auto-Sync",
        "Multi-Property Isolation, Room Transfers, Checkout Inspections & Digital Guest Visitor Passes",
        "Google Gemini AI Complaint Triage, Fonnte WhatsApp Reminders & SHA-256 PDF Receipts"
      ]
    },
    link: "https://lapor-kos.vercel.app/",
    githubLink: "https://github.com/Yosua13/lapor-kos",
    previewTone: "from-emerald-500 via-teal-500 to-cyan-600",
    screens: laporKosScreens
  },
  {
    id: "flowak",
    title: "Flowak",
    category: { id: "Fullstack SaaS", en: "Fullstack SaaS" },
    location: { id: "2026 | PEMODELAN PROSES BISNIS & ARSITEKTUR IT", en: "2026 | TRACEABILITY-NATIVE IT WORKFLOW" },
    role: { id: "PRODUCT / FULLSTACK DEVELOPER", en: "PRODUCT / FULLSTACK DEVELOPER" },
    headline: {
      id: "PLATFORM SAAS PEMODELAN ALUR BISNIS, SPESIFIKASI LINTAS PERAN, & EKSEKUTOR KONTRAK API",
      en: "TRACEABILITY-NATIVE WORKFLOW MODELER, CROSS-ROLE SPEC ARCHITECT & API CONTRACT RUNNER"
    },
    description: {
      id: "Platform SaaS kolaboratif untuk memodelkan proses bisnis di kanvas graf interaktif, menyusun spesifikasi teknis lintas peran (Bisnis, UI/UX, FE, BE), mengelola Kanban real-time via SSE, dan menguji kontrak API secara aman.",
      en: "A collaborative traceability-native SaaS platform for modeling business workflows on an interactive graph canvas, authoring cross-role technical specs, syncing real-time SSE Kanban boards, and executing API contracts."
    },
    fullDescription: {
      id: "Flowak (Flow to Action) menyatukan pemodelan proses bisnis, penyusunan dokumen spesifikasi multidisiplin, manajemen tiket pekerjaan (Work Items), dan pengujian kontrak API dalam satu ruang kerja. Setiap node pada kanvas graf memiliki rincian terstruktur untuk analisis Bisnis (aktor, input, proses, output, aturan bisnis, SLA), UI/UX, Frontend, dan Backend. Tugas berat seperti generasi alur AI (Google Gemini) dan eksekusi target cURL API didelegasikan ke antrean RabbitMQ dan diproses oleh daemon worker Go independen dengan mode fallback sinkron otomatis, sementara perubahan Kanban disiarkan secara real-time melalui Server-Sent Events (SSE) dan dilindungi oleh Redis Distributed Lock (Redlock).",
      en: "Flowak (Flow to Action) unifies visual business process modeling, multi-discipline specification authoring, Kanban work item tracking, and controlled API contract testing in a single workspace. Every workflow node captures structured details across Business (actors, I/O, rules, SLAs), UI/UX, Frontend, and Backend tabs. Heavy tasks such as Gemini AI flow generation and server-side cURL API execution are offloaded to RabbitMQ queues processed by a standalone Go worker daemon with automatic synchronous fallback, while Kanban state transitions broadcast live via Server-Sent Events (SSE) protected by Redis Redlock and optimistic row versioning."
    },
    problem: {
      id: "Tim pengembang perangkat lunak sering kehilangan ketertelusuran (traceability) ketika diagram alur bisnis, dokumen PRD/SLA, spesifikasi kontrak endpoint API, dan papan tugas Kanban tersebar di banyak aplikasi yang terpisah.",
      en: "Software engineering teams lose traceability when business flowcharts, PRD/SLA documents, API endpoint contracts, and Kanban task boards are fragmented across disconnected tools."
    },
    contribution: {
      id: "Membangun backend Go 1.26 (Gin) dengan Clean/Hexagonal Architecture berpola '1 File = 1 Fungsi', daemon worker RabbitMQ (`flowak.events`), Redis Hot Graph Cache & Redlock, validasi siklus graf & state-machine Kanban, eksekutor cURL API aman dengan redaksi secret, serta frontend React 19 + Zustand 5 + TanStack Query v5.",
      en: "Engineered the Go 1.26 Gin backend following Clean/Hexagonal Architecture with a strict '1 File = 1 Function' pattern, standalone RabbitMQ worker daemon, Redis Hot Graph Cache & Redlock, graph cycle & Kanban state-machine validators, secure server-side cURL contract runner with secret redaction, and React 19 + Zustand 5 + TanStack Query v5 frontend."
    },
    impact: {
      id: "Menjaga sinkronisasi penuh dari tahap analisis kebutuhan hingga eksekusi kode, mencegah konflik perubahan dengan optimistic locking, dan mempercepat validasi kontrak API antar tim Frontend & Backend.",
      en: "Maintains end-to-end synchronization from requirement analysis to technical execution, prevents concurrent edit conflicts via optimistic locking, and accelerates Frontend-Backend API contract validation."
    },
    image: "/assets/projects/flowak/screenshots/02-landing-page.png",
    video: "/assets/projects/flowak/videos/demo.mp4",
    hasVideoFile: true,
    tags: ["Traceability SaaS", "AI Workflow Architect", "API Contract Runner", "Go Clean Arch", "RabbitMQ & Redis", "Real-Time SSE"],
    techStack: [
      "React 19",
      "TypeScript",
      "Vite 6",
      "Tailwind CSS v4",
      "Zustand 5",
      "TanStack React Query v5",
      "Motion",
      "Go 1.26 (Gin)",
      "Clean Architecture (1 File = 1 Func)",
      "PostgreSQL (Multi-Tenant RBAC)",
      "Redis 9 (Redlock & Hot Cache)",
      "RabbitMQ (Topic Exchange & Worker)",
      "Server-Sent Events (SSE)",
      "JWT & Argon2/Bcrypt",
      "Google Gemini AI"
    ],
    highlights: {
      id: [
        "Clean Architecture Go (1 File = 1 Fungsi) + Standalone RabbitMQ Background Worker Daemon",
        "Inspector Node Multidisiplin (Bisnis/SLA, UI/UX, Frontend, Backend) & Server-Side cURL API Runner",
        "Real-Time SSE Kanban Broadcast, Redis Distributed Lock (Redlock) & Optimistic Row Versioning"
      ],
      en: [
        "Go Clean Architecture (1 File = 1 Function) + Standalone RabbitMQ Background Worker Daemon",
        "Multi-Discipline Node Inspector (Business/SLA, UI/UX, FE, BE) & Server-Side cURL API Runner",
        "Real-Time SSE Kanban Broadcast, Redis Distributed Lock (Redlock) & Optimistic Row Versioning"
      ]
    },
    githubLink: "https://github.com/Yosua13/flowak",
    previewTone: "from-indigo-500 via-sky-500 to-emerald-500",
    screens: flowakScreens
  },
  {
    id: "sion-ministry",
    title: "Sion Ministry v2 (Sion Academy)",
    category: { id: "Fullstack Platform", en: "Fullstack Platform" },
    location: { id: "2026 | PLATFORM PEMURIDAN & KOMUNITAS OFFLINE-FIRST", en: "2026 | OFFLINE-FIRST DISCIPLESHIP & LMS PLATFORM" },
    role: { id: "FULLSTACK DEVELOPER", en: "FULLSTACK DEVELOPER" },
    headline: {
      id: "PLATFORM MANAJEMEN PEMURIDAN OFFLINE-FIRST, MODUL BELAJAR MEDIUM-STYLE, & PETA PELAYANAN INDONESIA",
      en: "OFFLINE-FIRST DISCIPLESHIP PLATFORM, MEDIUM-STYLE LEARNING MODULES & INDONESIA MINISTRY MAP"
    },
    description: {
      id: "Platform web offline-first untuk mengelola pertumbuhan pemuridan lintas kota dan kampus di Indonesia, dilengkapi Modul Belajar bergaya Medium, peta distribusi interaktif, jurnal PA, laporan berita acara S3, crowdfunding misi, dan RBAC 3-peran.",
      en: "An offline-first web platform for managing nationwide discipleship across Indonesian cities and campuses, featuring a Medium-style module reader/editor, interactive Indonesia map analytics, PA journals, S3 activity reports, mission crowdfunding, and 3-role RBAC."
    },
    fullDescription: {
      id: "Sion Ministry v2 (Sion Academy) dirancang bagi organisasi pelayanan dan pekerja lapangan di seluruh Indonesia. Menggunakan arsitektur offline-first (SionDatabase LocalStorage Cache + Sync Manager + Lazy Per-Page Resource Fetching), pekerja tetap dapat mencatat data jemaat, jurnal Pendalaman Alkitab (PA), dan berita acara di wilayah minim sinyal lalu menyinkronkannya secara transaksional ke server Go Fiber v2. Pembaruan v2 menghadirkan Peta Interaktif Persebaran Pelayanan Indonesia (kota & kampus), Modul Belajar dengan tampilan baca & editor bergaya Medium (multi-quote parser, gambar inline terkompresi, kategori kustom), penyimpanan avatar & foto ke Supabase S3 Storage, beranda kontekstual untuk 3 peran (Admin, Pekerja, Jemaat), alur registrasi publik dengan persetujuan admin, serta pemantauan error via Sentry.",
      en: "Sion Ministry v2 (Sion Academy) empowers field workers and spiritual communities across Indonesia. Built with an offline-first architecture (SionDatabase LocalStorage Cache, Sync Manager queue, and lazy per-route resource fetching), workers can record member progress, Bible study (PA) journals, and service reports without internet and sync transactionally to the Go Fiber v2 backend once online. Version 2 introduces an interactive Indonesia Ministry Distribution Map (cities & campuses), a full-width Medium-style Learning Module reader and authoring suite (multi-quote parser, compressed inline images, custom categories), Supabase S3 object storage for avatars and photos, role-specific homes (Admin, Worker, Member), public registration with admin approval workflow, security audit logs, and Sentry observability."
    },
    problem: {
      id: "Pekerja pelayanan di berbagai daerah dan kampus sering mengalami kendala sinyal internet saat melaporkan kegiatan, membutuhkan ruang baca kurikulum digital yang nyaman, serta memerlukan pemetaan pertumbuhan jemaat nasional yang terpusat dan aman.",
      en: "Field workers across remote regions and campuses face unstable connectivity when logging ministry reports, lack a clean digital curriculum publishing experience, and need centralized nationwide analytics with strict role security."
    },
    contribution: {
      id: "Merancang arsitektur offline-first & deduplikasi request di React 19 + Vite 6, merombak Modul Belajar dengan Medium-style reader & authoring page, membuat visualisasi Peta Indonesia & grafik Recharts 3, serta mengembangkan backend Go 1.25.4 (Fiber v2, GORM, raw SQL migrations `go:embed`, AWS S3 SDK v2 / Supabase Storage, Google OAuth2, RBAC & Audit Log).",
      en: "Engineered the React 19 + Vite 6 offline-first sync layer and GET request deduplication, redesigned Learning Modules with a Medium-style reader and authoring pages, built the interactive Indonesia Map and Recharts 3 dashboards, and developed the Go 1.25.4 Fiber v2 backend with embedded SQL migrations, Supabase S3 storage, Google OAuth2, 3-role RBAC, and N+1 query optimizations."
    },
    impact: {
      id: "Memungkinkan pelaporan pelayanan tanpa henti di kondisi offline maupun online, menyajikan pengalaman belajar kurikulum digital setara platform publikasi modern, dan memetakan pertumbuhan komunitas lintas kota/kampus secara akurat.",
      en: "Enables uninterrupted offline/online field reporting, delivers an editorial-grade digital curriculum reading experience, and provides real-time national visibility across Indonesian cities and campuses."
    },
    image: "/assets/projects/sion-ministry/screenshots/02-dashboard.png",
    video: "/assets/projects/sion-ministry/videos/demo.mp4",
    hasVideoFile: true,
    tags: ["Offline-First Platform", "Medium-Style LMS", "Indonesia Map Analytics", "Go Fiber v2", "Supabase S3 Storage", "3-Role RBAC"],
    techStack: [
      "React 19",
      "Vite 6",
      "TypeScript",
      "Tailwind CSS v4",
      "Motion",
      "Anime.js v4",
      "Recharts 3",
      "Offline-First Sync Engine",
      "Go 1.25.4 (Fiber v2)",
      "GORM & Go Embed SQL",
      "PostgreSQL 15+",
      "Supabase Storage (AWS S3 SDK v2)",
      "Google OAuth2",
      "Sentry Go",
      "Google Gemini AI",
      "Docker Compose"
    ],
    highlights: {
      id: [
        "Offline-First Sync Engine + Lazy Per-Page API Fetching & Eliminasi Query N+1",
        "Modul Belajar Full-Width Bergaya Medium (Dedicated Authoring, Multi-Quote Parser & Inline Images)",
        "Peta Interaktif Persebaran Kota/Kampus Indonesia, RBAC 3-Role (Admin/Pekerja/Jemaat) & Supabase S3"
      ],
      en: [
        "Offline-First Sync Engine + Lazy Per-Route API Fetching & N+1 Query Elimination",
        "Full-Width Medium-Style Learning Modules (Dedicated Authoring, Multi-Quote Parser & Inline Images)",
        "Interactive Indonesia City/Campus Distribution Map, 3-Role RBAC & Supabase S3 Avatar Storage"
      ]
    },
    githubLink: "https://github.com/sionministry/sionministry-v2",
    previewTone: "from-violet-600 via-indigo-600 to-amber-500",
    screens: sionMinistryScreens
  },
  {
    id: "ministry-scheduling",
    title: "Ministry Scheduling",
    category: { id: "Fullstack System", en: "Fullstack System" },
    location: { id: "2026 | SISTEM PENJADWALAN & DENAH INTERAKTIF", en: "2026 | INTERACTIVE SELF-SCHEDULING SYSTEM" },
    role: { id: "FULLSTACK DEVELOPER", en: "FULLSTACK DEVELOPER" },
    headline: {
      id: "SISTEM SELF-SCHEDULING PELAYANAN DENGAN DENAH INTERAKTIF SVG & PERTUKARAN JADWAL PEER-TO-PEER",
      en: "SELF-SCHEDULING PLATFORM WITH INTERACTIVE SVG FLOORPLAN & PEER-TO-PEER SHIFT SWAPS"
    },
    description: {
      id: "Aplikasi manajemen dan self-scheduling jadwal pelayanan bulanan (Usher, Greeter, Operational Manager) berbasis denah interaktif SVG Main Hall, validasi kuota otomatis, pertukaran shift peer-to-peer, dan login Google SSO.",
      en: "A monthly volunteer self-scheduling system for Ushers, Greeters, and Operational Managers featuring an interactive SVG Main Hall floorplan, automated quota validation, peer-to-peer shift swaps, and Google SSO."
    },
    fullDescription: {
      id: "Church Ministry Self-Scheduling System menggantikan penyusunan jadwal manual yang rumit dengan platform mandiri yang transparan dan interaktif. Pelayan dapat memilih langsung titik posisi pelayanan Usher pada denah visual SVG Main Hall (Samping Kiri/Kanan, Tengah Kiri/Kanan, Balkon, Kolekte), memilih gerbang Greeter (Pintu Utama, Lobby, Selasar), atau stasiun Operational Manager (OM 1–4). Sistem secara ketat memvalidasi aturan kuota domain (kewajiban bulanan, maksimal 1 shift per hari dan 3 shift per bulan), memfasilitasi pengajuan pertukaran jadwal antar pelayan (Peer-to-Peer Shift Swap) dengan notifikasi email otomatis dan persetujuan koordinator, serta menyediakan Dashboard Koordinator untuk manajemen role dan ekspor jadwal (CSV/Cetak).",
      en: "The Church Ministry Self-Scheduling System replaces error-prone manual spreadsheet rosters with an interactive, rule-driven self-service platform. Volunteers visually pick their Usher stations directly on an interactive SVG Main Hall floorplan (Left/Right Wings, Center Aisles, Balcony, Offering), select Greeter gates (Main Entrance, Lobby, Corridor), or claim Operational Manager stations (OM 1–4). The Clean Architecture NestJS 11 + Fastify backend enforces domain quota rules (monthly minimum obligations, max 1 shift/day and 3 shifts/month), orchestrates Peer-to-Peer Shift Swap requests with automated Nodemailer email notifications and coordinator approval, and equips leaders with a Coordinator Dashboard for Google SSO role approvals and CSV/print schedule exports."
    },
    problem: {
      id: "Koordinator pelayanan membutuhkan waktu berhari-hari setiap bulan untuk menyusun jadwal ratusan relawan secara manual lewat chat, sering terjadi bentrok jadwal, posisi kosong di hari H, serta kesulitan melacak pertukaran shift mendadak.",
      en: "Ministry coordinators spend days every month manually assembling volunteer rosters via chat apps, leading to double-bookings, unfilled stations on Sunday, and untracked last-minute shift swaps."
    },
    contribution: {
      id: "Merancang komponen Denah Interaktif SVG Main Hall dan selector stasiun di React 19 + Vite 6 + Tailwind CSS v4, membangun backend NestJS 11 + Fastify dengan Clean Architecture (Domain, Application, Infrastructure, Presentation), skema PostgreSQL 16 + Prisma ORM v6, Google OAuth2 SSO, serta layanan email Nodemailer.",
      en: "Designed the interactive SVG Main Hall floorplan and station selectors in React 19 + Vite 6 + Tailwind CSS v4, built the NestJS 11 + Fastify backend using Clean Architecture layers, authored the PostgreSQL 16 + Prisma v6 transactional schema, and integrated Google OAuth2 SSO and Nodemailer email notifications."
    },
    impact: {
      id: "Memangkas waktu penyusunan jadwal bulanan secara drastis melalui self-scheduling mandiri yang tervalidasi otomatis, menjamin keterisian setiap titik pelayanan, dan mendokumentasikan setiap pertukaran jadwal secara transparan.",
      en: "Drastically cuts monthly roster preparation time through rule-validated self-scheduling, ensures 100% station visibility across services, and provides an auditable peer-to-peer shift swap workflow."
    },
    video: "/assets/projects/ministry-scheduling/videos/demo.mp4",
    hasVideoFile: false,
    tags: ["Self-Scheduling System", "Interactive SVG Floorplan", "Peer-to-Peer Shift Swap", "NestJS 11 & Fastify", "Prisma & PostgreSQL", "Google SSO"],
    techStack: [
      "React 19",
      "TypeScript",
      "Vite 6",
      "Tailwind CSS v4",
      "Motion",
      "Canvas Confetti",
      "NestJS 11 (Clean Architecture)",
      "Fastify Adapter",
      "Prisma ORM v6",
      "PostgreSQL 16",
      "JWT & Google OAuth2 SSO",
      "Nodemailer (SMTP)",
      "Fastify Helmet & Throttler",
      "Jest & Prettier",
      "Docker Compose"
    ],
    highlights: {
      id: [
        "Denah Visual Interaktif SVG Main Hall (Usher) + Selector Gerbang Greeter & Stasiun OM 1–4",
        "Validasi Domain Kuota Pelayanan Bulanan & Alur Peer-to-Peer Shift Swap dengan Notifikasi Email",
        "Backend NestJS 11 + Fastify Clean Architecture, Prisma ORM, Google OAuth2 SSO & Ekspor CSV/Cetak"
      ],
      en: [
        "Interactive SVG Main Hall Floorplan (Usher) + Greeter Gate & OM 1–4 Station Selectors",
        "Automated Monthly Quota Invariant Validation & Peer-to-Peer Shift Swaps with Email Alerts",
        "NestJS 11 + Fastify Clean Architecture Backend, Prisma ORM, Google OAuth2 SSO & CSV/Print Export"
      ]
    },
    githubLink: "https://github.com/Yosua13/ministry-schedule",
    previewTone: "from-cyan-500 via-blue-600 to-indigo-600",
    screens: ministrySchedulingScreens
  },
  {
    id: "logia-log",
    title: "Logia Log",
    category: { id: "Enterprise Observability", en: "Enterprise Observability" },
    location: { id: "2026 | OBSERVABILITAS, API STUDIO & DIAGNOSTIK AI", en: "2026 | OBSERVABILITY, API STUDIO & AI DIAGNOSTICS" },
    role: { id: "BACKEND / PLATFORM ENGINEER", en: "BACKEND / PLATFORM ENGINEER" },
    headline: {
      id: "OBSERVABILITAS LOG REAL-TIME (SETARA GRAFANA), API TESTING STUDIO (SETARA POSTMAN) & DIAGNOSTIK AI 7-LAPIS",
      en: "UNIFIED REAL-TIME LOG OBSERVABILITY, INTERACTIVE API TESTING STUDIO & 7-LAYER GITHUB AI DIAGNOSTICS"
    },
    description: {
      id: "Platform observabilitas enterprise target-agnostik yang menggabungkan Live Log Explorer (setara Grafana), Interactive API Testing Studio (setara Postman), inspeksi DDL database dinamis, dan mesin diagnostik AI GitHub 7-lapis di atas Java 25 Virtual Threads & Spring Boot 4.1.",
      en: "A target-agnostic enterprise observability platform uniting a Grafana-style Live Log Explorer, Postman-style API Testing Studio, dynamic read-only DB DDL inspection, and a 7-layer GitHub AI diagnostic engine powered by Java 25 Virtual Threads and Spring Boot 4.1."
    },
    fullDescription: {
      id: "Logia Log (Target-Agnostic Enterprise Edition) menyatukan tiga pilar rekayasa keandalan sistem dalam satu antarmuka taktis 60-30-10 Obsidian Black & Royal Gold. Modul 1 (Log Explorer) menyerap lonjakan trafik log melalui RabbitMQ 4.x (dengan Dead-Letter Exchange DLX/DLQ), melakukan sanitasi PII & deduplikasi fingerprint SHA-256 via Upstash Serverless Redis (TLS), menyimpan log ke tabel partisi PostgreSQL 18.4 (UUIDv7 & GIN Index JSONB), dan menyiarkannya secara real-time lewat Server-Sent Events (SSE). Modul 2 (API Testing Studio) menyediakan HTTP Proxy Engine bergaya Postman untuk menguji endpoint target. Modul 3/4 (7-Layer Deep GitHub AI Audit) mengkorelasikan stack trace error, skema DDL database target secara read-only, dan kode sumber asli dari GitHub REST/GraphQL API untuk menghasilkan analisis akar masalah (Root Cause Analysis) dan langkah remediasi presisi tinggi.",
      en: "Logia Log (Target-Agnostic Enterprise Edition) unifies three pillars of reliability engineering into a single 60-30-10 Obsidian Black & Royal Gold tactical workspace. Module 1 (Log Explorer) absorbs log spikes via RabbitMQ 4.x (with Dead-Letter Exchange DLX/DLQ), performs PII sanitization and SHA-256 fingerprint deduplication using Upstash Serverless Redis (TLS), persists records into range-partitioned PostgreSQL 18.4 tables (native UUIDv7 & JSONB GIN indexes), and broadcasts live streams over Server-Sent Events (SSE). Module 2 (API Testing Studio) provides a Postman-style HTTP Proxy Engine for probing target endpoints. Module 3/4 (7-Layer Deep GitHub AI Audit) correlates error stack traces, live read-only target database DDL schemas, and actual GitHub repository source files via REST/GraphQL to deliver precision root-cause analysis and remediation checklists."
    },
    problem: {
      id: "Saat terjadi insiden produksi, engineer harus berpindah-pindah antara dashboard log (Grafana), aplikasi uji API (Postman), skema database, dan repositori kode (GitHub) untuk menemukan akar masalah, yang memperlambat Mean Time to Resolution (MTTR).",
      en: "During production incidents, engineers waste critical time context-switching between log dashboards (Grafana), API clients (Postman), database schemas, and code repositories (GitHub) to pinpoint root causes, inflating Mean Time to Resolution (MTTR)."
    },
    contribution: {
      id: "Merancang arsitektur Hexagonal pada Java 25 LTS (Project Loom Virtual Threads) & Spring Boot 4.1.2, skema partisi PostgreSQL 18.4 (`uuidv7()`) + Flyway 12, konsumen RabbitMQ 4.x dengan DLX/DLQ, adapter deduplikasi & AI cooldown lock Upstash Redis TLS, inspektor DDL database read-only, HTTP Proxy Engine, klien diagnostik AI 7-lapis + GitHub Fetcher, serta frontend React 19 + TypeScript 6 + Vite 8 berarsitektur Feature-Sliced Design (FSD).",
      en: "Architected the Hexagonal Java 25 LTS (Project Loom Virtual Threads) and Spring Boot 4.1.2 backend, PostgreSQL 18.4 range-partitioned `uuidv7()` schema with Flyway 12, RabbitMQ 4.x spike-absorber with DLX/DLQ, Upstash Serverless Redis TLS deduplication and AI cooldown lock adapter, dynamic read-only DB DDL inspector, HTTP proxy engine, 7-layer GitHub AI diagnostic pipeline, and Feature-Sliced Design (FSD) React 19 + Vite 8 frontend."
    },
    impact: {
      id: "Menyatukan observabilitas log, pengujian API, inspeksi skema DB, dan audit kode berbasis AI dalam satu platform berkonkurensi tinggi, memangkas waktu investigasi insiden produksi secara signifikan.",
      en: "Consolidates live log observability, interactive API testing, DB schema inspection, and AI source-code auditing into a single high-concurrency platform, drastically reducing incident investigation time."
    },
    video: "/assets/projects/logia-log/videos/demo.mp4",
    hasVideoFile: false,
    tags: ["Grafana-Style Log Explorer", "Postman API Studio", "7-Layer GitHub AI Audit", "Java 25 Virtual Threads", "Spring Boot 4.1", "PostgreSQL 18 & Upstash Redis"],
    techStack: [
      "Java 25 LTS (Virtual Threads)",
      "Spring Boot 4.1.2 (Spring 7)",
      "Hexagonal Architecture",
      "PostgreSQL 18.4 (UUIDv7 & Partitioning)",
      "Flyway 12",
      "RabbitMQ 4.x (DLX / DLQ)",
      "Upstash Serverless Redis (TLS)",
      "Server-Sent Events (SSE)",
      "React 19",
      "TypeScript 6",
      "Vite 8",
      "Tailwind CSS v4",
      "Feature-Sliced Design (FSD)",
      "GitHub REST/GraphQL API",
      "Google Gemini AI (7-Layer Engine)"
    ],
    highlights: {
      id: [
        "Java 25 LTS Virtual Threads + Spring Boot 4.1.2 Hexagonal Architecture & PostgreSQL 18.4 (UUIDv7)",
        "MOD-01 Grafana Log Explorer (SSE + RabbitMQ DLQ + Upstash Redis Dedup) & MOD-02 Postman API Studio",
        "MOD-03/04 7-Layer Deep GitHub AI Diagnostic + Dynamic Read-Only DB Schema DDL Injection"
      ],
      en: [
        "Java 25 LTS Virtual Threads + Spring Boot 4.1.2 Hexagonal Architecture & PostgreSQL 18.4 (UUIDv7)",
        "MOD-01 Grafana Log Explorer (SSE + RabbitMQ DLQ + Upstash Redis Dedup) & MOD-02 Postman API Studio",
        "MOD-03/04 7-Layer Deep GitHub AI Diagnostic + Dynamic Read-Only DB Schema DDL Injection"
      ]
    },
    githubLink: "https://github.com/Yosua13/logia-log",
    previewTone: "from-amber-500 via-yellow-500 to-rose-600",
    screens: logiaLogScreens
  }
];

export function getProjectsData(language: Language): ProjectData[] {
  return rawProjectsData.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category[language],
    location: p.location[language],
    role: p.role[language],
    headline: p.headline[language],
    description: p.description[language],
    fullDescription: p.fullDescription[language],
    problem: p.problem[language],
    contribution: p.contribution[language],
    impact: p.impact[language],
    image: p.image,
    video: p.video,
    hasVideoFile: p.hasVideoFile,
    tags: p.tags,
    techStack: p.techStack,
    highlights: p.highlights[language],
    link: p.link,
    githubLink: p.githubLink,
    previewTone: p.previewTone,
    isWip: p.isWip,
    screens: p.screens.map((s) => ({
      title: s.title[language],
      caption: s.caption[language],
      image: s.image,
      aspectRatio: s.aspectRatio,
      moduleTag: s.moduleTag
    }))
  }));
}

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

function ProjectArchitecturePreview({
  project,
  language
}: {
  project: ProjectData;
  language: Language;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-slate-950 p-5 sm:p-6 flex flex-col justify-between text-left select-none">
      <div className={`absolute -top-20 -right-20 h-56 w-56 rounded-full bg-gradient-to-br ${project.previewTone} opacity-20 blur-3xl pointer-events-none`} />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      {/* Top Window Header */}
      <div className="relative z-10 flex items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-2 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 truncate">
            {project.id} — architecture
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-emerald-300">
          <CheckCircle2 className="h-3 w-3 text-emerald-400" />
          {language === "id" ? "Rilis & Terbuka" : "Released"}
        </span>
      </div>

      {/* Middle Module Highlights */}
      <div className="relative z-10 my-auto py-3 space-y-2.5">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300">
          <Layers className="h-3.5 w-3.5 text-indigo-400" />
          {language === "id" ? "Sorotan Modul & Arsitektur" : "Core Modules & Architecture"}
        </div>

        <div className="space-y-2">
          {project.highlights.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-[11px] text-slate-200 font-medium leading-snug flex items-start gap-2.5"
            >
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-[9px] font-black text-indigo-300">
                {idx + 1}
              </span>
              <span className="line-clamp-2">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Stack & Media Status Footer */}
      <div className="relative z-10 flex items-center justify-between gap-2 border-t border-white/10 pt-2.5">
        <div className="flex flex-wrap gap-1.5 overflow-hidden max-h-6">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] font-mono font-bold text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>
        <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-indigo-300 shrink-0">
          <Sparkles className="h-3 w-3" />
          {language === "id" ? `${project.screens.length} Modul UI` : `${project.screens.length} UI Modules`}
        </span>
      </div>
    </div>
  );
}

function ProjectPreviewVideo({
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
    <div className="relative h-full w-full overflow-hidden bg-slate-950">
      <video
        ref={videoRef}
        src={project.video}
        onError={() => setVideoError(true)}
        className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
        muted
        loop
        playsInline
        preload="metadata"
      />

      <div className={`pointer-events-none absolute bottom-9 left-0 right-0 flex justify-center transition-opacity duration-500 ${isPreviewPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
        <div className="project-preview-badge flex items-center gap-2 rounded-full border border-white/20 bg-black/55 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white shadow-2xl backdrop-blur-md">
          <Play className="h-3.5 w-3.5 fill-white" />
          {isPreviewPlaying
            ? (language === "id" ? "Memutar Demo" : "Playing Demo")
            : (language === "id" ? "Arahkan Kursor untuk Putar" : "Hover to Play")}
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
  setSelectedProject,
  language
}: {
  project: ProjectData;
  index: number;
  setSelectedProject: (project: ProjectData) => void;
  language: Language;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);

  const playPreview = () => {
    if (!project.hasVideoFile) return;
    const video = videoRef.current;
    if (!video) return;

    setIsPreviewPlaying(true);
    void video.play().catch(() => setIsPreviewPlaying(false));
  };

  const stopPreview = () => {
    if (!project.hasVideoFile) return;
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
        {project.image && (
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
                      title={language === "id" ? "Lihat Repositori GitHub" : "View GitHub Repository"}
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
                      title={language === "id" ? "Kunjungi Website Live" : "Visit Live Website"}
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
              className="project-details-button inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black cursor-pointer"
            >
              {language === "id" ? "Lihat Detail Proyek" : "View Details"}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center p-5 sm:p-8 md:p-10">
          <div className="relative w-full max-w-xl overflow-hidden rounded-[22px] border border-white/10 bg-slate-950 shadow-2xl shadow-black/80 aspect-[16/10] transition-transform duration-500 ease-out group-hover:scale-[1.02]">
            <ProjectPreviewVideo
              project={project}
              videoRef={videoRef}
              isPreviewPlaying={isPreviewPlaying}
              language={language}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsSection({ setSelectedProject }: ProjectsSectionProps) {
  const { language } = useLanguage();
  const projects = getProjectsData(language);

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
          topText={language === "id" ? "Karya Unggulan" : "Featured Works"}
          mainText={language === "id" ? "Projects" : "Projects"}
          subText={language === "id" ? "Ringkasan Sistem" : "Overview"}
          bottomText={
            language === "id"
              ? "Arsitektur kelas produksi & sistem perangkat lunak yang telah dibangun"
              : "Production-grade architectures & real-world software systems built from scratch"
          }
          watermark="YOSUA"
        />
      </motion.div>

      <div className="flex flex-col gap-12">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            setSelectedProject={setSelectedProject}
            language={language}
          />
        ))}
      </div>
    </motion.section>
  );
}
