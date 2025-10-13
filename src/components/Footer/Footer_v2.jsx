import { Link } from 'react-router-dom';
import Aurora from './Aurora';

export default function Footer_v2() {
    return (
        <>
            {/* Mobile Footer */}
            <footer className="md:hidden flex flex-col items-center relative">
                {/* Top Separation Border */}
                <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
                
                <div className="w-full min-h-[40rem] relative overflow-hidden pb-8">
                    {/* Aurora Background */}
                    <div className="absolute inset-0 z-0">
                        <Aurora
                            colorStops={["#ff0000", "#5d33e6", "#3d0099"]}
                            blend={0.5}
                            amplitude={1.0}
                            speed={1}
                        />
                    </div>

                    {/* Content Overlay */}
                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-start backdrop-blur-[9px] bg-black/30 shadow-md px-4 sm:px-6 py-8">
                        {/* Logo Section */}
                        <div className="w-full flex flex-col items-center sm:flex-row sm:justify-start sm:pl-6 mt-4">
                            <a href="/" className="flex-shrink-0">
                                <img
                                    src="https://res.cloudinary.com/dqmktpekh/image/upload/f_auto,q_auto/npansp6k2ntw7qeoqoms"
                                    alt="N.E.R.D.S Logo"
                                    className="w-24 h-24 sm:w-28 sm:h-28 cursor-pointer hover:opacity-80 transition-opacity"
                                />
                            </a>
                            <div className="font-spaced text-lg sm:text-xl mt-3 sm:mt-0 sm:ml-4 text-white font-semibold text-center sm:text-left">
                                N.E.R.D.S NIT Silchar
                            </div>
                        </div>

                        {/* Email Section */}
                        <div className="flex flex-col justify-start items-start w-full px-4 sm:pl-8 mt-8">
                            <p className="font-ethenocentric text-white text-sm sm:text-md font-extralight">
                                Wanna know more?
                            </p>
                            <input
                                type="email"
                                placeholder="Email us here"
                                className="mt-4 bg-[#3E3E3E]/80 text-white text-sm w-full max-w-sm p-3 border-2 border-gray-600 outline-none focus:border-[#FF94B4] transition-colors"
                                style={{
                                    clipPath: "polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%)",
                                }}
                            />
                            <p className="text-sm sm:text-base text-white font-spaced font-extralight mt-3">
                                Or contact us{" "}
                                <Link className="text-[#FF94B4] underline hover:text-[#3A29FF] transition-colors" to="/contact">
                                    here
                                </Link>
                            </p>
                        </div>

                        {/* Contact Info */}
                        <div className="w-full mt-8 px-4 sm:px-8">
                            <div className="flex flex-col items-start">
                                <p className="text-white font-ethenocentric leading-6 font-extralight text-sm sm:text-md mb-3">
                                    Visit Us
                                </p>
                                <p className="text-white leading-7 font-spaced text-xs sm:text-sm font-extralight">
                                    <a
                                        href="https://maps.app.goo.gl/3bCXg1WyDSQ3rduD8"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-[#FF94B4] transition-colors"
                                    >
                                        NIT Silchar, Silchar, Assam, India- 788010
                                    </a>
                                </p>
                                <p className="text-white font-extralight font-spaced text-xs sm:text-sm mt-2">
                                    <a 
                                        href="mailto:nerds@nits.ac.in?subject=Hello%20N.E.R.D.S TEAM"
                                        className="hover:text-[#FF94B4] transition-colors"
                                    >
                                        Email- nerds@nits.ac.in
                                    </a>
                                </p>
                                <p className="text-white font-extralight font-spaced text-xs sm:text-[14px] mt-1">
                                    +91-60031 XXXXX
                                </p>
                            </div>
                        </div>

                        {/* Social Media Icons */}
                        <div className="w-full flex justify-center gap-6 sm:gap-8 mt-8 px-4">
                            <a
                                target="_blank"
                                href="https://www.facebook.com/roboticsclub.nits?mibextid=ZbWKwL"
                                rel="noopener noreferrer"
                                className="hover:scale-110 transition-transform"
                            >
                                <img
                                    src="https://res.cloudinary.com/dagggqd6g/image/upload/f_auto,q_auto/viuomoqgmkofttwlli8v"
                                    alt="Facebook"
                                    className="h-6 w-6 sm:h-7 sm:w-7 drop-shadow-lg"
                                />
                            </a>
                            <a
                                target="_blank"
                                href="https://www.instagram.com/nerds.nitsilchar?igsh=MTM0MjFpZjF6M3Zucg=="
                                rel="noopener noreferrer"
                                className="hover:scale-110 transition-transform"
                            >
                                <img
                                    src="https://res.cloudinary.com/dagggqd6g/image/upload/f_auto,q_auto/udtuzvgwajqwjozwqzwr"
                                    alt="Instagram"
                                    className="h-6 w-6 sm:h-7 sm:w-7 drop-shadow-lg"
                                />
                            </a>
                            <a
                                target="_blank"
                                href="https://www.linkedin.com/company/n-e-r-d-s-nits/"
                                rel="noopener noreferrer"
                                className="hover:scale-110 transition-transform"
                            >
                                <img
                                    src="https://res.cloudinary.com/dagggqd6g/image/upload/f_auto,q_auto/t1gyihfapsxp6huydy8x"
                                    alt="LinkedIn"
                                    className="h-6 w-6 sm:h-7 sm:w-7 drop-shadow-lg"
                                />
                            </a>
                            <a
                                target="_blank"
                                href="https://www.youtube.com/@NERDSRoboticsNITS"
                                rel="noopener noreferrer"
                                className="hover:scale-110 transition-transform"
                            >
                                <img
                                    src="https://res.cloudinary.com/dagggqd6g/image/upload/f_auto,q_auto/wdw8e75uvlzubpatqkri"
                                    alt="Youtube"
                                    className="h-6 w-6 sm:h-7 sm:w-7 drop-shadow-lg"
                                />
                            </a>
                            <a
                                target="_blank"
                                href="https://medium.com/@nerds_86525"
                                rel="noopener noreferrer"
                                className="hover:scale-110 transition-transform"
                            >
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Medium_logo_Monogram.svg/1200px-Medium_logo_Monogram.svg.png"
                                    alt="Medium"
                                    className="h-6 w-6 sm:h-7 sm:w-7 drop-shadow-lg"
                                />
                            </a>
                        </div>

                        {/* Copyright Section */}
                        <div className="w-full mt-8 px-4 text-center">
                            <p className="text-white font-spaced font-bold text-xs sm:text-sm">
                                © 2024 N.E.R.D.S. NIT Silchar. All Rights Reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Tablet & Desktop Footer */}
            <div className="hidden md:block relative w-full">
                {/* Top Separation Border */}
                <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-60 mb-0"></div>
                
                <div className="w-full min-h-[450px] relative overflow-hidden">
                    {/* Aurora Background */}
                    <div className="absolute inset-0 z-0">
                        <Aurora
                            colorStops={["#ff0000", "#5d33e6", "#3d0099"]}
                            blend={0.5}
                            amplitude={1.0}
                            speed={0.5}
                        />
                    </div>

                    {/* Main Content */}
                    <div className="relative z-10 w-full min-h-[371px] flex items-center justify-center backdrop-blur-[40px] bg-black/30 shadow-md py-12">
                        <div className="flex flex-col lg:flex-row items-start justify-between w-full max-w-7xl px-6 md:px-8 lg:px-12 gap-8 lg:gap-0">
                            {/* Left Section - Logo and Email */}
                            <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-12 lg:space-x-20 w-full lg:w-auto">
                                {/* Logo */}
                                <div className="flex-shrink-0">
                                    <a href="/">
                                        <img
                                            src="https://res.cloudinary.com/dqmktpekh/image/upload/f_auto,q_auto/npansp6k2ntw7qeoqoms"
                                            className="w-28 h-28 lg:w-32 lg:h-32 cursor-pointer hover:opacity-80 transition-opacity drop-shadow-2xl"
                                            alt="N.E.R.D.S Logo"
                                        />
                                    </a>
                                </div>

                                {/* Email Section */}
                                <div className="w-full md:w-auto">
                                    <p className="font-ethenocentric text-white text-base lg:text-[18px] font-light mb-4 lg:mb-6">
                                        Wanna know more?
                                    </p>
                                    <input
                                        type="email"
                                        placeholder="Email us here"
                                        className="mt-2 bg-[#3E3E3E]/80 text-white text-sm p-3 border-2 border-gray-600 outline-none focus:border-[#FF94B4] transition-colors w-full md:w-[18rem] lg:w-[22rem]"
                                        style={{
                                            clipPath: 'polygon(15px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 15px)'
                                        }}
                                    />
                                    <p className="text-sm lg:text-base text-white font-spaced mt-3 lg:mt-4">
                                        Or contact us{" "}
                                        <Link className="text-[#FF94B4] underline hover:text-[#3A29FF] transition-colors" to="/contact">
                                            here
                                        </Link>
                                    </p>
                                </div>
                            </div>

                            {/* Right Section - Contact and Social */}
                            <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-12 lg:space-x-20 items-start w-full lg:w-auto">
                                {/* Visit Us Section */}
                                <div className="w-full md:w-auto">
                                    <p className="text-white font-ethenocentric text-base lg:text-[18px] font-bold mb-4 lg:mb-6">
                                        Visit Us
                                    </p>
                                    <p className="text-white font-spaced text-sm lg:text-[14px] mb-3 max-w-xs">
                                        <a
                                            href="https://maps.app.goo.gl/3bCXg1WyDSQ3rduD8"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-light hover:text-[#FF94B4] transition-colors"
                                        >
                                            NIT Silchar, Silchar, Assam, India- 788010
                                        </a>
                                    </p>
                                    <p className="text-white font-spaced text-sm lg:text-[14px] mb-3">
                                        <a
                                            href="mailto:nerds@nits.ac.in?subject=Hello%20N.E.R.D.S TEAM"
                                            className="font-light hover:text-[#FF94B4] transition-colors"
                                        >
                                            Email- nerds@nits.ac.in
                                        </a>
                                    </p>
                                    <p className="text-white font-spaced text-sm lg:text-[14px] font-light">
                                        +91-60031 XXXXX
                                    </p>
                                </div>

                                {/* Social Media Icons */}
                                <div className="flex md:flex-col gap-6 md:gap-6 lg:gap-8">
                                    <a
                                        target="_blank"
                                        href="https://www.facebook.com/roboticsclub.nits?mibextid=ZbWKwL"
                                        rel="noopener noreferrer"
                                        className="hover:scale-110 transition-transform"
                                    >
                                        <img
                                            src="https://res.cloudinary.com/dagggqd6g/image/upload/f_auto,q_auto/viuomoqgmkofttwlli8v"
                                            alt="Facebook"
                                            className="h-5 w-5 lg:h-6 lg:w-6 drop-shadow-lg"
                                        />
                                    </a>
                                    <a
                                        target="_blank"
                                        href="https://www.instagram.com/nerds.nitsilchar?igsh=MTM0MjFpZjF6M3Zucg=="
                                        rel="noopener noreferrer"
                                        className="hover:scale-110 transition-transform"
                                    >
                                        <img
                                            src="https://res.cloudinary.com/dagggqd6g/image/upload/f_auto,q_auto/udtuzvgwajqwjozwqzwr"
                                            alt="Instagram"
                                            className="h-5 w-5 lg:h-6 lg:w-6 drop-shadow-lg"
                                        />
                                    </a>
                                    <a
                                        target="_blank"
                                        href="https://www.linkedin.com/company/n-e-r-d-s-nits/"
                                        rel="noopener noreferrer"
                                        className="hover:scale-110 transition-transform"
                                    >
                                        <img
                                            src="https://res.cloudinary.com/dagggqd6g/image/upload/f_auto,q_auto/t1gyihfapsxp6huydy8x"
                                            alt="LinkedIn"
                                            className="h-5 w-5 lg:h-6 lg:w-6 drop-shadow-lg"
                                        />
                                    </a>
                                    <a
                                        target="_blank"
                                        href="https://www.youtube.com/@NERDSRoboticsNITS"
                                        rel="noopener noreferrer"
                                        className="hover:scale-110 transition-transform"
                                    >
                                        <img
                                            src="https://res.cloudinary.com/dagggqd6g/image/upload/f_auto,q_auto/wdw8e75uvlzubpatqkri"
                                            alt="Youtube"
                                            className="h-5 w-5 lg:h-6 lg:w-6 drop-shadow-lg"
                                        />
                                    </a>
                                    <a
                                        target="_blank"
                                        href="https://medium.com/@nerds_86525"
                                        rel="noopener noreferrer"
                                        className="hover:scale-110 transition-transform"
                                    >
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Medium_logo_Monogram.svg/1200px-Medium_logo_Monogram.svg.png"
                                            alt="Medium"
                                            className="h-5 w-5 lg:h-6 lg:w-6 drop-shadow-lg"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Copyright Section */}
                    <div className="relative z-10 w-full h-[79px] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
                        <p className="text-white font-spaced font-bold text-xs lg:text-sm text-center">
                            © 2024 N.E.R.D.S. NIT Silchar. All Rights Reserved.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
