import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  Activity,
  Apple,
  Dumbbell,
  Flame,
  Sparkles,
  Users,
  Menu,
  X,
  Droplets,
  Heart,
  Zap,
  CheckCircle2,
  TrendingUp,
  Award,
  BarChart3,
  Clock,
  ShieldCheck,
  Target,
} from "lucide-react";

import { Logo } from "@/components/ina/Logo";
import { AmbientBackground } from "@/components/ina/GsapCanvas";
import { AnimatedCounter } from "@/components/ina/AnimatedCounter";
import { FloatingDock } from "@/components/ina/FloatingDock";
import { BlueprintCard } from "@/components/ina/BlueprintCard";
import { Button } from "@/components/ui/button";
import { programas, comidas, macros } from "@/lib/ina-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "INA Fitness OS — Método Integral de Andre Ina" },
      {
        name: "description",
        content:
          "Plataforma de alta precisión para recomposición corporal, nutrición gourmet y entrenamiento de fuerza con biometría en vivo.",
      },
      { property: "og:title", content: "INA Fitness OS — Método Integral de Andre Ina" },
      {
        property: "og:description",
        content:
          "Transforma tu cuerpo, tu mente y tu relación con la comida con la Web App Oficial de Andre Ina.",
      },
      { property: "og:image", content: "/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/og-image.png" },
    ],
  }),
  component: Index,
});

const pilares = [
  {
    icon: Apple,
    title: "Nutrición Gourmet",
    metric: "100% Flexible",
    desc: "Ajuste de macronutrientes sin dietas restrictivas.",
  },
  {
    icon: Dumbbell,
    title: "Sobrecarga Progresiva",
    metric: "4 Fases / Sem",
    desc: "Entrenamientos guiados con temporizador y técnica HD.",
  },
  {
    icon: Activity,
    title: "HUD Biométrico",
    metric: "En Vivo",
    desc: "Monitoreo de frecuencia cardíaca, sueño y quema calórica.",
  },
  {
    icon: Users,
    title: "Acompañamiento 1 a 1",
    metric: "Feedback Semanal",
    desc: "Calibración constante de metas con la coach Andre Ina.",
  },
];

function Index() {
  const heroTextRef = useRef<HTMLDivElement>(null);
  const [activeProofGoal, setActiveProofGoal] = useState<"grasa" | "recomp" | "musculo">("recomp");

  useEffect(() => {
    if (heroTextRef.current) {
      gsap.fromTo(
        heroTextRef.current.children,
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
        },
      );
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#121316] text-foreground selection:bg-purple-600 selection:text-white pb-36 font-sans">
      {/* Precision Flat Background */}
      <AmbientBackground />

      {/* ILLUSTRATOR / CAD BLUEPRINT DRAFTING GUIDELINES */}
      <div className="pointer-events-none fixed inset-0 z-0 flex justify-between max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 opacity-30">
        <div className="h-full w-[1px] bg-white/[0.06]" />
        <div className="hidden md:block h-full w-[1px] bg-white/[0.04]" />
        <div className="hidden lg:block h-full w-[1px] bg-white/[0.04]" />
        <div className="h-full w-[1px] bg-white/[0.06]" />
      </div>

      {/* HEADER */}
      <Header />

      <main className="relative z-10 pt-28 space-y-28 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* ==================== 1. HERO SECTION WITH MODULAR PROOF COCKPIT ==================== */}
        <section className="relative pt-8 pb-12">
          {/* Top Illustrator Coordinate Tag */}
          <div className="flex items-center justify-between pb-6 border-b border-white/[0.06] text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <span className="text-purple-400 font-bold">+</span> SISTEMA BIOMÉTRICO OFICIAL
            </span>
            <span className="hidden sm:inline-block">INA FITNESS OS // VER 3.4</span>
          </div>

          <div className="grid gap-12 lg:grid-cols-12 lg:items-center pt-8">
            {/* Left Column: Direct High-Status Value Prop */}
            <div ref={heroTextRef} className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-md border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-[10px] font-mono tracking-widest text-purple-300 uppercase">
                <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                <span>Método Integral Andre Ina</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl font-light tracking-tight text-white uppercase leading-[1.02]">
                Ciencia, nutrición <br />
                <span className="text-purple-400 font-normal">& fuerza real</span>
              </h1>

              <p className="text-sm leading-relaxed text-muted-foreground max-w-lg">
                El sistema de entrenamiento y nutrición gourmet diseñado para transformar tu
                composición corporal con datos biométricos en tiempo real y disciplina consciente.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/acceso"
                  className="group flex items-center gap-3 rounded-[6px] bg-purple-600 px-6 py-3 text-xs font-semibold text-white shadow-lg hover:bg-purple-500 transition-all"
                >
                  <span>Iniciar Mi Transformación</span>
                  <div className="flex h-5 w-5 items-center justify-center rounded bg-black/20 group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>

                <a
                  href="#metodo"
                  className="rounded-[6px] border border-white/10 bg-white/5 px-5 py-3 text-xs font-medium text-purple-200 hover:bg-white/10 hover:border-white/20 transition-colors"
                >
                  Explorar Método
                </a>
              </div>

              {/* Live Metric Tickers */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/[0.06]">
                <div>
                  <p className="font-display text-2xl font-light text-white">
                    <AnimatedCounter value={2400} prefix="+" />
                  </p>
                  <p className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5">
                    Atletas Activas
                  </p>
                </div>
                <div>
                  <p className="font-display text-2xl font-light text-emerald-400">
                    <AnimatedCounter value={98} suffix="%" />
                  </p>
                  <p className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5">
                    Adherencia
                  </p>
                </div>
                <div>
                  <p className="font-display text-2xl font-light text-white">
                    <AnimatedCounter value={100} suffix="%" />
                  </p>
                  <p className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5">
                    Nutrición Real
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: SIDE-BY-SIDE MODULAR PROOF COCKPIT */}
            <div className="lg:col-span-6 space-y-3">
              {/* Cockpit Goal Switcher */}
              <div className="flex items-center gap-1 rounded-[6px] border border-white/10 bg-white/[0.02] p-1">
                {[
                  { id: "grasa", label: "Pérdida de Grasa" },
                  { id: "recomp", label: "Recomposición Física" },
                  { id: "musculo", label: "Hipertrofia Glúteo" },
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setActiveProofGoal(g.id as typeof activeProofGoal)}
                    className={`flex-1 py-1.5 text-[10px] font-mono font-semibold rounded transition-colors ${
                      activeProofGoal === g.id
                        ? "bg-purple-600 text-white"
                        : "text-muted-foreground hover:text-white"
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>

              {/* 4 Modular Side-by-Side Live Proof Cards with Blueprint Hatching */}
              <div className="grid gap-3 sm:grid-cols-2">
                {/* 1. Nutrition & Deficit Card */}
                <BlueprintCard tag="MACROS // DEFICIT">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-md bg-purple-500/10 border border-purple-400/20 flex items-center justify-center text-purple-400 shrink-0">
                          <Apple className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="text-[9px] font-mono uppercase text-muted-foreground">
                            Macronutrientes
                          </span>
                          <h4 className="text-xs font-semibold text-white">
                            {activeProofGoal === "grasa"
                              ? "1,500 kcal / día"
                              : activeProofGoal === "musculo"
                                ? "2,200 kcal / día"
                                : "1,800 kcal / día"}
                          </h4>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">
                        160g P
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] font-mono text-muted-foreground">
                        <span>Progreso de Adherencia</span>
                        <span>92%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full bar-glow-purple transition-all duration-700"
                          style={{ width: "92%" }}
                        />
                      </div>
                    </div>
                  </div>
                </BlueprintCard>

                {/* 2. Strength Overload Progress Card */}
                <BlueprintCard tag="FORCE // LOAD" accentColor="cyan">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-md bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-400 shrink-0">
                          <Dumbbell className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="text-[9px] font-mono uppercase text-muted-foreground">
                            Sobrecarga Glúteo
                          </span>
                          <h4 className="text-xs font-semibold text-white">Zancada Búlgara</h4>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-blue-300 font-bold">+5 kg</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] font-mono text-muted-foreground">
                        <span>Carga Mecánica Semanal</span>
                        <span>85%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full bar-glow-blue transition-all duration-700"
                          style={{ width: "85%" }}
                        />
                      </div>
                    </div>
                  </div>
                </BlueprintCard>

                {/* 3. Hydration & Vital Metrics */}
                <BlueprintCard tag="HYD // VITAL" accentColor="cyan">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-md bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 shrink-0">
                          <Droplets className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="text-[9px] font-mono uppercase text-muted-foreground">
                            Hidratación
                          </span>
                          <h4 className="text-xs font-semibold text-white">2.5 L / 3.0 L</h4>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-300 font-bold">83%</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] font-mono text-muted-foreground">
                        <span>Metabolismo Celular</span>
                        <span>83%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full bar-glow-cyan transition-all duration-700"
                          style={{ width: "83%" }}
                        />
                      </div>
                    </div>
                  </div>
                </BlueprintCard>

                {/* 4. Weekly Consistency Matrix Card */}
                <BlueprintCard tag="STREAK // LVL 3">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-md bg-orange-500/10 border border-orange-400/20 flex items-center justify-center text-orange-400 shrink-0">
                          <Flame className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="text-[9px] font-mono uppercase text-muted-foreground">
                            Racha de Hábito
                          </span>
                          <h4 className="text-xs font-semibold text-white">5 Días Consecutivos</h4>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-orange-400 font-bold">LVL 3</span>
                    </div>

                    <div className="flex items-center justify-between gap-1 pt-0.5">
                      {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
                        <div
                          key={i}
                          className={`h-5 w-full rounded-[3px] flex items-center justify-center text-[9px] font-mono font-bold ${
                            i < 5 ? "bg-purple-600 text-white" : "bg-white/5 text-muted-foreground"
                          }`}
                        >
                          {i < 5 ? "✓" : d}
                        </div>
                      ))}
                    </div>
                  </div>
                </BlueprintCard>
              </div>

              {/* Bottom Verification Strip */}
              <div className="rounded-[8px] border border-white/10 bg-white/[0.02] px-4 py-2.5 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Garantía de Método Basado en Biometría y Adherencia
                </span>
                <Link
                  to="/acceso"
                  className="text-purple-300 hover:text-white font-mono text-[10px]"
                >
                  Ver Demo →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 2. PILARES DEL MÉTODO CON MICRO-CUADRITOS ICONOGRÁFICOS ==================== */}
        <section id="metodo" className="space-y-8">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase font-bold">
                [02 // ARQUITECTURA DEL MÉTODO]
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-light text-white uppercase mt-0.5">
                4 Componentes Fundamentales
              </h2>
            </div>
            <span className="text-xs text-muted-foreground font-mono hidden sm:inline-block">
              Precisión · Sin Dietas Aburridas
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pilares.map((p, idx) => (
              <BlueprintCard key={p.title} tag={`PIL // 0${idx + 1}`}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    {/* Micro-cuadrito iconográfico */}
                    <div className="w-9 h-9 rounded-md bg-white/[0.04] border border-white/10 flex items-center justify-center text-purple-400 shrink-0">
                      <p.icon className="h-4 w-4" />
                    </div>
                    <span className="rounded bg-white/5 border border-white/10 px-2 py-0.5 text-[9px] font-mono text-purple-300">
                      {p.metric}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-white">{p.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </BlueprintCard>
            ))}
          </div>
        </section>

        {/* ==================== 3. PROGRAMAS & PLANES CON BORDES FINOS ==================== */}
        <section id="programas" className="space-y-8">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase font-bold">
                [03 // PLANES & SUSCRIPCIÓN]
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-light text-white uppercase mt-0.5">
                Planes de Transformación
              </h2>
            </div>
            <span className="text-xs text-muted-foreground font-mono hidden sm:inline-block">
              Cupos Limitados por Cohorte
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {programas.map((p) => (
              <BlueprintCard
                key={p.nombre}
                tag={p.destacado ? "PRO // RECOMENDADO" : "MEMBERSHIP"}
                className={
                  p.destacado
                    ? "border-purple-500/50 shadow-[0_20px_45px_-10px_rgba(168,85,247,0.3)]"
                    : ""
                }
              >
                <div className="flex flex-col justify-between h-full space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-purple-300 tracking-widest">
                        {p.semanas}
                      </span>
                      {p.destacado && (
                        <span className="rounded bg-purple-500/20 text-purple-300 border border-purple-400/40 text-[9px] font-mono px-2 py-0.5 font-bold uppercase">
                          MÁS ELEGIDO
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-xl text-white font-light uppercase">
                      {p.nombre}
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-4xl font-light text-white">
                        {p.precio}
                      </span>
                      <span className="text-xs text-muted-foreground">/ mes</span>
                    </div>

                    <ul className="space-y-2 border-t border-white/10 pt-4 text-xs text-muted-foreground">
                      {p.puntos.map((punto, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-purple-400 shrink-0" />
                          <span className="text-purple-200/90">{punto}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    asChild
                    className={`w-full rounded-[6px] py-3 text-xs font-semibold ${
                      p.destacado
                        ? "bg-purple-600 text-white hover:bg-purple-500"
                        : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                    }`}
                  >
                    <Link to="/acceso">Iniciar Programa</Link>
                  </Button>
                </div>
              </BlueprintCard>
            ))}
          </div>
        </section>
      </main>

      {/* FLOATING CONTROL DOCK */}
      <FloatingDock />

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/[0.06] py-12 mt-28">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-4 px-6 sm:px-10 lg:px-16 md:flex-row">
          <Logo />
          <p className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
            © 2026 INA FITNESS OS — ANDRE INA. TODOS LOS DERECHOS RESERVADOS
          </p>
        </div>
      </footer>
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-6 sm:px-10 lg:px-16 py-3.5 transition-all">
      <div
        className={`mx-auto flex max-w-[1600px] items-center justify-between rounded-[8px] border px-6 py-2.5 transition-all duration-300 ${
          scrolled
            ? "border-white/10 bg-[#18191f]/90 shadow-lg backdrop-blur-2xl"
            : "border-white/10 bg-[#18191f]/50 backdrop-blur-md"
        }`}
      >
        <Logo />

        <nav className="hidden items-center gap-8 md:flex text-xs font-medium tracking-widest uppercase font-mono">
          <a href="#metodo" className="text-muted-foreground hover:text-white transition-colors">
            El Método
          </a>
          <a href="#programas" className="text-muted-foreground hover:text-white transition-colors">
            Planes
          </a>
          <Link
            to="/acceso"
            className="rounded-[6px] bg-purple-600 px-4 py-1.5 text-xs text-white hover:bg-purple-500 transition-colors"
          >
            Dashboard
          </Link>
        </nav>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white md:hidden">
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="mt-2 rounded-[8px] border border-white/10 bg-[#18191f] p-4 text-center space-y-3 md:hidden backdrop-blur-2xl">
          <a
            href="#metodo"
            onClick={() => setMobileOpen(false)}
            className="block text-xs text-purple-200"
          >
            El Método
          </a>
          <a
            href="#programas"
            onClick={() => setMobileOpen(false)}
            className="block text-xs text-purple-200"
          >
            Planes
          </a>
          <Link
            to="/acceso"
            onClick={() => setMobileOpen(false)}
            className="block rounded-[6px] bg-purple-600 py-2.5 text-xs font-semibold text-white"
          >
            Acceder al Dashboard
          </Link>
        </div>
      )}
    </header>
  );
}
