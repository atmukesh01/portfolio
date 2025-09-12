import React from "react";
import "./Skillset.css";

// Array of skill logos with image source and name (replace src with your actual paths)
const skills = [
  { name: "C", src: "/assets/c-logo.svg" },
  { name: "C++", src: "/assets/cpp-logo.svg" },
  { name: "HTML", src: "/assets/html-logo.svg" },
  { name: "CSS", src: "/assets/css-logo.svg" },
  { name: "Bootstrap", src: "/assets/bootstrap-logo.svg" },
  { name: "JavaScript", src: "/assets/javascript-logo.svg" },
  { name: "PHP", src: "/assets/php-logo.svg" },
  { name: "Git", src: "/assets/git-logo.svg" },
  { name: "GitHub", src: "/assets/github-logo.svg" },
  { name: "Python", src: "/assets/python-logo.svg" },
  { name: "Flask", src: "/assets/flask-logo.svg" },
  { name: "Linux", src: "/assets/linux-logo.svg" },
  { name: "Arduino", src: "/assets/arduino-logo.svg" },
  { name: "x86", src: "/assets/x86-logo.svg" },
  { name: "Arch Linux", src: "/assets/arch-logo.svg" },
  { name: "Java", src: "/assets/java-logo.svg" },
  { name: "MySQL", src: "/assets/mysql-logo.svg" },
  { name: "Oracle", src: "/assets/oracle-logo.svg" },
  { name: "SQL Server", src: "/assets/sqlserver-logo.svg" },
  { name: "MongoDB", src: "/assets/mongodb-logo.svg" },
  { name: "OpenCV", src: "/assets/opencv-logo.svg" },
  { name: "TypeScript", src: "/assets/typescript-logo.svg" },
  { name: "Angular", src: "/assets/angular-logo.svg" },
  { name: "React", src: "/assets/react-logo.svg" },
  { name: "Node.js", src: "/assets/nodejs-logo.svg" },
  { name: "Express", src: "/assets/express-logo.svg" },
  { name: "R", src: "/assets/r-logo.svg" },
  { name: "Next.js", src: "/assets/nextjs-logo.svg" },
];

const Skillset = () => {
  return (
    <section className="skillset-section">
      <h2>LANGUAGES AND TOOLS</h2>
      <div className="skills-grid">
        {skills.map(({ src, name }, idx) => (
          <div className="skill-logo-box" key={idx}>
            <img src={src} alt={name} />
            <span className="skill-badge">{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};


export default Skillset;
