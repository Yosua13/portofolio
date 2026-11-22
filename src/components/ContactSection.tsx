"use client";

import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  Mail,
  MessageSquareText
} from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface InquiryValues {
  name: string;
  contact: string;
  topic: string;
  budget: string;
  message: string;
}

export default function ContactSection() {
  const { language } = useLanguage();
  const [copiedTarget, setCopiedTarget] = useState<"wa" | "email" | null>(null);

  const topicOptions = useMemo(
    () => [
      { id: "company-profile", label: "Company Profile" },
      { id: "ecommerce", label: "E-Commerce" },
      {
        id: "pos",
        label: language === "id" ? "Kasir POS & Stok" : "POS & Inventory"
      },
      {
        id: "custom-ticketing",
        label:
          language === "id"
            ? "Sistem Custom & Tiketing"
            : "Custom System & Ticketing"
      },
      {
        id: "partnership",
        label:
          language === "id"
            ? "Kerjasama B2B / Proyek"
            : "B2B / Project Partnership"
      },
      {
        id: "recruitment",
        label:
          language === "id"
            ? "Rekrutmen (HR / Kerja Tetap)"
            : "Recruitment (HR / Full-Time)"
      }
    ],
    [language]
  );

  const budgetOptions = useMemo(
    () => [
      {
        id: "discuss",
        label: language === "id" ? "Diskusi Dulu" : "Let's Discuss"
      },
      {
        id: "under-5m",
        label: language === "id" ? "< Rp 5 Jt" : "< $500"
      },
      {
        id: "5-15m",
        label: language === "id" ? "Rp 5–15 Jt" : "$500–$1.5k"
      },
      {
        id: "over-15m",
        label: language === "id" ? "> Rp 15 Jt" : "> $1.5k"
      },
      {
        id: "fulltime",
        label: language === "id" ? "Posisi Full-Time" : "Full-Time Role"
      }
    ],
    [language]
  );

  const inquirySchema = useMemo(
    () =>
      z.object({
        name: z
          .string()
          .trim()
          .min(
            2,
            language === "id"
              ? "Masukkan minimal 2 karakter nama atau usaha."
              : "Please enter at least 2 characters for your name."
          ),
        contact: z
          .string()
          .trim()
          .min(
            4,
            language === "id"
              ? "Masukkan email atau nomor WhatsApp aktif Anda."
              : "Please enter a valid email or WhatsApp number."
          ),
        topic: z.string().min(1),
        budget: z.string().min(1),
        message: z
          .string()
          .trim()
          .min(
            10,
            language === "id"
              ? "Jelaskan kebutuhan singkat Anda (minimal 10 karakter)."
              : "Please briefly describe your needs (minimum 10 characters)."
          )
      }),
    [language]
  );

  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<InquiryValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      contact: "",
      topic: "company-profile",
      budget: "discuss",
      message: ""
    }
  });

  const selectedTopic = useWatch({ control, name: "topic" });
  const selectedBudget = useWatch({ control, name: "budget" });

  const resolveTopicLabel = (id: string) =>
    topicOptions.find((item) => item.id === id)?.label ?? id;

  const resolveBudgetLabel = (id: string) =>
    budgetOptions.find((item) => item.id === id)?.label ?? id;

  const buildFormattedBrief = (data: InquiryValues) => {
    const topicText = resolveTopicLabel(data.topic);
    const budgetText = resolveBudgetLabel(data.budget);

    if (language === "id") {
      return [
        `Halo Yosua, saya *${data.name}* ingin berdiskusi:`,
        `• Kebutuhan: ${topicText}`,
        `• Estimasi / Skala: ${budgetText}`,
        `• Kontak Balas: ${data.contact}`,
        "",
        "Detail:",
        data.message
      ].join("\n");
    }

    return [
      `Hi Yosua, I'm *${data.name}* reaching out about:`,
      `• Topic: ${topicText}`,
      `• Scope / Budget: ${budgetText}`,
      `• Reply Contact: ${data.contact}`,
      "",
      "Details:",
      data.message
    ].join("\n");
  };

  const handleCopyText = async (value: string, target: "wa" | "email", label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedTarget(target);
      toast.success(label);
      setTimeout(() => setCopiedTarget(null), 2200);
    } catch {
      toast.error(
        language === "id"
          ? "Gagal menyalin ke clipboard."
          : "Unable to copy to clipboard."
      );
    }
  };

  const onSendWhatsApp = (data: InquiryValues) => {
    const text = encodeURIComponent(buildFormattedBrief(data));
    window.open(
      `https://wa.me/6282251396690?text=${text}`,
      "_blank",
      "noopener,noreferrer"
    );
    toast.success(
      language === "id"
        ? "Membuka WhatsApp dengan ringkasan pesan Anda..."
        : "Opening WhatsApp with your formatted inquiry..."
    );
  };

  const onSendEmail = (data: InquiryValues) => {
    const topicText = resolveTopicLabel(data.topic);
    const subject = encodeURIComponent(
      language === "id"
        ? `[${topicText}] Diskusi dari ${data.name}`
        : `[${topicText}] Inquiry from ${data.name}`
    );
    const body = encodeURIComponent(buildFormattedBrief(data).replaceAll("*", ""));
    const mailtoUrl = `mailto:reyyosua29@gmail.com?subject=${subject}&body=${body}`;
    const mailLink = document.createElement("a");
    mailLink.href = mailtoUrl;
    mailLink.click();
    toast.success(
      language === "id"
        ? "Draf email terbuka di aplikasi email Anda."
        : "Email draft opened in your mail client."
    );
  };

  const onCopyBrief = async (data: InquiryValues) => {
    try {
      await navigator.clipboard.writeText(buildFormattedBrief(data).replaceAll("*", ""));
      toast.success(
        language === "id"
          ? "Ringkasan pesan berhasil disalin!"
          : "Inquiry brief copied to clipboard!"
      );
    } catch {
      toast.error(
        language === "id"
          ? "Gagal menyalin ringkasan pesan."
          : "Unable to copy inquiry brief."
      );
    }
  };

  const steps =
    language === "id"
      ? [
          "Pilih topik & kirim gambaran singkat target Anda.",
          "Diskusi gratis dengan estimasi waktu & biaya transparan.",
          "Eksekusi terstruktur hingga aplikasi rilis & siap pakai."
        ]
      : [
          "Pick your topic & share a short summary of your goals.",
          "Free discovery chat with transparent timeline & estimates.",
          "Structured execution through production rollout & handover."
        ];

  return (
    <section id="contact" className="scroll-mt-28 space-y-10 pt-4">
      <SectionHeader
        index="04"
        eyebrow={language === "id" ? "Kontak & Konsultasi" : "Contact & Consultation"}
        title={language === "id" ? "Mari" : "Start a"}
        titleItalic={language === "id" ? "Terhubung" : "Conversation"}
        subtitle={
          language === "id"
            ? "Diskusikan pembuatan website, e-commerce, kasir POS, sistem tiketing UMKM, maupun peluang kerja tetap Fullstack Engineer."
            : "Reach out for SME websites, e-commerce, POS, ticketing builds, freelance contracts, or full-time Software Engineering roles."
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start text-left">
        {/* Left Column: Open Studio Channels & Process */}
        <div className="lg:col-span-5 space-y-7">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--emerald-text)]">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              {language === "id"
                ? "Aktif · Respon < 2 Jam (WIB)"
                : "Online · Reply < 2 Hrs (UTC+7)"}
            </span>
            <h3 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
              {language === "id"
                ? "Kanal Komunikasi Langsung"
                : "Direct Studio Channels"}
            </h3>
            <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
              {language === "id"
                ? "Pilih WhatsApp untuk respon tercepat, salin kontak dalam satu klik, atau lihat profil profesional di LinkedIn & GitHub."
                : "Message via WhatsApp for the quickest reply, copy contact info in one click, or inspect code & background on GitHub and LinkedIn."}
            </p>
          </div>

          {/* Hairline Direct Rows */}
          <div className="border-y border-[var(--border)] divide-y divide-[var(--border)]">
            <div className="flex items-center justify-between gap-3 py-4">
              <a
                href="https://wa.me/6282251396690?text=Halo%20Yosua%2C%20saya%20tertarik%20untuk%20berdiskusi%20mengenai%20proyek%20%2F%20kerjasama."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 min-w-0 flex-1 group"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-[var(--emerald-soft)] text-[var(--emerald-text)]">
                  <FaWhatsapp className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] font-medium uppercase tracking-wider text-[var(--emerald-text)]">
                    WhatsApp Prioritas
                    <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                  <span className="block truncate text-sm font-semibold text-[var(--foreground)]">
                    +62 822 5139 6690
                  </span>
                </div>
              </a>

              <button
                type="button"
                onClick={() =>
                  handleCopyText(
                    "+6282251396690",
                    "wa",
                    language === "id"
                      ? "Nomor WhatsApp disalin!"
                      : "WhatsApp number copied!"
                  )
                }
                aria-label="Copy WhatsApp number"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--muted-foreground)] hover:border-[var(--border-strong)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
              >
                {copiedTarget === "wa" ? (
                  <Check className="h-4 w-4 text-[var(--emerald-text)]" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between gap-3 py-4">
              <a
                href="mailto:reyyosua29@gmail.com"
                className="flex items-center gap-3.5 min-w-0 flex-1 group"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] text-[#EA4335]">
                  <SiGmail className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] font-medium uppercase tracking-wider text-[var(--muted-foreground)]">
                    Email Resmi
                    <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                  <span className="block truncate text-sm font-semibold text-[var(--foreground)]">
                    reyyosua29@gmail.com
                  </span>
                </div>
              </a>

              <button
                type="button"
                onClick={() =>
                  handleCopyText(
                    "reyyosua29@gmail.com",
                    "email",
                    language === "id"
                      ? "Alamat email disalin!"
                      : "Email address copied!"
                  )
                }
                aria-label="Copy Email address"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--muted-foreground)] hover:border-[var(--border-strong)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
              >
                {copiedTarget === "email" ? (
                  <Check className="h-4 w-4 text-[var(--emerald-text)]" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Social Pills */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Button variant="outline" size="md" asChild>
              <a
                href="https://www.linkedin.com/in/yosua-reynaldi-manurun/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="h-4 w-4 text-[#0A66C2]" />
                LinkedIn
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </Button>
            <Button variant="outline" size="md" asChild>
              <a
                href="https://github.com/Yosua13"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="h-4 w-4" />
                GitHub
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </Button>
          </div>

          {/* Editorial Numbered Collaboration Process */}
          <div className="space-y-3 pt-1">
            <span className="block font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--accent-text)]">
              {language === "id" ? "Alur Mulai Kolaborasi" : "How We Start"}
            </span>
            <div className="space-y-2.5">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className="flex items-baseline gap-3 text-xs sm:text-sm text-[var(--muted-foreground)]"
                >
                  <span className="font-editorial italic text-lg text-[var(--accent-text)] shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-snug">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Clean Architectural Inquiry Frame */}
        <div className="lg:col-span-7 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 shadow-[var(--card-shadow)] space-y-6">
          <div className="space-y-1.5 border-b border-[var(--border)] pb-5">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--accent-text)]">
              <MessageSquareText className="h-3.5 w-3.5" />
              {language === "id" ? "Pembuat Ringkasan Cepat" : "Quick Inquiry Builder"}
            </span>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--foreground)]">
              {language === "id"
                ? "Kirim Brief Kebutuhan dalam 30 Detik"
                : "Send a Structured Brief in 30 Seconds"}
            </h3>
            <p className="text-xs text-[var(--muted-foreground)]">
              {language === "id"
                ? "Lengkapi detail singkat lalu kirim otomatis ke WhatsApp, draf Email, atau salin sebagai ringkasan."
                : "Select your topic and scope, then send formatted directly to WhatsApp, Email, or clipboard."}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSendEmail)} className="space-y-5">
            {/* Topic Selector */}
            <div className="space-y-2">
              <span className="block font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
                {language === "id" ? "01 · Pilih Topik Kebutuhan" : "01 · Select Topic"}
              </span>
              <div className="flex flex-wrap gap-2">
                {topicOptions.map((option) => {
                  const active = selectedTopic === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        setValue("topic", option.id, {
                          shouldDirty: true,
                          shouldValidate: true
                        });
                        if (option.id === "recruitment") {
                          setValue("budget", "fulltime", {
                            shouldDirty: true,
                            shouldValidate: true
                          });
                        }
                      }}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer",
                        active
                          ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--bg)]"
                          : "border-[var(--border)] bg-transparent text-[var(--muted-foreground)] hover:border-[var(--border-strong)] hover:text-[var(--foreground)]"
                      )}
                    >
                      {active && <CheckCircle2 className="h-3.5 w-3.5" />}
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget / Role Scope Selector */}
            <div className="space-y-2">
              <span className="block font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
                {language === "id" ? "02 · Estimasi Anggaran / Skala" : "02 · Budget / Role Scope"}
              </span>
              <div className="flex flex-wrap gap-2">
                {budgetOptions.map((option) => {
                  const active = selectedBudget === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() =>
                        setValue("budget", option.id, {
                          shouldDirty: true,
                          shouldValidate: true
                        })
                      }
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer",
                        active
                          ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                          : "border-[var(--border)] bg-transparent text-[var(--muted-foreground)] hover:border-[var(--border-strong)] hover:text-[var(--foreground)]"
                      )}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="inquiry-name"
                  className="block font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--muted-foreground)]"
                >
                  {language === "id" ? "Nama / Usaha" : "Name / Company"}
                </label>
                <input
                  id="inquiry-name"
                  type="text"
                  {...register("name")}
                  placeholder={
                    language === "id" ? "Budi — Kedai Kopi / PT..." : "John — Acme Corp"
                  }
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3.5 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/55 outline-none focus:border-[var(--accent)] transition-colors"
                />
                {errors.name && (
                  <p className="text-[11px] font-medium text-[var(--rose-text)]">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="inquiry-contact"
                  className="block font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--muted-foreground)]"
                >
                  {language === "id" ? "Email / No. WhatsApp" : "Email / WhatsApp"}
                </label>
                <input
                  id="inquiry-contact"
                  type="text"
                  {...register("contact")}
                  placeholder={
                    language === "id" ? "0812xxx / email@bisnis.com" : "name@company.com / +62..."
                  }
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3.5 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/55 outline-none focus:border-[var(--accent)] transition-colors"
                />
                {errors.contact && (
                  <p className="text-[11px] font-medium text-[var(--rose-text)]">
                    {errors.contact.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="inquiry-message"
                className="block font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--muted-foreground)]"
              >
                {language === "id" ? "Detail Kebutuhan" : "Project or Role Details"}
              </label>
              <textarea
                id="inquiry-message"
                rows={4}
                {...register("message")}
                placeholder={
                  language === "id"
                    ? "Contoh: Saya ingin membuat sistem kasir POS dan e-commerce QRIS untuk 2 cabang toko, atau ingin berdiskusi tentang posisi Fullstack Engineer..."
                    : "Example: Looking to build a QRIS storefront and POS for 2 branches, or discussing a Fullstack Engineer opening..."
                }
                className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3.5 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/55 outline-none focus:border-[var(--accent)] transition-colors"
              />
              {errors.message && (
                <p className="text-[11px] font-medium text-[var(--rose-text)]">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* 3 Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <Button
                type="button"
                variant="emerald"
                size="lg"
                onClick={handleSubmit(onSendWhatsApp)}
              >
                <FaWhatsapp className="h-4 w-4" />
                {language === "id" ? "Kirim WhatsApp" : "Send WhatsApp"}
              </Button>

              <Button type="submit" variant="accent" size="lg">
                <Mail className="h-4 w-4" />
                {language === "id" ? "Kirim Email" : "Send Email"}
              </Button>

              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handleSubmit(onCopyBrief)}
              >
                <Copy className="h-4 w-4" />
                {language === "id" ? "Salin Brief" : "Copy Brief"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
