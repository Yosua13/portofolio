"use client";

import { Briefcase, Code2, FileText, Mail, MapPin, UserRound } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function RecruiterSnapshot() {
  const { language } = useLanguage();

  const snapshotItems = [
    {
      icon: <Briefcase className="w-4 h-4" />,
      label: language === "id" ? "Peran & Fokus" : "Target Role",
      value:
        language === "id"
          ? "Fullstack / Backend Engineer & Partner Solusi Digital"
          : "Fullstack / Backend Engineer & Digital Solutions Partner"
    },
    {
      icon: <Code2 className="w-4 h-4" />,
      label: language === "id" ? "Teknologi Utama" : "Core Stack",
      value: "Java, Spring Boot, Golang, NestJS, React, Next.js"
    },
    {
      icon: <MapPin className="w-4 h-4" />,
      label: language === "id" ? "Lokasi" : "Location",
      value: "Bandung, Indonesia"
    },
    {
      icon: <FileText className="w-4 h-4" />,
      label: language === "id" ? "Ketersediaan" : "Availability",
      value:
        language === "id"
          ? "Terbuka untuk Digitalisasi UMKM, Freelance & Kerjasama Perusahaan"
          : "Open to SME digitalization, freelance & corporate opportunities"
    }
  ];

  return (
    <section className="scroll-mt-32">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 items-stretch rounded-3xl border border-white/10 bg-[#0d0f18]/45 p-5 sm:p-7">
        <div className="space-y-5">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-400">
              {language === "id" ? "Ringkasan Cepat Klien & Recruiter" : "Client & Recruiter Quick View"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {language === "id"
                ? "Software Engineer yang fokus membangun sistem bisnis andal & solusi digital UMKM."
                : "Software engineer focused on reliable business systems and digital solutions."}
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-300">
              {language === "id"
                ? "Saya membangun aplikasi web dan mobile siap produksi—mulai dari Company Profile, E-Commerce, Sistem Kasir (POS), dan otomatisasi bisnis UMKM hingga arsitektur backend enterprise berskala besar untuk perusahaan."
                : "I build production-ready web and mobile applications—ranging from Company Profiles, E-Commerce, Point of Sale (POS), and SME business automation to scalable enterprise backend architectures for companies."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="/assets/documents/cv/Yosua Reynaldi Manurun-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0a0a0a] transition-colors hover:bg-slate-200"
            >
              <FileText className="w-4 h-4" />
              {language === "id" ? "Lihat CV" : "View CV"}
            </a>
            <a
              href="https://github.com/Yosua13"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-300 transition-colors hover:text-white"
            >
              <Code2 className="w-4 h-4" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/yosua-reynaldi-manurun/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-300 transition-colors hover:text-white"
            >
              <UserRound className="w-4 h-4" />
              LinkedIn
            </a>
            <a
              href="mailto:reyyosua29@gmail.com"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-300 transition-colors hover:text-white"
            >
              <Mail className="w-4 h-4" />
              Email
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
          {snapshotItems.map((item) => (
            <div key={item.label} className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-4">
              <span className="mt-0.5 text-indigo-400">{item.icon}</span>
              <div className="space-y-1">
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  {item.label}
                </span>
                <span className="block text-sm font-semibold leading-snug text-slate-200">
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
