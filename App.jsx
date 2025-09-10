// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from "react-router-dom";
import About from "./about";
import Projects from "./projects";
import Contact from "./Contact";
import Skillset from "./Skillset";
import "./App.css";

function App() {
  return (
    <Router>
      <header className="navbar">
        <div className=""></div>
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
      </header>

      <main className="main-content no-scroll">
        <Routes>
          <Route path="/" element={<Navigate to="/about" replace />} />
          <Route path="/about" element={<About />} />
          <Route path="/skillset" element={<Skillset />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/about" replace />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
