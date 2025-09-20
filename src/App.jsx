import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate, useLocation } from "react-router-dom";
import { FaUser, FaCode, FaProjectDiagram, FaEnvelope, FaFileAlt } from 'react-icons/fa';
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";
import Skillset from "./Skillset";
import "./App.css";

const AppContent = () => {
  const location = useLocation();

  // --- CHANGE 1: Add '/contact' to the initial state check ---
  const [isPageLoading, setIsPageLoading] = useState(() => {
    const initialPath = window.location.pathname;
    return initialPath === '/about' || initialPath === '/skillset' || initialPath === '/contact' || initialPath === '/';
  });

  // --- CHANGE 2: Add '/contact' to the useEffect check ---
  useEffect(() => {
    if (location.pathname === '/about' || location.pathname === '/skillset' || location.pathname === '/contact') {
      setIsPageLoading(true);
    }
  }, [location]);

  const handleLoadingComplete = () => {
    setIsPageLoading(false);
  };

  return (
    <>
      {!isPageLoading && (
        <header className="navbar">
          <nav className="nav-right">
            <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : undefined)}>
              <FaUser /> About
            </NavLink>
            <NavLink to="/skillset" className={({ isActive }) => (isActive ? "active" : undefined)}>
              <FaCode /> Skillset
            </NavLink>
            <NavLink to="/projects" className={({ isActive }) => (isActive ? "active" : undefined)}>
              <FaProjectDiagram /> Projects
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : undefined)}>
              <FaEnvelope /> Contact
            </NavLink>
            <a 
              href="src/assets/Resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="resume-button"
            >
              <FaFileAlt /> View Resume
            </a>
          </nav>
        </header>
      )}

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/about" replace />} />
          <Route
            path="/about"
            element={<About isPageLoading={isPageLoading} onLoadingComplete={handleLoadingComplete} />}
          />
          <Route
            path="/skillset"
            element={<Skillset isPageLoading={isPageLoading} onLoadingComplete={handleLoadingComplete} />}
          />
          <Route path="/projects" element={<Projects />} />
          {/* --- CHANGE 3: Pass loading props to the Contact route --- */}
          <Route 
            path="/contact" 
            element={<Contact isPageLoading={isPageLoading} onLoadingComplete={handleLoadingComplete} />} 
          />
          <Route path="*" element={<Navigate to="/about" replace />} />
        </Routes>
      </main>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;