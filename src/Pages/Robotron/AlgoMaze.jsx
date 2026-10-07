import { useState } from "react";
import { motion } from "framer-motion";
import {
	CheckCircleIcon,
	UploadIcon,
	FileTextIcon,
	DownloadIcon,
	EyeIcon,
	DollarSign,
	CalendarDays,
	MapPin,
	Users,
	Clock,
	Music,
	Package,
	MessageCircle,
	ExternalLink,
	Phone,
	Mail,
	Landmark,
	QrCode,
	UserCircle2,
	ListChecks,
	Wallet,
	ClipboardCheck,
	GraduationCap,
	PackageCheck,
} from "lucide-react";
import { MultiStepLoader } from "../../components/Merch_components/multi-step-loader";
import ProgressBar from "react-scroll-progress-bar";
import "./styles/registration-theme.css";
import useRailScrollSpy from "./useRailScrollSpy";

const MODULE_HEADS = [
	{
		name: "Aditya Pratap Singh",
		phone: "+91 6392826475",
		phoneHref: "tel:+916392826475",
		email: "adityaps_ug_24@ece.nits.ac.in",
	},
	{
		name: "Aryan Kumar",
		phone: "+91 9289097369",
		phoneHref: "tel:+919289097369",
		email: "aryankr_ug_24@ee.nits.ac.in",
	},
	{
		name: "Chetna R",
		phone: "+91 6383630597",
		phoneHref: "tel:+916383630597",
		email: "chetna_ug_24@ece.nits.ac.in",
	},
];

const BANK_OPTIONS = [
	{
		bankName: "Indian Bank",
		accountHolder: "Abhinav Singh",
		ifsc: "IDIB000M746",
		accountNo: "50535758340",
		upi: "abhinav8723@okicici",
	},
	{
		bankName: "SBI",
		accountHolder: "Ayushman Sagar Baruah",
		ifsc: "SBIN0007061",
		accountNo: "45110195670",
		upi: "ayushmansagar46-1@oksbi",
	},
];

const WIRED_KIT_ITEMS = [
	"plywood",
	"Metal Sheet",
	"Plywood",
	"500 rpm 12v dc motor",
	"DPDT Switch",
	"L clamp — DC Motor",
	"70*40mm, 6mm shaft Wheel",
	"Soldering",
];
const WIRELESS_KIT_ITEMS = [
	"Chassis *1",
"Rocker Switch *1",
"Battery Holder *1",
"Li-ion Batteries *4",
"L298N Motor Driver *1",
"L Clamp-DC Motor *4",
"Wheels *4",
"500 RPM DC Geared Motor *4",
"ESP8266 *1",
"Jumper Wires",
"Soldering Kit",
"Charging Module *1",
"Micro USB Cable *1",
];

const AmbientBlobs = () => (
	<div className="robo-ambient" aria-hidden="true">
		<div className="robo-ambient-blob a" />
		<div className="robo-ambient-blob b" />
		<div className="robo-ambient-blob c" />
	</div>
);

// Hero Section Component
const HeroSection = () => (
	<section className="robo-hero">
		<motion.div
			className="robo-hero-copy"
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.7 }}
		>
			<span className="robo-hero-tag">
				<span className="robo-hero-tag-dot" />
				N.E.R.D.S. &bull; ROBOTRON 2026
			</span>
			<h1 className="robo-hero-title">ROBOSUMO</h1>
			<h2 className="robo-hero-subtitle">Robotron Registration 2026</h2>
			<p className="robo-hero-desc">
				A battle-forged robot engineered for Robosumo supremacy — designed to
				push, block, and survive in the ring. The true champion of N.E.R.D.S.
				Robosumo — where strength meets strategy, and only the smartest bots
				survive!
			</p>
			<div className="robo-hero-actions">
				<span className="robo-prize-pill">
					<DollarSign size={18} />
					Prize Pool <b>₹25,000</b>
				</span>
				<a href="#register-form" className="robo-cta-ghost">
					Register Now
				</a>
			</div>
		</motion.div>

		<motion.div
			className="robo-hero-art"
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.8, delay: 0.2 }}
		>
			<span className="robo-hero-bracket tl" />
			<span className="robo-hero-bracket tr" />
			<span className="robo-hero-bracket bl" />
			<span className="robo-hero-bracket br" />
			<span className="robo-hero-scan" />
			<div className="robo-hero-art-glow" />
			<img src="/robotron/mouse.png" alt="Battle Robot" />
		</motion.div>
	</section>
);

const StatRow = () => (
	<div className="robo-stat-row">
		<div className="robo-stat-card">
			<DollarSign size={20} />
			<span className="robo-stat-label">Prize Pool</span>
			<span className="robo-stat-value">₹25,000</span>
		</div>
		<div className="robo-stat-card">
			<CalendarDays size={20} />
			<span className="robo-stat-label">Event Dates</span>
			<span className="robo-stat-value">29th Oct- 1st Nov 2026</span>
		</div>
		<div className="robo-stat-card">
			<MapPin size={20} />
			<span className="robo-stat-label">Venue</span>
			<span className="robo-stat-value">NIT Silchar</span>
		</div>
		<div className="robo-stat-card">
			<Users size={20} />
			<span className="robo-stat-label">Team Size</span>
			<span className="robo-stat-value">Max 3 Members</span>
		</div>
	</div>
);

const SubNav = () => (
	<nav className="robo-subnav" aria-label="Quick links">
		<a href="#intel" className="robo-subnav-pill">
			<ListChecks size={14} /> Rules &amp; Notices
		</a>
		<a href="#register-form" className="robo-subnav-pill">
			<UserCircle2 size={14} /> Registration
		</a>
		<a href="#step-4" className="robo-subnav-pill">
			<Wallet size={14} /> Payment
		</a>
	</nav>
);

// Rules + Notices merged into one "Intel" section
const IntelSection = () => {
	const brochureUrl =
		"https://drive.google.com/file/d/11-AVKvS4cK8p_3fcfJq3MInM63KANnVP/view?usp=drive_link";

	return (
		<div id="intel" className="robo-section">
			<div className="robo-section-head">
				<span className="robo-eyebrow">Intel</span>
				<h2 className="robo-section-title">Rules &amp; Notices</h2>
				<p className="robo-section-desc">
					Everything you need before you register — rules, brochure, module
					heads and important dates.
				</p>
			</div>

			<div className="robo-intel">
				<div className="robo-intel-aside">
					<div className="robo-panel robo-panel--tone robo-cut robo-rules-panel">
						<div className="robo-rules-top">
							<div className="robo-icon-chip">
								<FileTextIcon size={24} />
							</div>
							<div>
								<h3>Event Rules &amp; Regulations</h3>
								<p>
									Download the official Robosumo brochure to learn about
									competition rules, robot specifications, arena details, and
									scoring system.
								</p>
							</div>
						</div>

						<div className="robo-checklist">
							<div className="robo-checklist-item">
								<CheckCircleIcon size={16} />
								<span>Complete rule book</span>
							</div>
							<div className="robo-checklist-item">
								<CheckCircleIcon size={16} />
								<span>Robot specifications</span>
							</div>
							<div className="robo-checklist-item">
								<CheckCircleIcon size={16} />
								<span>Arena dimensions</span>
							</div>
							<div className="robo-checklist-item">
								<CheckCircleIcon size={16} />
								<span>Scoring &amp; judging criteria</span>
							</div>
						</div>

						<div className="robo-btn-row">
							<motion.a
								href={brochureUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="robo-btn robo-btn-primary"
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<EyeIcon size={18} />
								View Brochure
							</motion.a>
							<motion.a
								href={brochureUrl}
								className="robo-btn robo-btn-ghost"
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<DownloadIcon size={18} />
								Download PDF
							</motion.a>
						</div>

						<p className="robo-fineprint">
							Make sure to read all rules carefully before registering.
						</p>

						<div className="robo-contact-grid">
							{MODULE_HEADS.map((head) => (
								<div className="robo-contact-card" key={head.name}>
									<div className="robo-contact-avatar">{head.name.charAt(0)}</div>
									<h4>{head.name}</h4>
									<span className="role">Module Head — Robosumo</span>
									<div className="robo-contact-links">
										<a href={head.phoneHref}>
											<Phone size={14} /> {head.phone}
										</a>
										<a href={`mailto:${head.email}`}>
											<Mail size={14} /> {head.email}
										</a>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="robo-intel-feed">
					<div className="robo-notice-card">
						<div className="robo-notice-head">
							<CalendarDays size={20} />
							<h4>Event Dates</h4>
						</div>
						<p>
							Event Dates: <strong>29th October – 1st November 2026</strong>.
							<br />
							Venue: <strong>NIT Silchar, Assam</strong>
						</p>
					</div>

					<div className="robo-notice-card">
						<div className="robo-notice-head">
							<Clock size={20} />
							<h4>Registration Deadline</h4>
						</div>
						<p>
							All NIT Silchar participants with kit requirements must register
							before <strong>15th October, 12:00 PM</strong>.
						</p>
						<p>
							Final closing date of registration for all participants is{" "}
							<strong>25th October 2026, 12:00 PM</strong>. Ensure your
							details are submitted on time to confirm your slot for{" "}
							<strong>Robotron 2026</strong>.
						</p>
					</div>

					<div className="robo-notice-card">
						<div className="robo-notice-head">
							<GraduationCap size={20} />
							<h4>NIT Silchar Students Only</h4>
						</div>
						<p>
							Robosumo is open to <strong>NIT Silchar students only</strong>{" "}
							this year.
						</p>
					</div>

					<div className="robo-notice-card">
						<div className="robo-notice-head">
							<Music size={20} />
							<h4>Festival Access</h4>
						</div>
						<p>
							All registered participants can enjoy{" "}
							<strong>Tecnoesis festival attractions</strong> such as the DJ
							Night, Artist Performances, and other campus events through
							their <strong>college-issued access card</strong>.
						</p>
					</div>

					{/* <div className="robo-notice-card">
						<div className="robo-notice-head">
							<Package size={20} />
							<h4>Kit Order Tracking</h4>
						</div>
						<p>
							For tracking your kit order or delivery status, visit the
							tracking portal.
						</p>
						<a href="/trackOrder" className="robo-notice-link">
							<ExternalLink size={14} /> Track Your Robot Kits
						</a>
					</div> */}

					<div className="robo-notice-card">
						<div className="robo-notice-head">
							<MessageCircle size={20} />
							<h4>Join the WhatsApp Group</h4>
						</div>
						<p>
							Stay updated with important announcements, rule clarifications,
							and connect with fellow participants!
						</p>
						<a
							href="https://chat.whatsapp.com/K4H5ROxqXIK2fagZzQjxOy?mode=gi_t"
							target="_blank"
							rel="noopener noreferrer"
							className="robo-notice-link"
						>
							<ExternalLink size={14} /> Join Robosumo WhatsApp Group
						</a>
					</div>

					{/* <div className="robo-notice-card">
						<div className="robo-notice-head">
							<FileTextIcon size={20} />
							<h4>Register on Unstop</h4>
						</div>
						<p>
							Participants must also register on the Unstop portal to receive
							their participation certificates.
						</p>
						<a
							href="https://unstop.com/o/y9aX31v?lb=vlJn96DJ&utm_medium=Share&utm_source=nerdsclu15149&utm_campaign=Competitions"
							target="_blank"
							rel="noopener noreferrer"
							className="robo-notice-link"
						>
							<ExternalLink size={14} /> Registration Link
						</a>
					</div> */}
				</div>
			</div>
		</div>
	);
};

function Robosumo() {
	useRailScrollSpy();

	const [formData, setFormData] = useState({
		teamLeaderEmail: "",
		teamName: "",
		teamLeaderName: "",
		teamLeaderPhone: "",
		teamLeaderWhatsapp: "",
		teamLeaderScholarId: "",
		teamMember2: "",
		teamMember3: "",
		paymentProofLink: "",
		transactionNumber: "",
	});

	// Robosumo is NIT Silchar only this year — no college choice needed.
	// Two kit types (wired / wireless bot), or none.
	const [kitChoice, setKitChoice] = useState(null); // "none" | "wired" | "wireless"

	const registrationFee = 799;
	const wiredKitFee = 2199;
	const wirelessKitFee = 2999;
	const totalAmount =
		kitChoice === "wired" ? wiredKitFee : kitChoice === "wireless" ? wirelessKitFee : registrationFee;

	const [payMethod, setPayMethod] = useState("qr");
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
		"https://script.google.com/macros/s/AKfycbyk1GS1lKc38tYStP5yt4N-192cxTsn8Om6hXAR1NH38c3CCLMWNKofml81Hqdcs8rxmw/exec";
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
				"https://script.google.com/macros/s/AKfycbyk1GS1lKc38tYStP5yt4N-192cxTsn8Om6hXAR1NH38c3CCLMWNKofml81Hqdcs8rxmw/exec",
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
		if (!formData.teamLeaderScholarId.trim()) {
			setModal({
				open: true,
				message: "Please enter team leader's Scholar ID.",
				success: false,
			});
			return;
		}
		// if (!formData.teamMember2.trim()) {
		// 	setModal({
		// 		open: true,
		// 		message: "Please enter Team Member 2 name.",
		// 		success: false,
		// 	});
		// 	return;
		// }
		if (kitChoice === null) {
			setModal({
				open: true,
				message: "Please select a kit option.",
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
			const timestamp = new Date().toISOString();
			const formBody = new URLSearchParams();
			formBody.append("Timestamp", timestamp);
			formBody.append("TeamName", formData.teamName);
			formBody.append("TeamLeaderEmail", formData.teamLeaderEmail);
			formBody.append("TeamLeaderName", formData.teamLeaderName);
			formBody.append("TeamLeaderPhone", formData.teamLeaderPhone);
			formBody.append("TeamLeaderWhatsapp", formData.teamLeaderWhatsapp);
			formBody.append("TeamLeaderScholarId", formData.teamLeaderScholarId);
			formBody.append("CollegeName", "NIT Silchar");
			formBody.append("CollegeType", "NIT Silchar");
			formBody.append("TeamMemberSecond", formData.teamMember2);
			formBody.append("TeamMemberThird", formData.teamMember3 || "");
			formBody.append("WantsKit", kitChoice !== "none" ? "Yes" : "No");
			formBody.append(
				"KitType",
				kitChoice === "wired" ? "Wired Bot" : kitChoice === "wireless" ? "Wireless Bot" : "No Kit"
			);
			formBody.append("PaymentScreenshot", formData.paymentProofLink);
			formBody.append("TransactionNumber", formData.transactionNumber);
			formBody.append("TotalFee", totalAmount);

			await fetch(SCRIPT_URL, {
				method: "POST",
				mode: "no-cors",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: formBody.toString(),
			});

			// With no-cors mode, we can't read the response, so we assume success if no error
			setModal({
				open: true,
				message:
					"✅ Registration submitted successfully!\n\n🎉 Welcome to Robosumo 2026!\n\n💬 Join our official WhatsApp group to stay updated with announcements.",
				success: true,
				showWhatsAppButton: true,
			});
			setFormData({
				teamLeaderEmail: "",
				teamName: "",
				teamLeaderName: "",
				teamLeaderPhone: "",
				teamLeaderWhatsapp: "",
				teamLeaderScholarId: "",
				teamMember2: "",
				teamMember3: "",
				paymentProofLink: "",
				transactionNumber: "",
			});
			setFileUrl("");
			setKitChoice(null);
		} catch (err) {
			setModal({
				open: true,
				message: "Error submitting registration.",
				success: false,
			});
			console.error(err);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="robo-page tone-sumo">
			<AmbientBlobs />
			<ProgressBar bgcolor="#f5a524" duration="0.3" />

			{/* Modal for alerts - keeping original functionality */}
			{modal.open && (
				<div className="robo-modal-backdrop">
					<div className={`robo-modal robo-cut ${modal.success ? "is-success" : "is-error"}`}>
						<div className="robo-modal-icon">
							{modal.success ? (
								<svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
								</svg>
							) : (
								<svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
								</svg>
							)}
						</div>
						<h3 className="robo-modal-title">
							{modal.success ? "Registration Status" : "Error"}
						</h3>
						<p className="robo-modal-message">{modal.message}</p>
						<div className="robo-modal-actions">
							{modal.showWhatsAppButton && modal.success && (
								<a
									href="https://chat.whatsapp.com/K4H5ROxqXIK2fagZzQjxOy?mode=gi_t"
									target="_blank"
									rel="noopener noreferrer"
									className="robo-modal-btn robo-modal-btn-whatsapp"
								>
									<MessageCircle size={18} />
									Join WhatsApp Group
								</a>
							)}
							<button
								onClick={() => setModal({ ...modal, open: false })}
								className={`robo-modal-btn ${modal.success ? "robo-modal-btn-success" : "robo-modal-btn-error"}`}
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

			<div className="robo-shell robo-stack">
				<div>
					<HeroSection />
					<StatRow />
					<SubNav />
				</div>

				<IntelSection />

				{/* Registration Form */}
				<div id="register-form" className="robo-section">
					<div className="robo-panel robo-panel--tone robo-cut robo-form-panel">
						<div className="robo-form-head">
							<span className="robo-eyebrow">Register</span>
							<h2 className="robo-section-title">Registration Form</h2>
							<p className="robo-form-event">
								Event: <b>Robosumo</b>
							</p>
						</div>

						<div className="robo-rail" aria-hidden="true">
							<a href="#step-1" className="robo-rail-node">
								<span className="robo-rail-dot">1</span>
								<span className="robo-rail-label">Leader</span>
							</a>
							<a href="#step-2" className="robo-rail-node">
								<span className="robo-rail-dot">2</span>
								<span className="robo-rail-label">Team</span>
							</a>
							<a href="#step-3" className="robo-rail-node">
								<span className="robo-rail-dot">3</span>
								<span className="robo-rail-label">Kit</span>
							</a>
							<a href="#step-4" className="robo-rail-node">
								<span className="robo-rail-dot">4</span>
								<span className="robo-rail-label">Payment</span>
							</a>
							<a href="#step-5" className="robo-rail-node">
								<span className="robo-rail-dot">5</span>
								<span className="robo-rail-label">Submit</span>
							</a>
						</div>

						<form onSubmit={handleSubmit} className="robo-form">
							{/* Step 1 — Team Leader */}
							<div id="step-1" className="robo-panel-step">
								<span className="robo-panel-step-numeral">01</span>
								<div className="robo-panel-step-head">
									<div className="robo-panel-step-icon">
										<UserCircle2 size={22} />
									</div>
									<div>
										<h3>Team Leader Information</h3>
										<p>Primary contact details</p>
									</div>
								</div>
								<div className="robo-panel-step-body">
									<div className="robo-field">
										<label className="robo-label">Email ID *</label>
										<input
											type="email"
											name="teamLeaderEmail"
											value={formData.teamLeaderEmail}
											onChange={handleInputChange}
											className="robo-input"
											placeholder="team.leader@example.com"
											required
										/>
									</div>
									<div className="robo-field">
										<label className="robo-label">Team Name *</label>
										<input
											type="text"
											name="teamName"
											value={formData.teamName}
											onChange={handleInputChange}
											className="robo-input"
											placeholder="Enter your team name"
											required
										/>
									</div>
									<div className="robo-field">
										<label className="robo-label">Full Name *</label>
										<input
											type="text"
											name="teamLeaderName"
											value={formData.teamLeaderName}
											onChange={handleInputChange}
											className="robo-input"
											placeholder="Enter your full name"
											required
										/>
									</div>
									<div className="robo-field-grid">
										<div className="robo-field">
											<label className="robo-label">Phone Number *</label>
											<input
												type="tel"
												name="teamLeaderPhone"
												value={formData.teamLeaderPhone}
												onChange={handleInputChange}
												pattern="[0-9]{10,15}"
												className="robo-input"
												placeholder="10-digit number"
												required
											/>
										</div>
										<div className="robo-field">
											<label className="robo-label">WhatsApp Number *</label>
											<input
												type="tel"
												name="teamLeaderWhatsapp"
												value={formData.teamLeaderWhatsapp}
												onChange={handleInputChange}
												pattern="[0-9]{10,15}"
												className="robo-input"
												placeholder="WhatsApp number"
												required
											/>
										</div>
									</div>
									<div className="robo-field">
										<label className="robo-label">Scholar ID *</label>
										<input
											type="text"
											name="teamLeaderScholarId"
											value={formData.teamLeaderScholarId}
											onChange={handleInputChange}
											className="robo-input"
											placeholder="Enter Scholar ID"
											required
										/>
									</div>
								</div>
							</div>

							{/* Step 2 — Team Members */}
							<div id="step-2" className="robo-panel-step">
								<span className="robo-panel-step-numeral">02</span>
								<div className="robo-panel-step-head">
									<div className="robo-panel-step-icon">
										<Users size={22} />
									</div>
									<div>
										<h3>Team Members</h3>
										<p>Add your team members (maximum 3 members including leader)</p>
									</div>
								</div>
								<div className="robo-panel-step-body">
									<div className="robo-field">
										<label className="robo-label">Team Member 2 Name *</label>
										<input
											type="text"
											name="teamMember2"
											value={formData.teamMember2}
											onChange={handleInputChange}
											className="robo-input"
											placeholder="Enter member 2 name (optional)"
											
										/>
									</div>
									<div className="robo-field">
										<label className="robo-label">
											Team Member 3 Name <span className="opt">(Optional)</span>
										</label>
										<input
											type="text"
											name="teamMember3"
											value={formData.teamMember3}
											onChange={handleInputChange}
											className="robo-input"
											placeholder="Enter member 3 name (optional)"
										/>
									</div>
								</div>
							</div>

							{/* Step 3 — Eligibility & Kit */}
							<div id="step-3" className="robo-panel-step">
								<span className="robo-panel-step-numeral">03</span>
								<div className="robo-panel-step-head">
									<div className="robo-panel-step-icon">
										<GraduationCap size={22} />
									</div>
									<div>
										<h3>Eligibility &amp; Kit</h3>
										<p>Robosumo 2026 is NIT Silchar only</p>
									</div>
								</div>
								<div className="robo-panel-step-body">
									<div className="robo-choice-card is-selected" style={{ cursor: "default" }}>
										<span className="robo-choice-ribbon">Fixed</span>
										<span className="robo-choice-icon">
											<GraduationCap size={20} />
										</span>
										<span className="robo-choice-copy">
											<h4>NIT Silchar Only</h4>
											<p>Open exclusively to NIT Silchar students this year</p>
										</span>
									</div>

									<div className="robo-field">
										<label className="robo-label">Select Your Kit *</label>
										<div className="robo-choice-grid">
											<button
												type="button"
												onClick={() => setKitChoice("none")}
												className={`robo-choice-card ${kitChoice === "none" ? "is-selected" : ""}`}
											>
												{kitChoice === "none" && <span className="robo-choice-ribbon">Selected</span>}
												<span className="robo-choice-icon">
													<CheckCircleIcon size={20} />
												</span>
												<span className="robo-choice-copy">
													<h4>No Kit</h4>
													<span className="meta">₹{registrationFee}</span>
													<p>Bring your own robot &amp; components</p>
												</span>
											</button>
											<button
												type="button"
												onClick={() => setKitChoice("wired")}
												className={`robo-choice-card ${kitChoice === "wired" ? "is-selected" : ""}`}
											>
												{kitChoice === "wired" && <span className="robo-choice-ribbon">Selected</span>}
												<span className="robo-choice-icon">
													<Package size={20} />
												</span>
												<span className="robo-choice-copy">
													<h4>Wired Bot Kit</h4>
													<span className="meta">₹{wiredKitFee}</span>
													<p>Full wired maze-bot kit</p>
												</span>
											</button>
											<button
												type="button"
												onClick={() => setKitChoice("wireless")}
												className={`robo-choice-card ${kitChoice === "wireless" ? "is-selected" : ""}`}
											>
												{kitChoice === "wireless" && <span className="robo-choice-ribbon">Selected</span>}
												<span className="robo-choice-icon">
													<PackageCheck size={20} />
												</span>
												<span className="robo-choice-copy">
													<h4>Wireless Bot Kit</h4>
													<span className="meta">₹{wirelessKitFee}</span>
													<p>Full wireless (ESP8266) maze-bot kit</p>
												</span>
											</button>
										</div>
										{kitChoice === null && (
											<p className="robo-hint robo-hint--warn">
												Please select a kit option to continue
											</p>
										)}
										{kitChoice === "wired" && (
											<div className="robo-checklist" style={{ marginTop: 14 }}>
												{WIRED_KIT_ITEMS.map((item) => (
													<div className="robo-checklist-item" key={item}>
														<CheckCircleIcon size={16} />
														<span>{item}</span>
													</div>
												))}
											</div>
										)}
										{kitChoice === "wireless" && (
											<div className="robo-checklist" style={{ marginTop: 14 }}>
												{WIRELESS_KIT_ITEMS.map((item) => (
													<div className="robo-checklist-item" key={item}>
														<CheckCircleIcon size={16} />
														<span>{item}</span>
													</div>
												))}
											</div>
										)}
									</div>

									<div className="robo-price-banner">
										<div>
											<div className="label">Total Amount to Pay</div>
											<div className="sub">
												{kitChoice === "wired"
													? "Registration + Wired Kit"
													: kitChoice === "wireless"
													? "Registration + Wireless Kit"
													: "Registration Only"} — NIT Silchar
											</div>
										</div>
										<div className="amount">₹{totalAmount}</div>
									</div>
								</div>
							</div>

							{/* Step 4 — Payment */}
							<div id="step-4" className="robo-panel-step">
								<span className="robo-panel-step-numeral">04</span>
								<div className="robo-panel-step-head">
									<div className="robo-panel-step-icon">
										<Wallet size={22} />
									</div>
									<div>
										<h3>Payment</h3>
										<p>Pay ₹{totalAmount} and upload your proof</p>
									</div>
								</div>
								<div className="robo-panel-step-body">
									<div className="robo-pay-tabs">
										<button
											type="button"
											className={`robo-pay-tab ${payMethod === "qr" ? "is-active" : ""}`}
											onClick={() => setPayMethod("qr")}
										>
											<QrCode size={14} style={{ marginRight: 6 }} />
											Scan QR
										</button>
										<button
											type="button"
											className={`robo-pay-tab ${payMethod === "bank" ? "is-active" : ""}`}
											onClick={() => setPayMethod("bank")}
										>
											<Landmark size={14} style={{ marginRight: 6 }} />
											Bank Transfer
										</button>
									</div>

									{payMethod === "qr" ? (
										<div className="robo-qr-grid">
											<div className="robo-qr-card is-primary">
												<span className="robo-qr-tag">Primary</span>
												<div className="robo-qr-image">
													<img src="/tshirt/abhinav-singh.jpeg" alt="Primary Payment QR Code - Abhinav" />
												</div>
												<div className="name">Abhinav Singh</div>
												<div className="upi">abhinav8723@okicici</div>
											</div>
											<div className="robo-qr-card">
												<span className="robo-qr-tag">Alternative</span>
												<div className="robo-qr-image">
													<img src="/tshirt/ayushman-baruah.jpeg" alt="Alternative Payment QR Code - Ayushman" />
												</div>
												<div className="name">Ayushman Sagar Baruah</div>
												<div className="upi">ayushmansagar46-1@oksbi</div>
											</div>
										</div>
									) : (
										<div className="robo-bank-grid">
											{BANK_OPTIONS.map((option, index) => (
												<div className="robo-bank-card robo-cut-sm" key={option.upi}>
													<div className="robo-bank-head">
														<h4>{index === 0 ? 'Primary' : 'Secondary'}</h4>
														<div className="robo-bank-icon">
															<Landmark size={18} />
														</div>
													</div>
													<div className="robo-bank-rows">
														<span><b>Bank Name:</b> {option.bankName}</span>
														<span><b>Account Holder:</b> {option.accountHolder}</span>
														<span><b>IFSC Code:</b> {option.ifsc}</span>
														<span><b>Account No:</b> {option.accountNo}</span>
														<span><b>UPI ID:</b> {option.upi}</span>
													</div>
												</div>
											))}
										</div>
									)}

									<div className="robo-field">
										<label className="robo-label">Upload Payment Screenshot *</label>
										<label className={`robo-upload ${fileUrl ? "is-done" : ""}`}>
											<div className="robo-upload-icon">
												{fileUrl ? <CheckCircleIcon size={26} /> : <UploadIcon size={26} />}
											</div>
											{uploading ? (
												<>
													<div className="robo-upload-title">Uploading...</div>
													<div className="robo-upload-bar">
														<motion.div
															className="robo-upload-bar-fill"
															initial={{ width: "0%" }}
															animate={{ width: "100%" }}
															transition={{ duration: 2, repeat: Infinity }}
														/>
													</div>
												</>
											) : fileUrl ? (
												<>
													<div className="robo-upload-title">File uploaded successfully!</div>
													<a
														href={fileUrl}
														target="_blank"
														rel="noopener noreferrer"
														className="robo-upload-link"
														onClick={(e) => e.stopPropagation()}
													>
														View uploaded screenshot →
													</a>
													<div className="robo-upload-sub">Click to upload a different file</div>
												</>
											) : (
												<>
													<div className="robo-upload-title">Click to upload payment screenshot</div>
													<div className="robo-upload-sub">Supported: JPG, PNG, PDF • Max size: 5MB</div>
												</>
											)}
											<input
												type="file"
												accept="application/pdf,image/*"
												onChange={uploader}
												required={!fileUrl}
												style={{ display: "none" }}
											/>
										</label>
									</div>

									<div className="robo-field">
										<label className="robo-label">Transaction Number (UPI Reference) *</label>
										<input
											type="text"
											name="transactionNumber"
											value={formData.transactionNumber}
											onChange={handleInputChange}
											className="robo-input"
											placeholder="Enter UPI transaction number"
											required
										/>
										<p className="robo-hint">Find this in your payment confirmation message</p>
									</div>
								</div>
							</div>

							{/* Step 5 — Review & Submit */}
							<div id="step-5" className="robo-panel-step">
								<span className="robo-panel-step-numeral">05</span>
								<div className="robo-panel-step-head">
									<div className="robo-panel-step-icon">
										<ClipboardCheck size={22} />
									</div>
									<div>
										<h3>Review &amp; Submit</h3>
										<p>Review your details before submitting</p>
									</div>
								</div>
								<div className="robo-panel-step-body">
									<div className="robo-panel robo-cut-sm robo-summary">
										<div className="robo-summary-group">
											<h4><UserCircle2 size={16} /> Team Information</h4>
											<div className="robo-summary-rows">
												<div className="robo-summary-row">
													<div className="k">Team Name</div>
													<div className="v">{formData.teamName || "Not provided"}</div>
												</div>
												<div className="robo-summary-row">
													<div className="k">Event</div>
													<div className="v">Robosumo</div>
												</div>
											</div>
										</div>

										<div className="robo-summary-group">
											<h4><Phone size={16} /> Team Leader Details</h4>
											<div className="robo-summary-rows">
												<div className="robo-summary-row">
													<div className="k">Name</div>
													<div className="v">{formData.teamLeaderName || "Not provided"}</div>
												</div>
												<div className="robo-summary-row">
													<div className="k">Email</div>
													<div className="v">{formData.teamLeaderEmail || "Not provided"}</div>
												</div>
												<div className="robo-summary-row">
													<div className="k">Phone</div>
													<div className="v">{formData.teamLeaderPhone || "Not provided"}</div>
												</div>
												<div className="robo-summary-row">
													<div className="k">WhatsApp</div>
													<div className="v">{formData.teamLeaderWhatsapp || "Not provided"}</div>
												</div>
												<div className="robo-summary-row">
													<div className="k">Scholar ID</div>
													<div className="v">{formData.teamLeaderScholarId || "Not provided"}</div>
												</div>
											</div>
										</div>

										<div className="robo-summary-group">
											<h4><Users size={16} /> Team Members</h4>
											<div className="robo-summary-rows">
												{[2, 3].map((num) => {
													const memberName = formData[`teamMember${num}`];
													if (!memberName) return null;
													return (
														<div className="robo-summary-row" key={num}>
															<div className="k">Member {num}</div>
															<div className="v">{memberName}</div>
														</div>
													);
												})}
											</div>
										</div>

										<div className="robo-summary-group">
											<h4><Wallet size={16} /> Payment Details</h4>
											<div className="robo-summary-rows">
												<div className="robo-summary-row">
													<div className="k">Robot Kit</div>
													<div className="v">
														{kitChoice === null
															? "Not selected"
															: kitChoice === "wired"
															? "Wired Bot Kit"
															: kitChoice === "wireless"
															? "Wireless Bot Kit"
															: "No Kit"}
													</div>
												</div>
												<div className="robo-summary-row">
													<div className="k">Total Amount</div>
													<div className="v">₹{totalAmount}</div>
												</div>
												<div className="robo-summary-row">
													<div className="k">Transaction Number</div>
													<div className="v">{formData.transactionNumber || "Not provided"}</div>
												</div>
												<div className="robo-summary-row">
													<div className="k">Payment Proof</div>
													<div className="v">
														{fileUrl ? (
															<a href={fileUrl} target="_blank" rel="noopener noreferrer" className="v ok">
																<CheckCircleIcon size={14} /> Uploaded successfully
															</a>
														) : (
															"Not uploaded"
														)}
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className="robo-submit-wrap">
										<motion.button
											type="submit"
											className="robo-submit-btn"
											whileHover={{ scale: 1.03 }}
											whileTap={{ scale: 0.97 }}
											transition={{ type: "spring", stiffness: 400, damping: 17 }}
										>
											Register Team
										</motion.button>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Robosumo;
