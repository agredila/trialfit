import { TrialFitLogo } from "./TrialFitLogo";

const TT_HOVES = '"TT Hoves", "Helvetica Neue", Helvetica, Arial, sans-serif';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="scroll-mt-28 border-t border-white/10 bg-[#0B1B3B] text-white"
      style={{ fontFamily: TT_HOVES }}
    >
      <div className="px-8 py-16 md:px-12 md:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <TrialFitLogo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
              Your Gym Journey, Your Buddy — affordable gym buddies and coaches at gyms near you.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3 lg:gap-8">
            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                Company
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/90">
                PT TrialFit Digital Indonesia
              </p>
            </div>

            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                Alamat
              </h3>
              <address className="mt-4 not-italic text-sm leading-relaxed text-white/90">
                Jl. Sudirman Kav. 52–53
                <br />
                SCBD, Jakarta Selatan 12190
                <br />
                DKI Jakarta, Indonesia
              </address>
            </div>

            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                Contact
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-white/90">
                <li>
                  <a
                    href="tel:+6281234567890"
                    className="transition hover:text-[#FF8A34]"
                  >
                    +62 812-3456-7890
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hello@trialfit.id"
                    className="transition hover:text-[#FF8A34]"
                  >
                    hello@trialfit.id
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50">
            © {year} PT TrialFit Digital Indonesia. All rights reserved.
          </p>
          <nav
            className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/70"
            aria-label="Legal"
          >
            <a href="/terms" className="transition hover:text-white">
              Terms &amp; Conditions
            </a>
            <a href="/privacy" className="transition hover:text-white">
              Privacy Policy
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
