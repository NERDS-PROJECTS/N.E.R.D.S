import { useState, useMemo } from "react";

const DEFAULT_CANDIDATES = [
  { id: "1", name: "Sadhika Sahu", scholarId: "25ME10034", branch: "Mechanical Engg." },
  { id: "2", name: "Nakshyatra Baruah", scholarId: "25ME10105", branch: "Mechanical Engg." },
  { id: "3", name: "Richa Kumari", scholarId: "25ME10032", branch: "Mechanical Engg." },
  { id: "4", name: "Rohan", scholarId: "25ME10149", branch: "Mechanical Engg." },
  { id: "5", name: "Muskaan Kumari", scholarId: "25EI10030", branch: "Electronics & Inst. Engg." },
  { id: "6", name: "Mohd Fahad Siraj", scholarId: "25EE10022", branch: "Electrical Engg." },
  { id: "7", name: "Ram kishor", scholarId: "25EC10142", branch: "Electronics & Comm. Engg." },
  { id: "8", name: "Sandeep sahni", scholarId: "25EC10128", branch: "Electronics & Comm. Engg." },
  { id: "9", name: "Muskan kumari", scholarId: "25EC10153", branch: "Electronics & Comm. Engg." },
  { id: "10", name: "Urvashe Bhat", scholarId: "25EC10077", branch: "Electronics & Comm. Engg." },
  { id: "11", name: "Affan Parwez", scholarId: "25CS10052", branch: "Computer Science & Engg." },
  { id: "12", name: "Diya", scholarId: "25CE10074", branch: "Civil Engg." },
  { id: "13", name: "Borsha dutta", scholarId: "25ME10006", branch: "Mechanical Engg." },
  { id: "14", name: "Achal Thanvi", scholarId: "25ME10150", branch: "Mechanical Engg." },
  { id: "15", name: "HIRAK BISWAS", scholarId: "25ME10085", branch: "Mechanical Engg." },
  { id: "16", name: "Debolina Choudhury", scholarId: "25EI10045", branch: "Electronics & Inst. Engg." },
  { id: "17", name: "Aadya Singh", scholarId: "25EI10002", branch: "Electronics & Inst. Engg." },
  { id: "18", name: "Dhanush Poladi", scholarId: "25EI10063", branch: "Electronics & Inst. Engg." },
  { id: "19", name: "Adarsh Seth", scholarId: "25EI10090", branch: "Electronics & Inst. Engg." },
  { id: "20", name: "Rheya Lakhera", scholarId: "25EI10087", branch: "Electronics & Inst. Engg." },
  { id: "21", name: "Prakriti Kumari", scholarId: "25EI10085", branch: "Electronics & Inst. Engg." },
  { id: "22", name: "Rishi Raj Sahu", scholarId: "25EE10073", branch: "Electrical Engg." },
  { id: "23", name: "Prashant Deep Verma", scholarId: "25EE10146", branch: "Electrical Engg." },
  { id: "24", name: "Shrey Garg", scholarId: "25EE10144", branch: "Electrical Engg." },
  { id: "25", name: "Sajan Kumar Jaiswal", scholarId: "25EC10159", branch: "Electronics & Comm. Engg." },
  { id: "26", name: "Akshit K Rajeev", scholarId: "25EC10138", branch: "Electronics & Comm. Engg." },
  { id: "27", name: "Manohar Mahto", scholarId: "25EC10116", branch: "Electronics & Comm. Engg." },
  { id: "28", name: "Devesh Patil", scholarId: "25EC10101", branch: "Electronics & Comm. Engg." },
  { id: "29", name: "Razaryan Sahoo", scholarId: "25EC10118", branch: "Electronics & Comm. Engg." },
  { id: "30", name: "Luvya Trehan", scholarId: "25EC10030", branch: "Electronics & Comm. Engg." },
  { id: "31", name: "Prasurjya Madhur Saikia", scholarId: "25EC10014", branch: "Electronics & Comm. Engg." },
  { id: "32", name: "Kislay Kumar", scholarId: "25EC10071", branch: "Electronics & Comm. Engg." },
  { id: "33", name: "Hritabrata Chakraborty", scholarId: "25EC10005", branch: "Electronics & Comm. Engg." },
  { id: "34", name: "Hrishikesh Majumdar", scholarId: "25EC10106", branch: "Electronics & Comm. Engg." },
  { id: "35", name: "LAKSHYA RAJ", scholarId: "25EC10099", branch: "Electronics & Comm. Engg." },
  { id: "36", name: "Angana Borah", scholarId: "25EC10009", branch: "Electronics & Comm. Engg." },
  { id: "37", name: "Sujal Ojha", scholarId: "25EC10102", branch: "Electronics & Comm. Engg." },
  { id: "38", name: "Kaushika Goswami", scholarId: "25EC10032", branch: "Electronics & Comm. Engg." },
  { id: "39", name: "Anubrata Paul", scholarId: "25EC10080", branch: "Electronics & Comm. Engg." },
  { id: "40", name: "Supratim Paul", scholarId: "25EC10070", branch: "Electronics & Comm. Engg." },
  { id: "41", name: "Khushboo pareek", scholarId: "25EC10151", branch: "Electronics & Comm. Engg." },
  { id: "42", name: "Kankan kalita", scholarId: "25CS10124", branch: "Computer Science & Engg." },
  { id: "43", name: "Sakib Ashraf", scholarId: "25CS10110", branch: "Computer Science & Engg." },
  { id: "44", name: "RUKMINA BEGUM", scholarId: "25CS10047", branch: "Computer Science & Engg." },
  { id: "45", name: "Avishikta Das", scholarId: "25CE10117", branch: "Civil Engg." },
  { id: "46", name: "SAMADRITA SEN", scholarId: "25EC10008", branch: "Electronics & Comm. Engg." },
  { id: "47", name: "Sudipta Kashyap Sharma", scholarId: "25ME10003", branch: "Mechanical Engg." },
  { id: "48", name: "Uddipto Baruah", scholarId: "25ME10040", branch: "Mechanical Engg." },
  { id: "49", name: "Sai Sahana", scholarId: "25ME10153", branch: "Mechanical Engg." },
  { id: "50", name: "Shauryan Bokshe", scholarId: "25ME10120", branch: "Mechanical Engg." },
  { id: "51", name: "Himangshu Sarma", scholarId: "25ME10070", branch: "Mechanical Engg." },
  { id: "52", name: "Edavelly Madhusudhan Reddy", scholarId: "25ME10139", branch: "Mechanical Engg." },
  { id: "53", name: "Md Huzaifa Ehsan", scholarId: "25ME10106", branch: "Mechanical Engg." },
  { id: "54", name: "Darsipudi neha", scholarId: "25ME10112", branch: "Mechanical Engg." },
  { id: "55", name: "Adarsha Gope", scholarId: "25ME10029", branch: "Mechanical Engg." },
  { id: "56", name: "Saride Neeraja Sree Nikhila", scholarId: "25ME10122", branch: "Mechanical Engg." },
  { id: "57", name: "Dikshant kumar", scholarId: "25ME10037", branch: "Mechanical Engg." },
  { id: "58", name: "P.Siva Prasad", scholarId: "25ME10114", branch: "Mechanical Engg." },
  { id: "59", name: "Tolapu Sowmya", scholarId: "25ME10107", branch: "Mechanical Engg." },
  { id: "60", name: "Putta Sai Pavan Kumar", scholarId: "25ME10094", branch: "Mechanical Engg." },
  { id: "61", name: "Omkar Kharabe", scholarId: "25ME10048", branch: "Mechanical Engg." },
  { id: "62", name: "Mridupawan Das", scholarId: "25ME10078", branch: "Mechanical Engg." },
  { id: "63", name: "Ishaan Bansal", scholarId: "25EI10070", branch: "Electronics & Inst. Engg." },
  { id: "64", name: "Arpan Paul", scholarId: "25EI10014", branch: "Electronics & Inst. Engg." },
  { id: "65", name: "Himan Kalita", scholarId: "25EI10016", branch: "Electronics & Inst. Engg." },
  { id: "66", name: "Mausam Barman", scholarId: "25EI10004", branch: "Electronics & Inst. Engg." },
  { id: "67", name: "Pragyan Pratim Saikia", scholarId: "25EI10036", branch: "Electronics & Inst. Engg." },
  { id: "68", name: "Divyanshu", scholarId: "25EI10093", branch: "Electronics & Inst. Engg." },
  { id: "69", name: "Sandepon Dasgupta", scholarId: "25EE10076", branch: "Electrical Engg." },
  { id: "70", name: "Abhay Kumar Sah", scholarId: "25EE10035", branch: "Electrical Engg." },
  { id: "71", name: "Ayush Kumar", scholarId: "25EE10092", branch: "Electrical Engg." },
  { id: "72", name: "Firujur Rahman Barbhuiya", scholarId: "25EE10103", branch: "Electrical Engg." },
  { id: "73", name: "Prachi Phukan", scholarId: "25EE10003", branch: "Electrical Engg." },
  { id: "74", name: "Rahul Bhatia", scholarId: "25EE10142", branch: "Electrical Engg." },
  { id: "75", name: "Aditya Singh", scholarId: "25EC10075", branch: "Electronics & Comm. Engg." },
  { id: "76", name: "Subhankar Paik", scholarId: "25EC10050", branch: "Electronics & Comm. Engg." },
  { id: "77", name: "Aditya Raj", scholarId: "25EC10043", branch: "Electronics & Comm. Engg." },
  { id: "78", name: "Violina Bharali", scholarId: "25EC10034", branch: "Electronics & Comm. Engg." },
  { id: "79", name: "Shreshtha Awasthi", scholarId: "25EC10100", branch: "Electronics & Comm. Engg." },
  { id: "80", name: "SURAJ REDDY NATALA", scholarId: "25EC10156", branch: "Electronics & Comm. Engg." },
  { id: "81", name: "Nikhil Mathew", scholarId: "25EC10006", branch: "Electronics & Comm. Engg." },
  { id: "82", name: "KORADA VENKATA SASI SAAKETH RAO", scholarId: "25EC10144", branch: "Electronics & Comm. Engg." },
  { id: "83", name: "Siddharth kumar", scholarId: "25EC10047", branch: "Electronics & Comm. Engg." },
  { id: "84", name: "Nishant Singh", scholarId: "25EC10126", branch: "Electronics & Comm. Engg." },
  { id: "85", name: "Sharmistha Buragohain", scholarId: "25EC10015", branch: "Electronics & Comm. Engg." },
  { id: "86", name: "Simran Godhwani", scholarId: "25EC10133", branch: "Electronics & Comm. Engg." },
  { id: "87", name: "Zamima Tanzima Barik", scholarId: "25CS10018", branch: "Computer Science & Engg." },
  { id: "88", name: "BINIT GOGOI", scholarId: "25CS10137", branch: "Computer Science & Engg." },
  { id: "89", name: "Debarka Das Gupta", scholarId: "25CS10127", branch: "Computer Science & Engg." },
  { id: "90", name: "Deepanjali Bhattacharjee", scholarId: "25CE10032", branch: "Civil Engg." }
];

const Results = ({ candidates = DEFAULT_CANDIDATES }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedBranch, setSelectedBranch] = useState("All");

    // Dynamic extraction of available branches
    const branches = useMemo(() => {
        const set = new Set(candidates.map((c) => c.branch));
        return ["All", ...Array.from(set)];
    }, [candidates]);

    // Filtering logic based on search term and branch
    const filteredCandidates = useMemo(() => {
        return candidates.filter((candidate) => {
            const matchesQuery =
                candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                candidate.scholarId.toLowerCase().includes(searchQuery.toLowerCase());
            
            const matchesBranch =
                selectedBranch === "All" || candidate.branch === selectedBranch;

            return matchesQuery && matchesBranch;
        });
    }, [searchQuery, selectedBranch, candidates]);

    return (
        <div className="bg-black text-white py-16 px-6 sm:px-12 md:px-20 lg:px-32 border-t border-yellow-500/20">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                            Quiz Results & Interview Shortlist
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">
                            Candidates qualified for the offline interview round.
                        </p>
                    </div>

                    {/* Controls: Search and Filter */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="text"
                            placeholder="Search Name or Scholar ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="px-4 py-2 bg-neutral-900 border border-neutral-700 focus:border-yellow-400 rounded-lg text-sm text-white placeholder-gray-500 outline-none transition-colors"
                        />
                        <select
                            value={selectedBranch}
                            onChange={(e) => setSelectedBranch(e.target.value)}
                            className="px-4 py-2 bg-neutral-900 border border-neutral-700 focus:border-yellow-400 rounded-lg text-sm text-white outline-none transition-colors"
                        >
                            {branches.map((b) => (
                                <option key={b} value={b} className="bg-neutral-900">
                                    {b === "All" ? "All Branches" : b}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Candidate Table */}
                <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950">
                    <table className="w-full text-left text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-neutral-800 bg-neutral-900/80 text-yellow-400 uppercase tracking-wider font-semibold text-xs">
                                <th className="py-4 px-6">#</th>
                                <th className="py-4 px-6">Candidate Name</th>
                                <th className="py-4 px-6">Scholar ID</th>
                                <th className="py-4 px-6">Branch</th>
                                <th className="py-4 px-6 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800/60 text-gray-300">
                            {filteredCandidates.length > 0 ? (
                                filteredCandidates.map((candidate, index) => (
                                    <tr key={candidate.id} className="hover:bg-neutral-900/50 transition-colors">
                                        <td className="py-4 px-6 text-neutral-500 font-mono">{index + 1}</td>
                                        <td className="py-4 px-6 font-medium text-white">{candidate.name}</td>
                                        <td className="py-4 px-6 font-mono text-yellow-500/90">{candidate.scholarId}</td>
                                        <td className="py-4 px-6">{candidate.branch}</td>
                                        <td className="py-4 px-6 text-right">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-400/10 text-yellow-400 border border-yellow-400/30">
                                                Shortlisted
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-gray-500">
                                        No candidates found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Results;