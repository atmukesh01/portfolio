import React from "react";
import { FaJsSquare, FaReact } from "react-icons/fa";
import "./Skillset.css";

const skills = [
  { name: "JavaScript", icon: <FaJsSquare />, level: 90 },
  { name: "React", icon: <FaReact />, level: 85 },
];

const Skillset = () => (
  <section className="skillset-section">
    <h2>Skillset</h2>
    <ul className="skill-list">
      {skills.map(({ name, icon, level }, idx) => (
        <li key={idx} className="skill-item">
          <div className="skill-icon">{icon}</div>
          <div className="skill-info">
            <span className="skill-name">{name}</span>
          </div>
        </li>
      ))}
    </ul>
  </section>
);

export default Skillset;
