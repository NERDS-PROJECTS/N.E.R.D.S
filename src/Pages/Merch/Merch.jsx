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
    const canvasRef = useRef();
    // Show loader for at least 1s, then show model
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    // Handlers to toggle dragging state
    const handlePointerDown = () => setIsDragging(true);
    const handlePointerUp = () => setIsDragging(false);
    const handlePointerLeave = () => setIsDragging(false);

    return (
        <div className="app transition-all ease-in main flex flex-col md:mt-[-5rem] md:flex-row min-h-screen h-auto md:h-screen relative">
            {/* Gradient Background */}
            <div className="absolute inset-0 tshirt_gradient z-0"></div>

            {/* Repeated Grid SVG Background */}
            <div
                className="absolute inset-0 bg-repeat z-0"
                style={{ backgroundImage: `url(${gridBackground})`, backgroundSize: 'auto' }}
            ></div>

            {/* Left Side Animated Intro */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-start z-10 px-4 py-10 md:px-16 md:py-0 min-h-[50vh] md:min-h-0">
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
            <div className="flex flex-col items-center justify-center w-full h-full">
                    <span className="text-3xl md:text-5xl font-bold text-cyan-400 mb-4 animate-pulse">Coming Soon</span>
                   
                </div>

        </div>
    );
};

export default Merch;