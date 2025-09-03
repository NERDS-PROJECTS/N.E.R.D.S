import { useState } from 'react';
import { utils } from '/src/config/firebase.js';

export default function SuccessPage({ user }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(user.uniqueId).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const handleDownload = () => {
        const data = `
Giveaway Competition - Winner Details
=====================================
Name: ${user.name}
Scholar ID: ${user.scholarId}
Unique ID: ${user.uniqueId}
Riddle Solved: ${user.solvedRiddle}
Date: ${new Date().toLocaleString()}
Please save this unique ID to claim your prize!
Contact support with this ID for prize redemption.
`;
        const filename = `giveaway-winner-${user.uniqueId}.txt`;
        utils.downloadText(data, filename);
    };


    return (
        <div className="w-full max-w-2xl mx-auto bg-black/30 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-12 text-center flex flex-col gap-4 sm:gap-6 md:gap-8">
            <h2 className="font-heading text-3xl xs:text-4xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wider mb-2">
                <span className="bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text">
                    Congratulations!
                </span>
            </h2>
            <p className="text-slate-400 mt-2 mb-4 sm:mb-8 text-base sm:text-lg">You solved the riddle correctly! And have entered the Lucky Draw</p>

            {/* Unique ID Section */}
            <div className="text-center bg-black/20 border border-white/20 rounded-lg p-4 sm:p-6 my-4 sm:my-8 flex flex-col items-center">
                <h3 className="text-base sm:text-lg font-semibold text-white uppercase tracking-wider">Your Unique ID</h3>
                <div className="flex flex-col xs:flex-row items-center justify-center gap-2 sm:gap-4 mt-4 w-full">
                    <span className="font-mono text-xl xs:text-2xl md:text-3xl text-cyan-300 my-2 break-all">
                        {user.uniqueId}
                    </span>
                    <button
                        onClick={handleCopy}
                        title="Copy to clipboard"
                        className={`p-2 sm:p-3 rounded-lg transition-all duration-300 ${copied ? 'bg-cyan-500/50 text-white' : 'bg-black/20 border border-white/30 hover:bg-white/10'}`}
                    >
                        {copied ? '✅' : '📋'}
                    </button>
                </div>
                <p className="text-xs sm:text-sm text-amber-400 mt-4">
                    <strong>Important:</strong> Please save this ID to claim your prize! Top 10 Winners will be selected randomly for a final Match on Orientation.
                </p>
            </div>

            {/* Participant Details Section */}
            <div className="text-left bg-black/20 border border-white/20 rounded-lg p-4 sm:p-6 my-4 sm:my-8 w-full">
                <h4 className="text-sm sm:text-md font-semibold text-white text-center uppercase tracking-wider mb-4">Participant Details</h4>
                <div className="space-y-2 sm:space-y-3">
                    <div className="flex flex-col xs:flex-row justify-between border-b border-white/20 pb-2 gap-1 xs:gap-0">
                        <span className="font-medium text-slate-400">Name:</span>
                        <span className="font-semibold text-white text-right xs:text-left">{user.name}</span>
                    </div>
                    <div className="flex flex-col xs:flex-row justify-between border-b border-white/20 pb-2 gap-1 xs:gap-0">
                        <span className="font-medium text-slate-400">Scholar ID:</span>
                        <span className="font-semibold text-white text-right xs:text-left">{user.scholarId}</span>
                    </div>
                    <div className="flex flex-col xs:flex-row justify-between gap-1 xs:gap-0">
                        <span className="font-medium text-slate-400">Riddle Solved:</span>
                        <span className="font-semibold text-white text-right xs:text-left">{user.solvedRiddle}</span>
                    </div>
                </div>
            </div>

            <div className="mt-4 sm:mt-8 w-full">
                <button
                    onClick={handleDownload}
                    className="w-full font-bold text-white bg-transparent border-2 border-purple-500 hover:bg-purple-500 rounded-lg py-2 sm:py-3 px-4 sm:px-8 transition duration-300 transform hover:scale-105 text-base sm:text-lg"
                >
                    Download ID
                </button>
            </div>
        </div>
    );
};