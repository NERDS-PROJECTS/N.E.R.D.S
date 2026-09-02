import { useState } from "react";
import { MultiStepLoader } from "../../components/Merch_components/multi-step-loader";
import Merch_form_landing from './Merch_form_landing'
import ProgressBar from "react-scroll-progress-bar";

function MerchPay() {
  const [formData, setFormData] = useState({
    name: "",
    fromNITSilchar: "No",
    scholarId: "",
    email:"",
    type: "",
    size: "",
    wantName: "No",
    nameInTShirt: "",
    tshirtTheme:"",
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

  // Toggle to close orders instantly (no backend change needed)
  const ORDERS_CLOSED = false;

  // Change this to your actual deployed Apps Script Web App URL
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyxwihTQ_L0z7CVHEgbr2SlMiUF5Q80WlDvlLmlErJYq3E-BvNrg_WzL-3SNKI2ufrI/exec";
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
        "https://script.google.com/macros/s/AKfycbyxwihTQ_L0z7CVHEgbr2SlMiUF5Q80WlDvlLmlErJYq3E-BvNrg_WzL-3SNKI2ufrI/exec",
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
          console.error(err);
        });
    };
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Block submissions when orders are closed
    if (ORDERS_CLOSED) {
      setModal({ open: true, message: "Orders are closed now. Submissions are disabled.", success: false });
      return;
    }
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
    if (!formData.email.trim()) {
      setModal({ open: true, message: "Please enter your email address.", success: false });
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
      params.append("Email", formData.email);
      params.append("Size", formData.size);
      params.append("WantName", formData.wantName);
      params.append("NameOnTShirt", formData.wantName === "Yes" ? formData.nameInTShirt : "");
      params.append("Address", formData.address);
      params.append("Phone", formData.phone);
      params.append("ScreenshotLink", formData.paymentProofLink);
      params.append("TshirtTheme",formData.tshirtTheme);
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
        email:"",
        type: "",
        size: "",
        wantName: "No",
        nameInTShirt: "",
        address: "",
        phone: "",
        paymentProofLink: "",
        tshirtTheme:""
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
    <div className="bg-[#080305] min-h-screen w-full font-sans relative overflow-x-hidden text-red-100 selection:bg-red-600 selection:text-white">
      {/* Modal for alerts */}
      {modal.open && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md px-2">
          <div className={`w-full max-w-md md:max-w-md sm:max-w-xs rounded-2xl shadow-[0_0_50px_rgba(225,29,72,0.4)] p-6 sm:p-4 border-2 ${modal.success ? 'border-red-500 bg-gradient-to-br from-red-950 via-[#1a0509] to-black' : 'border-rose-600 bg-gradient-to-br from-rose-950 via-[#1a0005] to-black'} animate-fade-in`}>
            <div className="flex flex-col items-center gap-4">
              <div className={`rounded-full p-3 ${modal.success ? 'bg-red-500/20 shadow-[0_0_15px_#ef4444]' : 'bg-rose-500/20 shadow-[0_0_15px_#f43f5e]'}`}>
                {modal.success ? (
                  <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                ) : (
                  <svg className="w-10 h-10 text-rose-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                )}
              </div>
              <div className="text-center">
                <h3 className={`text-xl sm:text-lg font-bold mb-2 tracking-wider uppercase ${modal.success ? 'text-red-400 drop-shadow-[0_0_8px_#ef4444]' : 'text-rose-400 drop-shadow-[0_0_8px_#f43f5e]'}`}>{modal.success ? 'Order Status' : 'Error'}</h3>
                <p className="text-base sm:text-sm text-zinc-300 whitespace-pre-line break-words">{modal.message}</p>
              </div>
              <button
                onClick={() => setModal({ ...modal, open: false })}
                className={`mt-4 px-6 py-2 rounded-lg font-bold uppercase tracking-wider shadow-lg transition-all duration-300 w-full max-w-[200px] ${modal.success ? 'bg-red-600 text-black hover:bg-red-500 hover:shadow-[0_0_20px_#ef4444]' : 'bg-rose-600 text-black hover:bg-rose-500 hover:shadow-[0_0_20px_#f43f5e]'}`}
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

      {ORDERS_CLOSED && (
        <div className="mx-auto max-w-3xl px-4 mt-6">
          <div className="rounded-2xl border-2 border-red-600/80 bg-gradient-to-r from-red-950/90 via-black to-red-950/90 text-red-200 shadow-[0_0_30px_rgba(225,29,72,0.5)] p-4 text-center">
            <p className="text-base md:text-lg font-bold tracking-widest uppercase text-red-400 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">
              Orders are closed now. Form submissions are disabled.
            </p>
          </div>
        </div>
      )}

      {/* Navigation dots with neon Ultron effect */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
        {[0, 1, 2, 3].map((index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`w-3 h-3 rounded-full border-2 border-red-500 shadow-[0_0_10px_#ef4444] transition-all duration-300 ${currentSection === index
              ? "bg-red-600 scale-150 shadow-[0_0_20px_#ef4444]"
              : "bg-zinc-900 hover:bg-red-700"
              }`}
            aria-label={`Navigate to section ${index + 1}`}
          />
        ))}
      </div>

      <main className="relative z-10 w-full max-w-3xl mx-auto px-4 py-8">

        {/* Personal Details Section */}
        <section className="form-section min-h-screen py-16 flex flex-col justify-center">
          <div className="bg-gradient-to-br from-[#120306]/90 via-[#0a0204]/95 to-black border border-red-600/40 shadow-[0_0_35px_rgba(225,29,72,0.25)] rounded-3xl backdrop-blur-xl p-8 mb-8 relative overflow-hidden">

            <div className="absolute -top-8 -right-8 w-32 h-32 bg-red-600 opacity-20 rounded-full blur-3xl animate-pulse" />
            <h2 className="text-2xl font-spaced md:text-3xl font-extrabold text-red-500 mb-6 border-b border-red-900/80 pb-4 tracking-widest uppercase drop-shadow-[0_0_12px_rgba(239,68,68,0.7)]">
              Personal Details
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1 tracking-wide">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-red-900/80 bg-black/70 text-red-100 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all placeholder:text-red-900/60 shadow-inner"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1 tracking-wide">
                  From NIT Silchar?
                </label>
                <select
                  name="fromNITSilchar"
                  value={formData.fromNITSilchar}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-red-900/80 bg-black/70 text-red-100 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all"
                >
                  <option value="Yes" className="bg-black text-red-100">Yes</option>
                  <option value="No" className="bg-black text-red-100">No</option>
                </select>
              </div>

              {formData.fromNITSilchar === "Yes" && (
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1 tracking-wide">
                    Scholar ID
                  </label>
                  <input
                    type="text"
                    name="scholarId"
                    value={formData.scholarId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-red-900/80 bg-black/70 text-red-100 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all placeholder:text-red-900/60 shadow-inner"
                    placeholder="Enter Scholar ID"
                    required
                  />
                </div>
              )}
              <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1 tracking-wide">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-red-900/80 bg-black/70 text-red-100 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all placeholder:text-red-900/60 shadow-inner"
                    placeholder="Enter Email ID"
                    required
                  />
                </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1 tracking-wide">
                  Phone Number (10 Digits)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  pattern="[0-9]{10,15}"
                  className="w-full px-4 py-3 rounded-xl border border-red-900/80 bg-black/70 text-red-100 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all placeholder:text-red-900/60 shadow-inner"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1 tracking-wide">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-red-900/80 bg-black/70 text-red-100 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all placeholder:text-red-900/60 shadow-inner"
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
              className="relative inline-flex h-12 active:scale-95 transition overflow-hidden rounded-lg p-[1px] focus:outline-none"
            >
              <span
                className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#990000_0%,#ff1a1a_50%,#400000_100%)]"
              >
              </span>
              <span
                className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-black px-7 text-sm font-bold tracking-wider text-red-400 backdrop-blur-3xl gap-2 hover:text-white transition-colors"
              >
                Continue to Merchandise Selection
              </span>
            </button>
          </div>
        </section>

        {/* Merchandise Section */}
        <section className="form-section min-h-screen py-16 flex flex-col justify-center">
          <div className="bg-gradient-to-br from-[#120306]/90 via-[#0a0204]/95 to-black border border-red-600/40 shadow-[0_0_35px_rgba(225,29,72,0.25)] rounded-3xl backdrop-blur-xl p-8 mb-8 relative overflow-hidden">
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-red-600 opacity-20 rounded-full blur-3xl animate-pulse" />
            <h2 className="text-2xl font-spaced md:text-3xl font-extrabold text-red-500 mb-6 border-b border-red-900/80 pb-4 tracking-widest uppercase drop-shadow-[0_0_12px_rgba(239,68,68,0.7)]">
              Merchandise Selection
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1 tracking-wide">
                  Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-red-900/80 bg-black/70 text-red-100 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all"
                >
                  <option value="" className="bg-black text-red-100">Select Type</option>
                  <option value="Regular" className="bg-black text-red-100">Regular-sized</option>
                  <option value="Oversized" className="bg-black text-red-100">Over-sized</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1 tracking-wide">
                  COLOR
                </label>
                <select
                  name="tshirtTheme"
                  value={formData.tshirtTheme}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-red-900/80 bg-black/70 text-red-100 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all"
                >
                  <option value="" className="bg-black text-red-100">Select Color</option>
                  <option value="White" className="bg-black text-red-100">White</option>
                  <option value="Black" className="bg-black text-red-100">Black</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1 tracking-wide">
                  Size
                </label>
                {/* Size Chart Tables */}
                <div className="mb-4">
                  {formData.type === "Regular" && (
                    <div className="w-full overflow-x-auto animate-fade-in">
                      <table className="w-full text-xs md:text-sm text-red-100 border-separate border-spacing-y-1 bg-black/80 rounded-xl shadow-lg border border-red-900/50">
                        <caption className="text-red-400 font-bold mb-2 text-base md:text-lg tracking-wider uppercase drop-shadow-[0_0_8px_#ef4444]">Regular-sized Size Chart (in inches)</caption>
                        <thead>
                          <tr className="bg-red-950/80 text-red-300">
                            <th className="px-3 py-2 rounded-tl-xl border-b border-red-900">Size</th>
                            <th className="px-3 py-2 border-b border-red-900">Chest</th>
                            <th className="px-3 py-2 border-b border-red-900">Length</th>
                            <th className="px-3 py-2 rounded-tr-xl border-b border-red-900">Sleeve</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="hover:bg-red-900/30 transition-colors">
                            <td className="px-6 py-2 text-center">S</td>
                            <td className="px-6 py-2 text-center">38</td>
                            <td className="px-6 py-2 text-center">26</td>
                            <td className="px-6 py-2 text-center">7</td>
                          </tr>
                          <tr className="hover:bg-red-900/30 transition-colors">
                            <td className="px-6 py-2 text-center">M</td>
                            <td className="px-6 py-2 text-center">40</td>
                            <td className="px-6 py-2 text-center">27</td>
                            <td className="px-6 py-2 text-center">7.5</td>
                          </tr>
                          <tr className="hover:bg-red-900/30 transition-colors">
                            <td className="px-6 py-2 text-center">L</td>
                            <td className="px-6 py-2 text-center">42</td>
                            <td className="px-6 py-2 text-center">28</td>
                            <td className="px-6 py-2 text-center">8</td>
                          </tr>
                          <tr className="hover:bg-red-900/30 transition-colors">
                            <td className="px-6 py-2 text-center">XL</td>
                            <td className="px-6 py-2 text-center">44</td>
                            <td className="px-6 py-2 text-center">29</td>
                            <td className="px-6 py-2 text-center">8.5</td>
                          </tr>
                          <tr className="hover:bg-red-900/30 transition-colors">
                            <td className="px-6 py-2 text-center">XXL</td>
                            <td className="px-6 py-2 text-center">46</td>
                            <td className="px-6 py-2 text-center">30</td>
                            <td className="px-6 py-2 text-center">9</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                  {formData.type === "Oversized" && (
                    <div className="w-full overflow-x-auto animate-fade-in">
                      <table className="w-full text-xs md:text-sm text-red-100 border-separate border-spacing-y-1 bg-black/80 rounded-xl shadow-lg border border-red-900/50">
                        <caption className="text-red-400 font-bold mb-2 text-base md:text-lg tracking-wider uppercase drop-shadow-[0_0_8px_#ef4444]">Over-sized Size Chart (in inches)</caption>
                        <thead>
                          <tr className="bg-red-950/80 text-red-300">
                            <th className="px-3 py-2 rounded-tl-xl border-b border-red-900">Size</th>
                            <th className="px-3 py-2 border-b border-red-900">Chest</th>
                            <th className="px-3 py-2 border-b border-red-900">Body Length</th>
                            <th className="px-3 py-2 border-b border-red-900">Sleeve Length</th>
                            <th className="px-3 py-2 border-b border-red-900">Sleeve Open</th>
                            <th className="px-3 py-2 rounded-tr-xl border-b border-red-900">Shoulder</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="hover:bg-red-900/30 transition-colors">
                            <td className="px-6 py-2 text-center">S</td>
                            <td className="px-6 py-2 text-center">21</td>
                            <td className="px-6 py-2 text-center">26.5</td>
                            <td className="px-6 py-2 text-center">9.5</td>
                            <td className="px-6 py-2 text-center">7.5</td>
                            <td className="px-6 py-2 text-center">20</td>
                          </tr>
                          <tr className="hover:bg-red-900/30 transition-colors">
                            <td className="px-6 py-2 text-center">M</td>
                            <td className="px-6 py-2 text-center">22</td>
                            <td className="px-6 py-2 text-center">27.5</td>
                            <td className="px-6 py-2 text-center">10</td>
                            <td className="px-6 py-2 text-center">8</td>
                            <td className="px-6 py-2 text-center">21</td>
                          </tr>
                          <tr className="hover:bg-red-900/30 transition-colors">
                            <td className="px-6 py-2 text-center">L</td>
                            <td className="px-6 py-2 text-center">23</td>
                            <td className="px-6 py-2 text-center">28.5</td>
                            <td className="px-6 py-2 text-center">10.5</td>
                            <td className="px-6 py-2 text-center">8.5</td>
                            <td className="px-6 py-2 text-center">22</td>
                          </tr>
                          <tr className="hover:bg-red-900/30 transition-colors">
                            <td className="px-6 py-2 text-center">XL</td>
                            <td className="px-6 py-2 text-center">24</td>
                            <td className="px-6 py-2 text-center">29.5</td>
                            <td className="px-6 py-2 text-center">11</td>
                            <td className="px-6 py-2 text-center">9</td>
                            <td className="px-6 py-2 text-center">23</td>
                          </tr>
                          <tr className="hover:bg-red-900/30 transition-colors">
                            <td className="px-6 py-2 text-center">XXL</td>
                            <td className="px-6 py-2 text-center">25</td>
                            <td className="px-6 py-2 text-center">30.5</td>
                            <td className="px-6 py-2 text-center">11</td>
                            <td className="px-6 py-2 text-center">9</td>
                            <td className="px-6 py-2 text-center">23</td>
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
                          ? "border-red-500 bg-red-950/50 shadow-[0_0_20px_rgba(239,68,68,0.6)] scale-105"
                          : "border-red-950 bg-black/60 hover:border-red-600"
                          }`}
                      >
                        <span
                          className={`font-bold text-lg tracking-wider ${formData.size === size
                            ? "text-red-300 drop-shadow-[0_0_8px_#ef4444]"
                            : "text-red-700 hover:text-red-400"
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
                <label className="block text-sm font-medium text-zinc-300 mb-1 tracking-wide">
                  Want Name in T-Shirt?
                </label>
                <select
                  name="wantName"
                  value={formData.wantName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-red-900/80 bg-black/70 text-red-100 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all"
                >
                  <option value="Yes" className="bg-black text-red-100">Yes</option>
                  <option value="No" className="bg-black text-red-100">No</option>
                </select>
              </div>

              {formData.wantName === "Yes" && (
                <div>
                  <label className="block text-sm font-medium text-red-400 mb-1 tracking-wide">
                    Name in T-Shirt (Max 7 Letters)
                  </label>
                  <input
                    type="text"
                    name="nameInTShirt"
                    value={formData.nameInTShirt}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-red-900/80 bg-black/70 text-red-100 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all placeholder:text-red-900/60 shadow-inner"
                    placeholder="Enter name to be printed"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={() => scrollToSection(2)}
              className="relative inline-flex h-12 active:scale-95 transition overflow-hidden rounded-lg p-[1px] focus:outline-none"
            >
              <span
                className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#990000_0%,#ff1a1a_50%,#400000_100%)]"
              >
              </span>
              <span
                className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-black px-7 text-sm font-bold tracking-wider text-red-400 backdrop-blur-3xl gap-2 hover:text-white transition-colors"
              >
                Continue to Payment
              </span>
            </button>
          </div>
        </section>

        {/* Payment Section */}
        <section className="form-section min-h-screen py-16 flex flex-col justify-center">
          <div className="bg-gradient-to-br from-[#120306]/90 via-[#0a0204]/95 to-black border border-red-600/40 shadow-[0_0_35px_rgba(225,29,72,0.25)] rounded-3xl backdrop-blur-xl p-8 mb-8 relative overflow-hidden">
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-red-600 opacity-20 rounded-full blur-3xl animate-pulse" />
            <h2 className="text-2xl font-spaced md:text-3xl font-extrabold text-red-500 mb-6 border-b border-red-900/80 pb-4 tracking-widest uppercase drop-shadow-[0_0_12px_rgba(239,68,68,0.7)]">
              Payment
            </h2>
            {/* Pricing Details */}
            <div className="mb-8 w-full max-w-lg mx-auto bg-black/80 border border-red-900/80 rounded-xl p-4 shadow-[0_0_15px_rgba(225,29,72,0.15)] animate-fade-in">
              <h3 className="text-lg font-bold text-red-400 mb-2 text-center tracking-wider uppercase drop-shadow-[0_0_6px_#ef4444]">T-Shirt Pricing</h3>
              <table className="w-full text-sm text-red-100">
                <thead>
                  <tr className="text-red-300">
                    <th className="py-1 px-2 text-left">Variant</th>
                    <th className="py-1 px-2 text-left">With Name</th>
                    <th className="py-1 px-2 text-left">Without Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-red-900/50">
                    <td className="py-1 px-2 font-semibold text-zinc-300">Regular-sized T-Shirt</td>
                    <td className="py-1 px-2 text-red-400 font-mono">₹409</td>
                    <td className="py-1 px-2 text-red-400 font-mono">₹399</td>
                  </tr>
                  <tr className="border-t border-red-900/50">
                    <td className="py-1 px-2 font-semibold text-zinc-300">Over-sized T-shirt</td>
                    <td className="py-1 px-2 text-red-400 font-mono">₹489</td>
                    <td className="py-1 px-2 text-red-400 font-mono">₹479</td>
                  </tr>
                  <tr className="border-t border-red-900/50">
                    <td className="py-1 px-2 font-semibold text-zinc-300">Non-nitians</td>
                    <td className="py-1 px-2 text-red-400 font-mono">₹649</td>
                    <td className="py-1 px-2 text-red-400 font-mono">₹639</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-xs text-red-400/80 mt-2 text-center italic">Please pay the exact amount as per your selection below.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
              {/* QR Code and UPI Pay */}
              <div className="flex-1 flex flex-col items-center justify-center">
                <img
                  src="/tshirt/qr_code.jpg"
                  alt="Payment QR Code"
                  className="w-48 h-48 rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.3)] border-2 border-red-600 mb-4 bg-white object-contain"
                />
                <p className="text-red-200 text-sm mb-2 text-center">Scan this QR code to pay via any UPI app</p>
                <a
                  href={upiLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center w-full"
                >
                  <button
                    type="button"
                    className="flex items-center gap-3 px-5 py-1 bg-gradient-to-r from-red-900 via-red-700 to-red-900 text-white font-bold rounded-2xl shadow-[0_0_20px_rgba(225,29,72,0.4)] border-2 border-red-500 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 w-9/12 max-w-xs justify-center uppercase tracking-wider"
                  >
                    <img src="/tshirt/UPI-Logo-vector.svg" alt="BHIM UPI Logo" className="w-11 h-11 bg-transparent rounded p-1" />
                    <span className="text-md font-bold tracking-wide">Pay with UPI</span>
                  </button>
                  <span className="text-xs text-red-100 mt-2 text-center"></span>
                </a>
                <p className="text-sm text-red-400/90 text-center mt-2">Click to pay via any UPI app (GPay/Phonepe/Paytm.)</p>
              </div>
              {/* Upload Section */}
              <div className="flex-1 flex flex-col items-center justify-center mt-6 md:mt-0">
                <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm flex flex-col items-center">
                  <label className="block text-base font-semibold text-red-300 mb-3 text-center tracking-wide">
                    Upload Payment Receipt <span className="text-red-500">*</span>
                  </label>
                  <div className="relative w-full rounded-2xl border-2 border-dashed border-red-600/60 bg-black/80 shadow-[0_0_20px_rgba(225,29,72,0.2)] p-4 sm:p-6 flex flex-col items-center transition-all duration-300 hover:border-red-400 hover:shadow-[0_0_25px_rgba(239,68,68,0.4)]">
                    <input
                      type="file"
                      accept="application/pdf,image/*"
                      onChange={uploader}
                      required={!fileUrl}
                      className="block w-full text-sm text-red-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-950 file:text-red-300 hover:file:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 mb-2 cursor-pointer"
                    />
                    {uploading && (
                      <span className="text-red-400 animate-pulse mt-2 font-semibold">Uploading...</span>
                    )}
                    {fileUrl && (
                      <span className="text-emerald-400 mt-2 flex flex-col items-center font-medium">
                        <svg className="w-7 h-7 mb-1 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        Uploaded! <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="underline text-red-400 hover:text-red-300 break-all">View File</a>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-red-400/80 mt-3 text-center leading-snug">Attach a screenshot or PDF of your payment receipt.<br />Accepted: JPG, PNG, PDF. Max size: 5MB.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={() => scrollToSection(3)}
              className="relative inline-flex h-12 active:scale-95 transition overflow-hidden rounded-lg p-[1px] focus:outline-none"
            >
              <span
                className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#990000_0%,#ff1a1a_50%,#400000_100%)]"
              >
              </span>
              <span
                className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-black px-7 text-sm font-bold tracking-wider text-red-400 backdrop-blur-3xl gap-2 hover:text-white transition-colors"
              >
                Continue to Review Order
              </span>
            </button>
          </div>
        </section>

        {/* Summary Section */}
        <section className="form-section min-h-screen py-16 flex flex-col justify-center">
          <div className="bg-gradient-to-br from-[#120306]/90 via-[#0a0204]/95 to-black border border-red-600/40 shadow-[0_0_35px_rgba(225,29,72,0.25)] rounded-3xl backdrop-blur-xl p-8 mb-8 relative overflow-hidden">
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-red-600 opacity-20 rounded-full blur-3xl animate-pulse" />
            <h2 className="text-2xl font-spaced md:text-3xl font-extrabold text-red-500 mb-6 border-b border-red-900/80 pb-4 tracking-widest uppercase drop-shadow-[0_0_12px_rgba(239,68,68,0.7)]">
              Order Summary
            </h2>
            <div className="space-y-4 text-red-100">
              <p>
                <b className="text-red-400">Name:</b> {formData.name}
              </p>
              <p>
                <b className="text-red-400">From NIT Silchar:</b> {formData.fromNITSilchar}
              </p>
              {formData.fromNITSilchar === "Yes" && (
                <p>
                  <b className="text-red-400">Scholar ID:</b> {formData.scholarId}
                </p>
              )}
              <p>
                <b className="text-red-400">Phone:</b> {formData.phone}
              </p>
              <p>
                <b className="text-red-400">Address:</b> {formData.address}
              </p>
              <p>
                <b className="text-red-400">Email:</b> {formData.email}
              </p>
              <p>
                <b className="text-red-400">Type:</b> {formData.type}
              </p>
              <p>
                <b className="text-red-400">Size:</b> {formData.size}
              </p>
              <p>
                <b className="text-red-400">Want Name in T-Shirt:</b> {formData.wantName}
              </p>
              {formData.wantName === "Yes" && (
                <p>
                  <b className="text-red-400">Name in T-Shirt:</b> {formData.nameInTShirt}
                </p>
              )}
              <p>
                <b className="text-red-400">Payment Proof:</b> {formData.paymentProofLink ? (
                  <a href={formData.paymentProofLink} className="text-red-400 underline hover:text-red-300 break-all" target="_blank" rel="noopener noreferrer">View File</a>
                ) : "Pending"}
              </p>
            </div>
            <div className="mt-5 p-4 rounded-lg border border-red-900/80 bg-red-950/20">
              <p className="text-center text-red-400/90 text-sm">
                Please verify all details before submitting your order. Once
                submitted, changes cannot be made.
              </p>
            </div>
            <div className="flex justify-center pt-6">
              <button
                onClick={handleSubmit}
                disabled={ORDERS_CLOSED}
                className="relative inline-flex h-12 active:scale-95 transition overflow-hidden rounded-lg p-[1px] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span
                  className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#990000_0%,#ff1a1a_50%,#400000_100%)]"
                >
                </span>
                <span
                  className="inline-flex h-full w-full items-center justify-center rounded-lg bg-black px-7 text-md font-bold uppercase tracking-widest text-red-400 backdrop-blur-3xl gap-2 hover:text-white transition-colors"
                >
                  {ORDERS_CLOSED ? 'Orders Closed' : 'Submit Order'}
                </span>
              </button>
            </div>
          </div>
          <div className="text-center mt-8 text-zinc-500">
            <p className="font-semibold text-zinc-400 uppercase tracking-wider">Thank you for your order!</p>
            <p className="mt-2 text-sm">
              For any queries, contact:{' '}
              <a
                href="mailto:nerds@nits.ac.in"
                className="text-red-400 hover:underline"
              >
                nerds@nits.ac.in
              </a>
            </p>
          </div>
          <div className="mt-8 text-center bg-black/60 p-6 rounded-2xl border border-red-900/40">
            <h3 className="text-lg font-bold text-red-500 uppercase tracking-wider mb-2 drop-shadow-[0_0_6px_#ef4444]">
              Facing Payment Issues?
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              If you encounter any problems with the payment process, please reach out to our team:
            </p>
            <p className="text-sm text-red-300 mt-2 font-mono">
              📧 Email: <a href="mailto:nerds@nits.ac.in" className="underline text-red-400 hover:text-red-300">nerds.merch@club.com</a><br />
              📱 Phone/WhatsApp: <a href="tel:+916003501567" className="underline text-red-400 hover:text-red-300">+91 60035 01567</a>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default MerchPay;
