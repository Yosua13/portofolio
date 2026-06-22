"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, useScroll, useSpring, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { Mail, FileText, Code2, Smartphone, Terminal, Database, Globe, Layers, AppWindow, Cpu, Server, Cloud, PenTool, GitBranch, Box, Briefcase, GraduationCap, Flame, MapPin, Calendar, Trophy, ExternalLink, Gamepad2, HelpCircle, X, Sparkles } from "lucide-react";
import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import MusicPlayer from "@/components/MusicPlayer";
import WelcomeScreen from "@/components/WelcomeScreen";

function SectionHeader({
  topText,
  mainText,
  subText,
  bottomText,
  watermark = "YOSUA",
}: {
  topText: string;
  mainText: string;
  subText: string;
  bottomText: string;
  watermark?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 mb-6 relative pt-12 pb-6 overflow-hidden">
      {/* Watermark in background */}
      <div className="absolute text-[16vw] md:text-[18vw] font-black text-white/[0.018] select-none pointer-events-none uppercase tracking-[0.1em] z-0 top-1/2 -translate-y-1/2 font-sans filter blur-[6px] w-full text-center">
        {watermark}
      </div>
      
      <span className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-[0.25em] z-10 font-sans">
        {topText}
      </span>
      
      <h2 className="text-6xl sm:text-8xl md:text-9xl lg:text-[9.5rem] font-extrabold text-white uppercase tracking-tight leading-none z-10 font-sans">
        {mainText}
      </h2>
      
      <span className="text-sm sm:text-base font-bold text-indigo-400 uppercase tracking-[0.3em] z-10 font-sans pt-3">
        {subText}
      </span>
      
      <span className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-[0.2em] z-10 font-sans">
        {bottomText}
      </span>
    </div>
  );
}

function ClimaxEffect() {
  const embers = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 20;
      const velocity = Math.random() * 400 + 100;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        tx: Math.cos(angle) * velocity,
        ty: Math.sin(angle) * velocity - 300, // Strong upward drift (heat)
        size: Math.random() * 4 + 2,
        delay: Math.random() * 0.1,
        duration: 1 + Math.random() * 1.5,
      };
    });
  }, []);

  return (
    <div className="absolute bottom-0 left-[22px] md:left-[42px] pointer-events-none z-[100]">
      {/* Background Deep Glow */}
      <motion.div 
        initial={{ x: "-50%", y: "-50%", opacity: 0 }}
        animate={{ x: "-50%", y: "-50%", opacity: [0, 0.5, 0] }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute w-[150vw] h-[150vh] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/40 via-orange-600/10 to-transparent rounded-full"
      />

      {/* Dragon Wings / Slash Aura */}
      <motion.div
        initial={{ x: "-50%", y: "-50%", scaleX: 0, scaleY: 0, opacity: 0.8, rotate: -25 }}
        animate={{ x: "-50%", y: "-50%", scaleX: [0, 3, 4], scaleY: [0, 0.5, 0], opacity: [0.8, 0], rotate: -25 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute w-[60vw] h-12 bg-gradient-to-r from-transparent via-red-500 to-transparent blur-xl origin-center"
      />
      <motion.div
        initial={{ x: "-50%", y: "-50%", scaleX: 0, scaleY: 0, opacity: 0.8, rotate: 25 }}
        animate={{ x: "-50%", y: "-50%", scaleX: [0, 3, 4], scaleY: [0, 0.5, 0], opacity: [0.8, 0], rotate: 25 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute w-[60vw] h-12 bg-gradient-to-r from-transparent via-orange-500 to-transparent blur-xl origin-center"
      />

      {/* The Dragon's Pillar (Vertical Energy Beam) */}
      <motion.div
        initial={{ x: "-50%", scaleY: 0, opacity: 1 }}
        animate={{ x: "-50%", scaleY: [0, 1, 1], opacity: [1, 1, 0] }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute bottom-0 w-2 bg-white blur-[2px] origin-bottom"
        style={{ 
          height: "100vh",
          boxShadow: "0 0 50px 15px #ef4444, 0 0 100px 30px #f97316" 
        }}
      />
      
      {/* Expanding Dragon Aura */}
      <motion.div
        initial={{ x: "-50%", y: "-50%", scale: 0, opacity: 1 }}
        animate={{ x: "-50%", y: "-50%", scale: 5, opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute w-32 h-32 border-[2px] border-white rounded-full"
        style={{ boxShadow: "0 0 40px #ef4444, inset 0 0 40px #ef4444" }}
      />
      <motion.div
        initial={{ x: "-50%", y: "-50%", scale: 0, opacity: 1 }}
        animate={{ x: "-50%", y: "-50%", scale: 4, opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.1 }}
        className="absolute w-48 h-48 border-[6px] border-orange-500 rounded-full blur-[2px]"
        style={{ boxShadow: "0 0 60px #f97316, inset 0 0 60px #f97316" }}
      />
      <motion.div
        initial={{ x: "-50%", y: "-50%", scale: 0, opacity: 0.8 }}
        animate={{ x: "-50%", y: "-50%", scale: 6, opacity: 0 }}
        transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
        className="absolute w-48 h-48 border-[10px] border-red-600 rounded-full blur-md"
      />

      {/* Blinding Core Flare */}
      <motion.div
        initial={{ x: "-50%", y: "-50%", scale: 0, opacity: 1 }}
        animate={{ x: "-50%", y: "-50%", scale: [0, 2, 0], opacity: [1, 1, 0] }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute w-40 h-40 bg-white rounded-full blur-3xl"
      />

      {/* Soaring Embers */}
      {embers.map((ember, i) => (
        <motion.div
          key={i}
          initial={{ x: ember.x, y: ember.y, opacity: 1, scale: 1 }}
          animate={{ 
            x: ember.tx,
            y: ember.ty,
            opacity: 0,
            scale: 0
          }}
          transition={{
            duration: ember.duration,
            delay: ember.delay,
            ease: "easeOut"
          }}
          className="absolute rounded-full bg-white"
          style={{ 
            width: ember.size, 
            height: ember.size,
            boxShadow: "0 0 15px #fde047, 0 0 30px #f97316",
            marginLeft: -ember.size/2,
            marginTop: -ember.size/2
          }}
        />
      ))}
    </div>
  );
}


const journeyData = [
  {
    type: "career",
    title: "Software Engineer",
    company: "Tech Corp",
    location: "Bandung, Indonesia",
    status: "Contract",
    isActive: true,
    date: "Aug 2025 - Present",
    image: "/company1.png",
    description: "Tech Corp is a leading technology solutions provider based in Bandung, Indonesia, specializing in high-performance backend systems and enterprise software architecture.",
    achievements: [
      "Developed high-performance backend microservices using Java and Spring Boot.",
      "Optimized database queries, reducing response times by 30%.",
      "Collaborated with cross-functional teams to deliver features on schedule."
    ],
    website: "https://example.com"
  },
  {
    type: "career",
    title: "Frontend Developer Intern",
    company: "Creative Studio",
    location: "Jakarta, Indonesia",
    status: "Internship",
    isActive: false,
    date: "Jan 2025 - Jul 2025",
    image: "/company2.png",
    description: "Creative Studio is an innovative digital agency in Jakarta, focusing on crafting immersive and interactive user experiences for global brands.",
    achievements: [
      "Built interactive UI components using React and Framer Motion.",
      "Assisted in migrating legacy codebase to Next.js.",
      "Implemented responsive designs for mobile and web platforms."
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
    description: "The University of Technology is a premier institution in Bandung, known for its rigorous computer science program and active tech community.",
    achievements: [
      "Graduated with honors, GPA 3.8/4.0.",
      "Lead developer for the university's official student portal.",
      "Active member of the programming club and hackathon participant."
    ],
    website: "https://example.com"
  }
];

const projectsData = [
  {
    id: "lapor-kos",
    title: "Lapor Kos",
    location: "2026 | BANDUNG, INDONESIA",
    role: "FULLSTACK DEV",
    headline: "AN INTEGRATED BOARDING HOUSE MANAGEMENT AND COMPLAINT SYSTEM",
    description: "A comprehensive web application for boarding house management, facilitating room inventory, tenant contracts, billing/payments, and tenant complaint ticketing.",
    fullDescription: "Lapor Kos is an all-in-one boarding house management system designed to streamline communication and operations between landlords and tenants. The platform handles room availability tracking, digital rental agreements/contracts, automated billing, payment records, and a structured ticketing pipeline for complaints and maintenance reports.",
    image: "/portofolio.png",
    tags: ["Next.js", "Golang", "Supabase"],
    techStack: ["Next.js", "Tailwind CSS", "Golang", "Gin", "Supabase", "Fonnte (WA Gateway)", "Vercel", "Railway"],
    link: "https://lapor-kos.vercel.app/"
  }
];

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [playMusicOnStart, setPlayMusicOnStart] = useState(false);
  const [showControlsGuide, setShowControlsGuide] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);

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
    
    // Show greeting toast 1.5s after welcome screen starts fading out
    setTimeout(() => {
      setShowGreeting(true);
      // Auto-hide after 6 seconds
      setTimeout(() => {
        setShowGreeting(false);
      }, 6000);
    }, 1500);

    // Wait for the exit fade transition of welcome screen to complete, then scroll
    setTimeout(() => {
      const element = document.getElementById(destination);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  };

  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: timelineScrollY } = useScroll({
    target: timelineContainerRef,
    offset: ["start center", "end center"]
  });
  const timelineHeight = useTransform(timelineScrollY, [0, 1], ["0%", "100%"]);
  
  const hasReachedBottom = useRef(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.3) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && anchor.hash && anchor.hash.startsWith("#")) {
        const targetId = anchor.hash.substring(1);
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

  useMotionValueEvent(timelineScrollY, "change", (latest) => {
    if (latest >= 0.999) {
      if (!hasReachedBottom.current) {
        hasReachedBottom.current = true;
        setShowFireworks(true);
      }
    } else {
      hasReachedBottom.current = false;
    }
  });

  useEffect(() => {
    if (showFireworks) {
      const timer = setTimeout(() => setShowFireworks(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showFireworks]);

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
          if (entry.target.id === 'hero') {
            setActiveSection("hero");
          } else {
            setActiveSection(entry.target.id);
          }
        }
      });
    }, { rootMargin: "-40% 0px -40% 0px" });

    const sections = ["hero", "projects", "profile", "contact"];
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

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
                { id: 'projects', label: 'Projects' },
                { id: 'profile', label: 'Profile' },
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
            <a href="#" className="text-slate-400 hover:text-white transition-colors hover:scale-110" aria-label="Medium">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.46-.58 6.26-1.31 6.26-.73 0-1.31-2.8-1.31-6.26S21.96 5.74 22.69 5.74c.73 0 1.31 2.8 1.31 6.26" /></svg>
            </a>
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
      <HeroSection showGreeting={showGreeting} onCloseGreeting={() => setShowGreeting(false)} />

      <main className="relative z-10 pb-24 px-6 max-w-6xl mx-auto space-y-40">

        {/* Projects Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          id="projects"
          className="space-y-10 scroll-mt-32"
        >
          <motion.div variants={fadeInUp}>
            <SectionHeader
              topText="Featured Works"
              mainText="Projects"
              subText="Overview"
              bottomText="List of Featured Portfolio"
              watermark="YOSUA"
            />
          </motion.div>

          <div className="flex flex-col gap-16">
            {projectsData.map((project) => (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                className="group relative rounded-none overflow-hidden border border-white/10 bg-[#0d0f18]/45 min-h-[500px] flex flex-col md:flex-row items-stretch transition-colors hover:bg-[#0d0f18]/70"
              >
                {/* Background Image with Dark Overlay */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover opacity-15 filter blur-[4px] group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent"></div>
                </div>

                {/* Left Side: Info */}
                <div className="relative z-10 w-full md:w-[50%] p-8 md:p-12 flex flex-col justify-between space-y-8">
                  <div className="space-y-4">
                    {/* Project Header */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-black text-white tracking-widest uppercase font-sans">
                          {project.title}
                        </h3>
                        <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                      </div>
                      <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                        {project.location}
                      </span>
                    </div>

                    {/* Role Tag */}
                    <span className="inline-block text-[10px] font-bold text-indigo-400 border border-indigo-500/30 px-2.5 py-0.5 uppercase tracking-[0.2em] bg-indigo-500/5">
                      {project.role}
                    </span>

                    {/* Headline */}
                    <h4 className="text-xl md:text-2xl font-extrabold text-white tracking-tight uppercase leading-snug font-sans">
                      {project.headline}
                    </h4>

                    {/* Description */}
                    <p className="text-sm text-slate-400 font-light leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack & CTA */}
                  <div className="space-y-6 pt-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-wider text-slate-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div>
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center justify-center px-6 py-3 border border-white/20 hover:border-white text-white hover:bg-white hover:text-black font-bold uppercase tracking-widest text-[10px] transition-all duration-300 rounded-none cursor-pointer"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Side: Mockup Screenshot */}
                <div className="relative z-10 w-full md:w-[50%] p-8 md:p-12 flex items-center justify-center bg-black/30 md:bg-transparent overflow-hidden">
                  <div className="relative w-full aspect-[16/10] border border-white/10 shadow-2xl shadow-black/80 transform md:rotate-[-2deg] group-hover:rotate-0 md:translate-x-6 group-hover:translate-x-2 transition-all duration-500 ease-out overflow-hidden bg-slate-950">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Profile Section */}
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
                  src="/yosua_profile.png"
                  alt="Yosua Reynaldi Manurun"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover object-[center_25%] brightness-110 contrast-[1.05] group-hover:scale-105 transition-all duration-500"
                />
              </motion.div>

              {/* Profile Text */}
              <div className="space-y-6 text-slate-400 leading-relaxed text-lg font-light flex-1">
                <p className="text-2xl font-medium text-white mb-2">
                  Hello, my name is <span className="text-cyan-400">Yosua Reynaldi Manurun</span> as a Software Engineer.
                </p>
                <p>
                  I am interested in mobile and website development, both frontend and backend.
                  With a strong foundation in modern technologies, I bridge the gap between design and robust engineering to craft elegant, highly responsive, and user-centric digital experiences.
                </p>
                <p>
                  I have <span className="text-white font-medium">2 years of working experience</span>. Whether it's building complex web dashboards or smooth, native-feeling mobile applications, I thrive on solving technical challenges and delivering solutions that make a meaningful impact.
                </p>
              </div>
            </div>
          </div>

          {/* Skill Set Submenu */}
          <div className="space-y-10">
            <motion.div variants={fadeInUp} className="flex items-center gap-6">
              <h2 className="text-4xl font-bold text-white tracking-tight">Skill Set</h2>
              <div className="h-px bg-white/10 flex-1"></div>
            </motion.div>

            {/* Submenu Tabs */}
            <div className="flex flex-wrap items-center gap-4">
              {["All", "Frontend", "Backend", "Utilities"].map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                    ? "bg-cyan-500 text-[#0a0a0a] shadow-lg shadow-cyan-500/25"
                    : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Submenu Info Text */}
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-slate-400 font-light"
            >
              {activeCategory === "All"
                ? "16 skills across 3 categories."
                : `${activeCategory === 'Frontend' ? 5 : activeCategory === 'Backend' ? 7 : 4} skills in ${activeCategory}.`}
            </motion.div>

            {/* Skills Grid */}
            <motion.div layout className="flex flex-col gap-8">
              <AnimatePresence mode="popLayout">
                {["Frontend", "Backend", "Utilities"]
                  .filter(cat => activeCategory === "All" || activeCategory === cat)
                  .map(category => (
                    <motion.div
                      key={category}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8"
                    >
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-4">
                        <span className="text-cyan-400 capitalize">{category}</span>
                        <div className="h-px bg-white/10 flex-1"></div>
                      </h3>

                      <div className="flex flex-wrap gap-3 md:gap-4">
                        {[
                          { name: "React", cat: "Frontend", icon: <Globe className="w-4 h-4" /> },
                          { name: "Next.js", cat: "Frontend", icon: <Layers className="w-4 h-4" /> },
                          { name: "Flutter", cat: "Frontend", icon: <Smartphone className="w-4 h-4" /> },
                          { name: "KMP", cat: "Frontend", icon: <Smartphone className="w-4 h-4" /> },
                          { name: "Angular", cat: "Frontend", icon: <AppWindow className="w-4 h-4" /> },
                          { name: "Java", cat: "Backend", icon: <Cpu className="w-4 h-4" /> },
                          { name: "Golang", cat: "Backend", icon: <Server className="w-4 h-4" /> },
                          { name: "Node.js", cat: "Backend", icon: <Terminal className="w-4 h-4" /> },
                          { name: "Postgresql", cat: "Backend", icon: <Database className="w-4 h-4" /> },
                          { name: "Firebase", cat: "Backend", icon: <Cloud className="w-4 h-4" /> },
                          { name: "Supabase", cat: "Backend", icon: <Cloud className="w-4 h-4" /> },
                          { name: "Mysql", cat: "Backend", icon: <Database className="w-4 h-4" /> },
                          { name: "Figma", cat: "Utilities", icon: <PenTool className="w-4 h-4" /> },
                          { name: "Github", cat: "Utilities", icon: <GitBranch className="w-4 h-4" /> },
                          { name: "Gitlab", cat: "Utilities", icon: <GitBranch className="w-4 h-4" /> },
                          { name: "Postman", cat: "Utilities", icon: <Box className="w-4 h-4" /> }
                        ].filter(skill => skill.cat === category)
                          .map((skill) => (
                            <motion.div
                              key={skill.name}
                              whileHover={{ scale: 1.05 }}
                              className="px-4 py-2 bg-[#0a0a0a] border border-white/5 rounded-xl flex items-center gap-2.5 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300 group cursor-default shadow-sm"
                            >
                              <span className="text-slate-500 group-hover:text-cyan-400 transition-colors">{skill.icon}</span>
                              <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{skill.name}</span>
                            </motion.div>
                          ))}
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Mastered Technologies */}
          <div className="space-y-10 pt-10">
            <motion.div variants={fadeInUp} className="flex items-center gap-6">
              <h2 className="text-4xl font-bold text-white tracking-tight">Top Expertise</h2>
              <div className="h-px bg-white/10 flex-1"></div>
            </motion.div>

            <div className="flex flex-col md:flex-row items-center gap-12 bg-gradient-to-r from-cyan-500/10 to-transparent p-8 md:p-10 rounded-3xl border border-cyan-500/20">
              <div className="flex gap-6 md:gap-8 items-center shrink-0">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] p-4 flex items-center justify-center group shadow-xl">
                  <Image src="/java.png" alt="Java" fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                </div>
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] p-4 flex items-center justify-center group shadow-xl">
                  <Image src="/ts.png" alt="TypeScript" fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                </div>
              </div>

              <div className="space-y-4 text-center md:text-left">
                <h3 className="text-2xl font-bold text-white">Java & TypeScript</h3>
                <p className="text-slate-400 text-lg font-light leading-relaxed">
                  I am proficient in <span className="text-cyan-400 font-medium">TypeScript</span> / <span className="text-cyan-400 font-medium">Java</span>. I use these languages extensively for my day-to-day work, building scalable backend services and dynamic frontend architectures.
                </p>
              </div>
            </div>
          </div>

          {/* Career & Education Journey */}
          <div className="space-y-12 pt-10">
            <motion.div variants={fadeInUp} className="flex items-center gap-6">
              <h2 className="text-4xl font-bold text-white tracking-tight">My Career and Education Journey</h2>
              <div className="h-px bg-white/10 flex-1"></div>
            </motion.div>

            <div className="relative w-full max-w-[1400px] mx-auto" ref={timelineContainerRef}>
              {/* Timeline Line */}
              <div className="absolute left-[20px] md:left-[40px] top-0 bottom-0 w-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 w-full bg-gradient-to-b from-orange-400 to-red-600 rounded-full"
                  style={{ height: timelineHeight }}
                >
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[4px] h-[4px] shadow-[0_0_20px_10px_rgba(239,68,68,1)] bg-white rounded-full"></div>
                </motion.div>
              </div>
              
              {showFireworks && <ClimaxEffect />}

              <div className="space-y-12 xl:space-y-16 relative pb-10">
                {journeyData.map((item, index) => {
                  return (
                    <div key={index} className="relative flex items-center w-full">
                      
                      {/* Node with Fire Effect */}
                      <div className="absolute left-[13px] md:left-[33px] z-10 flex justify-center items-center">
                        <motion.div
                          initial="inactive"
                          whileInView="active"
                          viewport={{ margin: "10000px 0px -50% 0px" }}
                          variants={{
                            inactive: { backgroundColor: "#1e293b", borderColor: "#0f172a", boxShadow: "0 0 0px rgba(239,68,68,0)", scale: 1 },
                            active: { backgroundColor: "#ef4444", borderColor: "#fca5a5", boxShadow: "0 0 30px 10px rgba(239,68,68,0.9)", scale: 1.2 }
                          }}
                          className="w-[18px] h-[18px] rounded-full border-[3px] transition-all duration-500 flex items-center justify-center"
                        >
                          <motion.div variants={{ inactive: { opacity: 0, scale: 0 }, active: { opacity: 1, scale: 1 } }} transition={{ duration: 0.3 }}>
                            <Flame className="w-2.5 h-2.5 text-yellow-300 fill-yellow-300" />
                          </motion.div>
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
                            <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-3xl p-5 sm:p-8 w-full hover:border-red-500/30 transition-all duration-300 relative overflow-hidden group shadow-xl">
                              
                              {/* Subtle gradient background on hover */}
                              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

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
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          id="contact"
          className="py-20 text-center space-y-8 bg-gradient-to-b from-cyan-500/10 to-transparent rounded-3xl border border-cyan-500/20 relative overflow-hidden scroll-mt-32"
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          <SectionHeader
            topText="Get In Touch"
            mainText="Contact"
            subText="Say Hello"
            bottomText="Let's build something together"
            watermark="YOSUA"
          />
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light relative z-10">
            I'm currently available for freelance work or full-time opportunities. If you have a project that needs some creative touch, I'd love to hear about it.
          </p>
          <a href="mailto:hello@example.com" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#0a0a0a] font-semibold rounded-full hover:scale-105 hover:bg-slate-200 transition-all mt-6 shadow-xl shadow-white/10 relative z-10">
            <Mail className="w-5 h-5" />
            Say Hello
          </a>
        </motion.section>
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
      <MusicPlayer playOnStart={playMusicOnStart} onOpenGuide={() => setShowControlsGuide(true)} />

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
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <span className="block text-xs font-bold text-slate-300 uppercase font-sans tracking-wide">Game Tantangan</span>
                    <p className="text-[11px] text-slate-400 leading-normal font-light">
                      Hancurkan Asteroid (+50 poin) dan Drone musuh (+100 poin). Jaga tameng pelindung Anda dari tabrakan!
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
