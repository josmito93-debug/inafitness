const KEY = "ina.session";

export type Sesion = { email: string; nombre: string };

export function getSesion(): Sesion | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Sesion) : null;
  } catch {
    return null;
  }
}

export function iniciarSesion(email: string, nombre: string) {
  window.localStorage.setItem(KEY, JSON.stringify({ email, nombre }));
}

export function cerrarSesion() {
  window.localStorage.removeItem(KEY);
}