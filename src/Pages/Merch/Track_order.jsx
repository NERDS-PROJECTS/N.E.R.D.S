import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Package as PackageIcon,
  RefreshCw as RefreshIcon,
  MessageCircle as MessageIcon,
  Mail as MailIcon,
  Clock as ClockIcon,
  AlertCircle as AlertIcon,
  Bell as BellIcon,
  CheckCircle as CheckCircleIcon,
  Truck as TruckIcon,
  Warehouse as WarehouseIcon,
  Home as HomeIcon,
  User as UserIcon,
  Phone as PhoneIcon,
  MapPin as LocationIcon,
  ShirtIcon,
  Zap as ZapIcon,
  Radio as RadioIcon,
  Cpu as CpuIcon,
} from 'lucide-react'

export function Track_order() {
  const [notifyEnabled, setNotifyEnabled] = useState(true)
  const [glowPulse, setGlowPulse] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowPulse(prev => (prev + 1) % 100)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  // Mock data that would normally come from an API
  const shipmentData = {
    id: '--',
    status: 'Ordered',
    eta: '10th November, 2025',
    packageCount: 1,
    weight:'--',
    route: [
      {
        city: '--',
        x: '15%', // left position percentage
        y: '70%', // top position percentage
        completed: true,
        current: false,
      },
      // {
      //   city: '--',
      //   x: '35%',
      //   y: '30%',
      //   completed: false,
      //   current: false,
      // },
      // {
      //   city: '--',
      //   x: '65%',
      //   y: '55%',
      //   completed: false,
      //   current: false,
      // },
      // {
      //   city: '--',
      //   x: '85%',
      //   y: '35%',
      //   completed: false,
      //   current: false, // This flag shows current location
      // },
    ],
    timeline: [
      {
        step: 'Ordered',
        date: '2nd Nov, 2025',
        completed: true,
        current:true,
        
      },
      {
        step: 'Printed',
        date: '--',
        
        completed: false,
      },
      {
        step: 'Shipped',
        date: '--',
        completed: false,
        
      },
      {
        step: 'In Transit',
        date: '--',
        completed: false,
        
      },
      {
        step: 'Delivered',
        date: '--',
        completed: false,
        
      },
    ],
    courier: {
      name: '--',
      trackingId: '--',
      bot: '---',
    },
    items: [
      {
        name: '--',
        qty: 0,
      },
    //   {
    //     name: 'Circuit Board Array',
    //     qty: 1,
    //   },
    //   {
    //     name: 'Hydraulic Arm Component',
    //     qty: 2,
    //   },
    //   {
    //     name: 'Sensor Module Pack',
    //     qty: 4,
    //   },
    ],
    dimensions: '---',
    Weight:"---",
    recipient: {
      name: 'Swarup Chanda',
      phone: '+91-60035-01567',
      address:
        'Hostel-9D, NIT Silchar, NIT Road, 788010, Cachar, Assam',
    },
    activity: [
      {
        time: '02-11-2025',
        event: 'Ordered up from supplier',
      },
      {
        time: '03-11-2025',
        event: 'Processing Order',
      },
      // {
      //   time: '02-10-2025',
      //   event: 'Shipment Shipped From Suplier',
      // },
      // {
      //   time: '04-10-2025',
      //   event: 'Shipment In Transit From Suplier',
      // },
      // {
      //   time: '12-10-2025',
      //   event: 'Delay due to poor weather conditions',
      // },
      // {
      //   time: '14-10-2025',
      //   event: 'Order Delivered Successfully',
      // },
    ],
  }
  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans relative overflow-hidden">
      {/* Animated Circuit Background */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, #00ff88 1px, transparent 1px),
            linear-gradient(0deg, #00ff88 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridScroll 20s linear infinite',
        }}></div>
      </div>

      {/* Animated Particles */}
      <div className="fixed inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main container */}
      <div className="min-h-screen relative z-10">
        <div className="container mx-auto px-4 py-6">
          {/* Header with Robotic Theme */}
          <motion.header 
            className="bg-gradient-to-r from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl p-6 mb-6 flex flex-wrap items-center justify-between border-2 border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.3)] relative overflow-hidden"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Animated glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent animate-pulse"></div>
            
            <div className="flex items-center relative z-10">
              <motion.div 
                className="h-14 w-14 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-600/30 flex items-center justify-center mr-4 border border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(34,211,238,0.4)',
                    '0 0 40px rgba(34,211,238,0.6)',
                    '0 0 20px rgba(34,211,238,0.4)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <PackageIcon className="h-8 w-8 text-cyan-400" />
              </motion.div>
              <div>
                <h1 className="text-3xl md:text-4xl font-orbitron font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text">
                  SHIPMENT TRACKER
                </h1>
                <p className="text-xs text-cyan-400/70 font-spaced mt-1 flex items-center">
                  <RadioIcon className="h-3 w-3 mr-1 animate-pulse" />
                  LIVE SHIPMENT MONITORING SYSTEM
                </p>
              </div>
            </div>
            
            <motion.div 
              className="mt-4 md:mt-0 relative z-10"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="px-4 py-2 bg-cyan-500/20 border-2 border-cyan-400/50 rounded-lg shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                <div className="flex items-center space-x-2">
                  <CpuIcon className="h-5 w-5 text-cyan-400 animate-spin" style={{ animationDuration: '3s' }} />
                  <span className="text-cyan-400 font-bold font-spaced">SYSTEM ONLINE</span>
                </div>
              </div>
            </motion.div>
          </motion.header>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {/* Shipment Summary Card - Robotic Theme */}
              <motion.div 
                className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-2xl p-6 mb-6 border-2 border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.2)] relative overflow-hidden"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-cyan-400/50"></div>
                <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-cyan-400/50"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-cyan-400/50"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-cyan-400/50"></div>

                <div className="flex flex-wrap justify-between items-start relative z-10">
                  <div>
                    <div className="text-cyan-400/80 font-spaced mb-1 flex items-center">
                      <ZapIcon className="h-4 w-4 mr-1" />
                      SHIPMENT ID
                    </div>
                    <div className="text-2xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
                      #{shipmentData.id}
                    </div>
                    <div className="flex flex-wrap gap-6 mt-2">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3"
                      >
                        <div className="text-cyan-400/80 font-spaced text-sm mb-1">ETA</div>
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 text-cyan-400 mr-2" />
                          <span className="font-bold">Expected by {shipmentData.eta}</span>
                        </div>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3"
                      >
                        <div className="text-cyan-400/80 font-spaced text-sm mb-1">
                          PACKAGE
                        </div>
                        <div className="flex items-center">
                          <PackageIcon className="h-4 w-4 text-cyan-400 mr-2" />
                          <span className="font-bold">{shipmentData.packageCount} crates</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <div className="text-cyan-400/80 font-spaced mb-2">STATUS</div>
                    <motion.div 
                      className="bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-400 px-6 py-2 rounded-lg inline-block font-bold border-2 border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.4)] font-orbitron"
                      animate={{ 
                        boxShadow: [
                          '0 0 20px rgba(34,211,238,0.4)',
                          '0 0 30px rgba(34,211,238,0.6)',
                          '0 0 20px rgba(34,211,238,0.4)',
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {shipmentData.status}
                    </motion.div>
                  </div>
                </div>
                {/* Status Timeline - Enhanced Robotic */}
                <div className="mt-8 relative z-10">
                  <div className="text-cyan-400 font-orbitron font-bold mb-4 flex items-center">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-500/50 mr-3"></div>
                    SHIPMENT PROGRESS
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-500/50 ml-3"></div>
                  </div>
                  <div className="relative">
                    {/* Timeline line - Glowing */}
                    <div className="absolute h-1 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-cyan-500/30 top-7 left-0 right-0 z-0 shadow-[0_0_10px_rgba(34,211,238,0.3)]"></div>
                    {/* Timeline steps */}
                    <div className="flex  justify-between relative z-10">
                      {shipmentData.timeline.map((step, index) => (
                        <motion.div
                          key={index}
                          className="flex flex-col  items-center w-1/5"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <motion.div
                            className={`w-8 h-8  md:w-14 md:h-14 rounded-full flex items-center justify-center mb-2 relative
                            ${step.current ? 'bg-gradient-to-br from-cyan-500/40 to-blue-500/40 border-2 border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.8)]' : step.completed ? 'bg-cyan-500/20 border-2 border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.3)]' : 'bg-gray-800 border-2 border-gray-600'}`}
                            animate={step.current ? {
                              scale: [1, 1.1, 1],
                              boxShadow: [
                                '0 0 25px rgba(34,211,238,0.8)',
                                '0 0 40px rgba(34,211,238,1)',
                                '0 0 25px rgba(34,211,238,0.8)',
                              ]
                            } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {index === 0 && (
                              <WarehouseIcon
                                className={`w-4 h-4  md:h-6 md:w-6 ${step.completed ? 'text-cyan-400' : 'text-gray-500'}`}
                              />
                            )}
                            {index === 1 && (
                              <PackageIcon
                                className={`w-4 h-4 md:h-6  md:w-6 ${step.completed ? 'text-cyan-400 ' : 'text-gray-500'}`}
                              />
                            )}
                            {index === 2 && (
                              <TruckIcon
                                className={`w-4 h-4 md:h-6 md:w-6 ${step.completed ? 'text-cyan-400' : 'text-gray-500'}`}
                              />
                            )}
                            {index === 3 && (
                              <TruckIcon
                                className={`w-4 h-4 md:h-6 md:w-6 ${step.completed ? 'text-cyan-400' : 'text-gray-500'}`}
                              />
                            )}
                            {index === 4 && (
                              <HomeIcon
                                className={`w-4 h-4 md:h-6 md:w-6 ${step.completed ? 'text-cyan-400' : 'text-gray-500'}`}
                              />
                            )}
                            {step.current && (
                              <motion.div
                                className="absolute inset-0 rounded-full border-2 border-cyan-400"
                                animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            )}
                          </motion.div>
                          <div
                            className={` text-xs md:text-sm  font-bold font-spaced mt-2 ${step.current ? 'text-cyan-400' : step.completed ? 'text-white' : 'text-gray-500'}`}
                          >
                            {step.step}
                          </div>
                          <div className={`text-xs mt-1 ${step.current ? 'text-cyan-400/70' : 'text-gray-500'}`}>
                            {step.date}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
              {/* Live Map/Route Panel - Robotic Enhanced */}
              <motion.div 
                className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-2xl p-6 mb-6 border-2 border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.2)] relative overflow-hidden"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Animated corner markers */}
                <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-cyan-400/70 animate-pulse"></div>
                <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-cyan-400/70 animate-pulse"></div>
                <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-cyan-400/70 animate-pulse"></div>
                <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-cyan-400/70 animate-pulse"></div>

                <div className="flex justify-between items-center mb-4 relative z-10">
                  <h2 className="text-xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center">
                    <RadioIcon className="h-5 w-5 mr-2 text-cyan-400 animate-pulse" />
                    LIVE ROUTE TRACKER
                  </h2>
                  <motion.button 
                    className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 p-3 rounded-lg transition border border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                    whileHover={{ scale: 1.1, rotate: 180 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <RefreshIcon className="h-5 w-5 text-cyan-400" />
                  </motion.button>
                </div>
                {/* Enhanced cyber-style map background */}
                <div className="h-64 md:h-80 relative rounded-xl overflow-hidden border-2 border-cyan-500/30 shadow-inner">
                  {/* Animated grid background */}
                  <div
                    className="absolute inset-0 bg-black"
                    style={{
                      backgroundImage: `
                        radial-gradient(circle, rgba(34, 211, 238, 0.2) 1px, transparent 1px),
                        linear-gradient(to right, rgba(34, 211, 238, 0.1) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: '30px 30px, 15px 15px, 15px 15px',
                      animation: 'gridPulse 3s ease-in-out infinite',
                    }}
                  ></div>
                  
                  {/* Scanning line effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent h-full"
                    animate={{ y: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  />
                  
                  {/* Route lines - Connect all points */}
                  <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                    <defs>
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgb(6, 182, 212)" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="rgb(59, 130, 246)" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="rgb(6, 182, 212)" stopOpacity="0.8" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    {shipmentData.route.map((location, index) => {
                      if (index === shipmentData.route.length - 1) return null;
                      const nextLocation = shipmentData.route[index + 1];
                      return (
                        <motion.line
                          key={index}
                          x1={location.x}
                          y1={location.y}
                          x2={nextLocation.x}
                          y2={nextLocation.y}
                          stroke="url(#lineGradient)"
                          strokeWidth="3"
                          strokeDasharray={location.completed ? "0" : "5,5"}
                          filter="url(#glow)"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ 
                            pathLength: 1,
                            opacity: [0.6, 1, 0.6],
                          }}
                          transition={{ 
                            pathLength: { duration: 1, delay: index * 0.3 },
                            opacity: { duration: 2, repeat: Infinity }
                          }}
                        />
                      );
                    })}
                  </svg>
                  
                  {/* Route pins - Enhanced with animations */}
                  {shipmentData.route.map((location, index) => (
                    <motion.div
                      key={index}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2"
                      style={{ left: location.x, top: location.y }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      {location.current ? (
                        // Current location - Enhanced with multiple rings
                        <motion.div 
                          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-cyan-500/40 to-blue-500/40 border-2 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,1)] flex items-center justify-center relative"
                          animate={{ 
                            scale: [1, 1.1, 1],
                            boxShadow: [
                              '0 0 30px rgba(34,211,238,1)',
                              '0 0 50px rgba(34,211,238,1)',
                              '0 0 30px rgba(34,211,238,1)',
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-cyan-500 shadow-[0_0_20px_rgba(34,211,238,1)]"></div>
                          {/* Pulsing rings */}
                          <motion.div
                            className="absolute inset-0 rounded-full border-2 border-cyan-400"
                            animate={{ scale: [1, 1.5, 2], opacity: [1, 0.5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <motion.div
                            className="absolute inset-0 rounded-full border-2 border-cyan-400"
                            animate={{ scale: [1, 1.5, 2], opacity: [1, 0.5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                          />
                        </motion.div>
                      ) : (
                        // Regular location pin - Enhanced
                        <motion.div 
                          className={`w-4 h-4 md:w-6 md:h-6 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)] border-2 ${
                            location.completed 
                              ? 'bg-cyan-500 border-cyan-400' 
                              : 'bg-gray-700 border-gray-600'
                          }`}
                          whileHover={{ scale: 1.3 }}
                        />
                      )}
                      <div 
                        className={`absolute left-1/2 transform -translate-x-1/2 text-xs md:text-sm whitespace-nowrap font-spaced font-bold ${
                          location.current 
                            ? 'top-12 md:top-14 text-cyan-400' 
                            : 'top-7 md:top-8 text-cyan-400/80'
                        }`}
                      >
                        {location.city}
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="text-xs font-spaced text-cyan-400/70 mt-3 text-right flex items-center justify-end">
                  <motion.div 
                    className="w-2 h-2 bg-cyan-400 rounded-full mr-2"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span>Real-time updates • Refreshes every 30 seconds</span>
                </div>
              </motion.div>
              {/* Activity Log Panel - Robotic Theme */}
              <motion.div 
                className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-2xl p-6 border-2 border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.2)] relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-cyan-400/50"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-cyan-400/50"></div>

                <h2 className="text-xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4 flex items-center relative z-10">
                  <CpuIcon className="h-5 w-5 mr-2 text-cyan-400" />
                  ACTIVITY LOG
                </h2>
                <div className="overflow-hidden relative z-10">
                  {shipmentData.activity.map((item, index) => (
                    <motion.div
                      key={index}
                      className={`py-4 flex items-start relative ${index !== shipmentData.activity.length - 1 ? 'border-b border-cyan-500/20' : ''}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5, backgroundColor: 'rgba(34, 211, 238, 0.05)' }}
                    >
                      {/* Timeline dot */}
                      <div className="mr-4 relative">
                        <div className="w-3 h-3 rounded-full bg-cyan-500 border-2 border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
                        {index !== shipmentData.activity.length - 1 && (
                          <div className="absolute left-1/2 top-3 w-0.5 h-full bg-gradient-to-b from-cyan-500/50 to-transparent transform -translate-x-1/2"></div>
                        )}
                      </div>
                      <div className="mr-4 min-w-[100px]">
                        <div className="text-cyan-400 font-bold font-spaced">
                          {item.time}
                        </div>
                        <div className="text-xs text-cyan-400/50">{item.date}</div>
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-200 font-medium">{item.event}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
            <div className="lg:col-span-1">
              {/* Courier Details Card - Robotic Theme */}
              <motion.div 
                className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-2xl p-6 mb-6 border-2 border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.2)] relative overflow-hidden"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Corner marker */}
                <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-cyan-400/50"></div>
                
                <h2 className="text-xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4 relative z-10">
                  COURIER DETAILS
                </h2>
                <div className="space-y-4 relative z-10">
                  <motion.div 
                    className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-cyan-400/80 text-sm mb-1 font-spaced">COURIER</div>
                    <div className="font-bold text-white">
                      {shipmentData.courier.name}
                    </div>
                  </motion.div>
                  <motion.div 
                    className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-cyan-400/80 text-sm mb-1 font-spaced">
                      TRACKING ID
                    </div>
                    <div className="font-bold text-white font-mono">
                      {shipmentData.courier.trackingId}
                    </div>
                  </motion.div>
                  <motion.div 
                    className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-cyan-400/80 text-sm mb-1 font-spaced">
                      ASSIGNED BOT
                    </div>
                    <div className="font-bold text-white flex items-center">
                      {shipmentData.courier.bot}
                      <motion.div 
                        className="ml-2 h-3 w-3 rounded-full bg-cyan-400"
                        animate={{ 
                          boxShadow: [
                            '0 0 5px rgba(34,211,238,0.5)',
                            '0 0 15px rgba(34,211,238,1)',
                            '0 0 5px rgba(34,211,238,0.5)',
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                  </motion.div>
                  <div className="pt-2 space-y-3">
                    <motion.button 
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-4 rounded-lg font-spaced font-bold flex items-center justify-center border-2 border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: '0 0 30px rgba(34,211,238,0.6)',
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MessageIcon className="h-5 w-5 mr-2" />
                      PING COURIER BOT
                    </motion.button>
                    <motion.a
                      href="mailto:nerds@nits.ac.in"
                      className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center justify-center transition-colors font-spaced"
                      whileHover={{ scale: 1.05 }}
                    >
                      <MailIcon className="h-4 w-4 mr-2" />
                      EMAIL SUPPORT
                    </motion.a>
                  </div>
                </div>
              </motion.div>
              {/* Shipment Details Card - Robotic Theme */}
              <motion.div 
                className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-2xl p-6 mb-6 border-2 border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.2)] relative overflow-hidden"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Corner marker */}
                <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-cyan-400/50"></div>

                <h2 className="text-xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4 relative z-10">
                  SHIPMENT DETAILS
                </h2>
                <div className="space-y-4 relative z-10">
                  <div>
                    <div className="text-cyan-400/80 font-spaced text-sm mb-3">ITEMS</div>
                    <div className="space-y-2">
                      {shipmentData.items.map((item, index) => (
                        <motion.div 
                          key={index} 
                          className="flex items-center bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3"
                          whileHover={{ scale: 1.02, backgroundColor: 'rgba(34, 211, 238, 0.15)' }}
                        >
                          <PackageIcon className="h-6 w-6 text-cyan-400 mr-3 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="text-sm font-bold text-white">{item.name}</div>
                          </div>
                          <div className="text-sm font-bold text-cyan-400">
                            ×{item.qty}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div 
                      className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-cyan-400/80 font-spaced text-sm mb-1">WEIGHT</div>
                      <div className="font-bold text-white">{shipmentData.weight}</div>
                    </motion.div>
                    <motion.div 
                      className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-cyan-400/80 font-spaced text-sm mb-1">
                        DIMENSIONS
                      </div>
                      <div className="font-bold text-white">
                        {shipmentData.dimensions}
                      </div>
                    </motion.div>
                  </div>
                  <motion.div 
                    className="bg-green-500/10 border border-green-500/30 rounded-lg p-3"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-green-400/80 font-spaced text-sm mb-1">PAYMENT</div>
                    <div className="font-bold text-green-400 flex items-center">
                      <CheckCircleIcon className="h-5 w-5 mr-2" />
                      Pre-approved
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              {/* Shipping Address Card - Robotic Theme */}
              <motion.div 
                className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-2xl p-6 border-2 border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.2)] relative overflow-hidden"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {/* Corner markers */}
                <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-cyan-400/50"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-cyan-400/50"></div>

                <h2 className="text-xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4 relative z-10">
                  SHIPPING ADDRESS
                </h2>
                <div className="space-y-3 relative z-10">
                  <motion.div 
                    className="flex items-start bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3"
                    whileHover={{ scale: 1.02 }}
                  >
                    <UserIcon className="h-5 w-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-white">
                        {shipmentData.recipient.name}
                      </div>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-start bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3"
                    whileHover={{ scale: 1.02 }}
                  >
                    <PhoneIcon className="h-5 w-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-white font-mono">
                        {shipmentData.recipient.phone}
                      </div>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-start bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3"
                    whileHover={{ scale: 1.02 }}
                  >
                    <LocationIcon className="h-5 w-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-white">
                        {shipmentData.recipient.address}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
          {/* Footer - Robotic Theme */}
          <motion.footer 
            className="bg-gradient-to-r from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl p-6 mt-6 border-2 border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.2)] flex flex-wrap justify-between items-center relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* Animated glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent animate-pulse"></div>

            <div className="flex space-x-6 relative z-10">
              <motion.a
                href="/contact"
                className="text-cyan-400 font-spaced hover:text-cyan-300 transition-colors font-bold"
                whileHover={{ scale: 1.1 }}
              >
                FAQ
              </motion.a>
              <motion.a
                href="/contact"
                className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center font-spaced font-bold"
                whileHover={{ scale: 1.1 }}
              >
                <AlertIcon className="h-5 w-5 mr-2" />
                Report Issue
              </motion.a>
            </div>
            <div className="flex items-center mt-4 sm:mt-0 relative z-10">
              <span className="text-cyan-400 mr-3 font-spaced text-sm font-bold">NOTIFY ME</span>
              <motion.button
                className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none border-2 ${notifyEnabled ? 'bg-cyan-500 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'bg-gray-700 border-gray-600'}`}
                onClick={() => setNotifyEnabled(!notifyEnabled)}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg`}
                  animate={{ x: notifyEnabled ? 32 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </motion.button>
              <motion.div
                animate={{ 
                  scale: notifyEnabled ? [1, 1.2, 1] : 1,
                  opacity: notifyEnabled ? [1, 0.5, 1] : 0.5,
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <BellIcon
                  className={`h-5 w-5 ml-3 ${notifyEnabled ? 'text-cyan-400' : 'text-gray-500'}`}
                />
              </motion.div>
            </div>
          </motion.footer>
        </div>
      </div>
    </div>
  )
}

export default Track_order;