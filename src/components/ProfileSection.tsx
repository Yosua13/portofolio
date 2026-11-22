"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/context/LanguageContext";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function ProfileSection() {
  const { language } = useLanguage();

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      id="profile"
      className="space-y-24 scroll-mt-32"
    >
      {/* About Me */}
      <div className="space-y-10">
        <SectionHeader
          topText={language === "id" ? "Kenali Saya Lebih Dekat" : "Get To Know Me"}
          mainText="Profile"
          subText={language === "id" ? "Tentang Saya" : "About Me"}
          bottomText={
            language === "id"
              ? "Ringkasan latar belakang & fokus profesional saya"
              : "Summary of my background and engineering focus"
          }
          watermark="YOSUA"
        />

        <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
          {/* Profile Photo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative w-64 h-64 md:w-80 md:h-80 shrink-0 rounded-3xl overflow-hidden border border-white/15 shadow-2xl shadow-cyan-500/20 bg-slate-800 md:order-last group"
          >
            <Image
              src="/assets/images/profile/profile.jpg"
              alt="Yosua Reynaldi Manurun"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-cover object-[center_25%] brightness-110 contrast-[1.05] group-hover:scale-105 transition-all duration-500"
            />
          </motion.div>

          {/* Profile Text */}
          <div className="space-y-6 text-slate-300 leading-relaxed text-lg font-light flex-1">
            {language === "id" ? (
              <>
                <p className="text-2xl font-medium text-white mb-2">
                  Halo, nama saya <span className="text-cyan-400">Yosua Reynaldi Manurun</span>, seorang Software Engineer.
                </p>
                <p>
                  Saya berfokus pada pengembangan aplikasi website dan mobile, baik di sisi frontend maupun backend. Dengan fondasi kuat pada arsitektur perangkat lunak modern, saya menjembatani kebutuhan bisnis dengan rekayasa teknis yang tangguh untuk menghadirkan produk digital yang cepat, responsif, dan mudah digunakan.
                </p>
                <p>
                  Saya memiliki <span className="text-white font-medium">pengalaman kerja profesional lebih dari 2 tahun</span>. Selain berpengalaman menangani sistem enterprise di perusahaan teknologi, saya aktif membantu pelaku <span className="text-white font-medium">UMKM maupun korporasi</span> dalam membangun produk digital—mulai dari Company Profile, E-Commerce, Sistem Kasir (POS), hingga sistem informasi operasional custom.
                </p>
              </>
            ) : (
              <>
                <p className="text-2xl font-medium text-white mb-2">
                  Hello, my name is <span className="text-cyan-400">Yosua Reynaldi Manurun</span> as a Software Engineer.
                </p>
                <p>
                  I specialize in web and mobile application development across both frontend and backend architectures. With a strong foundation in modern software engineering, I bridge business goals with robust systems to deliver fast, responsive, and user-centric digital products.
                </p>
                <p>
                  I have <span className="text-white font-medium">over 2 years of working experience</span>. Alongside building enterprise systems in the tech industry, I partner with <span className="text-white font-medium">SMEs (UMKM) and companies</span> to build impactful software solutions—ranging from Company Profiles, E-Commerce, and Point of Sale (POS) systems to custom operational platforms.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
