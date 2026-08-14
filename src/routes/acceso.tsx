import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Loader2, Lock, Mail, ShieldCheck, Sparkles } from "lucide-react";

import { Logo } from "@/components/ina/Logo";
import { AmbientBackground } from "@/components/ina/GsapCanvas";
import { GsapCard } from "@/components/ina/GsapCardTilt";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { iniciarSesion } from "@/lib/session";

export const Route = createFileRoute("/acceso")({
  head: () => ({
    meta: [
      { title: "Acceso a tu Dashboard — INA Fitness OS" },
      {
        name: "description",
        content:
          "Inicia sesión en INA Fitness para acceder a tu centro de control biométrico de alimentación y entrenamiento.",
      },
    ],
  }),
  component: Acceso,
});

function Acceso() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("mike@inafitness.com");
  const [pass, setPass] = useState("inafitness");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email.includes("@") || pass.length < 4) {
      setError("Ingresa un correo válido y contraseña de mínimo 4 caracteres.");
      return;
    }
    setCargando(true);
    setTimeout(() => {
      iniciarSesion(email, "Mike Wheeler");
      navigate({ to: "/dashboard" });
    }, 600);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#121316] px-4 py-16 text-foreground">
      {/* Flat Dark Gray Background */}
      <AmbientBackground />

      <div className="relative z-10 w-full max-w-md space-y-6">
        <div className="flex justify-center">
          <Logo />
        </div>

        <GsapCard glowColor="rgba(168, 85, 247, 0.35)">
          <div className="space-y-6">
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-[9px] font-mono tracking-widest text-purple-300 uppercase">
                <Sparkles className="h-3 w-3 text-purple-400" /> ACCESO MIEMBROS PRO
              </span>
              <h1 className="mt-3 font-display text-3xl font-light text-white uppercase">
                Bienvenido de Nuevo
              </h1>
              <p className="mt-1 text-xs text-purple-200/70">
                Ingresa a tu centro de control biométrico.
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-[10px] font-mono tracking-widest text-purple-300 uppercase"
                >
                  Correo Electrónico
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 rounded-xl border-white/15 bg-white/5 pl-10 text-xs text-white placeholder:text-muted-foreground focus-visible:border-purple-400"
                    placeholder="tu@correo.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="pass"
                  className="text-[10px] font-mono tracking-widest text-purple-300 uppercase"
                >
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400" />
                  <Input
                    id="pass"
                    type="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    className="h-12 rounded-xl border-white/15 bg-white/5 pl-10 text-xs text-white placeholder:text-muted-foreground focus-visible:border-purple-400"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error && <p className="text-xs text-red-400 font-mono">{error}</p>}

              <button
                type="submit"
                disabled={cargando}
                className="rainbow-pill-border w-full py-3.5 text-xs font-semibold text-white transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
              >
                {cargando ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-purple-300" /> Verificando...
                  </>
                ) : (
                  <>
                    Entrar al Dashboard <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-[11px] text-purple-200/70">
              <ShieldCheck className="h-4 w-4 text-purple-400 shrink-0" />
              <span>Acceso de prueba demo configurado. Usa cualquier correo para entrar.</span>
            </div>
          </div>
        </GsapCard>

        <p className="text-center text-xs font-mono text-muted-foreground uppercase">
          <Link to="/" className="hover:text-purple-400 transition-colors">
            ← Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  );
}
