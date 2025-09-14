import React from "react";
import "./Projects.css";

const projectsData = [
  {
    title: "Personal Portfolio Website",
    description: "A fully responsive portfolio site built with React to showcase work, skills, and contact information.",
  },
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce application with product listing, shopping cart, checkout, and payment integration.",
  },
  {
    title: "Financial Dashboard",
    description: "Dashboard to track income, expenses, and savings with dynamic charts and category filters.",
  },
  {
    title: "Quiz Application",
    description: "Interactive quiz app with timer, multiple-choice questions, score tracking, and real-time feedback.",
  },
  {
    title: "Network Scanner Tool",
    description: "Command-line tool using Python to scan IP ranges and detect active hosts and open ports.",
  },
  {
    title: "Task Management System",
    description: "A task organizer with user authentication, task creation, deadline notifications, and priority sorting.",
  },
  {
    title: "Blog Platform",
    description: "A content publishing platform with markdown support, tags, comments, and user profiles built in MERN stack.",
  },
  {
    title: "Weather Forecast App",
    description: "Responsive app fetching and displaying weather data from a public API with location search functionality.",
  },
];

const Projects = () => {
  return (
    <main className="projects-main">
      <h1 className="projects-header">My Projects</h1>
      <div className="projects-container">
        {projectsData.map((project, index) => (
          <div key={index} className="project-card">
            <h2 className="project-title">{project.title}</h2>
            <p className="project-description">{project.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Projects;
