"use client";

import { motion, Variants } from "framer-motion";
import {
  Globe,
  ShoppingBag,
  Receipt,
  Layers,
  Bot,
  Building2,
  CheckCircle2,
  MessageCircle,
  ArrowRight
} from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/context/LanguageContext";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function WhatIDoSection() {
  const { language } = useLanguage();

  const services = [
    {
      icon: <Globe className="w-8 h-8 text-cyan-400" />,
      badge: language === "id" ? "Branding & Kredibilitas" : "Branding & Credibility",
      title:
        language === "id"
          ? "Website Company Profile & Landing Page"
          : "Company Profile & Landing Pages",
      description:
        language === "id"
          ? "Pembuatan website profil usaha, katalog layanan, dan landing page promosi yang cepat, modern, responsif di semua perangkat, serta teroptimasi SEO untuk meningkatkan kepercayaan pelanggan terhadap bisnis UMKM maupun perusahaan Anda."
          : "Crafting fast, modern, mobile-responsive, and SEO-optimized company profile websites and promotional landing pages that elevate brand credibility for SMEs (UMKM) and corporate businesses.",
      deliverables:
        language === "id"
          ? ["Company Profile", "Landing Page Promosi", "Optimasi SEO & Kecepatan", "Desain Mobile-Friendly"]
          : ["Company Profile", "Promo Landing Page", "SEO & Speed Optimization", "Mobile-Responsive UI"]
    },
    {
      icon: <ShoppingBag className="w-8 h-8 text-indigo-400" />,
      badge: language === "id" ? "Penjualan Online 24/7" : "24/7 Online Sales",
      title:
        language === "id"
          ? "E-Commerce & Toko Online Mandiri"
          : "E-Commerce & Custom Online Stores",
      description:
        language === "id"
          ? "Pengembangan website toko online dan katalog produk mandiri tanpa potongan komisi marketplace. Dilengkapi keranjang belanja, manajemen pesanan, serta integrasi Payment Gateway otomatis (QRIS, Virtual Account Bank, E-Wallet)."
          : "Building independent online stores and digital catalogs free from marketplace commission cuts. Complete with shopping cart, order management, and automated Payment Gateway checkout (QRIS, Bank Virtual Accounts, E-Wallets).",
      deliverables:
        language === "id"
          ? ["Katalog & Keranjang Belanja", "Payment Gateway (QRIS / VA)", "Manajemen Order & Pelanggan", "Dashboard Penjualan"]
          : ["Catalog & Shopping Cart", "Payment Gateway (QRIS / VA)", "Order & Customer Management", "Sales Dashboard"]
    },
    {
      icon: <Receipt className="w-8 h-8 text-emerald-400" />,
      badge: language === "id" ? "Retail, F&B & Jasa" : "Retail, F&B & Services",
      title:
        language === "id"
          ? "Sistem Kasir (POS) & Inventori Stok"
          : "Point of Sale (POS) & Inventory Systems",
      description:
        language === "id"
          ? "Aplikasi Point of Sale (POS) kasir digital dan manajemen stok gudang yang disesuaikan dengan alur bisnis UMKM Anda—mencakup pencatatan transaksi kasir real-time, cetak struk/kwitansi digital, pantauan stok barang, hingga laporan laba-rugi otomatis."
          : "Custom Point of Sale (POS) cashier and inventory management software tailored to your business workflow—featuring real-time transaction logging, digital/printed receipts, stock alerts, and automated financial reports.",
      deliverables:
        language === "id"
          ? ["Kasir Digital (POS)", "Manajemen Stok & Gudang", "Cetak Struk / Kwitansi PDF", "Laporan Keuangan Otomatis"]
          : ["Digital Cashier (POS)", "Stock & Warehouse Tracking", "Receipt & PDF Invoicing", "Automated Financial Reports"]
    },
    {
      icon: <Layers className="w-8 h-8 text-pink-400" />,
      badge: language === "id" ? "Digitalisasi UMKM" : "SME Digital Transformation",
      title:
        language === "id"
          ? "Sistem Operasional & Digitalisasi Bisnis"
          : "Business Digitization & Custom Web/Mobile Apps",
      description:
        language === "id"
          ? "Transformasi pembukuan dan operasional manual (kertas/Excel) menjadi aplikasi perangkat lunak terpusat berbasis Web maupun Mobile—seperti sistem manajemen kos/properti, sistem booking & penjadwalan, CRM pelanggan, dan portal admin operasional."
          : "Transforming manual paper or Excel operations into centralized Web and Mobile applications—such as property/boarding management, booking & scheduling systems, customer CRM, and internal operational dashboards.",
      deliverables:
        language === "id"
          ? ["Sistem Booking & Penjadwalan", "Manajemen Properti / Kos", "Dashboard Admin & CRM", "Aplikasi Web & Mobile"]
          : ["Booking & Scheduling Systems", "Property / Rental Management", "Admin Dashboards & CRM", "Web & Mobile Applications"]
    },
    {
      icon: <Bot className="w-8 h-8 text-amber-400" />,
      badge: language === "id" ? "Efisiensi & AI" : "Automation & AI",
      title:
        language === "id"
          ? "Otomatisasi Bisnis, WhatsApp & Integrasi AI"
          : "Workflow Automation, WhatsApp & AI Integration",
      description:
        language === "id"
          ? "Mengurangi pekerjaan administratif berulang melalui penjadwalan tagihan otomatis, penerbitan invoice PDF instan, pengiriman pengingat & notifikasi pesanan langsung ke WhatsApp pelanggan, serta asisten AI cerdas untuk bisnis Anda."
          : "Eliminating repetitive admin tasks with automated billing schedulers, instant PDF invoice generation, direct WhatsApp customer notifications, and intelligent AI assistants integrated into your business workflow.",
      deliverables:
        language === "id"
          ? ["Notifikasi WhatsApp Otomatis", "Auto-Billing & Invoice PDF", "Integrasi AI (Google Gemini)", "Webhook & Sinkronisasi Data"]
          : ["Automated WhatsApp Alerts", "Auto-Billing & PDF Invoices", "AI Integration (Gemini)", "Webhooks & Data Sync"]
    },
    {
      icon: <Building2 className="w-8 h-8 text-orange-400" />,
      badge: language === "id" ? "Kemitraan B2B & Korporasi" : "B2B & Corporate Partnership",
      title:
        language === "id"
          ? "Kerjasama Perusahaan & Enterprise Software"
          : "Corporate Partnership & Enterprise Engineering",
      description:
        language === "id"
          ? "Terbuka untuk bekerjasama dengan perusahaan, agensi digital, maupun startup—baik secara project-based, kontrak freelance, maupun dedicated engineer. Berpengalaman membangun arsitektur backend (Java Spring Boot, Golang, NestJS), REST API, dan modernisasi sistem."
          : "Open to partnering with companies, agencies, and startups for project-based, freelance contract, or dedicated engineering roles. Experienced in scalable backend architectures (Java Spring Boot, Golang, NestJS), REST APIs, and system modernization.",
      deliverables:
        language === "id"
          ? ["Kerjasama B2B / Kontrak", "Java Spring Boot & Golang", "Next.js / React / TypeScript", "Integrasi API & Microservices"]
          : ["B2B & Contract Ready", "Java Spring Boot & Golang", "Next.js / React / TypeScript", "API & Microservices Architecture"]
    }
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      id="what-i-do"
      className="space-y-10 scroll-mt-32"
    >
      <motion.div variants={fadeInUp}>
        <SectionHeader
          topText={language === "id" ? "Layanan Digitalisasi & Rekayasa Sistem" : "Services & Digitalization Expertise"}
          mainText={language === "id" ? "What I Do" : "What I Do"}
          subText="Solutions"
          bottomText={
            language === "id"
              ? "Solusi pembuatan produk, digitalisasi UMKM, & kemitraan pengembangan software perusahaan"
              : "How I can help build, digitalize, and scale your business or enterprise systems"
          }
          watermark="SOLUTIONS"
        />
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            className="service-card group relative bg-[#0d0f18]/40 border border-white/5 hover:border-indigo-500/30 rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-500/5 overflow-hidden flex flex-col justify-between gap-5 text-left"
          >
            {/* Background Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Top Corner Bracket */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/0 group-hover:border-white/10 group-hover:w-3 group-hover:h-3 transition-all duration-300" />

            <div className="space-y-4">
              {/* Top Row: Icon & Category Badge */}
              <div className="flex items-center justify-between gap-3">
                <div className="p-3 bg-white/5 border border-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-inner">
                  {service.icon}
                </div>
                <span className="rounded-full border border-indigo-500/25 bg-indigo-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-300">
                  {service.badge}
                </span>
              </div>

              {/* Content */}
              <div className="space-y-2.5">
                <h3 className="service-card-title text-lg font-bold text-white group-hover:text-indigo-400 transition-colors tracking-wide">
                  {service.title}
                </h3>
                <p className="service-card-body text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>

            {/* Deliverables Chips */}
            <div className="pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
              {service.deliverables.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1 rounded-lg border border-white/5 bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold text-slate-300"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom UMKM & Corporate Collaboration Banner */}
      <motion.div
        variants={fadeInUp}
        className="service-card relative overflow-hidden rounded-3xl border border-indigo-500/25 bg-gradient-to-r from-[#0d0f18]/90 via-indigo-950/25 to-[#0d0f18]/90 p-6 sm:p-8 md:p-10 shadow-2xl"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 text-left">
          <div className="space-y-2.5 max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {language === "id"
                ? "Terbuka untuk Proyek UMKM & Kemitraan Perusahaan"
                : "Open for SME Projects & Corporate Partnerships"}
            </span>
            <h3 className="service-card-title text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {language === "id"
                ? "Ingin Membuat Produk Digital untuk UMKM atau Butuh Partner Software Engineer untuk Perusahaan?"
                : "Looking to Build a Digital Product for Your Business or Need a Software Engineering Partner?"}
            </h3>
            <p className="service-card-body text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              {language === "id"
                ? "Mulai dari pembuatan Company Profile, E-Commerce, Sistem Kasir (POS), hingga aplikasi operasional custom dan kerjasama pengembangan sistem berskala perusahaan—saya siap membantu dari tahap perancangan hingga sistem siap digunakan."
                : "From Company Profiles, E-Commerce stores, and Point of Sale (POS) systems to custom operational software and B2B enterprise engineering partnerships—I handle end-to-end delivery from architecture design to production deployment."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://wa.me/6282251396690"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-5 py-3.5 text-xs font-extrabold uppercase tracking-wider text-slate-950 transition-all hover:-translate-y-0.5 shadow-lg shadow-emerald-500/20"
            >
              <MessageCircle className="w-4 h-4" />
              {language === "id" ? "Konsultasi via WhatsApp" : "Consult via WhatsApp"}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5"
            >
              {language === "id" ? "Hubungi Saya" : "Contact Me"}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
