import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  Award,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Coffee,
  Dumbbell,
  Edit3,
  ExternalLink,
  Flame,
  Heart,
  Plus,
  Save,
  Send,
  ShieldAlert,
  Sparkles,
  Trash2,
  Users,
  Utensils,
  Zap,
  Droplets,
  Footprints,
  Activity,
  Search,
} from "lucide-react";

import { Logo } from "@/components/ina/Logo";
import { AmbientBackground } from "@/components/ina/GsapCanvas";
import { GsapCard } from "@/components/ina/GsapCardTilt";
import { AnimatedCounter } from "@/components/ina/AnimatedCounter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  usuario,
  comidas as initialComidas,
  macros as initialMacros,
  workoutStudioData as initialWorkout,
  Comida,
} from "@/lib/ina-data";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Panel de Administración Coach — INA Fitness" },
      {
        name: "description",
        content:
          "Panel de control para Inna Coach: gestión de planes de nutrición, rutinas de entrenamiento y métricas de atletas.",
      },
    ],
  }),
  component: AdminPage,
});

const atletasList = [
  {
    id: "mike",
    nombre: "Mike Wheeler",
    plan: "Reto 30 Días · Pro",
    nivel: "Level 3 Advanced",
    adherencia: 98,
    racha: 5,
    status: "Revisado",
  },
  {
    id: "sofia",
    nombre: "Sofía Ramírez",
    plan: "Recomposición Corporal",
    nivel: "Level 2 Intermediate",
    adherencia: 92,
    racha: 12,
    status: "Pendiente Plan",
  },
  {
    id: "carlos",
    nombre: "Carlos Mendoza",
    plan: "Hipertrofia Mscular",
    nivel: "Level 4 Elite",
    adherencia: 95,
    racha: 21,
    status: "Revisado",
  },
  {
    id: "elena",
    nombre: "Elena Gómez",
    plan: "Pérdida de Grasa",
    nivel: "Level 1 Starter",
    adherencia: 88,
    racha: 3,
    status: "Pendiente Check-In",
  },
];

function AdminPage() {
  const navigate = useNavigate();
  const [selectedAtleta, setSelectedAtleta] = useState(atletasList[0]);
  const [activeAdminTab, setActiveAdminTab] = useState<"nutricion" | "rutina" | "biometria">(
    "nutricion",
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Editable Plan States
  const [targetKcal, setTargetKcal] = useState(1800);
  const [proteinG, setProteinG] = useState(180);
  const [carbsG, setCarbsG] = useState(200);
  const [fatsG, setFatsG] = useState(55);
  const [targetWater, setTargetWater] = useState(2.5);
  const [targetSteps, setTargetSteps] = useState(12000);

  const [coachNote, setCoachNote] = useState(
    "¡Excelente trabajo esta semana Mike! Mantén el nivel en las zancadas e incrementa la velocidad en el bloque de enfriamiento. Aumenté 10g de proteína en la cena para optimizar la recuperación muscular.",
  );

  // Meal Builder State
  const [comidasList, setComidasList] = useState<Comida[]>(initialComidas);
  const [newMealMomento, setNewMealMomento] = useState("");
  const [newMealHora, setNewMealHora] = useState("");
  const [newMealKcal, setNewMealKcal] = useState(300);

  // Workout Builder State
  const [workoutTitle, setWorkoutTitle] = useState("Glúteo & Pierna — Fuerza Total");
  const [workoutMin, setWorkoutMin] = useState(22);
  const [exercisesList, setExercisesList] = useState(initialWorkout.exercisesList);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
      );
    }
  }, [selectedAtleta, activeAdminTab]);

  function handleSavePlan() {
    setSavedSuccess(true);
    gsap.fromTo(
      "#save-toast",
      { scale: 0.8, opacity: 0, y: 20 },
      { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.4)" },
    );
    setTimeout(() => setSavedSuccess(false), 4000);
  }

  function handleAddMeal() {
    if (!newMealMomento || !newMealHora) return;
    const newMeal: Comida = {
      momento: newMealMomento,
      hora: newMealHora,
      kcal: newMealKcal,
      p: 25,
      c: 30,
      g: 8,
      items: ["Porción asignada por Coach Inna"],
    };
    setComidasList([...comidasList, newMeal]);
    setNewMealMomento("");
    setNewMealHora("");
  }

  function handleDeleteMeal(index: number) {
    setComidasList(comidasList.filter((_, i) => i !== index));
  }

  return (
    <div className="relative min-h-screen bg-[#121316] text-foreground pb-32">
      {/* Flat Dark Gray Background */}
      <AmbientBackground />

      {/* ADMIN HEADER */}
      <header className="sticky top-0 z-50 px-4 py-3 bg-[#18191f]/90 backdrop-blur-2xl border-b border-purple-500/30">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Logo />
            <span className="rounded-full bg-purple-500/20 border border-purple-400/40 px-3 py-1 text-[10px] font-mono text-purple-300 uppercase font-bold tracking-widest hidden sm:inline-block">
              INNA COACH ADMIN
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-full bg-purple-600 border border-purple-400 flex items-center justify-center font-bold text-white text-xs shadow-[0_0_12px_rgba(168,85,247,0.5)]">
                IN
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-white">Inna Coach</p>
                <p className="text-[10px] text-purple-300 font-mono">Head Performance Specialist</p>
              </div>
            </div>

            <Link
              to="/dashboard"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 transition-colors flex items-center gap-1.5"
            >
              Ver Dashboard Alumno <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-8 space-y-8">
        {/* TOP ATHLETES STATS OVERVIEW */}
        <div className="grid gap-4 sm:grid-cols-4">
          <GsapCard glowColor="rgba(168, 85, 247, 0.25)">
            <p className="text-[10px] font-mono text-purple-400 uppercase tracking-widest">
              Atletas Activos
            </p>
            <p className="font-display text-4xl font-light text-white mt-1">42</p>
            <p className="text-[11px] text-purple-200/60 mt-1">+4 esta semana</p>
          </GsapCard>

          <GsapCard glowColor="rgba(245, 158, 11, 0.25)">
            <p className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">
              Planes Pendientes
            </p>
            <p className="font-display text-4xl font-light text-white mt-1">3</p>
            <p className="text-[11px] text-amber-200/60 mt-1">Requieren actualización</p>
          </GsapCard>

          <GsapCard glowColor="rgba(16, 185, 129, 0.25)">
            <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
              Adherencia Media
            </p>
            <p className="font-display text-4xl font-light text-white mt-1">94%</p>
            <p className="text-[11px] text-emerald-200/60 mt-1">Excelente respuesta</p>
          </GsapCard>

          <GsapCard glowColor="rgba(59, 130, 246, 0.25)">
            <p className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">
              Check-Ins Hoy
            </p>
            <p className="font-display text-4xl font-light text-white mt-1">8</p>
            <p className="text-[11px] text-blue-200/60 mt-1">Fotos & Peso recibidos</p>
          </GsapCard>
        </div>

        {/* ATHLETE SELECTOR STRIP */}
        <div className="rounded-[8px] bg-gradient-to-b from-[#1c1d25] to-[#111216] border border-white/15 border-b-transparent p-4 backdrop-blur-2xl shadow-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase">
              Seleccionar Atleta para Diseñar / Modificar Plan
            </span>
            <div className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar por nombre..."
                className="bg-transparent text-xs text-white placeholder:text-muted-foreground focus:outline-none border-b border-white/10 pb-0.5"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-4">
            {atletasList.map((atleta) => (
              <button
                key={atleta.id}
                onClick={() => setSelectedAtleta(atleta)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  selectedAtleta.id === atleta.id
                    ? "border-purple-400 bg-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                    : "border-white/10 bg-white/[0.02] hover:bg-white/5"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-xs text-white">{atleta.nombre}</p>
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                      atleta.status.includes("Pendiente")
                        ? "bg-amber-500/20 text-amber-300"
                        : "bg-emerald-500/20 text-emerald-300"
                    }`}
                  >
                    {atleta.status}
                  </span>
                </div>
                <p className="text-[10px] text-purple-300 mt-1">{atleta.plan}</p>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground mt-2 font-mono">
                  <span>{atleta.nivel}</span>
                  <span>{atleta.adherencia}% adh</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* WORKSPACE AREA FOR SELECTED ATHLETE */}
        <div ref={containerRef} className="space-y-6">
          {/* ATHLETE BANNER */}
          <GsapCard glowColor="rgba(168, 85, 247, 0.3)">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 font-bold text-white text-lg flex items-center justify-center border border-purple-300 shadow-md">
                  {selectedAtleta.nombre[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-2xl font-light text-white">
                      {selectedAtleta.nombre}
                    </h2>
                    <span className="rounded-full bg-purple-500/20 border border-purple-400/30 px-2.5 py-0.5 text-[9px] font-mono text-purple-300">
                      {selectedAtleta.nivel}
                    </span>
                  </div>
                  <p className="text-xs text-purple-200/70">
                    {selectedAtleta.plan} · Racha de {selectedAtleta.racha} días
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSavePlan}
                  className="rainbow-pill-border px-6 py-3 text-xs font-semibold text-white transition-all hover:scale-105 flex items-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                >
                  <Save className="h-4 w-4" />
                  Publicar & Asignar Plan
                </button>
              </div>
            </div>
          </GsapCard>

          {/* ADMIN TABS SELECTOR */}
          <div className="flex items-center gap-2 rounded-[8px] bg-gradient-to-b from-[#1c1d25] to-[#111216] border border-white/15 border-b-transparent p-1.5 backdrop-blur-xl">
            {[
              { id: "nutricion", label: "🥗 Editor de Nutrición & Macros" },
              { id: "rutina", label: "💪 Creador de Rutinas de Entrenamiento" },
              { id: "biometria", label: "💬 Nota de la Coach & Metas" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveAdminTab(tab.id as typeof activeAdminTab)}
                className={`flex-1 rounded-xl py-3 text-xs font-semibold tracking-wide transition-all ${
                  activeAdminTab === tab.id
                    ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] border border-purple-400/40"
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: NUTRICIÓN EDITOR */}
          {activeAdminTab === "nutricion" && (
            <div className="space-y-6">
              {/* Target Calories & Macros Adjuster */}
              <GsapCard glowColor="rgba(168, 85, 247, 0.25)">
                <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase">
                  Cálculo de Requerimiento Diario
                </span>
                <h3 className="font-display text-xl text-white font-light mt-1">
                  Calorías & Objetivos de Macros
                </h3>

                <div className="grid gap-4 sm:grid-cols-4 mt-4">
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-mono text-purple-300 uppercase">
                      Meta Calorías (Kcal)
                    </Label>
                    <Input
                      type="number"
                      value={targetKcal}
                      onChange={(e) => setTargetKcal(Number(e.target.value))}
                      className="h-11 rounded-xl border-white/15 bg-white/5 text-sm font-mono text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-mono text-purple-300 uppercase">
                      Proteína (Gramos)
                    </Label>
                    <Input
                      type="number"
                      value={proteinG}
                      onChange={(e) => setProteinG(Number(e.target.value))}
                      className="h-11 rounded-xl border-white/15 bg-white/5 text-sm font-mono text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-mono text-purple-300 uppercase">
                      Carbohidratos (Gramos)
                    </Label>
                    <Input
                      type="number"
                      value={carbsG}
                      onChange={(e) => setCarbsG(Number(e.target.value))}
                      className="h-11 rounded-xl border-white/15 bg-white/5 text-sm font-mono text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-mono text-purple-300 uppercase">
                      Grasas (Gramos)
                    </Label>
                    <Input
                      type="number"
                      value={fatsG}
                      onChange={(e) => setFatsG(Number(e.target.value))}
                      className="h-11 rounded-xl border-white/15 bg-white/5 text-sm font-mono text-white"
                    />
                  </div>
                </div>
              </GsapCard>

              {/* Meal Scheduler */}
              <GsapCard glowColor="rgba(168, 85, 247, 0.2)">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase">
                    Cronograma de Comidas Asignadas ({comidasList.length})
                  </span>
                </div>

                {/* Add new meal builder row */}
                <div className="rounded-xl border border-purple-500/30 bg-purple-950/20 p-4 mb-6 space-y-3">
                  <p className="text-xs font-semibold text-purple-200">
                    ➕ Agregar Nueva Comida al Plan:
                  </p>
                  <div className="grid gap-3 sm:grid-cols-4">
                    <Input
                      placeholder="Momento (e.g. Snack Tarde)"
                      value={newMealMomento}
                      onChange={(e) => setNewMealMomento(e.target.value)}
                      className="h-10 rounded-lg border-white/15 bg-white/5 text-xs text-white"
                    />
                    <Input
                      placeholder="Hora (e.g. 17:00)"
                      value={newMealHora}
                      onChange={(e) => setNewMealHora(e.target.value)}
                      className="h-10 rounded-lg border-white/15 bg-white/5 text-xs text-white"
                    />
                    <Input
                      type="number"
                      placeholder="Kcal"
                      value={newMealKcal}
                      onChange={(e) => setNewMealKcal(Number(e.target.value))}
                      className="h-10 rounded-lg border-white/15 bg-white/5 text-xs text-white"
                    />
                    <button
                      onClick={handleAddMeal}
                      className="rounded-lg bg-purple-600 px-4 py-2 text-xs font-semibold text-white hover:bg-purple-500 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Plus className="h-4 w-4" /> Agregar
                    </button>
                  </div>
                </div>

                {/* Current Meals List */}
                <div className="space-y-3">
                  {comidasList.map((meal, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-white/10 bg-white/[0.02] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-white">{meal.momento}</span>
                          <span className="font-mono text-[10px] text-muted-foreground">
                            {meal.hora}
                          </span>
                          <span className="rounded bg-purple-500/20 text-purple-300 font-mono text-[9px] px-2 py-0.5">
                            {meal.kcal} kcal
                          </span>
                        </div>
                        <p className="text-xs text-purple-200/70 mt-1">{meal.items.join(" · ")}</p>
                      </div>

                      <button
                        onClick={() => handleDeleteMeal(index)}
                        className="text-muted-foreground hover:text-red-400 transition-colors text-xs flex items-center gap-1"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Eliminar
                      </button>
                    </div>
                  ))}
                </div>
              </GsapCard>
            </div>
          )}

          {/* TAB 2: RUTINA EDITOR */}
          {activeAdminTab === "rutina" && (
            <div className="space-y-6">
              <GsapCard glowColor="rgba(239, 68, 68, 0.25)">
                <span className="text-[10px] font-mono tracking-widest text-red-400 uppercase">
                  Diseño de Bloque Principal
                </span>
                <h3 className="font-display text-xl text-white font-light mt-1">
                  Configuración del Entrenamiento
                </h3>

                <div className="grid gap-4 sm:grid-cols-2 mt-4">
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-mono text-purple-300 uppercase">
                      Título de la Rutina
                    </Label>
                    <Input
                      value={workoutTitle}
                      onChange={(e) => setWorkoutTitle(e.target.value)}
                      className="h-11 rounded-xl border-white/15 bg-white/5 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-mono text-purple-300 uppercase">
                      Duración Estimada (Minutos)
                    </Label>
                    <Input
                      type="number"
                      value={workoutMin}
                      onChange={(e) => setWorkoutMin(Number(e.target.value))}
                      className="h-11 rounded-xl border-white/15 bg-white/5 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </GsapCard>

              {/* Exercises List in Routine */}
              <GsapCard glowColor="rgba(168, 85, 247, 0.2)">
                <p className="text-[10px] font-mono tracking-widest text-purple-400 uppercase mb-4">
                  Ejercicios en el Bloque ({exercisesList.length})
                </p>

                <div className="space-y-3">
                  {exercisesList.map((ex, idx) => (
                    <div
                      key={ex.id}
                      className="rounded-xl border border-white/10 bg-white/[0.02] p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-purple-500/20 text-purple-300 font-mono text-xs flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        <div>
                          <p className="text-xs font-semibold text-white">{ex.name}</p>
                          <p className="text-[11px] text-muted-foreground">{ex.detail}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="rounded bg-white/5 text-[9px] font-mono text-purple-300 px-2 py-0.5">
                          {ex.durationSec} seg
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </GsapCard>
            </div>
          )}

          {/* TAB 3: BIOMETRÍA & NOTA COACH */}
          {activeAdminTab === "biometria" && (
            <div className="space-y-6">
              {/* Targets */}
              <GsapCard glowColor="rgba(6, 182, 212, 0.25)">
                <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">
                  Metas de Hábitos Diarios
                </span>
                <div className="grid gap-4 sm:grid-cols-2 mt-4">
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-mono text-cyan-300 uppercase">
                      Meta de Agua (Litros)
                    </Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={targetWater}
                      onChange={(e) => setTargetWater(Number(e.target.value))}
                      className="h-11 rounded-xl border-white/15 bg-white/5 text-xs text-white font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-mono text-emerald-300 uppercase">
                      Meta de Pasos Diarios
                    </Label>
                    <Input
                      type="number"
                      value={targetSteps}
                      onChange={(e) => setTargetSteps(Number(e.target.value))}
                      className="h-11 rounded-xl border-white/15 bg-white/5 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </GsapCard>

              {/* Coach Direct Note */}
              <GsapCard glowColor="rgba(168, 85, 247, 0.25)">
                <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase">
                  Mensaje Personalizado de Inna Coach
                </span>
                <p className="text-xs text-purple-200/70 my-2">
                  Esta nota aparecerá directamente en el dashboard del alumno al iniciar su sesión.
                </p>

                <Textarea
                  rows={4}
                  value={coachNote}
                  onChange={(e) => setCoachNote(e.target.value)}
                  className="rounded-xl border-white/15 bg-white/5 text-xs text-white p-3 leading-relaxed"
                />
              </GsapCard>
            </div>
          )}
        </div>
      </main>

      {/* SAVE TOAST NOTIFICATION */}
      {savedSuccess && (
        <div
          id="save-toast"
          className="fixed bottom-10 right-10 z-50 flex items-center gap-3 rounded-2xl border border-emerald-500/40 bg-[#18191f] px-6 py-4 text-white shadow-[0_10px_40px_rgba(16,185,129,0.3)] backdrop-blur-2xl"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-white">¡Plan Publicado Correctamente!</p>
            <p className="text-[10px] text-emerald-300/80">
              El alumno {selectedAtleta.nombre} ya puede ver su rutina y macros en vivo.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
