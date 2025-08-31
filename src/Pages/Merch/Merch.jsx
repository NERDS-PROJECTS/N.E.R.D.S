import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useState, useRef, useEffect } from 'react';
import gridBackground from '/grid.svg';
import { FancyButton } from '../../components/Merch_components/FancyButton';
import Shirt from '../../components/tshirt_canvas/Shirt';
import Tshirt_Loader from '../../components/Merch_components/Tshirt_Loader';
import CameraRig from '../../components/tshirt_canvas/CameraRig';
import { Environment, Center } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import {
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation
} from '../../config/motion';
import state from '../../store';

const Merch = () => {
    const snap = useSnapshot(state);

    const [isDragging, setIsDragging] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const canvasRef = useRef();

    // Detect mobile screen
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Show loader for at least 2s
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    // Handlers to toggle dragging state (for desktop only)
    const handlePointerDown = () => setIsDragging(true);
    const handlePointerUp = () => setIsDragging(false);
    const handlePointerLeave = () => setIsDragging(false);

    return (
        <div className="app transition-all ease-in main flex flex-col mt-8 md:mt-[-5rem] md:flex-row min-h-[120vh] h-auto md:min-h-screen relative">
            {/* Gradient Background */}
            <div className="absolute inset-0 tshirt_gradient z-0"></div>

            {/* Repeated Grid SVG Background */}
            <div
                className="absolute inset-0 bg-repeat z-0"
                style={{ backgroundImage: `url(${gridBackground})`, backgroundSize: 'auto' }}
            ></div>

            {/* Left Side Animated Intro */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-start z-10 px-4 py-10 mt-16 md:mt-0 md:px-16 md:py-0 min-h-[50vh] md:min-h-0">
                <AnimatePresence>
                    {snap.intro && (
                        <motion.section className="home" {...slideAnimation('left')}>
                            <motion.div className="home-content" {...headContainerAnimation}>
                                <motion.div {...headTextAnimation}>
                                    <h1 className="head-text">
                                        N<span className='orange_gradient '>.</span>E<span className='orange_gradient '>.</span>R<span className='orange_gradient '>.</span>D<span className='orange_gradient '>.</span>S<span className='orange_gradient '>.</span> <br className="xl:block hidden" /> MERCH
                                    </h1>
                                </motion.div>
                                <motion.div
                                    {...headContentAnimation}
                                    className="flex flex-col gap-5"
                                >
                                    <p className="max-w-md font-normal text-gray-300 text-base">
                                        Our exclusive Robotics Club T-shirts are more than just apparel — they represent innovation, teamwork, and the spirit of creation.  <strong>Designed for makers, coders, and dreamers,</strong> these tees let you showcase your love for robotics both inside and outside the lab.
                                    </p>
                                    <FancyButton
                                        title1="CUSTOMIZE"
                                        title2="T-SHIRT"
                                        handleClick={() => state.intro = false}
                                        customStyles="w-fit px-4 mt-1.5 py-2.5 font-bold text-sm"
                                    />
                                </motion.div>
                            </motion.div>
                        </motion.section>
                    )}
                </AnimatePresence>
            </div>

            {/* Right Side 3D Model or Loader */}
            <div className="w-full md:w-1/2 mt-10 z-10 min-h-[300px] h-[50vh] md:h-full flex items-center justify-center">
                {loading ? (
                    <Tshirt_Loader />
                ) : null}
                {!loading && (
                    <Canvas
                        ref={canvasRef}
                        shadows
                        camera={{ position: [0, 0, 2.2], fov: 25 }}
                        gl={{ preserveDrawingBuffer: true }}
                        className="w-full h-full min-h-[300px] max-w-full transition-all ease-in"
                        onPointerDown={!isMobile ? handlePointerDown : undefined}
                        onPointerUp={!isMobile ? handlePointerUp : undefined}
                        onPointerLeave={!isMobile ? handlePointerLeave : undefined}
                    >
                        <ambientLight intensity={0.5} />
                        <Environment preset="city" />

                        {/* OrbitControls - always enabled in mobile, conditional on desktop */}
                        <OrbitControls
                            makeDefault
                            enableZoom={false}
                            enablePan={false}
                            minPolarAngle={Math.PI / 2}
                            maxPolarAngle={Math.PI / 2}
                            minDistance={5.2}
                            maxDistance={5.2}
                            enableDamping={true}
                            dampingFactor={0.15}
                        />

                        {/* If mobile: always direct Shirt. If desktop: use CameraRig when not dragging */}
                        {isMobile ? (
                            <Center>
                                <Shirt />
                            </Center>
                        ) : !isDragging ? (
                            <CameraRig>
                                <Center>
                                    <Shirt />
                                </Center>
                            </CameraRig>
                        ) : (
                            <Center>
                                <Shirt />
                            </Center>
                        )}
                    </Canvas>
                )}
            </div>
        </div>
    );
};

export default Merch;
