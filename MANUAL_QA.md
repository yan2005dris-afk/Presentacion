# Manual QA Checklist — tema-claro-oscuro

Run through these in order. Each item must pass before merge. Replace `- [ ]` with `- [x]` as you go.

## How to run

1. **Boot the app** — `npm run dev` (or `npx vite build && npx vite preview`).
2. **Open Chrome DevTools** → **Rendering** panel → under "Emulate CSS media feature prefers-color-scheme" choose **light**, **dark**, or **no-preference** to test the OS toggle live (relevant to QA-7 / QA-8 / QA-9).
3. **Reset between runs** — open DevTools console and run `localStorage.removeItem('theme')` then refresh.
4. **Inspect `document.documentElement.classList`** at any point — the class is always exactly one of `light` or `dark` (never `system`).

## State + UI

- [ ] **QA-1** (REQ-2 / SCENARIO-1): On first visit (after `localStorage.removeItem('theme')` + refresh), the app boots in **System** mode — the toggle shows the Monitor icon and the label `Auto`. The `<html>` element carries either `light` or `dark` reflecting the OS preference at the time of load.
- [ ] **QA-2** (REQ-5 / SCENARIO-2): Clicking the toggle cycles light → dark → system → light. The icon swaps Sun → Moon → Monitor → Sun and the label reads `LIGHT` → `DARK` → `AUTO` → `LIGHT`.
- [ ] **QA-3** (REQ-6 / SCENARIO-3): With body focused and no modifier held, pressing **T** cycles the same way. `Ctrl+T`, `Cmd+T`, and `Alt+T` are ignored (browser default behavior preserved). Focusing a text input first and pressing T must **type the letter `t`**, NOT cycle the theme.

## Persistence + FOUC

- [ ] **QA-4** (REQ-3 / REQ-8 / SCENARIO-4): Set theme to dark via the toggle, then **refresh** the page — the app loads directly in dark with no flash of light during the initial paint. The path: FOUC inline script in `<head>` runs before paint → resolves stored `dark` → adds `dark` class → first paint matches.
- [ ] **QA-5** (REQ-3 / REQ-8 / SCENARIO-4): Set theme to light, refresh — app loads directly in light, no flash of dark during initial paint.
- [ ] **QA-6** (REQ-3): `localStorage.getItem('theme')` returns the current theme name — one of the strings `'light'`, `'dark'`, or `'system'`. Manually setting `localStorage.setItem('theme', 'garbage')` and refreshing must recover to `'system'` and overwrite the bad value on next toggle.

## System mode live

- [ ] **QA-7** (REQ-4 / SCENARIO-5): In System mode + OS set to light — the app shows the light theme regardless of prior state.
- [ ] **QA-8** (REQ-4 / SCENARIO-5): In System mode + OS set to dark — the app shows the dark theme regardless of prior state.
- [ ] **QA-9** (REQ-4 / SCENARIO-5): With the app in System mode, toggle the OS preference (Chrome DevTools → Rendering → emulate `prefers-color-scheme`) — the app re-renders within ~1 second WITHOUT any user click. The `<html>` class flips and visible surfaces change.

## Chrome (App.jsx)

- [ ] **QA-10** (REQ-10 / REQ-12): In light mode the header (slide title + speaker subtitle + count chip), the footer (progress segments + section nav + prev/next buttons), and the speaker-notes drawer are all readable: chrome borders are visible, text contrasts at least 4.5:1, the count chip + section buttons have a light surface distinct from the page background.
- [ ] **QA-11** (REQ-10 / REQ-12): Same surfaces in dark mode are readable and look unchanged from before this change (regression check). Toggle between modes without any element shifting size or position (REQ-10 layout-shift scenario).

## Slides

- [ ] **QA-12** (REQ-10 / SCENARIO-6): Cycle through every slide (P0–P4 + práctica + introducciones) in **light mode** — no unreadable text (white-on-white or pale-gray-on-white), no invisible accents, no contrast below 4.5:1. Pay special attention to slide 2 register visuals and slide 3.3 SSE/AVX instruction table.
- [ ] **QA-13** (REQ-10 / SCENARIO-6): Same full cycle in **dark mode** — visuals should match the prior dark-only appearance within reason (color of code panels, gradient hero cards, etc.).

## Accent contrast

- [ ] **QA-14** (REQ-11): In **light mode**, the following accent text classes render with ≥ 4.5:1 contrast against `bg-white` / `bg-slate-50`:
  - `text-cyan-600` — was `text-cyan-400` in dark
  - `text-amber-600` — was `text-amber-400`
  - `text-emerald-600` — was `text-emerald-400`
  - `text-purple-600` — was `text-purple-400`
  - `text-rose-700` — was `text-rose-300`
  - `text-red-600` — was `text-red-400`
  - Spot-check slide 2.1 (cyan/amber/purple), 3.3 (cyan/purple/emerald), 4.2 (cyan/purple/amber/indigo).
- [ ] **QA-15** (REQ-12): Gradient badges in the chrome (e.g., section-color chip in header — `from-cyan-500 to-blue-500`, etc.) render correctly in both themes. The `text-black` on gradient rule is preserved (gradient backgrounds sit at the same luminance in both themes).

## Cross-cutting

- [ ] **QA-16** (REQ-9 / SCENARIO-1): At NO point is the literal class `system` present on `document.documentElement`. The class is always exactly `light` or `dark`. Verify in DevTools after toggling in any sequence.
- [ ] **QA-17** (Cross-tab sync): Open the app in two browser tabs. Change theme in tab A — tab B's UI updates within ~1s (storage event handled by hook). Requires both tabs pointed at the same `localhost:port`.
- [ ] **QA-18** (Reduced motion / browser support): If `window.matchMedia` is unavailable, the app degrades to light mode without crashing (try blocking it in DevTools → Sensors).

## References

- Spec REQ IDs: see `sdd/tema-claro-oscuro/spec`
- Scenario IDs: see `sdd/tema-claro-oscuro/spec`
- Mapping tables (slate / accent): see `sdd/tema-claro-oscuro/design` §2
- Implementation commits: see `git log --oneline -10` after `sdd-apply` for tema-claro-oscuro
