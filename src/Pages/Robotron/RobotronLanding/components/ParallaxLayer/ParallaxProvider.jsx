import { createContext, useContext, useEffect, useMemo, useRef } from 'react';

/**
 * ParallaxContext
 * ----------------------------------------------------------------------
 * A single mouse-parallax engine. It tracks a smoothly-smoothed normalized
 * cursor position (-1..1 on each axis) and, on each animation frame,
 * writes per-layer CSS variables:
 *
 *   --mx  → translate X  (px)   from mouse
 *   --my  → translate Y  (px)   from mouse
 *   --ry  → rotate Y     (deg)  from mouse (subtle depth tilt)
 *   --rx  → rotate X     (deg)  from mouse (subtle depth tilt)
 *
 * These compose (in CSS) with the scroll-driven --sx/--sy variables that
 * GSAP ScrollTrigger writes on the same element — so mouse and scroll
 * parallax never clobber each other.
 *
 * The loop runs only on desktop, only when the user hasn't requested
 * reduced motion, and pauses while the tab is hidden.
 */

const ParallaxContext = createContext(null);

export const useParallax = () => useContext(ParallaxContext);

export function ParallaxProvider({ reduced = false, isDesktop = false, enabled = true, children }) {
  const layersRef = useRef(new Map());
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef(0);

  const activeRef = useRef(false);
  activeRef.current = enabled && isDesktop && !reduced;

  const loop = () => {
    rafId.current = 0;
    const isHidden = document.hidden === true
      || (typeof document.visibilityState === 'string' && document.visibilityState === 'hidden');
    if (!activeRef.current || isHidden || layersRef.current.size === 0) return;

    // Exponential smoothing → buttery, no snapping.
    const e = 0.12;
    current.current.x += (target.current.x - current.current.x) * e;
    current.current.y += (target.current.y - current.current.y) * e;
    const cx = current.current.x;
    const cy = current.current.y;

    layersRef.current.forEach((l) => {
      l.el.style.setProperty('--mx', (l.mx * cx).toFixed(2) + 'px');
      l.el.style.setProperty('--my', (l.my * cy).toFixed(2) + 'px');
      if (l.tyx || l.txy) {
        l.el.style.setProperty('--ry', (l.tyx * cx).toFixed(3) + 'deg');
        l.el.style.setProperty('--rx', (l.txy * cy).toFixed(3) + 'deg');
      }
    });

    /* Sleep cutoff: once the smoothed value has effectively converged on the
       target, stop the rAF loop instead of writing 12+ CSS vars every frame
       forever. The next pointermove restarts it via schedule(). CPU → ~0
       when the cursor is idle. (|d| < 0.001 ≈ 0.02px on the strongest layer) */
    const dx = target.current.x - current.current.x;
    const dy = target.current.y - current.current.y;
    if (dx * dx + dy * dy > 1e-6) schedule();
  };

  const schedule = () => {
    if (!rafId.current) rafId.current = requestAnimationFrame(loop);
  };
  const stop = () => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = 0;
    }
  };

  const api = useMemo(
    () => ({
      register: (id, opts) => {
        layersRef.current.set(id, opts);
        schedule();
      },
      unregister: (id) => {
        layersRef.current.delete(id);
      },
    }),
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    if (!activeRef.current) return;

    const onMove = (e) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      /* The rAF loop sleeps once converged (idle cutoff) — pointer moves must
         wake it, otherwise the first movement after idle is ignored. */
      schedule();
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    schedule();

    const onVis = () => {
      if (document.hidden) stop();
      else schedule();
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVis);
      stop();
    };
  }, [activeRef.current]); // eslint-disable-line react-hooks/exhaustive-deps

  return <ParallaxContext.Provider value={api}>{children}</ParallaxContext.Provider>;
}