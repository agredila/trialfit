# TrialFit — Conversation Log

> **Session log of key discussions and decisions. Append to this file after each session.**

---

## Session 2026-06-05 — Initial Setup & Design

### Context
User wants to build TrialFit — a gym buddy marketplace connecting Seekers with Buddies at private gyms.

### Key Decisions

#### Product Definition
- **Platform**: Responsive Web App (mobile-first)
- **Design Tool**: Google Stitch (https://stitch.withgoogle.com/)
- **Inspiration**: ClassPass (marketplace + booking feel)
- **Target**: 17-50 years old, mixed tech-savviness (Gen Z + 40+)
- **Brand**: Energetic, Trustworthy, Approachable, Modern

#### Color Palette
| Role | Hex |
|------|-----|
| Deep Navy | `#0B1B3B` |
| Blue | `#003F8C` |
| CTA Orange | `#FF8A34` |
| Accent Gold | `#FFD447` |
| Success Green | `#22C55E` |
| Slate Gray | `#94A3B8` |
| Light BG | `#F8FAFC` |

#### User Roles
| Role | Description |
|------|-------------|
| **Gym Seeker** | Books coaching sessions |
| **Gym Buddy** | Coaches with tiers: Silver (beginner) → Gold (experienced) → Pro (certified) |

#### Features Agreed
- User management (signup, verification, profile)
- Discovery & matching with filters
- Booking (single + package, reschedule, cancel)
- Payment via Xendit (escrow, payout H-1 per session)
- Post-session (rating, review, photo proof, trust score)
- Progress tracking (seeker dashboard)
- Buddy registration (4-step with e-sign)
- Admin panel (approval, transactions, refunds, reports)

#### Design Decisions
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-06-05 | Buddy profile: response hours, online coaching, client testimonials | Trust & expectation setting |
| 2026-06-05 | Escrow payment system | Protect both parties |
| 2026-06-05 | Admin SLA: 24h buddy approval | Speed + quality |
| 2026-06-05 | Zoom interview for non-certified (Gold/Silver) | Quality without burdening certified |
| 2026-06-05 | Refund: valid reason only (doctor note) | Prevent abuse, protect buddy income |
| 2026-06-05 | First user: 30% off certified + free trial Silver/Gold | Acquisition incentive |

---

## Session 2026-06-05 — Stitch Prompt Structure

### Problem
Single large JSON prompt gave generic Stitch results.

### Solution
Split into **per-screen prompts** (one file per screen).

### Result: 19 Screen Prompts
| # | File | Screen |
|---|------|--------|
| 1 | `01-splash.json` | Splash & Role Selection |
| 2 | `02-signup.json` | Sign Up Seeker |
| 3a | `03a-onboarding-goal.json` | Onboarding — Goal (Bulk/Cut/Endurance) |
| 3b | `03b-onboarding-location.json` | Onboarding — Gym Location |
| 3c | `03c-onboarding-schedule.json` | Onboarding — Schedule |
| 4 | `04-home-feed.json` | Home Feed (most important) |
| 5 | `05-buddy-profile.json` | Buddy Profile + Schedule |
| 6 | `06-booking.json` | Booking (2-step) |
| 7 | `07-payment.json` | Payment Methods |
| 8 | `08-booking-confirmation.json` | Confirmation |
| 9 | `09-post-session-review.json` | Rating & Review |
| 10 | `10-seeker-dashboard.json` | Seeker Dashboard |
| 11a | `11a-buddy-reg-step1.json` | Buddy Reg — Personal Info |
| 11b | `11b-buddy-reg-step2.json` | Buddy Reg — Professional Info |
| 11c | `11c-buddy-reg-step3.json` | Buddy Reg — Documents |
| 11d | `11d-buddy-reg-step4.json` | Buddy Reg — Review & Submit |
| 12 | `12-buddy-schedule.json` | Buddy Schedule Setup |
| 13 | `13-buddy-pending.json` | Pending Verification |
| 14 | `14-buddy-dashboard.json` | Buddy Dashboard |

### Layout Consistency
Onboarding (3 steps) and Buddy Registration (4 steps) use **identical layout structure** — only content area changes:
- Top bar (back arrow, skip)
- Progress dots
- Illustration area
- Heading + subtitle
- **Content area** (varies per step)
- CTA button

---

## Session 2026-06-05 — Flutter Web Discussion

### Hybrid Approach Recommended
| Layer | Technology |
|-------|------------|
| Landing/Marketing | Next.js / HTML + CSS (SEO) |
| Main App | **Flutter Web** (rich UX, animations) |
| Admin Panel | Next.js or Flutter Web |

### Xendit Integration for Flutter Web
**Recommended: Invoice/Checkout Redirect (Cara 1)**

```dart
// Flutter minimal code
Future<void> payWithXendit() async {
  final response = await http.post(
    Uri.parse('https://api.trialfit.com/payments/create-invoice'),
    body: jsonEncode({'amount': 150000, 'booking_id': '...'}),
  );
  final invoiceUrl = response.json()['invoice_url'];
  window.open(invoiceUrl, '_blank'); // Xendit handles rest
}
```

**Why:**
- Xendit handles all payment methods (GoPay, OVO, DANA, QRIS, Bank Transfer)
- Security & PCI compliance on Xendit side
- Works same for Flutter Mobile later (url_launcher)
- Backend receives webhook, notifies Flutter

---

## Session 2026-06-05 — PM Skills Plugin for OpenCode

### Installed
- **65 skills** from pm-skills marketplace (phuryn/pm-skills)
- Locations: `~/.agents/skills/` and `~/.config/opencode/skills/`
- 8 plugins: discovery, strategy, execution, market-research, data-analytics, go-to-market, marketing-growth, toolkit

### Custom OpenCode Plugin Created
- Location: `~/.config/opencode/node_modules/opencode-pm-skills/`
- Registers **36 slash commands** via `experimental.chat.system.transform`
- Commands: `/discover`, `/strategy`, `/write-prd`, `/plan-launch`, `/sprint`, `/pre-mortem`, etc.
- Added to `opencode.json`: `"plugin": ["opencode-pm-skills"]`

---

## Files Created

```
~/Documents/TrialFit/
├── AGENTS.md                      # Memory document (attach every session)
├── GoogleStitch_Prompt.json       # Master prompt (all screens)
├── CONVERSATION_LOG.md            # This file
└── stitch-prompts/
    ├── _design-system.json        # Shared colors, fonts, components
    ├── INDEX.md                   # Usage guide + order + checklist
    ├── 01-splash.json
    ├── 02-signup.json
    ├── 03a-onboarding-goal.json
    ├── 03b-onboarding-location.json
    ├── 03c-onboarding-schedule.json
    ├── 04-home-feed.json
    ├── 05-buddy-profile.json
    ├── 06-booking.json
    ├── 07-payment.json
    ├── 08-booking-confirmation.json
    ├── 09-post-session-review.json
    ├── 10-seeker-dashboard.json
    ├── 11a-buddy-reg-step1.json
    ├── 11b-buddy-reg-step2.json
    ├── 11c-buddy-reg-step3.json
    ├── 11d-buddy-reg-step4.json
    ├── 12-buddy-schedule.json
    ├── 13-buddy-pending.json
    └── 14-buddy-dashboard.json
```

---

## Next Session Checklist

When starting next session:
1. Attach `~/Documents/TrialFit/AGENTS.md`
2. Say "lanjutin TrialFit" 
3. AI will have full context

Possible next steps:
- [ ] Generate screens in Stitch (start with `04-home-feed.json`)
- [ ] Setup Flutter Web project (`flutter create trialfit_web`)
- [ ] Build component library in Flutter (theme, buttons, cards)
- [ ] Design Admin Panel screens
- [ ] Define API contracts for backend

---

## Session 2026-06-06 — Status Check & Pause

### Context
Resumed TrialFit session. User confirmed design work is **paused — waiting for frontend design feedback from stakeholder/user** before proceeding with Stitch screen generation or any development.

### Key Discussion
- Reviewed tech stack (already decided in prior session — see Session 2026-06-05):
  - Landing: Next.js / HTML + CSS
  - Main App: Flutter Web
  - Admin: Next.js or Flutter Web
  - Payments: Xendit
- Discussed engineering approach (senior-engineering-craftsmanship skill loaded). Recommendation: backend-first once frontend feedback clears, starting with domain modeling + API contracts.
- **User's directive:** Wait for frontend feedback. Do not generate Stitch screens or start coding until feedback arrives.

### Status
| Area | Status |
|------|--------|
| Product definition | ✅ Complete |
| Design system | ✅ Complete |
| Stitch prompts (19 screens) | ✅ Complete — awaiting user review |
| Frontend design generation | ⏸️ **PAUSED — waiting for user feedback** |
| Backend / API | ⏸️ Blocked on frontend feedback |
| Flutter Web setup | ⏸️ Blocked on frontend feedback |
| Admin panel | ⏸️ Blocked on frontend feedback |

### Decisions
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-06-06 | Pause all design generation work | Waiting for stakeholder/user feedback on existing Stitch prompts before generating screens |

### Next Steps (once feedback received)
- [ ] Incorporate feedback into existing prompts
- [ ] Generate screens in Stitch (start with `04-home-feed.json`)
- [ ] Reassess tech stack if needed
- [ ] Begin backend domain modeling or Flutter setup based on user direction

---

*End of log. Append new sessions below this line.*