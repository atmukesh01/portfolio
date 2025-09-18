import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./Projects.css";

// We no longer import the images.
// Instead, we use direct string paths to the 'public' folder.

const projectsData = [
  {
    title: "Personal Portfolio Website",
    description:
      "A fully responsive portfolio site built with React to showcase work, skills, and contact information.",
    imagesrc: "src/assets/portfolio.png", // Path from the public folder
    githubUrl: "https://github.com/atmukesh01/portfolio",
  },
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce application with product listing, shopping cart, checkout, and payment integration.",
    imagesrc: "/assets/ecommerce.png", // Path from the public folder
    githubUrl: "https://github.com/your-username/ecommerce-platform",
  },
  {
    title: "Financial Dashboard",
    description:
      "Dashboard to track income, expenses, and savings with dynamic charts and category filters.",
    imagesrc: "/assets/dashboard.png", // Path from the public folder
    githubUrl: "https://github.com/your-username/financial-dashboard",
  },
  {
    title: "Quiz Application",
    description:
      "Interactive quiz app with timer, multiple-choice questions, score tracking, and real-time feedback.",
    imagesrc: "/assets/quiz.png", // Path from the public folder
    githubUrl: "https://github.com/your-username/quiz-app",
  },
  {
    title: "Network Scanner Tool",
    description:
      "Command-line tool using Python to scan IP ranges and detect active hosts and open ports.",
    imagesrc: "/assets/scanner.png", // Path from the public folder
    githubUrl: "https://github.com/your-username/network-scanner",
  },
  {
    title: "Task Management System",
    description:
      "A task organizer with user authentication, task creation, deadline notifications, and priority sorting.",
    imagesrc: "/assets/taskmanager.png", // Path from the public folder
    githubUrl: "https://github.com/your-username/task-manager",
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

  // Reset loading state and timer every time pathname is /projects
  useEffect(() => {
    if (location.pathname === "/projects") {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  // Show/hide navbar based on isLoading state
  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    if (isLoading) {
      if (navbar) navbar.style.display = "none";
    } else {
      if (navbar) navbar.style.display = "flex";
    }
  }, [isLoading]);

  // Canvas animation effect, runs only when not loading
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

  return (
    <>
      <canvas ref={canvasRef} className="web-canvas-full"></canvas>
      <main className="projects-main">
        <h1 className="projects-header">My Projects</h1>
        <div className="projects-container">
          {projectsData.map((project, index) => (
            <div key={index} className="project-card">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-image-container"
              >
                <img
                  src={project.imagesrc} // This works because the path is now correct
                  alt={`${project.title} screenshot`}
                  className="project-image"
                />
                <div className="image-overlay">
                  <span className="overlay-text">View on GitHub</span>
                </div>
              </a>
              <div className="project-content">
                <h2 className="project-title">{project.title}</h2>
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