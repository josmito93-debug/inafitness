import { Link } from "@tanstack/react-router";
import { InaLogoSvg } from "@/components/ina/InaLogoSvg";
import { cn } from "@/lib/utils";

export function Logo({ className, to = "/" }: { className?: string; to?: string }) {
  return (
    <Link
      to={to}
      className={cn(
        "group inline-flex items-center transition-opacity duration-300 hover:opacity-80",
        className,
      )}
      aria-label="INA Fitness — inicio"
    >
      <InaLogoSvg className="h-6 w-auto sm:h-7" />
    </Link>
  );
}
