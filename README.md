# 🚀 Yosua Reynaldi Manurun — Personal Portfolio Website

Selamat datang di repository web portofolio interaktif **Yosua Reynaldi Manurun (Yos'z)** — Software Engineer & Fullstack/Backend Developer. 

Aplikasi web ini dibangun dengan **Next.js**, **TypeScript**, **Tailwind CSS**, dan **Framer Motion**, menghadirkan pengalaman visual modern, interaktif, serta showcase lengkap untuk berbagai proyek aplikasi web fullstack dan backend yang telah dibangun.

---

## 🌟 Unggulan Proyek (Featured Projects)

Portofolio ini menampilkan 4 proyek utama yang dikembangkan dengan arsitektur modern dan teknologi terdepan:

### 1. 🏢 [Lapor Kos](https://lapor-kos.vercel.app/)
* **Kategori**: Fullstack Application (Boarding House Operations & Billing Management)
* **Peran**: Fullstack Developer (2026)
* **Deskripsi**: Platform manajemen kos-kosan komprehensif yang mengotomatisasi pencatatan kamar, perhitungan tagihan sewa bulanan, bukti transaksi & kwitansi digital, kalender pengingat jatuh tempo kontrak, pengiriman notifikasi WhatsApp otomatis via Fonnte, klasifikasi prioritas perbaikan fasilitas berbasis AI Google Gemini, serta pembuat laporan keuangan PDF instan.
* **Fitur Utama**: Room Visualizer, Billing Engine otomatis, Payment Tracking & Kwitansi Digital, Kalender Kontrak & Checkout, Klasifikasi Keluhan AI (Gemini), WhatsApp Gateway (Fonnte), dan Export Laporan Keuangan PDF (Gofpdf).
* **Tech Stack**: Next.js 15, React, TypeScript, Tailwind CSS, Go (Gin), PostgreSQL, Supabase, Fonnte WhatsApp API, Google Gemini AI, Gofpdf, Docker & Docker Compose, Vercel, Railway.
* **Repository**: [github.com/Yosua13/lapor-kos](https://github.com/Yosua13/lapor-kos)
* **Live Web**: [https://lapor-kos.vercel.app/](https://lapor-kos.vercel.app/)

---

### 2. ⚡ [Flowak](https://github.com/Yosua13/flowak)
* **Kategori**: Fullstack Application (AI-Powered Business Process Modeler & System Architect)
* **Peran**: Product / Fullstack Developer (2026)
* **Deskripsi**: Platform kolaboratif berbasis graf untuk memodelkan proses bisnis dan merancang arsitektur sistem teknis secara visual. Mengintegrasikan Google Gemini AI untuk mengonversi deskripsi kebutuhan bisnis menjadi diagram alur kerja teknis otomatis, audit risiko/bottleneck, dan pembuatan sampel payload JSON request/response.
* **Fitur Utama**: Canvas Flow Modeler, Generasi Alur AI, Audit Bottleneck & Celah Keamanan AI, Auto Mock Payload JSON, Pembagian Tugas Peran (UI/UX, Frontend, Backend), Kanban Task Board, dan Arsitektur Standalone (Express) & Full-Stack (Go + PostgreSQL).
* **Tech Stack**: React 19, TypeScript, Vite, Tailwind CSS v4, Zustand, Go (Gin), PostgreSQL, GORM, JWT, Express.js Proxy, Google Gemini AI (`@google/genai`).
* **Repository**: [github.com/Yosua13/flowak](https://github.com/Yosua13/flowak)

---

### 3. 🏛️ [Sion Ministry](https://github.com/Yosua13/sion-ministry)
* **Kategori**: Fullstack Application (Offline-First Discipleship Tracking & Spiritual Portal)
* **Peran**: Fullstack Developer (2026)
* **Deskripsi**: Platform manajemen dan pemantauan pemuridan (*discipleship tracking*) berpendekatan **offline-first**. Memungkinkan pekerja pelayanan tetap menginput data jemaat, berita acara, jurnal PA, dan donasi misi di daerah terpencil tanpa koneksi internet, lalu menyinkronkannya secara otomatis saat online.
* **Fitur Utama**: Offline-First Storage & Auto Sync Manager, Dashboard Statistik Real-time, Tracking Tahap Pemuridan & Mentor-Mentee, Berita Acara & Jurnal PA, Donasi Misi, Papan Lowongan Pelayanan, serta Asisten AI Teologi (Google Gemini API).
* **Tech Stack**: React 19, Vite 6, TypeScript, Tailwind CSS v4, Motion (Framer Motion), LocalStorage Cache (SionDatabase), Go (Fiber v2), GORM, PostgreSQL 15+, Google Gemini API (`gemini-3.5-flash`).
* **Repository**: [github.com/Yosua13/sion-ministry](https://github.com/Yosua13/sion-ministry)

---

### 4. 🛠️ [Logia Log](https://github.com/Yosua13/logia-log) *(Work in Progress)*
* **Kategori**: Backend & Tooling (Real-Time Server Log Diagnostics & AI Observability Tool)
* **Peran**: Backend / Tooling Developer (2026)
* **Deskripsi**: Alat observabilitas dan diagnostik log server/VM real-time. Membaca stream log sistem, mengelompokkan stack trace berdasarkan severity error, menganalisis akar masalah (*Root Cause Analysis*) berbasis AI Google Gemini, serta memberikan daftar rekomendasi perintah penanganan teknis untuk mempercepat TTR.
* **Fitur Utama**: Live Log Stream (WebSocket), Error Stack Trace Clustering, AI-Assisted Root Cause Diagnosis (Gemini API), Async Processing Queue (RabbitMQ AMQP), serta Export Incident Report.
* **Status**: *Under Active Development (Work in Progress)*
* **Tech Stack**: React 19, TypeScript, Vite, Tailwind CSS v4, Java 21, Spring Boot (Web, Security, Data JPA, WebSocket, AMQP), RabbitMQ, PostgreSQL, Google Gemini AI.
* **Repository**: [github.com/Yosua13/logia-log](https://github.com/Yosua13/logia-log)

---

## 🎨 Fitur Interaktif & Keunggulan UI/UX

- 🕹️ **WASD Flight Control (Play Mode)**: Fitur mini-game interaktif yang memungkinkan pengunjung menerbangkan pesawat menjelajahi beranda utama menggunakan tombol kemudi WASD & Space.
- 🎬 **Video Demo & Carousel Screenshot**: Card proyek dilengkapi pratinjau video demo yang otomatis berputar saat di-hover, serta modal detail proyek dengan carousel screenshot rasio natural.
- 🎵 **Background Music Player**: Pemutar musik interaktif yang dapat diaktifkan dari layar sambutan (*Welcome Screen*).
- 🌓 **Theme Switching (Dark / Light Mode)**: Dukungan mode gelap (*Dark Mode*) default bernuansa dark tech cybernetic serta mode terang (*Light Mode*).
- 📱 **Responsive & Smooth Animations**: Desain responsif di seluruh ukuran layar menggunakan Framer Motion dan Tailwind CSS.

---

## 🛠️ Teknologi & Arsitektur (Tech Stack)

### Frontend & UI Design
- **Framework**: Next.js (App Router), React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS, CSS Modules
- **Animation**: Framer Motion
- **Icons**: Lucide Icons

### Backend & Integrations
- **Languages**: Golang (Gin Framework), Java (Spring Boot)
- **Databases & Cloud**: PostgreSQL, Supabase, Railway, Vercel
- **AI & Messaging**: Gemini API, RabbitMQ, Fonnte API

---

## 📁 Struktur Folder Proyek

```text
portofolio/
├── public/
│   └── assets/
│       ├── audio/               # Asset suara & efek musik
│       ├── documents/           # Curriculum Vitae (CV) PDF
│       ├── images/              # Foto profil & ilustrasi
│       └── projects/            # Asset media per proyek (screenshots & videos)
│           ├── flowak/
│           ├── lapor-kos/
│           ├── logia-log/
│           └── sion-ministry/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Main App Layout & Font Setup
│   │   ├── page.tsx             # Main Page & Project Details Modal
│   │   └── globals.css          # Design System & Global Utility Styles
│   └── components/
│       ├── ContactSection.tsx   # Form kontak & tautan sosial
│       ├── CvSection.tsx        # Section CV & download resume
│       ├── HeroSection.tsx      # Landing hero & WASD flight game logic
│       ├── JourneySection.tsx   # Timeline perjalanan karier & pendidikan
│       ├── MusicPlayer.tsx      # Component pemutar musik background
│       ├── ProfileSection.tsx   # Profil singkat & keahlian utama
│       ├── ProjectsSection.tsx  # Showcase proyek utama & kartu interaktif
│       ├── RecruiterSnapshot.tsx# Ringkasan cepat untuk recruiter
│       ├── SkillsSection.tsx    # Daftar keahlian teknis & tools
│       ├── WelcomeScreen.tsx    # Interactive introductory landing modal
│       └── WhatIDoSection.tsx   # Spesialisasi & bidang pengerjaan
└── StyleProject.md              # Panduan ukuran & spesifikasi asset proyek
```

---

## 💻 Cara Menjalankan Secara Lokal (Getting Started)

### Prasyarat
- Node.js versi 18.x atau lebih baru
- npm / yarn / pnpm

### Langkah Instalasi

1. **Clone repository ini**:
   ```bash
   git clone https://github.com/Yosua13/portofolio.git
   cd portofolio
   ```

2. **Install dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan development server**:
   ```bash
   npm run dev
   ```

4. **Buka di browser**:
   Akses `http://localhost:3000` di browser Anda.

### Perintah Pembangunan (Build & Production)

- **Cek tipe TypeScript**:
  ```bash
  npx tsc --noEmit
  ```

- **Build bundle produksi**:
  ```bash
  npm run build
  ```

- **Jalankan server produksi**:
  ```bash
  npm start
  ```

---

## 📬 Kontak & Media Sosial

- **Name**: Yosua Reynaldi Manurun
- **Email**: [reyyosua29@gmail.com](mailto:reyyosua29@gmail.com)
- **GitHub**: [github.com/Yosua13](https://github.com/Yosua13)
- **LinkedIn**: [linkedin.com/in/yosua-reynaldi-manurun/](https://www.linkedin.com/in/yosua-reynaldi-manurun/)

---

© 2026 Yosua Reynaldi Manurun. All rights reserved.
