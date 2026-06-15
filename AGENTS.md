# TrialFit — Product Memory Document

> **Single source of truth for TrialFit's product definition, design system, and all decisions made.**
> **Attach this file at the start of every new session so the AI has full context.**
> **Last updated: 2026-06-06**
>
> **⚠️ CURRENT STATUS: PAUSED — Waiting for frontend design feedback from stakeholder/user before proceeding with Stitch screen generation or any development work.**

---

## 1. Product Overview

| Field | Value |
|-------|-------|
| **Name** | TrialFit |
| **Tagline** | "Your Gym Journey, Your Buddy" |
| **What it is** | Platform connecting Gym Seekers with affordable, bookable Gym Buddies (coaches/trainers) at private/exclusive gyms (apartment gyms, campus gyms) |
| **Platform** | Responsive Web App (mobile-first, desktop support) |
| **Design Tool** | Google Stitch (https://stitch.withgoogle.com/) |
| **Design Inspiration** | ClassPass (https://classpass.com/) — marketplace + booking feel |
| **Brand Personality** | Energetic, Trustworthy, Approachable, Modern |

---

## 2. Target Audience

| Attribute | Value |
|-----------|-------|
| **Age Range** | 17–50 years old |
| **Tech-Savviness** | Mixed — Digital native (Gen Z) + hand-holding (40+) |
| **Geography** | Indonesia (primary) |

### User Personas

#### Rangga (Gen Z Seeker)
- **Age:** 21
- **Goals:** First time gym, wants affordable guidance, needs motivation
- **Behavior:** Mobile-first, social-proof driven, expects instant gratification

#### Bu Dewi (40+ Seeker)
- **Age:** 45
- **Goals:** Wants a personal coach for health/endurance, values trust and professionalism
- **Behavior:** Desktop/laptop, needs clear instructions, prefers phone/SMS verification

#### Arya (Gym Buddy)
- **Age:** 28
- **Goals:** Certified trainer, wants to earn from flexible hours, build client base
- **Behavior:** Needs professional profile, schedule management, clear payout system

---

## 3. User Roles

### Gym Seeker
- Books coaching sessions from Gym Buddies
- Tracks progress, sets goals, reviews sessions

### Gym Buddy (Coach/Trainer)
| Tier | Description | Verification |
|------|-------------|--------------|
| **Silver** | Beginner-level buddy | Manual admin review + Zoom interview (non-certified) |
| **Gold** | Experienced buddy | Manual admin review + Zoom interview (non-certified) |
| **Pro** | Certified trainer (has certificates) | Manual admin review (no Zoom if certified) |

- Female-only Gym Buddies available (tagged with ♀ Only badge)
- Minimum 10 hours/week allocated on platform
- Register via app → Manual admin approval (SLA: 24 hours)
- Must sign digital e-contract before approval

---

## 4. Feature Map

### 4.1 User Management
- [x] Sign Up Seeker (email + password)
- [x] Sign Up Seeker (email verification with Resend)
- [x] Sign Up Buddy (with certificate upload)
- [x] Manual Buddy verification by Admin (SLA: 24h)
- [x] Zoom interview for non-certified buddies (Gold & Silver)
- [x] Forgot password flow
- [x] Edit profile + upload photo
- [x] Referral code field at sign-up
- [x] Digital e-sign contract for buddies

### 4.2 Discovery & Matching
- [x] Browse all buddies list
- [x] Filter by: gym location, goal (bulk/cut/endurance), gender preference, price range, rating, buddy tier
- [x] Auto-matching algorithm (recommendations based on preferences, NOT AI)
- [x] Save favorite buddy

### 4.3 Booking
- [x] View buddy schedule (calendar)
- [x] Book single session
- [x] Book multi-session package
- [x] Reschedule booking
- [x] Cancel booking (with refund policy)

### 4.4 Payment (Xendit API)
- [x] Seeker pays → Escrow system
- [x] Buddy payout: Per session (H-1 before workout day), weekly/monthly for package bookings
- [x] Minimum payout threshold: Rp 100K
- [x] Payment methods: GoPay, OVO, DANA, QRIS, Bank Transfer

### 4.5 Refund Policy
- **Seeker cancellation:** Must provide valid reason (doctor's note, sick letter, official letter)
- **Without valid reason:** Non-refundable
- **Buddy cancellation:** Must contact Admin max H-1 before session
- **Buddy alternatives:** Admin arranges replacement buddy OR reschedule
- **Buddy cancellation requires:** Valid reason/doctor's note

### 4.6 Communication
- [x] Email notifications

### 4.7 Post-Session
- [x] Confirm session completed (Seeker / Buddy / both)
- [x] Rating system (1-5 stars)
- [x] Written review
- [x] Photo upload as session proof
- [x] Automatic trust score for Buddy

### 4.8 Progress Tracking
- [x] Seeker dashboard (session count, goals, progress)
- [x] Workout history
- [x] Goal setting + tracking

### 4.9 Monetization
- [x] TrialFit Pro subscription

### 4.10 Buddy Profile Features (Design Decisions)
- [x] **Response hours** — Show typical reply time on profile
- [x] **Online coaching option** — Buddy can offer online sessions as alternative
- [x] **Client referrals** — Buddy can showcase testimonials from past clients

### 4.11 First-Time User Incentive
- First registered user: 30% discount for certified trainer
- Free trial session from Silver & Gold buddies (1 hour, buddy can choose)

### 4.12 Admin Panel
- [ ] View all users (Seeker + Buddy)
- [ ] Approve/reject new Buddies
- [ ] View transactions
- [ ] Handle manual refunds
- [ ] Daily/weekly reports

---

## 5. User Flows

### Flow 1: Seeker First-Time Sign Up & Book
1. Open app → Splash screen → Login/Register
2. Sign up → Input email/phone + password/OTP
3. Onboarding: goal (bulk/cut/endurance), gym location, schedule preference
4. Landing on Home: feed of matched buddies (with ability to view all + filter by location, tier, workout plans, rate fee)
5. Tap a buddy → View profile + schedule
6. Pick slot → Confirm → Pay (GoPay/OVO/DANA/dll)
7. Booking confirmed → Receive notification
8. Session day → Buddy confirms attendance → Auto-check-out
9. Rating + review prompt

### Flow 2: Buddy Registration & Onboarding
1. Open app → Select as "Buddy"
2. Fill profile: name, photo, gym location, specialization, price per session, response hours, online coaching option
3. Upload documents: KTP, NPWP, certificates (if any), experience photos, client referrals (optional)
4. Sign digital e-contract
5. Submit → Status "pending verification"
6. Admin review within 24h → Approve/Reject (Zoom interview for non-certified Gold & Silver)
7. After approved → Set schedule availability (recurring weekly)
8. Start receiving bookings

### Flow 3: Payment & Payout
1. Seeker pays Rp X → Goes to escrow (Xendit)
2. After session confirmed complete → Payout to Buddy
3. Per session: payout H-1 before workout day
4. Package bookings: payout weekly or monthly
5. Minimum payout: Rp 100K

---

## 6. Design System

### 6.1 Color Palette

| Role | Hex | Usage |
|------|-----|-------|
| Deep Navy | `#0B1B3B` | Primary text, headers, dark sections |
| Blue | `#003F8C` | Secondary UI, navigation, active filters |
| CTA Orange | `#FF8A34` | Primary actions, buttons, highlights |
| Gold/Yellow | `#FFD447` | Secondary accent, Gold tier badge |
| Green | `#22C55E` | Success states, health metrics, availability |
| Slate Gray | `#94A3B8` | Neutral text, disabled states |
| Light BG | `#F8FAFC` | Page backgrounds |
| White | `#FFFFFF` | Cards, modals |
| Red | `#EF4444` | Errors, cancellation |

### 6.2 Typography
- **Headings:** Inter or Sora (bold, modern, geometric)
- **Body:** Inter (clean, readable for all ages)
- Scale: 2.25rem (h1) → 1.5rem (h2) → 1.25rem (h3) → 1rem (body) → 0.875rem (small) → 0.75rem (caption)

### 6.3 Components
- **Buttons:** 12px radius, 14px/24px padding, 600 weight
- **Cards:** 16px radius, white bg, subtle shadow
- **Inputs:** 10px radius, 1.5px border, focus: blue glow
- **Chips/Filters:** Pill shape (999px), active = blue, inactive = gray
- **Badges:** Silver (#E2E8F0), Gold (#FEF3C7), Pro (#FFE4CC), Verified (#DCFCE7), Female Only (#FCE7F3)
- **Navigation:** Floating bottom tab bar (pill-style, blur backdrop)
- **Top Nav:** Navy (#0B1B3B) background, white text
- **Loading Skeleton:** Shimmer animation (1.5s ease-in-out)
- **Empty State:** Friendly illustration + clear CTA

### 6.4 Buddy Tier Badges
| Tier | Color | Description |
|------|-------|-------------|
| Silver | Gray (#E2E8F0) | Beginner buddy |
| Gold | Yellow (#FEF3C7) | Experienced buddy |
| Pro | Orange-light (#FFE4CC) | Certified trainer |

---

## 7. Screen Map (v1 — 19 Screens)

Per-screen prompt files available at `./stitch-prompts/`. Use one at a time in Google Stitch.

| # | File | Screen | Description |
|---|------|--------|-------------|
| 1 | `01-splash.json` | Splash & Role Selection | Logo + Seeker/Buddy selection cards |
| 2 | `02-signup.json` | Sign Up (Seeker) | Email/phone, password, referral code |
| 3 | `03a-onboarding-goal.json` | Onboarding — Pilih Goal | Step 1: Bulk/Cut/Endurance selection cards |
| — | `03b-onboarding-location.json` | Onboarding — Lokasi Gym | Step 2: Search gym location + popular picks |
| — | `03c-onboarding-schedule.json` | Onboarding — Jadwal & Waktu | Step 3: Day chips + time range toggle |
| 4 | `04-home-feed.json` | Home Feed | Matched buddies + filters (most important screen) |
| 5 | `05-buddy-profile.json` | Buddy Profile + Schedule | Bio, certs, ratings, calendar, testimonials |
| 6 | `06-booking.json` | Booking | Slot selection, confirm (2-step) |
| 7 | `07-payment.json` | Payment | GoPay/OVO/DANA/QRIS, promo, Xendit |
| 8 | `08-booking-confirmation.json` | Booking Confirmation | Success state + add to calendar |
| 9 | `09-post-session-review.json` | Post-Session Review | Stars, review, photo proof |
| 10 | `10-seeker-dashboard.json` | Seeker Dashboard | Progress, history, goals |
| 11a | `11a-buddy-reg-step1.json` | Buddy Reg — Personal Info | Photo, name, phone, email, password |
| 11b | `11b-buddy-reg-step2.json` | Buddy Reg — Professional | Specialization, gym location, price, response hours, online coaching |
| 11c | `11c-buddy-reg-step3.json` | Buddy Reg — Documents | KTP, NPWP, certificates, experience photos, testimonials |
| 11d | `11d-buddy-reg-step4.json` | Buddy Reg — Review & Submit | Summary, agreement, e-signature, submit |
| 12 | `12-buddy-schedule.json` | Schedule Setup | Weekly calendar + time ranges |
| 13 | `13-buddy-pending.json` | Pending Verification | Status card + timer |
| 14 | `14-buddy-dashboard.json` | Buddy Dashboard | Earnings, upcoming sessions, schedule mgmt, quick actions |

---

## 8. UX Principles

### Dual-Audience Design

**For Gen Z (17-25):**
- Smooth micro-animations (button press: scale 0.97, 160ms)
- Bottom sheet modals for quick actions
- Swipe gestures for dismiss, favorite
- Dark mode option
- Instant feedback on every tap

**For 40+ Users:**
- Large tap targets (min 48px height)
- Clear labels — no icon-only buttons
- High contrast text (WCAG AA minimum)
- Consistent back buttons and breadcrumbs
- Phone/in-app support from every screen
- SMS/email verification fallback
- Font size respects device settings

### Emil Design Engineering Principles Applied
- Button press: `transform: scale(0.97)` + `transition: transform 160ms ease-out`
- Element entry: From `scale(0.95)` + `opacity(0)`, never from `scale(0)`
- Custom easing: ease-out (0.23, 1, 0.32, 1) for entering, ease-in-out (0.77, 0, 0.175, 1) for movement
- Duration caps: UI under 300ms, button feedback 100-160ms
- Stagger: 30-80ms delay between list items
- Only animate `transform` and `opacity` (GPU-accelerated)
- `prefers-reduced-motion`: Remove translate/scale, keep opacity fades
- Touch device hover: `@media (hover: hover) and (pointer: fine)`
- Exit animations slightly faster than enter

### Trust & Safety Patterns
- Verified badge on all accepted buddies
- Tier badges visible on every card
- Trust score on every profile
- Payment gateway logo (Xendit) on payment screen
- Escrow visual indicator
- Clear refund policy linked from booking

---

## 9. Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-06-05 | Buddy profile includes response hours | Sets expectation for communication speed |
| 2026-06-05 | Online coaching as optional toggle | Expands buddy reach, gives seekers flexibility |
| 2026-06-05 | Client testimonials/referrals on buddy profile | Builds trust through social proof |
| 2026-06-05 | Escrow payment system | Protects both seeker and buddy |
| 2026-06-05 | Admin SLA: 24h for buddy approval | Balances speed with quality control |
| 2026-06-05 | Zoom interview for non-certified (Gold/Silver) | Ensures quality without over-burdening certified trainers |
| 2026-06-05 | Refund: valid reason only (doctor note, etc.) | Prevents abuse, protects buddy income |
| 2026-06-05 | First user: 30% off certified + free trial from Silver/Gold | Acquisition incentive + low-risk entry |
| 2026-06-05 | ClassPass as design inspiration | Proven UX pattern for fitness booking marketplaces |
| 2026-06-05 | Split onboarding into 3 separate Stitch prompts (03a, 03b, 03c) | Stitch can't handle multi-step wizards; per-step prompts give better results |
| 2026-06-05 | Split buddy registration into 4 separate Stitch prompts (11a, 11b, 11c, 11d) | Same reason — Stitch generates better per-step mockups; identical layout structure maintained |
| 2026-06-06 | **PAUSE: All design generation & development work** | Waiting for stakeholder/user feedback on existing Stitch prompts before generating screens or coding |

---

## 10. PM Skills Used

This project uses the **pm-skills marketplace** (https://github.com/phuryn/pm-skills):
- **pm-product-discovery** — Brainstorming, assumption mapping, experiment design
- **pm-product-strategy** — Product vision, value proposition, competitive strategy
- **pm-execution** — PRD writing, user stories, prioritization
- **pm-market-research** — Personas, segmentation, journey mapping
- **pm-marketing-growth** — North Star metrics, positioning

Plus:
- **emil-design-eng** — Animation philosophy, interaction craft, unseen details
- **senior-engineering-craftsmanship** — Clean architecture, production-grade rigor

---

## 11. File Index

| File | Location | Description |
|------|----------|-------------|
| Master Prompt JSON | `./GoogleStitch_Prompt.json` | Complete UI design prompt (all screens in one file) |
| Per-Screen Prompts | `./stitch-prompts/01-splash.json` through `03c-onboarding-schedule.json`, `04-home-feed.json` through `10-seeker-dashboard.json`, `11a-buddy-reg-step1.json` through `11d-buddy-reg-step4.json`, `12-buddy-schedule.json`, `13-buddy-pending.json`, `14-buddy-dashboard.json` | **Recommended** — one prompt per screen for better Stitch results |
| Design System | `./stitch-prompts/_design-system.json` | Shared colors, fonts, components reference |
| INDEX.md | `./stitch-prompts/INDEX.md` | Usage guide + recommended order + quality checklist |
| AGENTS.md | `./AGENTS.md` | **This file** — memory document (attach every new session) |
| PM Skills Plugin | `~/.config/opencode/node_modules/opencode-pm-skills/` | OpenCode slash command plugin (36 commands) |
| PM Skills (global) | `~/.agents/skills/` | 65 SKILL.md files auto-loaded in every chat |

---

## 12. Session Protocol

**When starting a new session:**
1. User attaches this `AGENTS.md` file
2. AI reads it and has full project context
3. AI also loads `./GoogleStitch_Prompt.json` if working on design
4. After making any decisions, AI **updates this file** before the session ends

**When ending a session:**
1. Any new decisions are logged in the Decision Log (Section 9)
2. Any new features are added to the Feature Map (Section 4)
3. Any design changes are noted
4. This file is saved back to disk
