# 🚀 Yosua Reynaldi Manurun — Personal Portfolio Website

Selamat datang di repository web portofolio interaktif **Yosua Reynaldi Manurun (Yos'z)** — Software Engineer & Fullstack/Backend Developer. 

Aplikasi web ini dibangun dengan **Next.js**, **TypeScript**, **Tailwind CSS**, dan **Framer Motion**, menghadirkan pengalaman visual modern, interaktif, serta showcase lengkap untuk berbagai proyek aplikasi web fullstack dan backend yang telah dibangun.

---

## 🌟 Unggulan Proyek (Featured Projects)

Portofolio ini menampilkan 4 proyek utama yang dikembangkan dengan arsitektur modern dan teknologi terdepan:

### 1. 🏢 [Lapor Kos](https://lapor-kos.vercel.app/)
* **Kategori**: Fullstack Application (Boarding House Operations & Billing Management)
* **Peran**: Fullstack Developer (2026)
* **Deskripsi**: Platform manajemen kos-kosan komprehensif yang mempermudah pemilik kos mengelola ketersediaan kamar, kontrak penghuni, riwayat pembayaran, pengingat tagihan otomatis via WhatsApp (Fonnte), serta penanganan komplain fasilitas.
* **Fitur Utama**: Dashboard pemilik & penghuni, manajemen kamar & harga, laporan keuangan, kalender pembayaran, sistem komplain fasilitas, serta pengingat tagihan.
* **Tech Stack**: Next.js, Tailwind CSS, Golang (Gin), Supabase, Fonnte API, Gemini API, Vercel, Railway.
* **Live Web**: [https://lapor-kos.vercel.app/](https://lapor-kos.vercel.app/)

---

### 2. ⚡ Flowak
* **Kategori**: Fullstack Application (IT Project Workflow & Task Orchestration)
* **Peran**: Product / Fullstack Developer (2026)
* **Deskripsi**: Aplikasi manajemen alur kerja dan tugas proyek IT. Membantu tim pengembang memetakan arsitektur flow, membagi pekerjaan menjadi task terukur, memantau kendala (blockers), serta menjaga visibilitas progres antar divisi (Design, Frontend, Backend, QA, Deployment).
* **Fitur Utama**: Interactive Flow Board, Kanban Task Board, Kanvas visual arsitektur proyek, AI Flow Audit (Gemini API), analitik kecepatan sprint, dan mock payload generator.
* **Tech Stack**: React, TypeScript, Vite, Tailwind CSS, Zustand, Go (Gin), PostgreSQL, JWT, Gemini API.

---

### 3. 🏛️ Sion Ministry
* **Kategori**: Fullstack Application (Spiritual Portal & Community Operations)
* **Peran**: Fullstack Developer (2026)
* **Deskripsi**: Hub digital untuk mendukung operasional komunitas pelayanan gereja. Memfasilitasi anggota jemaat dalam melihat jadwal ibadah, mendaftar kegiatan/retret, menyampaikan permohonan doa, serta memberikan akses admin untuk mengkoordinasikan jadwal dan laporan absensi.
* **Fitur Utama**: Jadwal ibadah & pembicara, pendaftaran kegiatan, Kanal Doa interaktif, Jurnal PA (Penelaahan Alkitab), Sion Care & Donasi sosial, Sion Careers, serta berita acara gereja.
* **Tech Stack**: Next.js, Tailwind CSS, Go (Gin), PostgreSQL, Supabase, Gemini API.

---

### 4. 🛠️ Logia Log *(Work in Progress)*
* **Kategori**: Backend & Tooling (Server Observability & Log Diagnostic Tool)
* **Peran**: Backend / Tooling Developer (2026)
* **Deskripsi**: Alat diagnostik log server/VM untuk membaca log sistem, mendeteksi pola anomali, mengelompokkan severity kesalahan, dan menghasilkan rekomendasi perbaikan berbasis AI secara otomatis.
* **Fitur Utama**: Live Log Stream, Error Clustering, AI-Assisted Root Cause Diagnosis (Gemini API), RabbitMQ async analysis queue, serta Incident Report Exporter.
* **Status**: *Under Active Development (Work in Progress)*
* **Tech Stack**: React, TypeScript, Vite, Tailwind CSS, Java (Spring Boot), JWT, RabbitMQ, Gemini API.

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
