import { Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { TrialFitLogo } from "./TrialFitLogo";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Find a Buddy", href: "#find-a-buddy" },
  { label: "Contact", href: "#contact" },
] as const;

const navLinkClass = (active: boolean) =>
  `relative rounded-full px-5 py-2 text-sm transition ${
    active ? "font-medium" : "opacity-80 hover:opacity-100"
  }`;

export function Header() {
  const [logoDark, setLogoDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>(NAV_ITEMS[0].href);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && NAV_ITEMS.some((item) => item.href === hash)) {
      setActiveHref(hash);
    }
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.href.slice(1))).filter(
      (el): el is HTMLElement => el != null
    );

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveHref(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.1, 0.25, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setLogoDark(window.scrollY > window.innerHeight - 80);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="fixed left-0 right-0 top-4 z-50 flex items-center justify-between px-4 sm:top-6 sm:px-8">
      <TrialFitLogo variant={logoDark ? "dark" : "light"} />

      <div className="relative">
        <nav
          className="flex items-center gap-1 rounded-full py-2 pl-2 pr-2 text-white backdrop-blur-md"
          style={{ background: "var(--landing-header-bg)" }}
        >
          <div className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => {
              const active = activeHref === item.href;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setActiveHref(item.href)}
                  className={navLinkClass(active)}
                >
                  {active && (
                    <motion.span
                      layoutId="landing-nav-pill"
                      className="absolute inset-0 rounded-full bg-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </div>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm transition hover:bg-white/10 md:hidden"
          >
            <Menu className="h-4 w-4" />
            Menu
          </button>
        </nav>

        {menuOpen && (
          <>
            <button
              type="button"
              aria-label="Close menu overlay"
              className="fixed inset-0 bg-black/40 md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <nav
              id="mobile-nav-menu"
              className="absolute right-0 top-full z-50 mt-2 flex min-w-[220px] flex-col gap-1 rounded-2xl p-2 text-white shadow-lg backdrop-blur-md md:hidden"
              style={{ background: "var(--landing-header-bg)" }}
            >
              {NAV_ITEMS.map((item) => {
                const active = activeHref === item.href;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => {
                      setActiveHref(item.href);
                      setMenuOpen(false);
                    }}
                    className={navLinkClass(active)}
                  >
                    {active && (
                      <motion.span
                        layoutId="landing-nav-pill-mobile"
                        className="absolute inset-0 rounded-full bg-white/10"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </a>
                );
              })}
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="mt-1 flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition hover:bg-white/10"
              >
                <X className="h-4 w-4" />
                Close
              </button>
            </nav>
          </>
        )}
      </div>
    </header>
  );
}
