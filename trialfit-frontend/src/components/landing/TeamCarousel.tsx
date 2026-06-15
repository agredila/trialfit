import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { landingAssets } from "../../assets/landing";

const TT_HOVES = '"TT Hoves", "Helvetica Neue", Helvetica, Arial, sans-serif';

const GAP = 11.26;

const TEAM = [
  { img: landingAssets.boxingBuddy, role: "BOXING COACH", name: "Raka Pratama" },
  { img: landingAssets.hijabBuddy, role: "WEIGHT-LOSS BUDDY", name: "Hana Salsabila" },
  { img: landingAssets.manGymBuddy, role: "STRENGTH COACH", name: "Bayu Saputra" },
  { img: landingAssets.womanGymBuddy, role: "MOBILITY & RECOVERY", name: "Dewi Anggraini" },
];

function useVisibleCards() {
  const [visible, setVisible] = useState(3.25);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setVisible(1.12);
      else if (w < 1024) setVisible(2.1);
      else setVisible(3.25);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return visible;
}

function useContainerWidth(ref: React.RefObject<HTMLElement | null>) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => setWidth(el.getBoundingClientRect().width);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);

  return width;
}

interface TeamCarouselProps {
  intro: ReactNode;
}

export function TeamCarousel({ intro }: TeamCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const visible = useVisibleCards();
  const viewportWidth = useContainerWidth(viewportRef);

  const cardWidth =
    viewportWidth > 0 ? Math.max(0, (viewportWidth - (visible - 1) * GAP) / visible) : 0;
  const step = cardWidth + GAP;
  const maxIndex = Math.max(0, Math.ceil(TEAM.length - visible));

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const showControls = hovered || maxIndex > 0;

  return (
    <div
      className="relative w-full min-w-0 overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex w-full min-w-0 flex-col gap-8 md:flex-row md:gap-[11px]">
        <div className="w-full shrink-0 md:w-[324px]">{intro}</div>

        <div ref={viewportRef} className="relative min-w-0 flex-1 overflow-hidden">
          <motion.div
            className="flex will-change-transform"
            style={{ gap: GAP }}
            animate={{ x: cardWidth > 0 ? -index * step : 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {TEAM.map((member, i) => (
              <div
                key={`${member.name}-${i}`}
                className="shrink-0"
                style={{ width: cardWidth || undefined, fontFamily: TT_HOVES }}
              >
                <div className="aspect-[3/4] overflow-hidden bg-landing-muted">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="h-full w-full object-cover"
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>
                <div className="pt-4 md:pt-6">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-landing-muted-foreground sm:text-xs">
                    {member.role}
                  </p>
                  <p className="mt-1 text-lg font-medium md:mt-2 md:text-xl">{member.name}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-4 md:hidden">
        <button
          type="button"
          disabled={index === 0}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-landing-foreground/10 text-landing-foreground transition disabled:opacity-30"
          aria-label="Previous buddy"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          disabled={index >= maxIndex}
          onClick={() => setIndex((i) => Math.min(maxIndex, i + 1))}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-landing-foreground/10 text-landing-foreground transition disabled:opacity-30"
          aria-label="Next buddy"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {showControls && (
          <motion.div
            className="pointer-events-none absolute left-1/2 top-[35%] z-10 hidden -translate-x-1/2 -translate-y-1/2 md:block"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.85 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="pointer-events-auto flex cursor-pointer items-center justify-center gap-4 rounded-full"
              style={{
                width: 126,
                height: 126,
                background: "rgba(72, 72, 72, 0.16)",
                backdropFilter: "blur(84px)",
                WebkitBackdropFilter: "blur(84px)",
              }}
            >
              <button
                type="button"
                disabled={index === 0}
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                className="flex cursor-pointer items-center justify-center text-white transition disabled:cursor-default disabled:opacity-30"
                aria-label="Previous team member"
              >
                <ArrowLeft className="h-7 w-7" />
              </button>
              <button
                type="button"
                disabled={index >= maxIndex}
                onClick={() => setIndex((i) => Math.min(maxIndex, i + 1))}
                className="flex cursor-pointer items-center justify-center text-white transition disabled:cursor-default disabled:opacity-30"
                aria-label="Next team member"
              >
                <ArrowRight className="h-7 w-7" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
