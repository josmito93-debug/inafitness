import { useEffect, useRef } from "react";
import gsap from "gsap";

interface AnimatedCounterProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.2,
  className = "",
}: AnimatedCounterProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        if (node) {
          node.textContent = `${prefix}${obj.val.toFixed(decimals)}${suffix}`;
        }
      },
    });
  }, [value, decimals, prefix, suffix, duration]);

  return (
    <span ref={nodeRef} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
