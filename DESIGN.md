---
name: School OS Design System
description: Institutional, calm, high-craft design language for Cambodia School OS & Transport Safety Platform
colors:
  background: "oklch(0.984 0.003 247.858)"
  foreground: "oklch(0.21 0.034 264.665)"
  card: "oklch(1 0 0)"
  card-foreground: "oklch(0.129 0.042 264.695)"
  primary: "oklch(0.488 0.217 264.376)"
  primary-foreground: "oklch(0.985 0 0)"
  secondary: "oklch(0.968 0.007 247.896)"
  secondary-foreground: "oklch(0.208 0.042 265.755)"
  muted: "oklch(0.968 0.007 247.896)"
  muted-foreground: "oklch(0.55 0.03 258.5)"
  border: "oklch(0.929 0.013 255.508)"
  success: "oklch(0.6 0.16 150)"
  warning: "oklch(0.7 0.16 75)"
  danger: "oklch(0.577 0.245 27.325)"
typography:
  display:
    fontFamily: "Inter, 'Noto Sans Khmer', sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, 'Noto Sans Khmer', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
---

# School OS Design System

## Overview

The School OS interface is designed for daily operational reliability across schools in Cambodia. The system serves five core user personas: Administrators, Parents, Teachers, Bus Staff, and Students. The visual language favors quiet sophistication, functional clarity, and high-density legibility over decorative trends or AI-generated visual clutter.

## Colors

- **Neutral Canvas**: Warm, low-fatigue slate backgrounds (`bg-background`) paired with crisp pure cards (`bg-card`).
- **Institutional Primary**: Deep, trustworthy navy-indigo (`--primary`) used deliberately for primary actions and active navigation items.
- **Strict Semantic Accents (10% Rule)**:
  - **Success / On-Time / Present**: Soft emerald tones (`text-emerald-600`, `bg-emerald-500/10`).
  - **Notice / Delay Warning**: Calm amber tones (`text-amber-700`, `bg-amber-500/10`). Never full saturated screaming orange blocks.
  - **Alert / Overdue / Absent**: Restrained rose/crimson tones (`text-rose-600`, `bg-rose-500/10`).
- **No Color Salad**: Never tint entire cards in bright neon colors or mix unrelated badge colors for decorative variance.

## Typography

- **Font Stacks**: `Inter` for Latin numerals and English labels; `Noto Sans Khmer` for native Khmer text.
- **Rhythm & Hierarchy**:
  - Headings are tight (`tracking-tight`), high-contrast (`text-foreground`), and never prefixed with artificial eyebrows/kickers.
  - Secondary labels and metrics use subdued opacity (`text-muted-foreground`) to maintain visual breathing room.

## Layout

- **Admin Portal**: Multi-column desktop layout with high information density, clean data tables, quick-access action bars, and structured modals.
- **Mobile Ecosystem (Parent, Student, Teacher, Bus Staff)**: Authentic PWA viewport simulation wrapped in a realistic mobile frame with safe bottom navigation bar and accessible thumb zones.

## Elevation & Depth

- **Subtle Surface Borders**: 1px crisp borders (`border-border`) replace heavy zero-blur drop shadows.
- **Soft Diffusion**: Low-elevation card shadows (`shadow-2xs` and `shadow-card`) to establish elevation hierarchy without visual noise.

## Shapes

- **Radius Scale**:
  - Buttons and inputs: `rounded-lg` (8px).
  - Cards and dashboard panels: `rounded-xl` (12px) or `rounded-2xl` (16px).
  - Badges and status pills: `rounded-full`.

## Components

- **Badges**: Standardized on shadcn variants: `default`, `secondary`, and `outline`.
- **Buttons**: Consistent hierarchy: `default` (primary action), `outline` (secondary action), `ghost` (tertiary/dismiss).
- **Status Indicators**: Soft pulsating beacons (`size-2`) for real-time live events (bus GPS, active trip).

## Do's and Don'ts

### Do
- Use neutral card backgrounds (`bg-card`) with 1px `border-border`.
- Keep action buttons unified with standard theme variants.
- Test both English and Khmer copy lengths to ensure zero text truncation or clipping.
- Reserve bright colors exclusively for functional status (present vs. absent, on-time vs. delayed).

### Don't
- Don't use bright neon orange/amber backgrounds for action buttons or header cards.
- Don't use decorative colored halos or multi-colored border-left stripes.
- Don't place kicker/eyebrow labels above page headings.
- Don't use emojis in place of standard vector icons (Lucide).
