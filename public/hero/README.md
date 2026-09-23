# ROBOTRON 2026 — Hero asset pipeline

The cinematic hero is built from **layered depth slots**. Drop a PNG/WebP into any
slot below and reference it from `src/components/Hero/Hero.jsx` (swap the `<img
src>` inside the matching `ParallaxLayer`). No animation code changes are needed —
each layer already has its parallax, depth and scroll behaviour configured.

## Slot map

| Folder (slot)        | Depth | Role                                |
| -------------------- | ----- | ----------------------------------- |
| `hero/background/`   | 0.05  | deep space, stars, planet, nebula   |
| `hero/far/`          | 0.18  | distant floating islands, towers    |
| `hero/mid/`          | 0.25  | main arches / platforms / pylons    |
| `hero/foreground/`   | 0.35  | rocky metallic foreground slabs     |
| `hero/subject/`      | 0.45  | main robot / subject object         |
| `hero/atmosphere/`   | 0.12  | atmospheric fog / haze              |
| `hero/effects/`      | 0.02  | vignette, grain, scan overlays      |
| `hero/ui/`           | 0.10  | HUD / technical overlays            |

## Replace an SVG with a PNG

```jsx
{/* before: procedural SVG planet */}
<ParallaxLayer id="planet" slot="background" depth={0.14} mouseX={6} mouseY={4} zIndex={30}>
  <img src="/hero/background/planet.svg" alt="" className="planet-img" />
</ParallaxLayer>

{/* after: your transparent PNG/WebP */}
<ParallaxLayer id="planet" slot="background" depth={0.14} mouseX={6} mouseY={4} zIndex={30}>
  <img src="/hero/background/planet.png" alt="" className="planet-img" />
</ParallaxLayer>
```

## Per-layer tuning props (ParallaxLayer)

- `mouseX` / `mouseY` — px of translate per unit cursor (-1..1). Foreground moves more.
- `tiltY` / `tiltX` — degrees of 3D rotation per unit cursor (subtle, `preserve-3d`).
- `sy` / `sx` — px of scroll offset when the hero leaves viewport (negative = moves up faster).
- `fade` — fades the layer out as you scroll into the next section.
- `zIndex` — stacking order within the scene.

## Guidelines

- Do **not** edit the files in `public/hero/` if you keep the SVGs — add your own
  files with new names to preserve the originals.
- Keep transparency. Layered PNGs render without JPEG-style edges.
- Account for transparent padding when positioning (see `.planet-img`, `.robot-img`,
  etc. in `Hero.css`).
- Large PNGs are lazy/decoded by the browser; consider WebP for lower weight.