import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { TextureLoader } from 'three';
import useReducedMotion from '../../hooks/useReducedMotion';
import './Ships.css';

/**
 * Two hand-painted ships cropped from the scene plates (public/robotron/ships),
 * flown across the hero on a tilted, endless loop with react-three-fiber.
 * Each ship exits one edge, then re-enters from its start edge at a new random
 * height so consecutive passes never repeat the same line.
 *
 * `direction` is signed to match each sprite's painted nose orientation
 * (ship-single's nose points left, ship-twin's points right) so they always
 * fly nose-first rather than backwards.
 *
 * `visualTilt` rotates the sprite. `pathSlope` is the ACTUAL flight-path
 * slope, always signed so positive = climbs regardless of `direction` (i.e.
 * independent of which way the ship is heading) — this is what keeps the
 * "upward" ship's line straight and clearly diagonal for its whole pass
 * instead of climbing into a hard ceiling clamp and going flat.
 *
 * The navbar-clearance guarantee is two-layered: the canvas itself starts
 * 20px below the navbar (Ships.css) so nothing can render there even in
 * principle, AND for any ship with a positive `pathSlope`, its respawn
 * height is chosen so that even the worst-case climb over one full,
 * edge-to-edge pass can't reach the canvas's own top edge — so the runtime
 * ceiling clamp below is a backstop that should essentially never fire.
 */
const SHIPS = [
  {
    src: '/robotron/ships/ship-single.png',
    aspect: 278 / 87,
    sizeFrac: 0.16,
    visualTilt: -0.28,
    pathSlope: 0.09,
    speed: 0.065,
    direction: -1,
  },
  {
    src: '/robotron/ships/ship-twin.png',
    aspect: 237 / 72,
    sizeFrac: 0.12,
    visualTilt: 0.22,
    pathSlope: -0.06,
    speed: 0.05,
    direction: 1,
  },
];

function Ship({ config }) {
  const meshRef = useRef(null);
  const texture = useLoader(TextureLoader, config.src);
  const { viewport } = useThree();
  const state = useRef({ x: 0, y: 0 });

  const shipHeight = (w) => (w * config.sizeFrac) / config.aspect;
  const ceilingFor = (w, h) => h / 2 - shipHeight(w) / 2;

  const respawn = (first) => {
    const w = viewport.width;
    const h = viewport.height;
    const margin = w * config.sizeFrac;
    const ceiling = ceilingFor(w, h);
    state.current.x = config.direction > 0 ? -w / 2 - margin : w / 2 + margin;

    if (config.pathSlope > 0) {
      // Climbs over its pass: start low enough that even the full
      // edge-to-edge distance of climb never reaches the ceiling.
      const pathLength = w * (1 + 2 * config.sizeFrac + 0.1);
      const maxClimb = pathLength * config.pathSlope;
      const highestSafeStart = ceiling - maxClimb;
      const band = Math.min(160, Math.max(0, highestSafeStart + h / 2));
      state.current.y = first
        ? highestSafeStart - band / 2
        : highestSafeStart - Math.random() * band;
    } else {
      // Flat or descending: no ceiling risk, just roam a mid/lower band.
      const band = 260;
      state.current.y = first ? -40 : -40 + (Math.random() - 0.5) * band;
    }

    if (meshRef.current) meshRef.current.position.set(state.current.x, state.current.y, 0);
  };

  // Mount-only: r3f's `viewport` drifts by sub-pixel amounts during scroll
  // (ScrollTrigger/Lenis-driven layout recalculation), and since those are
  // floats, depending on [viewport.width, viewport.height] here re-fired
  // this on nearly every scroll tick — snapping both ships back to their
  // start position mid-flight. Per-frame math below already reads live
  // viewport values, so an actual resize is absorbed there instead.
  useEffect(() => {
    respawn(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((_, delta) => {
    const w = viewport.width;
    const h = viewport.height;
    // Guard against a huge delta after a dropped-frame stall (tab
    // backgrounded, heavy scroll work, etc.) — without this a single slow
    // frame could jump a ship clean across the screen.
    const dt = Math.min(delta, 1 / 30);
    const speedX = config.direction * config.speed * w;
    const speedY = Math.abs(speedX) * config.pathSlope;
    state.current.x += speedX * dt;
    state.current.y += speedY * dt;

    // Backstop only — the spawn math above keeps this from firing in normal
    // play, so the flight line stays a clean, uninterrupted diagonal.
    const ceiling = ceilingFor(w, h);
    if (state.current.y > ceiling) state.current.y = ceiling;

    if (meshRef.current) meshRef.current.position.set(state.current.x, state.current.y, 0);

    const margin = w * config.sizeFrac + w * 0.05;
    const past = config.direction > 0 ? state.current.x > w / 2 + margin : state.current.x < -w / 2 - margin;
    if (past) respawn(false);
  });

  const width = viewport.width * config.sizeFrac;
  const height = width / config.aspect;

  return (
    <mesh ref={meshRef} rotation={[0, 0, config.visualTilt]}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

export default function Ships() {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div className="ships-layer" aria-hidden="true">
      <Canvas orthographic camera={{ position: [0, 0, 10], zoom: 1 }} gl={{ alpha: true, antialias: true }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          {SHIPS.map((cfg) => (
            <Ship key={cfg.src} config={cfg} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
}
