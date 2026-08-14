import { ReactNode } from "react";

interface BlueprintCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  tag?: string;
  accentColor?: string; // e.g. "purple", "emerald", "cyan", "red", "white"
  enableBeam?: boolean;
}

export function BlueprintCard({
  children,
  className = "",
  innerClassName = "",
  tag,
  accentColor = "purple",
  enableBeam = true,
  ...props
}: BlueprintCardProps) {
  return (
    <div
      className={`relative rounded-[8px] p-[3px] border border-white/20 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.95)] group transition-all duration-300 hover:border-white/40 overflow-hidden ${className}`}
      {...props}
    >
      {/* 1. Base Blueprint Diagonal Crosshatch Texture */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(-45deg,rgba(255,255,255,0.18)_0,rgba(255,255,255,0.18)_1.5px,transparent_1.5px,transparent_6px)] z-0" />

      {/* 2. Rotating Glow Light Beam Spinning Around the Perimeter through the texture */}
      {enableBeam && (
        <div
          className="pointer-events-none absolute -inset-[150%] animate-spin-beam opacity-80 group-hover:opacity-100 transition-opacity z-[1]"
          style={{
            background:
              accentColor === "cyan"
                ? `conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(6, 182, 212, 0.5) 310deg, rgba(255, 255, 255, 0.95) 345deg, rgba(6, 182, 212, 0.6) 360deg)`
                : accentColor === "emerald"
                  ? `conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(16, 185, 129, 0.5) 310deg, rgba(255, 255, 255, 0.95) 345deg, rgba(16, 185, 129, 0.6) 360deg)`
                  : accentColor === "red"
                    ? `conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(239, 68, 68, 0.5) 310deg, rgba(255, 255, 255, 0.95) 345deg, rgba(239, 68, 68, 0.6) 360deg)`
                    : `conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(168, 85, 247, 0.5) 310deg, rgba(255, 255, 255, 0.95) 345deg, rgba(168, 85, 247, 0.7) 360deg)`,
          }}
        />
      )}

      {/* 3. Second Blueprint Overlay for High Contrast Slits */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(-45deg,rgba(255,255,255,0.22)_0,rgba(255,255,255,0.22)_1.5px,transparent_1.5px,transparent_6px)] mix-blend-overlay z-[2]" />

      {/* Corner Technical Crosshairs */}
      <span className="pointer-events-none absolute -top-2.5 -left-2.5 font-mono text-[11px] text-white/40 select-none group-hover:text-purple-400/80 transition-colors font-bold z-20">
        +
      </span>
      <span className="pointer-events-none absolute -top-2.5 -right-2.5 font-mono text-[11px] text-white/40 select-none group-hover:text-purple-400/80 transition-colors font-bold z-20">
        +
      </span>
      <span className="pointer-events-none absolute -bottom-2.5 -left-2.5 font-mono text-[11px] text-white/40 select-none group-hover:text-purple-400/80 transition-colors font-bold z-20">
        +
      </span>
      <span className="pointer-events-none absolute -bottom-2.5 -right-2.5 font-mono text-[11px] text-white/40 select-none group-hover:text-purple-400/80 transition-colors font-bold z-20">
        +
      </span>

      {/* Optional Technical ID Tag on the top frame */}
      {tag && (
        <div className="absolute -top-2.5 left-4 z-20 bg-[#121316] px-2 py-0.2 border border-white/20 rounded-[3px] text-[8px] font-mono text-purple-300 uppercase tracking-widest shadow-sm">
          {tag}
        </div>
      )}

      {/* Inner Core Surface with Dual Tone Gray Gradient & Silver Edge */}
      <div
        className={`relative z-10 h-full w-full rounded-[5px] bg-gradient-to-b from-[#1d1e26] via-[#16171d] to-[#111216] p-5 sm:p-6 border border-white/10 shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,0.22),inset_0_-1px_3px_0_rgba(0,0,0,0.8)] ${innerClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
