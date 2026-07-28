const RecruitmentClosed = () => {
    return (
        <div className="w-full bg-black py-16 px-6 flex justify-center items-center">
            <div className="max-w-2xl w-full bg-neutral-900/80 border border-amber-500/30 rounded-2xl p-8 md:p-12 text-center shadow-[0_0_50px_rgba(245,158,11,0.1)] backdrop-blur-md">
                <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/40 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg 
                        className="w-8 h-8 text-amber-400" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent mb-4 font-ethenocentric tracking-wide">
                    ONLINE REGISTRATION CLOSED
                </h2>

                <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 font-spaced">
                    Online portal registrations are officially closed. If you still wish to apply, please report directly to the <span className="text-amber-400 font-semibold">examination premise</span> for manual registration.
                </p>

                <div className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs md:text-sm px-4 py-2 rounded-full uppercase tracking-wider font-mono">
                    Status: On-site Registration Only
                </div>
            </div>
        </div>
    );
};
export default RecruitmentClosed;