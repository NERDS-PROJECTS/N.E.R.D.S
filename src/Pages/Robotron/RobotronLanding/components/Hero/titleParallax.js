/**
 * ==================================================
 * TITLE PARALLAX — configurable depth for the typography
 * ==================================================
 *
 * The ROBOTRON / 2026 / COMING SOON typography lives INSIDE the scene's
 * existing parallax system: it is registered with the same
 * ParallaxProvider mouse engine that drives the twelve plates (there is
 * deliberately NO second mouse system). This module only says HOW MUCH
 * the title answers that shared cursor position.
 *
 * DEPTH
 * -----
 * The scene's own depth scale, as authored in sceneLayers.js, is:
 *
 *   scene 1  sky .................. mouseX  6 / mouseY  4
 *   scene 6  mid field ........... mouseX 30 / mouseY 19
 *   scene 12 rover (foreground) ... mouseX 60 / mouseY 38
 *
 * The title sits BETWEEN the distant background and the foreground, so
 * it moves more than the far sky but noticeably less than the rover —
 * roughly the mid-field band. It must never be completely static (that
 * would read as a fixed UI overlay pasted on the scene) and it must
 * never travel like a foreground plate.
 *
 * ONE LAYER, ONE TRANSFORM
 * ------------------------
 * `groupId` is registered with the parallax engine exactly once, and the
 * whole composed graphic (kicker line, ROBOTRON, 2026, COMING SOON,
 * divider, decorative lines) is rendered inside that single wrapper. The
 * engine therefore moves the group as a rigid unit and the words can
 * never drift apart from each other. Individual letters/words are NEVER
 * parallaxed independently — if you want a word to travel differently,
 * that is what the scene layers are for, not the title.
 *
 * TUNING
 * ------
 * Change the numbers below and both the mouse follow and the scroll
 * drift update together; Hero.jsx reads them and hardcodes nothing.
 */
export const titleParallax = {
  /*
   * Shared name for the whole typography group. Registered once with the
   * parallax engine (see ParallaxProvider.register) so the composed
   * graphic is always a single rigid layer.
   */
  groupId: 'hero-type',

  /*
   * Class on the element that carries the label reveal (clip-path). Kept
   * here so the JSX and the GSAP tween reference one name instead of a
   * hardcoded string each. Defined in Hero.css.
   */
  maskClass: 'title-mask',

  /*
   * Artistic depth 0..1, forwarded to ParallaxLayer as `depth` and
   * exposed to CSS as `--depth` / `data-depth`. Purely informative for
   * debugging the composition — the real movement comes from the two
   * multipliers below.
   */
  depth: 0.15,

  /*
   * Per-axis strength of the title's response to the shared cursor
   * position (-1..1 per axis). 1 = the value computed from `baseTravel`,
   * 0.5 = half of it, 0 = the title ignores the cursor entirely.
   * Kept separate so one axis can be softened without touching the other
   * (a wide title usually wants less vertical travel than horizontal).
   */
  xMultiplier: 1,
  yMultiplier: 1,

  /*
   * Base mouse travel, in px of translate per unit cursor deflection.
   * Chosen from the table above: just inside the far field (scene 2),
   * i.e. clearly quieter than the mid-field plates (30px) and far below
   * the rover (60px), yet well above the near-static sky (6px) — so the
   * typography genuinely participates in the camera move.
   */
  baseTravel: { x: 16, y: 11 },

  /*
   * Scroll drift while the hero leaves the viewport, in px, driven by the
   * EXISTING GSAP ScrollTrigger scrub in Hero.jsx (the same `data-sy`
   * mechanism every scene plate uses). Negative = the title drifts up
   * against the scroll direction, which reads as "further away than the
   * foreground" without changing any layer's behaviour.
   */
  scrollY: -130,
  scrollX: 0,
};

/**
 * Mouse parallax travel for the title group, in px per unit cursor.
 * Derived from `baseTravel` × the multipliers so the strength is defined
 * in exactly one place.
 */
export const titleMouse = {
  x: titleParallax.baseTravel.x * titleParallax.xMultiplier,
  y: titleParallax.baseTravel.y * titleParallax.yMultiplier,
};

export default titleParallax;
