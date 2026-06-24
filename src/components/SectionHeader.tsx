"use client";

interface SectionHeaderProps {
  topText: string;
  mainText: string;
  subText: string;
  bottomText: string;
  watermark?: string;
}

export default function SectionHeader({
  topText,
  mainText,
  subText,
  bottomText,
  watermark = "YOSUA",
}: SectionHeaderProps) {
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
