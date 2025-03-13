import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import JournalEntries from "./pages/JournalEntries.jsx";
import CreateJournalEntry from "./components/CreateJournalEntry.jsx";
import Login from "./components/Login";
import Motivation from "./pages/Motivation.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/motivation">Motivation</Link>
          </li>
          <li>
            <Link to="/journals">Journals</Link>
          </li>
          <li>
            <Link to="/create">Create Journal</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journals" element={<JournalEntries />} />
        <Route path="/create" element={<CreateJournalEntry />} />
        <Route path="/login" element={<Login />} />
        <Route path="/motivation" element={<Motivation />} />
      </Routes>
    </Router>
  );
}

export default App;
