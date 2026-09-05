import { useState,useMemo } from "react";
import { MultiStepLoader } from "../../components/Merch_components/multi-step-loader";
import Merch_form_landing from './Merch_form_landing'
import ProgressBar from "react-scroll-progress-bar";

function MerchPay() {
  const [formData, setFormData] = useState({
    name: "",
    fromNITSilchar: "No",
    scholarId: "",
    email:"",
    type1: "",
    type2:"",
    size1: "",
    size2:"",
    wantName: "No",
    nameInTShirt: "",
    tshirtTheme1:"",
    address: "",
    phone: "",
    twotshirt:"No",
    paymentProofLink: "",
    tshirtTheme2:"Beige"
  });
  // Dynamically determine UPI amount based on selection
  let upiAmount = 0;
  if (formData.type === "Oversized" && formData.wantName === "Yes") upiAmount = 489;
  else if (formData.type === "Oversized" && formData.wantName === "No") upiAmount = 479;
  else if (formData.type === "Regular" && formData.wantName === "Yes") upiAmount = 409;
  else if (formData.type === "Regular" && formData.wantName === "No") upiAmount = 399;
  else if (formData.type === "Regular" && formData.fromNITSilchar === "No") upiAmount = 649;
  // UPI link 
  const upiLink = `upi://pay?pa=s${upiAmount ? `&am=${upiAmount}` : ""}&cu=INR`;
  const [fileUrl, setFileUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const [currentSection, setCurrentSection] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [modal, setModal] = useState({ open: false, message: "", success: false });

  // Toggle to close orders instantly (no backend change needed)
  const ORDERS_CLOSED = false;

  // Change this to your actual deployed Apps Script Web App URL
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzHBwyu6oHIUEXcaRmA4cagUXryfAXFRfjSe7M91IzN1bsJbZ-b6eB7PlvRg9OzZ9vK/exec";
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
        "https://script.google.com/macros/s/AKfycbzHBwyu6oHIUEXcaRmA4cagUXryfAXFRfjSe7M91IzN1bsJbZ-b6eB7PlvRg9OzZ9vK/exec",
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
    if (formData.tshirtTheme1 === "") {
      setModal({ open: true, message: "Please enter your Tshirt Color.", success: false });
      return;
    }
    if (!formData.type1) {
      setModal({ open: true, message: "Please select merchandise type1.", success: false });
      return;
    }

    if (!formData.size1) {
      setModal({ open: true, message: "Please select merchandise size.", success: false });
      return;
    }
    // if (!formData.size2) {
    //   setModal({ open: true, message: "Please select merchandise size.", success: false });
    //   return;
    // }
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
      let two=formData.twotshirt==="Yes";
      params.append("Timestamp", timestamp);
      params.append("Name", formData.name);
      params.append("IsNITS", formData.fromNITSilchar);
      params.append("ScholarId", formData.fromNITSilchar === "Yes" ? formData.scholarId : "0000000");
      params.append("Type1", formData.type1);
      params.append("Type2", two?formData.type2:"");
      params.append("Email", formData.email);
      params.append("Size1", formData.size1);
      params.append("Size2", two?formData.size2:"");
      params.append("WantName", formData.wantName);
      params.append("NameOnTShirt", formData.wantName === "Yes" ? formData.nameInTShirt : "");
      params.append("Address", formData.address);
      params.append("Phone", formData.phone);
      params.append("ScreenshotLink", formData.paymentProofLink);
      params.append("TshirtTheme1",formData.tshirtTheme1);
      params.append("TshirtTheme2",two?formData.tshirtTheme2:"");
      params.append("Twotshirt",formData.twotshirt);
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
        type1: "",
        type2:"",
        size1: "",
        size2: "",
        twotshirt:"No",
        wantName: "No",
        nameInTShirt: "",
        address: "",
        phone: "",
        paymentProofLink: "",
        tshirtTheme1:"",
        tshirtTheme2:"Beige"
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
const bill = useMemo(() => {
  const isNitian = formData.fromNITSilchar === "Yes";
  const isTwoTshirts = formData.twotshirt === "Yes";
  const wantsName = formData.wantName === "Yes";

  const getBasePrice = (type) => {
    if (isNitian) {
      return type === "Oversized" ? 449 : 389;
    }
    return type === "Oversized" ? 549 : 459;
  };

  const basePrice1 = getBasePrice(formData.type1);
  const nameFee1 = wantsName ? 10 : 0;
  const item1Total = basePrice1 + nameFee1;

  let basePrice2 = 0;
  let nameFee2 = 0;
  let item2Total = 0;

  if (isTwoTshirts) {
    basePrice2 = getBasePrice(formData.type2);
    nameFee2 = wantsName ? 10 : 0;
    item2Total = basePrice2 + nameFee2;
  }

  const subtotal = item1Total + item2Total;
  const isComboDiscountEligible = isTwoTshirts && wantsName;
  const discount = isComboDiscountEligible ? 50 : 0;
  const total = subtotal - discount;

  return {
    basePrice1,
    nameFee1,
    item1Total,
    basePrice2,
    nameFee2,
    item2Total,
    subtotal,
    discount,
    isComboDiscountEligible,
    total,
  };
}, [
  formData.fromNITSilchar,
  formData.twotshirt,
  formData.wantName,
  formData.type1,
  formData.type2,
]);
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
        {[0, 1, 2, 3, 4, 5].map((index) => (
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
<div className="bg-black text-black min-h-screen">
    <main className="max-w-4xl mx-auto px-4">
      {/* Promo Offer Banner Section */}
<section className="form-section py-8">
  <div className="bg-[#F5F5DC] border-2 border-black rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
    
    {/* Badge */}
    <div className="inline-block bg-black text-[#F5F5DC] text-xs md:text-sm font-black uppercase tracking-widest px-4 py-1.5 rounded-xl mb-4 border-2 border-black">
      Special Combo Offer
    </div>

    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <h2 className="text-2xl md:text-4xl font-black text-black uppercase tracking-wider leading-tight">
          Get <span className="underline decoration-4 underline-offset-4">₹50 OFF</span> On Combo!
        </h2>
        <p className="mt-2 text-sm md:text-base font-bold text-black/80 max-w-xl">
          Buy both <span className="bg-black text-white px-1.5 py-0.5 rounded">Ultron</span> &amp; <span className="bg-black text-white px-1.5 py-0.5 rounded">Baymax</span> T-Shirts with customized name tags to instantly unlock a flat ₹50 discount on your order.
        </p>
      </div>

      {/* Discount Tag Visual */}
      <div className="self-stretch md:self-auto flex items-center justify-center bg-black text-[#F5F5DC] p-4 rounded-2xl border-2 border-black min-w-[140px] text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]">
        <div>
          <span className="block text-xs font-bold uppercase tracking-wider">Save Total</span>
          <span className="block text-3xl font-black tracking-tight">₹50 OFF</span>
        </div>
      </div>
    </div>

  </div>
</section>
      {/* Basic Info Section */}
      <section className="form-section min-h-screen py-16 flex flex-col justify-center">
        <div className="bg-[#F5F5DC] border-2 border-black rounded-3xl p-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-black mb-6 border-b-2 border-black pb-4 tracking-widest uppercase">
            Personal Details
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-black mb-1 tracking-wide uppercase">
                Full Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-black bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-black transition-all placeholder:text-zinc-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-1 tracking-wide uppercase">
                Are you from NIT Silchar? <span className="text-red-600">*</span>
              </label>
              <select
                name="fromNITSilchar"
                value={formData.fromNITSilchar}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-black bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-black transition-all"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {formData.fromNITSilchar === "Yes" && (
              <div>
                <label className="block text-sm font-bold text-black mb-1 tracking-wide uppercase">
                  Scholar ID <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="scholarId"
                  value={formData.scholarId}
                  onChange={handleInputChange}
                  required={formData.fromNITSilchar === "Yes"}
                  className="w-full px-4 py-3 rounded-xl border-2 border-black bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-black transition-all placeholder:text-zinc-500"
                  placeholder="e.g. 2112001"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-black mb-1 tracking-wide uppercase">
                Phone Number <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-black bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-black transition-all placeholder:text-zinc-500"
                placeholder="10-digit mobile number"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-1 tracking-wide uppercase">
                Address <span className="text-red-600">*</span>
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-3 rounded-xl border-2 border-black bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-black transition-all placeholder:text-zinc-500"
                placeholder="Enter complete delivery address"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-1 tracking-wide uppercase">
                Email Address <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-black bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-black transition-all placeholder:text-zinc-500"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-black mb-1 tracking-wide uppercase">
                Are you buying both Ultron and Baymax? <span className="text-red-600">*</span>
              </label>
              <select
                name="twotshirt"
                value={formData.twotshirt}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-black bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-black transition-all"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>


            
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => scrollToSection(2)}
            className="h-12 px-8 bg-black text-[#F5F5DC] font-bold text-sm tracking-wider uppercase rounded-xl border-2 border-[#F5F5DC] hover:bg-[#F5F5DC] hover:text-black hover:border-black transition-all duration-200 active:scale-95"
          >
            Continue to Size & Customization
          </button>
        </div>
      </section>

      {/* Size & Customization Section */}
      <section className="form-section min-h-screen py-16 flex flex-col justify-center">
        <div className="bg-[#F5F5DC] border-2 border-black rounded-3xl p-8 mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-black tracking-wider uppercase mb-6 pb-2 border-b-2 border-black inline-block">
  {formData.twotshirt==="Yes"?"First T-Shirt":"T-Shirt Specification"}
</h1>
          <div className="space-y-6">
            <div>
              <div>
              <label className="block text-sm font-bold text-black mb-1 tracking-wide uppercase">
                T-Shirt Type <span className="text-red-600">*</span>
              </label>
              <select
                name="type1"
                value={formData.type1}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-black bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-black transition-all"
              >
                <option value="">Choose</option>
                <option value="Regular">Regular</option>
                <option value="Oversized">Oversized</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-black mb-1 tracking-wide uppercase">
                T-Shirt Theme<span className="text-red-600">*</span>
              </label>
              <select
  name="tshirtTheme1"
  value={formData.tshirtTheme1}
  onChange={handleInputChange}
  required
  className="w-full px-4 py-3 rounded-xl border-2 border-black bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-black transition-all"
>
  <option value="">Choose</option>
  <option value="Black">Ultron</option>
  {formData.twotshirt === "No" && (
    <option value="Beige">Baymax</option>
  )}
</select>
            </div>
              <label className="block text-sm font-bold text-black mb-1 tracking-wide uppercase">
                Size
              </label>
              {/* Size Chart Tables */}
              <div className="mb-4">
                {formData.type1 === "Regular" && (
                  <div className="w-full overflow-x-auto">
                    <table className="w-full text-xs md:text-sm text-black border-collapse bg-white rounded-xl border-2 border-black">
                      <caption className="text-black font-bold mb-2 text-base md:text-lg tracking-wider uppercase text-left">
                        Regular-sized Size Chart (in inches)
                      </caption>
                      <thead>
                        <tr className="bg-black text-[#F5F5DC]">
                          <th className="px-3 py-2 text-center border border-black">Size</th>
                          <th className="px-3 py-2 text-center border border-black">Chest</th>
                          <th className="px-3 py-2 text-center border border-black">Length</th>
                          <th className="px-3 py-2 text-center border border-black">Sleeve</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-[#F5F5DC]/50 transition-colors">
                          <td className="px-6 py-2 text-center border border-black font-medium">S</td>
                          <td className="px-6 py-2 text-center border border-black">38</td>
                          <td className="px-6 py-2 text-center border border-black">26</td>
                          <td className="px-6 py-2 text-center border border-black">7</td>
                        </tr>
                        <tr className="hover:bg-[#F5F5DC]/50 transition-colors">
                          <td className="px-6 py-2 text-center border border-black font-medium">M</td>
                          <td className="px-6 py-2 text-center border border-black">40</td>
                          <td className="px-6 py-2 text-center border border-black">27</td>
                          <td className="px-6 py-2 text-center border border-black">7.5</td>
                        </tr>
                        <tr className="hover:bg-[#F5F5DC]/50 transition-colors">
                          <td className="px-6 py-2 text-center border border-black font-medium">L</td>
                          <td className="px-6 py-2 text-center border border-black">42</td>
                          <td className="px-6 py-2 text-center border border-black">28</td>
                          <td className="px-6 py-2 text-center border border-black">8</td>
                        </tr>
                        <tr className="hover:bg-[#F5F5DC]/50 transition-colors">
                          <td className="px-6 py-2 text-center border border-black font-medium">XL</td>
                          <td className="px-6 py-2 text-center border border-black">44</td>
                          <td className="px-6 py-2 text-center border border-black">29</td>
                          <td className="px-6 py-2 text-center border border-black">8.5</td>
                        </tr>
                        <tr className="hover:bg-[#F5F5DC]/50 transition-colors">
                          <td className="px-6 py-2 text-center border border-black font-medium">XXL</td>
                          <td className="px-6 py-2 text-center border border-black">46</td>
                          <td className="px-6 py-2 text-center border border-black">30</td>
                          <td className="px-6 py-2 text-center border border-black">9</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
                {formData.type1 === "Oversized" && (
                  <div className="w-full overflow-x-auto">
                    <table className="w-full text-xs md:text-sm text-black border-collapse bg-white rounded-xl border-2 border-black">
                      <caption className="text-black font-bold mb-2 text-base md:text-lg tracking-wider uppercase text-left">
                        Over-sized Size Chart (in inches)
                      </caption>
                      <thead>
                        <tr className="bg-black text-[#F5F5DC]">
                          <th className="px-3 py-2 text-center border border-black">Size</th>
                          <th className="px-3 py-2 text-center border border-black">Chest</th>
                          <th className="px-3 py-2 text-center border border-black">Body Length</th>
                          <th className="px-3 py-2 text-center border border-black">Sleeve Length</th>
                          <th className="px-3 py-2 text-center border border-black">Sleeve Open</th>
                          <th className="px-3 py-2 text-center border border-black">Shoulder</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-[#F5F5DC]/50 transition-colors">
                          <td className="px-6 py-2 text-center border border-black font-medium">S</td>
                          <td className="px-6 py-2 text-center border border-black">21</td>
                          <td className="px-6 py-2 text-center border border-black">26.5</td>
                          <td className="px-6 py-2 text-center border border-black">9.5</td>
                          <td className="px-6 py-2 text-center border border-black">7.5</td>
                          <td className="px-6 py-2 text-center border border-black">20</td>
                        </tr>
                        <tr className="hover:bg-[#F5F5DC]/50 transition-colors">
                          <td className="px-6 py-2 text-center border border-black font-medium">M</td>
                          <td className="px-6 py-2 text-center border border-black">22</td>
                          <td className="px-6 py-2 text-center border border-black">27.5</td>
                          <td className="px-6 py-2 text-center border border-black">10</td>
                          <td className="px-6 py-2 text-center border border-black">8</td>
                          <td className="px-6 py-2 text-center border border-black">21</td>
                        </tr>
                        <tr className="hover:bg-[#F5F5DC]/50 transition-colors">
                          <td className="px-6 py-2 text-center border border-black font-medium">L</td>
                          <td className="px-6 py-2 text-center border border-black">23</td>
                          <td className="px-6 py-2 text-center border border-black">28.5</td>
                          <td className="px-6 py-2 text-center border border-black">10.5</td>
                          <td className="px-6 py-2 text-center border border-black">8.5</td>
                          <td className="px-6 py-2 text-center border border-black">22</td>
                        </tr>
                        <tr className="hover:bg-[#F5F5DC]/50 transition-colors">
                          <td className="px-6 py-2 text-center border border-black font-medium">XL</td>
                          <td className="px-6 py-2 text-center border border-black">24</td>
                          <td className="px-6 py-2 text-center border border-black">29.5</td>
                          <td className="px-6 py-2 text-center border border-black">11</td>
                          <td className="px-6 py-2 text-center border border-black">9</td>
                          <td className="px-6 py-2 text-center border border-black">23</td>
                        </tr>
                        <tr className="hover:bg-[#F5F5DC]/50 transition-colors">
                          <td className="px-6 py-2 text-center border border-black font-medium">XXL</td>
                          <td className="px-6 py-2 text-center border border-black">25</td>
                          <td className="px-6 py-2 text-center border border-black">30.5</td>
                          <td className="px-6 py-2 text-center border border-black">11</td>
                          <td className="px-6 py-2 text-center border border-black">9</td>
                          <td className="px-6 py-2 text-center border border-black">23</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-2">
                {["S", "M", "L", "XL", "XXL"].map((size1) => (
                  <label key={size1} className="cursor-pointer">
                    <input
                      type="radio"
                      name="size1"
                      value={size1}
                      checked={formData.size1 === size1}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div
                      className={`flex items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
                        formData.size1 === size1
                          ? "border-black bg-black text-[#F5F5DC] scale-105"
                          : "border-black bg-white text-black hover:bg-black hover:text-[#F5F5DC]"
                      }`}
                    >
                      <span className="font-bold text-lg tracking-wider">
                        {size1}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-1 tracking-wide uppercase">
                Want Name in T-Shirt?
              </label>
              <select
                name="wantName"
                value={formData.wantName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-black bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-black transition-all"
              >
                <option value="Yes" className="bg-white text-black">Yes</option>
                <option value="No" className="bg-white text-black">No</option>
              </select>
            </div>

            {formData.wantName === "Yes" && (
              <div>
                <label className="block text-sm font-bold text-black mb-1 tracking-wide uppercase">
                  Name in T-Shirt (Max 7 Letters)
                </label>
                <input
                  type="text"
                  name="nameInTShirt"
                  value={formData.nameInTShirt}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-black bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-black transition-all placeholder:text-zinc-500"
                  placeholder="Enter name to be printed"
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => scrollToSection(2)}
            className="h-12 px-8 bg-black text-[#F5F5DC] font-bold text-sm tracking-wider uppercase rounded-xl border-2 border-[#F5F5DC] hover:bg-[#F5F5DC] hover:text-black hover:border-black transition-all duration-200 active:scale-95"
          >
            Continue to Payment
          </button>
        </div>
      </section>
      {
        formData.twotshirt==="Yes" &&
        <section className="form-section min-h-screen py-16 flex flex-col justify-center">
        <div className="bg-[#F5F5DC] border-2 border-black rounded-3xl p-8 mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-black tracking-wider uppercase mb-6 pb-2 border-b-2 border-black inline-block">
  Second T-Shirt</h1>
          <div className="space-y-6">
            <div>
              <div>
              <label className="block text-sm font-bold text-black mb-1 tracking-wide uppercase">
                T-Shirt Type <span className="text-red-600">*</span>
              </label>
              <select
                name="type2"
                value={formData.type2}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-black bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-black transition-all"
              >
                <option value="">Choose</option>
                <option value="Regular">Regular</option>
                <option value="Oversized">Oversized</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-black mb-1 tracking-wide uppercase">
                T-Shirt Theme<span className="text-red-600">*</span>
              </label>
              <select
                name="tshirtTheme2"
                value={formData.tshirtTheme2}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-black bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-black transition-all"
              >
                <option value="Beige">Baymax</option>
              </select>
            </div>
              <label className="block text-sm font-bold text-black mb-1 tracking-wide uppercase">
                Size
              </label>
              {/* Size Chart Tables */}
              <div className="mb-4">
                {formData.type2 === "Regular" && (
                  <div className="w-full overflow-x-auto">
                    <table className="w-full text-xs md:text-sm text-black border-collapse bg-white rounded-xl border-2 border-black">
                      <caption className="text-black font-bold mb-2 text-base md:text-lg tracking-wider uppercase text-left">
                        Regular-sized Size Chart (in inches)
                      </caption>
                      <thead>
                        <tr className="bg-black text-[#F5F5DC]">
                          <th className="px-3 py-2 text-center border border-black">Size</th>
                          <th className="px-3 py-2 text-center border border-black">Chest</th>
                          <th className="px-3 py-2 text-center border border-black">Length</th>
                          <th className="px-3 py-2 text-center border border-black">Sleeve</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-[#F5F5DC]/50 transition-colors">
                          <td className="px-6 py-2 text-center border border-black font-medium">S</td>
                          <td className="px-6 py-2 text-center border border-black">38</td>
                          <td className="px-6 py-2 text-center border border-black">26</td>
                          <td className="px-6 py-2 text-center border border-black">7</td>
                        </tr>
                        <tr className="hover:bg-[#F5F5DC]/50 transition-colors">
                          <td className="px-6 py-2 text-center border border-black font-medium">M</td>
                          <td className="px-6 py-2 text-center border border-black">40</td>
                          <td className="px-6 py-2 text-center border border-black">27</td>
                          <td className="px-6 py-2 text-center border border-black">7.5</td>
                        </tr>
                        <tr className="hover:bg-[#F5F5DC]/50 transition-colors">
                          <td className="px-6 py-2 text-center border border-black font-medium">L</td>
                          <td className="px-6 py-2 text-center border border-black">42</td>
                          <td className="px-6 py-2 text-center border border-black">28</td>
                          <td className="px-6 py-2 text-center border border-black">8</td>
                        </tr>
                        <tr className="hover:bg-[#F5F5DC]/50 transition-colors">
                          <td className="px-6 py-2 text-center border border-black font-medium">XL</td>
                          <td className="px-6 py-2 text-center border border-black">44</td>
                          <td className="px-6 py-2 text-center border border-black">29</td>
                          <td className="px-6 py-2 text-center border border-black">8.5</td>
                        </tr>
                        <tr className="hover:bg-[#F5F5DC]/50 transition-colors">
                          <td className="px-6 py-2 text-center border border-black font-medium">XXL</td>
                          <td className="px-6 py-2 text-center border border-black">46</td>
                          <td className="px-6 py-2 text-center border border-black">30</td>
                          <td className="px-6 py-2 text-center border border-black">9</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
                {formData.type2 === "Oversized" && (
                  <div className="w-full overflow-x-auto">
                    <table className="w-full text-xs md:text-sm text-black border-collapse bg-white rounded-xl border-2 border-black">
                      <caption className="text-black font-bold mb-2 text-base md:text-lg tracking-wider uppercase text-left">
                        Over-sized Size Chart (in inches)
                      </caption>
                      <thead>
                        <tr className="bg-black text-[#F5F5DC]">
                          <th className="px-3 py-2 text-center border border-black">Size</th>
                          <th className="px-3 py-2 text-center border border-black">Chest</th>
                          <th className="px-3 py-2 text-center border border-black">Body Length</th>
                          <th className="px-3 py-2 text-center border border-black">Sleeve Length</th>
                          <th className="px-3 py-2 text-center border border-black">Sleeve Open</th>
                          <th className="px-3 py-2 text-center border border-black">Shoulder</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-[#F5F5DC]/50 transition-colors">
                          <td className="px-6 py-2 text-center border border-black font-medium">S</td>
                          <td className="px-6 py-2 text-center border border-black">21</td>
                          <td className="px-6 py-2 text-center border border-black">26.5</td>
                          <td className="px-6 py-2 text-center border border-black">9.5</td>
                          <td className="px-6 py-2 text-center border border-black">7.5</td>
                          <td className="px-6 py-2 text-center border border-black">20</td>
                        </tr>
                        <tr className="hover:bg-[#F5F5DC]/50 transition-colors">
                          <td className="px-6 py-2 text-center border border-black font-medium">M</td>
                          <td className="px-6 py-2 text-center border border-black">22</td>
                          <td className="px-6 py-2 text-center border border-black">27.5</td>
                          <td className="px-6 py-2 text-center border border-black">10</td>
                          <td className="px-6 py-2 text-center border border-black">8</td>
                          <td className="px-6 py-2 text-center border border-black">21</td>
                        </tr>
                        <tr className="hover:bg-[#F5F5DC]/50 transition-colors">
                          <td className="px-6 py-2 text-center border border-black font-medium">L</td>
                          <td className="px-6 py-2 text-center border border-black">23</td>
                          <td className="px-6 py-2 text-center border border-black">28.5</td>
                          <td className="px-6 py-2 text-center border border-black">10.5</td>
                          <td className="px-6 py-2 text-center border border-black">8.5</td>
                          <td className="px-6 py-2 text-center border border-black">22</td>
                        </tr>
                        <tr className="hover:bg-[#F5F5DC]/50 transition-colors">
                          <td className="px-6 py-2 text-center border border-black font-medium">XL</td>
                          <td className="px-6 py-2 text-center border border-black">24</td>
                          <td className="px-6 py-2 text-center border border-black">29.5</td>
                          <td className="px-6 py-2 text-center border border-black">11</td>
                          <td className="px-6 py-2 text-center border border-black">9</td>
                          <td className="px-6 py-2 text-center border border-black">23</td>
                        </tr>
                        <tr className="hover:bg-[#F5F5DC]/50 transition-colors">
                          <td className="px-6 py-2 text-center border border-black font-medium">XXL</td>
                          <td className="px-6 py-2 text-center border border-black">25</td>
                          <td className="px-6 py-2 text-center border border-black">30.5</td>
                          <td className="px-6 py-2 text-center border border-black">11</td>
                          <td className="px-6 py-2 text-center border border-black">9</td>
                          <td className="px-6 py-2 text-center border border-black">23</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-2">
                {["S", "M", "L", "XL", "XXL"].map((size2) => (
                  <label key={size2} className="cursor-pointer">
                    <input
                      type="radio"
                      name="size2"
                      value={size2}
                      checked={formData.size2 === size2}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div
                      className={`flex items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
                        formData.size2 === size2
                          ? "border-black bg-black text-[#F5F5DC] scale-105"
                          : "border-black bg-white text-black hover:bg-black hover:text-[#F5F5DC]"
                      }`}
                    >
                      <span className="font-bold text-lg tracking-wider">
                        {size2}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-1 tracking-wide uppercase">
                Want Name in T-Shirt?
              </label>
              <select
                name="wantName"
                value={formData.wantName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-black bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-black transition-all"
              >
                <option value="Yes" className="bg-white text-black">Yes</option>
                <option value="No" className="bg-white text-black">No</option>
              </select>
            </div>

            {formData.wantName === "Yes" && (
              <div>
                <label className="block text-sm font-bold text-black mb-1 tracking-wide uppercase">
                  Name in T-Shirt (Max 7 Letters)
                </label>
                <input
                  type="text"
                  name="nameInTShirt"
                  value={formData.nameInTShirt}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-black bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-black transition-all placeholder:text-zinc-500"
                  placeholder="Enter name to be printed"
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => scrollToSection(3)}
            className="h-12 px-8 bg-black text-[#F5F5DC] font-bold text-sm tracking-wider uppercase rounded-xl border-2 border-[#F5F5DC] hover:bg-[#F5F5DC] hover:text-black hover:border-black transition-all duration-200 active:scale-95"
          >
            Continue to Payment
          </button>
        </div>
      </section>
      }

      {/* Payment Section */}
      <section className="form-section min-h-screen py-16 flex flex-col justify-center">
        <div className="bg-[#F5F5DC] border-2 border-black rounded-3xl p-8 mb-8 relative">
          <h2 className="text-2xl md:text-3xl font-extrabold text-black mb-6 border-b-2 border-black pb-4 tracking-widest uppercase">
            Payment
          </h2>
          {/* Pricing Details */}
          <div className="mb-8 w-full max-w-lg mx-auto bg-white border-2 border-black rounded-xl p-4">
            <h3 className="text-lg font-bold text-black mb-2 text-center tracking-wider uppercase">T-Shirt Pricing</h3>
            <div className="space-y-6">
  {/* Pricing Table */}
  <div className="overflow-x-auto rounded-2xl border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
    <table className="w-full text-sm text-black border-collapse">
      <thead>
        <tr className="bg-black text-[#F5F5DC]">
          <th className="py-3 px-4 text-left font-bold uppercase tracking-wider">Variant</th>
          <th className="py-3 px-4 text-left font-bold uppercase tracking-wider">Without Name</th>
          <th className="py-3 px-4 text-left font-bold uppercase tracking-wider">With Name</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-black hover:bg-[#F5F5DC]/40 transition-colors">
          <td className="py-2.5 px-4 font-bold">Regular-sized T-Shirt</td>
          <td className="py-2.5 px-4 font-mono font-bold">₹389</td>
          <td className="py-2.5 px-4 font-mono font-bold">₹399</td>
        </tr>
        <tr className="border-b border-black hover:bg-[#F5F5DC]/40 transition-colors">
          <td className="py-2.5 px-4 font-bold">Over-sized T-shirt</td>
          <td className="py-2.5 px-4 font-mono font-bold">₹449</td>
          <td className="py-2.5 px-4 font-mono font-bold">₹459</td>
        </tr>
        <tr className="border-b border-black hover:bg-[#F5F5DC]/40 transition-colors">
          <td className="py-2.5 px-4 font-bold">Non-Nitians (Regular-sized)</td>
          <td className="py-2.5 px-4 font-mono font-bold">₹459</td>
          <td className="py-2.5 px-4 font-mono font-bold">₹469</td>
        </tr>
        <tr className="hover:bg-[#F5F5DC]/40 transition-colors">
          <td className="py-2.5 px-4 font-bold">Non-Nitians (Oversized)</td>
          <td className="py-2.5 px-4 font-mono font-bold">₹549</td>
          <td className="py-2.5 px-4 font-mono font-bold">₹559</td>
        </tr>
      </tbody>
    </table>
  </div>

  {/* Dynamic Calculated Bill Card */}
  <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
    <div className="flex items-center justify-between border-b-2 border-black pb-3">
      <h3 className="text-lg font-black uppercase tracking-wider text-black flex items-center gap-2">
        <span>🧾</span> Order Summary
      </h3>
      <span className="text-xs font-bold uppercase px-2.5 py-1 bg-[#F5F5DC] border border-black rounded-lg">
        {formData.fromNITSilchar === "Yes" ? "NITian Rate" : "Non-NITian Rate"}
      </span>
    </div>

    <div className="space-y-2 text-sm font-medium text-black">
      {/* T-Shirt 1 Details */}
      <div className="flex justify-between items-center">
        <span>
          1x First T-Shirt ({formData.type1 || "Regular"}
          {formData.tshirtTheme1 ? ` - ${formData.tshirtTheme1}` : ""})
        </span>
        <span className="font-mono font-bold">₹{bill.basePrice1}</span>
      </div>

      {/* Custom Name Fee 1 */}
      {formData.wantName === "Yes" && (
        <div className="flex justify-between items-center text-xs text-zinc-600 pl-4 border-l-2 border-black">
          <span>Custom Name Tag ("{formData.nameInTShirt || "Custom"}")</span>
          <span className="font-mono font-bold text-black">+₹{bill.nameFee1}</span>
        </div>
      )}

      {/* T-Shirt 2 Details (If Combo Selected) */}
      {formData.twotshirt === "Yes" && (
        <>
          <div className="flex justify-between items-center pt-2 border-t border-dashed border-zinc-300">
            <span>
              1x Second T-Shirt ({formData.type2 || "Regular"}
              {formData.tshirtTheme2 ? ` - ${formData.tshirtTheme2}` : ""})
            </span>
            <span className="font-mono font-bold">₹{bill.basePrice2}</span>
          </div>

          {formData.wantName === "Yes" && (
            <div className="flex justify-between items-center text-xs text-zinc-600 pl-4 border-l-2 border-black">
              <span>Custom Name Tag</span>
              <span className="font-mono font-bold text-black">+₹{bill.nameFee2}</span>
            </div>
          )}
        </>
      )}

      {/* Subtotal */}
      <div className="flex justify-between items-center pt-3 border-t-2 border-black font-bold">
        <span>Subtotal</span>
        <span className="font-mono">₹{bill.subtotal}</span>
      </div>

      {/* Discount Row */}
      {bill.discount > 0 ? (
        <div className="flex justify-between items-center text-green-700 bg-green-100 p-2.5 rounded-xl border border-green-800 font-bold">
          <span className="flex items-center gap-1">
            Combo Offer Discount
          </span>
          <span className="font-mono text-base">-₹{bill.discount}</span>
        </div>
      ) : formData.twotshirt === "Yes" && formData.wantName !== "Yes" ? (
        <p className="text-xs font-semibold text-red-800 bg-amber-50 p-2 rounded-lg border border-amber-300">
          !!!Add custom name tags to unlock ₹50 combo discount!!!
        </p>
      ) : null}
    </div>

    {/* Grand Total */}
    <div className="flex justify-between items-center pt-4 border-t-2 border-black bg-[#F5F5DC] p-4 rounded-xl border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
      <span className="text-base font-black uppercase tracking-wider">Final Payable Amount</span>
      <span className="text-2xl font-black font-mono tracking-tight text-black">
        ₹{bill.total}
      </span>
    </div>
  </div>
</div>
            <p className="text-xs text-black mt-2 text-center font-medium italic">Please pay the exact amount as per your selection below.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            {/* QR Code and UPI Pay */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <img
                src="/tshirt/abhinav_qr.jpeg"
                alt="Payment QR Code"
                className="w-48 h-48 rounded-xl border-2 border-black mb-4 bg-white"
              />
              <p className="text-black text-sm mb-2 text-center font-medium">Primary QR</p>
              <img
                src="/tshirt/ayushman_qr.jpeg"
                alt="Payment QR Code"
                className="w-48 h-48 rounded-xl border-2 border-black mb-4 bg-white"
              />
              <p className="text-black text-sm mb-2 text-center font-medium">Sencondary QR</p>
            </div>
            {/* Upload Section */}
            <div className="flex-1 flex flex-col items-center justify-center mt-6 md:mt-0">
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm flex flex-col items-center">
                <label className="block text-base font-bold text-black mb-3 text-center tracking-wide uppercase">
                  Upload Payment Receipt <span className="text-red-600">*</span>
                </label>
                <div className="relative w-full rounded-2xl border-2 border-dashed border-black bg-white p-4 sm:p-6 flex flex-col items-center">
                  <input
                    type="file"
                    accept="application/pdf,image/*"
                    onChange={uploader}
                    required={!fileUrl}
                    className="block w-full text-sm text-black file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-2 file:border-black file:text-sm file:font-bold file:bg-[#F5F5DC] file:text-black hover:file:bg-black hover:file:text-[#F5F5DC] focus:outline-none mb-2 cursor-pointer"
                  />
                  {uploading && (
                    <span className="text-black font-bold animate-pulse mt-2">Uploading...</span>
                  )}
                  {fileUrl && (
                    <span className="text-emerald-700 mt-2 flex flex-col items-center font-bold">
                      <svg className="w-7 h-7 mb-1 text-emerald-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      Uploaded! <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="underline text-black hover:text-zinc-700 break-all">View File</a>
                    </span>
                  )}
                </div>
                <p className="text-xs text-black mt-3 text-center font-medium leading-snug">Attach a screenshot or PDF of your payment receipt.<br />Accepted: JPG, PNG, PDF. Max size: 5MB.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => scrollToSection(3)}
            className="h-12 px-8 bg-black text-[#F5F5DC] font-bold text-sm tracking-wider uppercase rounded-xl border-2 border-[#F5F5DC] hover:bg-[#F5F5DC] hover:text-black hover:border-black transition-all duration-200 active:scale-95"
          >
            Continue to Review Order
          </button>
        </div>
      </section>

      {/* Summary Section */}
      <section className="form-section min-h-screen py-16 flex flex-col justify-center">
        <div className="bg-[#F5F5DC] border-2 border-black rounded-3xl p-8 mb-8 relative">
          <h2 className="text-2xl md:text-3xl font-extrabold text-black mb-6 border-b-2 border-black pb-4 tracking-widest uppercase">
            Order Summary
          </h2>
          <div className="space-y-4 text-black font-medium">
            <p>
              <b className="uppercase">Name:</b> {formData.name}
            </p>
            <p>
              <b className="uppercase">From NIT Silchar:</b> {formData.fromNITSilchar}
            </p>
            {formData.fromNITSilchar === "Yes" && (
              <p>
                <b className="uppercase">Scholar ID:</b> {formData.scholarId}
              </p>
            )}
            <p>
              <b className="uppercase">Phone:</b> {formData.phone}
            </p>
            <p>
              <b className="uppercase">Address:</b> {formData.address}
            </p>
            <p>
              <b className="uppercase">Email:</b> {formData.email}
            <p>
              <b className="uppercase">Want both T-Shirt:</b> {formData.twotshirt}
            </p>
            </p>
            <p>
              <b className="uppercase">Type 1:</b> {formData.type1}
            </p>
            <p>
              <b className="uppercase">Size 1:</b> {formData.size1}
            </p>
            {formData.twotshirt === "Yes" && (
              <>
              <p>
                <b className="uppercase">Type 2:</b> {formData.type2}
              </p>
              <p>
                <b className="uppercase">Size 2:</b> {formData.size2}
              </p>
              </>
            )}
            <p>
              <b className="uppercase">Want Name in T-Shirt:</b> {formData.wantName}
            </p>
            {formData.wantName === "Yes" && (
              <p>
                <b className="uppercase">Name in T-Shirt:</b> {formData.nameInTShirt}
              </p>
            )}
            <p>
              <b className="uppercase">Payment Proof:</b> {formData.paymentProofLink ? (
                <a href={formData.paymentProofLink} className="text-black underline font-bold hover:text-zinc-700 break-all" target="_blank" rel="noopener noreferrer">View File</a>
              ) : "Pending"}
            </p>
          </div>
          <div className="mt-5 p-4 rounded-lg border-2 border-black bg-white">
            <p className="text-center text-black text-sm font-bold">
              Please verify all details before submitting your order. Once
              submitted, changes cannot be made.
            </p>
          </div>
          <div className="flex justify-center pt-6">
            <button
              onClick={handleSubmit}
              disabled={ORDERS_CLOSED}
              className="h-12 px-8 bg-black text-[#F5F5DC] font-bold text-md uppercase tracking-widest rounded-xl border-2 border-black hover:bg-white hover:text-black transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {ORDERS_CLOSED ? 'Orders Closed' : 'Submit Order'}
            </button>
          </div>
        </div>
        <div className="text-center mt-8 text-[#F5F5DC]">
          <p className="font-bold uppercase tracking-wider">Thank you for your order!</p>
          <p className="mt-2 text-sm">
            For any queries, contact:{' '}
            <a
              href="mailto:nerds@nits.ac.in"
              className="text-[#F5F5DC] underline hover:text-white"
            >
              nerds@nits.ac.in
            </a>
          </p>
        </div>
        <div className="mt-8 text-center bg-[#F5F5DC] p-6 rounded-2xl border-2 border-black text-black">
          <h3 className="text-lg font-bold uppercase tracking-wider mb-2">
            Facing Payment Issues?
          </h3>
          <p className="text-sm font-medium leading-relaxed">
            If you encounter any problems with the payment process, please reach out to our team:
          </p>
          <p className="text-sm font-bold font-mono mt-2">
            📧 Email: <a href="mailto:nerds@nits.ac.in" className="underline hover:text-zinc-700">nerds@nits.ac.in</a><br />
            📱 Phone/WhatsApp: <a href="tel:+916003501567" className="underline hover:text-zinc-700">+91 8638672009</a>
          </p>
        </div>
      </section>
    </main>
  </div>
    </div>
  );
}

export default MerchPay;
