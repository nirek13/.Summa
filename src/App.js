import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";  // Capitalized component name
import Home from "./components/landing";
import SignupFlow from "./components/signup";  // Correct component name
import InvestorDatabase from "./components/Search";
import MultimodalChatbot from "./components/chat";  // Correct component name
import Footer from "./components/footer";  // Correct component name

const App = () => {

    return (
        <div>
            <Navbar />
            {/* Corrected to match component name */}
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignupFlow />} />
                <Route path="/chat" element={<MultimodalChatbot />} />
                <Route path="/investors" element={<InvestorDatabase />} />
            </Routes>
            
        </div>
        
    );
};

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;
