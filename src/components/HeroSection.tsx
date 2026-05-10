"use client";

import { useEffect, useRef, useCallback } from "react";

/* ───────────────────────────────────────────
   Star‑field canvas with mouse parallax
   ─────────────────────────────────────────── */
function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    /* Mouse tracking for parallax */
    let targetMX = 0;
    let targetMY = 0;
    let currentMX = 0;
    let currentMY = 0;

    const onMouseMove = (e: MouseEvent) => {
      /* Normalised –1 … +1 from center */
      targetMX = (e.clientX / width - 0.5) * 2;
      targetMY = (e.clientY / height - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    interface Star {
      baseX: number;
      baseY: number;
      r: number;
      speed: number;
      phase: number;
      depth: number;        /* 0 (far) → 1 (near) */
    }

    const stars: Star[] = Array.from({ length: 200 }, () => {
      const depth = Math.random();
      return {
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        r: 0.3 + depth * 1.4,          /* bigger = nearer */
        speed: 0.0005 + Math.random() * 0.0015,
        phase: Math.random() * Math.PI * 2,
        depth,
      };
    });

    let raf: number;
    const LERP = 0.04;
    const MAX_SHIFT = 80;               /* px for depth‑1 stars */

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);

      /* Smooth‑lerp mouse position */
      currentMX += (targetMX - currentMX) * LERP;
      currentMY += (targetMY - currentMY) * LERP;

      for (const s of stars) {
        const shift = s.depth * MAX_SHIFT;
        const px = s.baseX + currentMX * shift;
        const py = s.baseY + currentMY * shift;

        const alpha = 0.2 + 0.6 * ((Math.sin(t * s.speed + s.phase) + 1) / 2);
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      stars.forEach((s) => {
        s.baseX = Math.random() * width;
        s.baseY = Math.random() * height;
      });
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

/* ───────────────────────────────────────────
   Main Hero Component
   ─────────────────────────────────────────── */
export default function HeroSection() {
  const nameLetters = "YOSUA".split("");

  const techStack = ["Next.js", "Angular", "TypeScript", "Java", "Springboot"];

  const stats = [
    { value: "12+", label: "Projects" },
    { value: "3yr", label: "Exp." },
    { value: "100%", label: "Passion" },
  ];

  /* ── Magnetic name refs ──────────────────── */
  const nameRef = useRef<HTMLHeadingElement>(null);
  const nameRaf = useRef<number>(0);
  const nameTarget = useRef({ x: 0, y: 0 });
  const nameCurrent = useRef({ x: 0, y: 0 });

  const handleNameMouse = useCallback((e: MouseEvent) => {
    const el = nameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const STRENGTH = 0.08;
    const MAX = 30;
    nameTarget.current.x = Math.max(-MAX, Math.min(MAX, dx * STRENGTH));
    nameTarget.current.y = Math.max(-MAX, Math.min(MAX, dy * STRENGTH));
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleNameMouse);

    const tick = () => {
      const LERP = 0.06;
      nameCurrent.current.x += (nameTarget.current.x - nameCurrent.current.x) * LERP;
      nameCurrent.current.y += (nameTarget.current.y - nameCurrent.current.y) * LERP;

      if (nameRef.current) {
        nameRef.current.style.transform =
          `translate(${nameCurrent.current.x}px, ${nameCurrent.current.y}px)`;
      }
      nameRaf.current = requestAnimationFrame(tick);
    };
    nameRaf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleNameMouse);
      cancelAnimationFrame(nameRaf.current);
    };
  }, [handleNameMouse]);

  /* ── Scroll‑based blur / scale / opacity ── */
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = heroRef.current;
      if (!el) return;
      const triggerStart = window.innerHeight * 0.6;       /* 60vh */
      const triggerEnd   = window.innerHeight * 1.8;       /* full effect range */
      const scrollY = window.scrollY;

      if (scrollY <= triggerStart) {
        el.style.filter = "blur(0px)";
        el.style.transform = "scale(1)";
        el.style.opacity = "1";
        return;
      }

      const progress = Math.min((scrollY - triggerStart) / (triggerEnd - triggerStart), 1);
      const blur   = progress * 12;                        /* max 12px */
      const scale  = 1 - progress * 0.04;                 /* min 0.96 */
      const opacity = 1 - progress * 0.7;                 /* min 0.3 */

      el.style.filter = `blur(${blur}px)`;
      el.style.transform = `scale(${scale})`;
      el.style.opacity = `${opacity}`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Inline CSS animations ────────────────────── */}
      <style>{`
        /* ── Fonts (Google) ───────────────────────────── */
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;500&display=swap');

        /* ── Spinning rings ──────────────────────────── */
        @keyframes spinRing   { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        @keyframes counterSpin{ 0%{transform:rotate(0deg)} 100%{transform:rotate(-360deg)} }

        /* ── Floating wave for YOSUA letters ─────────── */
        @keyframes floatWave {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-14px); }
        }

        /* ── Pulsing green dot ───────────────────────── */
        @keyframes pulseDot {
          0%, 100% { opacity:1; box-shadow:0 0 0 0 rgba(34,197,94,.6); }
          50%      { opacity:.85; box-shadow:0 0 0 6px rgba(34,197,94,0); }
        }

        /* ── Gradient text animation ─────────────────── */
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* ── Hero wrapper (sticky + scroll‑blur) ─────── */
        .hero-sticky-wrap {
          position: sticky;
          top: 0;
          z-index: 1;
        }

        /* ── Hero root ───────────────────────────────── */
        .hero-root {
          position: relative;
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          background: #050508;
          overflow: hidden;
          will-change: filter, transform, opacity;
        }

        /* ── Ambient glows ───────────────────────────── */
        .glow-left {
          position: absolute;
          top: 20%;
          left: -10%;
          width: 50vw;
          height: 60vh;
          background: radial-gradient(circle, rgba(99,102,241,.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .glow-right {
          position: absolute;
          bottom: 10%;
          right: -10%;
          width: 50vw;
          height: 60vh;
          background: radial-gradient(circle, rgba(167,139,250,.10) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── Content wrapper ─────────────────────────── */
        .hero-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 100px 5vw 40px;
          width: 100%;
          gap: 48px;
        }
        .hero-left  { flex: 1; min-width: 0; }
        .hero-right { flex: 0 0 auto; display: flex; flex-direction: column; align-items: center; gap: 36px; }

        /* ── Badge ────────────────────────────────────── */
        .badge-available {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 18px;
          border-radius: 9999px;
          border: 1px solid rgba(34,197,94,.35);
          background: rgba(34,197,94,.08);
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          color: #22c55e;
          margin-bottom: 20px;
        }
        .badge-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #22c55e;
          animation: pulseDot 2s ease-in-out infinite;
        }

        /* ── Label mono ──────────────────────────────── */
        .label-mono {
          font-family: 'JetBrains Mono', monospace;
          font-size: 14px;
          color: #64748b;
          margin-bottom: 12px;
          letter-spacing: .5px;
        }

        /* ── Name ─────────────────────────────────────── */
        .hero-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          line-height: 1.05;
          margin-bottom: 20px;
          will-change: transform;
        }
        .hero-name .first {
          display: block;
          font-size: clamp(48px, 6vw, 80px);
          color: #f1f5f9;
        }
        .hero-name .last {
          display: block;
          font-size: clamp(48px, 6vw, 80px);
          background: linear-gradient(270deg, #6366f1, #a78bfa, #ec4899, #6366f1);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 6s ease infinite;
        }

        /* ── Description ──────────────────────────────── */
        .hero-desc {
          font-size: 16px;
          line-height: 1.7;
          color: #94a3b8;
          max-width: 520px;
          margin-bottom: 28px;
        }
        .hero-desc em {
          font-style: italic;
          color: #cbd5e1;
        }

        /* ── Tech pills ──────────────────────────────── */
        .tech-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 36px;
        }
        .tech-pill {
          padding: 6px 18px;
          border-radius: 9999px;
          border: 1px solid rgba(99,102,241,.35);
          color: #a78bfa;
          font-size: 13px;
          font-family: 'JetBrains Mono', monospace;
          background: transparent;
          transition: all .25s ease;
          cursor: default;
        }
        .tech-pill:hover {
          background: rgba(99,102,241,.12);
          border-color: rgba(99,102,241,.6);
          color: #c4b5fd;
          transform: translateY(-2px);
        }

        /* ── CTA buttons ─────────────────────────────── */
        .cta-group {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .cta-solid {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          border-radius: 12px;
          background: linear-gradient(135deg, #6366f1, #a78bfa);
          color: #fff;
          font-weight: 600;
          font-size: 15px;
          border: none;
          cursor: pointer;
          transition: all .3s ease;
          text-decoration: none;
        }
        .cta-solid:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(99,102,241,.4);
        }
        .cta-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          border-radius: 12px;
          background: transparent;
          color: #a78bfa;
          font-weight: 600;
          font-size: 15px;
          border: 1px solid rgba(167,139,250,.35);
          cursor: pointer;
          transition: all .3s ease;
          text-decoration: none;
        }
        .cta-ghost:hover {
          background: rgba(167,139,250,.08);
          border-color: rgba(167,139,250,.6);
          transform: translateY(-2px);
        }

        /* ── Profile photo + rings ───────────────────── */
        .profile-ring-wrap {
          position: relative;
          width: 220px;
          height: 220px;
        }
        .ring-outer {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px dashed rgba(99,102,241,.45);
          animation: spinRing 18s linear infinite;
        }
        .ring-inner {
          position: absolute;
          inset: 14px;
          border-radius: 50%;
          border: 2.5px solid rgba(167,139,250,.5);
          animation: counterSpin 12s linear infinite;
        }
        .profile-img-wrap {
          position: absolute;
          inset: 28px;
          border-radius: 50%;
          overflow: hidden;
          background: #1e1b4b;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        /* Replace the placeholder below with: <img src="/your-photo.jpg" alt="Yosua" style="width:100%;height:100%;object-fit:cover;" /> */
        .profile-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1e1b4b, #312e81);
        }
        .profile-placeholder svg {
          width: 56%;
          height: 56%;
          color: rgba(167,139,250,.5);
        }

        /* ── Floating YOSUA ──────────────────────────── */
        .floating-name {
          display: flex;
          gap: 4px;
          user-select: none;
        }
        .floating-letter {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(42px, 5vw, 64px);
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(99,102,241,.45);
          text-stroke: 1.5px rgba(99,102,241,.45);
          animation: floatWave 3s ease-in-out infinite;
          transition: text-shadow .3s ease, -webkit-text-stroke-color .3s ease;
          cursor: default;
          line-height: 1;
        }
        .floating-letter:hover {
          animation-play-state: paused;
          -webkit-text-stroke-color: rgba(167,139,250,.9);
          text-shadow: 0 0 24px rgba(167,139,250,.6), 0 0 48px rgba(167,139,250,.3);
        }

        /* ── Stat cards ──────────────────────────────── */
        .stat-cards {
          display: flex;
          gap: 14px;
        }
        .stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 16px 22px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,.06);
          background: rgba(255,255,255,.03);
          backdrop-filter: blur(8px);
          transition: all .3s ease;
          cursor: default;
          min-width: 90px;
        }
        .stat-card:hover {
          border-color: rgba(99,102,241,.35);
          background: rgba(99,102,241,.06);
          transform: translateY(-3px);
        }
        .stat-value {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 24px;
          color: #f1f5f9;
          line-height: 1;
        }
        .stat-label {
          font-size: 12px;
          color: #64748b;
          margin-top: 4px;
          font-family: 'JetBrains Mono', monospace;
        }

        /* ── Footer strip ────────────────────────────── */
        .hero-footer {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 16px 5vw;
          border-top: 1px solid rgba(255,255,255,.05);
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          color: #64748b;
        }
        .hero-footer .footer-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #22c55e;
          animation: pulseDot 2s ease-in-out infinite;
        }

        /* ── Scroll spacer ───────────────────────────── */
        .hero-scroll-spacer {
          height: 200vh;
          position: relative;
          z-index: 0;
          pointer-events: none;
        }

        /* ── Responsive ──────────────────────────────── */
        @media (max-width: 900px) {
          .hero-content {
            flex-direction: column-reverse;
            padding: 100px 24px 32px;
            gap: 40px;
            text-align: center;
            justify-content: center;
          }
          .hero-left {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-desc {
            text-align: center;
          }
          .tech-pills {
            justify-content: center;
          }
          .cta-group {
            justify-content: center;
          }
          .profile-ring-wrap {
            width: 180px;
            height: 180px;
          }
          .ring-inner { inset: 12px; }
          .profile-img-wrap { inset: 24px; }
          .stat-cards {
            gap: 10px;
          }
          .stat-card {
            padding: 12px 16px;
            min-width: 78px;
          }
          .hero-footer {
            justify-content: center;
            padding: 14px 24px;
          }
        }
      `}</style>

      {/* Sticky wrapper — hero pins to top while scrolling */}
      <div className="hero-sticky-wrap">
        <section className="hero-root" id="hero" ref={heroRef}>
          {/* Star background with parallax */}
          <StarCanvas />

          {/* Ambient glows */}
          <div className="glow-left" />
          <div className="glow-right" />

          {/* ── Main content ────────────────────────────── */}
          <div className="hero-content">
            {/* LEFT COLUMN */}
            <div className="hero-left">
              {/* Available badge */}
              <div className="badge-available">
                <span className="badge-dot" />
                Available for work
              </div>

              {/* Monospace label */}
              <p className="label-mono">{"// software engineer"}</p>

              {/* Name — magnetic follow‑mouse */}
              <h1 className="hero-name" ref={nameRef}>
                <span className="first">Yosua</span>
                <span className="last">Reynaldi M.</span>
              </h1>

              {/* Description */}
              <p className="hero-desc">
                Membangun produk digital yang <em>fungsional &amp; indah</em>
                &nbsp;— dari backend hingga UI yang berkesan.
              </p>

              {/* Tech stack pills */}
              <div className="tech-pills">
                {techStack.map((t) => (
                  <span key={t} className="tech-pill">{t}</span>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="cta-group">
                <a href="#projects" className="cta-solid">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                  Lihat Projects
                </a>
                <a href="/cv.pdf" download className="cta-ghost">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Download CV
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="hero-right">
              {/* Profile photo with spinning rings */}
              <div className="profile-ring-wrap">
                <div className="ring-outer" />
                <div className="ring-inner" />
                <div className="profile-img-wrap">
                  {/* ── Photo placeholder: replace with <img src="/your-photo.jpg" alt="Yosua" style={{width:'100%',height:'100%',objectFit:'cover'}} /> ── */}
                  <div className="profile-placeholder">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Floating YOSUA letters */}
              <div className="floating-name">
                {nameLetters.map((letter, i) => (
                  <span
                    key={i}
                    className="floating-letter"
                    style={{ animationDelay: `${i * 0.18}s` }}
                  >
                    {letter}
                  </span>
                ))}
              </div>

              {/* Stat cards */}
              <div className="stat-cards">
                {stats.map((s) => (
                  <div key={s.label} className="stat-card">
                    <span className="stat-value">{s.value}</span>
                    <span className="stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Footer strip ────────────────────────────── */}
          <div className="hero-footer">
            <span className="footer-dot" />
            <span>Open to freelance &amp; full-time — Bandung, ID</span>
          </div>
        </section>
      </div>

      {/* ── Scroll spacer (200vh) for sticky+blur effect ── */}
      <div className="hero-scroll-spacer" />
    </>
  );
}
