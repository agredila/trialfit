interface TrialFitLogoProps {
  /** light = white text (hero); dark = navy text (scrolled sections) */
  variant?: "light" | "dark";
  className?: string;
}

export function TrialFitLogo({ variant = "light", className = "" }: TrialFitLogoProps) {
  const isLight = variant === "light";

  return (
    <a
      href="#home"
      className={`flex items-center gap-2 ${className}`}
      aria-label="TrialFit — Home"
    >
      <span
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF8A34] text-sm font-bold text-white"
        style={{ fontFamily: "Sora, sans-serif" }}
      >
        TF
      </span>
      <span
        className={`text-xl font-bold tracking-tight ${isLight ? "text-white" : "text-[#0B1B3B]"}`}
        style={{ fontFamily: "Sora, sans-serif" }}
      >
        Trial<span className="text-[#FF8A34]">Fit</span>
      </span>
    </a>
  );
}
