import { useEffect, useRef } from "react";
import gsap from "gsap";

export function AmbientBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#121316]"
      aria-hidden="true"
    >
      {/* Subtle flat architecture grid for texture & depth */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />
    </div>
  );
}
