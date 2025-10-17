import { useState } from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import {
  AlertTriangleIcon,
  CheckCircleIcon,
  QrCodeIcon,
  UploadIcon,
  FileTextIcon,
  DownloadIcon,
  EyeIcon,
  DollarSignIcon,
} from 'lucide-react'
import { MultiStepLoader } from "../../components/Merch_components/multi-step-loader";


// Background Grid Component
const BackgroundGrid = () => {
  // Detect mobile for performance optimization
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  return (
    <div className="fixed inset-0 z-0">
      {/* Horizontal lines */}
      {Array.from({
        length: 20,
      }).map((_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute left-0 right-0 h-[1px] bg-red-500/20"
          style={{
            top: `${(i + 1) * 5}%`,
          }}
          initial={{
            opacity: 0,
            scaleX: 0,
          }}
          animate={{
            opacity: 0.3,
            scaleX: 1,
          }}
          transition={isMobile ? {
            duration: 0.5,
            delay: 0,
          } : {
            duration: 1.5,
            delay: i * 0.05,
            ease: 'easeInOut',
          }}
        />
      ))}
      {/* Vertical lines */}
      {Array.from({
        length: 20,
      }).map((_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 w-[1px] bg-red-500/20"
          style={{
            left: `${(i + 1) * 5}%`,
          }}
          initial={{
            opacity: 0,
            scaleY: 0,
          }}
          animate={{
            opacity: 0.3,
            scaleY: 1,
          }}
          transition={isMobile ? {
            duration: 0.5,
            delay: 0,
          } : {
            duration: 1.5,
            delay: i * 0.05,
            ease: 'easeInOut',
          }}
        />
      ))}
      {/* Glowing orbs - disabled on mobile for performance */}
      {!isMobile && Array.from({
        length: 15,
      }).map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full bg-black blur-xl"
          style={{
            width: Math.random() * 200 + 100,
            height: Math.random() * 200 + 100,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      ))}
    </div>
  )
}

// Hero Section Component
const HeroSection = () => {
  // Detect if device is mobile for performance optimization
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  return (
    <motion.section
      className="relative"
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated line - disabled on mobile */}
        {!isMobile && (
          <motion.div
            className="absolute w-full h-1 bg-red-500 top-1/2 left-0 blur-sm"
            animate={{
              x: ['0%', '100%'],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )}
        {/* Circuit lines - disabled on mobile */}
        {!isMobile && Array.from({
          length: 5,
        }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 bg-red-500/30"
            style={{
              width: Math.random() * 100 + 100,
              transform: `rotate(${Math.random() * 360}deg)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              boxShadow: [
                '0 0 5px #ff0000',
                '0 0 20px #ff0000',
                '0 0 5px #ff0000',
              ],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10 max-w-7xl">
        <div className="grid md:grid-cols-5 gap-6 lg:gap-10 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center md:text-left md:col-span-2">
            <motion.h1
              className="text-4xl font-orbitron md:text-5xl lg:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600"
              style={{
                // Static glow on mobile, animated on desktop
                textShadow: isMobile ? '0 0 10px #ff0000' : undefined,
              }}
              animate={isMobile ? {} : {
                textShadow: [
                  '0 0 7px #ff0000',
                  '0 0 10px #ff0000',
                  '0 0 7px #ff0000',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            >
              ROBOWAR
            </motion.h1>
            <motion.h2
              className="text-2xl font-spaced md:text-3xl font-bold mb-4 text-red-200"
              style={{
                // Static glow on mobile, animated on desktop
                textShadow: isMobile ? '0 0 5px #ff0000' : undefined,
              }}
              animate={isMobile ? {} : {
                textShadow: ['0 0 3px #ff0000', '0 0 7px #ff0000', '0 0 3px #ff0000'],
              }}
              transition={{
                duration: 2,
                delay: 0.5,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            >
              Robotron Registration 2025
            </motion.h2>
            <motion.p
              className="text-base md:text-lg font-spaced text-red-200 mb-4"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.5,
                duration: 1,
              }}
            >
              A battle-forged robot engineered for ROBOWAR supremacy — built to crush, smash, and dominate the arena. With unmatched power, precision control, proving its might as the true champion of N.E.R.D.S. Robowar — where only the toughest bots survive!
            </motion.p>
              {/* Prize Pool Announcement */}
              <motion.div
                className="flex justify-center md:justify-start mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.7 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-400 via-red-500 to-red-700 text-black font-bold text-lg md:text-xl shadow-lg border-2 border-red-500/40">
                  <DollarSignIcon className="h-6 w-6 md:h-7 md:w-7 text-black" />
                  Total Prize Pool: <span className="text-white font-extrabold  ml-2">₹50,000</span>
                </span>
              </motion.div>
          </div>

          {/* Right Column - Hero Image */}
          <motion.div
            className="flex justify-center items-center md:col-span-3"
            initial={{
              opacity: 0,
              scale: isMobile ? 1 : 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={isMobile ? {
              duration: 0.3,
            } : {
              delay: 0.3,
              duration: 0.8,
            }}
          >
            <motion.div
              className="relative"
              whileHover={isMobile ? {} : {
                scale: 1.05,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
            >
              {/* Glowing effect behind image - static on mobile */}
              <motion.div
                className="absolute inset-0 bg-red-500/30 blur-3xl rounded-full"
                animate={isMobile ? {} : {
                  opacity: [0.3, 0.6, 0.3],
                  scale: [0.9, 1.1, 0.9],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                style={isMobile ? { opacity: 0.4 } : {}}
              />

              <img
                src="/robotron/war_.png"
                alt="Battle Robot"
                className="relative left-0 md:left-20 z-10 w-full max-w-none h-auto object-contain drop-shadow-[0_0_25px_rgba(239,68,68,0.6)]"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

// Attention Section Component
const AttentionSection = () => {
  return (
    <motion.section
      className="py-8"
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      viewport={{
        once: true,
      }}
    >
      <div className="bg-red-950/30 flex flex-col justify-self-center w-fit  backdrop-blur-md border border-red-500/30 rounded-xl p-6 relative overflow-hidden">
        {/* Glassmorphism effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-900/10" />
        {/* Animated glow */}
        <motion.div
          className="absolute inset-0 bg-black/50 rounded-xl"
          animate={{
            boxShadow: [
              'inset 0 0 30px rgba(239,68,68,0.3)',
              'inset 0 0 60px rgba(239,68,68,0.2)',
              'inset 0 0 30px rgba(239,68,68,0.3)',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />
        <div className="relative z-10 flex items-start gap-4">
          <div className="mt-1 shrink-0">
            <AlertTriangleIcon className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-red-400 mb-2">ATTENTION</h3>
            <p className="text-red-100 font-sans">
              ⚠️ Only registrations are currently allowed. Kits and materials
              are not provided at this time. Registration fee: Rs. 999. For kit
              tracking, visit:{''}
              <motion.a
                href="/trackOrder"
                className="text-red-400 font-medium relative inline-block"
                whileHover={{
                  scale: 1.05,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 10,
                }}
              >
                Track Your Robot Kits
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black"
                  whileHover={{
                    width: '100%',
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                />
                <motion.span
                  className="absolute inset-0 bg-black/20 rounded"
                  initial={{
                    scale: 0,
                    opacity: 0,
                  }}
                  whileHover={{
                    scale: 1,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                />
              </motion.a>
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

// Brochure Download Section Component
const BrochureSection = () => {
  const brochureUrl = "https://drive.google.com/file/d/1nSIvnlE8Qz22bzqI2Ka_mgc1GvKY65VZ/view?usp=sharing"
  const downloadUrl = "https://drive.google.com/uc?export=download&id=1nSIvnlE8Qz22bzqI2Ka_mgc1GvKY65VZ"

  return (
    <motion.section
      className="py-8 flex justify-center w-full"
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      viewport={{
        once: true,
      }}
    >
      <div className="bg-gradient-to-br from-red-950/40 to-black/60 backdrop-blur-md border-2 border-red-500/40 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-[0_0_20px_rgba(239,68,68,0.2)] w-full max-w-2xl">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-900/10" />
        
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-black/30 rounded-2xl"
          animate={{
            boxShadow: [
              'inset 0 0 10px rgba(239,68,68,0.2)',
              'inset 0 0 30px rgba(239,68,68,0.3)',
              'inset 0 0 10px rgba(239,68,68,0.2)',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-red-600/10 rounded-xl border border-red-500/30 shrink-0">
              <FileTextIcon className="h-7 w-7 md:h-8 md:w-8 text-red-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold text-red-300 mb-2 font-orbitron">
                EVENT RULES & REGULATIONS
              </h3>
              <p className="text-red-100 font-sans text-sm md:text-base">
                Download the official RoboWar brochure to learn about competition rules, robot specifications, arena details, and scoring system.
              </p>
            </div>
          </div>

          {/* Features List */}
          <div className="grid md:grid-cols-2 gap-3 mb-6">
            <div className="flex items-center gap-2 text-red-200 text-sm">
              <CheckCircleIcon className="h-4 w-4 text-red-500 shrink-0" />
              <span>Complete rule book</span>
            </div>
            <div className="flex items-center gap-2 text-red-200 text-sm">
              <CheckCircleIcon className="h-4 w-4 text-red-500 shrink-0" />
              <span>Robot specifications</span>
            </div>
            <div className="flex items-center gap-2 text-red-200 text-sm">
              <CheckCircleIcon className="h-4 w-4 text-red-500 shrink-0" />
              <span>Arena dimensions</span>
            </div>
            <div className="flex items-center gap-2 text-red-200 text-sm">
              <CheckCircleIcon className="h-4 w-4 text-red-500 shrink-0" />
              <span>Scoring & judging criteria</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* View Button */}
            <motion.a
              href={brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gradient-to-r from-red-950 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] border border-red-500/30"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <EyeIcon className="h-5 w-5" />
              <span className="font-spaced">VIEW BROCHURE</span>
            </motion.a>

            {/* Download Button */}
            <motion.a
              href={downloadUrl}
              className="flex-1 bg-gradient-to-r from-red-900/80 to-red-950/80 hover:from-red-800/90 hover:to-red-900/90 text-red-100 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] border-2 border-red-600/50 hover:border-red-500"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <DownloadIcon className="h-5 w-5" />
              <span className="font-spaced">DOWNLOAD PDF</span>
            </motion.a>
          </div>

          {/* Additional Info */}
          <div className="mt-4 pt-4 border-t border-red-500/20">
            <p className="text-red-300/70 text-xs md:text-sm font-sans text-center mb-4">
              📋 Make sure to read all rules carefully before registering for the competition
            </p>
            
            {/* Module Head Contact Details */}
            <div className="mt-6 pt-4 border-t border-red-500/30">
              <h4 className="text-lg font-bold text-red-300 mb-3 text-center font-spaced">
                FOR ANY QUERIES, CONTACT:
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                {/* Module Head 1 */}
                <div className="bg-red-950/30 border border-red-600/30 rounded-lg p-4 hover:bg-red-950/50 transition-all">
                  <p className="text-red-200 font-semibold text-sm md:text-base mb-1">
                    Ayushman Sagar
                  </p>
                  <p className="text-red-300/80 text-xs md:text-sm">Module Head - RoboWar</p>
                  <div className="mt-2 space-y-1">
                    <a 
                      href="tel:+919127147825" 
                      className="text-red-400 font-sans hover:text-red-300 text-md flex items-center gap-2 transition-colors"
                    >
                      <span>📞</span>
                      <span>+91-91271-47825</span>
                    </a>
                    <a 
                      href="mailto:swarup_ug@mech.nits.ac.in" 
                      className="text-red-400 font-sans hover:text-red-300 text-md flex items-center gap-2 transition-colors break-all"
                    >
                      <span>✉️</span>
                      <span>swarup_ug@ece.nits.ac.in</span>
                    </a>
                  </div>
                </div>

                {/* Module Head 2 */}
                <div className="bg-red-950/30 border border-red-600/30 rounded-lg p-4 hover:bg-red-950/50 transition-all">
                  <p className="text-red-200 font-semibold text-sm md:text-base mb-1">
                    Abhinav Kumar
                  </p>
                  <p className="text-red-300/80 text-xs md:text-sm">Module Head - RoboWar</p>
                  <div className="mt-2 space-y-1">
                    <a 
                      href="tel:+919304782838" 
                      className="text-red-400 font-sans hover:text-red-300 text-md flex items-center gap-2 transition-colors"
                    >
                      <span>📞</span>
                      <span>+91-93047-82838</span>
                    </a>
                    <a 
                      href="mailto:shubham_ug@ece.nits.ac.in" 
                      className="text-red-400 font-sans hover:text-red-300 text-md flex items-center gap-2 transition-colors break-all"
                    >
                      <span>✉️</span>
                      <span>abhinavk_ug_23@ece.nits.ac.in</span>
                    </a>
                  </div>
                </div>

                {/* Module Head 3 */}
                <div className="bg-red-950/30 border border-red-600/30 rounded-lg p-4 hover:bg-red-950/50 transition-all">
                  <p className="text-red-200 font-semibold text-sm md:text-base mb-1">
                    Chaman Laguri
                  </p>
                  <p className="text-red-300/80 text-xs md:text-sm">Module Head - RoboWar</p>
                  <div className="mt-2 space-y-1">
                    <a 
                      href="tel:+917991090603" 
                      className="text-red-400 font-sans hover:text-red-300 text-md flex items-center gap-2 transition-colors"
                    >
                      <span>📞</span>
                      <span>+91-79910-90603</span>
                    </a>
                    <a 
                      href="mailto:aryan_ug@ece.nits.ac.in" 
                      className="text-red-400 font-sans hover:text-red-300 text-md flex items-center gap-2 transition-colors break-all"
                    >
                      <span>✉️</span>
                      <span>aryan_ug@ece.nits.ac.in</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}



// Kit Components Section Component
const KitComponentsSection = ({ motorOption }) => {
  // Base kit items (common for all options)
  const baseKitItems = [
    'High Power Geared Motor (Grade A) (2 piece)',
    '12V Geared Motor (Grade A) (2 piece)',
    'Traction Wheels (4 Piece)',
    'L-shaped clamps (4 Piece)',
    'Rocker DPDT switch (3 Piece)',
    'Metal strip (for frame)',
    'Metal sheet',
    'Soldering Kit',
  ]

  // Motor-specific items
  const motorSpecificItems = {
    rpm: ['High RPM Motor (1 Piece for weapon)','Sprocket','Bore Mounted Bearing','Pulley System','Steel Rod','Timing Belt'],
    torque: ['High Torque Motor (1 Piece for weapon)','Sprocket Wheel','Geared Hub System','Geared Teeth'],
    both: ['High RPM Motor (1 Piece for weapon)','Sprocket','Bore Mounted Bearing','Pulley System','Steel Rod','Timing Belt','High Torque Motor (1 Piece for weapon)','Sprocket Wheel','Geared Hub System','Geared Teeth']
  }

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    show: {
      opacity: 1,
      y: 0,
    },
  }

  return (
    <motion.section
      className="py-12"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
      }}
      viewport={{
        once: true,
      }}
    >
      <motion.h2
        className="text-3xl font-bold mb-6 text-red-600 text-center"
        initial={{
          opacity: 0,
          y: -20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        viewport={{
          once: true,
        }}
      >
        KIT Component Details
        {motorOption && (
          <span className="block text-lg text-red-400 mt-2 font-semibold">
            {motorOption === 'rpm' && '(High RPM Motor Version)'}
            {motorOption === 'torque' && '(High Torque Motor Version)'}
            {motorOption === 'both' && '(Both Motors - Complete Package)'}
          </span>
        )}
      </motion.h2>
      
      <div className="bg-black/30 flex flex-col justify-self-center w-fit backdrop-blur-sm rounded-2xl font-sans border border-red-900/30 p-8">
        {/* Base Kit Items */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-red-400 mb-4 border-b border-red-500/30 pb-2">
            Base Kit Components
          </h3>
          <motion.ul
            className="space-y-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
            }}
          >
            {baseKitItems.map((item, index) => (
              <motion.li
                key={index}
                className="flex items-center gap-3 relative"
                variants={itemVariants}
              >
                <CheckCircleIcon className="h-5 w-5 text-red-500 shrink-0" />
                <span className="text-red-100">{item}</span>
                {/* Animated line underneath each item */}
                <motion.div
                  className="absolute left-0 right-0 h-[1px] bg-red-800/30 -bottom-1.5"
                  initial={{
                    scaleX: 0,
                  }}
                  whileInView={{
                    scaleX: 1,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  viewport={{
                    once: true,
                  }}
                />
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Motor-Specific Items */}
        {motorOption && motorSpecificItems[motorOption] && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold text-red-300 mb-4 border-b border-red-500/30 pb-2 flex items-center gap-2">
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">WEAPON</span>
              Motor Component
            </h3>
            <motion.ul
              className="space-y-3"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {motorSpecificItems[motorOption].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center gap-3 relative bg-red-600/10 p-3 rounded-lg border border-red-500/30"
                  variants={itemVariants}
                >
                  <CheckCircleIcon className="h-5 w-5 text-red-400 shrink-0" />
                  <span className="text-red-200 font-semibold">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}

KitComponentsSection.propTypes = {
  motorOption: PropTypes.string,
}

// Payment Details Section Component
const PaymentDetailsSection = () => {


  const paymentOptions = [
    {
      bankName: 'SBI',
      accountHolder: 'Swarup Chanda',
      ifsc: 'SBIN0017401',
      accountNo: '40293794000',
      upi: '6003147277@ptsbi',
    },
    {
      bankName: 'SBI',
      accountHolder: 'Md Fayjan',
      ifsc: 'SBIN0016928',
      accountNo: '41946546051',
      upi: 'himdfayzan1735-2@oksbi',
    },
  ]

  return (
    <motion.section
      className="py-12"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
      }}
      viewport={{
        once: true,
      }}
    >
      <motion.h2
        className="text-3xl font-bold mb-8 text-red-600 text-center"
        initial={{
          opacity: 0,
          y: -20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        viewport={{
          once: true,
        }}
      >
        Bank Transfer Payment Details
      </motion.h2>
      <div className="flex flex-col gap-8 max-w-2xl mx-auto">
        {paymentOptions.map((option, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-br from-black-100/50 to-black/50 backdrop-blur-sm rounded-xl border border-black p-6 relative overflow-hidden group"
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.2,
            }}
            viewport={{
              once: true,
            }}
            whileHover={{
              scale: 1.02,
            }}
          >
            {/* Animated glow effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{
                boxShadow: [
                  'inset 0 0 10px rgba(239,68,68,0.2)',
                  'inset 0 0 30px rgba(239,68,68,0.3)',
                  'inset 0 0 20px rgba(239,68,68,0.3)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-red-600">
                Option {index + 1}
              </h3>
              <div className="bg-red-900/30 p-2 rounded-lg">
                <QrCodeIcon className="h-6 w-6 text-red-500" />
              </div>
            </div>
            <div className="space-y-2 font-sans text-red-100">
              <p>
                <span className="text-red-400 font-medium">Bank Name:</span>{' '}
                {option.bankName}
              </p>
              <p>
                <span className="text-red-400 font-medium">Account Holder:</span>{' '}
                {option.accountHolder}
              </p>
              <p>
                <span className="text-red-400 font-medium">IFSC Code:</span>{' '}
                {option.ifsc}
              </p>
              <p>
                <span className="text-red-400 font-medium">Account No:</span>{' '}
                {option.accountNo}
              </p>
              <p>
                <span className="text-red-400 font-medium">UPI ID:</span>{' '}
                {option.upi}
              </p>
            </div>

            {/* Animated border */}
            <motion.div
              className="absolute inset-0 rounded-xl z-0 pointer-events-none"
              initial={{
                opacity: 0,
              }}
              whileHover={{
                opacity: 1,
              }}
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(239,68,68,0.3), transparent)',
                backgroundSize: '200% 100%',
                opacity: 0,
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 0%'],
              }}
              transition={{
                opacity: { duration: 0.3 },
                backgroundPosition: { duration: 2, repeat: Infinity, repeatType: 'mirror' },
              }}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

PaymentDetailsSection.propTypes = {}

function RobowarRegistration() {
  const [formData, setFormData] = useState({
    teamLeaderEmail: "",
    teamName: "",
    teamLeaderName: "",
    teamLeaderPhone: "",
    teamLeaderWhatsapp: "",
    teamLeaderScholarId: "",
    collegeName: "", // For non-NIT Silchar students
    teamMember2: "",
    teamMember3: "",
    teamMember4: "",
    teamMember5: "",
    teamMember6: "",
    paymentProofLink: "",
    transactionNumber: "",
  });

  // College type and kit selection state
  const [collegeType, setCollegeType] = useState(null); // "nit_silchar" or "other"
  const [wantsKit, setWantsKit] = useState(null); // null, true, or false (only for NIT Silchar)
  const [motorOption, setMotorOption] = useState(""); // "rpm", "torque", or "both" (only for NIT Silchar with kit)
  const [weightCategory, setWeightCategory] = useState(null); // "lightweight" (8kg) or "heavyweight" (15kg)

  // Registration fees
  const nitSilcharRegistrationFee = 999;
  const otherCollegeRegistrationFee = 1999;
  
  // Calculate total fee based on college type, kit selection, and motor option
  const calculateTotalFee = () => {
    if (!collegeType) return 0;
    
    if (collegeType === "other") {
      return otherCollegeRegistrationFee; // Other colleges: only registration, no kit
    }
    
    // NIT Silchar students
    if (collegeType === "nit_silchar") {
      if (wantsKit === true) {
        // Kit prices based on motor option
        switch(motorOption) {
          case "rpm":
            return 4499;
          case "torque":
            return 4999;
          case "both":
            return 5999;
          default:
            return nitSilcharRegistrationFee;
        }
      }
      return nitSilcharRegistrationFee; // Registration only
    }
    
    return 0;
  };

  const registrationFee = calculateTotalFee();

  const [fileUrl, setFileUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [modal, setModal] = useState({ open: false, message: "", success: false });

  // Change this to your actual deployed Apps Script Web App URL
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz98t-fRbP6E_eLYVlyHdLPoYAb3A-HljuT1V_Imsgi2g0daMzjPKwAzH6T474uDYw/exec";
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };




  // File upload logic (from FormToSheets/DriveUpload)
  function uploader(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      const rawLog = reader.result.split(",")[1];
      const dataSend = {
        dataReq: { data: rawLog, name: file.name, type: file.type },
        fname: "uploadFilesToGoogleDrive",
      };
      fetch(
        "https://script.google.com/macros/s/AKfycbyAQLKv4e4iBfdZn6sdLw-OSerztKzNbfhF_eJiJAf0WrwK7IzvIVS-cF2iKlv_qQ8EMw/exec",
        {
          method: "POST",
          body: JSON.stringify(dataSend),
        }
      )
        .then((res) => res.json())
        .then((a) => {
          const url = a.url || a.fileUrl || "";
          setFileUrl(url);
          setFormData((prev) => ({ ...prev, paymentProofLink: url }));
          setUploading(false);
        })
        .catch(() => {
          setUploading(false);
          alert("Upload error");
        });
    };
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate team details
    if (!formData.teamLeaderEmail.trim()) {
      setModal({ open: true, message: "Please enter team leader's email address.", success: false });
      return;
    }
    if (!formData.teamName.trim()) {
      setModal({ open: true, message: "Please enter your team name.", success: false });
      return;
    }
    if (!formData.teamLeaderName.trim()) {
      setModal({ open: true, message: "Please enter team leader's name.", success: false });
      return;
    }
    if (!formData.teamLeaderPhone.trim()) {
      setModal({ open: true, message: "Please enter team leader's phone number.", success: false });
      return;
    }
    if (!formData.teamLeaderWhatsapp.trim()) {
      setModal({ open: true, message: "Please enter team leader's WhatsApp number.", success: false });
      return;
    }
    if (!formData.teamLeaderScholarId.trim()) {
      setModal({ open: true, message: "Please enter team leader's Scholar ID.", success: false });
      return;
    }
    if (!formData.teamMember2.trim()) {
      setModal({ open: true, message: "Please enter Team Member 2 name.", success: false });
      return;
    }
    if (!formData.teamMember3.trim()) {
      setModal({ open: true, message: "Please enter Team Member 3 name.", success: false });
      return;
    }
    if (!formData.teamMember4.trim()) {
      setModal({ open: true, message: "Please enter Team Member 4 name.", success: false });
      return;
    }
    // Validate college type selection
    if (collegeType === null) {
      setModal({ open: true, message: "Please select your college type.", success: false });
      return;
    }
    // Validate college name (only for non-NIT Silchar students)
    if (collegeType === "other" && !formData.collegeName.trim()) {
      setModal({ open: true, message: "Please enter your college name.", success: false });
      return;
    }
    // Validate kit selection (only for NIT Silchar students)
    if (collegeType === "nit_silchar" && wantsKit === null) {
      setModal({ open: true, message: "Please select whether you want to purchase a kit or not.", success: false });
      return;
    }
    // Validate motor option (only for NIT Silchar students with kit)
    if (collegeType === "nit_silchar" && wantsKit === true && !motorOption) {
      setModal({ open: true, message: "Please select a motor option for your kit.", success: false });
      return;
    }
    // Validate weight category
    if (weightCategory === null) {
      setModal({ open: true, message: "Please select your robot's weight category.", success: false });
      return;
    }
    if (!formData.paymentProofLink) {
      setModal({ open: true, message: "Please upload payment proof before submitting.", success: false });
      return;
    }
    if (!formData.transactionNumber.trim()) {
      setModal({ open: true, message: "Please enter the transaction number.", success: false });
      return;
    }
    setSubmitting(true);
    try {
      const timestamp = new Date().toISOString();
      const formBody = new URLSearchParams();
      formBody.append("Timestamp", timestamp);
      formBody.append("TeamLeaderEmail", formData.teamLeaderEmail);
      formBody.append("TeamName", formData.teamName);
      formBody.append("TeamLeaderName", formData.teamLeaderName);
      formBody.append("TeamLeaderPhone", formData.teamLeaderPhone);
      formBody.append("TeamLeaderWhatsapp", formData.teamLeaderWhatsapp);
      formBody.append("TeamLeaderScholarId", formData.teamLeaderScholarId);
      formBody.append("CollegeName", collegeType === "other" ? formData.collegeName : "NIT Silchar");
      formBody.append("TeamMemberSecond", formData.teamMember2);
      formBody.append("TeamMemberThird", formData.teamMember3);
      formBody.append("TeamMemberFourth", formData.teamMember4);
      formBody.append("TeamMemberFifth", formData.teamMember5 || "");
      formBody.append("TeamMemberSixth", formData.teamMember6 || "");
      formBody.append("CollegeType", collegeType === "nit_silchar" ? "NIT Silchar" : "Other College");
      formBody.append("WantsKit", collegeType === "nit_silchar" && wantsKit ? "Yes" : "No");
      formBody.append("MotorOption", collegeType === "nit_silchar" && wantsKit ? motorOption : "N/A");
      formBody.append("WeightCategory", weightCategory === "lightweight" ? "Lightweight (8kg and below)" : "Heavyweight (15kg and below)");
      formBody.append("TotalAmount", registrationFee);
      formBody.append("PaymentProofLink", formData.paymentProofLink);
      formBody.append("TransactionNumber", formData.transactionNumber);

      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formBody.toString()
      });

      // With no-cors mode, we can't read the response, so we assume success if no error
      setModal({ open: true, message: "Registration submitted successfully! You will receive a confirmation email shortly.", success: true });
      setFormData({
        teamLeaderEmail: "",
        teamName: "",
        teamLeaderName: "",
        teamLeaderPhone: "",
        teamLeaderWhatsapp: "",
        teamLeaderScholarId: "",
        collegeName: "",
        teamMember2: "",
        teamMember3: "",
        teamMember4: "",
        teamMember5: "",
        teamMember6: "",
        paymentProofLink: "",
        transactionNumber: "",
      });
      setFileUrl("");
      setCollegeType(null);
      setWantsKit(null);
      setMotorOption("");
      setWeightCategory(null);
    } catch (err) {
      setModal({ open: true, message: "Error submitting registration.", success: false });
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-black via-black/40 to-black text-white overflow-hidden font-orbitron">
      <BackgroundGrid />

      {/* Modal for alerts - keeping original functionality */}
      {modal.open && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm px-2">
          <div className={`w-full max-w-md md:max-w-md sm:max-w-xs rounded-2xl shadow-2xl p-6 sm:p-4 border-2 ${modal.success ? 'border-red-400 bg-gradient-to-br from-red-900/90 to-red-700/80' : 'border-red-400 bg-gradient-to-br from-red-900/90 to-red-700/80'} animate-fade-in`}>
            <div className="flex flex-col items-center gap-4">
              <div className={`rounded-full p-3 ${modal.success ? 'bg-red-400/20' : 'bg-red-400/20'}`}>
                {modal.success ? (
                  <svg className="w-10 h-10 text-red-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                ) : (
                  <svg className="w-10 h-10 text-red-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                )}
              </div>
              <div className="text-center">
                <h3 className={`text-xl sm:text-lg font-bold mb-2 ${modal.success ? 'text-red-200' : 'text-red-200'}`}>{modal.success ? 'Registration Status' : 'Error'}</h3>
                <p className="text-base sm:text-sm text-white whitespace-pre-line break-words">{modal.message}</p>
              </div>
              <button
                onClick={() => setModal({ ...modal, open: false })}
                className={`mt-4 px-6 py-2 rounded-lg font-semibold shadow transition-all duration-200 w-full max-w-[200px] ${modal.success ? 'bg-red-400 text-red-900 hover:bg-red-300' : 'bg-red-400 text-red-900 hover:bg-red-300'}`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loader overlay - keeping original functionality */}
      <MultiStepLoader
        loadingStates={[
          { text: "Submitting  Team registration..." },
          { text: "Processing payment..." },
          { text: "Finalizing Team Details..." },
        ]}
        loading={submitting}
        duration={1200}
        loop={true}
      />


      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 1,
          }}
          className="space-y-12 pb-20"
        >
          <HeroSection />
          
          <BrochureSection />



          {/* Registration Form Component with new styling */}
          <motion.section
            className="py-12 flex flex-col justify-self-center w-fit px-4 md:px-8 bg-black/30 backdrop-blur-sm rounded-2xl border border-red-900/30"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.3,
            }}
          >
            {/* Registration Form Heading with SVG Backgrounds */}
            <div className="relative mb-8 flex items-center justify-center">
              {/* Left Frame */}
              <motion.div
                className="absolute left-2 top-[-0.3rem] md:left-28 md:top-[-0.89rem] w-10 md:w-20 h-10 md:h-20 bg-no-repeat bg-contain bg-center"
                style={{
                  backgroundImage: "url('/robotron/txt_frame_l.svg')",
                }}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />

              {/* Center Text with Background */}
              <motion.div
                className="relative px-8 py-6 md:px-12 md:py-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {/* Blue Background */}
                <div
                  className="absolute inset-0 bg-no-repeat bg-center bg-cover opacity-30"
                  style={{
                    backgroundImage: "url('/robotron/bg_text.svg')",
                  }}
                />

                {/* Text */}
                <h2 className="relative font-tron z-10 text-xl md:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-slate-200">
                  Registration Form
                </h2>
              </motion.div>

              {/* Right Frame */}
              <motion.div
                className="absolute right-2 bottom-[-0.5rem] md:right-28  md:bottom-[-0.9rem] w-10 md:w-20 h-10 md:h-20 bg-no-repeat bg-contain bg-center"
                style={{
                  backgroundImage: "url('/robotron/txt_frame_r.svg')",
                }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
            </div>
            <div>
              <h1 className="relative text-xl mb-8 flex items-center justify-center gap-2">
                Event : <span className="text-red-600">RoboWar</span>
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
              {/* Team Leader Information Section */}
              <div className="space-y-5">
                <div className="border-l-4 border-red-500 pl-4 mb-6">
                  <h3 className="text-xl font-bold text-red-300">Team Leader Information</h3>
                  <p className="text-red-100 text-sm mt-1">Primary contact details</p>
                </div>

                {/* Email */}
                <motion.div
                  className="form-group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-red-400 mb-2 font-medium text-base">
                    Email ID *
                  </label>
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.005 }}
                    whileFocus={{ scale: 1.005 }}
                  >
                    <input
                      type="email"
                      name="teamLeaderEmail"
                      value={formData.teamLeaderEmail}
                      onChange={handleInputChange}
                      className="w-full bg-black/70 border-2 border-red-700 focus:border-red-400 rounded-lg px-4 py-3.5 text-red-50 outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(239,68,68,0.5)] placeholder:text-red-300/50"
                      placeholder="team.leader@example.com"
                      required
                    />
                  </motion.div>
                </motion.div>

                {/* Team Name */}
                <motion.div
                  className="form-group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <label className="block text-red-400 mb-2 font-medium text-base">Team Name *</label>
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.005 }}
                  >
                    <input
                      type="text"
                      name="teamName"
                      value={formData.teamName}
                      onChange={handleInputChange}
                      className="w-full bg-black/70 border-2 border-red-700 focus:border-red-400 rounded-lg px-4 py-3.5 text-red-50 outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(239,68,68,0.5)] placeholder:text-red-300/50"
                      placeholder="Enter your team name"
                      required
                    />
                  </motion.div>
                </motion.div>

                {/* Leader Name */}
                <motion.div
                  className="form-group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-red-400 mb-2 font-medium text-base">
                    Full Name *
                  </label>
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.005 }}
                  >
                    <input
                      type="text"
                      name="teamLeaderName"
                      value={formData.teamLeaderName}
                      onChange={handleInputChange}
                      className="w-full bg-black/70 border-2 border-red-700 focus:border-red-400 rounded-lg px-4 py-3.5 text-red-50 outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(239,68,68,0.5)] placeholder:text-red-300/50"
                      placeholder="Enter your full name"
                      required
                    />
                  </motion.div>
                </motion.div>

                {/* Phone and WhatsApp in Grid */}
                <div className="grid md:grid-cols-2 gap-5">
                  {/* Leader Phone */}
                  <motion.div
                    className="form-group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <label className="block text-red-400 mb-2 font-medium text-base">
                      Phone Number *
                    </label>
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.005 }}
                    >
                      <input
                        type="tel"
                        name="teamLeaderPhone"
                        value={formData.teamLeaderPhone}
                        onChange={handleInputChange}
                        pattern="[0-9]{10,15}"
                        className="w-full bg-black/70 border-2 border-red-700 focus:border-red-400 rounded-lg px-4 py-3.5 text-red-50 outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(239,68,68,0.5)] placeholder:text-red-300/50"
                        placeholder="10-digit number"
                        required
                      />
                    </motion.div>
                  </motion.div>

                  {/* Leader WhatsApp */}
                  <motion.div
                    className="form-group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-red-400 mb-2 font-medium text-base">
                      WhatsApp Number *
                    </label>
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.005 }}
                    >
                      <input
                        type="tel"
                        name="teamLeaderWhatsapp"
                        value={formData.teamLeaderWhatsapp}
                        onChange={handleInputChange}
                        pattern="[0-9]{10,15}"
                        className="w-full bg-black/70 border-2 border-red-700 focus:border-red-400 rounded-lg px-4 py-3.5 text-red-50 outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(239,68,68,0.5)] placeholder:text-red-300/50"
                        placeholder="WhatsApp number"
                        required
                      />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Leader Scholar ID */}
                <motion.div
                  className="form-group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <label className="block text-red-400 mb-2 font-medium text-base">
                    Scholar ID *
                  </label>
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.005 }}
                  >
                    <input
                      type="text"
                      name="teamLeaderScholarId"
                      value={formData.teamLeaderScholarId}
                      onChange={handleInputChange}
                      className="w-full bg-black/70 border-2 border-red-700 focus:border-red-400 rounded-lg px-4 py-3.5 text-red-50 outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(239,68,68,0.5)] placeholder:text-red-300/50"
                      placeholder="Enter Scholar ID"
                      required
                    />
                  </motion.div>
                </motion.div>
              </div>

              {/* Team Members Section */}
              <div className="space-y-5 pt-8">
                <div className="border-l-4 border-red-500 pl-4 mb-6">
                  <h3 className="text-xl font-bold text-red-300">Team Members</h3>
                  <p className="text-red-100 text-sm mt-1">Add your team members (minimum 4 required)</p>
                </div>

                {/* Required Members */}
                {[2, 3, 4].map((num) => (
                  <motion.div
                    key={num}
                    className="form-group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + (num - 2) * 0.05 }}
                  >
                    <label className="block text-red-400 mb-2 font-medium text-base">
                      Team Member {num} Name *
                    </label>
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.005 }}
                    >
                      <input
                        type="text"
                        name={`teamMember${num}`}
                        value={formData[`teamMember${num}`]}
                        onChange={handleInputChange}
                        className="w-full bg-black/70 border-2 border-red-700 focus:border-red-400 rounded-lg px-4 py-3.5 text-red-50 outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(239,68,68,0.5)] placeholder:text-red-300/50"
                        placeholder={`Enter member ${num} name`}
                        required
                      />
                    </motion.div>
                  </motion.div>
                ))}

                {/* Optional Members */}
                {[5, 6].map((num) => (
                  <motion.div
                    key={num}
                    className="form-group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.55 + (num - 5) * 0.05 }}
                  >
                    <label className="block text-red-400 mb-2 font-medium text-base">
                      Team Member {num} Name <span className="text-red-300/70">(Optional)</span>
                    </label>
                    <motion.div
                      whileHover={{ scale: 1.005 }}
                    >
                      <input
                        type="text"
                        name={`teamMember${num}`}
                        value={formData[`teamMember${num}`]}
                        onChange={handleInputChange}
                        className="w-full bg-black/70 border-2 border-red-700 focus:border-red-400 rounded-lg px-4 py-3.5 text-red-50 outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(239,68,68,0.5)] placeholder:text-red-300/50"
                        placeholder={`Enter member ${num} name (optional)`}
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* College Type Selection Section */}
              <div className="space-y-5 pt-8">
                <div className="border-l-4 border-red-500 pl-4 mb-6">
                  <h3 className="text-xl font-bold text-red-300">College Type</h3>
                  <p className="text-red-100 text-sm mt-1">Select your college type to determine registration options</p>
                </div>

                {/* College Type Selection */}
                <motion.div
                  className="form-group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-red-300 mb-3 font-medium text-lg">
                    Are you from NIT Silchar? *
                  </label>
                  <div className="flex gap-4">
                    <motion.button
                      type="button"
                      onClick={() => {
                        setCollegeType("nit_silchar");
                        setWantsKit(null); // Reset kit selection when changing college type
                      }}
                      className={`flex-1 py-4 rounded-lg border-2 font-semibold transition-all duration-300 ${
                        collegeType === "nit_silchar"
                          ? 'bg-red-600 border-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]'
                          : 'bg-black/50 border-red-800 text-red-300 hover:border-red-600'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Yes, NIT Silchar
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={() => {
                        setCollegeType("other");
                        setWantsKit(false); // Other colleges cannot select kit
                      }}
                      className={`flex-1 py-4 rounded-lg border-2 font-semibold transition-all duration-300 ${
                        collegeType === "other"
                          ? 'bg-red-600 border-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]'
                          : 'bg-black/50 border-red-800 text-red-300 hover:border-red-600'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      No, Other College
                    </motion.button>
                  </div>
                  {collegeType === null && (
                    <p className="text-red-400/60 text-xs mt-2">
                      ⚠️ Please select your college type to continue
                    </p>
                  )}
                  {collegeType === "other" && (
                    <p className="text-red-300 text-sm mt-3 bg-red-950/30 border border-red-500/30 rounded-lg p-3">
                      ℹ️ Registration fee for other college students: ₹1,999 (Kit not available)
                    </p>
                  )}
                </motion.div>

                {/* College Name Input - Only for Other College Students */}
                {collegeType === "other" && (
                  <motion.div
                    className="form-group"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="block text-red-400 mb-2 font-medium text-base">
                      College Name *
                    </label>
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.005 }}
                    >
                      <input
                        type="text"
                        name="collegeName"
                        value={formData.collegeName}
                        onChange={handleInputChange}
                        className="w-full bg-black/70 border-2 border-red-700 focus:border-red-400 rounded-lg px-4 py-3.5 text-red-50 outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(239,68,68,0.5)] placeholder:text-red-300/50"
                        placeholder="Enter your college name"
                        required
                      />
                    </motion.div>
                  </motion.div>
                )}

                {/* Kit Selection - Only for NIT Silchar Students */}
                {collegeType === "nit_silchar" && (
                  <motion.div
                    className="form-group"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="block text-red-300 mb-3 font-medium text-lg">
                      Do you want to purchase a Robot Kit? *
                    </label>
                    <div className="flex gap-4">
                      <motion.button
                        type="button"
                        onClick={() => setWantsKit(true)}
                        className={`flex-1 py-4 rounded-lg border-2 font-semibold transition-all duration-300 ${
                          wantsKit === true
                            ? 'bg-red-600 border-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]'
                            : 'bg-black/50 border-red-800 text-red-300 hover:border-red-600'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Yes, I want a kit
                      </motion.button>
                      <motion.button
                        type="button"
                        onClick={() => setWantsKit(false)}
                        className={`flex-1 py-4 rounded-lg border-2 font-semibold transition-all duration-300 ${
                          wantsKit === false
                            ? 'bg-red-600 border-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]'
                            : 'bg-black/50 border-red-800 text-red-300 hover:border-red-600'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        No, registration only
                      </motion.button>
                    </div>
                    {wantsKit === null && (
                      <p className="text-red-400/60 text-xs mt-2">
                        ⚠️ Please select an option to continue
                      </p>
                    )}
                  </motion.div>
                )}

                {/* Motor Option Selection - Only for NIT Silchar Students with Kit */}
                {collegeType === "nit_silchar" && wantsKit === true && (
                  <motion.div
                    className="form-group space-y-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="block text-red-300 mb-3 font-medium text-lg">
                      Select Motor Option *
                    </label>
                    
                    <div className="space-y-3">
                      {/* High RPM Motor Option */}
                      <motion.button
                        type="button"
                        onClick={() => setMotorOption("rpm")}
                        className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                          motorOption === "rpm"
                            ? 'bg-red-600/20 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                            : 'bg-black/50 border-red-800 hover:border-red-600'
                        }`}
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                motorOption === "rpm" ? 'border-red-500 bg-red-500' : 'border-red-700'
                              }`}>
                                {motorOption === "rpm" && (
                                  <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                                )}
                              </div>
                              <h4 className="text-red-200 font-semibold">High RPM Motor</h4>
                            </div>
                            <p className="text-red-400/70 text-sm ml-7">Best for fast spinning weapons</p>
                          </div>
                          <div className="text-right">
                            <p className="text-red-300 font-bold text-lg">₹4,499</p>
                            <p className="text-red-400/60 text-xs">(Kit + Registration)</p>
                          </div>
                        </div>
                      </motion.button>

                      {/* High Torque Motor Option */}
                      <motion.button
                        type="button"
                        onClick={() => setMotorOption("torque")}
                        className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                          motorOption === "torque"
                            ? 'bg-red-600/20 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                            : 'bg-black/50 border-red-800 hover:border-red-600'
                        }`}
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                motorOption === "torque" ? 'border-red-500 bg-red-500' : 'border-red-700'
                              }`}>
                                {motorOption === "torque" && (
                                  <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                                )}
                              </div>
                              <h4 className="text-red-200 font-semibold">High Torque Motor</h4>
                            </div>
                            <p className="text-red-400/70 text-sm ml-7">Best for powerful crushing weapons</p>
                          </div>
                          <div className="text-right">
                            <p className="text-red-300 font-bold text-lg">₹4,999</p>
                            <p className="text-red-400/60 text-xs">(Kit + Registration)</p>
                          </div>
                        </div>
                      </motion.button>

                      {/* Both Motors Option */}
                      <motion.button
                        type="button"
                        onClick={() => setMotorOption("both")}
                        className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left relative overflow-hidden ${
                          motorOption === "both"
                            ? 'bg-red-600/20 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                            : 'bg-black/50 border-red-800 hover:border-red-600'
                        }`}
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                motorOption === "both" ? 'border-red-500 bg-red-500' : 'border-red-700'
                              }`}>
                                {motorOption === "both" && (
                                  <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                                )}
                              </div>
                              <h4 className="text-red-200 font-semibold">Both Motors (RPM + Torque)</h4>
                            </div>
                            <p className="text-red-400/70 text-sm ml-7">Maximum flexibility for any weapon design</p>
                          </div>
                          <div className="text-right">
                            <p className="text-red-300 font-bold text-lg">₹5,999</p>
                            <p className="text-red-400/60 text-xs">(Kit + Registration)</p>
                          </div>
                        </div>
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Weight Category Selection - For All Students */}
                <div className="space-y-5 pt-6">
                  <div className="border-l-4 border-red-500 pl-4 mb-6">
                    <h3 className="text-xl font-bold text-red-300">Robot Weight Category</h3>
                    <p className="text-red-100 text-sm mt-1">Select the weight category your robot will compete in</p>
                  </div>

                  <motion.div
                    className="form-group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <label className="block text-red-300 mb-3 font-medium text-lg">
                      Weight Category *
                    </label>
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Lightweight Category */}
                      <motion.button
                        type="button"
                        onClick={() => setWeightCategory("lightweight")}
                        className={`p-5 rounded-xl border-2 transition-all duration-300 ${
                          weightCategory === "lightweight"
                            ? 'bg-red-600/20 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                            : 'bg-black/50 border-red-800 hover:border-red-600'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                            weightCategory === "lightweight" ? 'border-red-500 bg-red-500' : 'border-red-700'
                          }`}>
                            {weightCategory === "lightweight" && (
                              <div className="w-3 h-3 bg-white rounded-full"></div>
                            )}
                          </div>
                          <div className="flex-1 text-left">
                            <h4 className="text-red-200 font-bold text-lg mb-1">Lightweight</h4>
                            <p className="text-red-300 font-semibold mb-2">8 kg and below</p>
                            <p className="text-red-400/70 text-sm">
                              Perfect for agile and fast robots with quick maneuverability
                            </p>
                          </div>
                        </div>
                      </motion.button>

                      {/* Heavyweight Category */}
                      <motion.button
                        type="button"
                        onClick={() => setWeightCategory("heavyweight")}
                        className={`p-5 rounded-xl border-2 transition-all duration-300 ${
                          weightCategory === "heavyweight"
                            ? 'bg-red-600/20 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                            : 'bg-black/50 border-red-800 hover:border-red-600'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                            weightCategory === "heavyweight" ? 'border-red-500 bg-red-500' : 'border-red-700'
                          }`}>
                            {weightCategory === "heavyweight" && (
                              <div className="w-3 h-3 bg-white rounded-full"></div>
                            )}
                          </div>
                          <div className="flex-1 text-left">
                            <h4 className="text-red-200 font-bold text-lg mb-1">Heavyweight</h4>
                            <p className="text-red-300 font-semibold mb-2">15 kg and below</p>
                            <p className="text-red-400/70 text-sm">
                              Built for power and durability with heavy-duty weapons and armor
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    </div>
                    {weightCategory === null && (
                      <p className="text-red-400/60 text-xs mt-2">
                        ⚠️ Please select a weight category to continue
                      </p>
                    )}
                  </motion.div>
                </div>

                {/* Price Summary */}
                {collegeType !== null && (
                  <motion.div
                    className="bg-gradient-to-br from-red-950/30 to-black/50 border-2 border-red-500/40 rounded-xl p-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-red-400/70 text-sm">Total Amount to Pay:</p>
                        <p className="text-red-100 text-xs mt-1">
                          {collegeType === "other" 
                            ? 'Registration Only (Other College)' 
                            : wantsKit 
                              ? `Kit (${motorOption === 'rpm' ? 'High RPM Motor' : motorOption === 'torque' ? 'High Torque Motor' : motorOption === 'both' ? 'Both Motors' : ''}) + Registration (NIT Silchar)` 
                              : 'Registration Only (NIT Silchar)'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-red-300 font-bold text-2xl">₹{registrationFee}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Show kit components only if NIT Silchar student selected kit */}
              {collegeType === "nit_silchar" && wantsKit === true && <KitComponentsSection motorOption={motorOption} />}
              <AttentionSection />
              {/* Payment Section */}
              <div className="space-y-6 pt-8">
                <div className="border-l-4 border-red-500 pl-4 mb-6">
                  <h3 className="text-xl font-bold text-red-300">Payment Information</h3>
                  <p className="text-red-100 text-sm mt-1">Complete the payment and upload proof</p>
                </div>

                {/* QR Codes Display */}
                <motion.div
                  className="bg-gradient-to-br from-red-950/30 to-black/50 border-2 border-red-500/40 rounded-2xl p-6 space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 }}
                >
                  <div className="text-center mb-4">
                    <h4 className="text-lg font-bold text-red-300 mb-2">Scan QR Code to Pay ₹{registrationFee}</h4>
                    <p className="text-red-400 text-sm">Choose any ONE payment option below</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Primary QR Code */}
                    <motion.div
                      className="bg-black/40 border-2 border-red-400 rounded-xl p-4 relative overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        PRIMARY
                      </div>
                      <div className="aspect-square bg-white rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                        <img
                          src="/tshirt/swarup_qr.png"
                          alt="Primary Payment QR Code - Swarup Chanda"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="text-center space-y-1">
                        <p className="text-red-300 font-semibold">Swarup Chanda</p>
                        <p className="text-red-400 text-sm font-mono">6003147277@ptsbi</p>
                      </div>
                    </motion.div>

                    {/* Alternative QR Code */}
                    <motion.div
                      className="bg-black/40 border-2 border-red-400/60 rounded-xl p-4 relative overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="absolute top-2 right-2 bg-red-400/80 text-white text-xs font-bold px-2 py-1 rounded">
                        ALTERNATIVE
                      </div>
                      <div className="aspect-square bg-white rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                        <img
                          src="/tshirt/qr_code.jpg"
                          alt="Alternative Payment QR Code - Md Fayjan"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="text-center space-y-1">
                        <p className="text-red-300 font-semibold">Md Fayjan</p>
                        <p className="text-red-400 text-sm font-mono">himdfayzan1735-2@oksbi</p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Payment Proof Upload - Enhanced */}
                <motion.div
                  className="form-group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <label className="block text-red-300 mb-3 font-medium text-lg">
                    Upload Payment Screenshot *
                  </label>
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.005 }}
                  >
                    <div className={`w-full bg-gradient-to-br from-black/60 to-red-950/20 border-2 ${fileUrl ? 'border-green-500' : 'border-red-800 border-dashed'} focus-within:border-red-500 rounded-xl p-6 text-white outline-none transition-all duration-300 focus-within:shadow-[0_0_20px_rgba(239,68,68,0.4)]`}>
                      <label className="flex flex-col items-center gap-4 cursor-pointer">
                        <div className={`p-4 rounded-full ${fileUrl ? 'bg-green-500/20' : 'bg-black/20'}`}>
                          <UploadIcon className={`h-10 w-10 ${fileUrl ? 'text-green-400' : 'text-red-400'}`} />
                        </div>
                        <div className="text-center">
                          {uploading ? (
                            <div className="space-y-2">
                              <div className="text-red-400 animate-pulse text-lg font-semibold">
                                Uploading...
                              </div>
                              <div className="w-48 h-2 bg-red-900/30 rounded-full overflow-hidden mx-auto">
                                <motion.div
                                  className="h-full bg-gradient-to-r from-red-600 to-red-400"
                                  initial={{ width: "0%" }}
                                  animate={{ width: "100%" }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                />
                              </div>
                            </div>
                          ) : fileUrl ? (
                            <div className="space-y-2">
                              <div className="flex items-center justify-center gap-2 text-green-400 text-lg font-semibold">
                                <CheckCircleIcon className="h-6 w-6" />
                                File Uploaded Successfully!
                              </div>
                              <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-red-300 text-sm underline hover:text-red-100 inline-block"
                                onClick={(e) => e.stopPropagation()}
                              >
                                View uploaded screenshot →
                              </a>
                              <div className="text-red-400/60 text-sm mt-2">
                                Click to upload a different file
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <div className="text-red-200 text-lg font-semibold">
                                Click to Upload Payment Screenshot
                              </div>
                              <div className="text-red-400/70 text-sm">
                                Supported: JPG, PNG, PDF • Max size: 5MB
                              </div>
                              <div className="text-red-300/50 text-xs mt-2">
                                Make sure transaction details are clearly visible
                              </div>
                            </div>
                          )}
                        </div>
                        <input
                          type="file"
                          accept="application/pdf,image/*"
                          onChange={uploader}
                          required={!fileUrl}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Transaction Number */}
                <motion.div
                  className="form-group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 }}
                >
                  <label className="block text-red-300 mb-2 font-medium text-base">
                    Transaction Number (UPI Reference) *
                  </label>
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.005 }}
                  >
                    <input
                      type="text"
                      name="transactionNumber"
                      value={formData.transactionNumber}
                      onChange={handleInputChange}
                      className="w-full bg-black/70 border-2 border-red-700 focus:border-red-400 rounded-lg px-4 py-3.5 text-red-50 outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(239,68,68,0.5)] placeholder:text-red-300/50 font-mono"
                      placeholder="Enter UPI transaction number"
                      required
                    />
                  </motion.div>
                  <p className="text-red-400/60 text-xs mt-2">
                    💡 Find this in your payment confirmation message
                  </p>
                </motion.div>
              </div>

              {/* Registration Summary Section */}
              <motion.div
                className="space-y-6 pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="border-l-4 border-red-500 pl-4 mb-6">
                  <h3 className="text-xl font-bold text-red-300">Registration Summary</h3>
                  <p className="text-red-100 text-sm mt-1">Review your details before submitting</p>
                </div>

                <div className="bg-gradient-to-br from-red-950/30 to-black/50 border-2 border-red-500/40 rounded-2xl p-6 space-y-4 font-orbitron">
                  {/* Team Information */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-bold text-red-300 border-b border-red-500/30 pb-2">Team Information</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-red-400/70">Team Name:</span>
                        <p className="text-red-100 font-medium">{formData.teamName || "Not provided"}</p>
                      </div>
                      <div>
                        <span className="text-red-400/70">Event:</span>
                        <p className="text-red-100 font-medium">RoboWar</p>
                      </div>
                    </div>
                  </div>

                  {/* Team Leader Details */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-bold text-red-300 border-b border-red-500/30 pb-2">Team Leader Details</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-red-400/70">Name:</span>
                        <p className="text-red-100 font-medium">{formData.teamLeaderName || "Not provided"}</p>
                      </div>
                      <div>
                        <span className="text-red-400/70">Email:</span>
                        <p className="text-red-100 font-medium break-all">{formData.teamLeaderEmail || "Not provided"}</p>
                      </div>
                      <div>
                        <span className="text-red-400/70">Phone:</span>
                        <p className="text-red-100 font-medium">{formData.teamLeaderPhone || "Not provided"}</p>
                      </div>
                      <div>
                        <span className="text-red-400/70">WhatsApp:</span>
                        <p className="text-red-100 font-medium">{formData.teamLeaderWhatsapp || "Not provided"}</p>
                      </div>
                      <div>
                        <span className="text-red-400/70">Scholar ID:</span>
                        <p className="text-red-100 font-medium">{formData.teamLeaderScholarId || "Not provided"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Team Members */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-bold text-red-300 border-b border-red-500/30 pb-2">Team Members</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      {[2, 3, 4, 5, 6].map((num) => {
                        const memberName = formData[`teamMember${num}`];
                        if (memberName) {
                          return (
                            <div key={num}>
                              <span className="text-red-400/70">Member {num}:</span>
                              <p className="text-red-100 font-medium">{memberName}</p>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-bold text-red-300 border-b border-red-500/30 pb-2">Payment Details</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-red-400/70">College Type:</span>
                        <p className="text-red-100 font-medium">
                          {collegeType === "nit_silchar" ? "NIT Silchar" : collegeType === "other" ? "Other College" : "Not selected"}
                        </p>
                      </div>
                      {collegeType === "other" && (
                        <div>
                          <span className="text-red-400/70">College Name:</span>
                          <p className="text-red-100 font-medium">{formData.collegeName || "Not provided"}</p>
                        </div>
                      )}
                      {collegeType === "nit_silchar" && (
                        <div>
                          <span className="text-red-400/70">Kit Purchase:</span>
                          <p className="text-red-100 font-medium">
                            {wantsKit === null ? "Not selected" : wantsKit ? "Yes" : "No"}
                          </p>
                        </div>
                      )}
                      {collegeType === "nit_silchar" && wantsKit && (
                        <div>
                          <span className="text-red-400/70">Motor Option:</span>
                          <p className="text-red-100 font-medium">
                            {motorOption === "rpm" ? "High RPM Motor" : 
                             motorOption === "torque" ? "High Torque Motor" : 
                             motorOption === "both" ? "Both Motors (RPM + Torque)" : 
                             "Not selected"}
                          </p>
                        </div>
                      )}
                      <div>
                        <span className="text-red-400/70">Weight Category:</span>
                        <p className="text-red-100 font-medium">
                          {weightCategory === "lightweight" ? "Lightweight (8kg and below)" : 
                           weightCategory === "heavyweight" ? "Heavyweight (15kg and below)" : 
                           "Not selected"}
                        </p>
                      </div>
                      <div>
                        <span className="text-red-400/70">Total Amount:</span>
                        <p className="text-red-100 font-medium text-lg">₹{registrationFee}</p>
                      </div>
                      <div>
                        <span className="text-red-400/70">Transaction Number:</span>
                        <p className="text-red-100 font-medium font-mono">{formData.transactionNumber || "Not provided"}</p>
                      </div>
                      <div className="md:col-span-2">
                        <span className="text-red-400/70">Payment Proof:</span>
                        <p className="text-red-100 font-medium">
                          {fileUrl ? (
                            <a
                              href={fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-400 underline hover:text-green-300 inline-flex items-center gap-1"
                            >
                              <CheckCircleIcon className="h-4 w-4" />
                              Uploaded successfully
                            </a>
                          ) : (
                            "Not uploaded"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Submit Button */}
              <div className="flex justify-center mt-4">
                <motion.button
                  type="submit"
                  className="relative w-full max-w-md h-20 bg-no-repeat bg-center bg-contain flex items-center justify-center group cursor-pointer"
                  style={{
                    backgroundImage: "url('/robotron/button.svg')",
                    backgroundSize: "70% 70%",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      filter: "blur(15px)",
                      background: "radial-gradient(circle, rgba(165,0,0,0.6) 0%, transparent 70%)",
                    }}
                  />
                  <span className="relative z-10 text-xs md:text-sm font-bold text-white drop-shadow-[0_0_10px_rgba(165,0,0,0.8)] group-hover:drop-shadow-[0_0_15px_rgba(165,0,0,1)] transition-all duration-300">
                    Register Team
                  </span>
                </motion.button>
              </div>
            </form>
          </motion.section>



          <PaymentDetailsSection />
        </motion.div>
      </div>
    </div>
  );
}

export default RobowarRegistration;
