---
name: TrialFit
colors:
  surface: '#f8f9ff'
  surface-dim: '#ccdbf2'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eef4ff'
  surface-container: '#e5efff'
  surface-container-high: '#dbe9ff'
  surface-container-highest: '#d4e4fa'
  on-surface: '#0d1c2d'
  on-surface-variant: '#434751'
  inverse-surface: '#233143'
  inverse-on-surface: '#e9f1ff'
  outline: '#737782'
  outline-variant: '#c3c6d3'
  surface-tint: '#2f5caa'
  primary: '#002a61'
  on-primary: '#ffffff'
  primary-container: '#003f8c'
  on-primary-container: '#87aeff'
  inverse-primary: '#aec6ff'
  secondary: '#984800'
  on-secondary: '#ffffff'
  secondary-container: '#fe8933'
  on-secondary-container: '#652e00'
  tertiary: '#1c2b4b'
  on-tertiary: '#ffffff'
  tertiary-container: '#334163'
  on-tertiary-container: '#9faed5'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#aec6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#0b4491'
  secondary-fixed: '#ffdbc8'
  secondary-fixed-dim: '#ffb689'
  on-secondary-fixed: '#321300'
  on-secondary-fixed-variant: '#743500'
  tertiary-fixed: '#d9e2ff'
  tertiary-fixed-dim: '#b8c6ef'
  on-tertiary-fixed: '#0a1a3a'
  on-tertiary-fixed-variant: '#384668'
  background: '#f8f9ff'
  on-background: '#0d1c2d'
  surface-variant: '#d4e4fa'
  accent-gold: '#FFD447'
  success-green: '#22C55E'
  error-red: '#EF4444'
  bg-light: '#F8FAFC'
  border-light: '#E2E8F0'
  silver-badge-bg: '#E2E8F0'
  silver-badge-text: '#475569'
  gold-badge-bg: '#FEF3C7'
  gold-badge-text: '#92400E'
  pro-badge-bg: '#FFE4CC'
  pro-badge-text: '#9A3412'
  verified-badge-bg: '#DCFCE7'
  verified-badge-text: '#166534'
  female-badge-bg: '#FCE7F3'
  female-badge-text: '#9D174D'
typography:
  h1:
    fontFamily: Sora
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h1-mobile:
    fontFamily: Sora
    fontSize: 30px
    fontWeight: '700'
    lineHeight: '1.2'
  h2:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  h3:
    fontFamily: Sora
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-bold:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: '1.6'
  small:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  small-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.5'
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  button:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 24px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-margin-desktop: 40px
  container-margin-mobile: 16px
  gutter: 24px
  card-padding: 20px
  input-v-padding: 14px
  input-h-padding: 16px
  btn-v-padding: 14px
  btn-h-padding: 24px
---

## Brand & Style

The design system is engineered to feel like a high-performance athletic tool that remains accessible and community-driven. It bridges the gap between intense fitness motivation and the security of a professional marketplace. The aesthetic balances the energy of a boutique gym with the sleek, structured efficiency of modern SaaS.

Drawing inspiration from **Corporate/Modern** and **Tactile** movements, the design system utilizes a structured card-based layout to organize a dense marketplace of trainers and classes. It prioritizes clarity and rapid action, using vibrant color pops to signal momentum and success, while grounded by deep navy tones to establish authority and trust.

## Colors

The palette is anchored by **Deep Navy (#0B1B3B)**, used primarily for navigation and high-level headers to provide a sense of stability. **Blue (#003F8C)** serves as the primary functional color for branding and interactive outlines.

**CTA Orange (#FF8A34)** is the system's "energy" color, reserved strictly for primary actions and conversion points to ensure high visibility against the cooler background tones. A specialized suite of semantic badge colors is provided to categorize trainers and status without overwhelming the user, maintaining a clean, systematic look.

## Typography

This design system utilizes **Sora** for headings to inject a modern, geometric personality that feels tech-forward. Its bold weights are used for H1 through H3 to create a clear visual hierarchy. 

**Inter** is used for all body text and UI labels, ensuring maximum legibility across a wide age demographic (17-50). The typography scale emphasizes vertical rhythm and generous line heights to prevent the content-heavy marketplace from feeling cluttered.

## Layout & Spacing

This design system employs a **Fixed Grid** model for desktop to maintain control over card density, transitioning to a fluid single-column layout for mobile. 

The rhythm is based on a **4px base unit**. Key layout rules:
- **Desktop:** 12-column grid with 24px gutters.
- **Mobile:** Single column with 16px side margins.
- **Card Grids:** Use 24px spacing between cards to allow elevation shadows to breathe.
- **Section Spacing:** Use 64px (16 units) between major vertical sections to maintain an open, high-end feel.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Ambient Shadows**. The background remains flat (`#F8FAFC`), while interactive elements like cards "float" using soft, low-opacity shadows.

- **Surface Tiers:**
    - **Base:** `#F8FAFC` (Canvas)
    - **Level 1:** White `#FFFFFF` (Cards, Inputs)
    - **Level 2:** Floating elements with a `0 4px 12px` shadow.
- **Translucency:** The bottom navigation uses a backdrop blur effect (12px blur) to maintain context of the scrollable content behind it while staying anchored.
- **Shadows:** Avoid pure black shadows; use the Deep Navy (#0B1B3B) at very low opacities (e.g., 8%) for neutral elements, and tinted orange shadows for primary CTAs to enhance the "glow" effect.

## Shapes

The shape language is primarily **Rounded**, reflecting an approachable and friendly brand persona. 

- **Standard Radius:** 12px (0.75rem) for primary buttons and smaller containers.
- **Large Radius:** 16px (1rem) for content cards.
- **Extra Large Radius:** 24px (1.5rem) for navigation bars and large containers.
- **Pill Radius:** 999px for status chips, filters, and tags. 

These radii should be applied consistently to soften the industrial feel of the grid and make the interface more inviting to a non-technical audience.

## Components

### Buttons
- **Primary:** Background `#FF8A34`, 12px radius, with a matching orange-tinted shadow. Text is white and centered.
- **Outline:** 2px border using `#003F8C`, blue text, 12px radius. Transparent background.

### Cards
- **Marketplace Card:** White background, 16px radius, `0 2px 8px` navy-tinted shadow. Padding is fixed at 20px. Images within cards should have a top-only 16px radius.

### Input Fields
- **Text Inputs:** 1.5px border in `#E2E8F0`, 10px radius. Use 14px/16px padding. Placeholder text uses Neutral Slate (#94A3B8).

### Chips & Filters
- **Default:** Pill shape (999px), background `#F1F5F9`, text `#475569`.
- **Active:** Background `#003F8C`, text white.

### Navigation
- **Top Nav:** Solid `#0B1B3B` background with white icons/text.
- **Bottom Nav:** Floating pill style, 24px radius, backdrop blur, anchored with a 16px margin from the screen bottom.

### Badges
- Small, uppercase, bold text. Use the semantic background/text pairs defined in the Colors section (Silver, Gold, Pro, Verified, Female-only).
