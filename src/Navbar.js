import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./styles/Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [nav, setNav] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const openNav = () => {
    setNav(!nav);
  };

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  return (
    <div className="navbar-section">
      <h1 className="navbar-title">
        <Link to="/home">MedEase</Link>
      </h1>

      {/* Desktop */}
      <ul className="navbar-items">
        <li>
          <Link to="/home" className="navbar-links">
            Home
          </Link>
        </li>
        <li>
          <Link to="/medicationsreminder" className="navbar-links">
            Set Reminders
          </Link>
        </li>
        <li>
          <Link to="/medications" className="navbar-links">
            Medications
          </Link>
        </li>
        <li>
          <Link to="/appointment" className="navbar-links">
            Appointments
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="navbar-links">
            Dashboard
          </Link>
        </li>
        <li>
          <div
            className="dropdown"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Family ⮟
            {showDropdown && (
              <div className="dropdown-content">
                <Link to="/healthtracker" className="nav-item">
                  Add Family Members
                </Link>
                <Link to="/family" className="nav-item">
                  Manage Family
                </Link>
              </div>
            )}
          </div>
        </li>
      </ul>

      <Link to="/Video"
        className="navbar-btn"
        type="button"
      >
        <FontAwesomeIcon icon={faCommentDots} /> Live Chat
        </Link>

      {/* Mobile */}
      <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
        <div onClick={openNav} className="mobile-navbar-close">
          <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
        </div>

        <ul className="mobile-navbar-links">
        <li>
          <Link to="/" className="navbar-links">
            Home
          </Link>
        </li>
        <li>
          <Link to="/medicationsreminder" className="navbar-links">
            Set Reminders
          </Link>
        </li>
        <li>
        <Link to="/medications" className="navbar-links">
            Medications
          </Link>
        </li>
        <li>
        <Link to="/appointment" className="navbar-links">
            Appointments
          </Link>
        </li>
        <li>
        <Link to="/dashboard" className="navbar-links">
            Dashboard
          </Link>
        </li>
        <li>
        <Link to="/Healthtracker" className="navbar-links">
        Healthtracker
          </Link>
        </li>
      </ul>
      </div>

      {/* Hamburger Icon */}
      <div className="mobile-nav">
        <FontAwesomeIcon
          icon={faBars}
          onClick={openNav}
          className="hamb-icon"
        />
      </div>
    </div>
  );
}

export default Navbar;