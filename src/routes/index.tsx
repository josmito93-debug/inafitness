import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Activity,
  Apple,
  Dumbbell,
  Flame,
  HeartPulse,
  LineChart,
  Sparkles,
  Users,
  Menu,
  X,
  Droplets,
  Moon,
  Footprints,
  Heart,
} from "lucide-react";

import { Logo } from "@/components/ina/Logo";
import { Reveal } from "@/components/ina/Reveal";
import { Button } from "@/components/ui/button";
import { programas } from "@/lib/ina-data";
import heroGym from "@/assets/hero-gym.jpg";
import coach from "@/assets/ina-coach.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "INA Fitness — Transforma tu cuerpo y tu mente" },
      {
        name: "description",
        content:
          "Entrena con INA Fitness: medición de ritmo cardíaco, glucosa, macros, pasos, agua, sueño y temporizador de rutinas en modo Pitch Black y Purple.",
      },
      { property: "og:title", content: "INA Fitness — Medición y Entrenamiento de Élite" },
      {
        property: "og:description",
        content: "Programas, dietas y métricas de entrenamiento en una plataforma de élite.",
      },
    ],
  }),
  component: Index,
});

const beneficios = [
  {
    icon: Apple,
    titulo: "Nutrición a tu medida",
    texto: "Planes de alimentación calculados según tus macros, tu ritmo y tus gustos reales.",
  },
  {
    icon: Activity,
    titulo: "Medimos absolutamente todo",
    texto: "Ritmo cardíaco, glucosa, calorías, macros, grasa, sueño, pasos y agua.",
  },
  {
    icon: Dumbbell,
    titulo: "Rutinas en video HD & Timer",
    texto: "Bloques guiados paso a paso con temporizador en vivo, series y repeticiones.",
  },
  {
    icon: Users,
    titulo: "Comunidad y retos",
    texto: "Desafíos mensuales, racha semanal y acompañamiento para que nunca te detengas.",
  },
];

const metricas = [
  { valor: "+2.400", label: "Transformaciones" },
  { valor: "98%", label: "Adherencia al plan" },
  { valor: "24/7", label: "Acceso al dashboard" },
  { valor: "12", label: "Métricas medidas" },
];

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#07070a] text-foreground selection:bg-purple-600 selection:text-white">
      {/* Background Radial Glows */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 45% at 15% 0%, oklch(0.62 0.26 295 / 22%), transparent 70%), radial-gradient(50% 40% at 95% 30%, oklch(0.74 0.24 145 / 15%), transparent 70%)",
        }}
      />

      <Header />

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative flex min-h-[92vh] items-center overflow-hidden">
          <img
            src={heroGym}
            alt="Gimnasio de lujo iluminado en tonos oscuros y morados"
            width={1920}
            height={1088}
            className="absolute inset-0 h-full w-full scale-105 object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#07070a] via-[#07070a]/90 to-[#07070a]/40" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-[#07070a] to-transparent" />

          <div className="relative mx-auto w-full max-w-6xl px-6 py-28">
            <div className="reveal max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-[11px] tracking-[0.28em] text-purple-300 uppercase">
                <Sparkles className="h-3.5 w-3.5" /> Plataforma de Medición de Élite
              </span>
              <h1 className="mt-8 font-display text-5xl leading-[0.95] font-light tracking-tight uppercase md:text-7xl">
                <span className="text-silver-gradient block">Empodérate</span>
                <span className="shimmer-text block">y transforma</span>
                <span className="block text-white">tu cuerpo</span>
              </h1>
              <p className="mt-8 max-w-lg text-base leading-relaxed text-purple-200/70 md:text-lg">
                Entrenamiento, nutrición y métricas en vivo en un solo lugar. Controla tu ritmo cardíaco,
                macros, pasos, agua, grasa corporal y rutinas con temporizador activo.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button asChild size="lg" className="rounded-xl bg-purple-600 font-medium text-white shadow-lg shadow-purple-600/40 hover:bg-purple-500">
                  <Link to="/acceso">
                    Entrar a mi Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-xl border-purple-500/30 bg-white/5 text-purple-200 hover:bg-purple-500/20 hover:text-white">
                  <a href="#programas">Ver programas</a>
                </Button>
              </div>

              <dl className="mt-16 grid max-w-xl grid-cols-2 gap-6 sm:grid-cols-4">
                {metricas.map((m) => (
                  <div key={m.label}>
                    <dt className="font-display text-2xl font-light text-purple-300 md:text-3xl">
                      {m.valor}
                    </dt>
                    <dd className="mt-1 text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                      {m.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* BENEFICIOS */}
        <section id="beneficios" className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <SectionTitle
              eyebrow="Por qué INA Fitness"
              titulo="Un sistema integral medido en tiempo real"
            />
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {beneficios.map((b, i) => (
              <Reveal key={b.titulo} delay={i * 110}>
                <article className="surface-card-purple hover-lift h-full p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-purple-500/40 bg-purple-500/20">
                    <b.icon className="h-5 w-5 text-purple-300" />
                  </div>
                  <h3 className="mt-6 text-lg font-medium text-white">{b.titulo}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-purple-200/70">{b.texto}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* METRICS CAROUSEL PREVIEW (Bento Widgets Teaser) */}
        <section className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <SectionTitle
              eyebrow="Herramientas de Medición"
              titulo="Todas las métricas de tu salud en una sola pantalla"
            />
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="surface-card-purple p-6">
              <div className="flex justify-between text-xs text-purple-200">
                <span>Nutrition Overview</span>
                <span className="text-emerald-400 font-bold">70%</span>
              </div>
              <p className="mt-4 font-display text-4xl text-white">637 <span className="text-xs">kcal</span></p>
              <p className="mt-2 text-xs text-purple-300">Proteína 65g · Carbos 45g · Grasas 18g</p>
            </div>

            <div className="surface-card-red p-6">
              <div className="flex justify-between text-xs text-red-200">
                <span>Heart Rate</span>
                <Heart className="h-4 w-4 text-red-400 pulse-heart" />
              </div>
              <p className="mt-4 font-display text-4xl text-white">95 <span className="text-xs">bpm</span></p>
              <p className="mt-2 text-xs text-red-300">Average: 110 bpm</p>
            </div>

            <div className="surface-card-green p-6">
              <div className="flex justify-between text-xs text-emerald-200">
                <span>Step Distance</span>
                <Footprints className="h-4 w-4 text-emerald-400" />
              </div>
              <p className="mt-4 font-display text-4xl text-white">11.98 <span className="text-xs">Km</span></p>
              <p className="mt-2 text-xs text-emerald-300">14,320 pasos hoy</p>
            </div>

            <div className="surface-card-amber p-6">
              <div className="flex justify-between text-xs text-amber-200">
                <span>Body Fat</span>
                <span className="text-amber-300 font-bold">Normal</span>
              </div>
              <p className="mt-4 font-display text-4xl text-white">24.5 <span className="text-xs">%</span></p>
              <p className="mt-2 text-xs text-amber-300">13.6 kg de grasa total</p>
            </div>
          </div>
        </section>

        {/* COACH SECTION */}
        <section className="relative mx-auto max-w-6xl px-6 py-24">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal>
              <div className="relative">
                <div className="absolute -inset-4 rounded-[2rem] bg-linear-to-br from-purple-600/30 via-transparent to-purple-900/20 blur-2xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-purple-500/30">
                  <img
                    src={coach.url}
                    alt="Inna, entrenadora personal de INA Fitness"
                    loading="lazy"
                    width={1666}
                    height={938}
                    className="w-full object-cover transition-all duration-[1200ms] hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#07070a] via-[#07070a]/20 to-transparent" />
                </div>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <SectionTitle eyebrow="Tu entrenadora" titulo="Disciplina que se vuelve estilo de vida" />
              <p className="mt-6 text-sm leading-relaxed text-purple-200/80 md:text-base">
                Cada plan nace de una evaluación real: composición corporal, hábitos, horarios y
                objetivos. Después ajustamos semana a semana con las métricas que tu dashboard registra.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Evaluación corporal, grasa % y cálculo de macros inicial",
                  "Ajustes semanales según tu adherencia y racha de entrenamiento",
                  "Soporte directo por chat y temporizador de técnica",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm text-purple-200">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* PROGRAMAS */}
        <section id="programas" className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <SectionTitle
              eyebrow="Programas"
              titulo="Elige tu camino hacia la mejor versión"
            />
          </Reveal>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {programas.map((p, i) => (
              <Reveal key={p.nombre} delay={i * 130}>
                <article
                  className={`surface-card-purple hover-lift relative flex h-full flex-col p-8 ${
                    p.destacado ? "border-purple-400" : ""
                  }`}
                >
                  {p.destacado && (
                    <span className="absolute -top-3 left-8 rounded-full bg-purple-500 px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-white uppercase shadow-md shadow-purple-500/50">
                      Más elegido
                    </span>
                  )}
                  <p className="text-[11px] tracking-[0.24em] text-purple-300 uppercase">
                    {p.semanas}
                  </p>
                  <h3 className="mt-4 font-display text-2xl leading-tight font-light text-white uppercase">
                    {p.nombre}
                  </h3>
                  <p className="mt-6 font-display text-4xl font-light text-purple-300">
                    {p.precio}
                  </p>
                  <ul className="mt-8 flex-1 space-y-3 text-sm text-purple-200/80">
                    {p.puntos.map((punto) => (
                      <li key={punto} className="flex items-center gap-3">
                        <Flame className="h-3.5 w-3.5 shrink-0 text-purple-400" /> {punto}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="mt-8 rounded-xl bg-purple-600 text-white hover:bg-purple-500">
                    <Link to="/acceso">Comenzar ahora</Link>
                  </Button>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 md:flex-row md:justify-between">
          <Logo />
          <p className="text-xs tracking-[0.18em] text-purple-300/70 uppercase">
            © 2026 INA Fitness — Todos los derechos reservados
          </p>
        </div>
      </footer>
    </div>
  );
}

function SectionTitle({ eyebrow, titulo }: { eyebrow: string; titulo: string }) {
  return (
    <div className="max-w-xl">
      <p className="text-[11px] tracking-[0.3em] text-purple-400 uppercase">{eyebrow}</p>
      <h2 className="mt-4 font-display text-3xl leading-tight font-light text-white uppercase md:text-4xl">
        {titulo}
      </h2>
      <div className="mt-6 h-0.5 w-24 bg-purple-500" />
    </div>
  );
}

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#07070a]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Logo />
        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="#programas"
            className="text-xs tracking-[0.2em] text-purple-200/80 uppercase transition-colors hover:text-purple-300"
          >
            Programas
          </a>
          <a
            href="#beneficios"
            className="text-xs tracking-[0.2em] text-purple-200/80 uppercase transition-colors hover:text-purple-300"
          >
            Beneficios
          </a>
          <Button asChild size="sm" className="rounded-xl bg-purple-600 text-white shadow-md shadow-purple-600/30 hover:bg-purple-500">
            <Link to="/acceso">Acceder al Dashboard</Link>
          </Button>
        </nav>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-purple-300 md:hidden"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-b border-white/10 bg-[#07070a] px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4 text-sm">
            <a href="#programas" onClick={() => setMobileMenuOpen(false)} className="text-purple-200">
              Programas
            </a>
            <a href="#beneficios" onClick={() => setMobileMenuOpen(false)} className="text-purple-200">
              Beneficios
            </a>
            <Button asChild size="sm" className="w-full bg-purple-600 text-white">
              <Link to="/acceso">Acceder al Dashboard</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
