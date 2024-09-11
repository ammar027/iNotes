import React from 'react';
import '../css/About.css';  // Assuming you have a CSS file for styling

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About iNotes</h1>
      <p className="about-description">
        iNotes is your personal note-taking companion, designed to simplify your life and help you stay organized. Whether it's for work, personal projects, or just jotting down random thoughts, iNotes is here to make note management easy and intuitive.
      </p>
      <p className="about-description">
        With iNotes, you can create, edit, and categorize your notes effortlessly. It's designed with a modern, user-friendly interface, and supports both light and dark modes for a comfortable experience, day or night.
      </p>
      <p className="about-description">
        Developed and maintained by Ammar Multani, iNotes is built to provide a reliable, secure, and efficient note-taking experience. Whether you're on the go or at your desk, iNotes is always there to help you capture your ideas.
      </p>

      <footer className="about-footer">
        <p>Connect with Ammar Multani:</p>
        <ul className="footer-links">
          <li>
            <a href="https://github.com/ammar027" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/ammar-multani/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
        </ul>
        <p>&copy; {new Date().getFullYear()} iNotes. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
