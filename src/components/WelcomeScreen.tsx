"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Compass, Code2, User, Mail, Music, Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  onComplete: (sound: boolean, destination: string) => void;
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [step, setStep] = useState(1);
  const [soundPreference, setSoundPreference] = useState<boolean | null>(null);

  // Background Particles
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * -20,
      xOffset: Math.random() > 0.5 ? "10vw" : "-10vw",
    }));
    setParticles(generated);
  }, []);

  // Handle music choice
  const handleSoundChoice = (choice: boolean) => {
    setSoundPreference(choice);
    setStep(2);
  };

  // Handle destination choice
  const handleDestinationChoice = (dest: string) => {
    if (soundPreference !== null) {
      onComplete(soundPreference, dest);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#050508] overflow-hidden select-none">
      {/* Premium Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-indigo-500/10 rounded-full filter blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[60vw] h-[60vh] bg-cyan-500/10 rounded-full filter blur-[120px] pointer-events-none animate-pulse duration-[10000ms]" />
      
      {/* Drifting Star Embers */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white/20"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: ["0vh", "-100vh"],
              x: ["0vw", p.xOffset],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main Container Card */}
      <div className="relative w-full max-w-lg mx-4 z-10">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step-sound"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.8)] text-center relative overflow-hidden group"
            >
              {/* Card top gradient line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />
              
              {/* Branding Logo */}
              <div className="mb-8 flex flex-col items-center">
                <span className="font-serif italic font-bold text-4xl text-white tracking-wide">YRM</span>
                <span className="text-[10px] text-slate-400 font-mono tracking-[0.3em] uppercase mt-1">Portfolio Experience</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-3">
                Aktifkan Musik Latar?
              </h2>
              
              <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed mb-8">
                Portfolio ini dilengkapi dengan musik Lofi santai untuk memberikan pengalaman terbaik saat Anda menjelajah.
              </p>

              {/* Step 1 Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => handleSoundChoice(true)}
                  className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold rounded-2xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-[0_4px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_4px_25px_rgba(6,182,212,0.4)] cursor-pointer group"
                >
                  <Volume2 className="w-5 h-5 group-hover:animate-bounce" />
                  <span>Ya, Putar Musik 🎵</span>
                </button>
                <button
                  onClick={() => handleSoundChoice(false)}
                  className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white font-semibold rounded-2xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer"
                >
                  <VolumeX className="w-5 h-5" />
                  <span>Tanpa Musik</span>
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-destination"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] text-center relative overflow-hidden"
            >
              {/* Card top gradient line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500" />

              <div className="mb-6 flex flex-col items-center">
                <span className="text-[10px] text-cyan-400 font-mono tracking-[0.35em] uppercase flex items-center gap-1.5 justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  Langkah Terakhir
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mt-2 mb-1">
                  Pilih Halaman Tujuan
                </h2>
                <p className="text-slate-400 text-xs md:text-sm font-light">
                  Kemana Anda ingin diarahkan pertama kali?
                </p>
              </div>

              {/* Step 2 Buttons - 2x2 Grid */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                {[
                  {
                    id: "hero",
                    label: "Halaman Utama",
                    sub: "Main Section",
                    icon: <Compass className="w-5 h-5 text-indigo-400" />,
                  },
                  {
                    id: "projects",
                    label: "Projects",
                    sub: "Featured Works",
                    icon: <Code2 className="w-5 h-5 text-cyan-400" />,
                  },
                  {
                    id: "profile",
                    label: "Profile",
                    sub: "About & Skills",
                    icon: <User className="w-5 h-5 text-pink-400" />,
                  },
                  {
                    id: "contact",
                    label: "Contact",
                    sub: "Get In Touch",
                    icon: <Mail className="w-5 h-5 text-emerald-400" />,
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleDestinationChoice(item.id)}
                    className="group flex flex-col items-center justify-center p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-300 text-center hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
                  >
                    <div className="p-3 bg-white/5 rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <span className="text-sm font-bold text-white leading-tight block">
                      {item.label}
                    </span>
                    <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono mt-1 block">
                      {item.sub}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
