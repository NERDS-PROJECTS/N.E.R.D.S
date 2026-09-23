/**
 * media
 * ----------------------------------------------------------------------
 * Frontend media-features access with a safe fallback.
 *
 * `window.matchMedia` is a relatively new (and experimental) API that
 * isn't available everywhere. Where it is missing we fall back to a
 * `false` result — the CSS `@media (prefers-reduced-motion: reduce)`
 * rules already honour the user's preference independently, so JS gating
 * is only an extra optimization.
 *
 * @param {string} query  e.g. '(prefers-reduced-motion: reduce)'
 * @param {function(bool):void} onChange
 * @returns {function():void} cleanup
 */
export function listen(query, onChange) {
  const mm = typeof window !== 'undefined' ? window.matchMedia : null;
  if (typeof mm === 'function') {
    let mq;
    try {
      mq = mm(query);
    } catch {
      mq = null;
    }
    if (mq) {
      onChange(!!mq.matches);
      mq.addEventListener?.('change', () => onChange(!!mq.matches));
      return () => mq.removeEventListener?.('change', () => onChange(!!mq.matches));
    }
  }
  onChange(false);
  return () => {};
}

/**
 * One-shot read with the same fallback semantics.
 * @returns {boolean}
 */
export function matches(query) {
  const mm = typeof window !== 'undefined' ? window.matchMedia : null;
  if (typeof mm !== 'function') return false;
  try {
    return !!mm(query).matches;
  } catch {
    return false;
  }
}