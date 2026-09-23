import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useReducedMotion from './useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * App.jsx already runs a site-wide Lenis instance for every route, so this
 * only wires GSAP's ScrollTrigger to it instead of instantiating a second,
 * competing Lenis (two instances would both hijack wheel/touch input).
 *
 * ScrollTrigger is synced on GSAP's own ticker (every animation frame)
 * rather than the native `scroll` event: Lenis moves the page by writing
 * scroll position on its own rAF loop, which doesn't reliably line up
 * with the browser's `scroll` event dispatch — syncing only on that event
 * made the parallax layers visibly lag/judder a frame behind the actual
 * scroll position. Updating every tick keeps them in lockstep.
 */
export default function useSmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const update = () => ScrollTrigger.update();
    gsap.ticker.add(update);
    ScrollTrigger.refresh();
    return () => gsap.ticker.remove(update);
  }, [reduced]);

  return reduced;
}
