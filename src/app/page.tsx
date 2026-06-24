"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { ExternalLink, Gamepad2, X } from "lucide-react";
import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import MusicPlayer from "@/components/MusicPlayer";
import WelcomeScreen from "@/components/WelcomeScreen";
import ProjectsSection from "@/components/ProjectsSection";
import WhatIDoSection from "@/components/WhatIDoSection";
import ProfileSection from "@/components/ProfileSection";
import SkillsSection from "@/components/SkillsSection";
import JourneySection from "@/components/JourneySection";
import CvSection from "@/components/CvSection";
import ContactSection from "@/components/ContactSection";

interface ProjectType {
  id: string;
  title: string;
  location: string;
  role: string;
  headline: string;
  description: string;
  fullDescription: string;
  problem?: string;
  contribution?: string;
  impact?: string;
  image: string;
  tags: string[];
  techStack: string[];
  link: string;
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("");
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [playMusicOnStart, setPlayMusicOnStart] = useState(false);
  const [showControlsGuide, setShowControlsGuide] = useState(false);
  const [playMode, setPlayMode] = useState(false);


  // Disable body scroll when modal or welcome screen is active
  useEffect(() => {
    if (selectedProject || showWelcome) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject, showWelcome]);

  const handleWelcomeComplete = (sound: boolean, destination: string) => {
    setPlayMusicOnStart(sound);
    setShowWelcome(false);
    


    setActiveSection("hero");

    // Wait for the exit fade transition of welcome screen to complete, then scroll
    setTimeout(() => {
      if (destination === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const element = document.getElementById(destination);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 500);
  };
  
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.3) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // If scroll position is near the top, force active section to "hero"
      if (window.scrollY < 100) {
        setActiveSection("hero");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once initially
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && anchor.hash && anchor.hash.startsWith("#")) {
        const targetId = anchor.hash.substring(1);
        if (targetId === "hero") {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
          setActiveSection("hero");
          return;
        }
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (window.scrollY < 100) {
            setActiveSection("hero");
          } else {
            setActiveSection(entry.target.id);
          }
        }
      });
    }, { rootMargin: "-40% 0px -40% 0px" });

    const sections = ["hero", "projects", "profile", "skills", "journey", "cv", "contact"];
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#050508] text-slate-200 font-sans selection:bg-indigo-500/30 relative">
      {/* Top Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-500 origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed w-full z-50 top-6 px-8 md:px-16 lg:px-24 pointer-events-none">
        <div className="w-full flex items-center justify-between">
          {/* Left: Logo */}
          <div className="pointer-events-auto flex items-center">
            <a href="#hero" className="flex items-center gap-3 group">
              <span className="font-serif italic font-bold text-3xl text-white group-hover:text-indigo-400 transition-colors">YRM</span>
              <div className="flex flex-col justify-center">
                <span className="text-indigo-400 font-medium tracking-tight text-lg leading-tight">Yos&apos;z</span>
                <span className="text-slate-400 text-[11px] font-light tracking-wide uppercase">Software Engineer</span>
              </div>
            </a>
          </div>

          {/* Center: Floating Navigation */}
          <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto hidden md:block">
            <div className="flex items-center bg-white/[0.08] backdrop-blur-md backdrop-saturate-[140%] border border-white/10 rounded-full px-2 py-1.5 shadow-2xl">
              {[
                { id: 'hero', label: 'Home' },
                { id: 'projects', label: 'Projects' },
                { id: 'profile', label: 'Profile' },
                { id: 'skills', label: 'Skills' },
                { id: 'journey', label: 'Journey' },
                { id: 'cv', label: 'CV' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative px-5 py-2 text-sm font-medium transition-colors ${activeSection === item.id ? 'text-indigo-400' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-1 left-5 right-5 h-[2px] bg-indigo-400"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Socials */}
          <div className="pointer-events-auto hidden sm:flex items-center gap-6">
            <a href="#" className="text-slate-400 hover:text-white transition-colors hover:scale-110" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
            </a>
            <a href="https://www.linkedin.com/in/yosua-reynaldi-manurun/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors hover:scale-110" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
            </a>
            <a href="https://github.com/Yosua13" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors hover:scale-110" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection playMode={playMode} setPlayMode={setPlayMode} />

      <main className="relative z-10 pb-24 px-8 md:px-16 max-w-[1300px] mx-auto space-y-40">
        <ProjectsSection setSelectedProject={setSelectedProject} />
        <WhatIDoSection />
        <ProfileSection />
        <SkillsSection />
        <JourneySection />
        <CvSection />
        <ContactSection />
      </main>

      <footer className="border-t border-white/5 py-12 text-center text-slate-600 text-sm font-light">
        <p>© {new Date().getFullYear()} Yosua Reynaldi Manurun.</p>
      </footer>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            
            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-[#070709] border border-white/10 rounded-none w-full max-w-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-20 bg-black/40 p-2 border border-white/5 rounded-none cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Scrollable Container */}
              <div className="overflow-y-auto w-full">
                {/* Modal Image */}
                <div className="aspect-[16/9] relative w-full bg-slate-900 shrink-0">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/30 to-transparent"></div>
                </div>

                {/* Modal Content */}
                <div className="p-6 md:p-8 space-y-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight font-sans">
                      {selectedProject.title}
                    </h3>
                    <p className="text-indigo-400 text-xs md:text-sm font-semibold tracking-wider uppercase mt-1">
                      {selectedProject.tags.join(" • ")}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">About the Project</h4>
                    <p className="text-slate-300 font-light leading-relaxed text-sm md:text-base">
                      {selectedProject.fullDescription}
                    </p>
                  </div>

                  {selectedProject.problem && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">The Challenge</h4>
                      <p className="text-slate-350 font-light leading-relaxed text-sm md:text-base">
                        {selectedProject.problem}
                      </p>
                    </div>
                  )}

                  {selectedProject.contribution && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">My Contribution</h4>
                      <p className="text-slate-350 font-light leading-relaxed text-sm md:text-base">
                        {selectedProject.contribution}
                      </p>
                    </div>
                  )}

                  {selectedProject.impact && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Impact &amp; Results</h4>
                      <p className="text-slate-200 font-medium leading-relaxed text-sm md:text-base bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-xl">
                        {selectedProject.impact}
                      </p>
                    </div>
                  )}

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map((tech: string) => (
                        <span key={tech} className="px-3 py-1 bg-white/5 border border-white/5 text-slate-300 text-xs font-semibold uppercase tracking-wider rounded-none">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#0a0a0a] font-bold hover:bg-slate-200 transition-colors uppercase tracking-wider text-xs rounded-none"
                    >
                      Visit Live Website
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <MusicPlayer playOnStart={playMusicOnStart} playMode={playMode} setPlayMode={setPlayMode} />

      {/* Controls Guide Modal */}
      <AnimatePresence>
        {showControlsGuide && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowControlsGuide(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-[#0b0c16] border border-white/10 rounded-2xl p-6 md:p-8 max-w-md w-full relative z-10 text-center shadow-2xl flex flex-col items-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowControlsGuide(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer bg-white/5 p-1.5 border border-white/5 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>

              <Gamepad2 className="w-10 h-10 text-cyan-400 mb-3 animate-pulse" />
              <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight uppercase font-sans mb-6">
                Controls Guide
              </h2>

              {/* Grid of Controls */}
              <div className="w-full space-y-5 text-left mb-8">
                {/* Control 1: WASD Flight */}
                <div className="flex gap-4 items-start">
                  <div className="flex flex-col items-center gap-1 font-mono shrink-0">
                    <div className="w-7 h-7 flex items-center justify-center bg-[#151726] border border-white/15 rounded-md shadow-md text-[10px] font-bold text-white">
                      W
                    </div>
                    <div className="flex gap-1">
                      <div className="w-7 h-7 flex items-center justify-center bg-[#151726] border border-white/15 rounded-md shadow-md text-[10px] font-bold text-white">
                        A
                      </div>
                      <div className="w-7 h-7 flex items-center justify-center bg-[#151726] border border-white/15 rounded-md shadow-md text-[10px] font-bold text-white">
                        S
                      </div>
                      <div className="w-7 h-7 flex items-center justify-center bg-[#151726] border border-white/15 rounded-md shadow-md text-[10px] font-bold text-white">
                        D
                      </div>
                    </div>
                  </div>
                  <div className="space-y-0.5 pt-1">
                    <span className="block text-xs font-bold text-slate-300 uppercase font-sans tracking-wide">Kemudi Pesawat</span>
                    <p className="text-[11px] text-slate-400 leading-normal font-light">
                      Tekan &amp; Tahan tombol **WASD** untuk menerbangkan pesawat menjelajah ke berbagai arah secara dinamis di halaman utama.
                    </p>
                  </div>
                </div>

                {/* Control 2: Space Shoot */}
                <div className="flex gap-4 items-start">
                  <div className="w-16 flex items-center justify-center shrink-0">
                    <div className="w-full py-1.5 bg-[#151726] border border-white/15 rounded-md shadow-md text-[9px] font-bold text-cyan-400 uppercase tracking-wider font-mono text-center">
                      Space
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <span className="block text-xs font-bold text-slate-300 uppercase font-sans tracking-wide">Menembak Laser</span>
                    <p className="text-[11px] text-slate-400 leading-normal font-light">
                      Tekan tombol **Spasi (Spacebar)** pada keyboard untuk menembak laser ke arah depan.
                    </p>
                  </div>
                </div>

                {/* Control 3: Challenge */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 flex items-center justify-center shrink-0">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                      <Gamepad2 className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <span className="block text-xs font-bold text-slate-300 uppercase font-sans tracking-wide">Game Tantangan</span>
                    <p className="text-[11px] text-slate-400 leading-normal font-light">
                      Hancurkan Asteroid (+50 poin) and Drone musuh (+100 poin). Jaga tameng pelindung Anda dari tabrakan!
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowControlsGuide(false)}
                className="w-full py-3 bg-white text-[#0a0a0a] hover:bg-slate-200 font-bold uppercase tracking-wider text-xs rounded-xl transition-colors cursor-pointer"
              >
                Close Guide
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Welcome Onboarding Screen */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[200]"
          >
            <WelcomeScreen onComplete={handleWelcomeComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Top Button (Fixed Top-Right) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed top-24 right-8 z-[60] flex flex-col items-center gap-1 group text-slate-400 hover:text-white transition-colors cursor-pointer select-none"
          >
            {/* Custom Swipe Up / Hand Pointer SVG */}
            <svg
              className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Arrow pointing up */}
              <path d="m14 7-3-3-3 3" />
              <path d="M11 4v8" />
              {/* Hand contour */}
              <path d="M15 15v-3a2 2 0 0 0-4 0v4h-1v-2a1.5 1.5 0 0 0-3 0v5a5 5 0 0 0 10 0v-4Z" />
            </svg>
            <span className="text-[9px] font-bold uppercase tracking-[0.15em] font-sans">
              Scroll Top
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
