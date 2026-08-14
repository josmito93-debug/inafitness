import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  Dumbbell,
  Flame,
  Home,
  LayoutGrid,
  Sliders,
  User,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import gsap from "gsap";

export function FloatingDock() {
  const [activeItem, setActiveItem] = useState("home");

  const handleHover = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.25,
      translateY: -6,
      duration: 0.2,
      ease: "back.out(2)",
    });
  };

  const handleLeave = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      translateY: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div className="fixed bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none px-4">
      <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/10 bg-[#18191f]/90 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.12)] backdrop-blur-3xl">
        <Link
          to="/"
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          onClick={() => setActiveItem("home")}
          className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
            activeItem === "home"
              ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]"
              : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white"
          }`}
          title="Inicio"
        >
          <Home className="h-5 w-5" />
        </Link>

        <Link
          to="/dashboard"
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          onClick={() => setActiveItem("dashboard")}
          className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
            activeItem === "dashboard"
              ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]"
              : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white"
          }`}
          title="Dashboard Atleta"
        >
          <LayoutGrid className="h-5 w-5" />
        </Link>

        <Link
          to="/admin"
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          onClick={() => setActiveItem("admin")}
          className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
            activeItem === "admin"
              ? "bg-amber-600 text-white shadow-[0_0_15px_rgba(245,158,11,0.5)]"
              : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white"
          }`}
          title="Panel Inna Coach"
        >
          <ShieldAlert className="h-5 w-5 text-amber-300" />
        </Link>

        <div className="h-6 w-[1px] bg-white/15 my-auto mx-1" />

        {/* Rainbow Pill CTA */}
        <Link
          to="/acceso"
          className="rainbow-pill-border px-5 py-2.5 text-xs font-semibold text-white transition-all hover:scale-105 shadow-[0_0_20px_rgba(168,85,247,0.3)] flex items-center gap-2"
        >
          <Sparkles className="h-3.5 w-3.5 text-purple-300" />
          Acceso Élite
        </Link>
      </div>
    </div>
  );
}
