---
name: interactive-svg-diagrams
description: "Trigger: crear diagrama interactivo, svg animado, interactive diagram, animated svg, cpu animation. Build high-fidelity animated SVG diagrams in React."
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Activation Contract

Create or update interactive SVG components in slide decks when:
- Visualizing computer architecture components (Control Unit, Processing Elements, registers, memory blocks).
- Demonstrating dynamic processes (data flow, CPU execution cycles, pipelines, vector operations).
- Replacing static images (.jpg, .png) or overly complex text-based tables.

Do not use this skill for simple diagrams that can be expressed with basic CSS layouts or when static diagrams are sufficient.

## Hard Rules

- **Inline SVGs:** Always build diagrams using inline SVG tags (`<svg>`) inside React components to allow direct manipulation and high performance.
- **Responsive Layout:** Use the `viewBox` attribute (e.g., `viewBox="0 0 540 200"`) and remove fixed width/height attributes so diagrams scale dynamically to fit any container.
- **Autoplay Loop:** When rendering a standalone diagram (no external control), implement a React `useEffect` with a `setInterval` that increments a local cycle state to animate the diagram automatically.
- **Native SVG Animations:** Use standard SVG `<animate>` elements nested within `<circle>` or `<rect>` for GPU-accelerated motion (e.g., `<animate attributeName="cy" from="195" to="145" dur="1s" repeatCount="indefinite" />`).
- **Synchronized State:** For comparative views (e.g. comparing two architectures), accept a shared `cycle` prop from the parent component to drive both animations in sync.
- **Color Coding:** Style borders and highlights with theme-consistent color schemes (e.g., Amber for spatial Array lockstep, Purple for temporal Vector pipelines, Cyan for memory load, Green for store).

## Decision Gates

| Animation Requirement | Action / Technique |
|---|---|
| Continuous data movement along bus lines | Use `<circle>` with nested `<animate>` tags targeting `cx` or `cy`. |
| Pipelined element flow | Calculate each item's active stage as `stage = cycle - itemIndex`. Map `stage` to specific `cx` coordinates. |
| Stage/PE activity glow | Set the `stroke` and `strokeWidth` of the stage `<rect>` dynamically based on whether the stage has an active element. |
| Memory state updates | Conditionally render stored values inside memory registers depending on whether the current cycle is greater than or equal to the writeback/store cycle. |

## Execution Steps

1. **Scaffold the Component:** Define a React component accepting a `cycle` prop (which triggers state updates). Include an autoplay fallback `useEffect` for standalone rendering:
   ```javascript
   function Diagram({ cycle: externalCycle }) {
     const [localCycle, setLocalCycle] = useState(0);
     const isInteractive = externalCycle !== undefined;
     const cycle = isInteractive ? externalCycle : localCycle;
     // useEffect for setInterval loop...
   }
   ```
2. **Design Grid Coordinates:** Sketch the coordinates of the block elements (CU, ALU, stage boxes) and store them in an SVG view box of reference size (e.g., `420x260` or `540x200`).
3. **Draw Architecture Layout:** Render background lines, arrows, buses, and units using `<rect>`, `<line>`, `<path>`, and `<text>` elements. Apply transition classes (e.g., `transition-all duration-300`) to enable smooth glow changes.
4. **Draw Dynamic Elements:** Map over the data array to render floating circles representing data packets. Calculate their coordinates dynamically based on the current `cycle`.
5. **Add Local Labels:** Display values, registers indexes (e.g., `v[0]`, `a[1]`), and operations inside the blocks dynamically based on the active cycle.

## Output Contract

Return:
- A clean React component using inline SVGs, styled with Tailwind classes.
- Smooth transitions for glows and SVG positions.
- No external animation library dependencies (like Framer Motion) for core SVG pathing to ensure lightweight builds.

## References

- [Parte2.jsx](file:///home/yan2005dris-afk/Documentos/GitHub/Grupo%205%20-%20Diapositivas/src/slides/Parte2.jsx) — Production implementation of `ArrayDiag` and `VectorDiag` interactive SVG components.
