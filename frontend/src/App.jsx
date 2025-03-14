import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Home from "./pages/Home.jsx";
import JournalEntries from "./pages/JournalEntries.jsx";
import CreateJournalEntry from "./components/CreateJournalEntry.jsx";
import Login from "./components/Login";
import Motivation from "./pages/Motivation.jsx";
import "./App.css";
import Breathing from "./pages/BreathingExcercise.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = () => {
    axios
      .get("http://localhost:7777/api/journals")
      .then((response) => setJournals(response.data))
      .catch((error) => console.error("Error fetching journals:", error));
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journals" element={<JournalEntries journals={journals} />} />
        <Route path="/create" element={<CreateJournalEntry onJournalCreated={fetchJournals} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/motivation" element={<Motivation />} />
        <Route path="/breathing" element={<Breathing />} />
      </Routes>
    </Router>
  );
}

export default App;
