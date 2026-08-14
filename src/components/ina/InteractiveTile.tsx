import { useEffect, useRef } from "react";

interface InteractiveTileProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  beamColor?: string; // triplet like "168, 85, 247" (purple) or "16, 185, 129" (emerald)
  enableTilt?: boolean;
  showCorners?: boolean;
}

export function InteractiveTile({
  children,
  className = "",
  beamColor = "168, 85, 247",
  enableTilt = true,
  showCorners = true,
  ...props
}: InteractiveTileProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);

    if (enableTilt) {
      const rx = ((0.5 - y / r.height) * 6).toFixed(2);
      const ry = ((x / r.width - 0.5) * 6).toFixed(2);
      el.style.setProperty("--rx", `${rx}deg`);
      el.style.setProperty("--ry", `${ry}deg`);
    }
  };

  const onPointerLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={`relative rounded-[8px] p-[3px] border border-white/20 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.95)] group transition-all duration-300 hover:border-white/40 overflow-hidden ${className}`}
      style={{
        transformStyle: "preserve-3d",
        transform: "perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
        transition: "transform 0.15s ease-out, border-color 0.3s ease",
      }}
      {...props}
    >
      {/* 1. Base Blueprint Diagonal Crosshatch Texture */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(-45deg,rgba(255,255,255,0.18)_0,rgba(255,255,255,0.18)_1.5px,transparent_1.5px,transparent_6px)] z-0" />

      {/* 2. Rotating Glow Light Beam Spinning Around the Perimeter through the texture */}
      <div
        className="pointer-events-none absolute -inset-[150%] animate-spin-beam opacity-80 group-hover:opacity-100 transition-opacity z-[1]"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(${beamColor}, 0.5) 310deg, rgba(255, 255, 255, 0.95) 345deg, rgba(${beamColor}, 0.7) 360deg)`,
        }}
      />

      {/* 3. Second Blueprint Overlay for High Contrast Slits */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(-45deg,rgba(255,255,255,0.22)_0,rgba(255,255,255,0.22)_1.5px,transparent_1.5px,transparent_6px)] mix-blend-overlay z-[2]" />

      {/* Precision Corner Crosshair Ticks */}
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

      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-3xl z-10"
        style={{
          left: "var(--mx, 50%)",
          top: "var(--my, 50%)",
          background: `radial-gradient(circle, rgba(${beamColor}, 0.3) 0%, transparent 70%)`,
        }}
      />

      {/* Inner Core Surface */}
      <div className="relative z-10 h-full w-full rounded-[5px] bg-gradient-to-b from-[#1d1e26] via-[#16171d] to-[#111216] p-6 sm:p-7 border border-white/10 shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,0.22),inset_0_-1px_3px_0_rgba(0,0,0,0.8)]">
        {children}
      </div>
    </div>
  );
}
