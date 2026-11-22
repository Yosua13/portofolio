"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Gamepad2,
  Maximize2,
  Menu,
  X,
  CheckCircle2,
  Layers,
  Globe
} from "lucide-react";
import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import WelcomeScreen from "@/components/WelcomeScreen";
import ProjectsSection, {
  getProjectsData,
  type ProjectData,
  type ProjectScreen
} from "@/components/ProjectsSection";
import WhatIDoSection from "@/components/WhatIDoSection";
import ProfileSection from "@/components/ProfileSection";
import SkillsSection from "@/components/SkillsSection";
import JourneySection from "@/components/JourneySection";
import CvSection from "@/components/CvSection";
import ContactSection from "@/components/ContactSection";
import RecruiterSnapshot from "@/components/RecruiterSnapshot";
import { useLanguage, type Language } from "@/context/LanguageContext";

function ProjectScreenshotCarousel({
  projectTitle,
  projectId,
  previewTone,
  screens,
  language
}: {
  projectTitle: string;
  projectId: string;
  previewTone: string;
  screens: ProjectScreen[];
  language: Language;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewScreen, setPreviewScreen] = useState<ProjectScreen | null>(null);
  const activeScreen = screens[activeIndex] ?? screens[0];
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  const goToPrevious = () => {
    setActiveIndex((currentIndex) => (currentIndex === 0 ? screens.length - 1 : currentIndex - 1));
  };

  const goToNext = () => {
    setActiveIndex((currentIndex) => (currentIndex === screens.length - 1 ? 0 : currentIndex + 1));
  };

  const scrollThumbnails = (direction: "left" | "right") => {
    if (thumbnailContainerRef.current) {
      const scrollAmount = 240;
      thumbnailContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    if (thumbnailContainerRef.current) {
      const container = thumbnailContainerRef.current;
      const activeChild = container.children[activeIndex] as HTMLElement;
      if (activeChild) {
        const containerWidth = container.clientWidth;
        const childOffset = activeChild.offsetLeft;
        const childWidth = activeChild.clientWidth;
        container.scrollTo({
          left: childOffset - containerWidth / 2 + childWidth / 2,
          behavior: "smooth"
        });
      }
    }
  }, [activeIndex]);

  if (!activeScreen) return null;

  const hasScreenImage = Boolean(activeScreen.image);

  return (
    <>
      <div className="screenshot-carousel-shell overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] p-3 sm:p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300">
              {String(activeIndex + 1).padStart(2, "0")} / {String(screens.length).padStart(2, "0")}
            </span>
            <h5 className="carousel-title mt-2 text-lg font-black text-white">{activeScreen.title}</h5>
            <p className="carousel-caption mt-1 text-sm leading-relaxed text-slate-400">{activeScreen.caption}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goToPrevious}
              className="carousel-control inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition-colors hover:border-indigo-400/50 hover:text-white cursor-pointer"
              aria-label={`Previous ${projectTitle} screenshot`}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="carousel-control inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition-colors hover:border-indigo-400/50 hover:text-white cursor-pointer"
              aria-label={`Next ${projectTitle} screenshot`}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {hasScreenImage && activeScreen.image ? (
          <button
            type="button"
            onClick={() => setPreviewScreen(activeScreen)}
            className="group/screen relative mt-5 block w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950/90 text-left transition-colors hover:border-indigo-400/50 cursor-pointer"
            aria-label={`Open ${activeScreen.title} screenshot preview`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScreen.image}
                initial={{ opacity: 0, x: 36, scale: 0.985 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -36, scale: 0.985 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="relative w-full bg-slate-950"
                style={{ aspectRatio: activeScreen.aspectRatio ?? "16 / 9" }}
              >
                <Image
                  src={activeScreen.image}
                  alt={`${activeScreen.title} screenshot`}
                  fill
                  sizes="(max-width: 768px) 100vw, 1100px"
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>

            <div className="modal-icon-button pointer-events-none absolute bottom-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white opacity-0 shadow-2xl backdrop-blur-md transition-opacity group-hover/screen:opacity-100">
              <Maximize2 className="h-4 w-4" />
            </div>
          </button>
        ) : (
          <div className="relative mt-5 w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950 p-6 sm:p-10 text-left">
            <div className={`absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br ${previewTone} opacity-20 blur-3xl pointer-events-none`} />
            <div className="relative z-10 flex flex-col justify-between gap-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300">
                  <Layers className="h-3.5 w-3.5" />
                  {activeScreen.moduleTag ?? `MODULE ${String(activeIndex + 1).padStart(2, "0")}`}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {language === "id"
                    ? `Slot Screenshot Siap: public/assets/projects/${projectId}/screenshots/`
                    : `Screenshot Slot Ready: public/assets/projects/${projectId}/screenshots/`}
                </span>
              </div>

              <div className="space-y-2 max-w-3xl">
                <h6 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {activeScreen.title}
                </h6>
                <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                  {activeScreen.caption}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="relative group/thumbs mt-4">
          <button
            type="button"
            onClick={() => scrollThumbnails("left")}
            className="carousel-control absolute left-2 top-8 sm:top-10 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/70 text-slate-300 opacity-0 group-hover/thumbs:opacity-100 focus:opacity-100 transition-all duration-300 hover:border-indigo-400 hover:text-white backdrop-blur-md cursor-pointer shadow-lg active:scale-95"
            aria-label="Scroll thumbnails left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => scrollThumbnails("right")}
            className="carousel-control absolute right-2 top-8 sm:top-10 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/70 text-slate-300 opacity-0 group-hover/thumbs:opacity-100 focus:opacity-100 transition-all duration-300 hover:border-indigo-400 hover:text-white backdrop-blur-md cursor-pointer shadow-lg active:scale-95"
            aria-label="Scroll thumbnails right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div
            ref={thumbnailContainerRef}
            className="flex gap-2 overflow-x-auto pb-2 scroll-smooth"
          >
            {screens.map((screen, index) => (
              <button
                key={`${screen.title}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`relative h-16 w-28 shrink-0 overflow-hidden rounded-xl border bg-slate-950 transition-all duration-300 sm:h-20 sm:w-36 cursor-pointer ${
                  activeIndex === index
                    ? "border-indigo-400 opacity-100 shadow-lg shadow-indigo-500/20"
                    : "border-white/10 opacity-55 hover:border-white/30 hover:opacity-100"
                }`}
                aria-label={`Show ${screen.title} screenshot`}
              >
                {screen.image ? (
                  <Image
                    src={screen.image}
                    alt=""
                    fill
                    sizes="144px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-start justify-end p-2.5 text-left bg-gradient-to-br from-slate-900 to-slate-950">
                    <span className="line-clamp-2 text-[9px] font-bold text-slate-200 leading-tight">
                      {screen.title}
                    </span>
                  </div>
                )}
                <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[8px] font-black text-white backdrop-blur-sm">
                  {index + 1}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {previewScreen && previewScreen.image && (
          <div className="fixed inset-0 z-[180] flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewScreen(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-lg"
            />

            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              onClick={() => setPreviewScreen(null)}
              className="relative z-10 w-full max-w-[1500px] overflow-hidden rounded-2xl border border-white/10 bg-slate-950 p-2 shadow-2xl shadow-black/70"
              aria-label={`Close ${previewScreen.title} screenshot preview`}
            >
              <div
                className="relative w-full"
                style={{ aspectRatio: previewScreen.aspectRatio ?? "16 / 9" }}
              >
                <Image
                  src={previewScreen.image}
                  alt={`${previewScreen.title} screenshot`}
                  fill
                  sizes="96vw"
                  className="object-contain"
                  priority
                />
              </div>
            </motion.button>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Portfolio() {
  const { language, toggleLanguage } = useLanguage();

  const navItems = [
    { id: "hero", label: language === "id" ? "Beranda" : "Home" },
    { id: "projects", label: language === "id" ? "Proyek" : "Projects" },
    { id: "what-i-do", label: language === "id" ? "Solusi" : "Solutions" },
    { id: "profile", label: language === "id" ? "Profil" : "Profile" },
    { id: "skills", label: language === "id" ? "Keahlian" : "Skills" },
    { id: "journey", label: language === "id" ? "Perjalanan" : "Journey" },
    { id: "cv", label: "CV" },
    { id: "contact", label: language === "id" ? "Kontak" : "Contact" }
  ];

  const [activeSection, setActiveSection] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [playMusicOnStart, setPlayMusicOnStart] = useState(false);
  const [showControlsGuide, setShowControlsGuide] = useState(false);
  const [playMode, setPlayMode] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const projectsList = getProjectsData(language);
  const selectedProject: ProjectData | null =
    selectedProjectId ? projectsList.find((p) => p.id === selectedProjectId) ?? null : null;

  const handleSelectProject = (project: ProjectData | null) => {
    setSelectedProjectId(project ? project.id : null);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    if (typeof document !== "undefined") {
      if (newTheme === "light") {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
    }
  };

  // Disable body scroll when modal, menu, or welcome screen is active
  useEffect(() => {
    if (selectedProject || showWelcome || isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject, showWelcome, isMobileMenuOpen]);

  const handleWelcomeComplete = (sound: boolean, destination: string) => {
    setPlayMusicOnStart(sound);
    setShowWelcome(false);
    setActiveSection("hero");

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

      if (window.scrollY < 100) {
        setActiveSection("hero");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && anchor.hash && anchor.hash.startsWith("#")) {
        setIsMobileMenuOpen(false);
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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (window.scrollY < 100) {
              setActiveSection("hero");
            } else {
              setActiveSection(entry.target.id);
            }
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    const sections = ["hero", "projects", "what-i-do", "profile", "skills", "journey", "cv", "contact"];
    sections.forEach((id) => {
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
      <nav className="fixed w-full z-50 top-6 px-6 md:px-12 lg:px-20 pointer-events-none">
        <div className="w-full flex items-center justify-between">
          {/* Left: Logo */}
          <div className="pointer-events-auto flex items-center">
            <a
              href="#hero"
              className="app-brand-lockup flex items-center gap-3 rounded-full px-3.5 py-2 backdrop-blur-md transition-transform duration-300 group hover:-translate-y-0.5"
            >
              <span className="app-brand-mark font-serif italic font-bold text-3xl text-white group-hover:text-indigo-400 transition-colors">
                YRM
              </span>
              <div className="flex flex-col justify-center">
                <span className="app-brand-name text-indigo-400 font-medium tracking-tight text-lg leading-tight">
                  Yos&apos;z
                </span>
                <span className="app-brand-role text-slate-400 text-[11px] font-light tracking-wide uppercase">
                  Software Engineer
                </span>
              </div>
            </a>
          </div>

          {/* Center: Floating Navigation */}
          <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto hidden xl:block">
            <div className="floating-nav-shell flex items-center bg-white/[0.08] backdrop-blur-md backdrop-saturate-[140%] border border-white/10 rounded-full px-2 py-1.5 shadow-2xl">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative px-4 py-2.5 text-sm font-medium transition-colors ${
                    activeSection === item.id ? "text-indigo-400" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-1.5 left-4 right-4 h-[2px] bg-indigo-400"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="pointer-events-auto flex xl:hidden items-center gap-2">
            {/* Quick Mobile Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="theme-icon-button flex items-center justify-center gap-1 h-11 px-3 rounded-full border border-white/10 bg-white/[0.08] text-xs font-extrabold uppercase tracking-wider text-slate-300 hover:text-white hover:border-indigo-500/40 transition-colors backdrop-blur-md cursor-pointer"
              aria-label="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>{language.toUpperCase()}</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen((value) => !value)}
              className="theme-icon-button flex items-center justify-center w-11 h-11 rounded-full border border-white/10 bg-white/[0.08] text-slate-300 hover:text-white hover:border-indigo-500/40 transition-colors backdrop-blur-md"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Right: Socials, Theme Toggle & Language Toggle */}
          <div className="social-actions-shell pointer-events-auto hidden sm:flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 backdrop-blur-md">
            {/* GitHub */}
            <div className="relative group">
              <a
                href="https://github.com/Yosua13"
                target="_blank"
                rel="noreferrer"
                className="theme-icon-button flex items-center justify-center w-10 h-10 text-slate-400 hover:text-white transition-colors hover:scale-110"
                aria-label="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
              </a>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2.5 py-1 custom-tooltip text-[10px] text-white uppercase font-bold tracking-wider rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-xl whitespace-nowrap z-50">
                GitHub
              </div>
            </div>
            {/* LinkedIn */}
            <div className="relative group">
              <a
                href="https://www.linkedin.com/in/yosua-reynaldi-manurun/"
                target="_blank"
                rel="noreferrer"
                className="theme-icon-button flex items-center justify-center w-10 h-10 text-slate-400 hover:text-white transition-colors hover:scale-110"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2.5 py-1 custom-tooltip text-[10px] text-white uppercase font-bold tracking-wider rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-xl whitespace-nowrap z-50">
                LinkedIn
              </div>
            </div>
            {/* Email */}
            <div className="relative group">
              <a
                href="mailto:reyyosua29@gmail.com"
                className="theme-icon-button flex items-center justify-center w-10 h-10 text-slate-400 hover:text-white transition-colors hover:scale-110"
                aria-label="Email"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              </a>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2.5 py-1 custom-tooltip text-[10px] text-white uppercase font-bold tracking-wider rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-xl whitespace-nowrap z-50">
                Email
              </div>
            </div>

            {/* Divider */}
            <span className="w-px h-4 bg-white/10 mx-1" />

            {/* Theme Toggle Switcher (Brightness) */}
            <div className="relative group">
              <button
                onClick={toggleTheme}
                className="theme-icon-button flex items-center justify-center w-10 h-10 text-slate-400 hover:text-white transition-colors hover:scale-110 cursor-pointer"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                )}
              </button>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2.5 py-1 custom-tooltip text-[10px] text-white uppercase font-bold tracking-wider rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-xl whitespace-nowrap z-50">
                {theme === "dark"
                  ? language === "id"
                    ? "Mode Terang"
                    : "Light Mode"
                  : language === "id"
                  ? "Mode Gelap"
                  : "Dark Mode"}
              </div>
            </div>

            {/* Language Toggle Switcher (ID / EN) right next to Brightness */}
            <div className="relative group">
              <button
                onClick={toggleLanguage}
                className="theme-icon-button flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] hover:border-indigo-500/40 px-2.5 py-1.5 text-[11px] font-black uppercase tracking-wider transition-all hover:scale-105 cursor-pointer"
                aria-label={language === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
              >
                <Globe className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className={language === "id" ? "text-indigo-400" : "text-slate-500"}>ID</span>
                <span className="text-slate-600">/</span>
                <span className={language === "en" ? "text-indigo-400" : "text-slate-500"}>EN</span>
              </button>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2.5 py-1 custom-tooltip text-[10px] text-white uppercase font-bold tracking-wider rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-xl whitespace-nowrap z-50">
                {language === "id" ? "Switch to English" : "Bahasa Indonesia"}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="mobile-nav-shell fixed top-24 left-4 right-4 z-[70] xl:hidden rounded-2xl border border-white/10 bg-[#080a12]/95 p-4 shadow-2xl backdrop-blur-xl"
          >
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                    activeSection === item.id
                      ? "border-indigo-500/40 bg-indigo-500/15 text-indigo-300"
                      : "border-white/5 bg-white/[0.03] text-slate-300 hover:border-white/15 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="https://github.com/Yosua13"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/yosua-reynaldi-manurun/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white"
                >
                  LinkedIn
                </a>
                <a
                  href="mailto:reyyosua29@gmail.com"
                  className="rounded-full border border-white/10 px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white"
                >
                  Email
                </a>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className="rounded-full border border-white/10 px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white cursor-pointer"
                  aria-label="Toggle Theme"
                >
                  {theme === "dark"
                    ? language === "id"
                      ? "Terang"
                      : "Light"
                    : language === "id"
                    ? "Gelap"
                    : "Dark"}
                </button>
                <button
                  onClick={toggleLanguage}
                  className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-2 text-xs font-extrabold uppercase tracking-wider text-indigo-300 hover:text-white cursor-pointer"
                  aria-label="Toggle Language"
                >
                  {language === "id" ? "ID / EN" : "EN / ID"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <HeroSection playMode={playMode} setPlayMode={setPlayMode} playMusicOnStart={playMusicOnStart} />

      <main className="relative z-10 pb-24 px-8 md:px-16 max-w-[1300px] mx-auto space-y-40">
        <RecruiterSnapshot />
        <ProjectsSection setSelectedProject={handleSelectProject} />
        <WhatIDoSection />
        <ProfileSection />
        <SkillsSection />
        <JourneySection />
        <CvSection />
        <ContactSection />
      </main>

      <footer className="border-t border-white/5 py-12 text-center text-slate-600 text-sm font-light">
        <p>&copy; {new Date().getFullYear()} Yosua Reynaldi Manurun.</p>
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
              onClick={() => handleSelectProject(null)}
              className="project-modal-backdrop absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="project-modal-surface bg-[#070709] border border-white/10 rounded-none w-full max-w-6xl xl:max-w-7xl relative z-10 overflow-hidden flex flex-col max-h-[92vh]"
            >
              {/* Close Button */}
              <button
                aria-label="Close project details"
                type="button"
                onClick={() => handleSelectProject(null)}
                className="modal-icon-button absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-20 bg-black/40 p-2 border border-white/5 rounded-none cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Scrollable Container */}
              <div className="overflow-y-auto w-full">
                {/* Modal Top Media / Architecture Showcase */}
                {selectedProject.hasVideoFile && selectedProject.video ? (
                  <div className="relative w-full shrink-0 overflow-hidden bg-slate-950 p-5 sm:p-8">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.35),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(6,182,212,0.22),transparent_28%),linear-gradient(135deg,rgba(15,23,42,0.96),rgba(3,7,18,0.98))]" />
                    <div className="modal-soft-panel relative mx-auto max-w-3xl rounded-[24px] border border-white/10 bg-black/35 p-4 shadow-2xl shadow-black/60 backdrop-blur-md">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                          <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-white/60">
                          {language === "id" ? "Demo Aplikasi" : "Application Demo"}
                        </span>
                      </div>
                      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80">
                        <video
                          src={selectedProject.video}
                          className="absolute inset-0 h-full w-full object-cover"
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                        />
                      </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#070709] to-transparent" />
                  </div>
                ) : (
                  <div className="relative w-full shrink-0 overflow-hidden bg-slate-950 p-6 sm:p-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(99,102,241,0.25),transparent_45%),radial-gradient(circle_at_75%_20%,rgba(16,185,129,0.18),transparent_40%),linear-gradient(135deg,rgba(15,23,42,0.96),rgba(3,7,18,0.98))]" />
                    <div className="modal-soft-panel relative mx-auto max-w-4xl rounded-[24px] border border-white/10 bg-black/45 p-6 sm:p-8 shadow-2xl shadow-black/60 backdrop-blur-md space-y-5">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-emerald-300">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          {language === "id" ? "Status Proyek: Rilis & Terbuka" : "Project Status: Released & Open"}
                        </div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
                          {language === "id"
                            ? `Slot Video: public/assets/projects/${selectedProject.id}/videos/demo.mp4`
                            : `Video Slot: public/assets/projects/${selectedProject.id}/videos/demo.mp4`}
                        </span>
                      </div>

                      <div className="space-y-3 text-left">
                        <h4 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                          {selectedProject.headline}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                          {selectedProject.highlights.map((item, idx) => (
                            <div
                              key={idx}
                              className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 text-xs text-slate-200 leading-relaxed"
                            >
                              <span className="block text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-1">
                                {language === "id" ? `Pilar 0${idx + 1}` : `Pillar 0${idx + 1}`}
                              </span>
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#070709] to-transparent" />
                  </div>
                )}

                {/* Modal Content */}
                <div className="p-6 md:p-8 space-y-6">
                  <div>
                    <h3 className="modal-strong-text text-2xl md:text-3xl font-extrabold text-white tracking-tight font-sans">
                      {selectedProject.title}
                    </h3>
                    <p className="text-indigo-400 text-xs md:text-sm font-semibold tracking-wider uppercase mt-1">
                      {selectedProject.tags.join(" / ")}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      {language === "id" ? "Tentang Proyek" : "About the Project"}
                    </h4>
                    <p className="modal-body-text text-slate-300 font-light leading-relaxed text-sm md:text-base">
                      {selectedProject.fullDescription}
                    </p>
                  </div>

                  {selectedProject.problem && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                        {language === "id" ? "Tantangan & Permasalahan" : "The Challenge"}
                      </h4>
                      <p className="modal-body-text text-slate-350 font-light leading-relaxed text-sm md:text-base">
                        {selectedProject.problem}
                      </p>
                    </div>
                  )}

                  {selectedProject.contribution && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                        {language === "id" ? "Kontribusi & Arsitektur" : "My Contribution"}
                      </h4>
                      <p className="modal-body-text text-slate-350 font-light leading-relaxed text-sm md:text-base">
                        {selectedProject.contribution}
                      </p>
                    </div>
                  )}

                  {selectedProject.impact && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                        {language === "id" ? "Dampak & Hasil" : "Impact & Results"}
                      </h4>
                      <p className="modal-soft-panel modal-body-text text-slate-200 font-medium leading-relaxed text-sm md:text-base bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-xl">
                        {selectedProject.impact}
                      </p>
                    </div>
                  )}

                  {selectedProject.screens && selectedProject.screens.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                        {language === "id" ? "Screenshot & Modul Aplikasi" : "Application Screenshots & Modules"}
                      </h4>
                      <ProjectScreenshotCarousel
                        projectTitle={selectedProject.title}
                        projectId={selectedProject.id}
                        previewTone={selectedProject.previewTone}
                        screens={selectedProject.screens}
                        language={language}
                      />
                    </div>
                  )}

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      {language === "id" ? "Teknologi yang Digunakan" : "Technologies Used"}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map((tech: string) => (
                        <span
                          key={tech}
                          className="modal-chip px-3 py-1 bg-white/5 border border-white/5 text-slate-300 text-xs font-semibold uppercase tracking-wider rounded-none"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center justify-end gap-3">
                    {selectedProject.githubLink && (
                      <a
                        href={selectedProject.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-secondary-action inline-flex items-center gap-2 px-5 py-2.5 border border-white/15 bg-white/5 text-slate-200 font-bold hover:bg-white/10 hover:border-white/30 transition-colors uppercase tracking-wider text-xs rounded-none"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        {language === "id" ? "Repositori GitHub" : "GitHub Repository"}
                      </a>
                    )}
                    {selectedProject.link ? (
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-primary-action inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#0a0a0a] font-bold hover:bg-slate-200 transition-colors uppercase tracking-wider text-xs rounded-none"
                      >
                        {language === "id" ? "Kunjungi Website Live" : "Visit Live Website"}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : !selectedProject.githubLink && (
                      <span className="modal-secondary-action inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 bg-white/5 text-slate-300 font-bold uppercase tracking-wider text-xs rounded-none">
                        {language === "id" ? "Studi Kasus Proyek Internal" : "Internal project case study"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {playMode && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={() => setShowControlsGuide(true)}
            className="game-controls-btn fixed bottom-24 right-6 z-[60] inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/70 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-cyan-300 shadow-xl backdrop-blur-md transition-colors hover:border-cyan-400/60 hover:text-cyan-100"
          >
            <Gamepad2 className="w-4 h-4" />
            {language === "id" ? "Kontrol" : "Controls"}
          </motion.button>
        )}
      </AnimatePresence>

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
              className="game-modal bg-[#0b0c16] border border-white/10 rounded-2xl p-6 md:p-8 max-w-md w-full relative z-10 text-center shadow-2xl flex flex-col items-center"
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
                {language === "id" ? "Panduan Kontrol" : "Controls Guide"}
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
                    <span className="block text-xs font-bold text-slate-300 uppercase font-sans tracking-wide">
                      {language === "id" ? "Kemudi Pesawat" : "Steer Spacecraft"}
                    </span>
                    <p className="text-[11px] text-slate-400 leading-normal font-light">
                      {language === "id"
                        ? "Tekan dan tahan tombol WASD untuk menerbangkan pesawat menjelajah ke berbagai arah secara dinamis di halaman utama."
                        : "Press and hold WASD keys to steer your spacecraft dynamically across the main hero viewport."}
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
                    <span className="block text-xs font-bold text-slate-300 uppercase font-sans tracking-wide">
                      {language === "id" ? "Menembak Laser" : "Fire Laser"}
                    </span>
                    <p className="text-[11px] text-slate-400 leading-normal font-light">
                      {language === "id"
                        ? "Tekan tombol Spasi pada keyboard untuk menembak laser ke arah depan."
                        : "Press the Spacebar key to fire lasers at incoming targets."}
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
                    <span className="block text-xs font-bold text-slate-300 uppercase font-sans tracking-wide">
                      {language === "id" ? "Game Tantangan" : "Mission Challenge"}
                    </span>
                    <p className="text-[11px] text-slate-400 leading-normal font-light">
                      {language === "id"
                        ? "Hancurkan asteroid (+50 poin) dan drone musuh (+100 poin). Jaga tameng pelindung dari tabrakan."
                        : "Destroy asteroids (+50 pts) and enemy drones (+100 pts). Protect your ship's shield from collisions."}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowControlsGuide(false)}
                className="w-full py-3 bg-white text-[#0a0a0a] hover:bg-slate-200 font-bold uppercase tracking-wider text-xs rounded-xl transition-colors cursor-pointer"
              >
                {language === "id" ? "Tutup Panduan" : "Close Guide"}
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
            <svg
              className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m14 7-3-3-3 3" />
              <path d="M11 4v8" />
              <path d="M15 15v-3a2 2 0 0 0-4 0v4h-1v-2a1.5 1.5 0 0 0-3 0v5a5 5 0 0 0 10 0v-4Z" />
            </svg>
            <span className="text-[9px] font-bold uppercase tracking-[0.15em] font-sans">
              {language === "id" ? "Ke Atas" : "Scroll Top"}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
