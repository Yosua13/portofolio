"use client";

import type { ReactNode } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import {
  RiBuilding2Fill,
  RiGlobalLine,
  RiRobot2Fill,
  RiStore3Fill
} from "react-icons/ri";
import { MdPointOfSale } from "react-icons/md";
import {
  FaHandshake,
  FaServer,
  FaTicket,
  FaWhatsapp
} from "react-icons/fa6";
import { TbApi } from "react-icons/tb";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/context/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface ServiceItem {
  num: string;
  eyebrow: string;
  icon: ReactNode;
  title: string;
  description: string;
  deliverables: string[];
  tags: string[];
  hasTicketTag?: boolean;
}

export default function WhatIDoSection() {
  const { language } = useLanguage();

  const umkmServices: ServiceItem[] = [
    {
      num: "01",
      eyebrow: language === "id" ? "BRANDING & KREDIBILITAS" : "BRANDING & TRUST",
      icon: <RiGlobalLine className="h-5 w-5" />,
      title:
        language === "id"
          ? "Company Profile & Landing Page"
          : "Company Profile & Landing Pages",
      description:
        language === "id"
          ? "Website profil usaha yang tampil meyakinkan, kencang di perangkat seluler, dan dirancang agar mudah ditemukan calon klien di Google."
          : "Editorial-grade business websites engineered for fast mobile loading, Google visibility, and qualified lead conversion.",
      deliverables:
        language === "id"
          ? [
              "Desain kustom responsif selaras identitas brand usaha Anda",
              "Integrasi tombol WhatsApp & formulir penawaran instan",
              "Struktur SEO-ready untuk menjangkau pencarian lokal maupun nasional"
            ]
          : [
              "Custom responsive architecture tailored to your brand identity",
              "Direct WhatsApp routing & structured inquiry lead capture",
              "SEO-ready semantic hierarchy built for search discovery"
            ],
      tags: ["Company Profile", "Landing Page", "SEO Ready"]
    },
    {
      num: "02",
      eyebrow: language === "id" ? "PENJUALAN MANDIRI" : "DIRECT COMMERCE",
      icon: <RiStore3Fill className="h-5 w-5" />,
      title:
        language === "id"
          ? "E-Commerce & Toko Online"
          : "E-Commerce & Online Stores",
      description:
        language === "id"
          ? "Etalase digital milik sendiri tanpa potongan komisi marketplace — lengkap dengan katalog produk, keranjang, dan pembayaran QRIS / Virtual Account."
          : "Commission-free digital storefronts owned end-to-end with searchable catalogs, cart flows, and automated local checkouts.",
      deliverables:
        language === "id"
          ? [
              "Katalog produk bervarian, promo harga & perhitungan ongkos kirim",
              "Pembayaran otomatis via QRIS, Virtual Account & Midtrans",
              "Dashboard admin terpusat untuk verifikasi pesanan real-time"
            ]
          : [
              "Variant product catalogs, pricing tiers & shipping calculators",
              "Automated QRIS, Virtual Account & Midtrans settlement",
              "Real-time fulfillment dashboard for incoming customer orders"
            ],
      tags:
        language === "id"
          ? ["Katalog & Cart", "QRIS / Midtrans", "Tanpa Komisi"]
          : ["Catalog & Cart", "QRIS / Midtrans", "Zero Commission"]
    },
    {
      num: "03",
      eyebrow: language === "id" ? "RETAIL, F&B & STOK" : "RETAIL, F&B & STOCK",
      icon: <MdPointOfSale className="h-5 w-5" />,
      title:
        language === "id"
          ? "Sistem Kasir (POS) & Inventori"
          : "Point of Sale (POS) & Inventory",
      description:
        language === "id"
          ? "Perangkat lunak kasir harian untuk kedai, toko retail, dan cabang usaha dengan kontrol stok gudang dan rekap laba-rugi yang rapi."
          : "Reliable cashier and warehouse tooling for retail & F&B operators with automated inventory tracking and daily profit clarity.",
      deliverables:
        language === "id"
          ? [
              "Transaksi kasir cepat + cetak struk thermal & invoice PDF",
              "Pemotongan stok bahan/produk otomatis & peringatan stok menipis",
              "Rekap omzet, kas masuk-keluar & laporan keuangan harian"
            ]
          : [
              "Rapid checkout supporting thermal receipt & PDF invoices",
              "Automatic stock deduction with proactive low-stock alerts",
              "Consolidated daily revenue, cashflow & margin reports"
            ],
      tags:
        language === "id"
          ? ["Kasir Digital", "Stok Otomatis", "Laporan Keuangan"]
          : ["Digital POS", "Stock Control", "Profit Reports"]
    },
    {
      num: "04",
      eyebrow:
        language === "id"
          ? "CUSTOM, TIKETING & OTOMATISASI"
          : "CUSTOM, TICKETING & AUTOMATION",
      icon: <RiRobot2Fill className="h-5 w-5" />,
      hasTicketTag: true,
      title:
        language === "id"
          ? "Sistem Custom, Tiketing & Otomatisasi WA/AI"
          : "Custom Systems, Ticketing & WA/AI Automation",
      description:
        language === "id"
          ? "Gantikan pencatatan spreadsheet manual dengan aplikasi web/mobile khusus mulai dari sistem tiketing digital, manajemen kos, hingga notifikasi WhatsApp & AI."
          : "Replace scattered spreadsheets with bespoke platforms covering digital ticketing, bookings, rentals, WhatsApp workflows, and grounded AI.",
      deliverables:
        language === "id"
          ? [
              "Sistem Tiketing Digital (e-ticket event QR check-in & support ticket SLA)",
              "Aplikasi manajemen kos, jadwal booking & portal layanan internal",
              "Pengingat tagihan WhatsApp otomatis & asisten AI berbasis data usaha"
            ]
          : [
              "Digital Ticketing System (QR event check-in & SLA support queue)",
              "Rental/kos billing portals, scheduling & internal operations",
              "Automated WhatsApp reminders & business-grounded AI assistants"
            ],
      tags:
        language === "id"
          ? ["Sistem Tiketing", "Booking & Kos", "WA & AI Automation"]
          : ["Ticketing System", "Booking & Rental", "WA & AI Automation"]
    }
  ];

  const b2bServices: ServiceItem[] = [
    {
      num: "01",
      eyebrow: "ENTERPRISE ENGINEERING",
      icon: <FaServer className="h-4 w-4" />,
      title: "Backend & Fullstack Engineering",
      description:
        language === "id"
          ? "Pengembangan layanan backend dan aplikasi web korporasi yang stabil, teruji, dan mudah dipelihara jangka panjang."
          : "End-to-end engineering of resilient, maintainable enterprise applications built to production standards.",
      deliverables:
        language === "id"
          ? [
              "Arsitektur microservices & hexagonal memakai Java Spring Boot & Golang",
              "Frontend SPA modern menggunakan Angular, React & Next.js",
              "Container Docker, orchestrator Kubernetes & pipeline GitLab CI/CD"
            ]
          : [
              "Microservice & hexagonal backends with Java Spring Boot & Golang",
              "Structured enterprise UIs built with Angular, React & Next.js",
              "Containerized Docker, Kubernetes & GitLab CI/CD delivery pipelines"
            ],
      tags: ["Java Spring Boot", "Golang", "Angular", "React / Next.js"]
    },
    {
      num: "02",
      eyebrow: language === "id" ? "INTEGRASI & PERFORMA" : "INTEGRATION & SCALE",
      icon: <TbApi className="h-5 w-5" />,
      title:
        language === "id"
          ? "API Integration & System Modernization"
          : "API Integration & Modernization",
      description:
        language === "id"
          ? "Jembatan API lintas sistem, antrean pesan asinkron, integrasi payment gateway, dan penyetelan performa database beban tinggi."
          : "Cross-system API bridges, async message brokers, payment gateways, and high-throughput SQL optimization.",
      deliverables:
        language === "id"
          ? [
              "Alur event-driven dengan RabbitMQ, Redis & verifikasi Webhook",
              "Optimasi query SQL & connection pooling Oracle maupun PostgreSQL",
              "Integrasi payment gateway, SSO & pelaporan dokumen/Jasper"
            ]
          : [
              "Event-driven workflows via RabbitMQ, Redis & signed Webhooks",
              "Oracle & PostgreSQL query tuning and pool management",
              "Payment gateways, role-based SSO & enterprise PDF pipelines"
            ],
      tags: ["REST API & SSE", "RabbitMQ & Redis", "Oracle & PostgreSQL"]
    },
    {
      num: "03",
      eyebrow: language === "id" ? "KOLABORASI TIM" : "TEAM PARTNERSHIP",
      icon: <FaHandshake className="h-5 w-5" />,
      title:
        language === "id"
          ? "Project-Based / Full-Time Engineer"
          : "Project-Based / Full-Time Partner",
      description:
        language === "id"
          ? "Terbuka untuk kontrak pengerjaan proyek terukur maupun bergabung penuh waktu sebagai Software Engineer dalam tim produk Anda."
          : "Available for milestone-based freelance engagements as well as full-time Software Engineering roles.",
      deliverables:
        language === "id"
          ? [
              "Komunikasi teknis terstruktur mulai dari PRD hingga handover produksi",
              "Codebase bersih, tervalidasi API (Postman/Test) & terdokumentasi rapi",
              "Fleksibel untuk kebutuhan proyek UMKM, agensi, atau posisi kerja tetap"
            ]
          : [
              "Structured engineering delivery from PRD through rollout",
              "Clean, API-validated & maintainable production codebases",
              "Flexible engagement for freelance builds or full-time teams"
            ],
      tags:
        language === "id"
          ? ["Freelance & Full-Time", "Clean Architecture", "Production Ready"]
          : ["Freelance & Full-Time", "Clean Architecture", "Production Ready"]
    }
  ];

  const renderEditorialRow = (service: ServiceItem) => (
    <div
      key={service.title}
      className="group grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start py-7 sm:py-9 px-3 sm:px-4 -mx-3 sm:-mx-4 rounded-2xl transition-colors duration-200 hover:bg-[var(--surface)]/75 text-left"
    >
      {/* Col 1: Large Editorial Index + Architectural Icon Tile */}
      <div className="lg:col-span-2 flex items-center lg:flex-col lg:items-start gap-4">
        <span className="font-editorial italic text-4xl sm:text-5xl leading-none text-[var(--muted-foreground)]/45 group-hover:text-[var(--accent-text)] transition-colors select-none">
          {service.num}
        </span>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--foreground)] transition-colors duration-200 group-hover:border-[var(--foreground)] group-hover:bg-[var(--foreground)] group-hover:text-[var(--bg)]">
          {service.icon}
        </div>
      </div>

      {/* Col 2: Eyebrow, Title, Narrative & Tags */}
      <div className="lg:col-span-5 space-y-2.5">
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--accent-text)]">
          {service.hasTicketTag && <FaTicket className="h-3 w-3" />}
          {service.eyebrow}
        </span>

        <h3 className="text-xl sm:text-2xl font-semibold tracking-[-0.02em] text-[var(--foreground)] leading-snug">
          {service.title}
        </h3>

        <p className="text-xs sm:text-sm leading-relaxed text-[var(--muted-foreground)]">
          {service.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {service.tags.map((tag) => (
            <Badge
              key={tag}
              variant={
                tag === "Sistem Tiketing" || tag === "Ticketing System"
                  ? "accent"
                  : "outline"
              }
              className="text-[10px]"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Col 3: Direct Deliverable List & Editorial Link */}
      <div className="lg:col-span-5 space-y-4">
        <ul className="space-y-2.5">
          {service.deliverables.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-[var(--foreground)]/90"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-[var(--accent-text)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="pt-1">
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-wider text-[var(--foreground)] underline decoration-[var(--border-strong)] underline-offset-4 transition-colors hover:text-[var(--accent-text)] hover:decoration-[var(--accent-text)]"
          >
            {language === "id" ? "Konsultasi Layanan Ini" : "Discuss This Service"}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <section id="what-i-do" className="space-y-8 scroll-mt-28">
      <Tabs defaultValue="umkm" className="space-y-2">
        <SectionHeader
          index="02"
          eyebrow={language === "id" ? "Solusi Digital" : "Solutions"}
          title={language === "id" ? "Layanan &" : "Digital"}
          titleItalic={language === "id" ? "Kolaborasi" : "Solutions"}
          subtitle={
            language === "id"
              ? "Solusi software siap pakai untuk digitalisasi UMKM hingga rekayasa sistem skala enterprise."
              : "Actionable software systems built for growing SMEs and scalable corporate engineering teams."
          }
          action={
            <TabsList>
              <TabsTrigger value="umkm">
                <RiStore3Fill className="h-3.5 w-3.5" />
                {language === "id" ? "UMKM & Bisnis" : "SME & Business"}
              </TabsTrigger>
              <TabsTrigger value="b2b">
                <RiBuilding2Fill className="h-3.5 w-3.5" />
                {language === "id" ? "Perusahaan (B2B)" : "Corporate (B2B)"}
              </TabsTrigger>
            </TabsList>
          }
        />

        <TabsContent value="umkm" className="mt-0">
          <div className="divide-y divide-[var(--border)] border-b border-[var(--border)]">
            {umkmServices.map(renderEditorialRow)}
          </div>
        </TabsContent>

        <TabsContent value="b2b" className="mt-0">
          <div className="divide-y divide-[var(--border)] border-b border-[var(--border)]">
            {b2bServices.map(renderEditorialRow)}
          </div>
        </TabsContent>
      </Tabs>

      {/* Open Editorial Collaboration Spread (No Boxy Card / No Slop) */}
      <div className="pt-4 pb-10 sm:py-12 border-b border-[var(--border)] text-left">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--muted-foreground)] mb-6">
          <span>
            {language === "id"
              ? "02.5 — MULAI KOLABORASI"
              : "02.5 — START A COLLABORATION"}
          </span>
          <span className="inline-flex items-center gap-2 text-[var(--emerald-text)]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {language === "id"
              ? "Tersedia · Bandung (WIB)"
              : "Available · Bandung (UTC+7)"}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <p className="text-2xl sm:text-4xl font-semibold tracking-[-0.03em] leading-[1.12] text-[var(--foreground)]">
              {language === "id" ? (
                <>
                  Punya rencana website, toko online, kasir POS, sistem{" "}
                  <span className="font-editorial italic font-normal text-[var(--accent-text)]">
                    tiketing
                  </span>
                  , atau butuh engineer{" "}
                  <span className="font-editorial italic font-normal text-[var(--accent-text)]">
                    siap pakai?
                  </span>
                </>
              ) : (
                <>
                  Planning a website, online store, POS,{" "}
                  <span className="font-editorial italic font-normal text-[var(--accent-text)]">
                    ticketing
                  </span>{" "}
                  system, or hiring a{" "}
                  <span className="font-editorial italic font-normal text-[var(--accent-text)]">
                    full-stack engineer?
                  </span>
                </>
              )}
            </p>
          </div>

          <div className="lg:col-span-5 border-t border-[var(--border)] divide-y divide-[var(--border)]">
            <a
              href="https://wa.me/6282251396690"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 py-4 transition-colors"
            >
              <div className="min-w-0 space-y-0.5">
                <span className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold tracking-tight text-[var(--foreground)] group-hover:text-[var(--emerald-text)] transition-colors">
                  <FaWhatsapp className="h-4 w-4 text-[var(--emerald-text)] shrink-0" />
                  Chat via WhatsApp
                </span>
                <span className="block font-mono text-[11px] text-[var(--muted-foreground)]">
                  {language === "id"
                    ? "+62 822 5139 6690 · Balas < 2 Jam"
                    : "+62 822 5139 6690 · Reply < 2 hrs"}
                </span>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border-strong)] text-[var(--foreground)] transition-all duration-200 group-hover:border-[var(--foreground)] group-hover:bg-[var(--foreground)] group-hover:text-[var(--bg)]">
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>

            <a
              href="#contact"
              className="group flex items-center justify-between gap-4 py-4 border-b border-[var(--border)] transition-colors"
            >
              <div className="min-w-0 space-y-0.5">
                <span className="block text-sm sm:text-base font-semibold tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent-text)] transition-colors">
                  {language === "id"
                    ? "Kirim Brief Proyek atau Rekrutmen"
                    : "Send Project or Hiring Brief"}
                </span>
                <span className="block font-mono text-[11px] text-[var(--muted-foreground)]">
                  {language === "id"
                    ? "Formulir singkat 30 detik · Konsultasi gratis"
                    : "30-second inquiry builder · Free discovery"}
                </span>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border-strong)] text-[var(--foreground)] transition-all duration-200 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white">
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
