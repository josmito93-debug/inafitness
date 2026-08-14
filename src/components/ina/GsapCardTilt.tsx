import { useRef } from "react";
import gsap from "gsap";

interface GsapCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // e.g. "rgba(168, 85, 247, 0.2)"
}

export function GsapCard({
  children,
  className = "",
  glowColor = "rgba(168, 85, 247, 0.25)",
  ...props
}: GsapCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
    const rotateY = ((x - centerX) / centerX) * 6;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.01,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 1000,
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        x: x,
        y: y,
        opacity: 0.8,
        duration: 0.2,
      });
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0,
        duration: 0.4,
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-[8px] p-[3px] border border-white/20 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.95)] group transition-all duration-300 hover:border-white/40 overflow-hidden ${className}`}
      style={{ transformStyle: "preserve-3d" }}
      {...props}
    >
      {/* 1. Base Blueprint Diagonal Crosshatch Texture */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(-45deg,rgba(255,255,255,0.18)_0,rgba(255,255,255,0.18)_1.5px,transparent_1.5px,transparent_6px)] z-0" />

      {/* 2. Rotating Glow Light Beam Spinning Around the Perimeter through the texture */}
      <div
        className="pointer-events-none absolute -inset-[150%] animate-spin-beam opacity-80 group-hover:opacity-100 transition-opacity z-[1]"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(168, 85, 247, 0.5) 310deg, rgba(255, 255, 255, 0.95) 345deg, rgba(168, 85, 247, 0.7) 360deg)`,
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

      {/* Dynamic Cursor Light Spot */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 h-52 w-52 rounded-full opacity-0 blur-3xl transition-opacity z-10"
        style={{ background: glowColor }}
      />

      {/* Inner Core Surface with Dual Tone Gray Gradient & Silver Edge */}
      <div className="relative z-10 h-full w-full rounded-[5px] bg-gradient-to-b from-[#1d1e26] via-[#16171d] to-[#111216] p-6 sm:p-7 border border-white/10 shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,0.22),inset_0_-1px_3px_0_rgba(0,0,0,0.8)]">
        {children}
      </div>
    </div>
  );
}
