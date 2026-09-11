import React, {
  Suspense,
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';

import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Background image
// ---------------------------------------------------------------------------
// Put the image inside:
// public/background.jpg
//
// Then change this path if needed.
// ---------------------------------------------------------------------------
const BACKGROUND_IMAGE = '/background.jpg';

// ---------------------------------------------------------------------------
// How much of the 3D viewer's visible height the model should fill.
// e.g. 0.8 = the model occupies ~80% of the viewer height (10% margin
// on top and bottom). The model is rescaled to keep this ratio whenever
// the 3D viewer container is resized, so it always matches the viewer.
// ---------------------------------------------------------------------------
const VIEWER_FILL = 0.65;

// ---------------------------------------------------------------------------
// Horizontal centering offset.
// ---------------------------------------------------------------------------
// The model is geometrically centered by translating its bounding-box centre
// to the world origin, which lines it up with the camera's look-at point.
//
// However, a t-shirt GLB export is rarely perfectly symmetric inside its
// bounding box (an asymmetric fold, a hanging sleeve collar, or an off-centre
// origin/pivot), so the *visual* middle of the shirt can sit a little to one
// side even though the box is centred. This constant nudges the model back
// toward true visual centre.
//
//   > 0  moves the model to the RIGHT   (fixes "loaded offset to the LEFT")
//   < 0  moves the model to the LEFT
//
// It is expressed in the model's own units, so it scales with the model and
// works the same whether the viewer is a small card or a full modal.
// Tune this value until the shirt looks centred.
// ---------------------------------------------------------------------------
const VIEWER_OFFSET_X = 0.02;

// ---------------------------------------------------------------------------
// Global model reference
// ---------------------------------------------------------------------------
// Used by resetViewerCamera() to reset the shirt rotation without changing
// its scale or camera position.
// ---------------------------------------------------------------------------
const modelGroupRef = {
  current: null,
};

// ---------------------------------------------------------------------------
// Model loader + automatic centering/scaling
// ---------------------------------------------------------------------------
function LoadedModel({ url, onFramed }) {
  const gltf = useGLTF(url);

  const groupRef = useRef(null);

  // Largest model dimension (computed once when the model loads).
  const maxDimRef = useRef(0);

  // Tracks the model scene we have already centered/formatted, so resizing
  // the viewer rescales the model without re-centering or resetting rotation.
  const formattedSceneRef = useRef(null);

  // Reactive height of the visible area in three.js units.
  //
  // THREE.js mirrors the on-screen size of the 3D viewer canvas into this
  // "viewport", so when the viewer is resized (e.g. a small card becomes a
  // full modal) this value grows/shrinks accordingly. Subscribing to it lets
  // us rescale the model so it always matches the current viewer size.
  const { height: viewerHeight } = useThree(
    (s) => s.viewport
  );

  useEffect(() => {
    if (!gltf?.scene || !groupRef.current) return;

    const scene = gltf.scene;
    const group = groupRef.current;

    // Always re-expose the group for rotation/reset.
    //
    // This must run on EVERY effect re-run (not just once): when the viewer
    // is resized the effect's cleanup nulls `modelGroupRef.current` before
    // re-running, and re-assigning it here guarantees the rotation controller
    // keeps a valid reference so the model can always be rotated.
    modelGroupRef.current = group;

    // ---------------------------------------------------------
    // Center + prepare the model, but only once per loaded model.
    // (A viewer resize must NOT re-center or reset the rotation.)
    // ---------------------------------------------------------
    if (formattedSceneRef.current !== scene) {
      formattedSceneRef.current = scene;

      // Reset transforms
      group.position.set(0, 0, 0);
      group.rotation.set(0, 0, 0);
      group.scale.set(1, 1, 1);

      scene.position.set(0, 0, 0);
      scene.rotation.set(0, 0, 0);
      scene.scale.set(1, 1, 1);

      // -----------------------------------------------------
      // Calculate actual model bounds
      // -----------------------------------------------------
      const box = new THREE.Box3().setFromObject(scene);

      const size = box.getSize(
        new THREE.Vector3()
      );

      const center = box.getCenter(
        new THREE.Vector3()
      );

      // Center the model around the world origin
      scene.position.set(
        -center.x,
        -center.y,
        -center.z
      );

      maxDimRef.current = Math.max(
        size.x,
        size.y,
        size.z
      );

      // -----------------------------------------------------
      // Enable shadows
      // -----------------------------------------------------
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      // -----------------------------------------------------
      // Notify the parent the model finished loading
      // -----------------------------------------------------
      onFramed?.();
    }

    // ---------------------------------------------------------
    // Scale the model to fill the current viewer height.
    // This runs on load and again whenever the viewer is resized
    // (the effect depends on `viewerHeight`).
    // ---------------------------------------------------------
    if (maxDimRef.current > 0 && viewerHeight > 0) {
      group.scale.setScalar(
        (viewerHeight * VIEWER_FILL) / maxDimRef.current
      );
    }

    // Cleanup reference if this model unmounts
    return () => {
      if (
        formattedSceneRef.current === scene &&
        modelGroupRef.current === group
      ) {
        modelGroupRef.current = null;
      }
    };
  }, [gltf, url, onFramed, viewerHeight]);

  return (
    <group
      ref={groupRef}
      position={[0, 0, 0]}
    >
      <primitive
        object={gltf.scene}
        dispose={null}
      />
    </group>
  );
}

// ---------------------------------------------------------------------------
// Loading spinner
// ---------------------------------------------------------------------------
function LoadingSpinner() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />

        <span className="text-cyan-400 text-sm font-orbitron tracking-wide">
          Loading 3D Model...
        </span>
      </div>
    </Html>
  );
}

// ---------------------------------------------------------------------------
// Error state
// ---------------------------------------------------------------------------
function LoadError() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 text-center p-6">

        <div className="text-red-400 text-2xl">
          âš 
        </div>

        <span className="text-red-400 font-orbitron text-sm">
          Unable to load 3D preview
        </span>

        <span className="text-gray-500 text-xs">
          Please try again later
        </span>

      </div>
    </Html>
  );
}

// ---------------------------------------------------------------------------
// Error boundary
// ---------------------------------------------------------------------------
class ModelErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error) {
    if (import.meta.env.DEV) {
      console.error(
        '3D Model loading error:',
        error
      );
    }

    this.props.onError?.();
  }

  render() {
    if (this.state.hasError) {
      return <LoadError />;
    }

    return this.props.children;
  }
}

// ---------------------------------------------------------------------------
// Studio lighting
// ---------------------------------------------------------------------------
//
// IMPORTANT:
//
// These lights are WORLD-SPACE lights.
//
// The camera does not move.
// The lights do not move.
// ONLY THE SHIRT rotates.
//
// This means the lighting stays completely stationary while the user
// rotates the product.
// ---------------------------------------------------------------------------
function ClothingLights() {
  return (
    <>
      {/* -------------------------------------------------------
          Soft base illumination
      ------------------------------------------------------- */}
      <ambientLight
        intensity={0.35}
      />

      {/* -------------------------------------------------------
          Main key light
      ------------------------------------------------------- */}
      <directionalLight
        position={[4, 6, 5]}
        intensity={4}
        castShadow

        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}

        shadow-camera-near={0.1}
        shadow-camera-far={20}

        shadow-camera-top={4}
        shadow-camera-bottom={-4}
        shadow-camera-left={-4}
        shadow-camera-right={4}

        shadow-bias={-0.0001}
      />

      {/* -------------------------------------------------------
          Fill light
      ------------------------------------------------------- */}
      <directionalLight
        position={[-4, 3, 4]}
        intensity={0.5}
      />

      {/* -------------------------------------------------------
          Subtle back/rim light
      ------------------------------------------------------- */}
      <directionalLight
        position={[0, 4, -5]}
        intensity={2}
      />

      {/* -------------------------------------------------------
          World-space shadow catcher
      ------------------------------------------------------- */}
      <group
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.3, 0]}
      >
        <mesh receiveShadow>
          <planeGeometry
            args={[10, 10]}
          />

          <shadowMaterial
            opacity={0.15}
          />
        </mesh>
      </group>
    </>
  );
}

// ---------------------------------------------------------------------------
// Product rotation controller
// ---------------------------------------------------------------------------
//
// The shirt rotates instead of the camera.
//
// This is the important change that keeps the lighting stationary.
// ---------------------------------------------------------------------------
function ProductRotationController() {
  const isDragging = useRef(false);
  const lastX = useRef(0);

  const velocity = useRef(0);
  const lastInteraction = useRef(0);

  // ---------------------------------------------------------
  // Pointer down
  // ---------------------------------------------------------
  const handlePointerDown = useCallback((event) => {
    if (!modelGroupRef.current) return;

    isDragging.current = true;

    lastX.current = event.clientX;

    velocity.current = 0;

    lastInteraction.current =
      performance.now();

    event.target.setPointerCapture?.(
      event.pointerId
    );
  }, []);

  // ---------------------------------------------------------
  // Pointer move
  // ---------------------------------------------------------
  const handlePointerMove = useCallback((event) => {
    if (!isDragging.current) return;

    const model = modelGroupRef.current;

    if (!model) return;

    const deltaX =
      event.clientX - lastX.current;

    lastX.current = event.clientX;

    // Rotation sensitivity
    const rotationAmount =
      deltaX * 0.01;

    model.rotation.y += rotationAmount;

    velocity.current =
      rotationAmount;

    lastInteraction.current =
      performance.now();
  }, []);

  // ---------------------------------------------------------
  // Pointer up
  // ---------------------------------------------------------
  const handlePointerUp = useCallback((event) => {
    isDragging.current = false;

    event.target.releasePointerCapture?.(
      event.pointerId
    );

    lastInteraction.current =
      performance.now();
  }, []);

  // ---------------------------------------------------------
  // Pointer cancel
  // ---------------------------------------------------------
  const handlePointerCancel = useCallback(() => {
    isDragging.current = false;

    lastInteraction.current =
      performance.now();
  }, []);

  // ---------------------------------------------------------
  // Add listeners to the canvas element
  // ---------------------------------------------------------
  useEffect(() => {
    const canvas =
      document.querySelector(
        'canvas'
      );

    if (!canvas) return;

    canvas.addEventListener(
      'pointerdown',
      handlePointerDown
    );

    canvas.addEventListener(
      'pointermove',
      handlePointerMove
    );

    canvas.addEventListener(
      'pointerup',
      handlePointerUp
    );

    canvas.addEventListener(
      'pointercancel',
      handlePointerCancel
    );

    return () => {
      canvas.removeEventListener(
        'pointerdown',
        handlePointerDown
      );

      canvas.removeEventListener(
        'pointermove',
        handlePointerMove
      );

      canvas.removeEventListener(
        'pointerup',
        handlePointerUp
      );

      canvas.removeEventListener(
        'pointercancel',
        handlePointerCancel
      );
    };
  }, [
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
  ]);

  // ---------------------------------------------------------
  // Auto-return
  // ---------------------------------------------------------
  useFrame((_, delta) => {
    const model =
      modelGroupRef.current;

    if (!model || isDragging.current) {
      return;
    }

    const timeSinceInteraction =
      performance.now() -
      lastInteraction.current;

    // Wait 500ms before returning
    if (timeSinceInteraction < 500) {
      return;
    }

    // Normalize rotation to [-PI, PI]
    let rotation = model.rotation.y;

    rotation =
      THREE.MathUtils.euclideanModulo(
        rotation + Math.PI,
        Math.PI * 2
      ) - Math.PI;

    // Smoothly return to front
    model.rotation.y =
      THREE.MathUtils.damp(
        model.rotation.y,
        0,
        3.0,
        delta
      );

    // Prevent tiny floating-point movement
    if (Math.abs(rotation) < 0.001) {
      model.rotation.y = 0;
    }
  });

  return null;
}

// ---------------------------------------------------------------------------
// Scene
// ---------------------------------------------------------------------------
function ViewerScene({
  model,
  onLoaded,
}) {
  const { camera } = useThree();

  useEffect(() => {
    // Camera NEVER moves when rotating the shirt.
    camera.position.set(
      0,
      0,
      5
    );

    camera.fov = 40;

    camera.lookAt(
      0,
      0,
      0
    );

    camera.updateProjectionMatrix();
  }, [camera, model]);

  return (
    <>
      {/* ---------------------------------------------------
          Stationary studio lighting
      --------------------------------------------------- */}
      <ClothingLights />

      {/* ---------------------------------------------------
          Product
      --------------------------------------------------- */}
      <Suspense fallback={null}>
        <LoadedModel
          url={model}
          onFramed={onLoaded}
        />
      </Suspense>

      {/* ---------------------------------------------------
          Product rotation
      --------------------------------------------------- */}
      <ProductRotationController />
    </>
  );
}

// ---------------------------------------------------------------------------
// Reset viewer
// ---------------------------------------------------------------------------
//
// IMPORTANT:
//
// This ONLY resets the shirt rotation.
//
// It does NOT change:
// - model scale
// - model position
// - camera distance
// - camera FOV
// - lighting
// - background
// ---------------------------------------------------------------------------
export function resetViewerCamera() {
  const model =
    modelGroupRef.current;

  if (!model) return;

  model.rotation.set(
    0,
    0,
    0
  );
}

// ---------------------------------------------------------------------------
// Preload model
// ---------------------------------------------------------------------------
export function preloadMerchModel(url) {
  if (
    url &&
    typeof useGLTF.preload === 'function'
  ) {
    useGLTF.preload(url);
  }
}

// ---------------------------------------------------------------------------
// Main 3D viewer
// ---------------------------------------------------------------------------
export default function Merch3DViewer({
  model,
  background,
}) {
  const [hasError, setHasError] =
    useState(false);

  const [isLoaded, setIsLoaded] =
    useState(false);

  // Effective background image: the product-specific one if provided,
  // otherwise fall back to the default global background.
  const backgroundImage =
    background ||
    BACKGROUND_IMAGE;

  // ---------------------------------------------------------
  // WebGL setup
  // ---------------------------------------------------------
  const handleCreated = useCallback(
    ({ gl }) => {
      gl.toneMapping =
        THREE.ACESFilmicToneMapping;

      gl.toneMappingExposure = 1.0;

      gl.shadowMap.enabled = true;

      gl.shadowMap.type =
        THREE.PCFShadowMap;

      // IMPORTANT:
      // Transparent WebGL background.
      //
      // The HTML image underneath the Canvas
      // becomes the actual background.
      gl.setClearColor(
        0x000000,
        0
      );
    },
    []
  );

  // ---------------------------------------------------------
  // Reset loading/error state when model changes
  // ---------------------------------------------------------
  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);

    // Reset product rotation
    if (modelGroupRef.current) {
      modelGroupRef.current.rotation.set(
        0,
        0,
        0
      );
    }
  }, [model]);

  // ---------------------------------------------------------
  // Reduced motion
  // ---------------------------------------------------------
  const reduceMotion =
    typeof window !== 'undefined' &&
    window
      .matchMedia(
        '(prefers-reduced-motion: reduce)'
      )
      .matches;

  // ---------------------------------------------------------
  // Error UI
  // ---------------------------------------------------------
  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-950 rounded-xl">

        <div className="flex flex-col items-center gap-3 text-center p-8">

          <div className="text-red-400 text-3xl">
            âš 
          </div>

          <span className="text-red-400 font-orbitron text-sm">
            Unable to load 3D preview
          </span>

          <span className="text-gray-500 text-xs">
            Please try again later
          </span>

        </div>

      </div>
    );
  }

  // ---------------------------------------------------------
  // No model
  // ---------------------------------------------------------
  if (!model) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-950 rounded-xl">

        <span className="text-gray-500 font-orbitron text-sm">
          No 3D model available
        </span>

      </div>
    );
  }

  // ---------------------------------------------------------
  // Viewer
  // ---------------------------------------------------------
  return (
    <div
      className="w-full h-full relative overflow-hidden rounded-xl"
      style={{
        touchAction: 'none',
      }}
    >

      {/* =====================================================
          BACKGROUND IMAGE
          ===================================================== */}
      <img
        src={backgroundImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        draggable={false}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0) 75%)'
        }}
      />

      {/* =====================================================
          OPTIONAL DARK OVERLAY
          Remove this div if you don't want it.
          ===================================================== */}
      <div
        className="absolute inset-0 bg-black/10 pointer-events-none"
      />

      {/* =====================================================
          3D CANVAS
          ===================================================== */}
      <Canvas
        shadows

        camera={{
          position: [0, 0, 5],
          fov: 40,
        }}

        gl={{
          preserveDrawingBuffer: true,
          antialias: true,
          alpha: true,
        }}

        className="!w-full !h-full relative z-10"

        onCreated={handleCreated}
      >

        {/* ---------------------------------------------------
            Model + lighting
        --------------------------------------------------- */}
        <Suspense
          fallback={
            <LoadingSpinner />
          }
        >

          <ModelErrorBoundary
            onError={() => {
              setHasError(true);
              setIsLoaded(false);
            }}
          >

            <ViewerScene
              model={model}
              onLoaded={() =>
                setIsLoaded(true)
              }
            />

          </ModelErrorBoundary>

        </Suspense>

      </Canvas>

      {/* =====================================================
          Loading overlay
          ===================================================== */}
      {!isLoaded &&
        !hasError && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-950/80 backdrop-blur-sm rounded-xl">

            <div className="flex flex-col items-center gap-3">

              <div className="w-10 h-10 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />

              <span className="text-cyan-400 text-sm font-orbitron tracking-wide">
                Loading 3D Model...
              </span>

            </div>

          </div>
        )}

    </div>
  );
}



