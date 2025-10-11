import { useState } from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import {
  AlertTriangleIcon,
  CheckCircleIcon,
  QrCodeIcon,
  UploadIcon,
} from 'lucide-react'
import { MultiStepLoader } from "../../components/Merch_components/multi-step-loader";
import ProgressBar from "react-scroll-progress-bar";

// Background Grid Component
const BackgroundGrid = () => {
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
          transition={{
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
          transition={{
            duration: 1.5,
            delay: i * 0.05,
            ease: 'easeInOut',
          }}
        />
      ))}
      {/* Glowing orbs */}
      {Array.from({
        length: 15,
      }).map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full bg-red-500/30 blur-xl"
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
  return (
    <motion.section
      className="py-16 text-center relative"
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
        {/* Circuit lines */}
        {Array.from({
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
      <motion.h1
        className="text-5xl font-spaced md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300"
        animate={{
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
        ROBOTRON
      </motion.h1>
      <motion.h2
        className="text-3xl font-spaced md:text-4xl font-bold mb-6 text-red-400"
        animate={{
          textShadow: ['0 0 3px #ff0000', '0 0 7px #ff0000', '0 0 3px #ff0000'],
        }}
        transition={{
          duration: 2,
          delay: 0.5,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        Robowar Registration 2025
      </motion.h2>
      <motion.p
        className="text-xl font-spaced text-red-200 max-w-3xl mx-auto"
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
        Organized by N.E.R.D.S. Robotics Club, NIT Silchar
      </motion.p>
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
      <div className="bg-red-950/30 backdrop-blur-md border border-red-500/30 rounded-xl p-6 relative overflow-hidden">
        {/* Glassmorphism effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-900/10" />
        {/* Animated glow */}
        <motion.div
          className="absolute inset-0 bg-red-500/5 rounded-xl"
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
            <p className="text-red-100">
              ⚠️ Only registrations are currently allowed. Kits and materials
              are not provided at this time. Registration fee: Rs. 999. For kit
              tracking, visit:{' '}
              <motion.a
                href="#"
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
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-400"
                  whileHover={{
                    width: '100%',
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                />
                <motion.span
                  className="absolute inset-0 bg-red-400/20 rounded"
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

// Kit Components Section Component
const KitComponentsSection = () => {
  const kitItems = [
    'Metal Geared Driving Motors (4 Piece)',
    'Traction Wheels (4 Piece)',
    'L-shaped clamps (4 Piece)',
    'DPDT switch (3 Piece)',
    '10 ft metal strip (for frame)',
    '3x4 ft metal sheet',
    'Metal cutter blade (3 Piece)',
    'High rpm motor (1 Piece for weapon) or High Torque motor (1 Piece for weapon)',
    'Soldering Kit',
    '(Optional) Both Weapon Motors (extra cost)',
  ]

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
        className="text-3xl font-bold mb-6 text-red-400 text-center"
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
      <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-red-900/30 p-8">
        <motion.ul
          className="space-y-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
          }}
        >
          {kitItems.map((item, index) => (
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
    </motion.section>
  )
}

// Payment Details Section Component
const PaymentDetailsSection = ({ registrationFee }) => {
  const upiLink1 = `upi://pay?pa=6003147277@ptsbi&pn=Swarup%20Chanda&am=${registrationFee}&cu=INR`;
  const upiLink2 = `upi://pay?pa=himdfayzan1735-2@oksbi&pn=Md%20Fayjan&am=${registrationFee}&cu=INR`;
  
  const paymentOptions = [
    {
      bankName: 'SBI',
      accountHolder: 'Swarup Chanda',
      ifsc: 'SBIN0017401',
      accountNo: '40293794000',
      upi: '6003147277@ptsbi',
      upiLink: upiLink1,
    },
    {
      bankName: 'SBI',
      accountHolder: 'Md Fayjan',
      ifsc: 'SBIN0016928',
      accountNo: '41946546051',
      upi: 'himdfayzan1735-2@oksbi',
      upiLink: upiLink2,
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
        className="text-3xl font-bold mb-8 text-red-400 text-center"
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
        Payment Details
      </motion.h2>
      <div className="grid md:grid-cols-2 gap-8">
        {paymentOptions.map((option, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-br from-red-950/50 to-black/50 backdrop-blur-sm rounded-xl border border-red-900/30 p-6 relative overflow-hidden group"
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
              <h3 className="text-xl font-bold text-red-400">
                Option {index + 1}
              </h3>
              <div className="bg-red-900/30 p-2 rounded-lg">
                <QrCodeIcon className="h-6 w-6 text-red-500" />
              </div>
            </div>
            <div className="space-y-2 text-red-100">
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
            {/* UPI Payment Button */}
            <div className="mt-4">
              <a
                href={option.upiLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-all duration-200"
              >
                <span>Pay ₹{registrationFee} via UPI</span>
              </a>
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

PaymentDetailsSection.propTypes = {
  registrationFee: PropTypes.number.isRequired,
}

function RobowarRegistration() {
  const [formData, setFormData] = useState({
    teamLeaderEmail: "",
    teamName: "",
    teamLeaderName: "",
    teamLeaderPhone: "",
    teamLeaderWhatsapp: "",
    teamLeaderScholarId: "",
    teamMember2: "",
    teamMember3: "",
    teamMember4: "",
    teamMember5: "",
    teamMember6: "",
    paymentProofLink: "",
    transactionNumber: "",
  });
  
  // Fixed registration fee
  const registrationFee = 999;
  
  const [fileUrl, setFileUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [modal, setModal] = useState({ open: false, message: "", success: false });

  // Change this to your actual deployed Apps Script Web App URL
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw5p3omtAO6t1MPeTFP9kL0ruKR4lyjxhwWhnw9VG42O-ts8-SxYk-sjMVycqKV0vU3gw/exec";
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
        "https://script.google.com/macros/s/AKfycbyhMyvbLwGEqCjVGC0gJCwvAOS_KyJnfVleU4h3iUUG88VeUXoWyujKKjRxMSuzT9AoHA/exec",
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
      const params = new URLSearchParams();
      params.append("Timestamp", timestamp);
      params.append("TeamLeaderEmail", formData.teamLeaderEmail);
      params.append("TeamName", formData.teamName);
      params.append("TeamLeaderName", formData.teamLeaderName);
      params.append("TeamLeaderPhone", formData.teamLeaderPhone);
      params.append("TeamLeaderWhatsapp", formData.teamLeaderWhatsapp);
      params.append("TeamLeaderScholarId", formData.teamLeaderScholarId);
      params.append("TeamMember2", formData.teamMember2);
      params.append("TeamMember3", formData.teamMember3);
      params.append("TeamMember4", formData.teamMember4);
      params.append("TeamMember5", formData.teamMember5 || "");
      params.append("TeamMember6", formData.teamMember6 || "");
      params.append("PaymentProofLink", formData.paymentProofLink);
      params.append("TransactionNumber", formData.transactionNumber);
      params.append("RegistrationFee", registrationFee);
      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params.toString()
      });
      const response = await res.text();
      setModal({ open: true, message: response, success: true });
      setFormData({
        teamLeaderEmail: "",
        teamName: "",
        teamLeaderName: "",
        teamLeaderPhone: "",
        teamLeaderWhatsapp: "",
        teamLeaderScholarId: "",
        teamMember2: "",
        teamMember3: "",
        teamMember4: "",
        teamMember5: "",
        teamMember6: "",
        paymentProofLink: "",
        transactionNumber: "",
      });
      setFileUrl("");
    } catch (err) {
      setModal({ open: true, message: "Error submitting registration.", success: false });
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-black to-red-950 text-white overflow-hidden font-orbitron">
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
          { text: "Submitting registration..." },
          { text: "Processing payment..." },
          { text: "Finalizing..." },
        ]}
        loading={submitting}
        duration={1200}
        loop={true}
      />
      
      <ProgressBar duration="0.01"/>

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
          
          {/* Registration Form Component with new styling */}
          <motion.section
            className="py-12 px-4 md:px-8 bg-black/30 backdrop-blur-sm rounded-2xl border border-red-900/30"
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
            <motion.h2
              className="text-3xl font-bold mb-8 text-red-400 text-center"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.5,
              }}
            >
              Registration Form
            </motion.h2>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
              {/* Team Leader Information Section */}
              <div className="space-y-5">
                <div className="border-l-4 border-red-500 pl-4 mb-6">
                  <h3 className="text-xl font-bold text-red-400">Team Leader Information</h3>
                  <p className="text-red-200 text-sm mt-1">Primary contact details</p>
                </div>

                {/* Email */}
                <motion.div
                  className="form-group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-red-300 mb-2 font-medium">
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
                      className="w-full bg-black/50 border-2 border-red-800 focus:border-red-500 rounded-lg px-4 py-3.5 text-white outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(239,68,68,0.5)] placeholder:text-red-400/40"
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
                  <label className="block text-red-300 mb-2 font-medium">Team Name *</label>
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.005 }}
                  >
                    <input
                      type="text"
                      name="teamName"
                      value={formData.teamName}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border-2 border-red-800 focus:border-red-500 rounded-lg px-4 py-3.5 text-white outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(239,68,68,0.5)] placeholder:text-red-400/40"
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
                  <label className="block text-red-300 mb-2 font-medium">
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
                      className="w-full bg-black/50 border-2 border-red-800 focus:border-red-500 rounded-lg px-4 py-3.5 text-white outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(239,68,68,0.5)] placeholder:text-red-400/40"
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
                    <label className="block text-red-300 mb-2 font-medium">
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
                        className="w-full bg-black/50 border-2 border-red-800 focus:border-red-500 rounded-lg px-4 py-3.5 text-white outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(239,68,68,0.5)] placeholder:text-red-400/40"
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
                    <label className="block text-red-300 mb-2 font-medium">
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
                        className="w-full bg-black/50 border-2 border-red-800 focus:border-red-500 rounded-lg px-4 py-3.5 text-white outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(239,68,68,0.5)] placeholder:text-red-400/40"
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
                  <label className="block text-red-300 mb-2 font-medium">
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
                      className="w-full bg-black/50 border-2 border-red-800 focus:border-red-500 rounded-lg px-4 py-3.5 text-white outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(239,68,68,0.5)] placeholder:text-red-400/40"
                      placeholder="Enter Scholar ID"
                      required
                    />
                  </motion.div>
                </motion.div>
              </div>

              {/* Team Members Section */}
              <div className="space-y-5 pt-8">
                <div className="border-l-4 border-red-500 pl-4 mb-6">
                  <h3 className="text-xl font-bold text-red-400">Team Members</h3>
                  <p className="text-red-200 text-sm mt-1">Add your team members (minimum 4 required)</p>
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
                    <label className="block text-red-300 mb-2 font-medium">
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
                        className="w-full bg-black/50 border-2 border-red-800 focus:border-red-500 rounded-lg px-4 py-3.5 text-white outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(239,68,68,0.5)] placeholder:text-red-400/40"
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
                    <label className="block text-red-300 mb-2 font-medium">
                      Team Member {num} Name <span className="text-red-400/60">(Optional)</span>
                    </label>
                    <motion.div
                      whileHover={{ scale: 1.005 }}
                    >
                      <input
                        type="text"
                        name={`teamMember${num}`}
                        value={formData[`teamMember${num}`]}
                        onChange={handleInputChange}
                        className="w-full bg-black/50 border-2 border-red-800 focus:border-red-500 rounded-lg px-4 py-3.5 text-white outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(239,68,68,0.5)] placeholder:text-red-400/40"
                        placeholder={`Enter member ${num} name (optional)`}
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Payment Section */}
              <div className="space-y-6 pt-8">
                <div className="border-l-4 border-red-500 pl-4 mb-6">
                  <h3 className="text-xl font-bold text-red-400">Payment Information</h3>
                  <p className="text-red-200 text-sm mt-1">Complete the payment and upload proof</p>
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
                        <div className={`p-4 rounded-full ${fileUrl ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
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
                  <label className="block text-red-300 mb-2 font-medium">
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
                      className="w-full bg-black/50 border-2 border-red-800 focus:border-red-500 rounded-lg px-4 py-3.5 text-white outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(239,68,68,0.5)] placeholder:text-red-400/40 font-mono"
                      placeholder="Enter UPI transaction number"
                      required
                    />
                  </motion.div>
                  <p className="text-red-400/60 text-xs mt-2">
                    💡 Find this in your payment confirmation message
                  </p>
                </motion.div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-red-800 to-red-600 hover:from-red-700 hover:to-red-500 text-white font-bold py-4 px-8 rounded-md mt-8 relative overflow-hidden group"
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 17,
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2 text-xl">
                  Register My Team
                </span>
                <motion.div
                  className="absolute inset-0 bg-red-400/30"
                  initial={{
                    scale: 0,
                    x: '-50%',
                    y: '-50%',
                  }}
                  whileHover={{
                    scale: 3,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                  style={{
                    left: '50%',
                    top: '50%',
                    originX: 0.5,
                    originY: 0.5,
                  }}
                />
                <motion.div
                  className="absolute inset-0 opacity-70"
                  animate={{
                    boxShadow: [
                      '0 0 0px rgba(239,68,68,0.7)',
                      '0 0 20px rgba(239,68,68,0.7)',
                      '0 0 0px rgba(239,68,68,0.7)',
                    ],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
              </motion.button>
            </form>
          </motion.section>

          <AttentionSection />
          <KitComponentsSection />
          <PaymentDetailsSection registrationFee={registrationFee} />
        </motion.div>
      </div>
    </div>
  );
}

export default RobowarRegistration;
