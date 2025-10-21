import { useState } from "react";
import { motion } from "framer-motion";
import {
	AlertTriangleIcon,
	CheckCircleIcon,
	QrCodeIcon,
	UploadIcon,
	FileTextIcon,
	DownloadIcon,
	EyeIcon,
	DollarSignIcon,
} from "lucide-react";
import { MultiStepLoader } from "../../components/Merch_components/multi-step-loader";
import ProgressBar from "react-scroll-progress-bar";

// Background Grid Component
const BackgroundGrid = () => {
	// Detect mobile for performance optimization
	const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

	return (
		<div className="fixed inset-0 z-0">
			{/* Horizontal lines */}
			{Array.from({
				length: 20,
			}).map((_, i) => (
				<motion.div
					key={`h-${i}`}
					className="absolute left-0 right-0 h-[1px] bg-green-500/20"
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
					transition={
						isMobile
							? {
									duration: 0.5,
									delay: 0,
							  }
							: {
									duration: 1.5,
									delay: i * 0.05,
									ease: "easeInOut",
							  }
					}
				/>
			))}
			{/* Vertical lines */}
			{Array.from({
				length: 20,
			}).map((_, i) => (
				<motion.div
					key={`v-${i}`}
					className="absolute top-0 bottom-0 w-[1px] bg-green-500/20"
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
					transition={
						isMobile
							? {
									duration: 0.5,
									delay: 0,
							  }
							: {
									duration: 1.5,
									delay: i * 0.05,
									ease: "easeInOut",
							  }
					}
				/>
			))}
			{/* Glowing orbs - disabled on mobile for performance */}
			{!isMobile &&
				Array.from({
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
							repeatType: "reverse",
						}}
					/>
				))}
		</div>
	);
};

// Hero Section Component
const HeroSection = () => {
	// Detect if device is mobile for performance optimization
	const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

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
						className="absolute w-full h-1 bg-green-500 top-1/2 left-0 blur-sm"
						animate={{
							x: ["0%", "100%"],
							opacity: [0.2, 0.8, 0.2],
						}}
						transition={{
							duration: 8,
							repeat: Infinity,
							ease: "linear",
						}}
					/>
				)}
				{/* Circuit lines - disabled on mobile */}
				{!isMobile &&
					Array.from({
						length: 5,
					}).map((_, i) => (
						<motion.div
							key={i}
							className="absolute h-1 bg-green-500/30"
							style={{
								width: Math.random() * 100 + 100,
								transform: `rotate(${Math.random() * 360}deg)`,
								left: `${Math.random() * 100}%`,
								top: `${Math.random() * 100}%`,
							}}
							animate={{
								boxShadow: [
									"0 0 5px #00ff00",
									"0 0 20px #00ff00",
									"0 0 5px #00ff00",
								],
								opacity: [0.3, 0.7, 0.3],
							}}
							transition={{
								duration: Math.random() * 3 + 2,
								repeat: Infinity,
								repeatType: "reverse",
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
							className="text-4xl font-spaced md:text-5xl lg:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-600"
							style={{
								// Static glow on mobile, animated on desktop
								textShadow: isMobile ? "0 0 10px #00ff00" : undefined,
							}}
							animate={
								isMobile
									? {}
									: {
											textShadow: [
												"0 0 7px #00ff00",
												"0 0 10px #00ff00",
												"0 0 7px #00ff00",
											],
									  }
							}
							transition={{
								duration: 2,
								repeat: Infinity,
								repeatType: "reverse",
							}}
						>
							ROBODRIFT
						</motion.h1>
						<motion.h2
							className="text-2xl font-spaced md:text-3xl font-bold mb-4 text-green-200"
							style={{
								// Static glow on mobile, animated on desktop
								textShadow: isMobile ? "0 0 5px #00ff00" : undefined,
							}}
							animate={
								isMobile
									? {}
									: {
											textShadow: [
												"0 0 3px #00ff00",
												"0 0 7px #00ff00",
												"0 0 3px #00ff00",
											],
									  }
							}
							transition={{
								duration: 2,
								delay: 0.5,
								repeat: Infinity,
								repeatType: "reverse",
							}}
						>
							Robotron Registration 2025
						</motion.h2>
						<motion.p
							className="text-base md:text-lg font-spaced text-green-200 mb-4"
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
							A high-octane race of wireless bots, engineered for speed,
							agility, and precision. Witness cutting-edge robots drift, dodge,
							and dominate the neon circuit pushing physics to its limits. Each
							bot is tuned to perfection, controlled wirelessly by pilots with
							lightning-fast reflexes. Feel the pulse. Hear the hum. Conquer the
							drift.
						</motion.p>
						{/* Prize Pool Announcement */}
						<motion.div
							className="flex justify-center md:justify-start mb-4"
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 1, duration: 0.7 }}
						>
							<span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-400 via-green-500 to-green-700 text-black font-bold text-lg md:text-xl shadow-lg border-2 border-green-500/40">
								<DollarSignIcon className="h-6 w-6 md:h-7 md:w-7 text-black" />
								Total Prize Pool:{" "}
								<span className="text-white font-extrabold  ml-2">₹20,000</span>
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
						transition={
							isMobile
								? {
										duration: 0.3,
								  }
								: {
										delay: 0.3,
										duration: 0.8,
								  }
						}
					>
						<motion.div
							className="relative"
							whileHover={
								isMobile
									? {}
									: {
											scale: 1.05,
									  }
							}
							transition={{
								type: "spring",
								stiffness: 300,
								damping: 20,
							}}
						>
							{/* Glowing effect behind image - static on mobile */}
							<motion.div
								className="absolute inset-0 bg-green-500/30 blur-3xl rounded-full"
								animate={
									isMobile
										? {}
										: {
												opacity: [0.3, 0.6, 0.3],
												scale: [0.9, 1.1, 0.9],
										  }
								}
								transition={{
									duration: 3,
									repeat: Infinity,
									repeatType: "reverse",
								}}
								style={isMobile ? { opacity: 0.4 } : {}}
							/>

							<img
								src="/robotron/car.png"
								alt="Battle Robot"
								className="relative left-0 md:left-20 z-10 w-full max-w-none h-auto object-contain drop-shadow-[0_0_25px_rgba(0,255,0,0.6)]"
							/>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</motion.section>
	);
};

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
			<div className="bg-green-950/30 flex flex-col justify-self-center w-fit  backdrop-blur-md border border-green-500/30 rounded-xl p-6 relative overflow-hidden">
				{/* Glassmorphism effect */}
				<div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-900/10" />
				{/* Animated glow */}
				<motion.div
					className="absolute inset-0 bg-black/50 rounded-xl"
					animate={{
						boxShadow: [
							"inset 0 0 30px rgba(0,255,0,0.3)",
							"inset 0 0 60px rgba(0,255,0,0.2)",
							"inset 0 0 30px rgba(0,255,0,0.3)",
						],
					}}
					transition={{
						duration: 3,
						repeat: Infinity,
					}}
				/>
				<div className="relative z-10 flex items-start gap-4">
					<div className="mt-1 shrink-0">
						<AlertTriangleIcon className="h-6 w-6 text-green-500" />
					</div>
					<div>
						<h3 className="text-xl font-bold text-green-400 mb-2">ATTENTION</h3>
						<p className="text-red-100 font-mono">
							⚠️<strong>Registration & Kit Information</strong>
							<br />
							<br />
							🕒 <strong>Event Dates:</strong>
							<br />
							Event Dates: <strong>21st to 23rd November 2025</strong>.
							<br />
							Venue: <strong>NIT Silchar, Assam</strong>
							<br />
							<br />
							🕒 <strong>Registration Deadline:</strong>
							<br />
							All NIT Silchar participants with Kit Requirements must register
							before <strong>1st November 2025, 12:00 PM</strong>.<br />
							<br />
							Final Closing date of Registration (without Kits) for all
							particiapnts is <strong> 15th November, 2025, 12:00 PM </strong>
							<br />
							Ensure your details are submitted on time to confirm your slot for{" "}
							<strong>Robotron 2025</strong>.
							<br />
							<br />
							🤖 <strong>Kit Registration Policy:</strong>
							<br />
							NIT Silchar students are eligible to register for{" "}
							<strong>Robotron Kits</strong> provided by the club.
							<br />
							<br />
							Participants from other colleges are<strong>
								{" "}
								not allowed{" "}
							</strong>{" "}
							to participate in the Robo Drift Module, only NIT Silchar students
							can participate.
							<br />
							<br />
							📦 <strong>Kit Order Tracking:</strong>
							<br />
							For tracking your kit order or delivery status, visit the tracking
							portal using the link below:
							<br />
							<br />
							👉 Track Your Kit Order Visit:{""}
							<motion.a
								href="/trackOrder"
								className="text-green-400 left-[5.5px] font-medium relative inline-block"
								whileHover={{
									scale: 1.05,
								}}
								transition={{
									type: "spring",
									stiffness: 400,
									damping: 10,
								}}
							>
								Track Your Robot Kits
								<motion.span
									className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black"
									whileHover={{
										width: "100%",
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
							<br />
							<br />
							💬 <strong>Join Official WhatsApp Group:</strong>
							<br />
							Stay updated with important announcements, rule clarifications,
							and connect with fellow participants!
							<br />
							<br />
							👉{""}
							<motion.a
								href="https://chat.whatsapp.com/GWckiomcTmNHnZjmkkxe4c"
								target="_blank"
								rel="noopener noreferrer"
								className="text-green-400 left-[7px] font-medium relative inline-block"
								whileHover={{
									scale: 1.05,
								}}
								transition={{
									type: "spring",
									stiffness: 400,
									damping: 10,
								}}
							>
								Join RoboDrift WhatsApp Group
								<motion.span
									className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black"
									whileHover={{
										width: "100%",
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
	);
};

const BrochureSection = () => {
	const brochureUrl =
		"https://drive.google.com/file/d/116Lsf5NJi8htGh2NqHqm-DTnIPAEa2eL/";
	const downloadUrl =
		"https://drive.google.com/file/d/116Lsf5NJi8htGh2NqHqm-DTnIPAEa2eL/";

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
			<div className="bg-gradient-to-br from-green-950/40 to-black/60 backdrop-blur-md border-2 border-green-500/40 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-[0_0_20px_rgba(17,245,0,0.2)] w-full max-w-2xl">
				{/* Animated background gradient */}
				<div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-900/10" />

				{/* Glow effect */}
				<motion.div
					className="absolute inset-0 bg-black/30 rounded-2xl"
					animate={{
						boxShadow: [
							"inset 0 0 10px rgba(17,245,0,0.2)",
							"inset 0 0 30px rgba(17,245,0,0.3)",
							"inset 0 0 10px rgba(17,245,0,0.2)",
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
						<div className="p-3 bg-green-600/10 rounded-xl border border-green-500/30 shrink-0">
							<FileTextIcon className="h-7 w-7 md:h-8 md:w-8 text-green-400" />
						</div>
						<div className="flex-1">
							<h3 className="text-2xl md:text-3xl font-bold text-green-300 mb-2 font-orbitron">
								EVENT RULES & REGULATIONS
							</h3>
							<p className="text-green-100 font-mono text-sm md:text-base">
								Download the official RoboDrift brochure to learn about
								competition rules, robot specifications, arena details, and
								scoring system.
							</p>
						</div>
					</div>

					{/* Features List */}
					<div className="grid md:grid-cols-2 gap-3 mb-6">
						<div className="flex items-center gap-2 text-green-200 text-sm">
							<CheckCircleIcon className="h-4 w-4 text-green-500 shrink-0" />
							<span>Complete rule book</span>
						</div>
						<div className="flex items-center gap-2 text-green-200 text-sm">
							<CheckCircleIcon className="h-4 w-4 text-green-500 shrink-0" />
							<span>Robot specifications</span>
						</div>
						<div className="flex items-center gap-2 text-green-200 text-sm">
							<CheckCircleIcon className="h-4 w-4 text-green-500 shrink-0" />
							<span>Arena dimensions</span>
						</div>
						<div className="flex items-center gap-2 text-green-200 text-sm">
							<CheckCircleIcon className="h-4 w-4 text-green-500 shrink-0" />
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
							className="flex-1 bg-gradient-to-r from-green-950 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-[0_0_20px_rgba(17,245,0,0.5)] border border-green-500/30"
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							<EyeIcon className="h-5 w-5" />
							<span className="font-spaced">VIEW BROCHURE</span>
						</motion.a>

						{/* Download Button */}
						<motion.a
							href={downloadUrl}
							className="flex-1 bg-gradient-to-r from-green-900/80 to-green-950/80 hover:from-green-800/90 hover:to-green-900/90 text-green-100 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-[0_0_20px_rgba(17,245,0,0.3)] border-2 border-green-600/50 hover:border-green-500"
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							<DownloadIcon className="h-5 w-5" />
							<span className="font-spaced">DOWNLOAD PDF</span>
						</motion.a>
					</div>

					{/* Additional Info */}
					<div className="mt-4 pt-4 border-t border-green-500/20">
						<p className="text-green-300/70 text-xs md:text-sm font-mono text-center mb-4">
							📋 Make sure to read all rules carefully before registering for
							the competition
						</p>

						{/* Module Head Contact Details */}
						<div className="mt-6 pt-4 border-t border-green-500/30">
							<h4 className="text-lg font-bold text-green-300 mb-3 text-center font-spaced">
								FOR ANY QUERIES, CONTACT:
							</h4>
							<div className="grid md:grid-cols-3 gap-4">
								{/* Module Head 1 */}
								<div className="bg-green-950/30 border border-green-600/30 rounded-lg p-4 hover:bg-green-950/50 transition-all">
									<p className="text-green-200 font-semibold text-sm md:text-base mb-1">
										Nishit Baishya
									</p>
									<p className="text-green-300/80 text-xs md:text-sm">
										Module Head - RoboDrift
									</p>
									<div className="mt-2 space-y-1">
										<a
											href="tel:+919678632377"
											className="text-green-400 font-mono hover:text-green-300 text-md flex items-center gap-2 transition-colors"
										>
											<span>📞</span>
											<span>96786-32377</span>
										</a>
										<a
											href="mailto:nishit_ug_23@ece.nits.ac.in"
											className="text-green-400 font-mono hover:text-green-300 text-md flex items-start gap-2 transition-colors break-all"
										>
											<span className="flex-shrink-0">✉️</span>
											<span>nishit_ug_23@ece.nits.ac.in</span>
										</a>
									</div>
								</div>

								{/* Module Head 2 */}
								<div className="bg-green-950/30 border border-green-600/30 rounded-lg p-4 hover:bg-green-950/50 transition-all">
									<p className="text-green-200 font-semibold text-sm md:text-base mb-1">
										Abhishek Kumar
									</p>
									<p className="text-green-300/80 text-xs md:text-sm">
										Module Head - RoboDrift
									</p>
									<div className="mt-2 space-y-1">
										<a
											href="tel:+916200894865"
											className="text-green-400 font-mono hover:text-green-300 text-md flex items-center gap-2 transition-colors"
										>
											<span>📞</span>
											<span>62008-94865</span>
										</a>
										<a
											href="mailto:abhishekkr_ug_23@ee.nits.ac.in"
											className="text-green-400 font-mono hover:text-green-300 text-md flex items-start gap-2 transition-colors break-all"
										>
											<span>✉️</span>
											<span>abhishekkr_ug_23@ee.nits.ac.in</span>
										</a>
									</div>
								</div>

								{/* Module Head 3 */}
								<div className="bg-green-950/30 border border-green-600/30 rounded-lg p-4 hover:bg-green-950/50 transition-all">
									<p className="text-green-200 font-semibold text-sm md:text-base mb-1">
										Sunidhi Chetri
									</p>
									<p className="text-green-300/80 text-xs md:text-sm">
										Module Head - RoboDrift
									</p>
									<div className="mt-2 space-y-1">
										<a
											href="tel:+919101172955"
											className="text-green-400 font-mono hover:text-green-300 text-md flex items-center gap-2 transition-colors"
										>
											<span>📞</span>
											<span>91011-72955</span>
										</a>
										<a
											href="mailto:sunidhi_ug_23@ei.nits.ac.in"
											className="text-green-400 font-mono hover:text-green-300 text-md flex items-start gap-2 transition-colors break-all"
										>
											<span>✉️</span>
											<span>sunidhi_ug_23@ei.nits.ac.in</span>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</motion.section>
	);
};

// Kit Components Section Component
const KitComponentsSection = () => {
	// Base kit items (all included items)
	const baseKitItems = [
		"ESP 32 NodeMCU (1 piece)",
		"Motor Driver L298N (1 piece)",
		"High RPM DC Motors (4 piece)",
		"Traction Wheels (4 piece)",
		"Joystick Module",
		"Lithium Ion Battery (Car)",
		"Battery Holder (Car)",
		"Battery Charging Module",
		"Motor Mounter L Clamp",
		"BreadBoard",
		"Chassis Frame",
		"Jumper Wires Set",
		"USB to Micro-USB Cable for NodeMCU",
		"Soldering Kit",
	];

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
	};

	const itemVariants = {
		hidden: {
			opacity: 0,
			y: 20,
		},
		show: {
			opacity: 1,
			y: 0,
		},
	};

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
				className="text-3xl font-bold mb-6 text-green-600 text-center"
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
			</motion.h2>

			<div className="bg-black/30 flex flex-col justify-self-center w-fit backdrop-blur-sm rounded-2xl font-mono border border-green-900/30 p-8">
				{/* Base Kit Items */}
				<div className="mb-6">
					<h3 className="text-xl font-bold text-green-400 mb-4 border-b border-green-500/30 pb-2">
						Kit Components
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
								<CheckCircleIcon className="h-5 w-5 text-green-500 shrink-0" />
								<span className="text-green-100">{item}</span>
								{/* Animated line underneath each item */}
								<motion.div
									className="absolute left-0 right-0 h-[1px] bg-green-800/30 -bottom-1.5"
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
			</div>
		</motion.section>
	);
};

KitComponentsSection.propTypes = {};

// Payment Details Section Component
const PaymentDetailsSection = () => {
	const paymentOptions = [
		{
			bankName: "SBI",
			accountHolder: "Swarup Chanda",
			ifsc: "SBIN0017401",
			accountNo: "40293794000",
			upi: "6003147277@ptsbi",
		},
		{
			bankName: "SBI",
			accountHolder: "Md Fayjan",
			ifsc: "SBIN0016928",
			accountNo: "41946546051",
			upi: "himdfayzan1735-2@oksbi",
		},
	];

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
				className="text-3xl font-bold mb-8 text-green-600 text-center"
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
									"inset 0 0 10px rgba(0,255,0,0.2)",
									"inset 0 0 30px rgba(0,255,0,0.3)",
									"inset 0 0 20px rgba(0,255,0,0.3)",
								],
							}}
							transition={{
								duration: 2,
								repeat: Infinity,
							}}
						/>
						<div className="flex justify-between items-start mb-4">
							<h3 className="text-xl font-bold text-green-600">
								Option {index + 1}
							</h3>
							<div className="bg-green-900/30 p-2 rounded-lg">
								<QrCodeIcon className="h-6 w-6 text-green-500" />
							</div>
						</div>
						<div className="space-y-2 font-mono text-green-100">
							<p>
								<span className="text-green-400 font-medium">Bank Name:</span>{" "}
								{option.bankName}
							</p>
							<p>
								<span className="text-green-400 font-medium">
									Account Holder:
								</span>{" "}
								{option.accountHolder}
							</p>
							<p>
								<span className="text-green-400 font-medium">IFSC Code:</span>{" "}
								{option.ifsc}
							</p>
							<p>
								<span className="text-green-400 font-medium">Account No:</span>{" "}
								{option.accountNo}
							</p>
							<p>
								<span className="text-green-400 font-medium">UPI ID:</span>{" "}
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
								background:
									"linear-gradient(90deg, transparent, rgba(0,255,0,0.3), transparent)",
								backgroundSize: "200% 100%",
								opacity: 0,
							}}
							animate={{
								backgroundPosition: ["0% 0%", "100% 0%"],
							}}
							transition={{
								opacity: { duration: 0.3 },
								backgroundPosition: {
									duration: 2,
									repeat: Infinity,
									repeatType: "mirror",
								},
							}}
						/>
					</motion.div>
				))}
			</div>
		</motion.section>
	);
};

PaymentDetailsSection.propTypes = {};

function RoboDrift() {
	const [formData, setFormData] = useState({
		teamLeaderEmail: "",
		teamName: "",
		teamLeaderName: "",
		teamLeaderPhone: "",
		teamLeaderWhatsapp: "",
		teamMember2: "",
		teamMember3: "",
		teamMember4: "",
		paymentProofLink: "",
		transactionNumber: "",
	});

	// Kit selection state (NIT Silchar only)
	const [wantsKit, setWantsKit] = useState(null); // null, true, or false

	// Registration fees (NIT Silchar only)
	const nitSilcharRegistrationFee = 799;
	const kitPrice = 2799;

	// Calculate total fee based on kit selection
	const calculateTotalFee = () => {
		if (wantsKit === null) return 0;
		return wantsKit === true ? kitPrice : nitSilcharRegistrationFee;
	};

	const registrationFee = calculateTotalFee();

	const [fileUrl, setFileUrl] = useState("");
	const [uploading, setUploading] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [modal, setModal] = useState({
		open: false,
		message: "",
		success: false,
	});

	// Change this to your actual deployed Apps Script Web App URL
	const SCRIPT_URL =
		"https://script.google.com/macros/s/AKfycbzes_xKa1W6ccI6Ej4wHFU1JGJtJ6kiutTBoayZVSvvqqnDT_8RvxyMhI5lfdbxFRVI/exec";

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
			setModal({
				open: true,
				message: "Please enter team leader's email address.",
				success: false,
			});
			return;
		}
		if (!formData.teamName.trim()) {
			setModal({
				open: true,
				message: "Please enter your team name.",
				success: false,
			});
			return;
		}
		if (!formData.teamLeaderName.trim()) {
			setModal({
				open: true,
				message: "Please enter team leader's name.",
				success: false,
			});
			return;
		}
		if (!formData.teamLeaderPhone.trim()) {
			setModal({
				open: true,
				message: "Please enter team leader's phone number.",
				success: false,
			});
			return;
		}
		if (!formData.teamLeaderWhatsapp.trim()) {
			setModal({
				open: true,
				message: "Please enter team leader's WhatsApp number.",
				success: false,
			});
			return;
		}
		if (!formData.teamMember2.trim()) {
			setModal({
				open: true,
				message: "Please enter Team Member 2 name.",
				success: false,
			});
			return;
		}
		if (!formData.teamMember3.trim()) {
			setModal({
				open: true,
				message: "Please enter Team Member 3 name.",
				success: false,
			});
			return;
		}
		// Validate kit selection
		if (wantsKit === null) {
			setModal({
				open: true,
				message: "Please select whether you want to purchase a kit or not.",
				success: false,
			});
			return;
		}
		if (!formData.paymentProofLink) {
			setModal({
				open: true,
				message: "Please upload payment proof before submitting.",
				success: false,
			});
			return;
		}
		if (!formData.transactionNumber.trim()) {
			setModal({
				open: true,
				message: "Please enter the transaction number.",
				success: false,
			});
			return;
		}
		setSubmitting(true);
		try {
			// Prepare data in JSON format matching Apps Script expectations
			const submissionData = {
				TeamLeaderName: formData.teamLeaderName,
				Email: formData.teamLeaderEmail,
				PhoneNumber: formData.teamLeaderPhone,
				WhatsAppNumber: formData.teamLeaderWhatsapp,
				TeamName: formData.teamName,
				WantsKit: wantsKit ? "Yes" : "No",
				TeamMemberSecond: formData.teamMember2,
				TeamMemberThird: formData.teamMember3,
				TeamMemberFourth: formData.teamMember4 || "",
				TransactionNumber: formData.transactionNumber,
				PaymentScreenshot: formData.paymentProofLink,
				TotalFee: registrationFee.toString(),
			};

			console.log("Submitting registration data:", submissionData);
			console.log("Apps Script URL:", SCRIPT_URL);
			console.log("Total Fee:", registrationFee);
			console.log("Wants Kit:", wantsKit);

			const response = await fetch(SCRIPT_URL, {
				method: "POST",
				headers: {
					"Content-Type": "text/plain", // Use text/plain to avoid CORS preflight
				},
				body: JSON.stringify(submissionData),
				greenirect: "follow",
			});

			console.log("Response status:", response.status);
			console.log("Response ok:", response.ok);
			console.log("Response type:", response.type);

			const result = await response.json();
			console.log("Response data:", result);

			if (result.success) {
				setModal({
					open: true,
					message:
						"✅ Registration submitted successfully!\n\n🎉 Welcome to RoboDrift 2025!\n\n💬 Join our official WhatsApp group to stay updated with announcements.",
					success: true,
					showWhatsAppButton: true,
				});
				setFormData({
					teamLeaderEmail: "",
					teamName: "",
					teamLeaderName: "",
					teamLeaderPhone: "",
					teamLeaderWhatsapp: "",
					teamMember2: "",
					teamMember3: "",
					teamMember4: "",
					paymentProofLink: "",
					transactionNumber: "",
				});
				setFileUrl("");
				setWantsKit(null);
			} else {
				setModal({
					open: true,
					message: result.message || "Registration failed. Please try again.",
					success: false,
				});
			}
		} catch (err) {
			console.error("Submission error details:", err);
			console.error("Error name:", err.name);
			console.error("Error message:", err.message);

			let errorMessage = "Error submitting registration. ";

			if (err.name === "TypeError" && err.message.includes("Failed to fetch")) {
				errorMessage =
					"Network error: Unable to connect to the server. Please check:\n" +
					"1. Your internet connection\n" +
					"2. The Apps Script URL is correct\n" +
					"3. The Apps Script is deployed as Web App\n\n" +
					"Current URL: " +
					SCRIPT_URL;
			} else if (err instanceof SyntaxError) {
				errorMessage =
					"Server returned invalid response. The Apps Script may not be deployed correctly.";
			} else {
				errorMessage = `Error: ${err.message}\n\nPlease check the browser console for details.`;
			}

			setModal({ open: true, message: errorMessage, success: false });
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="relative min-h-screen w-full bg-gradient-to-b from-black via-black/40 to-black text-white overflow-hidden font-orbitron">
			<BackgroundGrid />
			<ProgressBar bgcolor="#11F500" duration="0.3" />

			{/* Modal for alerts - keeping original functionality */}
			{modal.open && (
				<div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm px-2">
					<div
						className={`w-full max-w-md md:max-w-md sm:max-w-xs rounded-2xl shadow-2xl p-6 sm:p-4 border-2 ${
							modal.success
								? "border-green-400 bg-gradient-to-br from-green-900/90 to-green-700/80"
								: "border-green-400 bg-gradient-to-br from-green-900/90 to-green-700/80"
						} animate-fade-in`}
					>
						<div className="flex flex-col items-center gap-4">
							<div
								className={`rounded-full p-3 ${
									modal.success ? "bg-green-400/20" : "bg-green-400/20"
								}`}
							>
								{modal.success ? (
									<svg
										className="w-10 h-10 text-green-300"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M5 13l4 4L19 7"
										/>
									</svg>
								) : (
									<svg
										className="w-10 h-10 text-green-300"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								)}
							</div>
							<div className="text-center">
								<h3
									className={`text-xl sm:text-lg font-bold mb-2 ${
										modal.success ? "text-green-200" : "text-green-200"
									}`}
								>
									{modal.success ? "Registration Status" : "Error"}
								</h3>
								<p className="text-base font-mono sm:text-sm text-white whitespace-pre-line break-words">
									{modal.message}
								</p>
							</div>
							<div className="flex flex-col gap-3 w-full">
								{modal.showWhatsAppButton && modal.success && (
									<a
										href="https://chat.whatsapp.com/GWckiomcTmNHnZjmkkxe4c"
										target="_blank"
										rel="noopener noreferrer"
										className="mt-2 px-6 py-3 rounded-lg font-semibold shadow transition-all duration-200 bg-green-500 text-white hover:bg-green-600 flex items-center justify-center gap-2"
									>
										<svg
											className="w-5 h-5"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
										</svg>
										Join WhatsApp Group
									</a>
								)}
								<button
									onClick={() => setModal({ ...modal, open: false })}
									className={`px-6 py-2 rounded-lg font-semibold shadow transition-all duration-200 ${
										modal.success
											? "bg-green-400 text-green-900 hover:bg-green-300"
											: "bg-green-400 text-green-900 hover:bg-green-300"
									}`}
								>
									Close
								</button>
							</div>
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
						className="py-12 flex flex-col justify-self-center w-fit px-4 md:px-8 bg-black/30 backdrop-blur-sm rounded-2xl border border-green-900/30"
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
									backgroundImage: "url('/robotron/txt_frame_gl.svg')",
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
								{/* green Background */}
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
									backgroundImage: "url('/robotron/txt_frame_gr.svg')",
								}}
								initial={{ opacity: 0, x: 50 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.6, duration: 0.8 }}
							/>
						</div>
						<div>
							<h1 className="relative text-xl mb-8 flex items-center justify-center gap-2">
								Event : <span className="text-green-600">RoboDrift</span>
							</h1>
						</div>

						<form
							onSubmit={handleSubmit}
							className="space-y-6 max-w-2xl mx-auto"
						>
							{/* Team Leader Information Section */}
							<div className="space-y-5">
								<div className="border-l-4 border-green-500 pl-4 mb-6">
									<h3 className="text-xl font-bold text-green-200">
										Team Leader Information
									</h3>
									<p className="text-green-200 text-sm mt-1">
										Primary contact details
									</p>
								</div>

								{/* Email */}
								<motion.div
									className="form-group"
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.1 }}
								>
									<label className="block text-green-600 mb-2 font-medium">
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
											className="w-full bg-black/50 border-2 border-green-800 focus:border-green-500 font-mono rounded-lg px-4 py-3.5 text-white outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(0,255,0,0.5)] placeholder:text-green-400/40"
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
									<label className="block text-green-600 mb-2 font-medium">
										Team Name *
									</label>
									<motion.div
										className="relative"
										whileHover={{ scale: 1.005 }}
									>
										<input
											type="text"
											name="teamName"
											value={formData.teamName}
											onChange={handleInputChange}
											className="w-full bg-black/50 border-2 border-green-800 focus:border-green-500 font-mono rounded-lg px-4 py-3.5 text-white outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(0,255,0,0.5)] placeholder:text-green-400/40"
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
									<label className="block text-green-600 mb-2 font-medium">
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
											className="w-full bg-black/50 border-2 border-green-800 focus:border-green-500 font-mono rounded-lg px-4 py-3.5 text-white outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(0,255,0,0.5)] placeholder:text-green-400/40"
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
										<label className="block text-green-600 mb-2 font-medium">
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
												className="w-full bg-black/50 border-2 border-green-800 font-mono focus:border-green-500 rounded-lg px-4 py-3.5 text-white outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(0,255,0,0.5)] placeholder:text-green-400/40"
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
										<label className="block text-green-600 mb-2 font-medium">
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
												className="w-full bg-black/50 border-2  border-green-800 focus:border-green-500 font-mono rounded-lg px-4 py-3.5 text-white outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(0,255,0,0.5)] placeholder:text-green-400/40"
												placeholder="WhatsApp number"
												required
											/>
										</motion.div>
									</motion.div>
								</div>
							</div>

							{/* Team Members Section */}
							<div className="space-y-5 pt-8">
								<div className="border-l-4 border-green-500 pl-4 mb-6">
									<h3 className="text-xl font-bold text-green-200">
										Team Members
									</h3>
									<p className="text-green-200 text-sm mt-1">
										Add your team members (minimum 2 required, max 4 including
										leader)
									</p>
								</div>

								{/* required Members (2 and 3) */}
								{[2, 3].map((num) => (
									<motion.div
										key={num}
										className="form-group"
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 0.4 + (num - 2) * 0.05 }}
									>
										<label className="block text-green-600 mb-2 font-medium">
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
												className="w-full bg-black/50 border-2 border-green-800 font-mono focus:border-green-500 rounded-lg px-4 py-3.5 text-white outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(0,255,0,0.5)] placeholder:text-green-400/40"
												placeholder={`Enter member ${num} name`}
												required
											/>
										</motion.div>
									</motion.div>
								))}

								{/* Optional Member 4 */}
								<motion.div
									className="form-group"
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.5 }}
								>
									<label className="block text-green-600 mb-2 font-medium">
										Team Member 4 Name{" "}
										<span className="text-green-400/60">(Optional)</span>
									</label>
									<motion.div whileHover={{ scale: 1.005 }}>
										<input
											type="text"
											name="teamMember4"
											value={formData.teamMember4}
											onChange={handleInputChange}
											className="w-full bg-black/50 border-2 border-green-800 focus:border-green-500 font-mono rounded-lg px-4 py-3.5 text-white outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(0,255,0,0.5)] placeholder:text-green-400/40"
											placeholder="Enter member 4 name (optional)"
										/>
									</motion.div>
								</motion.div>
							</div>

							{/* Kit Selection Section */}
							<div className="space-y-5 pt-8">
								<div className="border-l-4 border-green-500 pl-4 mb-6">
									<h3 className="text-xl font-bold text-green-200">
										Kit Selection
									</h3>
									<p className="text-green-200 text-sm mt-1">
										Choose if you want to purchase a kit (NIT Silchar students
										only)
									</p>
								</div>

								<motion.div
									className="form-group"
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.55, duration: 0.3 }}
								>
									<label className="block text-green-600 mb-3 font-medium text-lg">
										Do you want to purchase a Robot Kit? *
									</label>
									<div className="flex gap-4">
										<motion.button
											type="button"
											onClick={() => setWantsKit(true)}
											className={`flex-1 py-4 rounded-lg border-2 font-semibold transition-all duration-300 ${
												wantsKit === true
													? "bg-green-600 border-green-500 text-white shadow-[0_0_20px_rgba(0,255,0,0.5)]"
													: "bg-black/50 border-green-800 text-green-300 hover:border-green-600"
											}`}
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
										>
											<div>
												<div>Yes, I want a kit</div>
												<div className="text-sm opacity-80 mt-1">
													₹2799 (Kit + Registration)
												</div>
											</div>
										</motion.button>
										<motion.button
											type="button"
											onClick={() => setWantsKit(false)}
											className={`flex-1 py-4 rounded-lg border-2 font-semibold transition-all duration-300 ${
												wantsKit === false
													? "bg-green-600 border-green-500 text-white shadow-[0_0_20px_rgba(0,255,0,0.5)]"
													: "bg-black/50 border-green-800 text-green-300 hover:border-green-600"
											}`}
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
										>
											<div>
												<div>No, registration only</div>
												<div className="text-sm opacity-80 mt-1">
													₹799 (Registration Only)
												</div>
											</div>
										</motion.button>
									</div>
									{wantsKit === null && (
										<p className="text-green-400/60 text-xs mt-2">
											⚠️ Please select an option to continue
										</p>
									)}
								</motion.div>

								{/* Price Summary */}
								{wantsKit !== null && (
									<motion.div
										className="bg-gradient-to-br from-green-950/30 to-black/50 border-2 border-green-500/40 rounded-xl p-4 mt-6"
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.3 }}
									>
										<div className="flex justify-between items-center">
											<div>
												<p className="text-green-400/70 text-sm">
													Total Amount to Pay:
												</p>
												<p className="text-green-100 text-xs mt-1">
													{wantsKit
														? "NIT Silchar - Kit + Registration"
														: "NIT Silchar - Registration Only"}
												</p>
											</div>
											<div className="text-right">
												<p className="text-green-300 font-bold text-2xl">
													₹{registrationFee}
												</p>
											</div>
										</div>
									</motion.div>
								)}
							</div>

							{/* Show kit components only if kit is selected */}
							{wantsKit === true && <KitComponentsSection />}
							<AttentionSection />
							{/* Payment Section */}
							<div className="space-y-6 pt-8">
								<div className="border-l-4 border-green-500 pl-4 mb-6">
									<h3 className="text-xl font-bold text-green-400">
										Payment Information
									</h3>
									<p className="text-green-200 text-sm mt-1">
										Complete the payment and upload proof
									</p>
								</div>

								{/* QR Codes Display */}
								<motion.div
									className="bg-gradient-to-br from-green-950/30 to-black/50 border-2 border-green-500/40 rounded-2xl p-6 space-y-6"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.65 }}
								>
									<div className="text-center mb-4">
										<h4 className="text-lg font-bold text-green-300 mb-2">
											Scan QR Code to Pay ₹{registrationFee}
										</h4>
										<p className="text-green-400 text-sm">
											Choose any ONE payment option below
										</p>
									</div>

									<div className="grid md:grid-cols-2 gap-6">
										{/* Primary QR Code */}
										<motion.div
											className="bg-black/40 border-2 border-green-400 rounded-xl p-4 relative overflow-hidden"
											whileHover={{ scale: 1.02 }}
											transition={{ type: "spring", stiffness: 300 }}
										>
											<div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
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
												<p className="text-green-300 font-semibold">
													Swarup Chanda
												</p>
												<p className="text-green-400 text-sm font-mono">
													6003147277@ptsbi
												</p>
											</div>
										</motion.div>

										{/* Alternative QR Code */}
										<motion.div
											className="bg-black/40 border-2 border-green-400/60 rounded-xl p-4 relative overflow-hidden"
											whileHover={{ scale: 1.02 }}
											transition={{ type: "spring", stiffness: 300 }}
										>
											<div className="absolute top-2 right-2 bg-green-400/80 text-white text-xs font-bold px-2 py-1 rounded">
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
												<p className="text-green-300 font-semibold">
													Md Fayjan
												</p>
												<p className="text-green-400 text-sm font-mono">
													himdfayzan1735-2@oksbi
												</p>
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
									<label className="block text-green-300 mb-3 font-medium text-lg">
										Upload Payment Screenshot *
									</label>
									<motion.div
										className="relative"
										whileHover={{ scale: 1.005 }}
									>
										<div
											className={`w-full bg-gradient-to-br from-black/60 to-green-950/20 border-2 ${
												fileUrl
													? "border-green-500"
													: "border-green-800 border-dashed"
											} focus-within:border-green-500 rounded-xl p-6 text-white outline-none transition-all duration-300 focus-within:shadow-[0_0_20px_rgba(0,255,0,0.4)]`}
										>
											<label className="flex flex-col items-center gap-4 cursor-pointer">
												<div
													className={`p-4 rounded-full ${
														fileUrl ? "bg-green-500/20" : "bg-black/20"
													}`}
												>
													<UploadIcon
														className={`h-10 w-10 ${
															fileUrl ? "text-green-400" : "text-green-400"
														}`}
													/>
												</div>
												<div className="text-center">
													{uploading ? (
														<div className="space-y-2">
															<div className="text-green-400 animate-pulse text-lg font-semibold">
																Uploading...
															</div>
															<div className="w-48 h-2 bg-green-900/30 rounded-full overflow-hidden mx-auto">
																<motion.div
																	className="h-full bg-gradient-to-r from-green-600 to-green-400"
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
																className="text-green-300 text-sm underline hover:text-green-100 inline-block"
																onClick={(e) => e.stopPropagation()}
															>
																View uploaded screenshot →
															</a>
															<div className="text-green-400/60 text-sm mt-2">
																Click to upload a different file
															</div>
														</div>
													) : (
														<div className="space-y-2">
															<div className="text-green-200 text-lg font-semibold">
																Click to Upload Payment Screenshot
															</div>
															<div className="text-green-400/70 text-sm">
																Supported: JPG, PNG, PDF • Max size: 5MB
															</div>
															<div className="text-green-300/50 text-xs mt-2">
																Make sure transaction details are clearly
																visible
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
									<label className="block text-green-300 mb-2 font-medium">
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
											className="w-full bg-black/50 border-2 border-green-800 focus:border-green-500  rounded-lg px-4 py-3.5 text-white outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(0,255,0,0.5)] placeholder:text-green-400/40 font-mono"
											placeholder="Enter UPI transaction number"
											required
										/>
									</motion.div>
									<p className="text-green-400/60 text-xs mt-2">
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
								<div className="border-l-4 border-green-500 pl-4 mb-6">
									<h3 className="text-xl font-bold text-green-400">
										Registration Summary
									</h3>
									<p className="text-green-200 text-sm mt-1">
										Review your details before submitting
									</p>
								</div>

								<div className="bg-gradient-to-br from-green-950/30 to-black/50 border-2 border-green-500/40 rounded-2xl p-6 space-y-4 font-orbitron">
									{/* Team Information */}
									<div className="space-y-3">
										<h4 className="text-lg font-bold text-green-300 border-b border-green-500/30 pb-2">
											Team Information
										</h4>
										<div className="grid md:grid-cols-2 gap-4 text-sm">
											<div>
												<span className="text-green-400/70">Team Name:</span>
												<p className="text-green-100 font-medium">
													{formData.teamName || "Not provided"}
												</p>
											</div>
											<div>
												<span className="text-green-400/70">Event:</span>
												<p className="text-green-100 font-medium">RoboDrift</p>
											</div>
										</div>
									</div>

									{/* Team Leader Details */}
									<div className="space-y-3">
										<h4 className="text-lg font-bold text-green-300 border-b border-green-500/30 pb-2">
											Team Leader Details
										</h4>
										<div className="grid md:grid-cols-2 gap-4 text-sm">
											<div>
												<span className="text-green-400/70">Name:</span>
												<p className="text-green-100 font-medium">
													{formData.teamLeaderName || "Not provided"}
												</p>
											</div>
											<div>
												<span className="text-green-400/70">Email:</span>
												<p className="text-green-100 font-medium break-all">
													{formData.teamLeaderEmail || "Not provided"}
												</p>
											</div>
											<div>
												<span className="text-green-400/70">Phone:</span>
												<p className="text-green-100 font-medium">
													{formData.teamLeaderPhone || "Not provided"}
												</p>
											</div>
											<div>
												<span className="text-green-400/70">WhatsApp:</span>
												<p className="text-green-100 font-medium">
													{formData.teamLeaderWhatsapp || "Not provided"}
												</p>
											</div>
										</div>
									</div>

									{/* Team Members */}
									<div className="space-y-3">
										<h4 className="text-lg font-bold text-green-300 border-b border-green-500/30 pb-2">
											Team Members
										</h4>
										<div className="grid md:grid-cols-2 gap-4 text-sm">
											{[2, 3, 4].map((num) => {
												const memberName = formData[`teamMember${num}`];
												if (memberName) {
													return (
														<div key={num}>
															<span className="text-green-400/70">
																Member {num}:
															</span>
															<p className="text-green-100 font-medium">
																{memberName}
															</p>
														</div>
													);
												}
												return null;
											})}
										</div>
									</div>

									{/* Payment Details */}
									<div className="space-y-3">
										<h4 className="text-lg font-bold text-green-300 border-b border-green-500/30 pb-2">
											Payment Details
										</h4>
										<div className="grid md:grid-cols-2 gap-4 text-sm">
											<div>
												<span className="text-green-400/70">Kit Purchase:</span>
												<p className="text-green-100 font-medium">
													{wantsKit === null
														? "Not selected"
														: wantsKit
														? "Yes"
														: "No"}
												</p>
											</div>
											<div>
												<span className="text-green-400/70">Total Amount:</span>
												<p className="text-green-100 font-medium text-lg">
													₹{registrationFee}
												</p>
											</div>
											<div>
												<span className="text-green-400/70">
													Transaction Number:
												</span>
												<p className="text-green-100 font-medium font-mono">
													{formData.transactionNumber || "Not provided"}
												</p>
											</div>
											<div className="md:col-span-2">
												<span className="text-green-400/70">
													Payment Proof:
												</span>
												<p className="text-green-100 font-medium">
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
										backgroundImage: "url('/robotron/button_green.svg')",
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
											background:
												"radial-gradient(circle, rgba(0,218,33,0.6) 0%, transparent 70%)",
										}}
									/>
									<span className="relative z-10 text-xs md:text-sm font-bold text-white drop-shadow-[0_0_10px_rgba(0,218,33,0.8)] group-hover:drop-shadow-[0_0_15px_rgba(165,0,0,1)] transition-all duration-300">
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

export default RoboDrift;
