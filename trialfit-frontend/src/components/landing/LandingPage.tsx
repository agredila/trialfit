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
    <section id="home" className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden md:min-h-[780px]">
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

      <div className="relative z-10 flex w-full flex-col items-center justify-center px-4 pt-24 text-center sm:px-8 md:px-12 md:pt-0">
        <AnimatedHeading as="h1" className="font-medium leading-[1.05] text-white">
          <span className="block text-[clamp(1.75rem,6.5vw,4.5rem)] leading-[1.05]">
            Find your gym buddy and
            <br />
            finally stick to your fitness goals
          </span>
        </AnimatedHeading>

        <div className="mt-8 flex w-full max-w-md flex-col items-stretch gap-4 sm:mt-10 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-6">
          <button
            type="button"
            onClick={onSelectSeeker}
            className="flex min-h-[48px] items-center justify-center gap-3 rounded-full bg-white py-2 pl-6 pr-2 text-sm font-medium text-landing-foreground transition hover:bg-white/90 sm:justify-start"
          >
            I&apos;m a Gym Seeker
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-landing-foreground text-white">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </button>
          <button
            type="button"
            onClick={onSelectBuddy}
            className="flex min-h-[48px] items-center justify-center gap-1 text-sm font-medium text-white transition hover:text-white/90 sm:justify-start"
          >
            I&apos;m a Gym Buddy
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="absolute inset-x-4 bottom-8 sm:inset-x-8 sm:bottom-16 md:inset-x-12">
        <div
          className="flex flex-col gap-2 border-t border-white/20 pt-4 uppercase tracking-[0.2em] text-white/70 sm:flex-row sm:items-center sm:justify-between sm:pt-5"
          style={{ fontSize: "12px" }}
        >
          <span>Gym Buddy Marketplace</span>
          <span className="hidden sm:inline">Scroll to Explore</span>
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section
      id="find-a-buddy"
      className="landing-section scroll-mt-28 w-full min-w-0 overflow-x-clip px-4 py-16 sm:px-6 md:py-32 lg:px-12"
      style={{ fontFamily: TT_HOVES }}
    >
      <div className="lg:pl-[335px]">
        <div
          className="mb-8 uppercase tracking-[0.2em] text-landing-muted-foreground md:mb-16"
          style={{ fontSize: "11.26px", fontFamily: TT_HOVES }}
        >
          <span>Meet the Buddies</span>
        </div>

        <AnimatedHeading className="font-medium leading-[1.05]">
          <span
            className="block text-[clamp(1.75rem,5vw,3.65rem)] leading-[1.05]"
            style={{ fontFamily: TT_HOVES }}
          >
            Get to know the partners
            <br />
            who train right beside you
          </span>
        </AnimatedHeading>
      </div>

      <div className="mt-12 md:mt-20">
        <TeamCarousel
          intro={
            <AnimatedText className="leading-relaxed text-landing-muted-foreground">
              <span
                className="block max-w-none text-base leading-relaxed md:max-w-[270px] md:text-[16.89px]"
                style={{ fontFamily: TT_HOVES }}
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
    <section
      id="how-it-works"
      className="landing-section scroll-mt-28 w-full min-w-0 bg-landing-surface px-4 py-12 sm:px-6 sm:py-16 lg:px-12 lg:py-32"
    >
      <div className="mb-8 flex w-full min-w-0 flex-col gap-5 lg:mb-24 lg:grid lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-7">
          <AnimatedHeading className="text-[1.75rem] font-medium leading-[1.08] sm:text-4xl lg:text-5xl xl:text-6xl">
            What is TrialFit?
          </AnimatedHeading>
        </div>
        <div className="min-w-0 lg:col-span-4 lg:col-start-9 lg:pt-2">
          <AnimatedText className="text-sm leading-relaxed text-landing-muted-foreground sm:text-base">
            TrialFit is a gym buddy marketplace for Indonesia — connect with verified coaches and
            training partners at apartment and campus gyms, book sessions that fit your schedule,
            and get affordable guidance without a long-term membership.
          </AnimatedText>
        </div>
      </div>

      <div className="landing-benefits-grid relative grid w-full min-w-0 grid-cols-1 lg:grid-cols-3">
        {BENEFITS.map((item, i) => (
          <div
            key={item.num}
            className="landing-benefits-card flex w-full min-w-0 flex-col gap-4 px-0 py-6 sm:py-8 lg:gap-8 lg:p-10"
          >
            <div className="min-w-0">
              <p className="mb-2 text-xs text-landing-muted-foreground">({item.num})</p>
              <AnimatedHeading
                as="h3"
                className="text-lg font-medium leading-snug sm:text-xl lg:text-2xl xl:text-3xl"
                delay={i * 0.1}
              >
                {item.title}
              </AnimatedHeading>
              <AnimatedText
                className="mt-3 text-sm leading-relaxed text-landing-muted-foreground sm:text-[15px]"
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
  return (
    <div
      className="landing-page overflow-x-clip bg-landing-background text-landing-foreground antialiased"
      data-app-mounted
    >
      <Header />
      <main className="w-full min-w-0">
        <Hero onSelectSeeker={onSelectSeeker} onSelectBuddy={onSelectBuddy} />
        <BenefitsSection />
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
}
