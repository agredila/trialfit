import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { TrialFitLogo } from "./TrialFitLogo";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Find a Buddy", href: "#find-a-buddy" },
  { label: "Contact", href: "#contact" },
] as const;

const navLinkClass = (active: boolean) =>
  `relative block rounded-full px-5 py-2.5 text-sm transition ${
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

  const handleNavClick = (href: string) => {
    setActiveHref(href);
    setMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full">
      <div className="mx-auto flex w-full max-w-[1728px] items-center justify-between px-4 py-4 sm:px-6 lg:px-12">
        <TrialFitLogo variant={logoDark ? "dark" : "light"} />

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-1 rounded-full py-2 pl-2 pr-2 text-white backdrop-blur-md lg:flex"
          style={{ background: "var(--landing-header-bg)" }}
          aria-label="Main navigation"
        >
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
        </nav>

        {/* Mobile toggle — icon only */}
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white backdrop-blur-md transition hover:bg-white/10 lg:hidden"
          style={{ background: "var(--landing-header-bg)" }}
        >
          {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </div>

      {/* Mobile dropdown panel */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              id="mobile-nav-menu"
              className="fixed left-4 right-4 top-[4.5rem] z-50 flex flex-col gap-1 rounded-2xl p-2 text-white shadow-xl backdrop-blur-md lg:hidden"
              style={{ background: "var(--landing-header-bg)" }}
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            >
              {NAV_ITEMS.map((item) => {
                const active = activeHref === item.href;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => handleNavClick(item.href)}
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
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
