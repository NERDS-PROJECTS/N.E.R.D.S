import { useRef, useEffect } from 'react';
import { useParallax } from './ParallaxProvider';

/**
 * Registers a DOM element with the mouse-parallax engine.
 * Returns a ref to attach to the element.
 *
 * @param {string} id        Stable unique id for the layer.
 * @param {object} opts
 *   - mouseX  px of translate-X per unit cursor (-1..1)
 *   - mouseY  px of translate-Y per unit cursor
 *   - tiltY   deg of rotate-Y per unit cursor (subtle 3D tilt)
 *   - tiltX   deg of rotate-X per unit cursor
 * @returns {React.Ref} ref to place on the element.
 */
export function useMouseParallax(id, opts = {}) {
  const ctx = useParallax();
  const elRef = useRef(null);
  const optsRef = useRef(opts);
  optsRef.current = opts;

  useEffect(() => {
    if (!ctx || !elRef.current) return;
    ctx.register(id, {
      el: elRef.current,
      mx: optsRef.current.mouseX ?? 0,
      my: optsRef.current.mouseY ?? 0,
      tyx: optsRef.current.tiltY ?? 0,
      txy: optsRef.current.tiltX ?? 0,
    });
    return () => ctx.unregister(id);
  }, [ctx, id]);

  return elRef;
}

/**
 * ParallaxLayer
 * ----------------------------------------------------------------------
 * An absolutely-positioned 2.5D scene layer. Its transform is built from
 * composable CSS variables so that mouse parallax (--mx/--my/--rx/--ry),
 * scroll parallax (--sx/--sy), a static per-layer offset, and per-layer
 * scale can be layered independently.
 *
 * @param {number} depth     Informative depth 0..1 (as per spec).
 * @param {string} slot      hero/{background|atmosphere|far|mid|foreground|subject|effects|ui}
 * @param {boolean} animated Adds will-change:transform (only for moved layers).
 * @param {boolean} pointer  Keep pointer-events (interactive layers).
 * @param {number} offsetX   Static translate-X offset, in scene % or CSS length.
 * @param {number} offsetY   Static translate-Y offset, in scene % or CSS length.
 * @param {number} travelX   px of overscan the layer needs on the X axis.
 * @param {number} travelY   px of overscan the layer needs on the Y axis.
 */
export default function ParallaxLayer({
  id,
  depth = 0.2,
  slot = 'far',
  mouseX = 0,
  mouseY = 0,
  tiltY = 0,
  tiltX = 0,
  zIndex,
  animated = false,
  pointer = false,
  className = '',
  style,
  children,
  inset = 'full',
  sy = 0,
  sx = 0,
  fade = false,
  scale = 1,
  offsetX = 0,
  offsetY = 0,
  travelX,
  travelY,
  ...rest
}) {
  const ref = useMouseParallax(id, { mouseX, mouseY, tiltX, tiltY });

  const insetCls = inset === 'piece' ? 'pl-inset-piece' : '';
  const scrollAttrs = {};
  if (sy) scrollAttrs['data-sy'] = sy;
  if (sx) scrollAttrs['data-sx'] = sx;
  if (fade) scrollAttrs['data-fade'] = '1';
  if (scale !== 1) scrollAttrs['data-scale'] = scale;

  return (
    <div
      ref={ref}
      data-layer={slot}
      data-depth={depth}
      {...scrollAttrs}
      {...rest}
      className={`pl ${animated ? 'pl-anim' : ''} ${insetCls} ${pointer ? 'pl-pointer' : ''} ${className}`}
      style={{
        '--depth': depth,
        '--scale': scale,
        /* Static offset of the plate, in % of the scene box. Consumed by the
           .scene-plate transform. Defaults keep every other ParallaxLayer in
           the app on the shared ParallaxLayer.css path. */
        '--off-x': offsetX ? (typeof offsetX === 'number' ? `${offsetX}%` : offsetX) : '0px',
        '--off-y': offsetY ? (typeof offsetY === 'number' ? `${offsetY}%` : offsetY) : '0px',
        /* Per-layer overscan budget written by the Hero scene so its
           absolutely-positioned plates can never expose an edge. */
        '--travel-x': travelX != null ? `${travelX}px` : undefined,
        '--travel-y': travelY != null ? `${travelY}px` : undefined,
        zIndex,
        ...style
      }}
    >
      {children}
    </div>
  );
}
