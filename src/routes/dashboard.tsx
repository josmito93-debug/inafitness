import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Bell,
  Check,
  Flame,
  Heart,
  Moon,
  Pause,
  Play,
  Plus,
  RotateCcw,
  SkipForward,
  Sparkles,
  Droplets,
  Calendar as CalendarIcon,
  LogOut,
  Footprints,
  Dumbbell,
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
  glucoseData,
  caloriesBurnData,
  waterIntakeData,
  hikingWidgetData,
  neonGraphData,
  workoutStudioData,
} from "@/lib/ina-data";
import { cerrarSesion } from "@/lib/session";


export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard de Métricas — INA Fitness" },
      {
        name: "description",
        content:
          "Panel de control en modo Pitch Black y Purple con medición de ritmo cardíaco, macros, pasos, agua, sueño y temporizador de entrenamiento.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const navigate = useNavigate();

  // Dynamic States for Interactive Widgets
  const [water, setWater] = useState(waterIntakeData.liters);
  const [isPlaying, setIsPlaying] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(6);
  const [workoutIndex, setWorkoutIndex] = useState(3); // Reverse Lunge index
  const [activeTab, setActiveTab] = useState<"bento" | "workout" | "neon">("bento");

  // Timer Effect for Active Workout Widget
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsPlaying(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, secondsLeft]);

  function addWater() {
    setWater((prev) => Math.min(+(prev + 0.25).toFixed(2), waterIntakeData.targetLiters));
  }

  function handleLogout() {
    cerrarSesion();
    navigate({ to: "/" });
  }

  const waterPct = Math.round((water / waterIntakeData.targetLiters) * 100);

  return (
    <div className="relative min-h-screen bg-[#07070a] text-foreground selection:bg-purple-600 selection:text-white">
      {/* Ambient Radial Background Glows */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-40"
        style={{
          background:
            "radial-gradient(55% 45% at 20% 0%, oklch(0.62 0.26 295 / 22%), transparent 70%), radial-gradient(45% 40% at 85% 30%, oklch(0.74 0.24 145 / 15%), transparent 70%), radial-gradient(50% 50% at 50% 90%, oklch(0.65 0.22 40 / 12%), transparent 70%)",
        }}
      />

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07070a]/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              <Logo />
            </Link>
          </div>

          {/* User Profile Bar */}
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1.5 text-xs text-purple-300 sm:flex">
              <Flame className="h-4 w-4 text-orange-400 animate-pulse" />
              <span className="font-semibold text-white">Racha: {workoutStudioData.streakWeeks} semanas</span>
            </div>

            <button
              aria-label="Notificaciones"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-purple-500" />
            </button>

            <div className="flex items-center gap-3 border-l border-white/10 pl-4">
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-purple-400/40 bg-purple-950 font-display font-semibold text-purple-200">
                  {usuario.inicial}
                </div>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#07070a] bg-emerald-500" />
              </div>
              <div className="hidden text-left sm:block">
                <p className="text-xs text-muted-foreground">Welcome back</p>
                <p className="text-sm font-medium text-white">{usuario.nombre}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-muted-foreground hover:text-destructive"
                title="Cerrar sesión"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN DASHBOARD CONTENT */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.25em] text-purple-400 uppercase">
              <Sparkles className="h-3.5 w-3.5" /> Dashboard & Metrics
            </span>
            <h1 className="mt-1 font-display text-3xl font-light text-white uppercase md:text-4xl">
              Medición en Tiempo Real
            </h1>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5">
            <button
              onClick={() => setActiveTab("bento")}
              className={`rounded-xl px-4 py-2 text-xs font-medium transition-all ${
                activeTab === "bento"
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              Métricas Bento Grid
            </button>
            <button
              onClick={() => setActiveTab("workout")}
              className={`rounded-xl px-4 py-2 text-xs font-medium transition-all ${
                activeTab === "workout"
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              Workout Studio Live
            </button>
          </div>
        </div>

        {activeTab === "bento" ? (
          /* ================= BENTO GRID SECTION (Inspirado en Referencias 1, 2, 3, 4) ================= */
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* 1. NUTRITION OVERVIEW CARD (Purple Ambient Glow - Reference 2 & 3) */}
            <div className="surface-card-purple col-span-1 flex flex-col justify-between p-7 lg:col-span-2">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium tracking-wide text-purple-200 uppercase">
                    Nutrition Overview
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
                      {nutritionOverviewData.status}
                    </span>
                    <button className="text-purple-300 hover:text-white">
                      <Bell className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-6xl font-light text-white">
                    {nutritionOverviewData.adherencePct}
                  </span>
                  <span className="text-2xl font-light text-purple-300">%</span>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
                <div>
                  <p className="text-[11px] text-purple-300/80">Calories</p>
                  <p className="mt-1 font-display text-xl font-medium text-white">
                    {nutritionOverviewData.caloriesCurrent}{" "}
                    <span className="text-xs font-normal text-muted-foreground">kcal</span>
                  </p>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-purple-400" style={{ width: "45%" }} />
                  </div>
                </div>

                <div>
                  <p className="text-[11px] text-purple-300/80">Protein</p>
                  <p className="mt-1 font-display text-xl font-medium text-white">
                    {nutritionOverviewData.proteinGrams}{" "}
                    <span className="text-xs font-normal text-muted-foreground">g</span>
                  </p>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-purple-300" style={{ width: "65%" }} />
                  </div>
                </div>

                <div>
                  <p className="text-[11px] text-purple-300/80">Carbs</p>
                  <p className="mt-1 font-display text-xl font-medium text-white">
                    {nutritionOverviewData.carbsGrams}{" "}
                    <span className="text-xs font-normal text-muted-foreground">g</span>
                  </p>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-indigo-400" style={{ width: "35%" }} />
                  </div>
                </div>

                <div>
                  <p className="text-[11px] text-purple-300/80">Fats</p>
                  <p className="mt-1 font-display text-xl font-medium text-white">
                    {nutritionOverviewData.fatsGrams}{" "}
                    <span className="text-xs font-normal text-muted-foreground">g</span>
                  </p>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-violet-400" style={{ width: "28%" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. GLUCOSE WIDGET (Purple Square Card - Reference 2 & 3) */}
            <div className="surface-card-purple flex flex-col justify-between p-7">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-purple-200 uppercase">Glucose</span>
                <Droplets className="h-4 w-4 text-purple-400" />
              </div>
              <div className="mt-6">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-5xl font-light text-white">
                    {glucoseData.valueMgDl}
                  </span>
                  <span className="text-xs text-purple-300">mg/dL</span>
                </div>
                <p className="mt-3 text-xs text-purple-300/70">Target: {glucoseData.targetRange}</p>
              </div>
            </div>

            {/* 3. CALORIES BURN WIDGET (Warm Orange/Red Glow Card - Reference 2 & 3) */}
            <div className="surface-card-orange flex flex-col justify-between p-7">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-orange-200 uppercase">Calories Burn</span>
                <Flame className="h-4 w-4 text-orange-400" />
              </div>
              <div className="mt-6">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-5xl font-light text-white">
                    {caloriesBurnData.percentage}
                  </span>
                  <span className="text-2xl font-light text-orange-300">%</span>
                </div>
                <p className="mt-3 text-xs text-orange-200/70">
                  Target: {caloriesBurnData.targetKcal} Kcal
                </p>
              </div>
            </div>

            {/* 4. HEART RATE WIDGET (Crimson Red Glow Card - Reference 1) */}
            <div className="surface-card-red flex flex-col justify-between p-7">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-red-200 uppercase">Heart Rate</span>
                  <Heart className="h-4 w-4 text-red-400 pulse-heart" />
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-light text-white">
                    {heartRateData.currentBpm}
                  </span>
                  <span className="text-xs text-red-300">bpm</span>
                </div>
              </div>

              {/* Heartbeat Animated Graphic */}
              <div className="my-4 flex items-center justify-center gap-1.5 h-12">
                {heartRateData.waveHeights.map((h, idx) => (
                  <div
                    key={idx}
                    className="w-1.5 rounded-full bg-red-400/80 transition-all duration-300"
                    style={{
                      height: `${h}%`,
                      animation: `pulse-glow 1.${(idx % 5) + 2}s infinite alternate`,
                    }}
                  />
                ))}
              </div>

              <p className="text-xs text-red-300/70">Average : {heartRateData.averageBpm} bpm</p>
            </div>

            {/* 5. STEP DISTANCE WIDGET (Emerald Green Glow - Reference 1) */}
            <div className="surface-card-green flex flex-col justify-between p-7">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-emerald-200 uppercase">Step distance</span>
                  <Footprints className="h-4 w-4 text-emerald-400" />
                </div>
                <p className="mt-1 text-[11px] text-emerald-300/70">Today</p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-light text-white">
                    {stepDistanceData.distanceKm}
                  </span>
                  <span className="text-xs text-emerald-300">Km</span>
                </div>
              </div>

              {/* Rounded Green Track Bar */}
              <div className="mt-6">
                <div className="relative h-14 w-full rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-2">
                  <div
                    className="h-full rounded-xl bg-emerald-400 transition-all duration-700"
                    style={{ width: `${stepDistanceData.percentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* 6. BODY FAT WIDGET (Amber Gradient - Reference 1) */}
            <div className="surface-card-amber col-span-1 flex flex-col justify-between p-7 lg:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-amber-200 uppercase">Body Fat</span>
                  <p className="text-[11px] text-amber-300/70">Percentage from total weight</p>
                </div>
                <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs text-amber-300">
                  {bodyFatData.status}
                </span>
              </div>

              <div className="mt-6 flex items-baseline justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-5xl font-light text-white">
                    {bodyFatData.percentage}
                  </span>
                  <span className="text-xl text-amber-300">%</span>
                </div>
                <span className="text-sm font-medium text-amber-200/80">{bodyFatData.fatKg} kg</span>
              </div>

              {/* Progress Slider */}
              <div className="mt-6 h-3 w-full rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-linear-to-r from-amber-500 to-orange-400"
                  style={{ width: `${bodyFatData.percentage}%` }}
                />
              </div>
            </div>

            {/* 7. SLEEP SCORES WIDGET (Deep Green Glow Card - Reference 1) */}
            <div className="surface-card-green col-span-1 flex flex-col justify-between p-7 lg:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-emerald-200 uppercase">Sleep Scores</span>
                  <p className="text-[11px] text-emerald-300/70">{sleepScoresData.hoursTotal} hrs total</p>
                </div>
                <Moon className="h-4 w-4 text-emerald-400" />
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-5xl font-light text-white">
                  {sleepScoresData.totalPct}
                </span>
                <span className="text-xl text-emerald-300">%</span>
              </div>

              {/* Segmented Sleep Bar */}
              <div className="mt-6">
                <div className="flex h-3 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="bg-emerald-600"
                    style={{ width: `${sleepScoresData.lightPct}%` }}
                    title="Light"
                  />
                  <div
                    className="bg-emerald-400"
                    style={{ width: `${sleepScoresData.remPct}%` }}
                    title="REM"
                  />
                  <div
                    className="bg-teal-300"
                    style={{ width: `${sleepScoresData.deepPct}%` }}
                    title="Deep"
                  />
                </div>
                <div className="mt-3 flex justify-between text-[11px] text-emerald-200/70">
                  <span>Light (25%)</span>
                  <span>REM (30%)</span>
                  <span>Deep (45%)</span>
                </div>
              </div>
            </div>

            {/* 8. WATER INTAKE WIDGET (Interactive - Reference 2) */}
            <div className="surface-card-purple flex flex-col justify-between p-7">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-purple-200 uppercase">Water Intake</span>
                <Droplets className="h-4 w-4 text-cyan-400" />
              </div>

              <div className="mt-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-5xl font-light text-white">{water}</span>
                  <span className="text-sm text-purple-300">Litters</span>
                </div>
                <p className="mt-2 text-xs text-purple-300/70">
                  Target : {waterIntakeData.targetLiters} Litters ({waterPct}%)
                </p>
              </div>

              <Button
                onClick={addWater}
                variant="outline"
                size="sm"
                className="mt-6 border-purple-500/40 bg-purple-500/20 text-xs text-purple-200 hover:bg-purple-500/40 hover:text-white"
              >
                <Plus className="mr-1 h-3.5 w-3.5" /> Agregar +250 ml
              </Button>
            </div>

            {/* 9. HIKING WIDGET (Reference 1) */}
            <div className="surface-card-purple flex flex-col justify-between p-7">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-purple-200 uppercase">Hiking</span>
                <Dumbbell className="h-4 w-4 text-purple-400" />
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs text-purple-300/70">{hikingWidgetData.bpm} bpm</p>
                <p className="font-display text-4xl font-light text-white">
                  {hikingWidgetData.distanceMeters}
                  <span className="text-lg">M</span>
                </p>
                <p className="text-xs text-purple-300/70">{hikingWidgetData.cadence} cadence</p>
              </div>

              <Button size="sm" className="mt-4 w-full rounded-xl bg-white font-medium text-black hover:bg-white/90">
                Start
              </Button>
            </div>

            {/* 10. NEON GLOW CONVERSION GRAPH (Reference 4) */}
            <div className="surface-card-green col-span-1 flex flex-col justify-between p-7 lg:col-span-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-emerald-300">{neonGraphData.updatedText}</span>
                  <h3 className="text-lg font-medium text-white">Performance Evolution</h3>
                </div>
                <span className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                  Monthly ▾
                </span>
              </div>

              <div className="my-6 grid items-center gap-8 lg:grid-cols-3">
                <div>
                  <p className="text-xs text-emerald-300/80">Conversion rate</p>
                  <p className="font-display text-6xl font-light text-white">
                    {neonGraphData.conversionRate}
                  </p>
                  <p className="mt-2 text-xs text-emerald-300">{neonGraphData.subtitle}</p>
                </div>

                {/* Neon Glowing Line SVG */}
                <div className="col-span-2 relative h-40 w-full overflow-hidden">
                  <svg className="h-full w-full" viewBox="0 0 500 150">
                    <defs>
                      <linearGradient id="neonGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 10,100 Q 100,120 180,90 T 300,20 T 420,110 T 490,70 L 490,150 L 10,150 Z"
                      fill="url(#neonGradient)"
                    />
                    <path
                      d="M 10,100 Q 100,120 180,90 T 300,20 T 420,110 T 490,70"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="4"
                      style={{ filter: "drop-shadow(0 0 10px #10b981)" }}
                    />
                    <circle cx="300" cy="20" r="7" fill="#10b981" style={{ filter: "drop-shadow(0 0 12px #ffffff)" }} />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ================= WORKOUT STUDIO LIVE SECTION (Inspirado en Referencia 5) ================= */
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left: Routine Exercises List */}
            <div className="surface-card flex flex-col p-7">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-medium text-white">Main Block</h3>
                  <p className="text-xs text-muted-foreground">
                    {workoutStudioData.mainBlockMin} min total
                  </p>
                </div>
                <div className="h-6 w-11 rounded-full bg-purple-600 p-1">
                  <div className="h-4 w-4 rounded-full bg-white transition-transform transform translate-x-5" />
                </div>
              </div>

              <div className="mt-6 flex-1 space-y-4">
                {workoutStudioData.exercisesList.map((ex, idx) => (
                  <div
                    key={ex.id}
                    onClick={() => {
                      setWorkoutIndex(idx);
                      setSecondsLeft(ex.durationSec);
                    }}
                    className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all ${
                      idx === workoutIndex
                        ? "border-purple-500/60 bg-purple-500/10 shadow-lg shadow-purple-500/20"
                        : "border-white/5 bg-white/[0.02] hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-950 font-display text-sm font-semibold text-purple-300">
                        {ex.completed ? <Check className="h-4 w-4 text-emerald-400" /> : idx + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{ex.name}</p>
                        <p className="text-xs text-muted-foreground">{ex.detail}</p>
                      </div>
                    </div>
                    {idx === workoutIndex && (
                      <span className="rounded-full bg-purple-500/20 px-2.5 py-1 text-[10px] text-purple-300">
                        En curso
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Center: Live Timer & Control Widget */}
            <div className="surface-card-red flex flex-col justify-between p-7 text-center">
              <div className="flex items-center justify-between text-xs text-red-200">
                <span>{workoutStudioData.activeSet} Set</span>
                <span>{workoutStudioData.timeRemaining} left</span>
              </div>

              <div className="my-8 flex flex-col items-center">
                {/* Circular Countdown Ring */}
                <div className="relative flex h-52 w-52 items-center justify-center rounded-full border-4 border-red-500/30 bg-red-950/30 shadow-2xl shadow-red-500/20">
                  <div className="text-center">
                    <p className="text-xs text-red-300 uppercase">
                      {workoutStudioData.exercisesList[workoutIndex]?.name || "Exercise"}
                    </p>
                    <p className="font-display text-5xl font-light text-white">
                      00:0{secondsLeft}
                    </p>
                  </div>
                </div>
              </div>

              {/* Player Controls */}
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={() => setSecondsLeft(45)}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10"
                >
                  <RotateCcw className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-xl hover:scale-105 transition-transform"
                >
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="ml-1 h-6 w-6" />}
                </button>
                <button
                  onClick={() => {
                    const next = (workoutIndex + 1) % workoutStudioData.exercisesList.length;
                    setWorkoutIndex(next);
                    setSecondsLeft(workoutStudioData.exercisesList[next].durationSec);
                  }}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10"
                >
                  <SkipForward className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Right: Streak & April Calendar Tracker */}
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="surface-card p-6">
                  <p className="text-2xl font-light text-white">
                    {workoutStudioData.workoutsCompleted}
                  </p>
                  <p className="text-xs text-muted-foreground">Workouts completed</p>
                </div>
                <div className="surface-card p-6">
                  <p className="text-2xl font-light text-white">
                    {workoutStudioData.totalMinutesThisMonth}
                  </p>
                  <p className="text-xs text-muted-foreground">Total minutes</p>
                </div>
              </div>

              {/* Calendar Widget */}
              <div className="surface-card flex-1 p-6">
                <div className="flex items-center justify-between pb-4">
                  <span className="text-sm font-medium text-white">
                    {workoutStudioData.monthName}
                  </span>
                  <CalendarIcon className="h-4 w-4 text-purple-400" />
                </div>
                <div className="mt-4 grid grid-cols-7 gap-2 text-center text-xs">
                  {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                    <span key={i} className="text-muted-foreground">
                      {d}
                    </span>
                  ))}
                  {workoutStudioData.calendarDays.map((c, i) => (
                    <div
                      key={i}
                      className={`flex h-8 items-center justify-center rounded-full text-[11px] ${
                        c.type === "burn"
                          ? "bg-orange-500 text-white font-bold"
                          : c.type === "power"
                            ? "bg-purple-600 text-white font-bold"
                            : c.isCurrent
                              ? "text-white"
                              : "text-muted-foreground/40"
                      }`}
                    >
                      {c.day}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
