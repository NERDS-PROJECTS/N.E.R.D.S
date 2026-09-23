/**
 * ==================================================
 * PARALLAX SCENE LAYER CONFIGURATION
 * Edit layer position, scale, depth and floating here
 * ==================================================
 *
 * This is the ONLY place the Hero scene composition is defined. Hero.jsx
 * just maps this array to markup and never hardcodes a position, scale,
 * depth or animation â€” change a number here and the scene follows.
 *
 * ABOUT THE ASSETS
 * ----------------
 * The twelve files in public/scene are 1920x1080 renders of ONE scene,
 * each showing a single depth band drawn in its final place on a pure
 * white matte. They are NOT cropped sprites, so the composition is
 * reproduced by stacking all twelve and keying the white matte out to
 * real alpha (done once, offline, by key-white-matte.ps1 â€” the runtime
 * applies NO blend modes and NO filters).
 *
 * Because every plate is pixel-registered to the same 1920x1080 canvas,
 * the scene is one rigid group: each layer only needs a parallax DEPTH,
 * not its own position. `x`/`y`/`scale` are still honoured per layer
 * (applied as a transform on the plate) so a layer can be nudged or
 * re-scaled without touching CSS.
 *
 * FIELD REFERENCE
 * ---------------
 *  id            1..12, also the paint order (1 = farthest sky)
 *  src           path under public/ (the alpha-keyed plates)
 *  label         human-readable role, for editing only
 *  x / y         static offset of the plate, in % of the scene box
 *                (0,0 = perfectly registered with the other layers)
 *  scale         static zoom of the plate (1 = pixel-exact)
 *  depth         0..1 artistic depth, forwarded to ParallaxLayer
 *  slot          ParallaxLayer semantic slot
 *  zIndex        stacking order (1 = back â€¦ 12 = front)
 *  mouseX/mouseY px of cursor parallax travel at full deflection
 *  sy / sx       px of scroll parallax across the hero exit
 *  float         continuous UP/DOWN drift â€” layers 3..11 only
 *    amplitude   px of vertical travel (Â±)
 *    duration    seconds for one leg of the loop
 *    delay       seconds; varied per layer so nothing is synchronised
 *    rotate      deg of sway, for a slightly organic feel
 */

/** Hard ceiling on parallax travel per axis (px). */
export const MAX_TRAVEL = 64;

/** Layers that receive the continuous floating animation (3 through 11). */
export const FLOAT_LAYER_IDS = [3, 4, 5, 6, 7, 8, 9];

/** True when a layer id should float. Keeps the "3..11" rule in one place. */
export const shouldFloat = (id) => FLOAT_LAYER_IDS.includes(id);

/** Alpha-keyed plate path: 4 -> "/scene/new scene 4 (alpha).png" */
const plate = (n) => `/scene/new scene ${n} (alpha).png`;

export const sceneLayers = [
  /* ---- 1â€“2 : sky + distant environment (no floating) --------------- */
  {
    id: 1,
    src: plate(1),
    label: 'background sky',
    x: 0,
    y: 0,
    scale: 1,
    depth: 0.05,
    slot: 'background',
    zIndex: 1,
    mouseX: 6,
    mouseY: 4,
    sy: 70,
    sx: 0,
  },
  {
    id: 2,
    src: plate(2),
    label: 'distant environment',
    x: 0,
    y: 0,
    scale: 1,
    depth: 0.1,
    slot: 'background',
    zIndex: 2,
    mouseX: 11,
    mouseY: 7,
    sy: 62,
    sx: 0,
  },
  /* ---- 3â€“5 : far floating environment ------------------------------ */
  {
    id: 3,
    src: plate(3),
    label: 'floating environment',
    x: 0,
    y: 0,
    scale: 1,
    depth: 0.16,
    slot: 'atmosphere',
    zIndex: 3,
    mouseX: 17,
    mouseY: 10,
    sy: 54,
    sx: 0,
    float: { amplitude: 12, duration: 4.2, delay: 0, rotate: 0.4 },
  },
  {
    id: 4,
    src: plate(4),
    label: 'floating environment',
    x: 0,
    y: 0,
    scale: 1,
    depth: 0.21,
    slot: 'atmosphere',
    zIndex: 4,
    mouseX: 22,
    mouseY: 13,
    sy: 47,
    sx: 0,
    float: { amplitude: 16, duration: 5.1, delay: 0.7, rotate: 0.6 },
  },
  {
    id: 5,
    src: plate(5),
    label: 'floating environment',
    x: 0,
    y: 0,
    scale: 1,
    depth: 0.25,
    slot: 'atmosphere',
    zIndex: 5,
    mouseX: 26,
    mouseY: 16,
    sy: 42,
    sx: 0,
    float: { amplitude: 10, duration: 3.8, delay: 1.2, rotate: 0.3 },
  },

  /* ---- 6â€“8 : mid-field floating environment ------------------------ */
  {
    id: 6,
    src: plate(6),
    label: 'floating environment',
    x: 0,
    y: 0,
    scale: 1,
    depth: 0.29,
    slot: 'far',
    zIndex: 6,
    mouseX: 30,
    mouseY: 19,
    sy: 38,
    sx: 0,
    float: { amplitude: 14, duration: 4.7, delay: 0.35, rotate: 0.5 },
  },
  {
    id: 7,
    src: plate(7),
    label: 'floating environment',
    x: 0,
    y: 0,
    scale: 1,
    depth: 0.33,
    slot: 'far',
    zIndex: 7,
    mouseX: 34,
    mouseY: 22,
    sy: 34,
    sx: 0,
    float: { amplitude: 9, duration: 3.5, delay: 1.5, rotate: 0.25 },
  },
  {
    id: 8,
    src: plate(8),
    label: 'floating environment',
    x: 0,
    y: 0,
    scale: 1,
    depth: 0.37,
    slot: 'mid',
    zIndex: 8,
    mouseX: 38,
    mouseY: 25,
    sy: 30,
    sx: 0,
    float: { amplitude: 18, duration: 5.6, delay: 0.95, rotate: 0.7 },
  },

  /* ---- 9â€“11 : near floating environment + foreground rocks --------- */
  {
    id: 9,
    src: plate(9),
    label: 'floating environment',
    x: 0,
    y: 0,
    scale: 1,
    depth: 0.42,
    slot: 'mid',
    zIndex: 9,
    mouseX: 43,
    mouseY: 28,
    sy: 25,
    sx: 0,
    float: { amplitude: 11, duration: 4.0, delay: 1.8, rotate: 0.35 },
  },
  /* ---- 10, 11 removed: those plates held only the two static painted
     ships (verified — nothing else on their canvas), now superseded by
     the animated <Ships /> layer in Hero.jsx. ------------------------- */

  /* ---- 12 : closest foreground rock + rover (no floating) ---------- */
  {
    id: 12,
    src: plate(12),
    label: 'foreground rock + rover',
    x: 0,
    y: 0,
    scale: 1,
    depth: 0.6,
    slot: 'subject',
    zIndex: 12,
    mouseX: 60,
    mouseY: 38,
    sy: -26,
    sx: 0,
  },
];

/**
 * Total travel budget for a layer, used to size its parallax overscan.
 * Overscan = mouse + scroll + the layer's own float drift, plus a small
 * slack so sub-pixel rounding can never expose an edge.
 */
export function travelBudget(layer) {
  const clamp = (v) => Math.min(Math.abs(v || 0), MAX_TRAVEL);
  const mx = clamp(layer.mouseX);
  const my = clamp(layer.mouseY);
  const sx = clamp(layer.sx);
  const sy = clamp(layer.sy);
  const amp = layer.float ? Math.min(layer.float.amplitude || 0, 24) : 0;
  /* +6px slack absorbs sub-pixel rounding and the rotate() sway. */
  return { x: mx + sx + 6, y: my + sy + amp + 6 };
}

export default sceneLayers;

