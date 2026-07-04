import { useEffect, useState, useRef } from "react";
import RecruitmentForm from "./RecruitmentForm";

const Recruitment = () => {
    const [rotation, setRotation] = useState(-37.96);
    const [isVisible, setIsVisible] = useState(false);
    const contentRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setRotation((prevRotation) => prevRotation + 1); 
        }, 50);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true); 
                    observer.unobserve(entry.target); 
                }
            });
        });

        if (contentRef.current) observer.observe(contentRef.current);
        if (imageRef.current) observer.observe(imageRef.current);

        return () => {
            if (contentRef.current) observer.unobserve(contentRef.current);
            if (imageRef.current) observer.unobserve(imageRef.current);
        };
    }, []);

    return (
        <>
            {/* Injecting Uiverse Styles */}
            <style>{`
                .scrolldown {
                    --color: #eddb0e; 
                    --sizeX: 30px;
                    --sizeY: 50px;
                    position: relative;
                    width: var(--sizeX);
                    height: var(--sizeY);
                    margin-left: calc(var(--sizeX) / 2);
                    border: calc(var(--sizeX) / 10) solid var(--color);
                    border-radius: 50px;
                    box-sizing: border-box;
                    margin-bottom: 16px;
                    cursor: pointer;
                }

                .scrolldown::before {
                    content: "";
                    position: absolute;
                    bottom: 30px;
                    left: 50%;
                    width: 6px;
                    height: 6px;
                    margin-left: -3px;
                    background-color: var(--color);
                    border-radius: 100%;
                    animation: scrolldown-anim 2s infinite;
                    box-sizing: border-box;
                    box-shadow: 0px -5px 3px 1px #f9660466;
                }

                @keyframes scrolldown-anim {
                    0% { opacity: 0; height: 6px; }
                    40% { opacity: 1; height: 10px; }
                    80% { transform: translate(0, 20px); height: 10px; opacity: 0; }
                    100% { height: 3px; opacity: 0; }
                }

                .chevrons {
                    padding: 6px 0 0 0;
                    margin-left: -3px;
                    margin-top: 48px;
                    width: 30px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .chevrondown {
                    margin-top: -6px;
                    position: relative;
                    border: solid var(--color);
                    border-width: 0 3px 3px 0;
                    display: inline-block;
                    width: 10px;
                    height: 10px;
                    transform: rotate(45deg);
                }

                .chevrondown:nth-child(odd) {
                    animation: pulse54012 500ms ease infinite alternate;
                }

                .chevrondown:nth-child(even) {
                    animation: pulse54012 500ms ease infinite alternate 250ms;
                }

                @keyframes pulse54012 {
                    from { opacity: 0; }
                    to { opacity: 0.5; }
                }
            `}</style>

            {/* Landing Section */}
            <div className="overflow-hidden">
                <div className="bg-black relative overflow-hidden flex flex-col md:justify-center min-h-screen md:min-h-0 md:h-[90vh] px-6 sm:px-12 md:px-20 lg:px-32 pt-12 pb-24 md:py-0">
                    
                    {/* Gradient Background */}
                    <div
                        className="bg-[conic-gradient(from_134.62deg_at_50%_50%,_#111111_0deg,_#2A1D01_62.55deg,_#2A1001_189.91deg,_#FBBF24_205.08deg,_#111111_310.73deg,_#F97316_360deg)] rounded-full blur-3xl animate-gradient"
                        style={{
                            width: "665px",
                            height: "766px",
                            top: "151px",
                            left: "50%",
                            opacity: "31%",
                            backdropFilter: "blur(195px)",
                            transform: `translateX(-50%) rotate(${rotation}deg)`,
                            position: "absolute",
                            zIndex: 0,
                            transition: "transform 0.05s linear",
                        }}
                    ></div>

                    {/* Image Section */}
                    <div className="relative md:absolute right-0 bottom-0 top-0 w-full md:w-1/2 pointer-events-none z-20 flex items-center justify-center md:justify-end md:mr-12 mb-8 md:mb-0" ref={imageRef}>
                        <img
                            src="https://res.cloudinary.com/dqeenwawp/image/upload/v1782926809/bumblebee_fsreca.png"
                            alt="robot-image"
                            style={{
                                maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
                            }}
                            /* CHANGED: Made image take full width on mobile, and scale back down dynamically on md screens */
                            className={`mix-blend-whiten w-full h-auto md:w-auto md:max-h-[85%] object-contain transition-opacity duration-1000 ${
                                isVisible ? "opacity-100" : "opacity-0"
                            }`}
                        />
                    </div>

                    {/* Content Section */}
                    <div 
                        className={`relative z-10 flex flex-col justify-center max-w-2xl transition-opacity duration-1000 ${
                            isVisible ? "opacity-100" : "opacity-0"
                        }`} 
                        ref={contentRef}
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-[70px] font-ethenocentric bg-gradient-to-b from-[#ffffff] to-[#ffff00] bg-clip-text text-transparent leading-none">
                            JOIN
                        </h1>
                        <h1 className="font-ethenocentric mt-2 text-4xl sm:text-5xl md:text-[70px] font-normal bg-gradient-to-b from-[#ffffff] to-[#ffff00] bg-clip-text text-transparent leading-none">
                            THE TEAM
                        </h1>
                        <p className="font-spaced mt-6 w-full max-w-md md:max-w-xl text-sm sm:text-base md:text-[20px] text-white font-normal leading-relaxed">
                            Our core unit is assembling. Submit your credentials below to sync with some of the finest engineering minds in the circuit.
                        </p>
                    </div>

                    {/* Uiverse ScrollDown Indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
                        <div className="scrolldown">
                            <div className="chevrons">
                                <div className="chevrondown"></div>
                                <div className="chevrondown"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Team-Details Section */}
            <RecruitmentForm />
        </>
    );
};

export default Recruitment;