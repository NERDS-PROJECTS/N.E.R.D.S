import { motion } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";

const words = ["are", "where", "those", "ideas", "become", "a", "reality"];
const animationDuration = 1.0; // in seconds
const textDisplayDuration = 1.5; // in seconds

const TextAnimation = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
		}, textDisplayDuration * 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="flex text-5xl relative justify-start w-full pl-2 bg-gradient-to-b from-[#ffffff] to-[#068bf7] bg-clip-text text-transparent font-ethenocentric">
			<motion.span
				// Pass in any other classes you need, like your font
				className="font-ethenocentric"
				initial={{
					// This is your 'bg-gradient-to-b from-[#ffffff] to-[#068bf7]'
					backgroundImage: "linear-gradient(to bottom, #FFFFFF, #068BF7)",
					backgroundClip: "text",
					WebkitBackgroundClip: "text", // For Safari support
					color: "transparent",
				}}
				whileHover={{
					// This is the 'from white' (light pink) to red gradient
					backgroundImage: "linear-gradient(to bottom, #FFFFFF, #FF2B2A)",
				}}
				transition={{
					duration: 0.325,
					ease: "easeInOut",
				}}
			>
				Events:
			</motion.span>
			<motion.span
				className="text-slate-300 relative left-[7px]"
				key={currentIndex} // Key helps Framer Motion identify which element is entering/exiting
				initial={{ y: "100%", opacity: 0 }} // Start from below and invisible
				animate={{ y: "0%", opacity: 1 }} // Slide to position and become visible
				exit={{ y: "-100%", opacity: 0 }} // Slide out upwards and become invisible
				transition={{ duration: animationDuration }} // Animation duration
			>
				{words[currentIndex]}
			</motion.span>
		</div>
	);
};

export default TextAnimation;
