"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MessageSquare, Send } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/context/LanguageContext";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function ContactSection() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "opened" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);

    try {
      const subject = encodeURIComponent(
        language === "id"
          ? `Diskusi Proyek / Kerjasama dari ${formData.name}`
          : `Portfolio inquiry from ${formData.name}`
      );
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
      );
      window.location.href = `mailto:reyyosua29@gmail.com?subject=${subject}&body=${body}`;
      setSubmitStatus("opened");
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 6000);
    }
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      id="contact"
      className="scroll-mt-32 border-t border-white/5 pt-16 space-y-12"
    >
      <SectionHeader
        topText={language === "id" ? "Mari Terhubung" : "Get In Touch"}
        mainText="Contact"
        subText={language === "id" ? "Diskusi & Kolaborasi" : "Say Hello"}
        bottomText={
          language === "id"
            ? "Ingin membuat website/sistem UMKM atau bekerjasama dalam proyek perusahaan? Mari berdiskusi."
            : "Interested in working together? Let's build something reliable and useful."
        }
        watermark="CONNECT"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto text-left">
        {/* Left Side: Contact Information cards */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white font-sans tracking-wide">
              {language === "id"
                ? "Mari wujudkan produk & sistem bisnis Anda"
                : "Let's build something great"}
            </h3>
            <p className="text-slate-300 text-sm font-light leading-relaxed">
              {language === "id"
                ? "Saya selalu terbuka untuk mendiskusikan kebutuhan digitalisasi UMKM (Company Profile, E-Commerce, POS, Sistem Operasional Custom) maupun kemitraan pengembangan perangkat lunak dengan perusahaan. Hubungi saya melalui WhatsApp, email, atau kanal sosial di bawah ini."
                : "I am always open to discussing SME digitalization projects (Company Profile, E-Commerce, POS, Custom Systems) as well as software engineering partnerships with companies. Feel free to reach out via WhatsApp, email, or social channels."}
            </p>
          </div>

          <div className="space-y-4">
            {/* Email Card */}
            <div className="flex items-center gap-4 p-4 bg-[#0d0f18]/45 border border-white/5 hover:border-indigo-500/35 rounded-2xl transition-all duration-300">
              <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-0.5">Email</span>
                <a href="mailto:reyyosua29@gmail.com" className="text-sm font-semibold text-white hover:text-indigo-400 transition-colors">
                  reyyosua29@gmail.com
                </a>
              </div>
            </div>

            {/* WhatsApp/Phone Card */}
            <div className="flex items-center gap-4 p-4 bg-[#0d0f18]/45 border border-white/5 hover:border-indigo-500/35 rounded-2xl transition-all duration-300">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-0.5">
                  {language === "id" ? "WhatsApp / Telepon" : "WhatsApp / Phone"}
                </span>
                <a href="https://wa.me/6282251396690" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-white hover:text-emerald-400 transition-colors">
                  +62 822 5139 6690
                </a>
              </div>
            </div>

            {/* Socials Card */}
            <div className="flex items-center gap-4 p-4 bg-[#0d0f18]/45 border border-white/5 rounded-2xl">
              <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="space-y-1.5 flex-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block">
                  {language === "id" ? "Kanal Sosial" : "Social Channels"}
                </span>
                <div className="flex items-center gap-4">
                  <a href="https://github.com/Yosua13" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider">
                    GitHub
                  </a>
                  <span className="text-slate-700">|</span>
                  <a href="https://www.linkedin.com/in/yosua-reynaldi-manurun/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="lg:col-span-7 bg-[#0d0f18]/45 border border-white/5 rounded-3xl p-6 sm:p-8 relative">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name field */}
              <div className="space-y-2">
                <label htmlFor="form-name" className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  {language === "id" ? "Nama Anda / Perusahaan" : "Your Name / Company"}
                </label>
                <input
                  id="form-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder={language === "id" ? "Budi Santoso / PT Maju Jaya" : "John Doe / Acme Corp"}
                  className="w-full px-4 py-3 bg-[#050508] border border-white/5 focus:border-indigo-500/40 rounded-xl text-sm text-slate-200 outline-none transition-colors"
                />
              </div>

              {/* Email field */}
              <div className="space-y-2">
                <label htmlFor="form-email" className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  {language === "id" ? "Email Anda" : "Your Email"}
                </label>
                <input
                  id="form-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 bg-[#050508] border border-white/5 focus:border-indigo-500/40 rounded-xl text-sm text-slate-200 outline-none transition-colors"
                />
              </div>
            </div>

            {/* Message field */}
            <div className="space-y-2">
              <label htmlFor="form-message" className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                {language === "id" ? "Rincian Kebutuhan / Pesan" : "Project Details / Message"}
              </label>
              <textarea
                id="form-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder={
                  language === "id"
                    ? "Ceritakan kebutuhan website, sistem POS/E-Commerce UMKM, atau kerjasama proyek perusahaan Anda..."
                    : "Tell me about your website, POS/E-Commerce system, or enterprise engineering needs..."
                }
                className="w-full px-4 py-3 bg-[#050508] border border-white/5 focus:border-indigo-500/40 rounded-xl text-sm text-slate-200 outline-none transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${
                isSubmitting
                  ? "bg-slate-800 text-slate-400 cursor-not-allowed"
                  : "bg-white text-[#0a0a0a] hover:bg-slate-200 shadow-lg shadow-white/5"
              }`}
            >
              {isSubmitting
                ? language === "id"
                  ? "Menyiapkan..."
                  : "Preparing..."
                : language === "id"
                ? "Buka Draf Email"
                : "Open Email Draft"}
              <Send className="w-3.5 h-3.5" />
            </button>

            {/* Submit Toast Status */}
            {submitStatus === "opened" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-emerald-400 text-xs font-bold text-center uppercase tracking-wider mt-2"
              >
                {language === "id"
                  ? "Draf email telah dibuka. Silakan tekan kirim di aplikasi email Anda."
                  : "Email draft opened. Please press send in your mail app."}
              </motion.div>
            )}
            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs font-bold text-center uppercase tracking-wider mt-2"
              >
                {language === "id"
                  ? "Gagal membuka draf pesan. Silakan coba lagi."
                  : "Failed to open message draft. Please try again."}
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </motion.section>
  );
}
