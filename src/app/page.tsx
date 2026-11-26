"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Gamepad2, Menu, X, Globe, Sun, Moon, ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import HeroSection from "@/components/HeroSection";
import WelcomeScreen from "@/components/WelcomeScreen";
import ProjectsSection, {
  getProjectsData,
  type ProjectData
} from "@/components/ProjectsSection";
import ProjectDetailModal from "@/components/ProjectDetailModal";
import WhatIDoSection from "@/components/WhatIDoSection";
import AboutHubSection from "@/components/AboutHubSection";
import ContactSection from "@/components/ContactSection";
import { useLanguage } from "@/context/LanguageContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Portfolio() {
  const { language, toggleLanguage } = useLanguage();

  const navItems = [
    { id: "hero", label: language === "id" ? "Beranda" : "Home" },
    { id: "projects", label: language === "id" ? "Proyek" : "Projects" },
    { id: "what-i-do", label: language === "id" ? "Solusi" : "Solutions" },
    { id: "profile", label: language === "id" ? "Tentang" : "About" },
    { id: "contact", label: language === "id" ? "Kontak" : "Contact" }
  ];

  const [activeSection, setActiveSection] = useState("hero");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [playMusicOnStart, setPlayMusicOnStart] = useState(false);
  const [showControlsGuide, setShowControlsGuide] = useState(false);
  const [playMode, setPlayMode] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const projectsList = getProjectsData(language);
  const selectedProject: ProjectData | null =
    selectedProjectId ? projectsList.find((p) => p.id === selectedProjectId) ?? null : null;

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

  useEffect(() => {
    if (showWelcome || isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showWelcome, isMobileMenuOpen]);

  const handleWelcomeComplete = (sound: boolean, destination: string) => {
    setPlayMusicOnStart(sound);
    setShowWelcome(false);
    setActiveSection("hero");

    setTimeout(() => {
      if (destination === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const element = document.getElementById(destination);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }
    }, 450);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > window.innerHeight * 0.35);
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
        const targetId = anchor.hash.substring(1);
        const targetElement = targetId === "hero" ? document.body : document.getElementById(targetId);
        if (targetId === "hero" || targetElement) {
          e.preventDefault();
          document.body.style.overflow = "";
          setIsMobileMenuOpen(false);
          requestAnimationFrame(() => {
            if (targetId === "hero") {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setActiveSection("hero");
            } else if (targetElement) {
              targetElement.scrollIntoView({ behavior: "smooth" });
            }
          });
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

    const sections = ["hero", "projects", "what-i-do", "profile", "contact"];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <TooltipProvider delayDuration={150}>
      <div className="min-h-screen text-[var(--foreground)] font-sans selection:bg-[var(--accent)]/25 relative">
        {/* Top Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--accent)] origin-left z-[60]"
          style={{ scaleX }}
        />

        {/* Navigation */}
        <nav className="fixed w-full z-50 top-3.5 sm:top-5 px-4 sm:px-6 md:px-10 lg:px-16 pointer-events-none">
          <div className="w-full flex items-center justify-between gap-3">
            {/* Left: Logo */}
            <div className="pointer-events-auto flex items-center shrink-0">
              <a
                href="#hero"
                className="app-brand-lockup flex items-center gap-2 sm:gap-2.5 rounded-full px-3 sm:px-3.5 py-1.5 backdrop-blur-md transition-transform duration-300 group hover:-translate-y-0.5"
              >
                <span className="font-editorial italic font-normal text-xl sm:text-2xl text-[var(--foreground)] group-hover:text-[var(--accent-text)] transition-colors">
                  YRM
                </span>
                <div className="flex flex-col justify-center text-left">
                  <span className="text-[var(--accent-text)] font-semibold tracking-tight text-xs sm:text-sm leading-tight">
                    Yos&apos;z
                  </span>
                  <span className="text-[var(--muted-foreground)] text-[9px] sm:text-[10px] font-normal tracking-wide uppercase">
                    Software Engineer
                  </span>
                </div>
              </a>
            </div>

            {/* Center: Floating 5-Item Navigation (Desktop >= 1024px to prevent tablet overlap) */}
            <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto hidden lg:block">
              <div className="floating-nav-shell flex items-center border rounded-full px-2 py-1 backdrop-blur-md">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`relative px-4 py-2 text-xs font-semibold tracking-wide transition-colors ${
                      activeSection === item.id
                        ? "text-[var(--accent-text)]"
                        : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-1 left-4 right-4 h-[1.5px] bg-[var(--accent)] rounded-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile & Tablet Controls (< 1024px) */}
            <div className="pointer-events-auto flex lg:hidden items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={toggleTheme}
                className="social-actions-shell flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border text-[var(--amber-text)] backdrop-blur-md cursor-pointer"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={toggleLanguage}
                className="social-actions-shell flex items-center justify-center gap-1 h-9 sm:h-10 px-2.5 sm:px-3 rounded-full border text-[11px] font-extrabold uppercase tracking-wider text-[var(--foreground)] backdrop-blur-md cursor-pointer"
                aria-label="Toggle Language"
              >
                <Globe className="w-3.5 h-3.5 text-[var(--accent-text)]" />
                <span>{language.toUpperCase()}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((value) => !value)}
                className="social-actions-shell flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border text-[var(--foreground)] backdrop-blur-md cursor-pointer"
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>

            {/* Right: Socials, Brightness Toggle & Language Switcher (Desktop >= 1024px) */}
            <div className="social-actions-shell pointer-events-auto hidden lg:flex items-center gap-1 rounded-full border px-2 py-1 backdrop-blur-md">
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="https://github.com/Yosua13"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center w-9 h-9 rounded-full text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                    aria-label="GitHub"
                  >
                    <FaGithub className="h-4 w-4" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>GitHub</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="https://www.linkedin.com/in/yosua-reynaldi-manurun/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center w-9 h-9 rounded-full text-[var(--muted-foreground)] hover:text-[#0A66C2] transition-colors"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="h-4 w-4" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>LinkedIn</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="mailto:reyyosua29@gmail.com"
                    className="flex items-center justify-center w-9 h-9 rounded-full text-[var(--muted-foreground)] hover:text-[#EA4335] transition-colors"
                    aria-label="Email"
                  >
                    <SiGmail className="h-4 w-4" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>Email</TooltipContent>
              </Tooltip>

              <span className="w-px h-4 bg-[var(--border)] mx-1" />

              {/* Brightness Toggle */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="flex items-center justify-center w-9 h-9 rounded-full text-[var(--amber-text)] hover:bg-[var(--surface-elevated)] transition-colors cursor-pointer"
                    aria-label="Toggle Theme"
                  >
                    {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {theme === "dark"
                    ? language === "id" ? "Mode Terang" : "Light Mode"
                    : language === "id" ? "Mode Gelap" : "Dark Mode"}
                </TooltipContent>
              </Tooltip>

              {/* Language Switcher right next to Brightness */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={toggleLanguage}
                    className="flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] hover:border-[var(--accent)]/50 px-2.5 py-1.5 text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer"
                    aria-label={language === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
                  >
                    <Globe className="w-3.5 h-3.5 text-[var(--accent-text)] shrink-0" />
                    <span className={language === "id" ? "text-[var(--accent-text)]" : "text-[var(--muted-foreground)]"}>
                      ID
                    </span>
                    <span className="text-[var(--border-strong)]">/</span>
                    <span className={language === "en" ? "text-[var(--accent-text)]" : "text-[var(--muted-foreground)]"}>
                      EN
                    </span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {language === "id" ? "Switch to English" : "Bahasa Indonesia"}
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </nav>

        {/* Mobile & Tablet Drawer (< 1024px) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 z-[65] bg-black/50 backdrop-blur-xs lg:hidden"
                aria-hidden="true"
              />
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="mobile-nav-shell fixed top-16 sm:top-20 left-4 right-4 sm:left-auto sm:right-6 md:right-10 sm:w-80 z-[70] lg:hidden rounded-2xl border p-4 shadow-2xl backdrop-blur-xl"
              >
                <div className="grid grid-cols-2 gap-2">
                  {navItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`rounded-xl border px-3.5 py-2.5 text-xs font-bold transition-colors ${
                        activeSection === item.id
                          ? "border-[var(--accent)]/45 bg-[var(--accent-soft)] text-[var(--accent-text)]"
                          : "border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--foreground)]"
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border)] pt-3">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://github.com/Yosua13" target="_blank" rel="noreferrer">
                        <FaGithub className="h-3.5 w-3.5" />
                        GitHub
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href="https://www.linkedin.com/in/yosua-reynaldi-manurun/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaLinkedin className="h-3.5 w-3.5 text-[#0A66C2]" />
                        LinkedIn
                      </a>
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={toggleTheme}>
                      {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                    </Button>
                    <Button variant="accent" size="sm" onClick={toggleLanguage}>
                      {language.toUpperCase()}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <HeroSection
          playMode={playMode}
          setPlayMode={setPlayMode}
          playMusicOnStart={playMusicOnStart}
        />

        {/* Streamlined Main Content */}
        <main className="relative z-10 bg-[var(--bg)] pt-8 sm:pt-12 pb-16 sm:pb-20 px-4 sm:px-6 md:px-12 max-w-[1240px] mx-auto space-y-16 sm:space-y-24 md:space-y-28">
          <ProjectsSection onSelectProject={(project) => setSelectedProjectId(project.id)} />
          <WhatIDoSection />
          <AboutHubSection />
          <ContactSection />
        </main>

        <footer className="relative z-10 border-t border-[var(--border)] bg-[var(--surface)]/50 py-10 px-6 md:px-12">
          <div className="max-w-[1240px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[var(--muted-foreground)]">
            <div className="flex items-center gap-3">
              <span className="font-editorial italic text-xl text-[var(--foreground)]">YRM</span>
              <span className="h-3.5 w-px bg-[var(--border-strong)]" />
              <span>Yosua Reynaldi Manurun · Bandung, Indonesia</span>
            </div>
            <div className="flex flex-wrap items-center gap-5 font-mono text-[11px] uppercase tracking-wider">
              <a href="#projects" className="hover:text-[var(--foreground)] transition-colors">
                {language === "id" ? "Proyek" : "Projects"}
              </a>
              <a href="#what-i-do" className="hover:text-[var(--foreground)] transition-colors">
                {language === "id" ? "Solusi" : "Solutions"}
              </a>
              <a href="#profile" className="hover:text-[var(--foreground)] transition-colors">
                {language === "id" ? "Tentang" : "About"}
              </a>
              <a href="#contact" className="hover:text-[var(--foreground)] transition-colors">
                {language === "id" ? "Kontak" : "Contact"}
              </a>
              <span className="text-[var(--border-strong)]">/</span>
              <span>&copy; {new Date().getFullYear()}</span>
            </div>
          </div>
        </footer>

        {/* Tabbed Radix Project Detail Modal */}
        <ProjectDetailModal
          project={selectedProject}
          open={Boolean(selectedProject)}
          onOpenChange={(open) => {
            if (!open) setSelectedProjectId(null);
          }}
          language={language}
        />

        {/* Play Mode Controls Floating Button */}
        <AnimatePresence>
          {playMode && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={() => setShowControlsGuide(true)}
              className="game-controls-btn fixed bottom-24 right-6 z-[60] inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/70 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-cyan-300 shadow-xl backdrop-blur-md transition-colors hover:border-cyan-400/60 cursor-pointer"
            >
              <Gamepad2 className="w-4 h-4" />
              {language === "id" ? "Kontrol" : "Controls"}
            </motion.button>
          )}
        </AnimatePresence>

        {/* Radix Dialog: Controls Guide */}
        <Dialog open={showControlsGuide} onOpenChange={setShowControlsGuide}>
          <DialogContent className="max-w-md p-6">
            <DialogHeader className="items-center text-center">
              <Gamepad2 className="w-9 h-9 text-[var(--cyan-text)] mb-1" />
              <DialogTitle className="text-xl uppercase">
                {language === "id" ? "Panduan Kontrol" : "Controls Guide"}
              </DialogTitle>
              <DialogDescription>
                {language === "id"
                  ? "Gunakan keyboard untuk menerbangkan pesawat & menghancurkan target."
                  : "Use your keyboard to steer the ship and clear space anomalies."}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4 text-left">
              <div className="flex gap-4 items-center">
                <div className="flex flex-col items-center gap-1 font-mono shrink-0">
                  <div className="w-7 h-7 flex items-center justify-center rounded-md border border-[var(--border-strong)] bg-[var(--surface-elevated)] text-[10px] font-bold">
                    W
                  </div>
                  <div className="flex gap-1">
                    {["A", "S", "D"].map((key) => (
                      <div
                        key={key}
                        className="w-7 h-7 flex items-center justify-center rounded-md border border-[var(--border-strong)] bg-[var(--surface-elevated)] text-[10px] font-bold"
                      >
                        {key}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wide">
                    {language === "id" ? "Kemudi Pesawat" : "Steer Spacecraft"}
                  </span>
                  <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                    {language === "id"
                      ? "Tahan WASD untuk bergerak bebas di layar utama."
                      : "Hold WASD keys to fly across the hero viewport."}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-20 py-1.5 rounded-md border border-[var(--border-strong)] bg-[var(--surface-elevated)] text-[10px] font-bold text-[var(--cyan-text)] uppercase tracking-wider font-mono text-center shrink-0">
                  Space
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wide">
                    {language === "id" ? "Menembak Laser" : "Fire Laser"}
                  </span>
                  <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                    {language === "id"
                      ? "Hancurkan asteroid (+50) & drone (+100)."
                      : "Destroy asteroids (+50) and enemy drones (+100)."}
                  </p>
                </div>
              </div>
            </div>

            <Button variant="primary" size="md" onClick={() => setShowControlsGuide(false)}>
              {language === "id" ? "Tutup Panduan" : "Close Guide"}
            </Button>
          </DialogContent>
        </Dialog>

        {/* Welcome Onboarding Screen */}
        <AnimatePresence>
          {showWelcome && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="fixed inset-0 z-[200]"
            >
              <WelcomeScreen onComplete={handleWelcomeComplete} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll Top Button (Bottom-Right Ergonomic Placement) */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Scroll to top"
              className="fixed bottom-5 right-4 sm:bottom-7 sm:right-7 z-[60] flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--bg)] backdrop-blur-md transition-colors cursor-pointer select-none shadow-lg"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  );
}
