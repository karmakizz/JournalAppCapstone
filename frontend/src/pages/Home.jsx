import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to JournalApp</h1>
      <p>Capture your thoughts, track your mood, and reflect on your journey.</p>
      
      <nav>
        <ul>
          <li><Link to="/journals">View Journals</Link></li>
          <li><Link to="/create">Create a Journal Entry</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
