import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { motion } from 'framer-motion';
import sponsors from './sponsors.json';

const backgroundImg = "/sponsor/sponsorRect.webp";

export default function SponsorHome() {
    const [imageErrors, setImageErrors] = useState({});

    const handleImageError = (id) => {
        setImageErrors((prev) => ({ ...prev, [id]: true }));
    };

    return (
        <div className="w-full relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 py-16 md:py-24">
                {/* Heading Section */}
                <motion.div 
                    className="mb-12 md:mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center">
                        <h2 className="text-sm md:text-base font-mono text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 uppercase tracking-widest mb-4">
                            Our Partners
                        </h2>
                        <h1 className="text-center font-ethenocentric font-normal text-3xl md:text-5xl lg:text-6xl leading-tight mb-3 text-white">
                            Trusted Sponsors
                        </h1>
                        <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
                        <p className="text-gray-400 text-sm md:text-base mt-6 max-w-2xl pl-5 pr-5 mx-auto">
                            We are grateful to our sponsors who believe in innovation and support our mission
                        </p>
                    </div>
                </motion.div>

                {/* Swiper Carousel */}
                <motion.div 
                    className="px-4 md:px-8 flex justify-center items-center w-full"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 40,
                            },
                        }}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        className="sponsor-swiper w-full max-w-7xl"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingBottom: '20px',
                        }}
                    >
                        {sponsors.map((sponsor, index) => (
                            <SwiperSlide key={sponsor.id} style={{ display: 'flex', justifyContent: 'center' }}>
                                {!sponsor.website ? (
                                    <div className="h-[170px] w-[170px] p-2 sm:h-[180px] sm:w-[180px] md:h-[230px] md:w-[230px] flex items-center justify-center cursor-default">
                                        <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-lg transition-all duration-300">
                                            {/* Premium gradient border - always hidden, no hover */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-2xl opacity-0 transition-opacity duration-300"></div>
                                            
                                            {/* Background image with overlay */}
                                            <img
                                                src={backgroundImg}
                                                alt="Sponsor Background"
                                                className="absolute inset-0 h-full w-full object-cover rounded-2xl"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                            
                                            {/* Logo Container */}
                                            <div className="relative z-10 flex h-full items-center justify-center">
                                                {!imageErrors[sponsor.id] ? (
                                                    <motion.img
                                                        src={sponsor.logo}
                                                        alt={sponsor.name}
                                                        className="h-[65%] w-[65%] object-contain max-w-full max-h-full filter drop-shadow-lg"
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        whileInView={{ opacity: 1, scale: 1 }}
                                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                                        onError={() => handleImageError(sponsor.id)}
                                                    />
                                                ) : (
                                                    <motion.div 
                                                        className="text-center text-white"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.5 }}
                                                    >
                                                        <p className="text-sm md:text-base font-semibold">{sponsor.name}</p>
                                                    </motion.div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <motion.a
                                        href={sponsor.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="no-underline flex justify-center items-center w-full group"
                                    >
                                        <div className="h-[170px] w-[170px] p-2 sm:h-[180px] sm:w-[180px] md:h-[230px] md:w-[230px] flex items-center justify-center">
                                            <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-lg transition-all duration-300">
                                                {/* Premium gradient border - always hidden, no hover */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-2xl opacity-0 transition-opacity duration-300"></div>
                                                
                                                {/* Background image with overlay */}
                                                <img
                                                    src={backgroundImg}
                                                    alt="Sponsor Background"
                                                    className="absolute inset-0 h-full w-full object-cover rounded-2xl"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                                
                                                {/* Logo Container */}
                                                <div className="relative z-10 flex h-full items-center justify-center">
                                                    {!imageErrors[sponsor.id] ? (
                                                        <motion.img
                                                            src={sponsor.logo}
                                                            alt={sponsor.name}
                                                            className="h-[65%] w-[65%] object-contain max-w-full max-h-full filter drop-shadow-lg"
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            whileInView={{ opacity: 1, scale: 1 }}
                                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                                            onError={() => handleImageError(sponsor.id)}
                                                        />
                                                    ) : (
                                                        <motion.div 
                                                            className="text-center text-white"
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            transition={{ duration: 0.5 }}
                                                        >
                                                            <p className="text-sm md:text-base font-semibold">{sponsor.name}</p>
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.a>
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>

                {/* Bottom accent line */}
                <motion.div 
                    className="flex justify-center mt-12 md:mt-16"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                </motion.div>
            </div>
        </div>
    );
}
