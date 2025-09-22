import { useState } from "react";
import { MultiStepLoader } from "../../components/Merch_components/multi-step-loader";
import Merch_form_landing from './Merch_form_landing'
import ProgressBar from "react-scroll-progress-bar";

function MerchPay() {
  const [formData, setFormData] = useState({
    name: "",
    fromNITSilchar: "No",
    scholarId: "",
    type: "",
    size: "",
    wantName: "No",
    nameInTShirt: "",
    address: "",
    phone: "",
    paymentProofLink: "",
  });
  // Dynamically determine UPI amount based on selection
  let upiAmount = 0;
  if (formData.type === "Oversized" && formData.wantName === "Yes") upiAmount = 489;
  else if (formData.type === "Oversized" && formData.wantName === "No") upiAmount = 479;
  else if (formData.type === "Regular" && formData.wantName === "Yes") upiAmount = 409;
  else if (formData.type === "Regular" && formData.wantName === "No") upiAmount = 399;
  else if (formData.type === "Regular" && formData.fromNITSilchar === "No") upiAmount = 649;
  // UPI link 
  const upiLink = `upi://pay?pa=swarupchanda1963-1@okhdfcbank&pn=Swarup%20Chanda${upiAmount ? `&am=${upiAmount}` : ""}&cu=INR`;
  const [fileUrl, setFileUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const [currentSection, setCurrentSection] = useState(0);
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
        .catch((err) => {
          setUploading(false);
          alert("Upload error");
        });
    };
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate personal details
    if (!formData.name.trim()) {
      setModal({ open: true, message: "Please enter your full name.", success: false });
      return;
    }
    if (!formData.phone.trim()) {
      setModal({ open: true, message: "Please enter your phone number.", success: false });
      return;
    }
    if (!formData.address.trim()) {
      setModal({ open: true, message: "Please enter your address.", success: false });
      return;
    }
    if (formData.fromNITSilchar === "Yes" && !formData.scholarId.trim()) {
      setModal({ open: true, message: "Please enter your Scholar ID.", success: false });
      return;
    }
    if (!formData.type) {
      setModal({ open: true, message: "Please select merchandise type.", success: false });
      return;
    }
    if (!formData.size) {
      setModal({ open: true, message: "Please select merchandise size.", success: false });
      return;
    }
    if (!formData.wantName) {
      setModal({ open: true, message: "Please select if you want your name on the T-shirt.", success: false });
      return;
    }
    if (formData.wantName === "Yes" && !formData.nameInTShirt.trim()) {
      setModal({ open: true, message: "Please enter the name to be printed on the T-shirt.", success: false });
      return;
    }
    if (!formData.paymentProofLink) {
      setModal({ open: true, message: "Please upload payment proof before submitting.", success: false });
      return;
    }
    setSubmitting(true);
    try {
      const timestamp = new Date().toISOString();
      const params = new URLSearchParams();
      params.append("Timestamp", timestamp);
      params.append("Name", formData.name);
      params.append("IsNITS", formData.fromNITSilchar);
      params.append("ScholarId", formData.fromNITSilchar === "Yes" ? formData.scholarId : "0000000");
      params.append("Type", formData.type);
      params.append("Size", formData.size);
      params.append("WantName", formData.wantName);
      params.append("NameOnTShirt", formData.wantName === "Yes" ? formData.nameInTShirt : "");
      params.append("Address", formData.address);
      params.append("Phone", formData.phone);
      params.append("ScreenshotLink", formData.paymentProofLink);
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
        name: "",
        fromNITSilchar: "No",
        scholarId: "",
        type: "",
        size: "",
        wantName: "No",
        nameInTShirt: "",
        address: "",
        phone: "",
        paymentProofLink: "",
      });
      setFileUrl("");
    } catch (err) {
      setModal({ open: true, message: "Error submitting form.", success: false });
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };


  const scrollToSection = (index) => {
    setCurrentSection(index);
    const sections = document.querySelectorAll(".form-section");
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-black min-h-screen w-full font-sans relative overflow-x-hidden">
      {/* Modal for alerts */}
      {modal.open && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm px-2">
          <div className={`w-full max-w-md md:max-w-md sm:max-w-xs rounded-2xl shadow-2xl p-6 sm:p-4 border-2 ${modal.success ? 'border-cyan-400 bg-gradient-to-br from-cyan-900/90 to-cyan-700/80' : 'border-fuchsia-400 bg-gradient-to-br from-fuchsia-900/90 to-fuchsia-700/80'} animate-fade-in`}>
            <div className="flex flex-col items-center gap-4">
              <div className={`rounded-full p-3 ${modal.success ? 'bg-cyan-400/20' : 'bg-fuchsia-400/20'}`}>
                {modal.success ? (
                  <svg className="w-10 h-10 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                ) : (
                  <svg className="w-10 h-10 text-fuchsia-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                )}
              </div>
              <div className="text-center">
                <h3 className={`text-xl sm:text-lg font-bold mb-2 ${modal.success ? 'text-cyan-200' : 'text-fuchsia-200'}`}>{modal.success ? 'Order Status' : 'Error'}</h3>
                <p className="text-base sm:text-sm text-white whitespace-pre-line break-words">{modal.message}</p>
              </div>
              <button
                onClick={() => setModal({ ...modal, open: false })}
                className={`mt-4 px-6 py-2 rounded-lg font-semibold shadow transition-all duration-200 w-full max-w-[200px] ${modal.success ? 'bg-cyan-400 text-cyan-900 hover:bg-cyan-300' : 'bg-fuchsia-400 text-fuchsia-900 hover:bg-fuchsia-300'}`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Loader overlay */}
      <MultiStepLoader
        loadingStates={[
          { text: "Placing your order..." },
          { text: "Processing payment..." },
          { text: "Finalizing..." },
        ]}
        loading={submitting}
        duration={1200}
        loop={true}
      />
      <Merch_form_landing />
        <ProgressBar duration="0.01"/>

      {/* Navigation dots with neon effect */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
        {[0, 1, 2, 3].map((index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`w-3 h-3 rounded-full border-2 border-cyan-400 shadow-[0_0_8px_2px_#22d3ee] transition-all duration-300 ${currentSection === index
              ? "bg-cyan-400 scale-150 shadow-[0_0_16px_4px_#22d3ee]"
              : "bg-slate-700 hover:bg-cyan-500"
              }`}
            aria-label={`Navigate to section ${index + 1}`}
          />
        ))}
      </div>

      <main className="relative z-10 w-full max-w-3xl mx-auto px-4 py-8">

        {/* Personal Details Section */}
        <section className="form-section min-h-screen py-16 flex flex-col justify-center">
          <div className="bg-gradient-to-br from-[#1e293b]/80 to-[#0f172a]/90 border border-cyan-400/30 shadow-[0_8px_32px_0_#22d3ee33] rounded-3xl backdrop-blur-xl p-8 mb-8 relative overflow-hidden">

            <div className="absolute -top-8 -right-8 w-32 h-32 bg-cyan-400 opacity-10 rounded-full blur-2xl animate-pulse" />
            <h2 className="text-2xl font-spaced md:text-3xl font-extrabold text-cyan-300 mb-6 border-b border-cyan-700 pb-4 tracking-wide drop-shadow-lg">
              Personal Details
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-cyan-700 bg-[#0f172a]/60 text-cyan-100 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all placeholder:text-cyan-400/60 shadow-inner"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1">
                  From NIT Silchar?
                </label>
                <select
                  name="fromNITSilchar"
                  value={formData.fromNITSilchar}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-cyan-700 bg-[#0f172a]/60 text-cyan-100 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              {formData.fromNITSilchar === "Yes" && (
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-1">
                    Scholar ID
                  </label>
                  <input
                    type="text"
                    name="scholarId"
                    value={formData.scholarId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-cyan-700 bg-[#0f172a]/60 text-cyan-100 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all placeholder:text-cyan-400/60 shadow-inner"
                    placeholder="Enter Scholar ID"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1">
                  Phone Number (10 Digits)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  pattern="[0-9]{10,15}"
                  className="w-full px-4 py-3 rounded-xl border border-cyan-700 bg-[#0f172a]/60 text-cyan-100 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all placeholder:text-cyan-400/60 shadow-inner"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-cyan-700 bg-[#0f172a]/60 text-cyan-100 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all placeholder:text-cyan-400/60 shadow-inner"
                  placeholder={
                    formData.fromNITSilchar === "Yes"
                      ? "Enter Hostel Number"
                      : "Enter Full Address"
                  }
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={() => scrollToSection(1)}
              className="relative inline-flex h-12 active:scale-95 transistion overflow-hidden rounded-lg p-[1px] focus:outline-none"
            >
              <span
                className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e7029a_0%,#f472b6_50%,#bd5fff_100%)]"
              >
              </span>
              <span
                className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 undefined"
              >
                Continue to Merchandise Selection
              </span>
            </button>
          </div>
        </section>

        {/* Merchandise Section */}
        <section className="form-section min-h-screen py-16 flex flex-col justify-center">
          <div className="bg-gradient-to-br from-[#1e293b]/80 to-[#0f172a]/90 border border-fuchsia-400/30 shadow-[0_8px_32px_0_#a21caf33] rounded-3xl backdrop-blur-xl p-8 mb-8 relative overflow-hidden">
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-fuchsia-400 opacity-10 rounded-full blur-2xl animate-pulse" />
            <h2 className="text-2xl font-spaced md:text-3xl font-extrabold text-fuchsia-300 mb-6 border-b border-fuchsia-700 pb-4 tracking-wide drop-shadow-lg">
              Merchandise Selection
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1">
                  Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-fuchsia-700 bg-[#0f172a]/60 text-fuchsia-100 focus:ring-2 focus:ring-fuchsia-400 focus:border-fuchsia-400 transition-all"
                >
                  <option value="">Select Type</option>
                  <option value="Regular">Regular-sized</option>
                  <option value="Oversized">Over-sized</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1">
                  Size
                </label>
                {/* Size Chart Tables */}
                <div className="mb-4">
                  {formData.type === "Regular" && (
                    <div className="w-full overflow-x-auto animate-fade-in">
                      <table className="w-full text-xs md:text-sm text-cyan-100 border-separate border-spacing-y-1 bg-[#0f172a]/80 rounded-xl shadow-lg">
                        <caption className="text-cyan-300 font-bold mb-2 text-base md:text-lg">Regular-sized Size Chart (in inches)</caption>
                        <thead>
                          <tr className="bg-cyan-900/60">
                            <th className="px-3 py-2 rounded-tl-xl">Size</th>
                            <th className="px-3 py-2">Chest</th>
                            <th className="px-3 py-2">Length</th>
                            <th className="px-3 py-2 rounded-tr-xl">Sleeve</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="hover:bg-cyan-800/30">
                            <td className="px-6 py-2">S</td>
                            <td className="px-6 py-2">38</td>
                            <td className="px-6 py-2">26</td>
                            <td className="px-6 py-2">7</td>
                          </tr>
                          <tr className="hover:bg-cyan-800/30">
                            <td className="px-6 py-2">M</td>
                            <td className="px-6 py-2">40</td>
                            <td className="px-6 py-2">27</td>
                            <td className="px-6 py-2">7.5</td>
                          </tr>
                          <tr className="hover:bg-cyan-800/30">
                            <td className="px-6 py-2">L</td>
                            <td className="px-6 py-2">42</td>
                            <td className="px-6 py-2">28</td>
                            <td className="px-6 py-2">8</td>
                          </tr>
                          <tr className="hover:bg-cyan-800/30">
                            <td className="px-6 py-2">XL</td>
                            <td className="px-6 py-2">44</td>
                            <td className="px-6 py-2">29</td>
                            <td className="px-6 py-2">8.5</td>
                          </tr>
                          <tr className="hover:bg-cyan-800/30">
                            <td className="px-6 py-2">XXL</td>
                            <td className="px-6 py-2">46</td>
                            <td className="px-6 py-2">30</td>
                            <td className="px-6 py-2">9</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                  {formData.type === "Oversized" && (
                    <div className="w-full overflow-x-auto animate-fade-in">
                      <table className="w-full text-xs md:text-sm text-fuchsia-100 border-separate border-spacing-y-1 bg-[#1e193b]/80 rounded-xl shadow-lg">
                        <caption className="text-fuchsia-300 font-bold mb-2 text-base md:text-lg">Over-sized Size Chart (in inches)</caption>
                        <thead>
                          <tr className="bg-fuchsia-900/60">
                            <th className="px-3 py-2 rounded-tl-xl">Size</th>
                            <th className="px-3 py-2">Chest</th>
                            <th className="px-3 py-2">Body Length</th>
                            <th className="px-3 py-2">Sleeve Length</th>
                            <th className="px-3 py-2">Sleeve Open</th>
                            <th className="px-3 py-2 rounded-tr-xl">Shoulder</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="hover:bg-fuchsia-800/30">
                            <td className="px-6 py-2">S</td>
                            <td className="px-6 py-2">21</td>
                            <td className="px-6 py-2">26.5</td>
                            <td className="px-6 py-2">9.5</td>
                            <td className="px-6 py-2">7.5</td>
                            <td className="px-6 py-2">20</td>
                          </tr>
                          <tr className="hover:bg-fuchsia-800/30">
                            <td className="px-6 py-2">M</td>
                            <td className="px-6 py-2">22</td>
                            <td className="px-6 py-2">27.5</td>
                            <td className="px-6 py-2">10</td>
                            <td className="px-6 py-2">8</td>
                            <td className="px-6 py-2">21</td>
                          </tr>
                          <tr className="hover:bg-fuchsia-800/30">
                            <td className="px-6 py-2">L</td>
                            <td className="px-6 py-2">23</td>
                            <td className="px-6 py-2">28.5</td>
                            <td className="px-6 py-2">10.5</td>
                            <td className="px-6 py-2">8.5</td>
                            <td className="px-6 py-2">22</td>
                          </tr>
                          <tr className="hover:bg-fuchsia-800/30">
                            <td className="px-6 py-2">XL</td>
                            <td className="px-6 py-2">24</td>
                            <td className="px-6 py-2">29.5</td>
                            <td className="px-6 py-2">11</td>
                            <td className="px-6 py-2">9</td>
                            <td className="px-6 py-2">23</td>
                          </tr>
                          <tr className="hover:bg-fuchsia-800/30">
                            <td className="px-6 py-2">XXL</td>
                            <td className="px-6 py-2">25</td>
                            <td className="px-6 py-2">30.5</td>
                            <td className="px-6 py-2">11</td>
                            <td className="px-6 py-2">9</td>
                            <td className="px-6 py-2">23</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-2">
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <label key={size} className="cursor-pointer">
                      <input
                        type="radio"
                        name="size"
                        value={size}
                        checked={formData.size === size}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div
                        className={`flex items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 shadow-inner ${formData.size === size
                          ? (formData.type === "T-Shirt" ? "border-fuchsia-400 bg-fuchsia-900/30 shadow-[0_0_16px_2px_#a21caf55] scale-105" : "border-cyan-400 bg-cyan-900/30 shadow-[0_0_16px_2px_#22d3ee55] scale-105")
                          : (formData.type === "T-Shirt" ? "border-fuchsia-900 bg-[#0f172a]/60 hover:border-fuchsia-400" : "border-cyan-900 bg-[#0f172a]/60 hover:border-cyan-400")
                          }`}
                      >
                        <span
                          className={`font-bold text-lg tracking-wider ${formData.size === size
                            ? (formData.type === "T-Shirt" ? "text-fuchsia-200" : "text-cyan-200")
                            : (formData.type === "T-Shirt" ? "text-fuchsia-400/70" : "text-cyan-400/70")
                            }`}
                        >
                          {size}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1">
                  Want Name in T-Shirt?
                </label>
                <select
                  name="wantName"
                  value={formData.wantName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-fuchsia-700 bg-[#0f172a]/60 text-fuchsia-100 focus:ring-2 focus:ring-fuchsia-400 focus:border-fuchsia-400 transition-all"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              {formData.wantName === "Yes" && (
                <div>
                  <label className="block text-sm font-medium text-fuchsia-200 mb-1">
                    Name in T-Shirt (Max 7 Letters)
                  </label>
                  <input
                    type="text"
                    name="nameInTShirt"
                    value={formData.nameInTShirt}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-fuchsia-700 bg-[#0f172a]/60 text-fuchsia-100 focus:ring-2 focus:ring-fuchsia-400 focus:border-fuchsia-400 transition-all placeholder:text-fuchsia-400/60 shadow-inner"
                    placeholder="Enter name to be printed"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={() => scrollToSection(2)}
              className="relative inline-flex h-12 active:scale-95 transistion overflow-hidden rounded-lg p-[1px] focus:outline-none"
            >
              <span
                className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e7029a_0%,#f472b6_50%,#bd5fff_100%)]"
              >
              </span>
              <span
                className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 undefined"
              >
                Continue to Payment
              </span>
            </button>
          </div>
        </section>

        {/* Payment Section */}
        <section className="form-section min-h-screen py-16 flex flex-col justify-center">
          <div className="bg-gradient-to-br from-[#1e293b]/80 to-[#0f172a]/90 border border-cyan-400/30 shadow-[0_8px_32px_0_#22d3ee33] rounded-3xl backdrop-blur-xl p-8 mb-8 relative overflow-hidden">
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-cyan-400 opacity-10 rounded-full blur-2xl animate-pulse" />
            <h2 className="text-2xl font-spaced md:text-3xl font-extrabold text-cyan-300 mb-6 border-b border-cyan-700 pb-4 tracking-wide drop-shadow-lg">
              Payment
            </h2>
            {/* Pricing Details */}
            <div className="mb-8 w-full max-w-lg mx-auto bg-cyan-900/30 border border-cyan-400/40 rounded-xl p-4 shadow-md animate-fade-in">
              <h3 className="text-lg font-bold text-cyan-200 mb-2 text-center">T-Shirt Pricing</h3>
              <table className="w-full text-sm text-cyan-100">
                <thead>
                  <tr>
                    <th className="py-1 px-2 text-left">Variant</th>
                    <th className="py-1 px-2 text-left">With Name</th>
                    <th className="py-1 px-2 text-left">Without Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-cyan-400/20">
                    <td className="py-1 px-2 font-semibold">Regular-sized T-Shirt</td>
                    <td className="py-1 px-2">₹409</td>
                    <td className="py-1 px-2">₹399</td>
                  </tr>
                  <tr className="border-t border-cyan-400/20">
                    <td className="py-1 px-2 font-semibold">Over-sized T-shirt</td>
                    <td className="py-1 px-2">₹489</td>
                    <td className="py-1 px-2">₹479</td>
                  </tr>
                  <tr className="border-t border-cyan-400/20">
                    <td className="py-1 px-2 font-semibold">Non-nitians</td>
                    <td className="py-1 px-2">₹649</td>
                    <td className="py-1 px-2">₹639</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-xs text-cyan-300 mt-2 text-center">Please pay the exact amount as per your selection below.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
              {/* QR Code and UPI Pay */}
              <div className="flex-1 flex flex-col items-center justify-center">
                <img
                  src="/tshirt/qr_code.jpg"
                  alt="Payment QR Code"
                  className="w-48 h-48 rounded-xl shadow-lg border-2 border-cyan-400 mb-4 bg-white object-contain"
                />
                <p className="text-cyan-200 text-sm mb-2 text-center">Scan this QR code to pay via any UPI app</p>
                <a
                  href={upiLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center w-full"
                >
                  <button
                    type="button"
                    className="flex items-center gap-3 px-5 py-1 bg-gradient-to-r from-[#00897B] to-[#4DD0E1] text-white font-bold rounded-2xl shadow-lg border-2 border-[#00897B]/60 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 w-9/12 max-w-xs justify-center"
                  >
                    <img src="/tshirt/UPI-Logo-vector.svg" alt="BHIM UPI Logo" className="w-11 h-11 bg-transparent rounded p-1 " />
                    <span className="text-md font-bold tracking-wide">Pay with UPI</span>
                  </button>
                  <span className="text-xs text-cyan-100 mt-2 text-center"></span>
                </a>
                <p className="text-sm text-cyan-400 text-center mt-2">Click to pay via any UPI app (GPay/Phonepe/Paytm.)</p>
              </div>
              {/* Upload Section */}
              <div className="flex-1 flex flex-col items-center justify-center mt-6 md:mt-0">
                <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm flex flex-col items-center">
                  <label className="block text-base font-semibold text-cyan-200 mb-3 text-center tracking-wide">
                    Upload Payment Receipt <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative w-full rounded-2xl border-2 border-dashed border-cyan-400/60 bg-gradient-to-br from-[#0f172a]/70 to-[#1e293b]/80 shadow-lg p-4 sm:p-6 flex flex-col items-center transition-all duration-300 hover:border-cyan-300">
                    <input
                      type="file"
                      accept="application/pdf,image/*"
                      onChange={uploader}
                      required={!fileUrl}
                      className="block w-full text-sm text-cyan-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-900/80 file:text-cyan-300 hover:file:bg-cyan-800/80 focus:outline-none focus:ring-2 focus:ring-cyan-400 mb-2 cursor-pointer"
                    />
                    {uploading && (
                      <span className="text-cyan-400 animate-pulse mt-2">Uploading...</span>
                    )}
                    {fileUrl && (
                      <span className="text-green-400 mt-2 flex flex-col items-center">
                        <svg className="w-7 h-7 mb-1 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        Uploaded! <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="underline text-cyan-300 break-all">View File</a>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-cyan-400 mt-3 text-center leading-snug">Attach a screenshot or PDF of your payment receipt.<br />Accepted: JPG, PNG, PDF. Max size: 5MB.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={() => scrollToSection(3)}
              className="relative inline-flex h-12 active:scale-95 transistion overflow-hidden rounded-lg p-[1px] focus:outline-none"
            >
              <span
                className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e7029a_0%,#f472b6_50%,#bd5fff_100%)]"
              >
              </span>
              <span
                className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 undefined"
              >
                Continue to Review Order
              </span>
            </button>
          </div>
        </section>

        {/* Summary Section */}
        <section className="form-section min-h-screen py-16 flex flex-col justify-center">
          <div className="bg-gradient-to-br from-[#1e293b]/80 to-[#0f172a]/90 border border-fuchsia-400/30 shadow-[0_8px_32px_0_#a21caf33] rounded-3xl backdrop-blur-xl p-8 mb-8 relative overflow-hidden">
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-fuchsia-400 opacity-10 rounded-full blur-2xl animate-pulse" />
            <h2 className="text-2xl font-spaced md:text-3xl font-extrabold text-fuchsia-300 mb-6 border-b border-fuchsia-700 pb-4 tracking-wide drop-shadow-lg">
              Order Summary
            </h2>
            <div className="space-y-4 text-fuchsia-100">
              <p>
                <b>Name:</b> {formData.name}
              </p>
              <p>
                <b>From NIT Silchar:</b> {formData.fromNITSilchar}
              </p>
              {formData.fromNITSilchar === "Yes" && (
                <p>
                  <b>Scholar ID:</b> {formData.scholarId}
                </p>
              )}
              <p>
                <b>Phone:</b> {formData.phone}
              </p>
              <p>
                <b>Address:</b> {formData.address}
              </p>
              <p>
                <b>Type:</b> {formData.type}
              </p>
              <p>
                <b>Size:</b> {formData.size}
              </p>
              <p>
                <b>Want Name in T-Shirt:</b> {formData.wantName}
              </p>
              {formData.wantName === "Yes" && (
                <p>
                  <b>Name in T-Shirt:</b> {formData.nameInTShirt}
                </p>
              )}
              <p>
                <b>Payment Proof:</b> {formData.paymentProofLink ? (
                  <a href={formData.paymentProofLink} className="text-blue-600 underline break-all" target="_blank" rel="noopener noreferrer">View File</a>
                ) : "Pending"}
              </p>
            </div>
            <div className="mt-5 p-4 rounded-lg border border-fuchsia-700">
              <p className="text-center text-blue-400">
                Please verify all details before submitting your order. Once
                submitted, changes cannot be made.
              </p>
            </div>
            <div className="flex justify-center pt-6">
              <button
                onClick={handleSubmit}
                className="relative inline-flex h-12 active:scale-95 transistion overflow-hidden rounded-lg p-[1px] focus:outline-none"
              >
                <span
                  className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e7029a_0%,#f472b6_50%,#bd5fff_100%)]"
                >
                </span>
                <span
                  className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-md font-medium text-white backdrop-blur-3xl gap-2 undefined"
                >
                  Submit Order
                </span>
              </button>
            </div>
          </div>
          <div className="text-center mt-8 text-gray-600">
            <p>Thank you for your order!</p>
            <p className="mt-2 text-sm">
              For any queries, contact:{' '}
              <a
                href="mailto:nerds@robotics.club"
                className="text-blue-600 hover:underline"
              >
                nerds@nits.ac.in
              </a>
            </p>
          </div>
          <div className="mt-8 text-center">
            <h3 className="text-lg font-semibold text-cyan-200 mb-2">
              Facing Payment Issues?
            </h3>
            <p className="text-sm text-cyan-400 leading-relaxed">
              If you encounter any problems with the payment process, please reach out to our team:
            </p>
            <p className="text-sm text-cyan-300 mt-2">
              📧 Email: <a href="mailto:nerds@nits.ac.in" className="underline text-cyan-200 hover:text-cyan-100">nerds.merch@club.com</a><br />
              📱 Phone/WhatsApp: <a href="tel:+916003501567" className="underline text-cyan-200 hover:text-cyan-100">+91 60035 01567</a>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default MerchPay;
