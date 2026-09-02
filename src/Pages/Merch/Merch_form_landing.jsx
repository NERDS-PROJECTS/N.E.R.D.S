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
        <div className="h-[90vh] w-full bg-[url('https://res.cloudinary.com/dqeenwawp/image/upload/v1788373819/nerds_1_sxvt7o.png')] md:bg-[url('https://res.cloudinary.com/dqeenwawp/image/upload/v1788372371/ECS_3_kerhsy.png')] bg-cover bg-no-repeat bg-center flex flex-col justify-between items-center overflow-hidden rounded-md relative p-8">
            
            {/* Fullscreen Canvas for Sparkles */}
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

            {/* Top Heading */}
            <div className="pt-12 z-20">
                <h1 className="md:text-7xl text-3xl lg:text-7xl font-ethenocentric text-center text-white drop-shadow-xl tracking-tight">
                    {/* N.E.R.D.S. Merch */}
                </h1>
            </div>

            {/* Bottom Section: Text + Chevron Button */}
            <div className="flex flex-col items-center gap-4 z-20 mb-4">
                <h4 className="text-base md:text-lg font-medium text-gray-200 text-center max-w-2xl mx-auto drop-shadow-lg">
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