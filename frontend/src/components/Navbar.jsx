import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faBook,faStar, faPen, faUser, faWind, faCloud } from '@fortawesome/free-solid-svg-icons';



function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", darkMode);
  };

  return (
    <div className={`sidebar ${darkMode ? "dark-mode" : ""}`}>
      <div className="toggle-btn" onClick={toggleDarkMode}>
        {darkMode ? "🌙" : "🌞"}
      </div>
      <Link to="/login" className="icon"><FontAwesomeIcon icon={faUser} /><span className="icon-label">Login</span></Link>
      <Link to="/" className="icon"><FontAwesomeIcon icon={faHome} /><span className="icon-label">Home</span></Link>
      <Link to="/motivation" className="icon"><FontAwesomeIcon icon={faStar} /><span className="icon-label">Quote of the day</span></Link>
      <Link to="/journals" className="icon"><FontAwesomeIcon icon={faBook} /><span className="icon-label">Journal Entries</span></Link>
      <Link to="/create" className="icon"><FontAwesomeIcon icon={faPen} /><span className="icon-label">Create a new entry</span></Link>
      <Link to="/vision" className="icon"><FontAwesomeIcon icon={faCloud} /><span className="icon-label">Vision Board</span></Link>
      <Link to="/breathing" className="icon"><FontAwesomeIcon icon={faWind} /><span className="icon-label">Breathing Excercise</span></Link>
    </div>
  );
}

export default Navbar;
