import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Bell,
  Check,
  ChevronRight,
  Flame,
  Heart,
  Moon,
  Pause,
  Play,
  Plus,
  RotateCcw,
  SkipForward,
  Droplets,
  LogOut,
  Footprints,
  Dumbbell,
  Clock,
  Utensils,
  Coffee,
  Apple,
  Sandwich,
  Zap,
  Star,
  TrendingUp,
  Activity,
} from "lucide-react";

import { Logo } from "@/components/ina/Logo";
import { Button } from "@/components/ui/button";
import {
  usuario,
  heartRateData,
  stepDistanceData,
  bodyFatData,
  sleepScoresData,
  nutritionOverviewData,
  waterIntakeData,
  workoutStudioData,
  resumenHoy,
  comidas,
  macros,
} from "@/lib/ina-data";
import { cerrarSesion } from "@/lib/session";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Mi Plan del Día — INA Fitness" },
      {
        name: "description",
        content: "Tu plan personalizado de alimentación y entrenamiento de INA Fitness.",
      },
    ],
  }),
  component: DashboardPage,
});

const mealIcons: Record<string, React.ElementType> = {
  Desayuno: Coffee,
  Snack: Apple,
  Almuerzo: Sandwich,
  "Pre-entreno": Zap,
  Cena: Utensils,
};

const mealColors: Record<string, string> = {
  Desayuno:   "surface-card-amber",
  Snack:      "surface-card-green",
  Almuerzo:   "surface-card-purple",
  "Pre-entreno": "surface-card-orange",
  Cena:       "surface-card-purple",
};

function DashboardPage() {
  const navigate = useNavigate();
  const [water, setWater] = useState(waterIntakeData.liters);
  const [activeTab, setActiveTab] = useState<"plan" | "rutina" | "metricas">("plan");
  const [isPlaying, setIsPlaying] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(6);
  const [workoutIndex, setWorkoutIndex] = useState(3);
  const [completedExercises, setCompletedExercises] = useState<number[]>([0, 1, 2]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying && secondsLeft > 0) {
      interval = setInterval(() => setSecondsLeft((p) => p - 1), 1000);
    } else if (secondsLeft === 0) {
      setIsPlaying(false);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isPlaying, secondsLeft]);

  function handleLogout() {
    cerrarSesion();
    navigate({ to: "/" });
  }

  const waterPct = Math.round((water / waterIntakeData.targetLiters) * 100);
  const calPct = Math.round((resumenHoy.caloriasConsumidas / resumenHoy.caloriasMeta) * 100);
  const today = new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="relative min-h-screen bg-[#07070a] text-foreground">
      {/* Ambient glows */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-35"
        style={{ background: "radial-gradient(55% 50% at 15% 0%, oklch(0.62 0.26 295 / 20%), transparent 65%), radial-gradient(40% 40% at 90% 20%, oklch(0.74 0.24 145 / 12%), transparent 65%)" }} />

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07070a]/85 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-white">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Logo />
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 sm:flex">
              <Flame className="h-3.5 w-3.5 text-orange-400" />
              <span className="text-xs font-semibold text-orange-300">{resumenHoy.racha} días de racha</span>
            </div>
            <div className="flex items-center gap-2 border-l border-white/10 pl-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-600 font-semibold text-white text-sm">
                {usuario.inicial}
              </div>
              <div className="hidden sm:block">
                <p className="text-[11px] text-muted-foreground">Bienvenida</p>
                <p className="text-sm font-medium text-white">{usuario.nombre}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="text-muted-foreground hover:text-red-400 transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-4xl px-5 py-6">

        {/* WELCOME HERO BAR */}
        <div className="mb-6 rounded-3xl border border-purple-500/25 bg-purple-950/30 p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs tracking-[0.2em] text-purple-400 uppercase">Tu plan personalizado</p>
              <h1 className="mt-1 font-display text-2xl font-light text-white capitalize">{today}</h1>
              <p className="mt-1 text-sm text-purple-200/70">{usuario.plan} · {usuario.meta}</p>
            </div>
            <div className="hidden text-right sm:block">
              <p className="text-[11px] text-muted-foreground uppercase tracking-wide">Miembro desde</p>
              <p className="text-sm font-medium text-purple-300">{usuario.desde}</p>
            </div>
          </div>

          {/* Quick stats bar */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-center">
              <p className="text-[11px] text-muted-foreground">Calorías hoy</p>
              <p className="mt-1 font-display text-lg font-light text-white">
                {resumenHoy.caloriasConsumidas}
                <span className="text-xs text-purple-300">/{resumenHoy.caloriasMeta}</span>
              </p>
              <div className="mt-2 h-1 w-full rounded-full bg-white/10">
                <div className="h-full rounded-full bg-purple-500 transition-all" style={{ width: `${calPct}%` }} />
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-center">
              <p className="text-[11px] text-muted-foreground">Agua</p>
              <p className="mt-1 font-display text-lg font-light text-white">
                {water}
                <span className="text-xs text-cyan-300">/{waterIntakeData.targetLiters}L</span>
              </p>
              <div className="mt-2 h-1 w-full rounded-full bg-white/10">
                <div className="h-full rounded-full bg-cyan-400 transition-all" style={{ width: `${waterPct}%` }} />
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-center">
              <p className="text-[11px] text-muted-foreground">Pasos</p>
              <p className="mt-1 font-display text-lg font-light text-white">
                {(resumenHoy.pasos / 1000).toFixed(1)}k
                <span className="text-xs text-emerald-300">/{(resumenHoy.pasosMeta / 1000).toFixed(0)}k</span>
              </p>
              <div className="mt-2 h-1 w-full rounded-full bg-white/10">
                <div className="h-full rounded-full bg-emerald-400 transition-all"
                  style={{ width: `${Math.round((resumenHoy.pasos / resumenHoy.pasosMeta) * 100)}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="mb-6 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5">
          {[
            { id: "plan", label: "🥗 Plan de Comidas" },
            { id: "rutina", label: "💪 Mi Rutina" },
            { id: "metricas", label: "📊 Métricas" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex-1 rounded-xl py-2.5 text-xs font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ==================== PLAN DE COMIDAS ==================== */}
        {activeTab === "plan" && (
          <div className="space-y-5">
            {/* Macro summary */}
            <div className="rounded-3xl border border-purple-500/25 bg-purple-950/25 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white">Macros del día</p>
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] font-semibold text-emerald-300">
                  {nutritionOverviewData.adherencePct}% adherencia
                </span>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-3">
                {macros.map((m) => (
                  <div key={m.label} className="text-center">
                    <p className="text-[11px] text-muted-foreground">{m.label}</p>
                    <p className="mt-1 font-display text-lg font-light text-white">{m.value}<span className="text-[10px] text-purple-300">{m.unit}</span></p>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-purple-400 transition-all"
                        style={{ width: `${Math.round((m.value / m.goal) * 100)}%` }} />
                    </div>
                    <p className="mt-1 text-[10px] text-muted-foreground">meta: {m.goal}{m.unit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Agua interactivo */}
            <div className="flex items-center justify-between rounded-3xl border border-cyan-500/25 bg-cyan-950/20 px-5 py-4">
              <div className="flex items-center gap-3">
                <Droplets className="h-5 w-5 text-cyan-400" />
                <div>
                  <p className="text-sm font-medium text-white">Agua del día</p>
                  <p className="text-xs text-cyan-300/80">{water} L de {waterIntakeData.targetLiters} L ({waterPct}%)</p>
                </div>
              </div>
              <button
                onClick={() => setWater((p) => Math.min(+(p + 0.25).toFixed(2), waterIntakeData.targetLiters))}
                className="flex items-center gap-1.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 px-3 py-2 text-xs font-medium text-cyan-200 hover:bg-cyan-500/35 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" /> +250 ml
              </button>
            </div>

            {/* Comidas del día */}
            <div>
              <p className="mb-3 text-xs tracking-[0.2em] text-purple-400 uppercase">Comidas de hoy</p>
              <div className="space-y-3">
                {comidas.map((comida) => {
                  const Icon = mealIcons[comida.momento] || Utensils;
                  return (
                    <div key={comida.momento}
                      className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all hover:border-purple-500/30 hover:bg-purple-950/20">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/15">
                            <Icon className="h-4.5 w-4.5 text-purple-300" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-white">{comida.momento}</p>
                              <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {comida.hora}
                              </div>
                            </div>
                            <p className="mt-0.5 text-xs text-purple-300 font-medium">{comida.kcal} kcal</p>
                          </div>
                        </div>
                        <div className="hidden text-right sm:flex gap-4">
                          <div className="text-center">
                            <p className="text-[10px] text-muted-foreground">Prot</p>
                            <p className="text-xs font-semibold text-white">{comida.p}g</p>
                          </div>
                          <div className="text-center">
                            <p className="text-[10px] text-muted-foreground">Carbs</p>
                            <p className="text-xs font-semibold text-white">{comida.c}g</p>
                          </div>
                          <div className="text-center">
                            <p className="text-[10px] text-muted-foreground">Grasas</p>
                            <p className="text-xs font-semibold text-white">{comida.g}g</p>
                          </div>
                        </div>
                      </div>
                      <ul className="mt-3 space-y-1.5">
                        {comida.items.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm text-purple-200/80">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ==================== MI RUTINA ==================== */}
        {activeTab === "rutina" && (
          <div className="space-y-5">
            {/* Workout header */}
            <div className="rounded-3xl border border-purple-500/30 bg-purple-950/30 p-6 backdrop-blur-xl">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] tracking-[0.2em] text-purple-400 uppercase">Rutina de hoy</p>
                  <h2 className="mt-2 font-display text-2xl font-light text-white">{workoutStudioData.mainBlockMin} min</h2>
                  <p className="mt-1 text-sm text-purple-200/80">Glúteo & Pierna — Bloque de Fuerza</p>
                </div>
                <div className="text-right">
                  <span className="rounded-full bg-purple-500/20 border border-purple-500/40 px-3 py-1 text-xs text-purple-300">Intermedio</span>
                  <p className="mt-2 text-sm font-medium text-orange-400">
                    <Flame className="inline h-3.5 w-3.5" /> 468 kcal
                  </p>
                </div>
              </div>

              {/* Live Timer */}
              <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-950/30 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-red-300 uppercase tracking-wide">Ejercicio activo</p>
                    <p className="mt-1 font-medium text-white">
                      {workoutStudioData.exercisesList[workoutIndex]?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{workoutStudioData.exercisesList[workoutIndex]?.detail}</p>
                  </div>
                  <div className="text-center">
                    <p className="font-display text-4xl font-light text-white tabular-nums">
                      00:{String(secondsLeft).padStart(2, "0")}
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() => setSecondsLeft(workoutStudioData.exercisesList[workoutIndex]?.durationSec || 45)}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/10"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-lg hover:scale-105 transition-transform"
                      >
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
                      </button>
                      <button
                        onClick={() => {
                          const next = (workoutIndex + 1) % workoutStudioData.exercisesList.length;
                          setWorkoutIndex(next);
                          setSecondsLeft(workoutStudioData.exercisesList[next].durationSec);
                          setIsPlaying(false);
                        }}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/10"
                      >
                        <SkipForward className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Exercise list */}
            <div>
              <p className="mb-3 text-xs tracking-[0.2em] text-purple-400 uppercase">Ejercicios</p>
              <div className="space-y-3">
                {workoutStudioData.exercisesList.map((ex, idx) => {
                  const done = completedExercises.includes(idx);
                  const active = idx === workoutIndex;
                  return (
                    <div
                      key={ex.id}
                      onClick={() => {
                        setWorkoutIndex(idx);
                        setSecondsLeft(ex.durationSec);
                        setIsPlaying(false);
                      }}
                      className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all ${
                        active
                          ? "border-purple-500/60 bg-purple-500/10 shadow-lg shadow-purple-500/15"
                          : done
                          ? "border-emerald-500/30 bg-emerald-950/20"
                          : "border-white/8 bg-white/[0.02] hover:border-purple-500/30 hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display text-sm font-semibold ${
                          done ? "bg-emerald-500/20 text-emerald-400" : active ? "bg-purple-500/25 text-purple-300" : "bg-white/5 text-muted-foreground"
                        }`}>
                          {done ? <Check className="h-4 w-4" /> : idx + 1}
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${done ? "text-emerald-300" : "text-white"}`}>{ex.name}</p>
                          <p className="text-xs text-muted-foreground">{ex.detail}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {active && <span className="rounded-full bg-purple-500/20 px-2.5 py-1 text-[10px] text-purple-300">Activo</span>}
                        {done && <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-[10px] text-emerald-300">✓ Listo</span>}
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  setCompletedExercises([...completedExercises, workoutIndex]);
                  const next = (workoutIndex + 1) % workoutStudioData.exercisesList.length;
                  setWorkoutIndex(next);
                  setSecondsLeft(workoutStudioData.exercisesList[next].durationSec);
                  setIsPlaying(false);
                }}
                className="mt-4 w-full rounded-2xl bg-purple-600 py-4 text-sm font-semibold text-white shadow-lg shadow-purple-600/30 hover:bg-purple-500 transition-colors"
              >
                ✅ Marcar como completado y continuar
              </button>
            </div>
          </div>
        )}

        {/* ==================== MÉTRICAS ==================== */}
        {activeTab === "metricas" && (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Heart Rate */}
              <div className="rounded-3xl border border-red-500/30 bg-red-950/25 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-red-200 uppercase tracking-wide">Ritmo Cardíaco</p>
                  <Heart className="h-4 w-4 text-red-400" />
                </div>
                <p className="mt-3 font-display text-5xl font-light text-white">{heartRateData.currentBpm}<span className="text-sm text-red-300 ml-1">bpm</span></p>
                <p className="mt-2 text-xs text-red-300/70">Promedio: {heartRateData.averageBpm} bpm</p>
                <div className="mt-4 flex items-end justify-between gap-1 h-10">
                  {heartRateData.waveHeights.map((h, i) => (
                    <div key={i} className="flex-1 rounded-sm bg-red-400/70" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>

              {/* Sleep */}
              <div className="rounded-3xl border border-emerald-500/25 bg-emerald-950/20 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-emerald-200 uppercase tracking-wide">Calidad de Sueño</p>
                  <Moon className="h-4 w-4 text-emerald-400" />
                </div>
                <p className="mt-3 font-display text-5xl font-light text-white">{sleepScoresData.totalPct}<span className="text-sm text-emerald-300 ml-1">%</span></p>
                <p className="mt-2 text-xs text-emerald-300/70">{sleepScoresData.hoursTotal} hrs totales</p>
                <div className="mt-4 flex h-3 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="bg-emerald-700" style={{ width: `${sleepScoresData.lightPct}%` }} />
                  <div className="bg-emerald-400" style={{ width: `${sleepScoresData.remPct}%` }} />
                  <div className="bg-teal-300" style={{ width: `${sleepScoresData.deepPct}%` }} />
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-emerald-300/60">
                  <span>Ligero</span><span>REM</span><span>Profundo</span>
                </div>
              </div>

              {/* Steps */}
              <div className="rounded-3xl border border-emerald-500/20 bg-emerald-950/15 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-emerald-200 uppercase tracking-wide">Pasos hoy</p>
                  <Footprints className="h-4 w-4 text-emerald-400" />
                </div>
                <p className="mt-3 font-display text-5xl font-light text-white">{stepDistanceData.distanceKm}<span className="text-sm text-emerald-300 ml-1">km</span></p>
                <p className="mt-2 text-xs text-emerald-300/70">{resumenHoy.pasos.toLocaleString()} de {resumenHoy.pasosMeta.toLocaleString()} pasos</p>
                <div className="mt-4 h-2 w-full rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-emerald-400" style={{ width: `${stepDistanceData.percentage}%` }} />
                </div>
              </div>

              {/* Body fat */}
              <div className="rounded-3xl border border-amber-500/25 bg-amber-950/20 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-amber-200 uppercase tracking-wide">Grasa Corporal</p>
                  <TrendingUp className="h-4 w-4 text-amber-400" />
                </div>
                <p className="mt-3 font-display text-5xl font-light text-white">{bodyFatData.percentage}<span className="text-sm text-amber-300 ml-1">%</span></p>
                <p className="mt-2 text-xs text-amber-300/70">{bodyFatData.fatKg} kg — {bodyFatData.status}</p>
                <div className="mt-4 h-2 w-full rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-amber-400" style={{ width: `${bodyFatData.percentage}%` }} />
                </div>
              </div>
            </div>

            {/* Racha semanal */}
            <div className="rounded-3xl border border-purple-500/25 bg-purple-950/20 p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-white">Racha semanal</p>
                <span className="flex items-center gap-1 text-orange-400 font-semibold text-sm">
                  <Flame className="h-4 w-4" /> {resumenHoy.racha} días
                </span>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {["L","M","M","J","V","S","D"].map((d, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-xs font-medium ${
                      i < 5 ? "bg-purple-600 text-white" : "bg-white/5 text-muted-foreground"
                    }`}>
                      {i < 5 ? <Check className="h-4 w-4" /> : d}
                    </div>
                    <span className="text-[10px] text-muted-foreground">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
