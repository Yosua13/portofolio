"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WelcomeScreenProps {
  onComplete: (sound: boolean, destination: string) => void;
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    // Buttons are displayed immediately
  }, []);

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#030305] overflow-hidden select-none">
      {/* Soft Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/[0.03] rounded-full filter blur-[80px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative flex flex-col items-center justify-center text-center px-4 max-w-sm">
        
        {/* Top Loading Status */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-[9px] font-semibold tracking-[0.3em] uppercase text-indigo-400/80 font-mono">
            {loaded ? "SYSTEM INITIATED" : "LOADING SYSTEM"}
          </span>
          
          {/* Minimal 1px Progress Bar */}
          <div className="w-16 h-[1px] bg-white/10 overflow-hidden relative">
            <motion.div
              initial={{ left: "-100%" }}
              animate={loaded ? { left: "0%" } : { left: ["-100%", "0%"] }}
              transition={loaded 
                ? { duration: 0.5, ease: "easeOut" } 
                : { repeat: Infinity, duration: 1.2, ease: "easeInOut" }
              }
              className="absolute top-0 bottom-0 left-0 w-full bg-indigo-400"
            />
          </div>
        </motion.div>

        {/* Big Status Title */}
        <div className="h-16 flex items-center justify-center mt-6 mb-8 overflow-hidden">
          <AnimatePresence mode="wait">
            {loaded ? (
              <motion.h1
                key="ready"
                initial={{ opacity: 0, y: 20, letterSpacing: "0.1em" }}
                animate={{ opacity: 1, y: 0, letterSpacing: "0.25em" }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl font-light text-white uppercase font-sans pl-[0.25em]"
              >
                READY
              </motion.h1>
            ) : (
              <motion.span
                key="loading-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                className="text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase font-mono"
              >
                STANDBY
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Action Controls */}
        <AnimatePresence>
          {loaded && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col items-center justify-center"
            >
              {/* Start Button (Play Music) */}
              <button
                onClick={() => onComplete(true, "hero")}
                className="border border-white/15 text-white bg-transparent px-10 py-3 rounded-full text-[10px] font-semibold tracking-[0.3em] uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-500 cursor-pointer min-w-[200px] text-center shadow-lg hover:shadow-white/5 active:scale-[0.98]"
              >
                START EXPERIENCE
              </button>

              {/* Start Without Music Button */}
              <button
                onClick={() => onComplete(false, "hero")}
                className="text-slate-500 hover:text-slate-300 text-[9px] font-semibold tracking-[0.2em] uppercase transition-colors cursor-pointer mt-5 bg-transparent border-none outline-none hover:tracking-[0.22em] duration-300"
              >
                START WITHOUT MUSIC
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
