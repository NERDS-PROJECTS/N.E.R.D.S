import { useEffect, useState } from 'react';
import { listen } from '../utils/media';

/**
 * Tracks whether we are on a desktop canvas (mouse) instead of a
 * touch-oriented tablet/phone. Mouse parallax & the custom cursor only
 * run on desktop. Graceful fallback if `matchMedia` is unavailable.
 */
export default function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => true);

  useEffect(() => listen('(max-width: 1024px)', (m) => setIsDesktop(!m)), []);

  return isDesktop;
}