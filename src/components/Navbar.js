import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faDesktop, faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import '../css/Navbar.css'; 

const Navbar = () => {
  const savedTheme = localStorage.getItem("theme") || "system";
  const [theme, setTheme] = useState(savedTheme);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Detect mobile screen

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Update on resize
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const applyTheme = () => {
      document.body.classList.remove("light-mode", "dark-mode", "system-mode");
      if (theme === "system") {
        const prefersDarkScheme = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        document.body.classList.add(
          prefersDarkScheme ? "dark-mode" : "light-mode"
        );
      } else {
        document.body.classList.add(`${theme}-mode`);
      }
      localStorage.setItem("theme", theme);
    };

    applyTheme();

    const handleSystemThemeChange = (e) => {
      if (theme === "system") {
        const prefersDarkScheme = e.matches;
        document.body.classList.toggle("dark-mode", prefersDarkScheme);
        document.body.classList.toggle("light-mode", !prefersDarkScheme);
      }
    };

    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQueryList.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleSystemThemeChange);
    };
  }, [theme]);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <nav className={`navbar navbar-expand-lg ${theme}-mode navbar-sticky`}>
      <div className="container-fluid">
        <NavLink className="navbar-brand mx-2" to="/">
          iNotes
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/about"
              >
                About
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="theme-toggle align-items-center ms-1">
          <input
            type="radio"
            id="light"
            name="theme"
            value="light"
            checked={theme === "light"}
            onChange={handleThemeChange}
          />
          <label htmlFor="light">
            <FontAwesomeIcon icon={faSun} />
          </label>

          <input
            type="radio"
            id="system"
            name="theme"
            value="system"
            checked={theme === "system"}
            onChange={handleThemeChange}
          />
          <label htmlFor="system">
            <FontAwesomeIcon icon={isMobile ? faMobileAlt : faDesktop} /> {/* Switch icon */}
          </label>

          <input
            type="radio"
            id="dark"
            name="theme"
            value="dark"
            checked={theme === "dark"}
            onChange={handleThemeChange}
          />
          <label htmlFor="dark">
            <FontAwesomeIcon icon={faMoon} />
          </label>
          <div className={`toggle-thumb ${theme}`} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
