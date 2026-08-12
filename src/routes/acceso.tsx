import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Loader2, Lock, Mail, ShieldCheck } from "lucide-react";

import { Logo } from "@/components/ina/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { iniciarSesion } from "@/lib/session";
import heroGym from "@/assets/hero-gym.jpg";

export const Route = createFileRoute("/acceso")({
  head: () => ({
    meta: [
      { title: "Acceso a tu dashboard — INA Fitness" },
      {
        name: "description",
        content:
          "Inicia sesión en INA Fitness para ver tu plan de alimentación, tus rutinas y todas tus métricas en modo Pitch Black & Purple.",
      },
      { property: "og:title", content: "Acceso a tu dashboard — INA Fitness" },
      {
        property: "og:description",
        content: "Entra a tu tablero personalizado de entrenamiento y nutrición.",
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
      setError("Revisa tu correo y contraseña para continuar.");
      return;
    }
    setCargando(true);
    setTimeout(() => {
      iniciarSesion(email, "Mike Wheeler");
      navigate({ to: "/dashboard" });
    }, 700);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07070a] px-6 py-16 text-foreground">
      <img
        src={heroGym}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-15"
      />
      <div className="absolute inset-0 bg-linear-to-b from-[#07070a] via-[#07070a]/90 to-[#07070a]" />
      <div
        aria-hidden
        className="float-slow absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full blur-[130px]"
        style={{ background: "oklch(0.62 0.26 295 / 25%)" }}
      />

      <div className="reveal relative z-10 w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <div className="surface-card-purple p-8 md:p-10">
          <p className="text-[11px] tracking-[0.3em] text-purple-300 uppercase">Acceso miembros</p>
          <h1 className="mt-3 font-display text-3xl font-light text-white uppercase">Bienvenido de nuevo</h1>
          <p className="mt-3 text-sm text-purple-200/70">
            Entra a tu dashboard de métricas y continúa tu racha.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[11px] tracking-[0.2em] text-purple-200 uppercase">
                Correo
              </Label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-purple-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl border-purple-500/30 bg-purple-950/20 pl-10 text-white transition-colors focus-visible:border-purple-400"
                  placeholder="tu@correo.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pass" className="text-[11px] tracking-[0.2em] text-purple-200 uppercase">
                Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-purple-400" />
                <Input
                  id="pass"
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  className="h-12 rounded-xl border-purple-500/30 bg-purple-950/20 pl-10 text-white transition-colors focus-visible:border-purple-400"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && <p className="text-xs text-destructive">{error}</p>}

            <Button
              type="submit"
              size="lg"
              className="h-12 w-full rounded-xl bg-purple-600 font-medium text-white shadow-lg shadow-purple-600/40 hover:bg-purple-500"
              disabled={cargando}
            >
              {cargando ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Entrando...
                </>
              ) : (
                <>
                  Entrar a mi Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 flex items-center gap-2 text-[11px] text-purple-300/80">
            <ShieldCheck className="h-4 w-4 text-purple-400" />
            Demo: cualquier correo y contraseña dan acceso directo.
          </div>
        </div>

        <p className="mt-8 text-center text-xs tracking-[0.18em] text-muted-foreground uppercase">
          <Link to="/" className="transition-colors hover:text-purple-400">
            Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  );
}