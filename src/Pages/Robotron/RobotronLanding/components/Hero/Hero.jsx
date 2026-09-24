import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useReducedMotion from '../../hooks/useReducedMotion';
import ParallaxLayer from '../ParallaxLayer/ParallaxLayer';
import HUD from '../HUD/HUD';
import Ships from '../Ships/Ships';
import { sceneLayers, shouldFloat, travelBudget } from './sceneLayers';
import { titleParallax, titleMouse } from './titleParallax';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero
 * ----------------------------------------------------------------------
 * The cinematic 2.5D environment occupying exactly 100vh — this page has
 * no section after Hero (see RobotronLanding.jsx), so Hero IS the whole
 * document and there is deliberately no scrollable distance. Composed
 * from depth slots (background â†’ subject) plus the UI/text layer. Two
 * GSAP tweens:
 *  1. load reveal   â€” mask/scale/fade the scene into being
 *  2. scroll scrub  â€” writes per-layer --sx/--sy + fade + scale as the
 *                     hero leaves the viewport. Currently inert (no
 *                     scroll distance to drive it); left in place so a
 *                     future section after Hero gets the transition for
 *                     free rather than needing this rebuilt.
 */
export default function Hero() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const titleRef = useRef(null);

  /* ---------------- Real viewport height (mobile) ----------------
     Hero is sized to exactly one screen (100svh, with a 100vh fallback
     in Hero.css) so the page never scrolls. `svh` is the CSS-native fix
     for the classic mobile `100vh`-is-taller-than-what's-visible bug, but
     it's a newer unit (Chrome 108+/Safari 15.4+) — an older WebView some
     in-app browsers still bundle (seen: WhatsApp's Android in-app
     browser) silently falls back past svh to the plain 100vh declared
     before it, which reintroduces the scroll. `window.innerHeight` always
     reflects whatever's ACTUALLY visible regardless of unit support, so
     it's written to a CSS var here as a universal belt-and-suspenders
     fallback Hero.css can key off directly.

     A single measurement isn't enough, though: mobile browser chrome
     (address bar / bottom toolbar) can collapse AFTER first paint — on
     scroll, on a tap, or just settling a moment after load — which grows
     the real visible area without necessarily firing a plain `resize`
     event on every engine. If Hero was sized from the earlier, SMALLER
     reading, that growth exposes a gap below it showing the page's own
     background — a black band at the bottom on tall phones specifically,
     because that's where the extra space lands. `visualViewport` is the
     API built to track exactly this (it fires its own `resize` for
     toolbar changes that don't always trigger `window`'s), so it's
     preferred where available; `window.innerHeight` stays as the
     fallback for engines without it. */
  useEffect(() => {
    const vv = window.visualViewport;
    const setVh = () => {
      const h = vv ? vv.height : window.innerHeight;
      document.documentElement.style.setProperty('--vh100', `${h}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);
    vv?.addEventListener('resize', setVh);
    /* Re-check a beat after mount too, in case the toolbar was still
       settling when the listeners above were attached. */
    const settleTimer = setTimeout(setVh, 300);
    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
      vv?.removeEventListener('resize', setVh);
      clearTimeout(settleTimer);
    };
  }, []);

  /* ---------------- Width-aware wordmark sizing ----------------
     The wordmark (ROBOTRON) must be BIG but it must also FIT. CSS alone
     cannot express this: `font-size` sizes the glyph HEIGHT, and nothing
     in CSS knows how WIDE the resulting word will be. A purely vw/vh
     font-size therefore rendered the word at up to 1.94x the viewport
     width, and `.hero { overflow: hidden }` cropped the leading R and
     trailing N at every size — it read as if the title were missing.

     A hardcoded em-per-word constant is not reliable either, because the
     ratio depends on the font actually loaded (Orbitron vs its fallback),
     the letter-spacing, and the device's rasterisation. The advance is
     therefore MEASURED and the font-size derived from it:

       --title-fit = available width / (measured advance x safety)

     The measurement is taken on the elements that SHRINK-WRAP the glyphs
     (`.title-mask`, an inline-block wrapping the h1) rather than on a
     synthetic clone or on the h1 itself. A detached probe with the same
     font stack measured ~11% narrower than the real element, and
     `.hero-title-main` is `display: block` so its box reports the
     CONTAINER width rather than the word width. Reading the laid-out
     width of the inline-block makes the result correct by construction,
     for any font, size or viewport, with no magic constant to sync.

     The h1 is temporarily unlocked to a known size so the natural
     advance can be read, then the fit is applied. This runs on mount,
     after the webfont settles, and on resize — never per frame. */
  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;
    const main = title.querySelector('.hero-title-main');
    if (!main) return;
    /* The hero section is the containing block for this effect; resolve it
       locally rather than reaching for a binding owned by a sibling effect
       (which would be a free variable here and throw on first run). */
    const hero = ref.current || title.closest('.hero');
    if (!hero) return;

    /* A reference font-size at which to sample the word's advance. Large
       enough that hinting noise is negligible, small enough not to force
       a huge layout. */
    const SAMPLE = 100;

    const apply = () => {
      /* Measure at the sample size, unlocked from the current clamp so the
         natural width is what we read. */
      const prevFit = title.style.getPropertyValue('--title-fit');
      title.style.setProperty('--title-fit', `${SAMPLE}px`);
      /* The advance must be read from an element that SHRINK-WRAPS the
         glyphs. `.hero-title-main` is `display: block`, so its box is
         stretched to the full column width and reports the CONTAINER
         width, not the word width — dividing that by the sample size
         yields a bogus ratio and the word collapses to the clamp floor.
         `.title-mask` is `inline-block`, so its width IS the painted
         advance of `ROBOTRON`. Fall back to the h1 only if the mask is
         missing (e.g. a future markup change). */
      const measureEl = main.querySelector('.title-mask') || main;
      const naturalW = measureEl.getBoundingClientRect().width;
      const emPerWord = naturalW / SAMPLE;
      if (!Number.isFinite(emPerWord) || emPerWord <= 0) {
        /* Restore whatever was there rather than leaving the sample size
           applied — otherwise the wordmark would render at 100px. */
        if (prevFit) title.style.setProperty('--title-fit', prevFit);
        else title.style.removeProperty('--title-fit');
        return;
      }

      /* Available width = the width the lockup is actually laid out inside,
         minus its own inline padding. The gutter is applied as
         `padding-inline` on .hero-title (NOT on .hero), so it is read from
         the title. `clientWidth` of the hero's parent (.hero is the
         containing block and is full-bleed) is more reliable than
         `documentElement.clientWidth`, which changes when the page grows a
         scrollbar mid-measure and produced a word 2.6% too wide. */
      const tcs = getComputedStyle(title);
      const titlePad =
        parseFloat(tcs.paddingLeft || '0') + parseFloat(tcs.paddingRight || '0');
      const available =
        (hero.parentElement ? hero.parentElement.clientWidth : document.documentElement.clientWidth) -
        titlePad;
      if (available < 200) {
        if (prevFit) title.style.setProperty('--title-fit', prevFit);
        else title.style.removeProperty('--title-fit');
        return;
      }

      /* 1.02 headroom: sub-pixel glyph extents can add a pixel or two at
         very large sizes, and the fractional width rounds up. The wordmark
         should sit just inside the gutters rather than butt against them. */
      const fit = available / (emPerWord * 1.02);
      title.style.setProperty('--title-fit', `${fit.toFixed(2)}px`);
    };

    apply();

    /* First paint can report a partial layout (the effect runs before the
       browser has committed the hero's box, and `--gutter` only resolves
       after the first style recalc), so re-apply for the next few frames —
       by then the geometry is real. Bounded work, not a per-frame loop. */
    const frames = [];
    for (let i = 1; i <= 3; i++) frames.push(requestAnimationFrame(apply));

    /* Re-measure once the webfont swaps in — belt-and-braces for slow
       connections; on a first visit `fonts.ready` can resolve before the
       Google Fonts <link> main.jsx injects at runtime has even been
       requested, so it doesn't reliably catch a late Orbitron arrival.
       `loadingdone` does, for whatever finishes after. */
    if (document.fonts) {
      if (document.fonts.ready) document.fonts.ready.then(apply).catch(() => {});
      document.fonts.addEventListener?.('loadingdone', apply);
    }

    /* Re-measure on viewport changes; the size is width-driven, so a resize
       changes the available width without changing the advance ratio. */
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };
    window.addEventListener('resize', onResize);

    /* The REAL cause of the clipped-R/N bug: every trigger above (mount,
       the 3 bounded rAFs, fonts.ready/loadingdone — all of which fire
       within ~250ms of mount) lands while the load-reveal timeline's
       `.hero-type-anim` tween is still live-animating `scale` on an
       ANCESTOR of `.title-mask` (0.965 -> 1 over 1.2s). getBoundingClientRect()
       reports the SCALED-DOWN size mid-tween, so every one of those
       measurements undercounts the word's true width — measured directly:
       a real page load logged emPerWord readings of 5.75, 5.00 and 5.63
       during that window, none close to the correct ~6.48 read a few
       seconds later once the scale had settled at 1. A too-small
       emPerWord makes the fit calculation think each glyph is narrower
       than it is, so it picks a font-size that overflows for real. Once
       Hero's reveal timeline reports 'robotron:hero-revealed' (its
       onComplete — see the load-reveal effect below), every transform
       it drove is guaranteed to have reached its resting value, so this
       is the one re-measurement that's certain to be correct. */
    const onRevealed = () => apply();
    window.addEventListener('robotron:hero-revealed', onRevealed);

    return () => {
      frames.forEach(cancelAnimationFrame);
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('robotron:hero-revealed', onRevealed);
      document.fonts?.removeEventListener?.('loadingdone', apply);
    };
  }, []);

  /* ---------------- Load reveal timeline ---------------- */
  useEffect(() => {
    if (reduced) return;
    const hero = ref.current;
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      /* Signals the rest of the page (AudioPlayer) that the hero has
         fully materialized, so background music can start once
         everything is actually visible rather than mid-reveal. */
      onComplete: () => window.dispatchEvent(new Event('robotron:hero-revealed')),
    });

    tl.from('.hud-corner', { opacity: 0, duration: 0.5, stagger: 0.06 })
      .from('.hero-techno', { opacity: 0, duration: 0.8 }, '-=0.3')
      /* Reveal the twelve scene layers farthest → closest, then
         title/content. Only opacity is animated on the layers so their
         CSS-transform parallax (--mx/--sx/…) is never overwritten.
         Built from the same config that renders them, so adding or
         reordering a layer needs no change here. */
      .from(
        sceneLayers
          .slice()
          .sort((a, b) => b.zIndex - a.zIndex)
          .map((l) => hero.querySelector(`.scene-layer[data-scene-id="${l.id}"]`))
          .filter(Boolean),
        { opacity: 0, duration: 1.0, stagger: 0.08 },
        '-=0.5'
      )
      .from('.hud-el', { opacity: 0, duration: 0.8, stagger: 0.09 }, '-=0.9')
      /* TITLE GROUP — the whole composition (ROBOTRON / 2026 / COMING SOON
         / divider / decorative lines) reveals as ONE unit, so its exact
         internal composition is never disturbed.

         This tween runs on .hero-type-anim, NOT on the .pl parallax
         wrapper and NOT on .hero-title itself. Two systems write
         `transform` here and they must never share an element:

           .pl                 → parallax + scroll  (translate3d, CSS vars)
           .hero-type-anim     → ENTRANCE animation (GSAP y / scale / blur)
           .hero-title         → composed graphic   (untransformed)

         Because the entrance owns the INNER wrapper, GSAP cannot
         overwrite the outer parallax transform, and the parallax engine
         cannot overwrite the entrance pose — both apply at once, and
         the final resting position is exactly the CSS-configured one.
         The mask reveal also lives on the wrapper (clip-path on the
         element that is translating) so no extra transform is needed
         for the sweep. */
      .fromTo(
        '.hero-type-anim',
        { y: 34, scale: 0.965, opacity: 0, filter: 'blur(14px)' },
        { y: 0, scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.2 },
        '-=0.8'
      )
      .fromTo(
        `.${titleParallax.maskClass}`,
        { clipPath: 'inset(0 105% 0 0)' },
        { clipPath: 'inset(0 0 0 0)', duration: 1.1 },
        '-=0.9'
      )

      /* Three display lines (ROBOTRON / 2026 / COMING SOON) rise into
         place one after another as the startup lockup resolves, so the
         big centrepiece types itself on. Each line fades and scales in on
         its own, staggered from the others, rather than relying solely on
         the group-level opacity fade (.hero-type-anim fromTo). */

      .from('.hero-title-main', { y: 52, opacity: 0, scale: 0.9, duration: 1.4 }, '-=0.5')
      .from('.hero-year', { y: 40, opacity: 0, scale: 0.9, duration: 1.2 }, '-=0.65')
      .from('.hero-coming-soon', { y: 28, opacity: 0, scale: 0.9, duration: 1.0 }, '-=0.6')
      /* Secondary detail (kicker, subtitle, rules, meta) — each on its OWN
         child element, never the group, so the group transform — and
         therefore the parallax — stays pristine. */
      .from('.kicker-line', { opacity: 0, y: -10, duration: 0.7 }, '-=0.9')
      .from('.hero-rule', { scaleX: 0, opacity: 0, duration: 0.8, stagger: 0.1 }, '-=0.8');

    /* tl.revert() (not kill()): React StrictMode mounts effects twice, and a
       plain kill() would leave the .from() start states (opacity 0) applied —
       the second mount would then animate 0→0 and the scene would never show. */
    return () => tl.revert();
  }, [reduced]);
/* ---------------- Scroll scrub parallax ---------------- */
  useEffect(() => {
    if (reduced) return;
    const hero = ref.current;
    /* Parse once, not per frame: cache each layer's scroll multipliers and
       hoist the constant .hero-fade lookup out of onUpdate. */
    const layers = Array.from(hero.querySelectorAll('.pl[data-sy], .pl[data-sx]'))
      .map((el) => ({ el, sy: parseFloat(el.dataset.sy || '0'), sx: parseFloat(el.dataset.sx || '0') }))
      .filter((l) => l.sy !== 0 || l.sx !== 0);
    const fades = Array.from(hero.querySelectorAll('[data-fade]'));
    const fadeRoot = hero.querySelector('.hero-fade');

    let lastP = -1;
    const st = ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      /* Raw style writes (not gsap.set) + change-guard: scrub fires onUpdate
         on every scroll frame; gsap.set() re-parses a CSS-var string on every
         call ×10 elements. Cached dataset + style.setProperty skips the
         parsing overhead, and identical-progress frames are skipped entirely. */
      onUpdate: (self) => {
        const p = self.progress;
        if (p === lastP) return;
        lastP = p;
        for (let i = 0; i < layers.length; i++) {
          const l = layers[i];
          l.el.style.setProperty('--sy', (l.sy * p).toFixed(2) + 'px');
          l.el.style.setProperty('--sx', (l.sx * p).toFixed(2) + 'px');
        }
        for (let i = 0; i < fades.length; i++) fades[i].style.opacity = (1 - p).toFixed(3);
        /* Written as a CSS var on the hero root (not a direct .style.transform
           on one wrapper) so both the background scene AND the separate
           foreground/rover wrapper can each apply their own `transform:
           scale(var(--hero-scroll-scale))` and stay in sync — see Ships.jsx
           for why the ships canvas must sit between them rather than inside
           either, and Hero.css for where this var is consumed. */
        hero.style.setProperty('--hero-scroll-scale', (1 + 0.05 * p).toFixed(4));
        if (fadeRoot) fadeRoot.style.opacity = (1 - p).toFixed(3);
      },
      onRefresh: (self) => self.update(),
    });

    // ScrollTrigger exposes kill(), not destroy(). Remove this instance on
    // StrictMode remount, hot reload, or reduced-motion changes.
    return () => st.kill();
  }, [reduced]);

  /* Renders one scene plate. Pulled out of the old single sceneLayers.map()
     so the rover (layer 12) can be rendered in a SEPARATE wrapper from the
     rest of the scene — see the markup below for why. */
  const renderSceneLayer = (layer) => {
    const floats = shouldFloat(layer.id);
    const budget = travelBudget(layer);
    const f = layer.float;

    return (
      <ParallaxLayer
        key={layer.id}
        id={`scene-${layer.id}`}
        slot={layer.slot}
        depth={layer.depth}
        zIndex={layer.zIndex}
        mouseX={layer.mouseX}
        mouseY={layer.mouseY}
        sx={layer.sx}
        sy={layer.sy}
        scale={layer.scale ?? 1}
        offsetX={layer.x}
        offsetY={layer.y}
        travelX={budget.x}
        travelY={budget.y}
        className="scene-layer"
        style={{ '--plate-scale': layer.scale ?? 1 }}
        data-scene-id={layer.id}
        animated
      >
        {floats ? (
          /* .scene-float is a SEPARATE element from the .pl
             parallax wrapper: .pl owns the parallax/offset
             transform and .scene-float owns the drift, so
             PARALLAX + FLOAT run at the same time instead of
             one overwriting the other. */
          <div
            className="scene-float"
            style={{
              '--float-amp': `${f.amplitude}px`,
              '--float-dur': `${f.duration}s`,
              '--float-delay': `${f.delay}s`,
              '--float-rot': `${f.rotate || 0}deg`,
            }}
          >
            <img
              src={layer.src}
              alt=""
              className="scene-plate"
              decoding="async"
              draggable="false"
            />
          </div>
        ) : (
          <img
            src={layer.src}
            alt=""
            className="scene-plate"
            decoding="async"
            draggable="false"
          />
        )}
      </ParallaxLayer>
    );
  };

  const backgroundLayers = sceneLayers.filter((l) => l.id !== 12);
  const roverLayer = sceneLayers.find((l) => l.id === 12);

  return (
    <section id="hero" ref={ref} className="hero" aria-label="ROBOTRON 2026 event hero">
      <div className="hero-fade">
        {/* ============================================================
            2.5D parallax scene, split into two wrappers so the ships
            canvas can sit BETWEEN them (behind the rover, in front of
            everything else) without living inside a transform-scaled
            ancestor — see the <Ships /> comment below.
            Composition (depth, positioning, animation) lives entirely in
            ./sceneLayers.js — this block only maps it to markup.
            scene 1 = farthest … scene 12 = nearest. Every plate is a full
            1920x1080 render registered to the same canvas, so they stack
            1:1; the white matte was keyed to real alpha offline by
            key-white-matte.ps1, so the plates composite with plain alpha
            (no blend modes, no filters — the artwork is unaltered).
            Layers 3..11 additionally drift continuously (.scene-float),
            which is a *separate* element from the parallax wrapper so the
            two transforms never collide.
            ============================================================ */}
        <div className="hero-techno">
          {backgroundLayers.map(renderSceneLayer)}
        </div>
        {/* Sibling of the scene wrappers, not a descendant: they get a live
            scale() transform while scrolling (via the --hero-scroll-scale
            var, applied in CSS on each wrapper individually), and having
            the ships canvas nested inside a transformed ancestor made its
            measured size drift by a few px on every scroll tick — forcing
            a full WebGL resize each time, which was the real source of
            the scroll-time lag/jitter and the ships snapping back to
            their start position. Sitting between the two scene wrappers
            also puts the ships behind the rover (layer 12) instead of
            flying in front of it. */}
        <Ships />
        <div className="hero-techno hero-techno--front">
          {roverLayer && renderSceneLayer(roverLayer)}
        </div>
<div className="hero-content">
          {/* HUD labels */}
          <ParallaxLayer id="hud" slot="ui" depth={0.1} zIndex={10} animated
            mouseX={3} mouseY={2} sy={28} fade>
            <HUD />
          </ParallaxLayer>

          {/* Title / identity — the typography group participates in the
              SAME parallax engine as the twelve plates (one shared cursor
              position, no second mouse system). Its depth is configured in
              ./titleParallax.js so the strength is defined in ONE place.

              STARTUP LOCKUP — three stacked display lines, centred:
                ROBOTRON
                2026
                COMING SOON
              with decorative rules above/below, exactly as one composed
              graphic block.

              Wrapper stack — each layer owns exactly one concern, so
              PARALLAX + ENTRANCE + optional glow can never overwrite each
              other:

                .pl.hero-type        <- parallax + scroll (engine, CSS vars)
                  .hero-type-anim    <- entrance animation (GSAP transform)
                    .hero-title      <- the composed graphic, untransformed

              The group is a single registered layer, so ROBOTRON, 2026,
              COMING SOON and the decorative lines keep their exact
              relative positions — no per-word or per-letter parallax. */}
          <ParallaxLayer id={titleParallax.groupId} slot="ui" depth={titleParallax.depth}
            zIndex={11} animated
            mouseX={titleMouse.x} mouseY={titleMouse.y}
            sx={titleParallax.scrollX} sy={titleParallax.scrollY}
            fade className="hero-type">
            <div className="hero-type-anim">
              <div className="hero-title" ref={titleRef}>
                {/* decorative rule + kicker above the wordmark */}
                <span className="hero-rule" aria-hidden="true" />
                <span className="kicker-line">N.E.R.D.S., NIT SILCHAR</span>

                {/* display line 1 */}
                <h1 className="hero-title-main">
                  <span className={titleParallax.maskClass}>ROBOTRON</span>
                </h1>

                {/* display line 2 */}
                <p className="hero-year">2026</p>

                {/* display line 3 + subtitle + meta */}
                <div className="hero-title-sub">
                  <p className="hero-coming-soon">COMING SOON<span className="hero-dot" aria-hidden="true">.</span></p>

                </div>

                {/* decorative rule + meta below the lockup */}
                <span className="hero-rule" aria-hidden="true" />
      
              </div>
            </div>
          </ParallaxLayer>
        </div>
      </div>

      {/* transition veil / scan line into next section */}
      <div className="hero-veil" aria-hidden="true" />
    </section>
  );
}
