import React, { useEffect, useRef } from "react";
import "./skillset.css";

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

const skills = [
    { name: "C", src: "https://cdn.jsdelivr.net/npm/devicon/icons/c/c-original.svg" },
    { name: "C++", src: "https://cdn.jsdelivr.net/npm/devicon/icons/cplusplus/cplusplus-original.svg" },
    { name: "HTML", src: "https://cdn.jsdelivr.net/npm/devicon/icons/html5/html5-original.svg" },
    { name: "CSS", src: "https://cdn.jsdelivr.net/npm/devicon/icons/css3/css3-original.svg" },
    { name: "JavaScript", src: "https://cdn.jsdelivr.net/npm/devicon/icons/javascript/javascript-original.svg" },
    { name: "PHP", src: "https://cdn.jsdelivr.net/npm/devicon/icons/php/php-original.svg" },
    { name: "Python", src: "https://cdn.jsdelivr.net/npm/devicon/icons/python/python-original.svg" },
    { name: "Java", src: "https://cdn.jsdelivr.net/npm/devicon/icons/java/java-original.svg" },
    { name: "TypeScript", src: "https://cdn.jsdelivr.net/npm/devicon/icons/typescript/typescript-original.svg" },
    { name: "Bootstrap", src: "https://cdn.jsdelivr.net/npm/devicon/icons/bootstrap/bootstrap-original.svg" },
    { name: "Flask", src: "https://cdn.jsdelivr.net/npm/devicon/icons/flask/flask-original.svg" },
    { name: "Angular", src: "https://cdn.jsdelivr.net/npm/devicon/icons/angular/angular-original.svg" },
    { name: "React", src: "https://cdn.jsdelivr.net/npm/devicon/icons/react/react-original.svg" },
    { name: "Node.js", src: "https://cdn.jsdelivr.net/npm/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Express", src: "https://cdn.jsdelivr.net/npm/devicon/icons/express/express-original.svg" },
    { name: "Django", src: "https://cdn.jsdelivr.net/npm/devicon/icons/django/django-plain.svg" },
    { name: "Next.js", src: "https://cdn.jsdelivr.net/npm/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "Git", src: "https://cdn.jsdelivr.net/npm/devicon/icons/git/git-original.svg" },
    { name: "GitHub", src: "https://cdn.jsdelivr.net/npm/devicon/icons/github/github-original.svg" },
    { name: "Linux", src: "https://cdn.jsdelivr.net/npm/devicon/icons/linux/linux-original.svg" },
    { name: "MySQL", src: "https://cdn.jsdelivr.net/npm/devicon/icons/mysql/mysql-original.svg" },
    { name: "Oracle", src: "https://cdn.jsdelivr.net/npm/devicon/icons/oracle/oracle-original.svg" },
    { name: "MongoDB", src: "https://cdn.jsdelivr.net/npm/devicon/icons/mongodb/mongodb-original.svg" }
];


const Skillset = ({ isPageLoading, onLoadingComplete }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isPageLoading) {
      const timer = setTimeout(() => {
        onLoadingComplete();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isPageLoading, onLoadingComplete]);

  useEffect(() => {
    if (isPageLoading) return;
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
    window.addEventListener('resize', resizeCanvas);

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


  return (
    <>
      {isPageLoading ? (
        <LoadingName />
      ) : (
        <>
          <canvas ref={canvasRef} className="web-canvas-full"></canvas>
          <div className="honeycomb-container">
            <h2 className="skills-heading">Languages and Tools</h2>
            <div className="honeycomb-grid">
              {skills.map(({ src, name }, idx) => (
                <div className="honeycomb-cell" key={idx}>
                  <div className="honeycomb-content">
                    <img src={src} alt={name} />
                    <p className="skill-name">{name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Skillset;