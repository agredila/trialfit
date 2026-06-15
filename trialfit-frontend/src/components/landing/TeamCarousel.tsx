import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, type ReactNode } from "react";
import { landingAssets } from "../../assets/landing";
import { MaskedImage } from "./AnimatedHeading";

const TT_HOVES = '"TT Hoves", "Helvetica Neue", Helvetica, Arial, sans-serif';

const GAP = 11.26;
const INTRO_WIDTH = 324;
const VISIBLE = 3.25;

const TEAM = [
  { img: landingAssets.boxingBuddy, role: "BOXING COACH", name: "Raka Pratama" },
  { img: landingAssets.hijabBuddy, role: "WEIGHT-LOSS BUDDY", name: "Hana Salsabila" },
  { img: landingAssets.manGymBuddy, role: "STRENGTH COACH", name: "Bayu Saputra" },
  { img: landingAssets.womanGymBuddy, role: "MOBILITY & RECOVERY", name: "Dewi Anggraini" },
];

interface TeamCarouselProps {
  intro: ReactNode;
}

export function TeamCarousel({ intro }: TeamCarouselProps) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const maxIndex = Math.max(0, Math.ceil(TEAM.length - VISIBLE));

  const cardWidth = `calc((100% - ${(TEAM.length - 1) * GAP}px) / ${TEAM.length})`;
  const trackWidth = `calc(${TEAM.length} * ((100% - ${(VISIBLE - 1) * GAP}px) / ${VISIBLE}) + ${(TEAM.length - 1) * GAP}px)`;
  const trackX = `calc(${-index} * (100% + ${GAP}px) / ${TEAM.length})`;

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex" style={{ gap: GAP }}>
        <div className="shrink-0" style={{ width: INTRO_WIDTH }}>
          {intro}
        </div>

        <div className="relative min-w-0 flex-1 overflow-hidden">
          <motion.div
            className="flex"
            style={{ gap: GAP, width: trackWidth }}
            animate={{ x: trackX }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {TEAM.map((member, i) => (
              <div
                key={`${member.name}-${i}`}
                className="shrink-0"
                style={{ width: cardWidth, fontFamily: TT_HOVES }}
              >
                <div className="aspect-[3/4] overflow-hidden bg-landing-muted">
                  <MaskedImage
                    src={member.img}
                    alt={member.name}
                    className="h-full w-full"
                    delay={i * 0.08}
                  />
                </div>
                <div className="pt-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-landing-muted-foreground">
                    {member.role}
                  </p>
                  <p className="mt-2 text-xl font-medium">{member.name}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute left-1/2 top-[35%] z-10 -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="flex cursor-pointer items-center justify-center gap-4 rounded-full"
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
