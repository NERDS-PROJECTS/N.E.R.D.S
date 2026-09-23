import { useEffect, useState } from 'react';
import { listen } from '../utils/media';

/**
 * Detects whether the user has requested reduced motion via
 * `prefers-reduced-motion`. Animations driven by this flag are disabled.
 * Graceful fallback if the (experimental) `matchMedia` API is absent —
 * the CSS `@media (prefers-reduced-motion: reduce)` rules still apply.
 */
export default function useReducedMotion() {
  const [reduced, setReduced] = useState(() => false);
  useEffect(() => listen('(prefers-reduced-motion: reduce)', setReduced), []);
  return reduced;
}