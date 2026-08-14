import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PageLoaderProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

export function PageLoader({ onComplete, forceShow = false }: PageLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING CAD SYSTEM");

  const loaderRef = useRef<HTMLDivElement>(null);
  const svgPathRef = useRef<SVGPathElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Check if previously loaded in this session to keep user experience fast
    const hasLoaded = sessionStorage.getItem("ina_loader_shown");
    if (hasLoaded && !forceShow) {
      setIsVisible(false);
      onComplete?.();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("ina_loader_shown", "true");
          gsap.to(loaderRef.current, {
            yPercent: -100,
            duration: 0.8,
            ease: "power4.inOut",
            onComplete: () => {
              setIsVisible(false);
              onComplete?.();
            },
          });
        },
      });

      // 1. SVG Path stroke length calculation
      const pathEl = svgPathRef.current;
      if (pathEl) {
        const length = pathEl.getTotalLength() || 3000;
        gsap.set(pathEl, {
          strokeDasharray: length,
          strokeDashoffset: length,
          fillOpacity: 0,
        });

        // Animate stroke drawing
        tl.to(pathEl, {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: "power2.inOut",
        });

        // Reveal metallic gradient fill
        tl.to(
          pathEl,
          {
            fillOpacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4",
        );
      }

      // Animate progress count 0 -> 100%
      const counterObj = { val: 0 };
      tl.to(
        counterObj,
        {
          val: 100,
          duration: 1.6,
          ease: "power2.inOut",
          onUpdate: () => {
            const curr = Math.round(counterObj.val);
            setProgress(curr);
            if (curr > 75) setStatusText("SYSTEM READY // ACCESS GRANTED");
            else if (curr > 45) setStatusText("CALIBRATING BIOMETRIC TELEMETRY");
            else if (curr > 20) setStatusText("DRAFTING ARCHITECTURAL HUD");
          },
        },
        0,
      );

      // Logo gentle scale and pulse
      if (logoWrapperRef.current) {
        tl.fromTo(
          logoWrapperRef.current,
          { scale: 0.94, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.4)" },
          0,
        );
      }
    }, loaderRef);

    return () => ctx.revert();
  }, [forceShow, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#121316] text-white select-none overflow-hidden"
    >
      {/* Blueprint Grid & Precision Guidelines */}
      <div className="pointer-events-none absolute inset-0 illustrator-grid-lines opacity-40" />

      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-white/15 to-transparent" />

      {/* Crosshairs at Screen Corners */}
      <span className="absolute top-6 left-6 font-mono text-xs text-white/30 font-bold">+</span>
      <span className="absolute top-6 right-6 font-mono text-xs text-white/30 font-bold">+</span>
      <span className="absolute bottom-6 left-6 font-mono text-xs text-white/30 font-bold">+</span>
      <span className="absolute bottom-6 right-6 font-mono text-xs text-white/30 font-bold">+</span>

      {/* Center Logo Blueprint Frame */}
      <div
        ref={logoWrapperRef}
        className="relative z-10 flex flex-col items-center max-w-lg w-full px-6 space-y-6"
      >
        {/* Technical Coordinate Tag */}
        <div className="flex items-center gap-2 rounded-[4px] border border-white/10 bg-[#18191f] px-3 py-1 text-[10px] font-mono text-purple-300 uppercase tracking-widest shadow-md">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-ping" />
          <span>INA FITNESS OS // LOADER ENGINE</span>
        </div>

        {/* Official SVG Logo with Animated Stroke Draw */}
        <div className="relative w-full py-4 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 920.7 150.95"
            className="w-full h-auto max-h-24 filter drop-shadow-[0_0_25px_rgba(168,85,247,0.35)]"
          >
            <defs>
              <linearGradient
                id="loaderLogoGrad"
                x1="586.88"
                y1="-242.12"
                x2="38.12"
                y2="1210.93"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#ffffff" />
                <stop offset="0.6" stopColor="#d8b4fe" />
                <stop offset="1" stopColor="#a855f7" />
              </linearGradient>
            </defs>
            <path
              ref={svgPathRef}
              fill="url(#loaderLogoGrad)"
              stroke="#a855f7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M460.14,20.77c0-.3-.24-.54-.54-.54h-.03c-.3,0-.54.24-.54.54v116.13c0,.3.24.54.54.54h.03c.3,0,.54-.24.54-.54V20.77M544.46,74.68l.11,12.56v6.8c-.01.21.14.38.34.41l.56.08,14.71.08c.2,0,.36-.14.4-.33.15-.75.22-1.51.24-2.26.21-10.64.13-21.3-.24-31.94.28-4.21.38-7.23.32-9.08-.32-9.21-.6-12.72-.09-19.12.01-.18-.13-.33-.3-.33h-15.59c-.22,0-.4.18-.4.4l-.07,42.73M608.71,72.85l-.26,21.22c0,.38.3.7.69.7h14.98c.2,0,.36-.16.38-.36.38-8.08.33-16.16-.15-24.24.28-2.72.4-4.58.34-5.6-.35-6.17-.4-12.42-.15-18.76.02-.52.62-.81,1.05-.51l58.97,42.57,8.68,6.53c.44.33.98.51,1.53.51h22.16c.32,0,.59-.25.6-.58.15-3.74.2-7.95.15-12.64-.03-3.2-.46-7.66-.39-11.53.84-4.74-.21-9.3.03-13.97.17-3.31.18-7.19.04-11.64-.14-4.32.19-7.98.13-12.5,0-.26-.22-.48-.49-.48h-14.98c-.19,0-.34.16-.34.34.13,3.61.48,6.82.28,10.26-.38,6.66-.09,13.69-.21,21.27-.05,2.86-.05,5.76-.01,8.68l.35,9.24c.01.34-.24.64-.58.67-.46.05-.95-.1-1.44-.46-1.89-1.35-3.7-2.73-5.44-4.13-4.24-3.1-8.45-6.19-12.62-9.26-2.14-1.58-4.31-2.98-6.49-4.22-.19-.11-.37-.24-.53-.41-.85-.89-2.36-2.1-4.54-3.65-2.28-1.63-8.55-6.16-18.8-13.6-2.74-1.99-5.36-3.31-7.91-5.42-3.85-3.2-7.83-5.93-12.25-9.11-.26-.19-.57-.28-.89-.28h-21.45c-.22,0-.41.19-.41.41l-.02,40.94M764.5,94.53l16.9.1c.65.15,1.08.07,1.26-.21,3.88-6.01,7.88-11.95,12.01-17.84,1.55-2.22,2.52-4.17,3.99-6.14,1.12-1.49,2.16-2.99,3.12-4.51,3.88-6.05,8.55-13.04,14.01-20.99.1-.15.26-.23.44-.23h6.47c.19,0,.36.09.46.25l24.3,37.2c.96.99,1.83,2.12,2.61,3.37,1.65,2.67,3.35,5.5,5.12,8.48.32.54.91.87,1.54.85l17.39-.34c.11.07.27.09.47.06.16-.02.24-.21.15-.33l-7.42-10.42-5.95-8.72c-1.15-1.89-2.3-3.9-3.54-5.59-2.18-2.96-4.29-5.98-6.33-9.04-6.34-9.55-12.27-17.68-20.03-28.65-.13-.19-.34-.3-.58-.3h-23.19c-.46,0-.89.22-1.15.6-2.76,3.94-5.13,7.45-7.11,10.52-2.56,3.97-5.44,7.42-7.78,11.13-1.26,2-2.53,3.96-3.83,5.87-8,11.8-15.93,23.25-23.8,34.36-.17.23-.13.42.11.56.08.05.21.04.37-.03M19.58,125.11c7.41-.18,14.52-.21,21.32-.09,5.56.1,9.43.02,11.62-.24,4.03-.48,7.79-1.4,11.28-2.76,2.26-.88,4.59-2.24,7.02-4.06,1.48-.75,2.72-1.64,3.7-2.66l3.41-3.74c6.65-6.69,13.28-13.32,19.92-19.92,3.14-3.12,6.58-6.85,10.44-10.5,3.26-3.09,8.53-8.43,15.8-16,1.98-2.07,3.47-3.54,4.44-4.41,3.84-3.43,6.79-6.95,10.57-9.73,3.85-2.82,6.9-5.25,10.98-6.63.09-.03.15-.12.13-.21-.01-.09-.09-.16-.19-.16-7.84.1-19.67.12-35.49.06-5.3-.03-9.3,1.33-14.46,3.57-3.6,1.55-6.77,3.79-9.5,6.7-1.67,1.78-12.21,12.58-31.6,32.4-9.41,9.62-18.82,19.2-28.22,28.75-1.91,1.94-3.71,3.61-5.41,5.01-1.78,1.48-3.7,3.01-5.76,4.61M110.18,124.98c3.43.17,6.91.19,10.42.05,3.44-.13,6.12-.17,8.04-.1,6.46.22,12.82.03,19.17-1.45,2.98-.69,5.34-1.6,7.05-2.71,4.31-2.78,7.22-4.26,9.12-6.42l10.13-10.41,2.53-2.42c8-8.03,16.01-15.96,24.03-23.8,7.34-7.17,12.02-12.29,19.9-20.23,2.26-2.28,4.23-3.65,6.3-5.61,3.29-3.1,7.78-5.72,11.79-7.41.26-.11.17-.49-.11-.48-5.23.16-10.9.17-17.02.05-4.86-.1-11.09,0-18.69.3-2.61.11-4.73.38-6.36.82-3.22.87-6.5,2.3-9.84,4.29-2.14,1.28-4.84,3.61-8.1,7.01-9.4,9.78-28.89,28.9-42.8,43.39-4.94,5.15-9.85,10.16-14.74,15.04-4.08,4.08-7.54,6.79-11.96,9.56-.22.14-.13.48.13.49l1,.03M198.52,124.09c-1.24.54-.88.93,1.07,1.16.9.1,1.87.14,2.9.11,4.85-.15,9.67-.21,14.47-.18,2.91.01,5.76-.37,9.71-.74,6.9-.65,12.8-2.87,17.7-6.66,2.34-1.36,4.24-3.08,5.7-5.18l3.58-3.51c11.18-10.8,22.02-21.96,33.14-32.81,1.12-1.09,2.6-2.63,4.43-4.61,6.18-6.66,15.81-10.99,24.64-10.25,4.45.37,9.03,1.8,13.75,4.28,1.14.6,2.05,1.22,2.71,1.86,4.62,4.46,11.65,11.43,17.78,17.84,2.1,2.2,4.24,4.38,6.42,6.53.96.95,4.16,4.22,9.59,9.81,3.25,3.35,6.61,6.67,10.06,9.94l11.1,11.3c.41.42.96.67,1.54.73l16.39,1.46c.38.03.59-.42.32-.69l-2.75-2.79c-11.17-11.31-22.29-22.55-33.37-33.72-3.02-3.04-5.62-5.15-7.95-7.91-1.49-1.77-3.52-3.82-6.1-6.15-2.77-2.51-5.13-5.68-8.24-8.65-3.6-3.43-7.09-7.46-10.91-10.9-3.35-3.02-6.83-5.67-9.98-6.64-2.36-.73-4.37-1.37-6.02-1.93-7.18-2.42-14.12-1.55-20.39-1.66-9.51-.16-15.76.77-23.62,5.03-1.94,1.05-4.15,2.82-6.64,5.29-8.77,8.71-15.93,15.96-21.48,21.77-.34.36-1.36,1.38-3.04,3.07-.62.62-13.81,13.89-39.58,39.81-1.18,1.19-3.49,2.86-6.93,5M820.65,117.18c-1.6-1.55-3.58-2.41-5.94-2.55-3.78-.22-9.8.68-8.7,6.09.68,3.34,7.14,3.57,10.19,3.96.93.12,1.94.56,3.04,1.34.19.13.32.32.38.54.55,1.86.05,3.1-1.5,3.73-3.45,1.4-9.02,1.54-11.5-1.94-.24-.34-.73-.38-1.03-.09l-.31.31c-.27.27-.31.7-.09,1.02,2.75,3.95,9.59,3.72,13.55,2.18,2.05-.79,2.91-2.11,3.08-4.3.22-2.96-3.14-4.25-5.54-4.5-2.38-.24-4.34-.49-5.88-.74-1.37-.22-2.2-.88-2.51-1.96-.38-1.34.42-2.69,1.67-3.14,2.68-.95,7.49-1.28,9.53,1.35.28.36.81.39,1.12.07l.46-.45c.25-.25.25-.66,0-.91M874.46,117.48c-2.83-3.24-7.66-3.41-11.47-2.26-4.29,1.3-4.88,6.93-.26,8.28,1.82.54,3.76.88,5.8,1.05.86.07,1.61.21,2.24.41,1.22.39,1.91.69,2.06.88,1.08,1.38,1.05,2.59-.09,3.65-1.51,1.4-3.83,1.54-5.91,1.6-2.78.09-4.91-.79-6.39-2.63-.28-.36-.82-.42-1.18-.12l-.03.02c-.34.28-.4.79-.12,1.14,2.94,3.7,8.61,3.94,12.68,2.64,2.48-.79,3.72-2.34,3.73-4.65.01-4.73-7.32-4.76-10.58-5.23-2.32-.32-4.82-1.88-2.79-4.23,1.02-1.18,2.87-1.42,4.56-1.54,2.64-.19,4.74.52,6.28,2.12.26.27.69.27.95,0l.46-.46c.19-.19.19-.48.03-.67M600.14,115.43c0-.31-.25-.55-.56-.55h-.75c-.31,0-.55.25-.55.56l.03,16.58c0,.31.25.55.56.55h.75c.31,0,.55-.25.55-.56l-.03-16.58M702.95,124.5c3.08,3.14,5.61,5.77,7.61,7.88.15.17.36.28.58.32.23.05.6.06,1.11.04.22-.01.4-.19.4-.42v-16.72c0-.34-.27-.61-.61-.61h-.72c-.36,0-.64.28-.64.64.06,7.03.07,11.39.03,13.07,0,.21-.03.34-.06.4-.13.21-.42.24-.59.06-1.92-2.06-3.81-4.04-5.68-5.95-3.08-3.14-5.61-5.76-7.61-7.88-.15-.17-.36-.28-.58-.32-.23-.05-.6-.06-1.11-.04-.22.01-.4.2-.4.42v16.72c0,.34.27.61.61.61h.72c.35,0,.64-.28.64-.64-.06-7.03-.07-11.39-.03-13.07,0-.21.02-.34.06-.4.13-.21.42-.24.59-.06,1.92,2.06,3.81,4.04,5.68,5.95M768.23,131.31c.02-.18-.12-.33-.3-.33h-13.04c-.17,0-.3-.14-.3-.3v-6.08c0-.17.14-.3.3-.3h10.82c.17,0,.3-.14.3-.3v-.89c0-.17-.14-.3-.3-.3h-10.72c-.17,0-.3-.14-.3-.3v-5.52c0-.17.14-.3.3-.3h12.46c.17,0,.3-.14.3-.3v-1.07c0-.17-.14-.3-.3-.3h-14.29c-.17,0-.3.14-.3.3v16.85c0,.17.14.3.3.3h14.68c.16,0,.29-.12.3-.28l.07-.86M559.68,116.6c.16,0,.3-.13.31-.28l.09-.97c.01-.18-.13-.34-.31-.34h-14.04c-.17,0-.31.14-.31.31v16.96c0,.17.14.31.31.31h.99c.17,0,.31-.14.31-.31v-7.69c0-.17.14-.31.31-.31h11.09c.16,0,.3-.13.31-.28l.07-.84c.02-.18-.13-.34-.3-.34h-11.1c-.17,0-.31-.14-.31-.31v-5.59c0-.17.14-.31.31-.31h12.27M647.93,132.62c.23,0,.4-.04.5-.13.13-.09.2-.24.2-.4l.13-15.08c0-.24.2-.44.44-.44h6.76c.36,0,.67-.27.71-.64l.03-.22c.01-.34-.26-.63-.6-.64-3.05-.06-5.8-.09-8.26-.09-2.46.03-5.21.08-8.26.17-.34.01-.61.3-.6.64l.03.22c.04.36.35.63.72.63l6.76-.07c.24,0,.44.19.44.44l.28,15.08c0,.16.07.31.2.4.11.09.28.13.5.12h0Z"
            />
          </svg>
        </div>

        {/* Progress Bar & Telemetry */}
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-purple-300 tracking-wider">{statusText}</span>
            <span ref={progressTextRef} className="font-bold text-white">
              {progress}%
            </span>
          </div>

          {/* Blueprint Progress Track */}
          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden border border-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-white transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
