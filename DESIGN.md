---
name: Kevin Ding — Midnight Cinema & X-Ray Showcase
description: Midnight-blue screening room and X-Ray architectural showcase for Kevin Ding (@phanturne).
colors:
  prime-cyan: "#f59e0b"
  electric-blue: "#f472b6"
  mint-teal: "#fbbf24"
  stress-coral: "#fb7185"
  lantern-amber: "#f59e0b"
  lantern-gold: "#fde047"
  lantern-champagne: "#fef08a"
  sky-light: "#fde68a"
  theater-bg: "#070b14"
  theater-glow: "#131c36"
  card-navy: "#0e1628"
  screen-dark: "#050811"
  ice-white: "#f8fafc"
  slate-muted: "#94a3b8"
  border-navy: "#1e293b"
typography:
  display:
    fontFamily: "Geist, sans-serif"
    fontSize: "2.75rem"
    fontWeight: 800
    lineHeight: 1.0
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Geist, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Geist, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.15
  body:
    fontFamily: "Geist, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Geist Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.02em"
    fontFeature: "'tnum' 1, 'zero' 1"
rounded:
  sm: "4px"
  md: "6px"
  lg: "10px"
  xl: "14px"
spacing:
  xs: "6px"
  sm: "12px"
  md: "20px"
  lg: "28px"
  xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.prime-cyan}"
    textColor: "{colors.theater-bg}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "6px 14px"
  button-primary-hover:
    backgroundColor: "{colors.ice-white}"
    textColor: "{colors.theater-bg}"
  chip-scene:
    backgroundColor: "{colors.card-navy}"
    textColor: "{colors.slate-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "4px 10px"
  card-feature:
    backgroundColor: "{colors.card-navy}"
    textColor: "{colors.ice-white}"
    rounded: "{rounded.xl}"
    padding: "28px"
---

# Design System: Kevin Ding — Midnight Cinema & X-Ray Showcase

## Overview

**Creative North Star: "The Midnight Cinema & X-Ray Showcase"**

Kevin Ding's personal website draws subtle inspiration from his engineering role at **Amazon Prime Video** and his off-hours love for **C-dramas and K-dramas**, framing his two flagship software systems (*StressAlpha* and *PokéBastion TD*) as widescreen feature releases inside a midnight-blue screening theater. Each 50%-width feature showcase card is crowned by an interactive **"X-Ray"** inspection bar: by default, visitors browse high-resolution 16:10 production UI screenshots across key scenes; with one click on **"Inspect DCF Engine"** or **"Inspect A* Engine"**, the widescreen frame transitions into a live interactive algorithm sandbox where visitors can manipulate DCF drivers or place A* maze walls directly in the browser.

**Key Characteristics:**
- **Midnight Screening Atmosphere:** Deep theater slate (`#060b14`) illuminated by an overhead cobalt-blue projection radial glow (`#102347`).
- **Signature X-Ray HUD Bar:** Each flagship card opens with a translucent cyan-bordered X-Ray bar (`rgba(0, 168, 225, 0.12)` with `1px solid #00a8e1`) displaying system scale (`521 EQUITIES`, `152 UNITS`) and an instant toggle into the live engine.
- **Widescreen 16:10 Screen Bays:** Recessed `#04070e` viewports frame authentic production screenshots and interactive sandboxes at identical 16:10 proportions so toggling modes produces zero layout shift.
- **Zero-Jitter Tabular Readouts:** All financial deltas, WACC shocks, and pathfinding node counts enforce `font-variant-numeric: tabular-nums`.

## Colors

The palette pairs a rich midnight-navy theater environment with luminous Prime Cyan, Electric Sky Blue, and Ice White typography.

### Primary
- **Prime Cyan** (`#00a8e1`): Signature primary accent used for the `SWE @ AMAZON PRIME VIDEO` credential badge, X-Ray HUD bar borders, active scene tabs, primary launch buttons, and text selection highlight.

### Secondary
- **Electric Sky Blue** (`#38bdf8`): Used for feature card perimeter highlights, interactive creep agent markers, and slider hover states.
- **Sky Light Ink** (`#7dd3fc`): Used for secondary technical stack metadata and education credentials.

### Tertiary
- **Mint Teal** (`#2dd4bf`): Used for positive DCF valuation deltas, Bastion goal markers, and academic degree badges.
- **Stress Coral** (`#fb7185`): Semantic alert accent reserved for negative DCF valuation shocks and blocked pathfinding states.

### Neutral
- **Midnight Theater Slate** (`#060b14`): Root page background ground.
- **Overhead Projection Glow** (`#102347`): Radial top-center ambient navy light source.
- **Screening Feature Card** (`#10192b`): Elevated container surface for the two flagship showcases and experience cards.
- **Recessed Widescreen Bay** (`#04070e`): Deep dark frame housing the 16:10 screenshot gallery and X-Ray sandboxes.
- **Ice White Ink** (`#f0f6ff`): High-contrast primary display and headline typography.
- **Slate Blue Muted Ink** (`#94a3b8`): Body descriptions and secondary labels (verified ≥4.5:1 contrast against all dark navy surfaces).
- **Navy Hairline Rule** (`#1e293b`): Structural 1px borders separating cards, scene tabs, and footer bars.

### Named Rules
**The X-Ray Inspection Rule.** Every flagship release card carries a top X-Ray HUD bar (`#00a8e1` border on `rgba(0, 168, 225, 0.12)` fill) that lets visitors toggle the 16:10 screen bay between real production screenshots and the live interactive algorithm engine.
**The Real-Proof-First Rule.** Both flagship showcases default to real high-resolution production screenshots (`Dual-Pane Cockpit`, `Live Wave Combat`) so visitors immediately see the authentic shipped UI before exploring the X-Ray sandbox.

## Typography

**Display Font:** Sora (with sans-serif fallback)
**Body Font:** Chakra Petch (with sans-serif fallback)
**Label/Mono Font:** JetBrains Mono (with monospace fallback)

**Character:** Geometric, crisp widescreen display titles (`Sora`) give the header and feature cards a modern streaming-premiere presence, while technical sans (`Chakra Petch`) keeps engineering copy razor-sharp and `JetBrains Mono` powers the X-Ray HUD bars and tabular telemetry.

### Hierarchy
- **Display** (800 weight, 2.75rem / 44px, 1.0 line-height, -0.03em tracking): Primary identity (`Kevin Ding`).
- **Headline** (700 weight, 2.25rem / 36px, 1.1 line-height, -0.02em tracking): Major section headers (`Experience, Education & Architecture Stack`, `Off-Hours Rotation`).
- **Title** (700 weight, 1.875rem / 30px, 1.15 line-height): Flagship project titles (`StressAlpha`, `PokéBastion TD`) and experience card headings.
- **Body** (400–500 weight, 0.9375rem / 15px, 1.55 line-height, max 74ch): Project architecture summaries and off-hours descriptions.
- **Label** (600 weight, 0.75rem / 12px, 0.02em tracking, tabular-nums): X-Ray HUD bars, scene tabs, credential pills, and stack tags.

### Named Rules
**The Zero-Jitter Tabular Rule.** All numerical readouts in the X-Ray sandboxes apply `font-variant-numeric: tabular-nums` (`tnum`, `zero`).
**The No-Kicker Heading Rule.** Headings lead their container directly or pair inline with a right-aligned status badge; never stack a small kicker or eyebrow label above a heading.

## Layout

The surface uses a 1440px maximum container (`px-6 lg:px-16`) over a full-bleed radial midnight-blue theater canvas. The first viewport features a sleek top header bar over a balanced 50/50 two-column showcase (`grid-cols-1 lg:grid-cols-2 gap-8`) giving *StressAlpha* and *PokéBastion TD* equal widescreen prominence. Below the fold, Experience & Tech Stack uses a 3-column grid, and Off-Hours Rotation uses a 4-column card row.

## Elevation & Depth

Depth is established through an overhead radial projection gradient (`#102347` → `#060b14`), translucent navy feature cards (`#10192b`), deep recessed 16:10 screen bays (`#04070e`), and soft theater elevation shadows.

### Shadow Vocabulary
- **Theater Feature Elevation** (`box-shadow: 0 24px 48px -12px rgba(2, 5, 12, 0.78), 0 6px 16px -4px rgba(2, 5, 12, 0.55)`): Applied to `.theater-elevation` showcase and experience cards.

## Shapes

Feature cards use a smooth 14px border radius (`rounded-[14px]`) with luminous `rgba(56, 189, 248, 0.3)` borders; recessed widescreen bays use a 10px radius (`rounded-[10px]`); X-Ray HUD bars and primary buttons use a 6px radius (`rounded-[6px]`); and inner scene tabs and stack pills use a 4px radius (`rounded-[4px]`).

## Components

### Buttons
- **Shape:** `6px` border radius (`rounded-[6px]`).
- **Primary:** Prime Cyan (`#00a8e1`) background, Midnight Theater (`#060b14`) bold monospace text, `6px 14px` padding.
- **Hover / Focus:** Transitions to Ice White (`#f0f6ff`) fill with a 2px `#00a8e1` focus-visible ring.

### Scene Tabs & X-Ray Toggles
- **Style:** Recessed `#10192b` background, `#94a3b8` monospace text, `1px solid #1e293b` border, `4px` radius.
- **State:** Active scene tab or X-Ray mode toggle fills with `#00a8e1` and dark `#060b14` bold text.

### Feature Cards
- **Corner Style:** `14px` outer radius; `10px` inner widescreen bay radius.
- **Background:** `#10192b` card surface housing `#04070e` screen bay.
- **Shadow Strategy:** Soft multi-layered theater shadow (`theater-elevation`).
- **Border:** `1px solid rgba(56, 189, 248, 0.3)` on flagship cards; `1px solid #1e293b` on secondary cards.
- **Internal Padding:** `24px` to `28px` (`p-6 sm:p-7`).

### Inputs / Sliders
- **Style:** Custom `.xray-slider` range tracks (`8px` height, `#1e293b` track fill, `4px` radius) with `16px × 16px` Prime Cyan thumbs (`#00a8e1` with `2px solid #f0f6ff` border).

### Navigation
- **Style:** Top-right header navigation pills (`Projects`, `Experience & Stack`, `Off-Hours`, `github.com/phanturne ↗`) in 13px `JetBrains Mono` inside `#10192b` pills with `#1e293b` borders.

## Do's and Don'ts

### Do:
- **Do** lead both flagship cards with real 16:10 production screenshots and provide the X-Ray HUD toggle to inspect the live interactive DCF and A* engines.
- **Do** keep the palette cohesive across deep midnight blues (`#060b14`, `#102347`, `#10192b`) and luminous cyan/sky accents (`#00a8e1`, `#38bdf8`, `#7dd3fc`).
- **Do** enforce `tabular-nums` on every live valuation delta and pathfinding counter.

### Don't:
- **Don't** use rock-climbing jargon or unrelated sport metaphors on engineering sections.
- **Don't** place kickers or eyebrow labels above `<h2>` or `<h3>` headings.
- **Don't** use hard zero-blur neobrutalist offset shadows.
