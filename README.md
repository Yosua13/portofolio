# 🚀 Yosua Reynaldi Manurun — Personal Portfolio & Software Engineering Solutions

Selamat datang di repository web portofolio interaktif **Yosua Reynaldi Manurun (Yos'z)** — Fullstack/Backend Software Engineer & Digital Solutions Partner.

Aplikasi web ini dibangun dengan **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **Three.js**, dan **Framer Motion**, dilengkapi fitur **Bilingual (Bahasa Indonesia & Bahasa Inggris)**, **Dark/Light Mode**, serta showcase untuk **5 proyek perangkat lunak utama** dan **Solusi Digitalisasi UMKM & Kemitraan Perusahaan (B2B)**.

---

## 🌟 5 Proyek Unggulan (Featured Projects)

### 1. 🏢 [Lapor Kos](https://lapor-kos.vercel.app/)
* **Kategori**: Fullstack SaaS (Multi-Property Boarding Management, Midtrans Payment & AI Triage)
* **Peran**: Fullstack Developer (2026)
* **Deskripsi**: Platform manajemen hunian kos pintar dua arah (Pemilik & Penghuni) dengan isolasi multi-properti, visualisasi kamar per lantai, mesin penagihan bulanan otomatis, **Dual Payment Flow via Midtrans Snap Sandbox (VA BCA/Mandiri/BNI/BRI/Permata, QRIS, E-Wallet)** lengkap dengan verifikasi webhook `SHA-512` & auto-sync maupun transfer manual, penerbitan kwitansi PDF digital ber-hash `SHA-256`, manajemen pindah kamar & inspeksi checkout, izin tamu dengan QR Visitor Pass, triase keluhan fasilitas berbasis Google Gemini AI, serta pengingat WhatsApp otomatis via Fonnte.
* **Tech Stack**: React 19, Vite 8, TypeScript, React Router v7, Tailwind CSS v4, Zod, FullCalendar, Go 1.25 (Gin - Hexagonal Architecture), PostgreSQL 15+ (`pgx/v5`), Supabase Storage, Redis 7, RabbitMQ 3.13, Midtrans Payment Gateway, Google Gemini AI, Fonnte WhatsApp API, Gofpdf, Gomail (SMTP/OTP), Docker Compose.
* **Repository**: [github.com/Yosua13/lapor-kos](https://github.com/Yosua13/lapor-kos)
* **Live Web**: [https://lapor-kos.vercel.app/](https://lapor-kos.vercel.app/)

---

### 2. ⚡ [Flowak](https://github.com/Yosua13/flowak)
* **Kategori**: Fullstack SaaS (Traceability-Native Business Process Modeler & API Contract Runner)
* **Peran**: Product / Fullstack Developer (2026)
* **Deskripsi**: Platform SaaS kolaboratif berbasis *traceability-native* untuk memodelkan proses bisnis di kanvas graf interaktif, menyusun spesifikasi teknis lintas peran (Bisnis/SLA, UI/UX, Frontend, Backend), mengelola tiket pekerjaan (*Work Items*) di papan Kanban real-time via Server-Sent Events (SSE), serta menguji kontrak endpoint API (cURL runner) secara aman di sisi server.
* **Tech Stack**: React 19, TypeScript, Vite 6, Tailwind CSS v4, Zustand 5, TanStack React Query v5, Motion, Go 1.26 (Gin - Clean Architecture `1 File = 1 Function`), PostgreSQL (Multi-Tenant RBAC), Redis 9 (Redlock & Hot Graph Cache), RabbitMQ (Topic Exchange & Standalone Worker Daemon), Server-Sent Events (SSE), JWT & Argon2/Bcrypt, Google Gemini AI.
* **Repository**: [github.com/Yosua13/flowak](https://github.com/Yosua13/flowak)

---

### 3. 🏛️ [Sion Ministry v2 (Sion Academy)](https://github.com/sionministry/sionministry-v2)
* **Kategori**: Fullstack Platform (Offline-First Discipleship Tracking, Medium-Style LMS & Indonesia Map Analytics)
* **Peran**: Fullstack Developer (2026)
* **Deskripsi**: Platform manajemen pemuridan berpendekatan **offline-first** untuk pekerja pelayanan lintas kota dan kampus di Indonesia. Dilengkapi Peta Interaktif Persebaran Pelayanan Indonesia, Modul Belajar dengan halaman baca & editor bergaya Medium (*Medium-style reader & authoring*), Jurnal PA, Berita Acara dengan kompresi gambar & penyimpanan S3 Supabase Storage, Crowdfunding Misi, Papan Karier Pelayanan, RBAC 3-peran (Admin, Pekerja, Jemaat) dengan persetujuan registrasi publik, dan pemantauan Sentry.
* **Tech Stack**: React 19, Vite 6, TypeScript, Tailwind CSS v4, Motion, Anime.js v4, Recharts 3, LocalStorage Offline Cache (`SionDatabase`), Go 1.25.4 (Fiber v2), GORM, Go Embed SQL Migrations, PostgreSQL 15+, Supabase Storage (AWS S3 SDK v2), Google OAuth2, Sentry Go, Google Gemini AI.
* **Repository**: [github.com/sionministry/sionministry-v2](https://github.com/sionministry/sionministry-v2)

---

### 4. 📅 [Ministry Scheduling](https://github.com/Yosua13/ministry-schedule)
* **Kategori**: Fullstack System (Interactive SVG Floorplan Self-Scheduling & Peer-to-Peer Shift Swap)
* **Peran**: Fullstack Developer (2026)
* **Deskripsi**: Sistem manajemen dan *self-scheduling* pelayanan gereja bulanan untuk Usher, Greeter, dan Operational Manager (OM). Dilengkapi visualisasi denah interaktif SVG *Main Hall* untuk pemilihan posisi tugas, tracker kuota kewajiban bulanan dengan validasi aturan domain, alur pengajuan pertukaran jadwal (*Peer-to-Peer Shift Swap*) dengan notifikasi email Nodemailer otomatis, Dashboard Koordinator, login Google OAuth2 SSO, serta ekspor jadwal ke CSV/Cetak.
* **Tech Stack**: React 19, TypeScript, Vite 6, Tailwind CSS v4, Motion, Canvas Confetti, NestJS 11 (Clean Architecture), Fastify Adapter, Prisma ORM v6, PostgreSQL 16, JWT & Google OAuth2 SSO, Nodemailer (SMTP), Fastify Helmet & Throttler, Docker Compose.
* **Repository**: [github.com/Yosua13/ministry-schedule](https://github.com/Yosua13/ministry-schedule)

---

### 5. 🛠️ [Logia Log (Target-Agnostic Enterprise Edition)](https://github.com/Yosua13/logia-log)
* **Kategori**: Enterprise Observability & Developer Platform
* **Peran**: Backend / Platform Engineer (2026)
* **Deskripsi**: Platform observabilitas real-time target-agnostik yang menyatukan **MOD-01 Grafana-Style Live Log Explorer** (SSE streaming, RabbitMQ spike absorber + DLX/DLQ, Upstash Redis SHA-256 deduplication, PostgreSQL 18.4 UUIDv7 range-partitioned storage), **MOD-02 Postman-Style Interactive API Testing Studio** (HTTP Proxy Engine), dan **MOD-03/04 7-Layer Deep GitHub AI Diagnostic Platform** (korelasi stack trace error, inspeksi skema DDL database target secara *read-only*, dan *source code* GitHub REST/GraphQL) dalam antarmuka taktis *60-30-10 Obsidian Black & Royal Gold*.
* **Tech Stack**: Java 25 LTS (Project Loom Virtual Threads), Spring Boot 4.1.2 (Spring Framework 7 / Jakarta EE 11 - Hexagonal Architecture), PostgreSQL 18.4 (`uuidv7()` & Range Partitioning), Flyway 12, RabbitMQ 4.x (DLX/DLQ), Upstash Serverless Redis (TLS Lettuce Pool), Server-Sent Events (SSE), React 19, TypeScript 6, Vite 8, Tailwind CSS v4, Feature-Sliced Design (FSD), GitHub REST/GraphQL API, Google Gemini AI.
* **Repository**: [github.com/Yosua13/logia-log](https://github.com/Yosua13/logia-log)

---

## 💼 Solusi Bisnis & Digitalisasi (UMKM & Kemitraan Perusahaan)

Section **Solutions (`WhatIDoSection.tsx`)** dirancang untuk melayani kebutuhan digitalisasi bisnis UMKM maupun kolaborasi pengembangan sistem bersama perusahaan:
1. **Website Company Profile & Landing Page** — Profil usaha, katalog layanan, dan landing page promosi modern yang cepat, responsif, dan SEO-friendly.
2. **E-Commerce & Toko Online Mandiri** — Website jual-beli online lengkap dengan katalog produk, keranjang belanja, dan integrasi Payment Gateway (QRIS, Virtual Account, E-Wallet).
3. **Sistem Kasir (POS) & Inventori Stok** — Aplikasi Point of Sale (POS) kasir digital, cetak struk/kwitansi PDF, manajemen stok gudang, dan laporan keuangan otomatis.
4. **Sistem Operasional & Digitalisasi Bisnis** — Transformasi pembukuan manual menjadi sistem web/mobile terpusat (booking, manajemen properti/kos, CRM, dashboard admin).
5. **Otomatisasi Bisnis, WhatsApp & Integrasi AI** — Penjadwalan tagihan otomatis, pengiriman notifikasi pesanan/tagihan ke WhatsApp pelanggan, dan asisten AI.
6. **Kerjasama Perusahaan & Enterprise Software (B2B)** — Kolaborasi *project-based*, kontrak freelance, maupun *dedicated engineer* untuk pengembangan sistem backend/fullstack (*Java Spring Boot, Golang, NestJS, React/Next.js*).

---

## 🌐 Fitur Interaktif Portofolio

- 🇮🇩 / 🇬🇧 **Bilingual Language Switcher (ID / EN)**: Tombol pemilih bahasa Indonesia dan Inggris tepat di sebelah tombol tema (*Brightness / Light-Dark Mode*) pada navigasi atas.
- 🌓 **Theme Switching (Dark / Light Mode)**: Mode gelap cybernetic dan mode terang berkonotasi bersih.
- 🕹️ **WASD Flight Control (Play Mode)**: Mini-game pesawat 3D Three.js interaktif di halaman utama.
- 🎬 **Video Demo & Interactive Module/Screenshot Carousel**: Pratinjau video demo saat kartu proyek di-hover serta carousel screenshot & blueprint modul di modal detail.

---

## 💻 Cara Menjalankan Secara Lokal

```bash
npm install
npm run dev
```

Akses di `http://localhost:3000`.
