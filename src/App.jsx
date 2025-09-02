import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Event from "./Pages/Event/Event";
import Team from "./Pages/Team/Team";
import Gallery from "./Pages/Gallery/Gallery";
import Contact from "./Pages/Contact/Contact";
import Navbar from "./components/Navbar/navbar";
import Footer from "./components/Footer/footer";
import Error from "./Pages/Error/Error";
import LoadingAnimation from "./components/Loader/Loader"; 
import Merch from "./Pages/Merch/Merch";
import MerchPay from "./Pages/Merch/MerchPay";
import Giveaway from './Pages/Giveaway/Giveaway';
import Track_order from "./Pages/Merch/Track_order";




// ScrollToTop Component
const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Router>
        <ScrollToTop />
        {loading ? (
          <LoadingAnimation />
        ) : (
          <>
            <div className="sticky top-0 z-50 w-full">
              <Navbar />
            </div>

            <div className="flex-grow w-full">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/event" element={<Event />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/team" element={<Team />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/merch" element={<Merch />} />
                <Route path="/merchPay" element={<MerchPay />} />
                <Route path="/giveaway" element={<Giveaway />} /> 
                <Route path="/trackOrder" element={<Track_order/>} /> 
                {/* Catch-all route for 404 page */}
                <Route path="*" element={<Error />} />
              </Routes>
            </div>

            <Footer />
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
