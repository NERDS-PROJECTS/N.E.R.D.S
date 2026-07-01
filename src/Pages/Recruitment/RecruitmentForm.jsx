import React, { useState } from 'react';

const RecruitmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    scholarId: '',
    email: '',
    phoneNumber: '',
    resumeLink: '',
    teamPreference: '',
    otherClubs: '',
    reason: '',
  });

  // New state variables to track submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Generic change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Modern ASYNC form handler that stops page redirection
  const handleSubmit = async (e) => {
    e.preventDefault(); // STOPS the page from redirecting or opening new tabs
    setIsSubmitting(true);
    setError(null);

    // Google Apps Script expects standard Form Data URL encoding
    const formDataToSend = new URLSearchParams();
    formDataToSend.append('Name', formData.name);
    formDataToSend.append('ScholarID', formData.scholarId);
    formDataToSend.append('Email', formData.email);
    formDataToSend.append('Phone', formData.phoneNumber);
    formDataToSend.append('Resume', formData.resumeLink);
    formDataToSend.append('Preference', formData.teamPreference);
    formDataToSend.append('OtherClubs', formData.otherClubs);
    formDataToSend.append('Reason', formData.reason);

    try {
      await fetch("https://script.google.com/macros/s/AKfycbwqRcLrgFbdZsoVBMSlWHat7L26UKFsh5V2890froc9RidWb9xhh9fF92dHcSr4VrrCmA/exec", {
        method: 'POST',
        mode: 'no-cors', // Crucial for dealing with Google Script's redirection policies
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDataToSend.toString(),
      });

      // Because 'no-cors' mode is active, we won't get a true JSON status, 
      // but if the fetch doesn't throw an error, it succeeded.
      setIsSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-[#050400] text-gray-200 flex flex-col justify-center items-center p-6 relative overflow-hidden font-mono"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(234, 179, 8, 0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(234, 179, 8, 0.04) 1px, transparent 1px)
        `,
        backgroundSize: '35px 35px',
      }}
    >
        
      {/* Background Deep Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-900/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Main Container Panel with Yellow Border Glow */}
      <div className="w-full max-w-2xl bg-[#0b0a02]/95 backdrop-blur-xl border border-yellow-500/40 rounded-2xl p-8 md:p-10 shadow-[0_0_50px_rgba(234,179,8,0.15)] relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10 border-b border-amber-950/40 pb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-amber-950/50 to-amber-900/30 border border-yellow-500/40 mb-4 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
            <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-widest text-white uppercase bg-gradient-to-b from-white via-gray-200 to-yellow-500/60 bg-clip-text text-transparent">
            Join the Junior Team
          </h1>
          <p className="text-yellow-500 text-xs font-bold tracking-[0.25em] uppercase mt-2">
            RECRUITMENT REGISTRATION
          </p>
        </div>

        {/* Conditional rendering for success screen */}
        {isSubmitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="text-emerald-500 text-4xl">✓</div>
            <h2 className="text-xl font-bold text-white uppercase tracking-wider">Application Received</h2>
            <p className="text-gray-400 text-sm max-w-sm mx-auto">
              Your data has been securely logged directly into our rosters. Stand by for further transmission.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Two Column Setup (Name & Scholar ID) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-yellow-500/80 mb-2">◇ Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Piyush"
                  className="w-full bg-gradient-to-b from-[#141105] to-[#0f0c03] border border-amber-950 focus:border-yellow-500/60 rounded-xl px-4 py-3 text-sm transition-all duration-300 outline-none text-white placeholder-amber-950/60 focus:shadow-[0_0_20px_rgba(234,179,8,0.15)] focus:bg-[#1a1608]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-yellow-500/80 mb-2">◇ Scholar ID</label>
                <input
                  type="text"
                  required
                  value={formData.scholarId}
                  onChange={(e) => setFormData({...formData, scholarId: e.target.value})}
                  placeholder="e.g., 2414146"
                  className="w-full bg-gradient-to-b from-[#141105] to-[#0f0c03] border border-amber-950 focus:border-yellow-500/60 rounded-xl px-4 py-3 text-sm transition-all duration-300 outline-none text-white placeholder-amber-950/60 focus:shadow-[0_0_20px_rgba(234,179,8,0.15)] focus:bg-[#1a1608]"
                />
              </div>
            </div>

            {/* Two Column Setup for Contacts (Email & Phone) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-yellow-500/80 mb-2">◇ Institute Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="piyushs_ug_24@nits.ece.ac.in"
                  className="w-full bg-gradient-to-b from-[#141105] to-[#0f0c03] border border-amber-950 focus:border-yellow-500/60 rounded-xl px-4 py-3 text-sm transition-all duration-300 outline-none text-white placeholder-amber-950/60 focus:shadow-[0_0_20px_rgba(234,179,8,0.15)] focus:bg-[#1a1608]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-yellow-500/80 mb-2">◇ Phone Number</label>
                <input
                  type="text"
                  required
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                  placeholder="8559593859"
                  className="w-full bg-gradient-to-b from-[#141105] to-[#0f0c03] border border-amber-950 focus:border-yellow-500/60 rounded-xl px-4 py-3 text-sm transition-all duration-300 outline-none text-white placeholder-amber-950/60 focus:shadow-[0_0_20px_rgba(234,179,8,0.15)] focus:bg-[#1a1608]"
                />
              </div>
            </div>

            {/* Resume Link */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-yellow-500/80 mb-2">◇ Resume Drive Link</label>
              <input
                type="url"
                required
                value={formData.resumeLink}
                onChange={(e) => setFormData({...formData, resumeLink: e.target.value})}
                placeholder="https://drive.google.com/..."
                className="w-full bg-gradient-to-b from-[#141105] to-[#0f0c03] border border-amber-950 focus:border-yellow-500/60 rounded-xl px-4 py-3 text-sm transition-all duration-300 outline-none text-white placeholder-amber-950/60 focus:shadow-[0_0_20px_rgba(234,179,8,0.15)] focus:bg-[#1a1608]"
              />
              <span className="text-[10px] text-yellow-600/60 mt-1.5 block px-1">⚠ Set public link permissions ("anyone with the link").</span>
            </div>

            {/* Primary Domain Dropdown */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-yellow-500/80 mb-2">◇ Core Domain Preference</label>
              <div className="relative">
                <select
                  required
                  value={formData.teamPreference}
                  onChange={(e) => setFormData({...formData, teamPreference: e.target.value})}
                  className="w-full bg-gradient-to-b from-[#141105] to-[#0f0c03] border border-amber-950 focus:border-yellow-500/60 rounded-xl px-4 py-3 text-sm transition-all duration-300 outline-none text-white focus:shadow-[0_0_20px_rgba(234,179,8,0.15)] focus:bg-[#1a1608] appearance-none cursor-pointer"
                >
                  <option value="" disabled hidden>Select division segment</option>
                  <option value="technical" className="bg-[#0f0c03]">Technical Team</option>
                  <option value="design and media" className="bg-[#0f0c03]">Content Creation and Video Editing</option>
                  <option value="pr" className="bg-[#0f0c03]">Public Relations & Outreach</option>
                  <option value="event management" className="bg-[#0f0c03]">Event Management</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-yellow-500/60">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                </div>
              </div>
            </div>

            {/* Other Clubs Textarea */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-yellow-500/80 mb-2">◇ Concurrent Affiliations</label>
              <textarea
                rows="3"
                value={formData.otherClubs}
                onChange={(e) => setFormData({...formData, otherClubs: e.target.value})}
                placeholder="Mention any other clubs or boards you have currently deployed applications to..."
                className="w-full bg-gradient-to-b from-[#141105] to-[#0f0c03] border border-amber-950 focus:border-yellow-500/60 rounded-xl px-4 py-3 text-sm transition-all duration-300 outline-none text-white placeholder-amber-950/60 focus:shadow-[0_0_20px_rgba(234,179,8,0.15)] focus:bg-[#1a1608] resize-none"
              />
            </div>

            {/* Why you want to Join Textarea */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-yellow-500/80 mb-2">◇ Why do you want to join?</label>
              <textarea
                rows="3"
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                placeholder="Express your alignment with our initiatives..."
                className="w-full bg-gradient-to-b from-[#141105] to-[#0f0c03] border border-amber-950 focus:border-yellow-500/60 rounded-xl px-4 py-3 text-sm transition-all duration-300 outline-none text-white placeholder-amber-950/60 focus:shadow-[0_0_20px_rgba(234,179,8,0.15)] focus:bg-[#1a1608] resize-none"
              />
            </div>

            {/* Error Message rendering if failure occurs */}
            {error && <div className="text-xs text-yellow-500 text-center font-bold">{error}</div>}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-400 text-black font-black uppercase tracking-widest py-4 rounded-xl transition-all duration-300 shadow-[0_4px_25px_rgba(234,179,8,0.2)] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] active:scale-[0.99] border-t border-white/30 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing Submission...' : 'Submit Application'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RecruitmentForm;