export function Ring({
  value,
  max,
  size = 168,
  stroke = 12,
  label,
  sublabel,
  color = "var(--gold)",
}: {
  value: number;
  max: number;
  size?: number;
  stroke?: number;
  label: string;
  sublabel?: string;
  color?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="oklch(1 0 0 / 8%)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - c * pct}
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1)" }}
        />
      </svg>
      <div className="absolute text-center">
        <p className="font-display text-3xl leading-none font-light">{label}</p>
        {sublabel && (
          <p className="mt-1 text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            {sublabel}
          </p>
        )}
      </div>
    </div>
  );
}
