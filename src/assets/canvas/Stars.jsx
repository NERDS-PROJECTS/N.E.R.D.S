import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const Stars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() => {
    try {
      const positions = random.inSphere(new Float32Array(5000), { radius: 1.2 });
      // Validate the positions array
      for (let i = 0; i < positions.length; i++) {
        if (isNaN(positions[i]) || !isFinite(positions[i])) {
          positions[i] = 0;
        }
      }
      return positions;
    } catch (error) {
      console.warn('Error generating star positions, using fallback:', error);
      // Fallback: create a simple sphere manually
      const fallback = new Float32Array(5000);
      for (let i = 0; i < fallback.length; i += 3) {
        const radius = 1.2;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        fallback[i] = radius * Math.sin(phi) * Math.cos(theta);
        fallback[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        fallback[i + 2] = radius * Math.cos(phi);
      }
      return fallback;
    }
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StyledStarsCanvas = () => {
  return (
    <div className="absolute inset-0 w-full h-auto">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StyledStarsCanvas;
