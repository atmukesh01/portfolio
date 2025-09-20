import React, { useEffect, useRef } from 'react';
import './Contact.css';

// The loading animation component
const LoadingName = () => {
  const name = "MUKESH";
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

// SVG Icons for the links
const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const LinkedInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

// The component accepts props from App.js
const Contact = ({ isPageLoading, onLoadingComplete }) => {
  const canvasRef = useRef(null);
  
  // This useEffect uses the props to control the loading duration
  useEffect(() => {
    if (isPageLoading) {
      const timer = setTimeout(() => {
        onLoadingComplete();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isPageLoading, onLoadingComplete]);

  // The canvas animation hook
  useEffect(() => {
    if (isPageLoading) return; 
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles = [];
    const mouse = { x: null, y: null };
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
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
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
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
        
        ctx.fillStyle = "rgba(120, 120, 120, 0.8)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.strokeStyle = "rgba(80, 80, 80, 0.6)";
      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          let dist = Math.sqrt(
            (particles[i].x - particles[j].x) ** 2 +
            (particles[i].y - particles[j].y) ** 2
          );
          if (dist < 130) {
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

  return isPageLoading ? (
    <LoadingName />
  ) : (
    <div className="contact-page">
      <canvas ref={canvasRef} className="web-canvas-full"></canvas>
      <div className="contact-container">
        <div className="contact-left">
          <img 
            src="src/assets/gemini.png" 
            alt="Profile" 
            className="contact-image"
          />
        </div>
        <div className="contact-right">
          <h2 className="contact-heading">Get in Touch</h2>
          <p className="contact-subheading">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
          <div className="contact-links">
            <a href="mailto:iammukesh1075@gmail.com" className="contact-link-item">
              <EmailIcon />
              <span>Email Me</span>
            </a>
            {/* --- THIS IS THE UPDATED LINE --- */}
            <a href="https://ig.me/m/itsme_mukezz" target="_blank" rel="noopener noreferrer" className="contact-link-item">
              <InstagramIcon />
              <span>Instagram</span>
            </a>
            <a href="https://www.linkedin.com/in/mukesh-t-b1500a31b/" className="contact-link-item">
              <LinkedInIcon />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;