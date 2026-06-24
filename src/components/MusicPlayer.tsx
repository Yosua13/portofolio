"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Minimize2, Music, Gamepad2 } from "lucide-react";

interface Track {
  title: string;
  artist: string;
  url: string;
  cover: string;
}

const TRACKS: Track[] = [
  {
    title: "Chill Lofi Beat",
    artist: "Lofi Dreamer",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    title: "Sunset Breeze",
    artist: "Acoustic Vibes",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    title: "Nightfall Walk",
    artist: "Midnight Lounge",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    title: "Bliss",
    artist: "Lofi Focus",
    url: "/music/Bliss.mp3",
    cover: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=300&auto=format&fit=crop&q=60"
  },
  {
    title: "Chill Lofi Hip Hop",
    artist: "Study Session",
    url: "/music/Chill Lofi Hip Hop.mp3",
    cover: "https://images.unsplash.com/photo-1487180142328-0c4e37023af5?w=300&auto=format&fit=crop&q=60"
  },
  {
    title: "Lofi Chill",
    artist: "Coffee Shop",
    url: "/music/Lofi.mp3",
    cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&auto=format&fit=crop&q=60"
  }
];

export default function MusicPlayer({ 
  playOnStart = false,
  playMode = false,
  setPlayMode
}: { 
  playOnStart?: boolean;
  playMode?: boolean;
  setPlayMode?: (val: boolean) => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); // Default volume 20%
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Handle Play/Pause
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => console.log("Playback error: ", err));
      setIsPlaying(true);
    }
  };

  // Skip Next
  const handleNext = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % TRACKS.length);
  };

  // Skip Prev
  const handlePrev = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + TRACKS.length) % TRACKS.length);
  };

  // Play immediately when playOnStart prop becomes true
  useEffect(() => {
    if (playOnStart) {
      const timer = setTimeout(() => {
        setIsPlaying(true);
      }, 0);
      if (audioRef.current) {
        audioRef.current.play().catch((err) => console.log("Auto-play error:", err));
      }
      return () => clearTimeout(timer);
    }
  }, [playOnStart]);

  const currentTrack = TRACKS[currentTrackIndex];

  // Initialize Audio
  useEffect(() => {
    const audio = new Audio(currentTrack.url);
    audioRef.current = audio;
    audio.volume = volume;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => handleNext();

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    // If it was playing, start playing the new track
    if (isPlaying) {
      audio.play().catch((err) => console.log("Audio play error: ", err));
    }

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, [currentTrackIndex]);

  // Handle Scrubber Seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const seekTime = parseFloat(e.target.value);
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  // Handle Volume Change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      audioRef.current.muted = newVolume === 0;
    }
  };

  // Toggle Mute
  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.muted = false;
      setIsMuted(false);
      audioRef.current.volume = volume > 0 ? volume : 0.2;
      setVolume(volume > 0 ? volume : 0.2);
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  // Format Time
  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans flex items-end gap-3 select-none">
      {/* Floating Game Toggle Button (Gamepad Icon) */}
      <button
        onClick={() => setPlayMode?.(!playMode)}
        className={`flex items-center justify-center w-12 h-12 rounded-full border hover:scale-105 active:scale-95 shadow-xl transition-all cursor-pointer group shrink-0 ${
          playMode 
            ? "border-cyan-500 bg-cyan-950/80 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]" 
            : "border-slate-800 bg-[#090b16]/90 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/50"
        }`}
        title={playMode ? "Exit Flight Game" : "Start Flight Game"}
      >
        <Gamepad2 className={`w-5 h-5 group-hover:rotate-12 transition-transform duration-300 ${playMode ? "animate-pulse" : ""}`} />
      </button>

      {isExpanded ? (
        /* Expanded Player Card (Dark Glass Theme, Smaller size, rounded corners) */
        <div className="w-64 border border-white/10 bg-[#090b16]/90 backdrop-blur-md p-4 shadow-2xl flex flex-col space-y-3 rounded-xl select-none shrink-0 text-slate-200">
          {/* Top Bar with Album Art and Collapse Button */}
          <div className="relative aspect-[16/10] w-full bg-slate-900/50 overflow-hidden rounded-lg border border-white/5">
            <img
              src={currentTrack.cover}
              alt={currentTrack.title}
              className={`w-full h-full object-cover opacity-90 transition-transform duration-1000 ${isPlaying ? 'scale-105' : 'scale-100'}`}
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            {/* Collapse/Minimize Button */}
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-2 left-2 bg-black/60 hover:bg-black/90 text-white p-1.5 border border-white/10 transition-colors cursor-pointer rounded-lg"
              title="Minimize Player"
            >
              <Minimize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Time Scrubber */}
          <div className="space-y-0.5">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-indigo-400 rounded-none"
            />
            <div className="flex justify-between text-[9px] text-slate-400 font-bold uppercase tracking-wider">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Track Details */}
          <div className="text-center space-y-0.5">
            <h4 className="text-white font-extrabold text-sm tracking-tight truncate px-2 leading-tight">
              {currentTrack.title}
            </h4>
            <p className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest truncate">
              {currentTrack.artist}
            </p>
          </div>

          {/* Playback Controls (Slimmer play button, sharp corners) */}
          <div className="flex items-center justify-center gap-4 pt-1">
            <button
              onClick={handlePrev}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={togglePlay}
              className="w-9 h-9 bg-white text-[#0a0a0a] rounded-full hover:bg-slate-200 flex items-center justify-center transition-all cursor-pointer active:scale-95"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>
            <button
              onClick={handleNext}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2 pt-2 border-t border-white/5">
            <button
              onClick={toggleMute}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-3.5 h-3.5" />
              ) : (
                <Volume2 className="w-3.5 h-3.5" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="flex-1 h-1 bg-white/10 appearance-none cursor-pointer accent-indigo-400 rounded-none"
            />
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest w-7 text-right">
              {isMuted ? "0%" : `${Math.round(volume * 100)}%`}
            </span>
          </div>
        </div>
      ) : (
        /* Collapsed Pill-style Trigger Button (Minimized to a tiny premium icon/pill) */
        <>
          <style>{`
            @keyframes miniEqualizer {
              0%, 100% { height: 4px; }
              50% { height: 14px; }
            }
            .mini-eq-bar-1 { animation: miniEqualizer 0.7s ease-in-out infinite; }
            .mini-eq-bar-2 { animation: miniEqualizer 0.9s ease-in-out infinite 0.2s; }
            .mini-eq-bar-3 { animation: miniEqualizer 0.6s ease-in-out infinite 0.4s; }
          `}</style>
          <button
            onClick={() => setIsExpanded(true)}
            className="relative flex items-center justify-center w-12 h-12 bg-white border border-slate-200 shadow-xl cursor-pointer hover:scale-105 active:scale-95 transition-all rounded-full select-none"
            title="Open Music Player"
          >
            {/* Cover Image */}
            <img
              src={currentTrack.cover}
              alt={currentTrack.title}
              className="w-full h-full object-cover rounded-full"
            />
            {/* Semi-transparent dark overlay */}
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
              {isPlaying ? (
                /* Mini animated equalizer bars */
                <div className="flex items-end gap-[1.5px] h-3.5">
                  <span className="w-[1.5px] bg-white h-2.5 mini-eq-bar-1" />
                  <span className="w-[1.5px] bg-white h-3.5 mini-eq-bar-2" />
                  <span className="w-[1.5px] bg-white h-1.5 mini-eq-bar-3" />
                </div>
              ) : (
                <Music className="w-4 h-4 text-white" />
              )}
            </div>
          </button>
        </>
      )}
    </div>
  );
}
