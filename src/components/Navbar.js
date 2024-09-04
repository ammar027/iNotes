import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faAdjust } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [theme, setTheme] = useState('light');
  const categories = ['sports', 'news', 'entertainment'];

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    // Add logic to apply the theme
  };

  return (
    <nav className={`navbar navbar-expand-lg ${theme}-mode navbar-sticky`}>
      <div className="container-fluid">
        <NavLink className="navbar-brand mx-2" to="/">
          NR
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
                  isActive ? 'nav-link active' : 'nav-link'
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            {categories.map((category) => (
              <li className="nav-item" key={category}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                  to={`/${category}`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </NavLink>
              </li>
            ))}
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
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
            checked={theme === 'light'}
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
            checked={theme === 'system'}
            onChange={handleThemeChange}
          />
          <label htmlFor="system">
            <FontAwesomeIcon icon={faAdjust} />
          </label>

          <input
            type="radio"
            id="dark"
            name="theme"
            value="dark"
            checked={theme === 'dark'}
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
