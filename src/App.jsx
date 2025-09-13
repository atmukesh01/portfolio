import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate, useLocation } from "react-router-dom";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";
import Skillset from "./Skillset";
import "./App.css";

// We need a wrapper component to use the useLocation hook
const AppContent = () => {
  const location = useLocation();
  const [isPageLoading, setIsPageLoading] = useState(false);

  // This effect runs EVERY time the URL changes
  useEffect(() => {
    // Check if the new page is one that needs a loader
    if (location.pathname === '/about' || location.pathname === '/skillset') {
      setIsPageLoading(true);
    }
  }, [location]); // Dependency is the location object

  const handleLoadingComplete = () => {
    setIsPageLoading(false);
  };

  return (
    <>
      {/* Conditionally render the navbar based on the loading state */}
      {!isPageLoading && (
        <header className="navbar">
          <nav className="nav-right">
            <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : undefined)}>
              About
            </NavLink>
            <NavLink to="/skillset" className={({ isActive }) => (isActive ? "active" : undefined)}>
              Skillset
            </NavLink>
            <NavLink to="/projects" className={({ isActive }) => (isActive ? "active" : undefined)}>
              Projects
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : undefined)}>
              Contact
            </NavLink>
          </nav>
          <img
            src="src/assets/resume.png"
            alt="Resume Preview"
            className="resume-image"
            onClick={() => window.open('src/assets/Resume.pdf', '_blank')}
          />
        </header>
      )}

      <main className="main-content no-scroll">
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
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/about" replace />} />
        </Routes>
      </main>
    </>
  );
};

// The main App component now just sets up the Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;