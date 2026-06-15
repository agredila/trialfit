import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { AnimatedHeading, AnimatedText } from "./AnimatedHeading";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { TeamCarousel } from "./TeamCarousel";

const TT_HOVES = '"TT Hoves", "Helvetica Neue", Helvetica, Arial, sans-serif';

const BENEFITS = [
  {
    num: "01",
    title: "We pair you with the right workout partner",
    desc: "Tell us your gym, your schedule, and your goal — our matching system connects you with a verified buddy who fits, so you never train alone again.",
  },
  {
    num: "02",
    title: "Train with guidance, not guesswork",
    desc: "Every buddy is rated and trusted by the community. Get the accountability and know-how of a partner without the price tag of a personal trainer.",
  },
  {
    num: "03",
    title: "Pay only for the sessions you need",
    desc: "No lock-in memberships. Book per session and pay in seconds with GoPay, OVO, or DANA — or redeem your reward vouchers.",
  },
] as const;

function applyResponsiveZoom() {
  const w = document.documentElement.clientWidth;
  const z = w < 1728 ? w / 1728 : 1;
  document.documentElement.style.zoom = String(z);
}

interface LandingPageProps {
  onSelectSeeker: () => void;
  onSelectBuddy: () => void;
}

function Hero({
  onSelectSeeker,
  onSelectBuddy,
}: {
  onSelectSeeker: () => void;
  onSelectBuddy: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Some browsers ignore loop when using a nested <source>; set it on the element.
    video.loop = true;
    video.muted = true;

    const restart = () => {
      video.currentTime = 0;
      void video.play().catch(() => {});
    };

    video.addEventListener("ended", restart);

    const tryPlay = () => {
      if (video.paused) void video.play().catch(() => {});
    };
    video.addEventListener("canplay", tryPlay, { once: true });

    return () => video.removeEventListener("ended", restart);
  }, []);

  return (
    <section id="home" className="relative flex h-screen min-h-[780px] w-full flex-col items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        src="/hero-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        aria-label="Gym buddy coaching a session"
      />
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      <div className="relative z-10 flex w-full flex-col items-center justify-center px-8 text-center md:px-12">
        <AnimatedHeading as="h1" className="font-medium leading-[1.05] text-white">
          <span style={{ fontSize: "72.73px", lineHeight: 1.05, display: "block" }}>
            Find your gym buddy and
            <br />
            finally stick to your fitness goals
          </span>
        </AnimatedHeading>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={onSelectSeeker}
            className="flex items-center gap-3 rounded-full bg-white py-2 pl-6 pr-2 text-sm font-medium text-landing-foreground transition hover:bg-white/90"
          >
            I&apos;m a Gym Seeker
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-landing-foreground text-white">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </button>
          <button
            type="button"
            onClick={onSelectBuddy}
            className="flex items-center gap-1 text-sm font-medium text-white transition hover:text-white/90"
          >
            I&apos;m a Gym Buddy
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="absolute inset-x-8 bottom-16 md:inset-x-12">
        <div
          className="flex items-center justify-between border-t border-white/20 pt-5 uppercase tracking-[0.2em] text-white/70"
          style={{ fontSize: "12px" }}
        >
          <span>Gym Buddy Marketplace</span>
          <span>Scroll to Explore</span>
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section id="find-a-buddy" className="scroll-mt-28 px-8 py-32 md:px-12" style={{ fontFamily: TT_HOVES }}>
      <div style={{ paddingLeft: "335.26px" }}>
        <div
          className="mb-16 uppercase tracking-[0.2em] text-landing-muted-foreground"
          style={{ fontSize: "11.26px", fontFamily: TT_HOVES }}
        >
          <span>Meet the Buddies</span>
        </div>

        <AnimatedHeading className="font-medium leading-[1.05]">
          <span
            style={{
              fontSize: "58.55px",
              lineHeight: 1.05,
              display: "block",
              fontFamily: TT_HOVES,
            }}
          >
            Get to know the partners
            <br />
            who train right beside you
          </span>
        </AnimatedHeading>
      </div>

      <div className="mt-20">
        <TeamCarousel
          intro={
            <AnimatedText className="leading-relaxed text-landing-muted-foreground">
              <span
                style={{
                  fontSize: "16.89px",
                  lineHeight: 1.5,
                  display: "block",
                  width: "270px",
                  fontFamily: TT_HOVES,
                }}
              >
                Every TrialFit buddy is verified, rated, and chosen for consistency. They're real
                gym-goers who train alongside you — keeping you accountable, motivated, and safe from
                your very first session.
              </span>
            </AnimatedText>
          }
        />
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section id="how-it-works" className="scroll-mt-28 bg-landing-surface px-8 py-32 md:px-12">
      <div className="mb-24 grid grid-cols-12 gap-12">
        <div className="col-span-12 md:col-span-7">
          <AnimatedHeading className="text-5xl font-medium leading-[1.05] md:text-6xl">
            What is TrialFit?
          </AnimatedHeading>
        </div>
        <div className="col-span-12 md:col-span-4 md:col-start-9 md:pt-4">
          <AnimatedText className="text-base leading-relaxed text-landing-muted-foreground">
            TrialFit is a gym buddy marketplace for Indonesia — connect with verified coaches and
            training partners at apartment and campus gyms, book sessions that fit your schedule,
            and get affordable guidance without a long-term membership.
          </AnimatedText>
        </div>
      </div>

      <div
        className="relative grid grid-cols-1 md:grid-cols-3"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.45) 1px, transparent 1px)",
          backgroundSize: "1px 100%, 1px 100%",
          backgroundPosition: "33.3333% 0, 66.6666% 0",
          backgroundRepeat: "no-repeat",
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.45) 15%, rgba(255,255,255,0.45) 85%, transparent 100%)",
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.45) 15%, rgba(255,255,255,0.45) 85%, transparent 100%)",
          }}
        />

        {BENEFITS.map((item, i) => (
          <div key={item.num} className="flex flex-col gap-8 p-10">
            <div>
              <div className="mb-4 flex items-start gap-3">
                <span className="mt-2 text-xs text-landing-muted-foreground">({item.num})</span>
                <AnimatedHeading as="h3" className="text-3xl font-medium" delay={i * 0.1}>
                  {item.title}
                </AnimatedHeading>
              </div>
              <AnimatedText
                className="max-w-sm text-sm leading-relaxed text-landing-muted-foreground"
                delay={0.2 + i * 0.1}
              >
                {item.desc}
              </AnimatedText>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function LandingPage({ onSelectSeeker, onSelectBuddy }: LandingPageProps) {
  useEffect(() => {
    applyResponsiveZoom();
    window.addEventListener("resize", applyResponsiveZoom);
    return () => {
      window.removeEventListener("resize", applyResponsiveZoom);
      document.documentElement.style.zoom = "1";
    };
  }, []);

  return (
    <div
      className="landing-page bg-landing-background text-landing-foreground antialiased"
      data-app-mounted
    >
      <Header />
      <main>
        <Hero onSelectSeeker={onSelectSeeker} onSelectBuddy={onSelectBuddy} />
        <BenefitsSection />
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
}
