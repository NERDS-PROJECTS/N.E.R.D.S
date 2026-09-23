import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useReducedMotion from '../../hooks/useReducedMotion';
import '../../styles/global.css';
import './Section.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Section
 * ----------------------------------------------------------------------
 * Base cinematic section wrapper.
 *  - applies a subtle cyberpunk background grid
 *  - reveals children marked `data-reveal` (all direct children if none
 *    are marked) from below with a subtle stagger and cinematic easing on
 *    scroll into view
 *  - respects reduced motion (no reveal transform)
 */
export default function Section({
  id,
  className = '',
  grid = true,
  dark = 'section--dark',
  reveal = true,
  stagger = 0.12,
  children,
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!reveal || reduced) return;
    const el = ref.current;
    const marked = el.querySelectorAll('[data-reveal]');
    const targets = marked.length
      ? Array.from(marked)
      : Array.from(el.children).filter((n) => n instanceof Element);

    gsap.set(targets, { opacity: 0, y: 46 });
    const triggers = targets.map((t, i) => {
      const dur = 0.9 + (i % 3) * 0.08;
      const tl = gsap.timeline({ scrollTrigger: { trigger: t, start: 'top 86%', toggleActions: 'play none none none' } });
      tl.to(t, {
        opacity: 1,
        y: 0,
        duration: dur,
        ease: 'power3.out',
        delay: i * stagger,
      });
      return () => tl.kill();
    });

    return () => triggers.forEach((kill) => kill());
  }, [reveal, reduced, stagger]);

  return (
    <section
      id={id}
      ref={ref}
      className={`section-base ${dark} ${grid ? 'section--grid' : ''} ${className}`}
    >
      {children}
    </section>
  );
}