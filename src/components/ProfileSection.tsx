"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeader from "./SectionHeader";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function ProfileSection() {
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
          topText="Get To Know Me"
          mainText="Profile"
          subText="About Me"
          bottomText="Summary of my background"
          watermark="YOSUA"
        />

        <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
          {/* Profile Photo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative w-64 h-64 md:w-80 md:h-80 shrink-0 rounded-3xl overflow-hidden border border-white/15 shadow-2xl shadow-cyan-500/20 bg-slate-800 md:order-last group"
          >
            <Image
              src="/profile.jpg"
              alt="Yosua Reynaldi Manurun"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-cover object-[center_25%] brightness-110 contrast-[1.05] group-hover:scale-105 transition-all duration-500"
            />
          </motion.div>

          {/* Profile Text */}
          <div className="space-y-6 text-slate-300 leading-relaxed text-lg font-light flex-1">
            <p className="text-2xl font-medium text-white mb-2">
              Hello, my name is <span className="text-cyan-400">Yosua Reynaldi Manurun</span> as a Software Engineer.
            </p>
            <p>
              I am interested in mobile and website development, both frontend and backend.
              With a strong foundation in modern technologies, I bridge the gap between design and robust engineering to craft elegant, highly responsive, and user-centric digital experiences.
            </p>
            <p>
              I have <span className="text-white font-medium">2 years of working experience</span>. Whether it&apos;s building complex web dashboards or smooth, native-feeling mobile applications, I thrive on solving technical challenges and delivering solutions that make a meaningful impact.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
