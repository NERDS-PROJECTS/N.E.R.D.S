import { useEffect, useState, useRef } from "react";
import RecruitmentForm from "./RecruitmentForm";

const Recruitment = () => {
    const [rotation, setRotation] = useState(-37.96);
    const [isVisible, setIsVisible] = useState(false);
    const contentRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setRotation((prevRotation) => prevRotation + 1); // Slowly increase the rotation angle
        }, 50);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true); // Set visibility to true when element is in view
                    observer.unobserve(entry.target); // Stop observing once it's visible
                }
            });
        });

        if (contentRef.current) {
            observer.observe(contentRef.current); // Observe the content section
        }

        if (imageRef.current) {
            observer.observe(imageRef.current); // Observe the image section
        }

        return () => {
            if (contentRef.current) {
                observer.unobserve(contentRef.current); // Cleanup on unmount
            }

            if (imageRef.current) {
                observer.unobserve(imageRef.current); // Cleanup on unmount
            }
        };
    }, []);

    return (
        <>
            {/* Landing Section */}
            <div className="overflow-hidden">
                <div className="bg-black main-section relative overflow-hidden" style={{ minHeight: '90vh', height: '90vh' }}>
                    {/* Gradient Background - Modified for Yellow and Orange */}
                    <div
                        className="bg-[conic-gradient(from_134.62deg_at_50%_50%,_#111111_0deg,_#2A1D01_62.55deg,_#2A1001_189.91deg,_#FBBF24_205.08deg,_#111111_310.73deg,_#F97316_360deg)] h-[700px] w-[700px] rounded-full blur-3xl animate-gradient z-0 gradient"
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
                    <div className="content-section relative z-10" ref={contentRef}>
                        <h1
                            className={`mt-20 sm:mt-[-1.5rem] text-3xl md:text-[70px] font-ethenocentric font-xl bg-gradient-to-b from-[#ffffff] to-[#ffff00] bg-clip-text text-transparent main-heading meet-heading absolute transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"
                                }`}
                        >
                            JOIN
                        </h1>
                        <h1
                            className={`font-ethenocentric mt-7 text-3xl md:text-[70px] sm:mt-[-4.8rem] font-normal bg-gradient-to-b from-[#ffffff] to-[#ffff00] bg-clip-text text-transparent main-heading team-heading absolute transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"
                                }`}
                        >
                            THE TEAM
                        </h1>
                        <p
                            className={`font-spaced mt-6 sm:mt-[-5.5rem] text-[20px] text-white font-normal heading-subsection absolute transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"
                                }`}
                        >
                            Our core unit is assembling. Submit your credentials below to sync with some of the finest engineering minds in the circuit.
                        </p>
                    </div>
                    <div className="main-image py-60 relative z-10" ref={imageRef}>
                        <img
                            src="https://res.cloudinary.com/dqeenwawp/image/upload/v1782926809/bumblebee_fsreca.png"
                            alt="robot-image"
                            style={{
                                maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)'
                            }}
                            className={`mix-blend-whiten z-10 absolute right-4 md:right-12 top-1/2 -translate-y-1/2 w-auto max-h-[90%] object-contain transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"
                                }`}
                        />
                    </div>
                </div>
            </div>

            {/* Team-Details Section */}
            <RecruitmentForm />
        </>
    );
};

export default Recruitment;