import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
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
  TrendingUp,
  Activity,
  Sparkles,
  ExternalLink,
  X,
  Info,
  PlayCircle,
  Search,
  Volume2,
  VolumeX,
  Timer,
  Grid,
  ListFilter,
  MessageSquare,
  Send,
  Sliders,
} from "lucide-react";

import { Logo } from "@/components/ina/Logo";
import { AmbientBackground } from "@/components/ina/GsapCanvas";
import { AnimatedCounter } from "@/components/ina/AnimatedCounter";
import { FloatingDock } from "@/components/ina/FloatingDock";
import { ExerciseGifPlayer } from "@/components/ina/ExerciseGifPlayer";
import { BlueprintCard } from "@/components/ina/BlueprintCard";
import {
  popularExercisesDB,
  fetchFullExerciseDB,
  ExerciseDBItem,
  getExerciseImageUrl,
} from "@/lib/exercisedb";
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
  Exercise,
} from "@/lib/ina-data";
import { cerrarSesion } from "@/lib/session";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — INA Fitness OS" },
      {
        name: "description",
        content: "Tu centro de control biométrico de alimentación y entrenamiento de INA Fitness.",
      },
    ],
  }),
  component: DashboardPage,
});

const mealIcons: Record<string, React.ElementType> = {
  "Desayuno Gourmet": Coffee,
  "Snack Acelerador": Apple,
  "Almuerzo Principal": Sandwich,
  "Pre-entreno Energético": Zap,
  "Cena Reparadora": Utensils,
};

const categoryLabels: Record<string, { label: string; icon: string }> = {
  all: { label: "Todos", icon: "🔥" },
  gluteos: { label: "Glúteos & Pierna", icon: "🍑" },
  core: { label: "Core & Abs", icon: "⚡" },
  superior: { label: "Tren Superior", icon: "💪" },
  hiit: { label: "Cardio & HIIT", icon: "🏃‍♀️" },
};

function DashboardPage() {
  const navigate = useNavigate();
  const [water, setWater] = useState(waterIntakeData.liters);
  const [activeTab, setActiveTab] = useState<"rutina" | "plan" | "metricas" | "coach">("rutina");

  // Exercise & Workout states
  const [exerciseViewMode, setExerciseViewMode] = useState<"player" | "grid" | "list">("player");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [workoutIndex, setWorkoutIndex] = useState(1); // Bulgarian Lunge
  const [isPlaying, setIsPlaying] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(45);
  const [restSecondsLeft, setRestSecondsLeft] = useState(30);
  const [completedSets, setCompletedSets] = useState<Record<number, number[]>>({
    1: [0, 1, 2, 3],
    2: [0, 1],
    3: [0, 1, 2],
  });
  const [completedExercises, setCompletedExercises] = useState<number[]>([1, 3]);
  const [completedMeals, setCompletedMeals] = useState<string[]>([
    "Desayuno Gourmet",
    "Snack Acelerador",
  ]);
  const [selectedExerciseModal, setSelectedExerciseModal] = useState<Exercise | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // ExerciseDB Explorer state
  const [isDbExplorerOpen, setIsDbExplorerOpen] = useState(false);
  const [dbSearchQuery, setDbSearchQuery] = useState("");
  const [dbExercisesList, setDbExercisesList] = useState<ExerciseDBItem[]>(popularExercisesDB);
  const [loadingDb, setLoadingDb] = useState(false);

  // Set log state in modal
  const [modalLoggedWeight, setModalLoggedWeight] = useState("15");
  const [modalLoggedReps, setModalLoggedReps] = useState("12");
  const [modalSavedNotification, setModalSavedNotification] = useState(false);

  // Coach message state
  const [coachMsgInput, setCoachMsgInput] = useState("");
  const [coachMessages, setCoachMessages] = useState([
    {
      id: 1,
      sender: "coach",
      text: "¡Excelente inicio de semana Mike! Mantén el torso inclinado a 15° en las zancadas para activar el glúteo mayor al máximo.",
      time: "08:30",
    },
  ]);

  const tabContainerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDbExplorerOpen && dbExercisesList.length <= popularExercisesDB.length) {
      setLoadingDb(true);
      fetchFullExerciseDB()
        .then((data) => setDbExercisesList(data))
        .finally(() => setLoadingDb(false));
    }
  }, [isDbExplorerOpen, dbExercisesList.length]);

  // Active workout timer tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      if (isResting) {
        if (restSecondsLeft > 0) {
          interval = setInterval(() => setRestSecondsLeft((p) => p - 1), 1000);
        } else {
          setIsResting(false);
          setRestSecondsLeft(30);
          const currentEx = workoutStudioData.exercisesList[workoutIndex];
          setSecondsLeft(currentEx?.durationSec || 45);
        }
      } else {
        if (secondsLeft > 0) {
          interval = setInterval(() => setSecondsLeft((p) => p - 1), 1000);
        } else {
          setIsResting(true);
          setRestSecondsLeft(workoutStudioData.exercisesList[workoutIndex]?.restSec || 30);
        }
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, isResting, secondsLeft, restSecondsLeft, workoutIndex]);

  // GSAP transition when switching tabs
  useEffect(() => {
    if (tabContainerRef.current) {
      gsap.fromTo(
        tabContainerRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
      );
    }
  }, [activeTab]);

  function handleLogout() {
    cerrarSesion();
    navigate({ to: "/" });
  }

  function toggleMeal(momento: string) {
    if (completedMeals.includes(momento)) {
      setCompletedMeals(completedMeals.filter((m) => m !== momento));
    } else {
      setCompletedMeals([...completedMeals, momento]);
    }
  }

  function handleToggleSet(exId: number, setIdx: number) {
    const current = completedSets[exId] || [];
    if (current.includes(setIdx)) {
      setCompletedSets({
        ...completedSets,
        [exId]: current.filter((s) => s !== setIdx),
      });
    } else {
      const updated = [...current, setIdx];
      setCompletedSets({
        ...completedSets,
        [exId]: updated,
      });
      const ex = workoutStudioData.exercisesList.find((e) => e.id === exId);
      if (ex && updated.length >= ex.sets) {
        if (!completedExercises.includes(exId)) {
          setCompletedExercises([...completedExercises, exId]);
        }
      }
    }
  }

  function handleSelectExercise(idx: number) {
    setWorkoutIndex(idx);
    const ex = workoutStudioData.exercisesList[idx];
    if (ex) {
      setSecondsLeft(ex.durationSec);
      setIsResting(false);
      setRestSecondsLeft(ex.restSec);
      setIsPlaying(false);
    }
  }

  function handleSaveModalLog() {
    setModalSavedNotification(true);
    setTimeout(() => setModalSavedNotification(false), 3000);
  }

  function handleSendCoachMsg(e: React.FormEvent) {
    e.preventDefault();
    if (!coachMsgInput.trim()) return;
    setCoachMessages([
      ...coachMessages,
      {
        id: Date.now(),
        sender: "user",
        text: coachMsgInput,
        time: "Ahora",
      },
    ]);
    setCoachMsgInput("");
    setTimeout(() => {
      setCoachMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "coach",
          text: "¡Anotado! Seguimos con la sobrecarga progresiva firme.",
          time: "Justo ahora",
        },
      ]);
    }, 1200);
  }

  const activeExercise =
    workoutStudioData.exercisesList[workoutIndex] || workoutStudioData.exercisesList[0];
  const nextExercise =
    workoutStudioData.exercisesList[(workoutIndex + 1) % workoutStudioData.exercisesList.length];

  const filteredExercises = workoutStudioData.exercisesList.filter((ex) => {
    const matchesCat = selectedCategory === "all" || ex.category === selectedCategory;
    const matchesSearch =
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.targetMuscles.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase())) ||
      ex.equipment.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const waterPct = Math.min(100, Math.round((water / waterIntakeData.targetLiters) * 100));
  const calPct = Math.min(
    100,
    Math.round((resumenHoy.caloriasConsumidas / resumenHoy.caloriasMeta) * 100),
  );
  const totalWorkoutExercises = workoutStudioData.exercisesList.length;
  const completedWorkoutCount = completedExercises.length;
  const workoutProgressPct = Math.round((completedWorkoutCount / totalWorkoutExercises) * 100);

  const today = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const maxTimer = isResting ? activeExercise.restSec : activeExercise.durationSec;
  const currentCount = isResting ? restSecondsLeft : secondsLeft;
  const timerProgress = Math.max(0, currentCount / maxTimer);

  return (
    <div className="relative min-h-screen bg-[#121316] text-foreground selection:bg-purple-600 selection:text-white pb-36 font-sans">
      {/* Precision Flat Background */}
      <AmbientBackground />

      {/* ILLUSTRATOR / CAD BLUEPRINT DRAFTING GUIDELINES */}
      <div className="pointer-events-none fixed inset-0 z-0 flex justify-between max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 opacity-30">
        <div className="h-full w-[1px] bg-white/[0.06]" />
        <div className="hidden md:block h-full w-[1px] bg-white/[0.04]" />
        <div className="hidden lg:block h-full w-[1px] bg-white/[0.04]" />
        <div className="h-full w-[1px] bg-white/[0.06]" />
      </div>

      {/* ==================== DASHBOARD HEADER ==================== */}
      <header className="sticky top-0 z-50 px-6 sm:px-10 lg:px-16 py-3.5 bg-[#18191f]/90 backdrop-blur-2xl border-b border-white/10 shadow-md">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between">
          {/* Left: Brand & Title */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-white/10 bg-white/5 text-muted-foreground hover:text-white transition-colors"
              title="Volver"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
            </Link>
            <Logo />
            <div className="hidden md:flex items-center gap-2 border-l border-white/10 pl-3 text-[10px] font-mono text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>SYNC // BIOMETRIC HUD</span>
            </div>
          </div>

          {/* Right: Controls & User */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-white/10 bg-white/5 text-muted-foreground hover:text-white transition-colors"
              title={soundEnabled ? "Audio Activo" : "Silenciado"}
            >
              {soundEnabled ? (
                <Volume2 className="h-3.5 w-3.5" />
              ) : (
                <VolumeX className="h-3.5 w-3.5" />
              )}
            </button>

            <div className="flex items-center gap-2 rounded-[6px] border border-orange-500/30 bg-orange-500/10 px-3 py-1.5">
              <Flame className="h-3.5 w-3.5 text-orange-400" />
              <span className="font-mono text-xs font-semibold text-orange-300">
                {resumenHoy.racha} DÍAS
              </span>
            </div>

            <div className="flex items-center gap-2.5 border-l border-white/10 pl-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-purple-600 font-bold text-white text-xs">
                {usuario.inicial}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-white leading-none">{usuario.nombre}</p>
                <p className="text-[9px] text-muted-foreground font-mono mt-0.5">
                  LVL 3 · {usuario.xpActual} XP
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-white/10 bg-white/5 text-muted-foreground hover:text-red-400 transition-colors"
              title="Cerrar sesión"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16 py-10 space-y-10">
        {/* ==================== 1. MODULAR ATHLETE COCKPIT (SIDE-BY-SIDE METRICS) ==================== */}
        <section className="space-y-4">
          {/* Coordinate Header */}
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <span className="text-purple-400 font-bold">[01]</span> RESUMEN BIOMÉTRICO EN VIVO
            </span>
            <span>{today}</span>
          </div>

          {/* 4 Modular Metrics Side by Side with Blueprint Hatching Border */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* 1. Calories */}
            <BlueprintCard tag="MET // CAL">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-md bg-purple-500/10 border border-purple-400/20 flex items-center justify-center text-purple-400 shrink-0">
                      <Flame className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono uppercase text-muted-foreground">
                        Calorías Hoy
                      </span>
                      <p className="font-display text-lg text-white leading-tight">
                        <AnimatedCounter value={resumenHoy.caloriasConsumidas} />
                        <span className="text-xs text-muted-foreground font-mono">
                          {" "}
                          / {resumenHoy.caloriasMeta}
                        </span>
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-purple-300 font-bold">{calPct}%</span>
                </div>

                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bar-glow-purple transition-all duration-700"
                    style={{ width: `${calPct}%` }}
                  />
                </div>
              </div>
            </BlueprintCard>

            {/* 2. Hydration */}
            <BlueprintCard tag="HYD // H2O" accentColor="cyan">
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
                      <p className="font-display text-lg text-white leading-tight">
                        {water}
                        <span className="text-xs text-muted-foreground font-mono">
                          {" "}
                          / {waterIntakeData.targetLiters}L
                        </span>
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      setWater((p) =>
                        Math.min(+(p + 0.25).toFixed(2), waterIntakeData.targetLiters),
                      )
                    }
                    className="rounded-[4px] border border-cyan-400/40 bg-cyan-500/20 px-2 py-0.5 text-[9px] font-mono text-cyan-200 hover:bg-cyan-500/30"
                  >
                    +250ml
                  </button>
                </div>

                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bar-glow-cyan transition-all duration-700"
                    style={{ width: `${waterPct}%` }}
                  />
                </div>
              </div>
            </BlueprintCard>

            {/* 3. Steps & Movement */}
            <BlueprintCard tag="ACT // STEPS" accentColor="emerald">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-md bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 shrink-0">
                      <Footprints className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono uppercase text-muted-foreground">
                        Pasos Activos
                      </span>
                      <p className="font-display text-lg text-white leading-tight">
                        {(resumenHoy.pasos / 1000).toFixed(1)}k
                        <span className="text-xs text-muted-foreground font-mono"> / 12k</span>
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-300 font-bold">
                    {stepDistanceData.distanceKm} km
                  </span>
                </div>

                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bar-glow-emerald transition-all duration-700"
                    style={{ width: "77%" }}
                  />
                </div>
              </div>
            </BlueprintCard>

            {/* 4. Heart Rate */}
            <BlueprintCard tag="BPM // ECG" accentColor="red">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-md bg-red-500/10 border border-red-400/20 flex items-center justify-center text-red-400 shrink-0">
                      <Heart className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono uppercase text-muted-foreground">
                        Frecuencia Cardíaca
                      </span>
                      <p className="font-display text-lg text-white leading-tight">
                        <AnimatedCounter value={heartRateData.currentBpm} />
                        <span className="text-xs text-muted-foreground font-mono"> BPM</span>
                      </p>
                    </div>
                  </div>
                  <span className="rounded bg-red-500/20 text-red-300 text-[8px] font-mono px-1.5 py-0.2">
                    QUEMA
                  </span>
                </div>

                <div className="h-1.5 w-full flex items-center gap-0.5">
                  {heartRateData.waveHeights.slice(0, 14).map((h, i) => (
                    <span
                      key={i}
                      className="w-full bg-red-400/80 rounded-full"
                      style={{ height: `${(h / 100) * 8}px` }}
                    />
                  ))}
                </div>
              </div>
            </BlueprintCard>
          </div>
        </section>

        {/* ==================== 2. TABS SELECTOR ==================== */}
        <div className="flex items-center gap-1 rounded-[6px] border border-white/10 bg-[#18191f] p-1 overflow-x-auto text-xs font-mono">
          {[
            {
              id: "rutina",
              label: "Studio de Entrenamiento",
              icon: Dumbbell,
              badge: `${completedWorkoutCount}/${totalWorkoutExercises}`,
            },
            {
              id: "plan",
              label: "Nutrición Fraccionada",
              icon: Utensils,
              badge: `${nutritionOverviewData.caloriesCurrent} kcal`,
            },
            { id: "metricas", label: "Analítica Biometría", icon: Activity, badge: "HUD" },
            { id: "coach", label: "Feedback Coach", icon: MessageSquare, badge: "1" },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-2 px-3 rounded-[4px] font-semibold transition-colors ${
                  active
                    ? "bg-purple-600 text-white"
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
                <span className="text-[9px] opacity-70">({tab.badge})</span>
              </button>
            );
          })}
        </div>

        {/* ==================== 3. TAB CONTENT ==================== */}
        <div ref={tabContainerRef}>
          {/* ==================== 1. STUDIO DE ENTRENAMIENTO HD ==================== */}
          {activeTab === "rutina" && (
            <div className="space-y-6">
              {/* Active Studio Player with Minimalist Layout */}
              {exerciseViewMode === "player" && (
                <BlueprintCard tag="STUDIO // ACTIVE TIMER">
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
                      <div>
                        <span className="text-[9px] font-mono uppercase tracking-widest text-purple-400 font-bold">
                          BLOQUE PRINCIPAL · {workoutStudioData.mainBlockMin} MIN
                        </span>
                        <h3 className="font-display text-xl sm:text-2xl font-light text-white mt-0.5">
                          {activeExercise.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {activeExercise.detail}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setSelectedExerciseModal(activeExercise)}
                          className="flex items-center gap-1.5 rounded-[6px] border border-purple-400/40 bg-purple-500/10 px-3 py-1.5 text-xs text-purple-200 hover:bg-purple-500/20"
                        >
                          <PlayCircle className="h-3.5 w-3.5" /> Guía Técnica HD
                        </button>
                      </div>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-12 items-center">
                      {/* Left: Motion GIF Demonstration */}
                      <div className="lg:col-span-6 space-y-3">
                        <div className="relative h-60 w-full overflow-hidden rounded-[6px] border border-white/10 bg-black">
                          <ExerciseGifPlayer
                            images={activeExercise.images}
                            gifUrl={activeExercise.gifUrl}
                            posterUrl={activeExercise.imageUrl}
                            alt={activeExercise.name}
                            className="h-full w-full"
                          />
                        </div>

                        {/* Muscle Targets Row */}
                        <div className="flex flex-wrap gap-1.5">
                          {activeExercise.targetMuscles.map((m) => (
                            <span
                              key={m}
                              className="rounded-[4px] border border-purple-400/20 bg-purple-500/10 px-2 py-0.5 text-[9px] font-mono text-purple-300"
                            >
                              🎯 {m}
                            </span>
                          ))}
                          <span className="rounded-[4px] border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] font-mono text-muted-foreground">
                            {activeExercise.equipment}
                          </span>
                        </div>
                      </div>

                      {/* Right: Digital Timer & Sets */}
                      <div className="lg:col-span-6 space-y-6">
                        <div className="rounded-[6px] border border-white/10 bg-[#121316] p-5 text-center space-y-2">
                          <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
                            {isResting ? "Intervalo de Descanso" : "Tiempo de Serie"}
                          </span>
                          <p className="font-display text-5xl font-light text-white font-mono leading-none">
                            00:{String(currentCount).padStart(2, "0")}
                          </p>
                          <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden mt-3">
                            <div
                              className={`h-full rounded-full transition-all duration-300 ${isResting ? "bar-glow-cyan" : "bar-glow-purple"}`}
                              style={{ width: `${timerProgress * 100}%` }}
                            />
                          </div>
                        </div>

                        {/* Sets & Player Controls */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="text-muted-foreground">
                              Series ({activeExercise.sets}):
                            </span>
                            <div className="flex items-center gap-1.5">
                              {Array.from({ length: activeExercise.sets }).map((_, sIdx) => {
                                const done = (completedSets[activeExercise.id] || []).includes(
                                  sIdx,
                                );
                                return (
                                  <button
                                    key={sIdx}
                                    onClick={() => handleToggleSet(activeExercise.id, sIdx)}
                                    className={`h-7 w-7 rounded-[4px] flex items-center justify-center text-[10px] font-mono font-bold transition-colors ${
                                      done
                                        ? "bg-emerald-500 text-black"
                                        : "border border-white/15 bg-white/5 text-muted-foreground hover:text-white"
                                    }`}
                                  >
                                    {done ? "✓" : sIdx + 1}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 pt-2">
                            <button
                              onClick={() => {
                                if (isResting) setRestSecondsLeft(activeExercise.restSec);
                                else setSecondsLeft(activeExercise.durationSec);
                              }}
                              className="flex h-10 w-10 items-center justify-center rounded-[6px] border border-white/10 bg-white/5 text-white hover:bg-white/10"
                              title="Reiniciar"
                            >
                              <RotateCcw className="h-4 w-4" />
                            </button>

                            <button
                              onClick={() => setIsPlaying(!isPlaying)}
                              className="flex-1 h-10 rounded-[6px] bg-white text-black font-semibold text-xs flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
                            >
                              {isPlaying ? (
                                <Pause className="h-4 w-4 fill-black" />
                              ) : (
                                <Play className="h-4 w-4 fill-black" />
                              )}
                              {isPlaying ? "Pausar" : "Iniciar Serie"}
                            </button>

                            <button
                              onClick={() => {
                                const next =
                                  (workoutIndex + 1) % workoutStudioData.exercisesList.length;
                                handleSelectExercise(next);
                              }}
                              className="flex h-10 w-10 items-center justify-center rounded-[6px] border border-white/10 bg-white/5 text-white hover:bg-white/10"
                              title="Siguiente"
                            >
                              <SkipForward className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </BlueprintCard>
              )}

              {/* Search & ExerciseDB Explorer Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-1 overflow-x-auto pb-1">
                  {Object.entries(categoryLabels).map(([catKey, { label, icon }]) => (
                    <button
                      key={catKey}
                      onClick={() => setSelectedCategory(catKey)}
                      className={`rounded-[4px] px-3 py-1.5 text-xs font-mono transition-colors shrink-0 ${
                        selectedCategory === catKey
                          ? "bg-purple-600 text-white"
                          : "border border-white/10 bg-[#18191f] text-muted-foreground hover:text-white"
                      }`}
                    >
                      {icon} {label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Buscar ejercicio..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-8 rounded-[4px] border border-white/10 bg-[#18191f] pl-8 pr-3 text-xs text-white placeholder:text-muted-foreground focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <button
                    onClick={() => setIsDbExplorerOpen(true)}
                    className="flex items-center gap-1.5 rounded-[4px] border border-purple-500/30 bg-purple-600/20 px-3 py-1.5 text-xs font-mono text-purple-200 hover:bg-purple-600/30 shrink-0"
                  >
                    <Sparkles className="h-3 w-3 text-purple-400" />
                    ExerciseDB (+800)
                  </button>
                </div>
              </div>

              {/* Exercises Bento Grid with Space Maximization */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredExercises.map((ex, idx) => {
                  const isComplete = completedExercises.includes(ex.id);
                  const isActive = workoutStudioData.exercisesList[workoutIndex]?.id === ex.id;
                  const setsDone = (completedSets[ex.id] || []).length;

                  return (
                    <BlueprintCard
                      key={ex.id}
                      tag={`EX // ${String(idx + 1).padStart(2, "0")}`}
                      className={
                        isActive
                          ? "border-purple-400/80 shadow-[0_0_25px_rgba(168,85,247,0.3)]"
                          : ""
                      }
                    >
                      <div className="flex flex-col justify-between h-full space-y-4">
                        {/* Compact Animated Motion Header */}
                        <div className="relative h-40 w-full overflow-hidden rounded-[5px] border border-white/10 bg-black">
                          <ExerciseGifPlayer
                            images={ex.images}
                            gifUrl={ex.gifUrl}
                            posterUrl={ex.imageUrl}
                            alt={ex.name}
                            className="h-full w-full"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-xs text-white line-clamp-1">
                              {ex.name}
                            </h4>
                            <span className="text-[9px] font-mono text-purple-300">
                              {ex.repsOrDuration}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {ex.targetMuscles.map((m) => (
                              <span
                                key={m}
                                className="rounded-[4px] border border-white/10 bg-white/5 px-1.5 py-0.2 text-[8px] font-mono text-purple-300"
                              >
                                {m}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Sets & Actions */}
                        <div className="flex items-center justify-between border-t border-white/10 pt-3">
                          <span className="text-[10px] font-mono text-muted-foreground">
                            Sets: {setsDone}/{ex.sets}
                          </span>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                const exIndex = workoutStudioData.exercisesList.findIndex(
                                  (e) => e.id === ex.id,
                                );
                                if (exIndex !== -1) {
                                  handleSelectExercise(exIndex);
                                  setExerciseViewMode("player");
                                }
                              }}
                              className="rounded-[4px] border border-white/10 bg-white/5 px-3 py-1 text-xs text-white hover:bg-white/10"
                            >
                              Timer
                            </button>
                            <button
                              onClick={() => setSelectedExerciseModal(ex)}
                              className="rounded-[4px] bg-purple-600 px-3 py-1 text-xs text-white hover:bg-purple-500"
                            >
                              Técnica
                            </button>
                          </div>
                        </div>
                      </div>
                    </BlueprintCard>
                  );
                })}
              </div>
            </div>
          )}

          {/* ==================== 2. NUTRICIÓN FRACCIONADA ==================== */}
          {activeTab === "plan" && (
            <div className="space-y-6">
              {/* Macros Distribution */}
              <div className="rounded-[8px] bg-gradient-to-b from-[#1c1d25] to-[#111216] border border-white/15 border-b-transparent p-5 space-y-4 shadow-[0_16px_36px_-10px_rgba(0,0,0,0.9),inset_0_1px_1.5px_0_rgba(255,255,255,0.2),inset_0_-1px_3px_0_rgba(0,0,0,0.7)]">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold">
                    [02] OBJETIVOS DE MACRONUTRIENTES
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    92% Adherencia
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {macros.map((m) => {
                    const pct = Math.min(100, Math.round((m.value / m.goal) * 100));
                    return (
                      <div
                        key={m.label}
                        className="rounded-[6px] bg-gradient-to-b from-[#181920] to-[#0f1013] border border-white/10 p-3 text-center space-y-1.5"
                      >
                        <span className="text-[9px] font-mono uppercase text-muted-foreground">
                          {m.label}
                        </span>
                        <p className="font-display text-xl text-white font-light">
                          <AnimatedCounter value={m.value} />
                          <span className="text-xs text-purple-300 font-mono ml-0.5">{m.unit}</span>
                        </p>
                        <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full bar-glow-purple transition-all duration-700"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <p className="text-[8px] font-mono text-muted-foreground">
                          meta: {m.goal}
                          {m.unit}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Meals List */}
              <div className="space-y-3">
                {comidas.map((comida) => {
                  const Icon = mealIcons[comida.momento] || Utensils;
                  const isDone = completedMeals.includes(comida.momento);
                  return (
                    <div
                      key={comida.momento}
                      className="rounded-[8px] bg-gradient-to-b from-[#1c1d25] to-[#111216] border border-white/15 border-b-transparent p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[0_16px_36px_-10px_rgba(0,0,0,0.9),inset_0_1px_1.5px_0_rgba(255,255,255,0.2),inset_0_-1px_3px_0_rgba(0,0,0,0.7)]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-white/[0.04] border border-white/10 flex items-center justify-center text-purple-400 shrink-0">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-xs text-white">{comida.momento}</h4>
                            <span className="text-[9px] font-mono text-muted-foreground">
                              {comida.hora}
                            </span>
                            <span className="text-[9px] font-mono text-purple-300 font-bold">
                              {comida.kcal} kcal
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            {comida.items.join(" · ")}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleMeal(comida.momento)}
                        className={`rounded-[4px] px-3 py-1.5 text-xs font-mono font-semibold transition-colors ${
                          isDone
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                            : "border border-white/10 bg-white/5 text-muted-foreground hover:text-white"
                        }`}
                      >
                        {isDone ? "✓ Consumido" : "Marcar Consumido"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ==================== 3. HUD BIOMÉTRICO ==================== */}
          {activeTab === "metricas" && (
            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[8px] bg-gradient-to-b from-[#1c1d25] to-[#111216] border border-white/15 border-b-transparent p-4 space-y-2 shadow-[0_16px_36px_-10px_rgba(0,0,0,0.9),inset_0_1px_1.5px_0_rgba(255,255,255,0.2),inset_0_-1px_3px_0_rgba(0,0,0,0.7)]">
                  <span className="text-[9px] font-mono uppercase text-muted-foreground">
                    Sueño Reparador
                  </span>
                  <p className="font-display text-3xl font-light text-white">
                    {sleepScoresData.totalPct}%
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {sleepScoresData.hoursTotal} Horas Totales Registradas
                  </p>
                </div>

                <div className="rounded-[8px] bg-gradient-to-b from-[#1c1d25] to-[#111216] border border-white/15 border-b-transparent p-4 space-y-2 shadow-[0_16px_36px_-10px_rgba(0,0,0,0.9),inset_0_1px_1.5px_0_rgba(255,255,255,0.2),inset_0_-1px_3px_0_rgba(0,0,0,0.7)]">
                  <span className="text-[9px] font-mono uppercase text-muted-foreground">
                    Grasa Corporal
                  </span>
                  <p className="font-display text-3xl font-light text-white">
                    {bodyFatData.percentage}%
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {bodyFatData.fatKg} kg de grasa · Status: {bodyFatData.status}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ==================== 4. FEEDBACK COACH ==================== */}
          {activeTab === "coach" && (
            <div className="rounded-[8px] bg-gradient-to-b from-[#1c1d25] to-[#111216] border border-white/15 border-b-transparent p-5 space-y-4 shadow-[0_16px_36px_-10px_rgba(0,0,0,0.9),inset_0_1px_1.5px_0_rgba(255,255,255,0.2),inset_0_-1px_3px_0_rgba(0,0,0,0.7)]">
              <span className="text-[10px] font-mono uppercase text-purple-400 tracking-widest font-bold">
                [04] MENSAJES CON ANDRE INA
              </span>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {coachMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-md rounded-[6px] p-3 text-xs ${
                        msg.sender === "user"
                          ? "bg-purple-600 text-white"
                          : "bg-white/5 border border-white/10 text-purple-200"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className="text-[8px] opacity-60 block text-right mt-1">
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <form
                onSubmit={handleSendCoachMsg}
                className="flex items-center gap-2 pt-2 border-t border-white/10"
              >
                <input
                  type="text"
                  placeholder="Escribe tu consulta..."
                  value={coachMsgInput}
                  onChange={(e) => setCoachMsgInput(e.target.value)}
                  className="flex-1 h-9 rounded-[4px] border border-white/10 bg-[#121316] px-3 text-xs text-white placeholder:text-muted-foreground focus:outline-none focus:border-purple-400"
                />
                <button
                  type="submit"
                  className="h-9 px-4 rounded-[4px] bg-purple-600 text-xs font-semibold text-white"
                >
                  Enviar
                </button>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* ==================== TECHNIQUE MODAL ==================== */}
      {selectedExerciseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
          <div
            ref={modalRef}
            className="relative w-full max-w-xl overflow-hidden rounded-[8px] border border-white/15 bg-[#18191f] p-6 text-white my-8 max-h-[88vh] overflow-y-auto space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[9px] font-mono uppercase text-purple-400 font-bold">
                  Técnica HD
                </span>
                <h3 className="font-display text-xl font-light text-white">
                  {selectedExerciseModal.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedExerciseModal(null)}
                className="flex h-7 w-7 items-center justify-center rounded-[4px] border border-white/10 bg-white/5 text-muted-foreground hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="relative h-48 w-full overflow-hidden rounded-[6px] border border-white/10 bg-black">
              <ExerciseGifPlayer
                images={selectedExerciseModal.images}
                gifUrl={selectedExerciseModal.gifUrl}
                posterUrl={selectedExerciseModal.imageUrl}
                alt={selectedExerciseModal.name}
                className="h-full w-full"
              />
            </div>

            {/* Coach Cue */}
            <div className="rounded-[6px] border border-purple-500/20 bg-purple-950/20 p-3 text-xs text-purple-200">
              <p className="font-mono text-[9px] text-purple-400 uppercase font-bold">
                Cue de Andre Ina:
              </p>
              <p className="mt-0.5 leading-relaxed">{selectedExerciseModal.coachTips}</p>
            </div>

            {/* Steps */}
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <p className="font-mono text-[9px] uppercase text-white font-bold">Ejecución:</p>
              {selectedExerciseModal.instrucciones.map((inst, i) => (
                <p key={i}>• {inst}</p>
              ))}
            </div>

            <a
              href={`https://www.youtube.com/results?search_query=${selectedExerciseModal.youtubeQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 rounded-[6px] border border-red-500/40 bg-red-600/20 py-2.5 text-xs font-semibold text-red-200 hover:bg-red-600/30 transition-colors"
            >
              <Play className="h-3.5 w-3.5 fill-red-400 text-red-400" />
              Ver Video en YouTube HD
            </a>
          </div>
        </div>
      )}

      {/* ==================== EXERCISEDB EXPLORER MODAL ==================== */}
      {isDbExplorerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-[8px] border border-white/15 bg-[#18191f] p-6 text-white my-8 max-h-[88vh] flex flex-col space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[9px] font-mono uppercase text-purple-400 font-bold">
                  Catálogo ExerciseDB
                </span>
                <h3 className="font-display text-xl font-light text-white">
                  Explorador de Ejercicios
                </h3>
              </div>
              <button
                onClick={() => setIsDbExplorerOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-[4px] border border-white/10 bg-white/5 text-muted-foreground hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <input
              type="text"
              placeholder="Buscar ejercicio (Squat, Lunge, Row, Plank)..."
              value={dbSearchQuery}
              onChange={(e) => setDbSearchQuery(e.target.value)}
              className="w-full h-10 rounded-[4px] border border-white/10 bg-[#121316] px-3 text-xs text-white placeholder:text-muted-foreground focus:outline-none focus:border-purple-400"
            />

            <div className="flex-1 overflow-y-auto pr-1">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {dbExercisesList
                  .filter((item) => {
                    if (!dbSearchQuery.trim()) return true;
                    const q = dbSearchQuery.toLowerCase();
                    return (
                      item.name.toLowerCase().includes(q) ||
                      item.primaryMuscles.some((m) => m.toLowerCase().includes(q))
                    );
                  })
                  .slice(0, 24)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="rounded-[6px] border border-white/10 bg-[#121316] p-3 space-y-2"
                    >
                      <div className="relative h-28 w-full overflow-hidden rounded-[4px] bg-black">
                        <ExerciseGifPlayer
                          images={item.images}
                          gifUrl={item.gifUrl}
                          alt={item.name}
                          className="h-full w-full"
                        />
                      </div>
                      <h4 className="font-semibold text-xs text-white line-clamp-1">{item.name}</h4>
                      <button
                        onClick={() => {
                          const newExercise: Exercise = {
                            id: Date.now(),
                            name: item.name,
                            category: "gluteos",
                            detail: `3 series × 12 reps · ${item.equipment || "Libre"}`,
                            sets: 3,
                            repsOrDuration: "12 reps",
                            durationSec: 45,
                            restSec: 30,
                            completed: false,
                            targetMuscles: item.primaryMuscles,
                            secondaryMuscles: item.secondaryMuscles || [],
                            equipment: item.equipment || "Libre",
                            difficulty: "Intermedio",
                            tempo: "2-0-1-0",
                            estKcal: 50,
                            imageUrl: item.images[0] ? getExerciseImageUrl(item.images[0]) : "",
                            images: item.images,
                            gifUrl: item.gifUrl || "",
                            youtubeQuery: `${item.name}+exercise+tutorial`,
                            coachTips: `Mantén la forma estricta en ${item.name}.`,
                            commonMistakes: ["Perder el control del movimiento"],
                            instrucciones:
                              item.instructions.length > 0
                                ? item.instructions
                                : ["Ejecuta el ejercicio de forma controlada."],
                          };
                          setSelectedExerciseModal(newExercise);
                          setIsDbExplorerOpen(false);
                        }}
                        className="w-full rounded-[4px] bg-purple-600 py-1.5 text-xs font-semibold text-white hover:bg-purple-500"
                      >
                        Ver Técnica
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING CONTROL DOCK */}
      <FloatingDock />
    </div>
  );
}
