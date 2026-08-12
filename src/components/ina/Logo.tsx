import { Link } from "@tanstack/react-router";
import logo from "@/assets/ina-logo.png.asset.json";
import { cn } from "@/lib/utils";

export function Logo({ className, to = "/" }: { className?: string; to?: string }) {
  return (
    <Link
      to={to}
      className={cn(
        "group inline-flex items-center transition-opacity duration-500 hover:opacity-80",
        className,
      )}
      aria-label="INA Fitness — inicio"
    >
      <img
        src={logo.url}
        alt="INA Fitness"
        className="h-9 w-auto object-contain md:h-11"
        width={320}
        height={90}
      />
    </Link>
  );
}