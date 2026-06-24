"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { MapPin, GraduationCap, Briefcase, Calendar, Trophy, ExternalLink, Globe } from "lucide-react";
import SectionHeader from "./SectionHeader";

const journeyData = [
  {
    type: "career",
    title: "Software Engineer — Internal Business System",
    company: "Tech Corp",
    location: "Bandung, Indonesia",
    status: "Contract",
    isActive: true,
    date: "Aug 2025 - Present",
    image: "/company1.png",
    description: "Designed, built, and maintained high-performance backend APIs, SQL databases, and core assignment workflows for sales operations and business management systems.",
    achievements: [
      "Developed high-performance RESTful APIs and microservices using Java, Spring Boot, and Golang.",
      "Optimized complex SQL queries and schema indexing in MS SQL Server, reducing query execution latency by 30%.",
      "Created the core automated campaign distribution scoring engine, eliminating manual assignment workloads for operation teams."
    ],
    website: "https://example.com"
  },
  {
    type: "career",
    title: "Frontend Developer Intern — Digital Platform",
    company: "Creative Studio",
    location: "Jakarta, Indonesia",
    status: "Internship",
    isActive: false,
    date: "Jan 2025 - Jul 2025",
    image: "/company2.png",
    description: "Collaborated in building interactive, high-fidelity customer dashboards and portal sites, migrating legacy web codebases to modern architectures.",
    achievements: [
      "Built modular, reusable, and interactive UI components using Next.js, React, TypeScript, and Tailwind CSS.",
      "Assisted in migrating client-facing operations dashboards from legacy Angular codebases to Next.js.",
      "Integrated backend endpoints with React hooks and localized state management, ensuring responsive mobile and desktop viewports."
    ],
    website: "https://example.com"
  },
  {
    type: "education",
    title: "Bachelor of Computer Science",
    company: "University of Technology",
    location: "Bandung, Indonesia",
    status: "Student",
    isActive: false,
    date: "Aug 2021 - Jan 2025",
    image: "/university.png",
    description: "Completed rigorous coursework in computer science, software engineering, databases, and algorithms, graduating with honors.",
    achievements: [
      "Graduated with honors, GPA 3.8/4.0.",
      "Lead developer for the university's official student portal system using React and Node.js.",
      "Active participant in competitive programming events and local hackathons."
    ],
    website: "https://example.com"
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
        bottomText="My professional experience and educational background"
        watermark="JOURNEY"
      />

      <div className="relative w-full max-w-[1400px] mx-auto" ref={timelineContainerRef}>
        {/* Timeline Line */}
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
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[4px] h-[4px] bg-white rounded-full"></div>
          </motion.div>
        </div>

        <div className="space-y-12 xl:space-y-16 relative pb-10">
          {journeyData.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === journeyData.length - 1;
            return (
              <div 
                key={index} 
                ref={isFirst ? firstItemRef : isLast ? lastItemRef : null}
                className="relative flex items-center w-full"
              >
                
                {/* Node */}
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

                {/* Content Container */}
                <div className="w-full flex justify-start">
                  <div className="w-full pl-[56px] md:pl-[96px] pr-4 md:pr-0">
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-3xl p-5 sm:p-8 w-full hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden group shadow-xl">
                        
                        {/* Subtle gradient background on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Header Info */}
                        <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 items-start relative z-10">
                          <div className="w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] shrink-0 rounded-2xl overflow-hidden border border-white/5 bg-[#0f0f0f] flex items-center justify-center p-2 sm:p-3">
                            <Image src={item.image} alt={item.company} width={100} height={100} className="object-contain w-full h-full" />
                          </div>
                          
                          {/* Right Header Content */}
                          <div className="flex flex-col flex-1 w-full min-w-0">
                            {/* Location */}
                            <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] tracking-[0.2em] text-slate-300 uppercase font-bold mb-1.5 sm:mb-2">
                              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-pink-500" />
                              {item.location}
                            </div>
                            
                            {/* Title */}
                            <h3 className="text-xl sm:text-2xl xl:text-3xl font-bold text-white mb-2 sm:mb-3 tracking-tight whitespace-nowrap">{item.title}</h3>
                            
                            {/* Badges */}
                            <div className="flex flex-row flex-nowrap items-center gap-1.5 sm:gap-2 mb-3">
                              {/* Type Label */}
                              <div className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] sm:text-[12px] font-bold flex items-center gap-1.5 whitespace-nowrap">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                {item.type === "education" ? <GraduationCap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-orange-400" /> : <Briefcase className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-600" />}
                                <span className="capitalize">{item.type === "education" ? "Education" : "Work"}</span>
                              </div>
                              
                              {/* Status Label */}
                              <div className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] sm:text-[12px] font-bold flex items-center gap-1.5 whitespace-nowrap">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                                {item.status}
                              </div>
                              
                              {/* Active Badge */}
                              {item.isActive && (
                                <div className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] sm:text-[12px] font-bold flex items-center gap-1.5 whitespace-nowrap">
                                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></div>
                                  Active
                                </div>
                              )}
                            </div>
                            
                            {/* Date */}
                            <div className="flex items-center gap-2 text-sm font-semibold text-amber-100/70">
                              <Calendar className="w-4 h-4 text-blue-300" />
                              {item.date}
                            </div>
                          </div>
                        </div>

                        {/* Description Box */}
                        <div className="mt-6 bg-[#0d0f18] border border-[#1a1f35] rounded-xl p-5 text-slate-300 text-[15px] leading-relaxed relative z-10 shadow-inner">
                          {item.description}
                        </div>

                        {/* Achievements */}
                        <div className="mt-6 space-y-4 relative z-10">
                          <h4 className="flex items-center gap-2 text-[16px] font-bold text-purple-400">
                            <Trophy className="w-5 h-5" />
                            Key Achievements
                          </h4>
                          <ul className="space-y-3.5">
                            {item.achievements.map((ach, i) => (
                              <li key={i} className="flex items-start gap-3.5 text-slate-200 text-[15px] leading-relaxed">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-2 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                                <span className="flex-1">{ach}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Visit Website Button */}
                        {item.website && (
                          <div className="mt-8 flex justify-end relative z-10">
                            <a href={item.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#111424] hover:bg-[#1a2035] border border-[#1e2540] rounded-xl text-sm font-bold text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                              <Globe className="w-4 h-4 text-blue-400" />
                              Visit Website
                              <ExternalLink className="w-3.5 h-3.5 text-slate-400 ml-1" />
                            </a>
                          </div>
                        )}

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
