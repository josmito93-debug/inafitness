import { useState, useEffect } from "react";
import { Play, Pause, RotateCw, Sparkles, Eye } from "lucide-react";
import { getExerciseImageUrl } from "@/lib/exercisedb";

interface ExerciseGifPlayerProps {
  images?: string[];
  gifUrl?: string;
  posterUrl?: string;
  alt: string;
  className?: string;
  autoPlay?: boolean;
  intervalMs?: number;
}

export function ExerciseGifPlayer({
  images = [],
  gifUrl,
  posterUrl,
  alt,
  className = "",
  autoPlay = true,
  intervalMs = 1200,
}: ExerciseGifPlayerProps) {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [hasGifError, setHasGifError] = useState(false);

  const hasMultipleFrames = images.length > 1;
  const showGif = gifUrl && !hasGifError;

  // Frame cycling loop for ExerciseDB image sequence (0.jpg -> 1.jpg -> 0.jpg)
  useEffect(() => {
    if (!isPlaying || showGif || !hasMultipleFrames) return;

    const timer = setInterval(() => {
      setCurrentFrameIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, showGif, hasMultipleFrames, images.length, intervalMs]);

  // Determine current image source
  let currentSrc = posterUrl || "";
  if (showGif) {
    currentSrc = gifUrl;
  } else if (images.length > 0) {
    currentSrc = getExerciseImageUrl(images[currentFrameIndex] || images[0]);
  }

  return (
    <div className={`relative overflow-hidden group bg-[#15161b] select-none ${className}`}>
      {/* Exercise Image or Animated Frame */}
      {currentSrc ? (
        <img
          src={currentSrc}
          alt={alt}
          onError={() => setHasGifError(true)}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-white/5 text-xs text-muted-foreground">
          Sin vista previa
        </div>
      )}

      {/* Subtle overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#18191f] via-transparent to-transparent opacity-80 pointer-events-none" />

      {/* Top Animated Motion Status Badge */}
      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 rounded-full bg-black/80 border border-white/20 px-2.5 py-1 text-[9px] font-mono text-purple-300 backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-ping" />
        <span className="font-bold tracking-wider uppercase">
          {showGif
            ? "GIF EN VIVO"
            : hasMultipleFrames
              ? `FASE ${currentFrameIndex + 1}/${images.length}`
              : "DEMO HD"}
        </span>
      </div>

      {/* Frame / Playback Controller Pill */}
      {hasMultipleFrames && !showGif && (
        <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 bg-black/80 border border-white/15 px-2 py-1 rounded-full backdrop-blur-md">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying(!isPlaying);
            }}
            className="text-white hover:text-purple-300 transition-colors p-0.5"
            title={isPlaying ? "Pausar movimiento" : "Reproducir movimiento"}
          >
            {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 fill-white" />}
          </button>
          <span className="text-[9px] font-mono text-purple-200 pl-1">
            {isPlaying ? "Loop" : "Pausa"}
          </span>
        </div>
      )}
    </div>
  );
}
