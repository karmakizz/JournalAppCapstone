import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "../css/Homepage.css";

function Homepage({ setUser }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    setUser(null); // Clear user state
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="homepage">
      <div className="welcome-section">
        <h1>🌿 Welcome to Your Zen Journal 🌿</h1>
        <p>
          A peaceful space to breathe, reflect, and grow. Let your thoughts flow
          freely, set your intentions, and embrace stillness.
        </p>
      </div>

      <nav className="nav-links">
        <ul>
          <li>
            <Link to="/journals" className="nav-link">📖 View Journals</Link>
          </li>
          <li>
            <Link to="/create" className="nav-link">📝 Create a Journal Entry</Link>
          </li>
        </ul>
      </nav>

      {/* Logout button styled like the Zen theme */}
      <button className="zen-button logout-btn" onClick={handleLogout}>
        🚪 Logout
      </button>
    </div>
  );
}

export default Homepage;