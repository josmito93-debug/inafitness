import { useState } from "react";
import {
  Heart,
  Activity,
  Flame,
  Droplets,
  Footprints,
  Apple,
  Dumbbell,
  Sparkles,
  CheckCircle2,
  Clock,
  Utensils,
  Award,
  MessageCircle,
  TrendingUp,
  Zap,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { InteractiveTile } from "./InteractiveTile";
import { AnimatedCounter } from "./AnimatedCounter";

export function BentoShowcase() {
  const [selectedGoal, setSelectedAtletaGoal] = useState<"grasa" | "recomposicion" | "musculo">(
    "recomposicion",
  );

  return (
    <div className="relative mx-auto max-w-6xl px-4 py-16">
      {/* Section Eyebrow Title */}
      <div className="mb-12 text-center space-y-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-purple-500/10 px-4 py-1.5 text-[10px] font-mono tracking-[0.25em] text-purple-300 uppercase shadow-[0_0_15px_rgba(168,85,247,0.25)]">
          <Sparkles className="h-3.5 w-3.5 text-purple-400" /> El Método Integral de Andre Ina
        </span>
        <h2 className="font-display text-3xl font-light uppercase text-white md:text-5xl">
          Todo lo que necesitas en una sola plataforma
        </h2>
        <p className="text-sm text-purple-200/70 max-w-xl mx-auto">
          Nutrición gourmet flexible, sobrecarga progresiva de fuerza y acompañamiento constante
          para lograr tu mejor versión física y emocional.
        </p>
      </div>

      {/* Bento Grid layout based on Andre Ina Brand Brief */}
      <div className="grid gap-5 md:grid-cols-12">
        {/* 1. Gastronomía Saludable & Recetas Gourmet (Col span 7) */}
        <div className="md:col-span-7">
          <InteractiveTile beamColor="168, 85, 247" className="h-full">
            <div className="flex flex-col h-full justify-between space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-[0.2em] text-purple-400 uppercase font-bold">
                    Nutrición Gourmet Flexible
                  </span>
                  <h3 className="mt-1 font-display text-2xl font-light text-white">
                    Planes de Alimentación a Tu Medida
                  </h3>
                  <p className="mt-1 text-xs text-purple-200/70">
                    Calculados según tu meta real. Sin dietas aburridas ni alimentos prohibidos.
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-purple-400/40 bg-purple-500/20 text-purple-300">
                  <Apple className="h-5 w-5" />
                </div>
              </div>

              {/* Goal Switcher */}
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-1">
                {[
                  { id: "grasa", label: "🔥 Pérdida de Grasa" },
                  { id: "recomposicion", label: "✨ Recomposición Físico/Músculo" },
                  { id: "musculo", label: "💪 Aumento Muscular" },
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedAtletaGoal(g.id as typeof selectedGoal)}
                    className={`flex-1 rounded-lg py-2 text-[10px] font-mono font-semibold transition-all ${
                      selectedGoal === g.id
                        ? "bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)]"
                        : "text-muted-foreground hover:text-white"
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>

              {/* Dish Preview Card */}
              <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-purple-950/30 to-[#0c0c14] p-4 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="rounded bg-purple-500/20 text-purple-300 text-[9px] font-mono px-2 py-0.5 font-bold uppercase">
                    {selectedGoal === "grasa"
                      ? "Déficit Inteligente · 1,500 kcal"
                      : selectedGoal === "musculo"
                        ? "Superávit Limpio · 2,200 kcal"
                        : "Mantenimiento & Escultura · 1,800 kcal"}
                  </span>
                  <p className="text-xs font-semibold text-white">
                    {selectedGoal === "grasa"
                      ? "Bowl de Pollo a las Finas Hierbas & Camote"
                      : selectedGoal === "musculo"
                        ? "Panqueques Proteicos con Frutos Rojos & Avena"
                        : "Salmón al Horno con Aguacate & Ensalada Verde"}
                  </p>
                  <p className="text-[10px] text-purple-200/60">
                    Proteína 38g · Carbohidratos 42g · Grasas Saludables 12g
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="flex items-center gap-1 text-emerald-400 text-xs font-bold font-mono">
                    <CheckCircle2 className="h-3.5 w-3.5" /> 100% Delicioso
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-purple-200/70">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                  Calculado automáticamente por Andre Ina
                </span>
                <span className="font-mono text-[10px] text-purple-300 uppercase">
                  Gourmet & Saludable
                </span>
              </div>
            </div>
          </InteractiveTile>
        </div>

        {/* 2. Entrenamiento de Fuerza & Escultura Corporal (Col span 5) */}
        <div className="md:col-span-5">
          <InteractiveTile beamColor="59, 130, 246" className="h-full">
            <div className="flex flex-col justify-between h-full space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-[0.2em] text-blue-400 uppercase font-bold">
                    Entrenamiento Guiado HD
                  </span>
                  <h3 className="mt-1 font-display text-2xl font-light text-white">
                    Studio de Fuerza & Tonificación
                  </h3>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-400/40 bg-blue-500/20 text-blue-300">
                  <Dumbbell className="h-5 w-5" />
                </div>
              </div>

              {/* Workout Block Preview */}
              <div className="rounded-2xl border border-blue-500/30 bg-blue-950/20 p-5 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">Glúteos, Pierna & Core</span>
                  <span className="font-mono text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded text-[10px]">
                    45 MIN · BLOQUE 3
                  </span>
                </div>

                <div className="space-y-2 text-xs text-purple-200/80">
                  <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                    <span>1. Reverse Lunge con Mantenimiento</span>
                    <span className="font-mono text-white">3 Series × 12 Reps</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                    <span>2. Hip Thrust con Pausa</span>
                    <span className="font-mono text-white">4 Series × 10 Reps</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>3. Squat Hold Isométrico</span>
                    <span className="font-mono text-white">45 Segundos</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-purple-200/70 leading-relaxed">
                Cada ejercicio incluye temporizador activo en pantalla y tutorial en video HD con
                corrección técnica de Andre Ina.
              </p>
            </div>
          </InteractiveTile>
        </div>

        {/* 3. Acompañamiento Cercano 1 a 1 (Col span 4) */}
        <div className="md:col-span-4">
          <InteractiveTile beamColor="245, 158, 11">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono tracking-[0.2em] text-amber-400 uppercase font-bold">
                Cercanía & Motivación
              </span>
              <MessageCircle className="h-5 w-5 text-amber-400" />
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center gap-3 mb-3">
              <div className="h-11 w-11 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white text-sm border border-purple-400 shrink-0 shadow-md">
                IN
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Andre Ina</p>
                <p className="text-[10px] text-amber-300 font-mono">
                  Feedback directo & Calibración semanal
                </p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-purple-200/70">
              "Evaluaciones constantes de tu progreso, fotos y hábitos. Ajustamos tu plan sin
              juzgarte para asegurar resultados reales."
            </p>
          </InteractiveTile>
        </div>

        {/* 4. Biometría & Salud Integral (Col span 4) */}
        <div className="md:col-span-4">
          <InteractiveTile beamColor="239, 68, 68">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono tracking-[0.2em] text-red-400 uppercase font-bold">
                Salud & Biometría
              </span>
              <Heart className="h-5 w-5 text-red-400 pulse-heart" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs text-muted-foreground">Ritmo Cardíaco Activo</span>
                <span className="font-mono text-sm font-semibold text-white">95 BPM</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs text-muted-foreground">Sueño Reparador</span>
                <span className="font-mono text-sm font-semibold text-emerald-400">
                  89% Calidad
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Hidratación Diaria</span>
                <span className="font-mono text-sm font-semibold text-cyan-300">2.5 Litros</span>
              </div>
            </div>
          </InteractiveTile>
        </div>

        {/* 5. Superación Personal & Gamificación (Col span 4) */}
        <div className="md:col-span-4">
          <InteractiveTile beamColor="16, 185, 129">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono tracking-[0.2em] text-emerald-400 uppercase font-bold">
                Superación Personal
              </span>
              <Flame className="h-5 w-5 text-emerald-400 animate-pulse" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white font-semibold">Level 3 · Atleta Avanzada</span>
                <span className="text-emerald-300 font-bold">55 / 450 XP</span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-300"
                  style={{ width: "65%" }}
                />
              </div>
              <p className="text-[11px] text-purple-200/70 pt-1">
                Gana puntos por cumplir tus comidas, completar tus rutinas y mantener tu racha
                semanal.
              </p>
            </div>
          </InteractiveTile>
        </div>
      </div>
    </div>
  );
}
