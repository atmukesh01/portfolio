import React, { useEffect, useRef } from "react";
import "./about.css";

// --- CONSTANTS ---
const profileImage = "/src/assets/blr.jpg";
const linkedInUrl = "https://www.linkedin.com/in/mukesh-t-b1500a31b/";
const githubUrl = "https://github.com/atmukesh01";
const leetCodeUrl = "https://leetcode.com/Mukesh036";

// --- LOADING COMPONENT ---
const LoadingName = () => {
  const name = "Mukesh";
  return (
    <div className="loading-container">
      <h1 className="loading-name">
        {name.split("").map((char, idx) => (
          <span key={idx} className="loading-letter" style={{ animationDelay: `${idx * 0.3}s` }}>
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};

// --- MAIN ABOUT COMPONENT ---
const About = ({ isPageLoading, onLoadingComplete }) => {
  const canvasRef = useRef(null);

  // Effect for the 3-second loading timer
  useEffect(() => {
    if (isPageLoading) {
      const timer = setTimeout(() => {
        onLoadingComplete();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isPageLoading, onLoadingComplete]);

  // Effect for the full-screen canvas spider web animation
  useEffect(() => {
    if (isPageLoading) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    const particles = [];
    const mouse = { x: null, y: null };
    let animationFrameId;

    const resizeCanvas = () => {
      // CHANGE: Use window dimensions for a full-screen canvas
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles.length = 0;
      // Use more particles for the larger area
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
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    // CHANGE: Listen for mouse movement on the entire window
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        let dx = mouse.x - p.x;
        let dy = mouse.y - p.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        // Smoother animation logic
        const maxDistance = 200;
        if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            p.x -= forceDirectionX * force * 2.5;
            p.y -= forceDirectionY * force * 2.5;
        } else if (p.x !== p.baseX || p.y !== p.baseY) {
            p.x -= (p.x - p.baseX) / 30;
            p.y -= (p.y - p.baseY) / 30;
        }

        ctx.fillStyle = "rgba(80, 80, 80, 0.8)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      ctx.strokeStyle = "rgba(50, 50, 50, 0.6)";
      ctx.lineWidth = 3;
      
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
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isPageLoading]);

  return (
    <>
      {isPageLoading ? (
        <LoadingName />
      ) : (
        <>
          {/* CHANGE: Canvas is now outside the section for fullscreen */}
          <canvas ref={canvasRef} className="web-canvas-full-about"></canvas>
          <section className="about-section" id="about">
            <img src={profileImage} alt="profile" className="profile-image top-right" />
            <div className="content-center">
              <h1>About Me</h1>
              <p>
                I am driven by the process of deconstructing complex problems and building robust, scalable solutions. My academic coursework has provided me with a strong foundation in algorithmic design and data structures, which I have applied in developing end-to-end software solutions. I am eager to bring my problem-solving mindset and collaborative spirit to a challenging internship role.
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

