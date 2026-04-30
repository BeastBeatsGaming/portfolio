# CLAUDE.md — Portfolio Build Brief
> Hand this file to Claude Code as the first message. It contains everything needed to build the portfolio from the Claude Design output.

---

## Project Overview

Build a personal portfolio website for **Sai Mayank** — a game dev student and web developer. The design language has already been established by Claude Design (see attached files: `HUDElements.jsx`, `Sections.jsx`, `Portfolio_Website.html`). Your job is to migrate this into a proper React/Vite project and bring it to life with a full animation layer.

The aesthetic is **Game HUD / Diegetic UI** with an **amber + near-black** palette. It should feel like the visitor is looking through a heads-up display. The design files nail the visual language — what they lack entirely is motion.

---

## Tech Stack

- **Framework:** React + Vite (TypeScript preferred)
- **Animation:** GSAP with ScrollTrigger plugin — this is non-negotiable. Do not use CSS keyframes for anything beyond micro-details.
- **Routing:** Single page (no router needed)
- **Fonts:** Already in use — `Rajdhani` (headings) + `Share Tech Mono` (mono/UI text) from Google Fonts
- **Deployment target:** GitHub Pages (output to `/docs` or configure `base` in vite.config)

---

## Design System

Carry over the exact color tokens and component primitives from `HUDElements.jsx`. Do not change the palette. The key variables:

```js
amber:          '#D4A026'
amberLight:     '#F5C842'
amberDim:       '#8B6914'
amberGlow:      'rgba(212, 160, 38, 0.15)'
bg:             '#0A0A08'
bgPanel:        'rgba(212, 160, 38, 0.04)'
border:         'rgba(212, 160, 38, 0.2)'
borderBright:   'rgba(212, 160, 38, 0.5)'
```

Carry over: `Scanlines`, `Vignette`, `CRTFlicker`, `CornerBrackets`, `SectionHeader`, `StatBar`, `HUDDivider`.

---

## Real Project Data

Replace ALL placeholder project data in `Sections.jsx` with the following:

### 🎮 Field Missions — Game Dev

**Charge It!**
- Description: Endless runner where you play as a charger that must collect electricity and dodge wire-cutters to power a phone.
- Tags: `Unity` `C#`

**Idle Business Manager**
- Description: Casual idle tycoon — build a business empire by investing in ventures, upgrading operations, and automating income streams.
- Tags: `Unity` `C#`

**Whack A Mole** *(highlight this one — it's technically the most impressive)*
- Description: Classic whack-a-mole reimagined with motion tracking. Uses a webcam to detect hand movements so players physically "whack" the moles.
- Tags: `Unity` `C#` `TensorFlow`

### 🛠️ Engineering Ops — Web Dev

**Saran Cabs & Travels**
- Description: Frontend website for a cab booking service with interactive UI components.
- Tags: `HTML` `CSS` `JavaScript`

**Valorant Database**
- Description: Frontend app that fetches live data from the Valorant API — agents, weapons, maps, and cosmetics.
- Tags: `Next.js` `Axios`

**Task Master**
- Description: Full-stack task and project manager with real-time updates, user authentication, and a responsive UI.
- Tags: `React` `Node.js` `MongoDB` `Express`

---

## Animation Spec — Section by Section

This is the core of the build. Every section must have intentional motion. Use GSAP ScrollTrigger for all scroll-based animations.

### Global
- On page load: a brief **boot sequence** — the screen flickers once (CRT flash), then the nav fades in letter by letter (stagger), then the hero content assembles. Total boot time: ~1.8s.
- Subtle **ambient animation** on the edge lines (slow vertical light sweep, looping).

### Hero Section
The wow moment. This must stop the visitor within 3 seconds.
- The two concentric circles should **slowly rotate** in opposite directions (GSAP rotation tween, infinite).
- Player name should use a **glitch effect on entrance** — letters scramble with random characters before resolving to the final name. Use a character scramble approach (iterate through random chars, then settle).
- Subtitle fades in with a **typewriter effect** after the name resolves.
- Tagline fades up after the subtitle.
- The `SYS.ONLINE` / `SEC.CLEARANCE` / date bar should count up / flicker in, not just appear.
- Add **4–6 faint floating data points** around the hero (small mono text like `LAT: 13.05` `ALT: 0042m` `PING: 12ms`) — these drift very slowly and fade in/out on a loop. They reinforce the HUD feel.

### About Section (Operative Profile)
- Section enters with the `CornerBrackets` drawing themselves in — the four corner lines extend from 0 length to full length on scroll enter (GSAP from width/height 0).
- Stats grid: each stat row flips in sequentially with a stagger (rotateX from 90deg, like a departure board).
- Bio text: types in character by character (typewriter) as the section enters viewport.

### Projects Section (Mission Log)
- Section header assembles: the code line slides in from left, the title from right, simultaneously.
- Project cards enter in a **stagger wave** — cards slide up from 40px below with opacity 0 to full, staggered by 0.1s.
- On hover: card border animates a **running light** effect (a bright amber dot travels around the perimeter of the border). Use a CSS/GSAP combination.
- On hover: the hatched thumbnail placeholder area should shift its angle slightly (transform: skewX).
- "Whack A Mole" card should have a subtle **pulsing glow** to draw the eye — it's the standout project.

### Skills Section (System Readout)
- `CornerBrackets` draw in same as About.
- `StatBar` fills should **not** animate on load — animate only when the section scrolls into view (ScrollTrigger). Each bar group staggers by category, then by skill within.
- Add a **scanning line** that sweeps vertically across the entire skills section once on enter (a 1px horizontal amber line that moves from top to bottom of the section at ~60% opacity).

### Contact Section (Open Comms)
- `CornerBrackets` draw in.
- Input fields slide in from below, staggered.
- Add a **blinking cursor** (`_`) that loops in the section header subtitle ("Transmission channel active_").
- Transmit button: on click, trigger a brief **signal-sent animation** — the button text changes to `TRANSMITTING...` with a progress bar that fills in ~1.5s, then resolves to `SIGNAL SENT ✓`. No actual form submission needed.

### Footer / Social Links
- Social links (`[ GITHUB ]` `[ LINKEDIN ]` etc.) should have a **scan-in hover** — a horizontal amber line sweeps across the text on hover.

---

## Featured Mission Placeholder

The `HeroSection` in `Sections.jsx` already has this comment block — preserve it exactly as a React component slot:

```jsx
{/* ============================================================
    PLACEHOLDER: FEATURED MISSION HERO SECTION
    Drop a <FeaturedMission /> component here when ready.
    Expected props: { title, thumbnail, tags, link }
    ============================================================ */}
```

Create a `FeaturedMission.tsx` component file that is **commented out by default**. It should render a cinematic project card below the tagline: full-width, with a large thumbnail area, project title in big Rajdhani type, tags, and a `[ VIEW MISSION ]` CTA button. When the time comes, it can be uncommented and a project dropped in with zero redesign.

---

## Nav Behaviour

The nav items map to sections:
- `Profile` → `#about`
- `Missions` → `#projects`
- `Systems` → `#skills`
- `Comms` → `#contact`

Add **active state highlighting** — as the user scrolls, the nav item corresponding to the current section should be highlighted (amberLight color). Use GSAP ScrollTrigger markers or IntersectionObserver for this.

---

## Performance Notes

- Keep the bundle lean. No heavy dependencies beyond GSAP.
- The CRT scanline overlay uses `position: fixed` with a repeating gradient — this is fine, but ensure it's on a high z-index and pointer-events: none.
- Lazy-load nothing — the site is small enough that everything should be in the initial bundle.
- Target 60fps on all animations. Prefer `transform` and `opacity` for GSAP tweens; avoid animating layout properties.

---

## What NOT to Change

- The color palette (amber + near-black). Do not introduce new colors.
- The font pairing (Rajdhani + Share Tech Mono).
- The HUD component primitives (CornerBrackets, SectionHeader, StatBar etc.).
- The section structure and copy (except replacing placeholder project data as specified above).
- The `TWEAK_DEFAULTS` config object — keep it as a runtime-editable config for name and tagline.

---

## Deliverable

A fully working Vite + React project with:
- All source files in `/src`
- `index.html` at root
- `vite.config.ts` configured for GitHub Pages deployment (base: `'/My-Portfolio/'`)
- `package.json` with correct scripts: `dev`, `build`, `preview`
- A brief `README.md` explaining how to run and deploy

The build output (`npm run build`) should produce a fully self-contained static site ready for `gh-pages` deployment.
