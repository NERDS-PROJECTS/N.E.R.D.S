import { Link } from 'react-router-dom';

export default function Footer_v2() {
    return (
        <>
            <style>
                {`
                    @keyframes circuitFlow {
                        0% { background-position: 0% 0%; }
                        100% { background-position: 100% 100%; }
                    }

                    @keyframes gridPulse {
                        0%, 100% { opacity: 0.3; }
                        50% { opacity: 0.6; }
                    }

                    @keyframes scanMove {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(200%); }
                    }

                    @keyframes glowPulse {
                        0%, 100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.3); }
                        50% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.6); }
                    }

                    .footer-robotic-bg {
                        background: linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%);
                        position: relative;
                    }

                    .footer-robotic-bg::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: 
                            linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%),
                            linear-gradient(0deg, transparent 0%, rgba(239, 68, 68, 0.05) 50%, transparent 100%);
                        background-size: 100px 100px;
                        animation: circuitFlow 20s linear infinite;
                        opacity: 0.5;
                    }

                    .footer-robotic-bg::after {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: 
                            repeating-linear-gradient(
                                90deg,
                                transparent,
                                transparent 49px,
                                rgba(59, 130, 246, 0.1) 49px,
                                rgba(59, 130, 246, 0.1) 50px
                            ),
                            repeating-linear-gradient(
                                0deg,
                                transparent,
                                transparent 49px,
                                rgba(239, 68, 68, 0.1) 49px,
                                rgba(239, 68, 68, 0.1) 50px
                            );
                        animation: gridPulse 3s ease-in-out infinite;
                    }

                    .scan-line {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 2px;
                        background: linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.8), transparent);
                        animation: scanMove 8s linear infinite;
                        filter: blur(1px);
                    }

                    .cyber-border {
                        border: 1px solid rgba(59, 130, 246, 0.3);
                        position: relative;
                    }

                    .cyber-border::before,
                    .cyber-border::after {
                        content: '';
                        position: absolute;
                        width: 10px;
                        height: 10px;
                        border: 2px solid #3b82f6;
                    }

                    .cyber-border::before {
                        top: -2px;
                        left: -2px;
                        border-right: none;
                        border-bottom: none;
                    }

                    .cyber-border::after {
                        bottom: -2px;
                        right: -2px;
                        border-left: none;
                        border-top: none;
                    }

                    .tech-glow {
                        text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
                    }

                    .neon-line {
                        height: 2px;
                        background: linear-gradient(90deg, 
                            transparent 0%, 
                            #3b82f6 20%, 
                            #ef4444 50%, 
                            #3b82f6 80%, 
                            transparent 100%
                        );
                        animation: glowPulse 2s ease-in-out infinite;
                    }
                `}
            </style>

            {/* Mobile Footer */}
            <footer className="md:hidden flex flex-col items-center relative footer-robotic-bg">
                {/* Top Neon Border */}
                <div className="w-full neon-line"></div>
                <div className="scan-line"></div>
                
                <div className="w-full min-h-[40rem] relative overflow-hidden pb-8">
                    {/* Content Overlay */}
                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-start bg-black/40 shadow-md px-4 sm:px-6 py-8 border-b border-blue-900/30">
                        {/* Logo Section */}
                        <div className="w-full flex flex-col items-center sm:flex-row sm:justify-start sm:pl-6 mt-4">
                            <a href="/" className="flex-shrink-0 relative group">
                                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <img
                                    src="https://res.cloudinary.com/dqmktpekh/image/upload/f_auto,q_auto/npansp6k2ntw7qeoqoms"
                                    alt="N.E.R.D.S Logo"
                                    className="w-24 h-24 sm:w-28 sm:h-28 cursor-pointer hover:opacity-80 transition-all relative z-10 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                                />
                            </a>
                            <div className="font-spaced text-lg sm:text-xl mt-3 sm:mt-0 sm:ml-4 text-blue-400 font-semibold text-center sm:text-left tech-glow">
                                N.E.R.D.S NIT Silchar
                            </div>
                        </div>

                        {/* Email Section */}
                        <div className="flex flex-col justify-start items-start w-full px-4 sm:pl-8 mt-8">
                            <p className="font-ethenocentric text-blue-400 text-sm sm:text-md font-extralight tech-glow">
                                &gt; WANNA KNOW MORE?
                            </p>
                            <input
                                type="email"
                                placeholder="EMAIL US HERE..."
                                className="mt-4 bg-black/60 text-blue-300 text-sm w-full max-w-sm p-3 border-2 border-blue-900/50 outline-none focus:border-blue-500 focus:shadow-[0_0_10px_rgba(59,130,246,0.3)] transition-all cyber-border"
                                style={{
                                    clipPath: "polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%)",
                                }}
                            />
                            <p className="text-sm sm:text-base text-gray-400 font-mono font-extralight mt-3">
                                Or contact us{" "}
                                <Link className="text-blue-400 underline hover:text-red-400 transition-colors tech-glow" to="/contact">
                                    [HERE]
                                </Link>
                            </p>
                        </div>

                        {/* Contact Info */}
                        <div className="w-full mt-8 px-4 sm:px-8">
                            <div className="flex flex-col items-start border-l-2 border-blue-500/50 pl-4">
                                <p className="text-blue-400 font-ethenocentric leading-6 font-extralight text-sm sm:text-md mb-3 tech-glow">
                                    &gt; VISIT US
                                </p>
                                <p className="text-gray-300 leading-7 font-mono text-xs sm:text-sm font-extralight">
                                    <a
                                        href="https://maps.app.goo.gl/3bCXg1WyDSQ3rduD8"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-blue-400 transition-colors"
                                    >
                                        📍 NIT Silchar, Silchar, Assam, India- 788010
                                    </a>
                                </p>
                                <p className="text-gray-300 font-extralight font-mono text-xs sm:text-sm mt-2">
                                    <a 
                                        href="mailto:nerds@nits.ac.in?subject=Hello%20N.E.R.D.S TEAM"
                                        className="hover:text-blue-400 transition-colors"
                                    >
                                        📧 nerds@nits.ac.in
                                    </a>
                                </p>
                                <p className="text-gray-300 font-extralight font-mono text-xs sm:text-[14px] mt-1">
                                    📞 +91-60031 XXXXX
                                </p>
                            </div>
                        </div>

                        {/* Social Media Icons */}
                        <div className="w-full flex justify-center gap-6 sm:gap-8 mt-8 px-4">
                            <a
                                target="_blank"
                                href="https://www.facebook.com/roboticsclub.nits?mibextid=ZbWKwL"
                                rel="noopener noreferrer"
                                className="hover:scale-110 transition-transform group relative"
                            >
                                <div className="absolute inset-0 bg-blue-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <img
                                    src="https://res.cloudinary.com/dagggqd6g/image/upload/f_auto,q_auto/viuomoqgmkofttwlli8v"
                                    alt="Facebook"
                                    className="h-6 w-6 sm:h-7 sm:w-7 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] relative z-10 brightness-110"
                                />
                            </a>
                            <a
                                target="_blank"
                                href="https://www.instagram.com/nerds.nitsilchar?igsh=MTM0MjFpZjF6M3Zucg=="
                                rel="noopener noreferrer"
                                className="hover:scale-110 transition-transform group relative"
                            >
                                <div className="absolute inset-0 bg-blue-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <img
                                    src="https://res.cloudinary.com/dagggqd6g/image/upload/f_auto,q_auto/udtuzvgwajqwjozwqzwr"
                                    alt="Instagram"
                                    className="h-6 w-6 sm:h-7 sm:w-7 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] relative z-10 brightness-110"
                                />
                            </a>
                            <a
                                target="_blank"
                                href="https://www.linkedin.com/company/n-e-r-d-s-nits/"
                                rel="noopener noreferrer"
                                className="hover:scale-110 transition-transform group relative"
                            >
                                <div className="absolute inset-0 bg-blue-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <img
                                    src="https://res.cloudinary.com/dagggqd6g/image/upload/f_auto,q_auto/t1gyihfapsxp6huydy8x"
                                    alt="LinkedIn"
                                    className="h-6 w-6 sm:h-7 sm:w-7 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] relative z-10 brightness-110"
                                />
                            </a>
                            <a
                                target="_blank"
                                href="https://www.youtube.com/@NERDSRoboticsNITS"
                                rel="noopener noreferrer"
                                className="hover:scale-110 transition-transform group relative"
                            >
                                <div className="absolute inset-0 bg-blue-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <img
                                    src="https://res.cloudinary.com/dagggqd6g/image/upload/f_auto,q_auto/wdw8e75uvlzubpatqkri"
                                    alt="Youtube"
                                    className="h-6 w-6 sm:h-7 sm:w-7 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] relative z-10 brightness-110"
                                />
                            </a>
                            <a
                                target="_blank"
                                href="https://medium.com/@nerds_86525"
                                rel="noopener noreferrer"
                                className="hover:scale-110 transition-transform group relative"
                            >
                                <div className="absolute inset-0 bg-blue-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Medium_logo_Monogram.svg/1200px-Medium_logo_Monogram.svg.png"
                                    alt="Medium"
                                    className="h-6 w-6 sm:h-7 sm:w-7 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] relative z-10 brightness-110"
                                />
                            </a>
                        </div>

                        {/* Copyright Section */}
                        <div className="w-full mt-8 px-4 text-center border-t border-blue-900/30 pt-6">
                            <p className="text-blue-400 font-mono font-bold text-xs sm:text-sm tech-glow">
                                © 2024 N.E.R.D.S. NIT Silchar | All Rights Reserved
                            </p>
                            <p className="text-gray-500 font-mono text-[10px] mt-1">
                                [ NEURAL ROBOTICS SYSTEM v2.0 ]
                            </p>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Tablet & Desktop Footer */}
            <div className="hidden md:block relative w-full footer-robotic-bg">
                {/* Top Neon Border */}
                <div className="w-full neon-line"></div>
                <div className="scan-line"></div>
                
                <div className="w-full min-h-[450px] relative overflow-hidden">
                    {/* Main Content */}
                    <div className="relative z-10 w-full min-h-[371px] flex items-center justify-center bg-black/40 shadow-md py-12 border-b border-purple-900/30">
                        <div className="flex flex-col lg:flex-row items-start justify-between w-full max-w-7xl px-6 md:px-8 lg:px-12 gap-8 lg:gap-0">
                            {/* Left Section - Logo and Email */}
                            <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-12 lg:space-x-20 w-full lg:w-auto">
                                {/* Logo */}
                                <div className="flex-shrink-0 relative group">
                                    <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <a href="/">
                                        <img
                                            src="https://res.cloudinary.com/dqmktpekh/image/upload/f_auto,q_auto/npansp6k2ntw7qeoqoms"
                                            className="w-28 h-28 lg:w-32 lg:h-32 cursor-pointer hover:opacity-80 transition-all drop-shadow-[0_0_20px_rgba(59,130,246,0.6)] relative z-10"
                                            alt="N.E.R.D.S Logo"
                                        />
                                    </a>
                                </div>

                                {/* Email Section */}
                                <div className="w-full md:w-auto">
                                    <p className="font-ethenocentric text-blue-400 text-base lg:text-[18px] font-light mb-4 lg:mb-6 tech-glow">
                                        &gt; WANNA KNOW MORE?
                                    </p>
                                    <input
                                        type="email"
                                        placeholder="EMAIL US HERE..."
                                        className="mt-2 bg-black/60 text-blue-300 text-sm p-3 border-2 border-blue-900/50 outline-none focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all w-full md:w-[18rem] lg:w-[22rem] cyber-border"
                                        style={{
                                            clipPath: 'polygon(15px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 15px)'
                                        }}
                                    />
                                    <p className="text-sm lg:text-base text-gray-400 font-mono mt-3 lg:mt-4">
                                        Or contact us{" "}
                                        <Link className="text-blue-400 underline hover:text-red-400 transition-colors tech-glow" to="/contact">
                                            [HERE]
                                        </Link>
                                    </p>
                                </div>
                            </div>

                            {/* Right Section - Contact and Social */}
                            <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-12 lg:space-x-20 items-start w-full lg:w-auto">
                                {/* Visit Us Section */}
                                <div className="w-full md:w-auto border-l-2 border-blue-500/50 pl-6">
                                    <p className="text-blue-400 font-ethenocentric text-base lg:text-[18px] font-bold mb-4 lg:mb-6 tech-glow">
                                        &gt; VISIT US
                                    </p>
                                    <p className="text-gray-300 font-mono text-sm lg:text-[14px] mb-3 max-w-xs">
                                        <a
                                            href="https://maps.app.goo.gl/3bCXg1WyDSQ3rduD8"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-light hover:text-blue-400 transition-colors"
                                        >
                                            📍 NIT Silchar, Silchar, Assam, India- 788010
                                        </a>
                                    </p>
                                    <p className="text-gray-300 font-mono text-sm lg:text-[14px] mb-3">
                                        <a
                                            href="mailto:nerds@nits.ac.in?subject=Hello%20N.E.R.D.S TEAM"
                                            className="font-light hover:text-blue-400 transition-colors"
                                        >
                                            📧 nerds@nits.ac.in
                                        </a>
                                    </p>
                                    <p className="text-gray-300 font-mono text-sm lg:text-[14px] font-light">
                                        📞 +91-60031 XXXXX
                                    </p>
                                </div>

                                {/* Social Media Icons */}
                                <div className="flex md:flex-col gap-6 md:gap-6 lg:gap-8">
                                    <a
                                        target="_blank"
                                        href="https://www.facebook.com/roboticsclub.nits?mibextid=ZbWKwL"
                                        rel="noopener noreferrer"
                                        className="hover:scale-110 transition-transform group relative"
                                    >
                                        <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <img
                                            src="https://res.cloudinary.com/dagggqd6g/image/upload/f_auto,q_auto/viuomoqgmkofttwlli8v"
                                            alt="Facebook"
                                            className="h-5 w-5 lg:h-6 lg:w-6 drop-shadow-[0_0_10px_rgba(59,130,246,0.7)] relative z-10 brightness-110"
                                        />
                                    </a>
                                    <a
                                        target="_blank"
                                        href="https://www.instagram.com/nerds.nitsilchar?igsh=MTM0MjFpZjF6M3Zucg=="
                                        rel="noopener noreferrer"
                                        className="hover:scale-110 transition-transform group relative"
                                    >
                                        <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <img
                                            src="https://res.cloudinary.com/dagggqd6g/image/upload/f_auto,q_auto/udtuzvgwajqwjozwqzwr"
                                            alt="Instagram"
                                            className="h-5 w-5 lg:h-6 lg:w-6 drop-shadow-[0_0_10px_rgba(59,130,246,0.7)] relative z-10 brightness-110"
                                        />
                                    </a>
                                    <a
                                        target="_blank"
                                        href="https://www.linkedin.com/company/n-e-r-d-s-nits/"
                                        rel="noopener noreferrer"
                                        className="hover:scale-110 transition-transform group relative"
                                    >
                                        <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <img
                                            src="https://res.cloudinary.com/dagggqd6g/image/upload/f_auto,q_auto/t1gyihfapsxp6huydy8x"
                                            alt="LinkedIn"
                                            className="h-5 w-5 lg:h-6 lg:w-6 drop-shadow-[0_0_10px_rgba(59,130,246,0.7)] relative z-10 brightness-110"
                                        />
                                    </a>
                                    <a
                                        target="_blank"
                                        href="https://www.youtube.com/@NERDSRoboticsNITS"
                                        rel="noopener noreferrer"
                                        className="hover:scale-110 transition-transform group relative"
                                    >
                                        <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <img
                                            src="https://res.cloudinary.com/dagggqd6g/image/upload/f_auto,q_auto/wdw8e75uvlzubpatqkri"
                                            alt="Youtube"
                                            className="h-5 w-5 lg:h-6 lg:w-6 drop-shadow-[0_0_10px_rgba(59,130,246,0.7)] relative z-10 brightness-110"
                                        />
                                    </a>
                                    <a
                                        target="_blank"
                                        href="https://medium.com/@nerds_86525"
                                        rel="noopener noreferrer"
                                        className="hover:scale-110 transition-transform group relative"
                                    >
                                        <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Medium_logo_Monogram.svg/1200px-Medium_logo_Monogram.svg.png"
                                            alt="Medium"
                                            className="h-5 w-5 lg:h-6 lg:w-6 drop-shadow-[0_0_10px_rgba(59,130,246,0.7)] relative z-10 brightness-110"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Copyright Section */}
                    <div className="relative z-10 w-full h-[79px] flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm px-4 border-t border-blue-900/30">
                        <p className="text-blue-400 font-mono font-bold text-xs lg:text-sm text-center tech-glow">
                            © 2024 N.E.R.D.S. NIT Silchar | All Rights Reserved
                        </p>
                        <p className="text-gray-500 font-mono text-[10px] mt-1">
                            [ NEURAL ROBOTICS SYSTEM v2.0 ]
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
