# Design System — Rendimentos BR

## Overview

Rendimentos BR is a Brazilian financial data platform that compares CDBs, DI funds, government bonds (Tesouro Direto), and corporate debentures. The visual identity is a **dark terminal aesthetic** — dense, data-heavy, monospaced numbers, minimal decoration, and a striking green-on-black palette inspired by financial trading terminals. The overall vibe is: **utilitarian, dense, precise, professional**.

The app supports both dark and light themes. Dark is the default and primary experience.

---

## Colors

### Dark Theme (default)

- **Background** — Pure Black (`#000000`). Used for `body` and page background.
- **Background Subtle** — Near-Black (`#0a0a0a`). Used for secondary surfaces, ticker strips, and hover states.
- **Card Background** — Dark Card (`#0d0d0d`). Used for cards, table rows, header, modals.
- **Text Primary** — Light Gray (`#e0e0e0`). Main readable text.
- **Text Secondary** — Medium Gray (`#888888`). Descriptions, subtitles, less important info.
- **Text Tertiary** — Dark Gray (`#555555`). Labels, hints, timestamps.
- **Accent / Primary** — Terminal Green (`#00c853`). Brand color. Used for headings, active states, CTAs, ticker highlights.
- **Accent Light** — Dark Green Tint (`#001a0d`). Background behind accent elements (tags, highlights).
- **Accent Dark** — Bright Green (`#69f0ae`). Used for tag text on accent backgrounds.
- **Green** — Positive (`#00e676`). Gains, positive rates, TIR values.
- **Green Background** — Green Tint (`#001a0d`). Subtle background for positive indicators.
- **Red** — Negative/Danger (`#ff3b3b`). Losses, sell, danger actions.
- **Red Background** — Red Tint (`#1a0505`). Subtle background for negative indicators.
- **Blue** — Info (`#2979ff`). Used for secondary badges (BONCAP, NY law bonds).
- **Yellow** — Warning/Alt (`#ffd600`). Used for local-law bond badges.
- **Border** — Subtle Edge (`#1a1a1a`). Card borders, table dividers, separators.
- **Border Light** — Faint Edge (`#111111`). Inner table row dividers.

### Light Theme

- **Background** — Light Gray (`#f5f5f5`)
- **Background Subtle** — Lighter Gray (`#eeeeee`)
- **Card Background** — White (`#ffffff`)
- **Text Primary** — Near-Black (`#1a1a1a`)
- **Text Secondary** — Medium (`#555555`)
- **Text Tertiary** — Gray (`#888888`)
- **Accent** — Same Terminal Green (`#00c853`)
- **Green** — Same (`#00c853`), lighter bg (`#e8f5e9`)
- **Red** — Deeper Red (`#d32f2f`), lighter bg (`#ffebee`)
- **Border** — Light Edge (`#e0e0e0`)
- **Shadows** — Subtle: `0 1px 2px rgba(0,0,0,0.05)`, Medium: `0 2px 8px rgba(0,0,0,0.08)`, Large: `0 4px 16px rgba(0,0,0,0.1)`

### Semantic Color Rules

- Positive values (gains, rates) always use `--green`
- Negative values (losses, sell) always use `--red`
- Section headings and active navigation use `--accent`
- Data values use `--text` (primary) with `--font-mono`
- Labels and metadata use `--text-tertiary` with `text-transform: uppercase`

---

## Typography

### Font Families

- **Primary** — `'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- **Monospace** — `'Geist Mono', 'SF Mono', 'Fira Code', 'Courier New', monospace`

Loaded via Google Fonts: `Geist` (weights 400–800) and `Geist Mono` (weights 400–800).

### Type Scale

| Role | Size | Weight | Font | Extra |
|---|---|---|---|---|
| Page title (hero h1) | 1.2rem | 700 | Primary | uppercase, letter-spacing: 0.02em, color: accent |
| Section heading (h2) | 0.85rem | 700 | Primary | uppercase, letter-spacing: 0.03em, color: accent |
| Card name | 0.9rem | 650 | Primary | letter-spacing: -0.015em |
| Body / description | 0.75rem | 400–500 | Primary | line-height: 1.4 |
| Rate value (large number) | 1.4rem | 700 | Mono | letter-spacing: -0.03em, color: green |
| Table cell | 0.8rem | 400 | Primary | tabular-nums |
| Table cell (mono) | 0.75rem | 400 | Mono | — |
| Table header | 0.7rem | 600 | Primary | uppercase, letter-spacing: 0.04em |
| Tag / badge | 0.65rem | 500–600 | Primary | — |
| Label / hint | 0.65–0.72rem | 500–600 | Primary | uppercase, letter-spacing: 0.04em |
| Logo | 1rem | 800 | Primary | letter-spacing: -0.04em |
| Ticker price | 0.75rem | 700 | Mono | — |
| Ticker label | 0.6rem | 600 | Primary | uppercase, letter-spacing: 0.05em |

### Line Height

- Base body: `1.5`
- Headings: `1.2`
- Descriptions: `1.4`
- Rate values: `1` (tight)

---

## Spacing

- **Page max-width** — `780px` (content), `960px` (header)
- **Page horizontal padding** — `24px`
- **Section gap** — `20px` (margin-top between sections)
- **Card padding** — `10px 14px`
- **Card gap** — `8px` between stacked cards
- **Table cell padding** — `7px 12px`
- **Modal padding** — `16px 20px`
- **Footer padding** — `32px 24px 48px`
- **Inner element gap** — `6px–12px` typical flex gaps

---

## Border Radius

The design is intentionally **sharp and squared**:

- **Default radius** — `2px` (--radius and --radius-sm)
- **Cards** — `0px` (completely square)
- **Tables** — `0px`
- **Charts** — `0px`
- **Buttons (pill-style)** — `6px` for nav tabs, toggle buttons
- **Badges/tags** — `4px–5px`
- **Avatars** — `50%` (circular)
- **Toggle switch** — `11px` (rounded pill)

---

## Shadows

Dark theme uses **no shadows** (`none` for all shadow variables). The hierarchy is created through borders and subtle background shifts. Light theme uses minimal shadows for depth.

---

## Layout

### Container

- Max-width: `780px`, centered with `margin: 0 auto`
- Header max-width: `960px`
- Padding: `0 24px 80px` (generous bottom for mobile)

### Grid Patterns

- **Mundo monitor grid** — `repeat(auto-fill, minmax(200px, 1fr))`, 1px gap with border background creating grid lines
- **Portfolio summary** — `repeat(auto-fit, minmax(160px, 1fr))`, 12px gap
- **Hot movers** — Horizontal scroll `flex` with `8px` gap, `overflow-x: auto`

### Responsive Breakpoints

- `600px` — Mobile: single-column grids, reduced padding, larger touch targets
- `900px` — Tablet: adjusted font sizes for portfolio cards
- `1100px` — Desktop: header nav layout adjustments

---

## Components

### Header

Sticky top bar (`position: sticky; top: 0; z-index: 100`). Contains logo (left), currency tab navigation (center), and theme toggle (right). Background `#0d0d0d` with `1px solid #1a1a1a` bottom border.

### Currency Tabs (Navigation)

Pill-style tab group with `3px` padding container, `6px` border-radius on individual tabs. Active tab has `card-bg` background and text color. Inactive tabs show `text-secondary`.

### Ticker Strip

Horizontal bar below header showing live market prices. Items separated by `1px solid border` dividers. Labels are tiny uppercase (`0.6rem`), prices are mono bold (`0.75rem`).

### Fund Card

Horizontal flex layout: `[Logo 32px] [Info: name + entity + tags] [Rate: value + label]`. Border `1px solid border`, no radius. Hover adds accent border. Highlighted card gets accent border + accent-light background.

### Data Table

Full-width, collapsed borders. Header row: dark background (`#1a1a1a`), accent-colored text, uppercase labels. Body rows: card-bg background, hover shows bg-subtle. All numeric columns right-aligned with `tabular-nums`. Sortable columns have arrow indicators.

### Scatter Plot / Chart

Card-bg background, 1px border, no radius, `420px` height for scatter plots. Uses Chart.js for canvas rendering.

### Bar Chart

Horizontal bars inside card container. Each row: `[Logo 24px] [Bar with value]`. First item is larger (32px height). Values displayed in white on colored bars.

### Modal

Overlay with `backdrop-filter: blur(4px)`, centered content. Modal: card-bg, 2px radius, 1px border, `max-width: 700px`. Header with title/price, close button, and range tabs. Body with min-height 200px.

### Tags / Badges

Small inline elements (`0.65rem`, `2px 8px` padding, `5px` radius). Variants:
- **Type tag** — accent-light bg, accent-dark text
- **Limit tag** — red-bg, red text (or green for no-limit)
- **Badge** — Small pill (`0.6rem`) with colored background

### Buttons

- **Primary** — accent background, white text, 2px radius, 8px 16px padding
- **Danger** — red-bg background, red text
- **Small** — 4px 10px padding, 0.72rem font

### Toggle Switch

40px x 22px pill with sliding circle. Active state: accent background.

### Form Inputs

1px border, 4px radius, card-bg or bg background, font-family inherits from primary. Focus: accent border with subtle shadow ring.

### Footer

Centered text, 0.7rem, text-tertiary color. Top border separator.

---

## Animations & Transitions

- **Default transition** — `0.15s` for interactive state changes (hover, active)
- **Ticker scroll** — `200s linear infinite` translateX animation
- **Loading spinner** — `0.6s linear infinite` rotation
- **Sparkline pulse** — `1.2s ease-in-out infinite` scale animation for live dots
- **Bar chart entry** — `0.5s cubic-bezier(0.16, 1, 0.3, 1)` for width transitions
- **Reduced motion** — All animations respect `prefers-reduced-motion: reduce`

---

## Accessibility

- All interactive tabs use `role="tab"`, `aria-selected`, and `aria-controls`
- Focus-visible outlines: `2px solid var(--text)` with `2px` offset
- Semantic HTML: `<header>`, `<main>`, `<nav>`, `<footer>`, `<section>`
- Skip-link ready structure
- Color contrast maintained for both themes
- `font-variant-numeric: tabular-nums` for aligned number columns

---

## Icons

SVG inline icons using `stroke="currentColor"`, `stroke-width="2"`, `stroke-linecap="round"`, `stroke-linejoin="round"` (Feather/Lucide style). Standard size: `16x16` for navigation, `20x20` for logo, `14x14` for inline decorative.

---

## Key Design Principles

1. **Data density over whitespace** — Pack information tightly; every pixel earns its place
2. **Terminal aesthetic** — Black backgrounds, green accents, monospace numbers, squared corners
3. **Numbers are the hero** — Large, bold, mono-font rate values draw the eye first
4. **Minimal decoration** — No gradients, no shadows (dark mode), no rounded corners on data containers
5. **Color = meaning** — Green is always positive/gain, red is always negative/loss, accent is always interactive/important
6. **Theme-aware** — Every color references a CSS custom property; never hardcode outside `:root`
