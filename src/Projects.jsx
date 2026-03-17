import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./Projects.css";

// Section 1: Institution Projects Data
const institutionProjectsData = [
  {
    title: "PERSONAL PORTFOLIO",
    description:
      "A fully responsive portfolio site built with React and Vite to showcase work, skills, and contact information.",
    imagesrc: "assets/portfolio.png",
    githubUrl: "https://github.com/atmukesh01/portfolio",
  },
  {
    title: "IMMEDIATE UPDATE BANKING",
    description:
      "C++ project that simulates a real-time banking environment using an immediate update database modification approach.",
    imagesrc: "assets/Banking.jpeg",
    githubUrl: "https://github.com/atmukesh01/banking",
  },
  {
    title: "Financial Dashboard",
    description:
      "Dashboard to track income, expenses, and savings with dynamic charts and category filters.",
    imagesrc: "assets/track.jpeg",
    githubUrl: "https://github.com/atmukesh01/Expense-monitor",
  },
  {
    title: "ONLINE MCQ QUIZ APPLICATION",
    description:
      "Interactive quiz app with timer, multiple-choice questions, score tracking, and real-time feedback.",
    imagesrc: "/assets/mcq.png",
    githubUrl: "https://github.com/atmukesh01/Online-MCQ",
  },
  
  {
    title: "SNAPDIFF",
    description:
      "SnapDiff is a developer productivity tool that eliminates the wait time in software engineering. Most CI/CD pipelines waste hours running thousands of irrelevant tests for every tiny code change. SnapDiff changes that by mapping the internal nervous system of your codebase.",
    imagesrc: "assets/snapdiff.jfif",
    githubUrl: "https://github.com/atmukesh01/snapdiff",
  },
  {
    title: "TRADEFLOW",
    description:
      "Is a high-performance, discipline-focused trading ledger and analytics terminal. It is designed specifically for traders who prioritize risk management and precise record-keeping over manual spreadsheets.",
    imagesrc: "assets/tradeflow.jpeg",
    githubUrl: "https://github.com/atmukesh01/tradeflow",

  },
  {
    title: "GAMEHUB (CONTRIBUTOR)",
    description:
      "GameHub is a desktop-based Java application that acts as a central platform to play multiple mini-games in one place.It provides a simple, interactive GUI where users can switch between games seamlessly. Built using Java Swing, it serves as an all-in-one casual gaming application..",
    imagesrc: "/assets/gamehub.jpg",
    githubUrl: "https://github.com/Sandeepramasamy05/GAME-HUB",
  }

  
];

// Section 2: Industrial Projects Data (with placeholders)
const industrialProjectsData = [
  {
    title: " KSA E-Commerce Platform",
    description:
      "An e-commerce platform created for an oil manufacturing industry. Helps in showcasing the company's products and also allows the customers to buy edible oil through the website. Once the customer had submiited the address details from the cart the details are stored as a csv file including the payment details..",
    imagesrc: "/assets/ksa.png",
    githubUrl: "https://github.com/atmukesh01/KSA-E-commerce-",
  },
  {
    title: "Engineering model optimization tool",
    description:
      "This tool is a Python-based software application that uses machine learning to automatically find the optimal design parameters for engineering models. It intelligently explores a model's design space to improve performance, reduce costs, and accelerate the development cycle, replacing slow and manual trial-and-error methods..",
    imagesrc: "/assets/EMOT.png",
    githubUrl: "https://github.com/atmukesh01/EMOT",
  },
];


const LoadingName = () => {
  const name = "MUKESH";
  return (
    <div className="loading-container">
      <h1 className="loading-name">
        {name.split("").map((char, idx) => (
          <span
            key={idx}
            className="loading-letter"
            style={{ animationDelay: `${idx * 0.2}s` }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};

const Projects = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef(null);

  // This logic remains the same
  useEffect(() => {
    if (location.pathname === "/projects") {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  // This logic remains the same
  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    if (isLoading) {
      if (navbar) navbar.style.display = "none";
    } else {
      if (navbar) navbar.style.display = "flex";
    }
  }, [isLoading]);

  // This logic remains the same
  useEffect(() => {
    if (isLoading) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const particles = [];
    const mouse = { x: null, y: null };
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles.length = 0;
      for (let i = 0; i < 120; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2.5 + 1,
          baseX: Math.random() * canvas.width,
          baseY: Math.random() * canvas.height,
        });
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        let dx = mouse.x - p.x;
        let dy = mouse.y - p.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        const maxDistance = 200;
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          p.x -= (dx / distance) * force * 2.5;
          p.y -= (dy / distance) * force * 2.5;
        } else if (p.x !== p.baseX || p.y !== p.baseY) {
          p.x -= (p.x - p.baseX) / 30;
          p.y -= (p.y - p.baseY) / 30;
        }

        ctx.fillStyle = "rgba(180, 180, 180, 0.8)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.strokeStyle = "rgba(150, 150, 150, 0.4)";
      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          let dist = Math.sqrt(
            Math.pow(particles[i].x - particles[j].x, 2) +
              Math.pow(particles[i].y - particles[j].y, 2)
          );
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isLoading]);

  if (isLoading) {
    return <LoadingName />;
  }

  // UPDATED JSX to render two sections
  return (
    <>
      <canvas ref={canvasRef} className="web-canvas-full"></canvas>
      <main className="projects-main">
        {/* Section 1: Institution Projects */}
        <h2 className="projects-section-header">INSTITUTIONAL PROJECTS</h2>
        <div className="projects-container">
          {institutionProjectsData.map((project, index) => (
            <div key={index} className="project-card">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-image-container"
              >
                <img
                  src={project.imagesrc}
                  alt={`${project.title} screenshot`}
                  className="project-image"
                />
                <div className="image-overlay">
                  <span className="overlay-text">View on GitHub</span>
                </div>
              </a>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Section 2: Industrial Projects */}
        <h2 className="projects-section-header">INDUSTRIAL PROJECTS</h2>
        <div className="projects-container">
          {industrialProjectsData.map((project, index) => (
            <div key={index} className="project-card">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-image-container"
              >
                <img
                  src={project.imagesrc}
                  alt={`${project.title} screenshot`}
                  className="project-image"
                />
                <div className="image-overlay">
                  <span className="overlay-text">View on GitHub</span>
                </div>
              </a>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Projects;