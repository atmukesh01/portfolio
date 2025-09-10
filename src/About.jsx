import React, { useState, useEffect } from "react";
import "./About.css";

const profileImage = "/profile.jpg";
const linkedInUrl = "https://www.linkedin.com/in/yourprofile";
const githubUrl = "https://github.com/atmukesh01";
const leetCodeUrl = "https://leetcode.com/Mukesht";

const LoadingName = () => {
  const name = "Mukesh";
  return (
    <div className="loading-container">
      <h1 className="loading-name">
        {name.split("").map((char, idx) => (
          <span
            key={idx}
            className="loading-letter"
            style={{ animationDelay: `${idx * 0.3}s` }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};
window.addEventListener('load', () => {
  // Wait for bounceFade animations to finish (about 1s)
  setTimeout(() => {
    const loadingName = document.querySelector('.loading-name');
    if (loadingName) {
      loadingName.classList.add('fade-out');
    }
  }, 1200);
});

window.addEventListener('load', () => {
  setTimeout(() => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.style.visibility = 'visible';
    }
  }, 3000); // slightly longer than animation duration
});

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <LoadingName />
      ) : (
        <>
          <nav className="navbar">
            <div className="nav-right">
              <a href="#about" className="nav-link">About</a>
              <a href="#skills" className="nav-link">Skillset</a>
              <a href="#projects" className="nav-link">Projects</a>
              <a href="#contact" className="nav-link">Contact</a>
            </div>
          </nav>

          <div id="animated-bg" />

          <section className="about-section" id="about">
            <img src={profileImage} alt="" className="profile-image top-right" />
            <div className="content-center">
              <h1>About Me</h1>
              <p>
                I am driven by the process of deconstructing complex problems into manageable components and building robust, scalable solutions. My academic coursework has provided me with a strong foundation in algorithmic design and data structures, which I have applied in developing end-to-end software solutions. I am eager to bring my problem-solving mindset and collaborative spirit to a challenging internship role.
              </p>
              <div className="social-icons">
                <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                  <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" />
                </a>
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" title="GitHub">
                  <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" />
                </a>
                <a href={leetCodeUrl} target="_blank" rel="noopener noreferrer" title="LeetCode">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png" alt="LeetCode" />
                </a>
                
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default About;
