import { useEffect, useRef } from 'react';
import useReducedMotion from '../../hooks/useReducedMotion';
import useIsDesktop from '../../hooks/useIsDesktop';
import './CustomCursor.css';

/**
 * CustomCursor
 * ----------------------------------------------------------------------
 * An elegant futuristic reticle cursor. A small neon crosshair follows the
 * pointer instantly (subtly transformed); a larger ring trails it with
 * exponential smoothing. On hover over interactive elements the ring
 * expands and a small "TARGET" label fades in; over [data-cursor="view"]
 * elements it shows "VIEW +".
 *
 * Disabled on touch devices, on tablet/phone layouts and when the user
 * prefers reduced motion (a minimal static crosshair is shown instead).
 * The element never captures pointer events.
 */
export default function CustomCursor() {
  const reduced = useReducedMotion();
  const isDesktop = useIsDesktop();

  // Enabled only for desktop pointer input on energetic devices.
  const [enabled, reducedCursor] = useEffectTrack(reduced, isDesktop);

  const dotRef = useRef(null);    // primary reticle   (fast)
  const ringRef = useRef(null);   // trailing ring     (smoothed)
  const target = useRef({ x: -100, y: -100 });
  const fast = useRef({ x: -100, y: -100 });
  const slow = useRef({ x: -100, y: -100 });
  const stateRef = useRef('idle'); // idle | link | view
  const rafId = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;

    const onMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const labelFor = (el) => {
      if (!el) return 'idle';
      const at = el.closest && el.closest('[data-cursor="view"]');
      if (at) return 'view';
      if (el.closest && el.closest('a, button, [data-cursor="hover"]')) return 'link';
      return 'idle';
    };

    const onOver = (e) => stateRef.current = labelFor(e.target);
    const onOut = (e) => stateRef.current = labelFor(e.relatedTarget);

    const loop = () => {
      rafId.current = 0;
      const f = 0.5; // fast follow
      const s = 0.14; // trailing
      fast.current.x += (target.current.x - fast.current.x) * f;
      fast.current.y += (target.current.y - fast.current.y) * f;
      slow.current.x += (target.current.x - slow.current.x) * s;
      slow.current.y += (target.current.y - slow.current.y) * s;

      const st = stateRef.current;
      dot.style.transform =
        `translate3d(${fast.current.x}px, ${fast.current.y}px, 0)`;
      ring.style.transform =
        `translate3d(${slow.current.x}px, ${slow.current.y}px, 0) rotate(${(st === 'idle' ? 0 : 45)}deg)`;
      dot.setAttribute('data-state', st);
      ring.setAttribute('data-state', st);
      const label = ring.querySelector('.cc-label');
      if (label) label.setAttribute('data-state', st);
      rafId.current = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('mouseout', onOut, { passive: true });
    rafId.current = requestAnimationFrame(loop);

    document.body.classList.add('custom-cursor');

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseout', onOut);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      document.body.classList.remove('custom-cursor');
    };
  }, [enabled]);

  return (
    <>
      {/* Reticle group — hidden entirely on touch / reduced motion */}
      {enabled && (
        <div className="cursor-group" aria-hidden="true">
          <div ref={dotRef} className="cc-dot" data-state="idle">
            <span className="cc-h" />
            <span className="cc-v" />
            <i className="cc-center" />
          </div>
          <div ref={ringRef} className="cc-ring" data-state="idle">
            <span className="cc-seg" />
            <span className="cc-seg cc-seg--b" />
            <span className="cc-axis" />
            <em className="cc-label">TARGET</em>
          </div>
        </div>
      )}

      {/* Reduced-motion / touch fallback: minimal static reticle */}
      {!enabled && reducedCursor && (
        <div className="cursor-group cursor-group--static" aria-hidden="true">
          <div className="cc-dot cc-dot--static" data-state="idle" />
        </div>
      )}
    </>
  );
}

/** Helper returning [enabled, reducedFallbackCursor] */
function useEffectTrack(reduced, isDesktop) {
  // not a hook — used to compute booleans cheaply
  const finePointer = typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && safeMatchMedia('(pointer: fine)');
  const enabled = isDesktop && finePointer && !reduced;
  return [enabled, !enabled];
}

function safeMatchMedia(query) {
  try {
    return !!window.matchMedia(query).matches;
  } catch {
    return true;
  }
}