import { useRef, useEffect, useState } from 'react';
import useReducedMotion from '../../hooks/useReducedMotion';
import useIsDesktop from '../../hooks/useIsDesktop';
import './Magnetic.css';

/**
 * Magnetic
 * ----------------------------------------------------------------------
 * Wraps an interactive element with a subtle "magnet" push toward the
 * cursor (a few px) when hovered, springing back smoothly on leave.
 * Deliberately restrained — only used on primary nav links and CTAs.
 */
export default function Magnetic({
  as = 'span',
  className = '',
  style,
  children,
  max = 6,
  ...rest
}) {
  const reduced = useReducedMotion();
  const isDesktop = useIsDesktop();
  const ref = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!isDesktop || reduced) return;
    const el = ref.current;
    const inner = el.firstElementChild;
    if (!inner) return;

    let tx = 0;
    let ty = 0;
    const cur = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      let dx = e.clientX - cx;
      let dy = e.clientY - cy;
      const d = Math.hypot(dx, dy) || 1;
      // Attenuate with a soft falloff so the element never over-travels.
      const mag = (max / d > 1 ? 1 : d / max) * (max / (d + 40));
      target.x = Math.max(-max, Math.min(max, -dx / d * mag * max));
      target.y = Math.max(-max, Math.min(max, -dy / d * mag * max));
    };

    let raf = 0;
    const loop = () => {
      cur.x += (target.x - cur.x) * 0.18;
      cur.y += (target.y - cur.y) * 0.18;
      inner.style.transform = `translate3d(${cur.x.toFixed(2)}px, ${cur.y.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    const enter = () => {
      setOn(true);
      raf = requestAnimationFrame(loop);
    };
    const leave = () => {
      target.x = 0;
      target.y = 0;
      setOn(false);
      if (!raf) raf = requestAnimationFrame(loop);
    };

    el.addEventListener('pointerenter', enter);
    el.addEventListener('pointerleave', leave);
    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      el.removeEventListener('pointerenter', enter);
      el.removeEventListener('pointerleave', leave);
      window.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isDesktop, reduced, max]);

  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={`magnetic ${className} ${on ? 'is-on' : ''}`}
      style={style}
      {...rest}
    >
      <span className="magnetic-inner">{children}</span>
    </Tag>
  );
}