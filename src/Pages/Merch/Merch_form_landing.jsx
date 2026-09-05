import { SparklesCore } from "./Sparkles";
import LoadingAnimation from "../../components/Loader/Loader";

export function SparklesPreview({ loading }) {
    const handleScrollToForm = () => {
        const formSection = document.querySelector('.form-section');
        if (formSection) {
            formSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (loading) {
        return (
            <div className="h-[90vh] w-full flex items-center justify-center bg-black bg-opacity-80">
                <LoadingAnimation />
            </div>
        );
    }

    return (
        /* Container spans 2 viewports (200vh) on desktop so scrolling moves down the portrait image */
        <div className="h-[90vh] md:h-[200vh] w-full bg-[url('https://res.cloudinary.com/dqeenwawp/image/upload/v1788434582/nerds_6_r5a106.png')] md:bg-[url('https://res.cloudinary.com/dqeenwawp/image/upload/v1788433652/nerds_3_xumgqu.png')] bg-cover bg-no-repeat bg-top flex flex-col justify-between items-center overflow-hidden rounded-md relative p-8">
            
            {/* Sparkles Overlay */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
                <SparklesCore
                    background="transparent"
                    minSize={0.4}
                    maxSize={1.4}
                    particleDensity={100}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />
            </div>

            {/* Top Heading with styled Cyan Dots and Black Merch */}
            <div className="pt-12 z-20">
                {/* Added whitespace-nowrap to keep on one line, and adjusted text scale */}
<h1 className="whitespace-nowrap text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-ethenocentric text-center text-white drop-shadow-xl tracking-tight">
    N<span className="text-[#f5f5dc]">.</span>
    E<span className="text-[#f5f5dc]">.</span>
    R<span className="text-[#f5f5dc]">.</span>
    D<span className="text-[#f5f5dc]">.</span>
    S<span className="text-[#f5f5dc]">.</span>{" "}
    <span className="text-black drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)]">
        Merch
    </span>
</h1>
            </div>

            {/* Bottom Section: Text + Chevron Button at the end of the scroll */}
            <div className="flex flex-col items-center gap-4 z-20 mb-8">
                <h4 className="text-base md:text-lg font-medium text-[#D28957] text-center max-w-2xl mx-auto drop-shadow-lg">
                    Complete the form below to order your exclusive Robotics club Merchandise. Scroll down to get started.
                </h4>

                {/* Bouncing Chevron Button */}
                <button
                    onClick={handleScrollToForm}
                    className="cursor-pointer bg-gray-800 px-3 py-2 rounded-md text-white tracking-wider shadow-xl animate-bounce hover:animate-none"
                >
                    <svg
                        className="w-5 h-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                        ></path>
                    </svg>
                </button>
            </div>

        </div>
    );
}

export default SparklesPreview;