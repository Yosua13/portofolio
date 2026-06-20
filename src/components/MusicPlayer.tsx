"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Maximize2, Minimize2, Music } from "lucide-react";

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

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); // Default volume 20%
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
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
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {isExpanded ? (
        /* Expanded Player Card (White Theme, Smaller size, rounded corners) */
        <div className="w-64 border border-slate-200 bg-white p-4 shadow-2xl flex flex-col space-y-3 rounded-xl select-none">
          {/* Top Bar with Album Art and Collapse Button */}
          <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden rounded-lg border border-slate-100">
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
              className="w-full h-1 bg-slate-200 appearance-none cursor-pointer accent-indigo-600 rounded-none"
            />
            <div className="flex justify-between text-[9px] text-slate-400 font-bold uppercase tracking-wider">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Track Details */}
          <div className="text-center space-y-0.5">
            <h4 className="text-slate-800 font-extrabold text-sm tracking-tight truncate px-2 leading-tight">
              {currentTrack.title}
            </h4>
            <p className="text-indigo-600 text-[10px] font-bold uppercase tracking-widest truncate">
              {currentTrack.artist}
            </p>
          </div>

          {/* Playback Controls (Slimmer play button, sharp corners) */}
          <div className="flex items-center justify-center gap-4 pt-1">
            <button
              onClick={handlePrev}
              className="text-slate-400 hover:text-slate-800 transition-colors cursor-pointer p-1"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={togglePlay}
              className="w-9 h-9 bg-slate-900 text-white rounded-full hover:bg-slate-800 flex items-center justify-center transition-all cursor-pointer active:scale-95"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>
            <button
              onClick={handleNext}
              className="text-slate-400 hover:text-slate-800 transition-colors cursor-pointer p-1"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={toggleMute}
              className="text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
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
              className="flex-1 h-1 bg-slate-200 appearance-none cursor-pointer accent-indigo-600 rounded-none"
            />
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest w-7 text-right">
              {isMuted ? "0%" : `${Math.round(volume * 100)}%`}
            </span>
          </div>
        </div>
      ) : (
        /* Collapsed Pill-style Trigger Button (Width w-64 matching Expanded Card) */
        <button
          onClick={() => setIsExpanded(true)}
          className="relative flex items-center gap-3 px-4 py-2.5 bg-white border border-slate-200 shadow-xl cursor-pointer hover:scale-102 active:scale-98 transition-all rounded-xl select-none w-64"
        >
          {/* Cover Image */}
          <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 relative">
            <img
              src={currentTrack.cover}
              alt={currentTrack.title}
              className="w-full h-full object-cover"
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="flex items-end gap-[2px] h-3">
                  <span className="w-[2px] bg-white animate-[pulse_1s_infinite] h-2" />
                  <span className="w-[2px] bg-white animate-[pulse_1s_infinite_150ms] h-3" />
                  <span className="w-[2px] bg-white animate-[pulse_1s_infinite_300ms] h-1.5" />
                </div>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="text-left flex flex-col justify-center pr-2 flex-1 min-w-0">
            <span className="font-sans text-xs font-semibold text-slate-800 tracking-tight leading-none block truncate">
              {currentTrack.artist}
            </span>
            <span className="font-sans text-[11px] text-indigo-600 font-medium leading-normal block pt-0.5 truncate">
              {currentTrack.title}
            </span>
          </div>

          {/* Down Triangle Indicator */}
          <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]" />
        </button>
      )}
    </div>
  );
}
