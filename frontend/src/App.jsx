import { BrowserRouter as Router, Routes, Route, Navigate,Link } from "react-router-dom"; // Added Navigate import
import { useState, useEffect} from "react";
import axios from "axios";
import Home from "./pages/Home.jsx";
import JournalEntries from "./pages/JournalEntries.jsx";
import CreateJournalEntry from "./components/CreateJournalEntry.jsx";
import Login from "./components/Login";
import Motivation from "./pages/Motivation.jsx";
import Breathing from "./pages/BreathingExcercise.jsx";
import Navbar from "./components/Navbar.jsx";
import "./App.css";


function App() {
  const [user, setUser] = useState(null); 
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    if (user) {
      fetchJournals();
    }
  }, [user]);
  const fetchJournals = () => {
    axios
      .get("http://localhost:7777/api/journals")
      .then((response) => setJournals(response.data))
      .catch((error) => console.error("Error fetching journals:", error));
  };

  const handleLogin = (username) => {
    setUser(username);
    console.log("User logged in:", username);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Login Page - First Page if Not Logged In */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
          {/* If user is logged in, show home, otherwise show login */}
          <Route path="/" element={ user ? ( <Home user={user} />) : (
              <div>
                <p>Please log in to access the homepage.</p>
                <Link to="/login">Go to Login</Link>
              </div>
            )
          }
        />
        {/* Journal page is protected */}
        <Route path="/journals" element={user ? (<JournalEntries journals={journals} user={user} />) : (
              <div>
                <p>Please log in to view your journal entries.</p>
                <Link to="/login">Go to Login</Link>
              </div>
            )
          }
        />
        <Route path="*" element={!user ? <Navigate to="/login" /> : <Navigate to="/" />} />
        <Route path="/create" element={<CreateJournalEntry onJournalCreated={fetchJournals} />} />
        <Route path="/motivation" element={<Motivation />} />
        <Route path="/breathing" element={<Breathing />} />
      </Routes>
    </Router>
  );
}

export default App;
