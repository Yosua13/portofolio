"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Briefcase, Calendar, GraduationCap, MapPin, Trophy } from "lucide-react";
import SectionHeader from "./SectionHeader";

const journeyData = [
  {
    type: "career",
    title: "Full Stack Developer",
    company: "PT Tabel Data Informatika",
    location: "Bandung, Indonesia",
    status: "Current Role",
    isActive: true,
    date: "Oct 2025 - Present",
    image: "/company1.png",
    description:
      "Resolved production issues and delivered end-to-end business application features using Angular, React JS, Java Spring Boot, Golang, and supporting operational tooling.",
    achievements: [
      "Resolved and maintained bugs across production and development environments, improving stability and reducing downtime.",
      "Delivered full-stack features for high-impact internal projects using Angular/React frontends and Java Spring Boot/Golang backends.",
      "Used Kubernetes and supporting developer tools to improve deployment and environment management workflows."
    ]
  },
  {
    type: "career",
    title: "Mobile Developer",
    company: "PT Tabel Data Informatika",
    location: "Bandung, Indonesia",
    status: "Professional Role",
    isActive: false,
    date: "Aug 2024 - Jun 2025",
    image: "/company2.png",
    description:
      "Developed and maintained Flutter applications for Android and iOS, working across delivery, state management, deployment preparation, and cross-platform compatibility.",
    achievements: [
      "Developed and maintained six Flutter applications with attention to performance and user experience.",
      "Completed sprint tasks consistently while documenting version changes and deployment history.",
      "Implemented modular state management and refactored Flutter projects across framework version upgrades."
    ]
  },
  {
    type: "education",
    title: "D3 Application Software Engineering",
    company: "Telkom University",
    location: "Bandung, Indonesia",
    status: "GPA 3.87/4.00",
    isActive: false,
    date: "Sep 2022 - Jul 2025",
    image: "/university.png",
    description:
      "Studied application software engineering with practical focus on web development, project delivery, databases, and student community contribution.",
    achievements: [
      "Web-Based Programming practicum assistant, mentoring students in web development and supporting lab sessions.",
      "Chairman of PMK TASS with increased member participation through engagement programs and initiatives.",
      "Senior resident and community contributor, supporting dormitory administration and student development."
    ]
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function JourneySection() {
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: timelineScrollY } = useScroll({
    target: timelineContainerRef,
    offset: ["start center", "end center"]
  });
  const timelineHeight = useTransform(timelineScrollY, [0, 1], ["0%", "100%"]);

  const firstItemRef = useRef<HTMLDivElement>(null);
  const lastItemRef = useRef<HTMLDivElement>(null);
  const [firstItemHeight, setFirstItemHeight] = useState(0);
  const [lastItemHeight, setLastItemHeight] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (firstItemRef.current) {
        setFirstItemHeight(firstItemRef.current.offsetHeight);
      }
      if (lastItemRef.current) {
        setLastItemHeight(lastItemRef.current.offsetHeight);
      }
    };
    measure();
    const timer = setTimeout(measure, 100);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      id="journey"
      className="space-y-12 pt-10 scroll-mt-32"
    >
      <SectionHeader
        topText="Milestones"
        mainText="Journey"
        subText="Career & Education"
        bottomText="Professional experience and education history"
        watermark="JOURNEY"
      />

      <div className="relative w-full max-w-[1400px] mx-auto" ref={timelineContainerRef}>
        <div
          className="absolute left-[20px] md:left-[40px] w-1 bg-white/5 rounded-full overflow-hidden"
          style={{
            top: firstItemHeight ? `${firstItemHeight / 2}px` : "0px",
            bottom: lastItemHeight ? `${lastItemHeight / 2}px` : "0px"
          }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-400 to-indigo-500 rounded-full"
            style={{ height: timelineHeight }}
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[4px] h-[4px] bg-white rounded-full" />
          </motion.div>
        </div>

        <div className="space-y-12 xl:space-y-16 relative pb-10">
          {journeyData.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === journeyData.length - 1;

            return (
              <div
                key={`${item.company}-${item.date}`}
                ref={isFirst ? firstItemRef : isLast ? lastItemRef : null}
                className="relative flex items-center w-full"
              >
                <div className="absolute left-[13px] md:left-[33px] z-10 flex justify-center items-center">
                  <motion.div
                    initial="inactive"
                    whileInView="active"
                    viewport={{ margin: "10000px 0px -50% 0px" }}
                    variants={{
                      inactive: { backgroundColor: "#1e293b", borderColor: "#0f172a", scale: 1 },
                      active: { backgroundColor: "#06b6d4", borderColor: "#22d3ee", scale: 1.2 }
                    }}
                    className="w-[18px] h-[18px] rounded-full border-[3px] transition-all duration-500 flex items-center justify-center bg-[#0a0a0a]"
                  >
                    <motion.div
                      variants={{ inactive: { scale: 0 }, active: { scale: 1 } }}
                      className="w-1.5 h-1.5 rounded-full bg-white"
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </div>

                <div className="w-full flex justify-start">
                  <div className="w-full pl-[56px] md:pl-[96px] pr-4 md:pr-0">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-3xl p-5 sm:p-8 w-full hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden group shadow-xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 items-start relative z-10">
                          <div className="w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] shrink-0 rounded-2xl overflow-hidden border border-white/5 bg-[#0f0f0f] flex items-center justify-center p-2 sm:p-3">
                            <Image src={item.image} alt={item.company} width={100} height={100} className="object-contain w-full h-full" />
                          </div>

                          <div className="flex flex-col flex-1 w-full min-w-0">
                            <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] tracking-[0.2em] text-slate-300 uppercase font-bold mb-1.5 sm:mb-2">
                              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-pink-500" />
                              {item.location}
                            </div>

                            <h3 className="text-xl sm:text-2xl xl:text-3xl font-bold text-white mb-1 tracking-tight">
                              {item.title}
                            </h3>
                            <span className="text-sm font-semibold text-cyan-300 mb-3">
                              {item.company}
                            </span>

                            <div className="flex flex-row flex-wrap items-center gap-1.5 sm:gap-2 mb-3">
                              <div className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] sm:text-[12px] font-bold flex items-center gap-1.5 whitespace-nowrap">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                {item.type === "education" ? (
                                  <GraduationCap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-orange-400" />
                                ) : (
                                  <Briefcase className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-600" />
                                )}
                                <span>{item.type === "education" ? "Education" : "Work"}</span>
                              </div>

                              <div className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] sm:text-[12px] font-bold flex items-center gap-1.5 whitespace-nowrap">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                {item.status}
                              </div>

                              {item.isActive && (
                                <div className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] sm:text-[12px] font-bold flex items-center gap-1.5 whitespace-nowrap">
                                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                                  Active
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-2 text-sm font-semibold text-amber-200/95">
                              <Calendar className="w-4 h-4 text-blue-300" />
                              {item.date}
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 bg-[#0d0f18] border border-[#1a1f35] rounded-xl p-5 text-slate-300 text-[15px] leading-relaxed relative z-10 shadow-inner">
                          {item.description}
                        </div>

                        <div className="mt-6 space-y-4 relative z-10">
                          <h4 className="flex items-center gap-2 text-[16px] font-bold text-purple-400">
                            <Trophy className="w-5 h-5" />
                            Key Achievements
                          </h4>
                          <ul className="space-y-3.5">
                            {item.achievements.map((achievement) => (
                              <li key={achievement} className="flex items-start gap-3.5 text-slate-200 text-[15px] leading-relaxed">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-2 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                                <span className="flex-1">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
