import { Shield, Sparkles, Trophy, Zap, CheckCircle2 } from "lucide-react";
import { GsapCard } from "./GsapCardTilt";

export function LevelBadgeCard() {
  return (
    <GsapCard glowColor="rgba(192, 132, 252, 0.25)" className="w-full">
      <div className="flex flex-col items-center text-center">
        {/* Pixel / High-Tech Diamond Gem Icon */}
        <div className="relative mb-4 flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 rounded-2xl bg-purple-500/20 blur-xl animate-pulse" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-400/40 bg-gradient-to-br from-purple-900/60 to-purple-950/90 shadow-[0_0_20px_rgba(168,85,247,0.35)]">
            <Zap className="h-7 w-7 text-purple-300 fill-purple-400/30" />
          </div>
        </div>

        <p className="text-xs font-mono tracking-[0.25em] text-purple-400 uppercase">
          Nivel de Rendimiento
        </p>
        <h3 className="mt-1 font-display text-3xl font-light text-white tracking-wide">Level 3</h3>
        <span className="mt-1 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-0.5 text-[10px] font-semibold tracking-wider text-purple-300 uppercase">
          ADVANCED ATHLETE
        </span>

        {/* Progression Track */}
        <div className="mt-6 w-full space-y-3">
          {/* Active Level 3 */}
          <div className="rounded-2xl border border-purple-500/30 bg-purple-950/30 p-4 text-left backdrop-blur-md">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="flex items-center gap-2 text-white">
                <span className="h-2 w-2 rounded-full bg-purple-400 animate-ping" />
                Level 3 · Atleta Avanzada
              </span>
              <span className="font-mono text-purple-300">55 / 450 XP</span>
            </div>
            {/* Progress bar with nodes */}
            <div className="mt-3 relative h-2 w-full rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000"
                style={{ width: "28%" }}
              />
              <div className="absolute inset-0 flex justify-between px-1 -top-0.5">
                {[0, 25, 50, 75, 100].map((step) => (
                  <div
                    key={step}
                    className={`h-3 w-1 rounded-full ${
                      step <= 28
                        ? "bg-purple-300 shadow-[0_0_8px_rgba(216,180,254,0.8)]"
                        : "bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-purple-200/70">
              Proficiencia alta en sobrecarga progresiva y control de macros. Próximo desbloqueo:
              Plan de suplemetación avanzada.
            </p>
          </div>

          {/* Level 1 Completed */}
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-3.5 text-left opacity-80">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="flex items-center gap-2 text-emerald-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Level 1 · Fundamentos
              </span>
              <span className="font-mono text-emerald-400">150 / 150 XP</span>
            </div>
            <p className="mt-1 text-[11px] text-emerald-200/60">
              Dominio del cálculo calórico diario y hábitos de hidratación iniciales.
            </p>
          </div>
        </div>
      </div>
    </GsapCard>
  );
}
