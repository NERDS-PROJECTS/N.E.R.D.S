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
        <div className="h-[90vh] w-full  bg-[url('https://res.cloudinary.com/dagggqd6g/image/upload/v1756851620/ptrt_olrqji.png')] 
    md:bg-[url('https://res.cloudinary.com/dagggqd6g/image/upload/v1756851508/merch_bg_tuusb4.png')]  bg-cover bg-no-repeat bg-center flex flex-col items-center justify-center overflow-hidden rounded-md relative" >
            <h1
                className="md:text-7xl text-3xl lg:text-7xl font-ethenocentric text-center text-white drop-shadow-xl tracking-tight relative pb-2 z-20">
                N.E.R.D.S. Merch
            </h1>
            <h4
                className="text-base md:text-lg font-medium text-gray-200 text-center mb-6 max-w-2xl mx-auto drop-shadow-lg z-20">
                Complete the form below to order your exclusive Robotics club Merchandise. Scroll down to get started.
            </h4>
            <div className="w-[40rem] h-40 relative">
                {/* Gradients */}
                <div
                    className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                <div
                    className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                <div
                    className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                <div
                    className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

                {/* Core component */}
                <SparklesCore
                    background="transparent"
                    minSize={0.4}
                    maxSize={1}
                    particleDensity={500}
                    className="w-full h-full"
                    particleColor="#FFFFFF" />

                {/* Radial Gradient to prevent sharp edges */}
                <div
                    className="absolute inset-0 w-full h-full bg- [mask-image:radial-gradient(350px_200px_at_top,transparent_10%,white)]"></div>
            </div>
            {/* Bouncing Chevron Arrow */}
            <div className="absolute inset-x-0 bottom-6 z-30 flex justify-center animate-bounce">
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
