"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValue } from "framer-motion";
import { Mail, FileText, Code2, Smartphone, Terminal, Database, Globe } from "lucide-react";
import Image from "next/image";

function StarCanvas() {
  useEffect(() => {
    const canvas = document.getElementById("star-canvas") as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars: { basex: number, basey: number, radius: number, vx: number, vy: number }[] = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        basex: Math.random() * width,
        basey: Math.random() * height,
        radius: Math.random() * 1.5,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetX = width / 2;
    let targetY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      const dx = (mouseX - width / 2) * 0.02;
      const dy = (mouseY - height / 2) * 0.02;

      stars.forEach(star => {
        star.basex += star.vx;
        star.basey += star.vy;

        if (star.basex < 0) star.basex += width;
        if (star.basex > width) star.basex -= width;
        if (star.basey < 0) star.basey += height;
        if (star.basey > height) star.basey -= height;

        let nx = star.basex - dx * star.radius * 2;
        let ny = star.basey - dy * star.radius * 2;

        if (nx < 0) nx += width;
        if (nx > width) nx -= width;
        if (ny < 0) ny += height;
        if (ny > height) ny -= height;

        ctx.beginPath();
        ctx.arc(nx, ny, star.radius, 0, Math.PI * 2);
        const alpha = 0.3 + (Math.sin(Date.now() * 0.001 * star.radius) + 1) * 0.35;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas id="star-canvas" className="fixed inset-0 z-0 pointer-events-none opacity-80 mix-blend-screen" />;
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("");
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const blurValue = useTransform(scrollY, [0, 800], [0, 20]);
  const opacityValue = useTransform(scrollY, [0, 800], [1, 0.3]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const textX = useSpring(mouseX, springConfig);
  const textY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 60;
      const y = (e.clientY / window.innerHeight - 0.5) * 60;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.id === 'hero') {
            setActiveSection("projects");
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
    <div className="min-h-screen bg-black text-slate-200 font-sans selection:bg-cyan-500/30 relative">
      <StarCanvas />
      {/* Top Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-cyan-400 origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed w-full z-50 top-6 px-6 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Logo & Socials */}
          <div className="flex items-center gap-6 pointer-events-auto">
            <a href="#hero" className="flex items-center gap-3 group">
              <span className="font-serif italic font-bold text-3xl text-white group-hover:text-cyan-400 transition-colors">YRM</span>
              <div className="flex flex-col justify-center">
                <span className="text-cyan-400 font-medium tracking-tight text-lg leading-tight">Yos'z</span>
                <span className="text-slate-400 text-[11px] font-light tracking-wide uppercase">Software Engineer</span>
              </div>
            </a>

            <div className="h-8 w-px bg-white/10 hidden sm:block"></div>

            <div className="hidden sm:flex items-center gap-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="Medium">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.46-.58 6.26-1.31 6.26-.73 0-1.31-2.8-1.31-6.26S21.96 5.74 22.69 5.74c.73 0 1.31 2.8 1.31 6.26" /></svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              </a>
              <a href="https://www.linkedin.com/in/yosua-reynaldi-manurun/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
              <a href="https://github.com/Yosua13" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
              </a>
            </div>
          </div>

          {/* Center: Floating Navigation */}
          <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto hidden md:block">
            <div className="flex items-center bg-[#111111]/80 backdrop-blur-xl border border-white/5 rounded-full px-2 py-1.5 shadow-2xl">
              {[
                { id: 'projects', label: 'Projects' },
                { id: 'profile', label: 'Profile' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative px-5 py-2 text-sm font-medium transition-colors ${activeSection === item.id ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-1 left-5 right-5 h-[2px] bg-cyan-400"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Fixed Hero Background */}
      <motion.div
        className="fixed inset-0 z-0 flex flex-col justify-center items-center pointer-events-none"
        style={{
          filter: useTransform(blurValue, v => `blur(${v}px)`),
          opacity: opacityValue
        }}
      >
        <motion.div
          className="w-full flex flex-col items-center justify-center relative"
          style={{ x: textX, y: textY }}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-600/10 rounded-full blur-[150px] -z-10 pointer-events-none"></motion.div>

          <motion.div variants={fadeInUp} className="relative w-full max-w-7xl mx-auto h-[25vh] sm:h-[35vh] md:h-[45vh] lg:h-[55vh] flex items-center justify-center overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-90 brightness-75"
            >
              <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-black mix-blend-multiply flex items-center justify-center pointer-events-none">
              <h1
                className="text-white text-[25vw] sm:text-[22vw] md:text-[20vw] font-black leading-none select-none tracking-[0.1em] ml-[0.1em]"
                style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}
              >
                YOSUA
              </h1>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <main className="relative z-10 pt-[100vh] pb-24 px-6 max-w-6xl mx-auto space-y-40">
        <div id="hero" className="absolute top-0 left-0 w-full h-[50vh] pointer-events-none"></div>

        {/* Projects Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          id="projects"
          className="space-y-10 scroll-mt-32"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-6">
            <h2 className="text-4xl font-bold text-white tracking-tight">Selected Works</h2>
            <div className="h-px bg-white/10 flex-1"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeInUp} className="group relative rounded-3xl overflow-hidden bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
              <div className="aspect-[4/3] relative overflow-hidden bg-slate-900">
                <Image
                  src="/project1.png"
                  alt="E-commerce Dashboard"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-80"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-3xl font-bold text-white mb-3">E-Commerce Dashboard</h3>
                <p className="text-slate-400 mb-6 font-light line-clamp-2">A sleek, modern web dashboard for managing products and sales data with beautiful charts and a dark mode interface.</p>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white/90">Next.js</span>
                  <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white/90">Tailwind</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="group relative rounded-3xl overflow-hidden bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
              <div className="aspect-[4/3] relative overflow-hidden bg-slate-900">
                <Image
                  src="/project2.png"
                  alt="Health Tracker Mobile App"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-80"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-3xl font-bold text-white mb-3">Health Tracker App</h3>
                <p className="text-slate-400 mb-6 font-light line-clamp-2">A beautiful mobile application for health and fitness tracking, featuring glassmorphism design and vibrant data visualizations.</p>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white/90">React Native</span>
                  <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white/90">Expo</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Profile Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          id="profile"
          className="space-y-20 scroll-mt-32"
        >
          <div className="space-y-10">
            <div className="flex items-center gap-6">
              <h2 className="text-4xl font-bold text-white tracking-tight">Profile & About</h2>
              <div className="h-px bg-white/10 flex-1"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-12 text-slate-400 leading-relaxed text-lg font-light">
              <p>
                I am a passionate Web and Mobile Programmer dedicated to crafting elegant, highly responsive, and user-centric digital experiences. With a strong foundation in modern frontend technologies, I bridge the gap between design and robust engineering.
              </p>
              <p>
                Whether it's building complex web dashboards or smooth, native-feeling mobile applications, I thrive on solving technical challenges and delivering solutions that make a meaningful impact.
              </p>
            </div>
          </div>

          <div className="space-y-10">
            <motion.div variants={fadeInUp} className="flex items-center gap-6">
              <h2 className="text-4xl font-bold text-white tracking-tight">Tech Stack</h2>
              <div className="h-px bg-white/10 flex-1"></div>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                { name: "React", icon: <Globe className="w-8 h-8 mb-4 stroke-1" /> },
                { name: "Next.js", icon: <Terminal className="w-8 h-8 mb-4 stroke-1" /> },
                { name: "React Native", icon: <Smartphone className="w-8 h-8 mb-4 stroke-1" /> },
                { name: "Flutter", icon: <Smartphone className="w-8 h-8 mb-4 stroke-1" /> },
                { name: "Tailwind CSS", icon: <Code2 className="w-8 h-8 mb-4 stroke-1" /> },
                { name: "TypeScript", icon: <Code2 className="w-8 h-8 mb-4 stroke-1" /> },
                { name: "Node.js", icon: <Database className="w-8 h-8 mb-4 stroke-1" /> },
                { name: "UI/UX Design", icon: <FileText className="w-8 h-8 mb-4 stroke-1" /> },
              ].map((skill, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl flex flex-col items-center justify-center text-center hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 backdrop-blur-sm group"
                >
                  <div className="text-slate-500 group-hover:text-cyan-400 transition-colors">{skill.icon}</div>
                  <span className="font-medium text-slate-300 group-hover:text-white transition-colors">{skill.name}</span>
                </motion.div>
              ))}
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
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight relative z-10">Let's Work Together</h2>
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
        <p>© {new Date().getFullYear()} Yosua Reynaldi Manurun. Built with Next.js, Tailwind CSS & Framer Motion.</p>
      </footer>
    </div>
  );
}
