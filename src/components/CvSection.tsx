"use client";

import { motion, Variants } from "framer-motion";
import { FileText, Download, ExternalLink } from "lucide-react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

export default function CvSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      id="cv"
      className="pt-16 pb-20 scroll-mt-32 border-t border-white/5"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

        {/* LEFT COLUMN: Title & Actions */}
        <motion.div
          variants={fadeInUp}
          className="lg:col-span-5 space-y-6 text-left"
        >
          {/* Heading */}
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white uppercase tracking-tight leading-none font-sans">
            CURRICULUM VITAE
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed max-w-xl">
            The complete printable curriculum vitae — formal education, technical stack, professional history, and project ledger. Document formatted to professional engineering standards.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            {/* Download PDF Button */}
            <a
              href="/cv/Yosua Reynaldi Manurun-resume.pdf"
              download="Yosua Reynaldi Manurun-resume.pdf"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/35 hover:-translate-y-0.5 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download CV (PDF)
            </a>

            {/* Open In New Tab Button */}
            <a
              href="/cv/Yosua Reynaldi Manurun-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-transparent hover:bg-white/5 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <ExternalLink className="w-4 h-4 text-cyan-400" />
              Open in New Tab
            </a>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Scrollable PDF Browser Window */}
        <motion.div
          variants={fadeInUp}
          className="lg:col-span-7 w-full flex justify-center"
        >
          <div className="w-full bg-[#0d0e15] border border-white/10 rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.8)] flex flex-col h-[650px] relative group">
            {/* macOS Style Window Top Bar */}
            <div className="bg-[#14151f] px-4 py-3 flex items-center justify-between border-b border-white/5 select-none shrink-0">
              {/* Window Controls */}
              <div className="flex gap-1.5 items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>

              {/* Title */}
              <span className="font-mono text-[9px] sm:text-xs uppercase tracking-[0.25em] text-slate-400 font-bold ml-6">
                YOSUA / CV / PDF
              </span>

              {/* Action Link */}
              <a
                href="/cv/Yosua Reynaldi Manurun-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[9px] sm:text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider flex items-center gap-1 cursor-pointer"
              >
                OPEN <span className="text-[9px] font-sans">↗</span>
              </a>
            </div>

            {/* Embedded PDF iframe */}
            <div className="flex-1 w-full bg-white relative overflow-hidden">
              <iframe
                src="/cv/Yosua Reynaldi Manurun-resume.pdf#toolbar=0&navpanes=0&scrollbar=1"
                className="w-full h-full border-none"
                title="Yosua Reynaldi Manurun Resume"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
}
