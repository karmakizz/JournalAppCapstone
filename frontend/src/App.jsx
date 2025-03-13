import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import JournalEntries from "./pages/JournalEntries.jsx";
import CreateJournalEntry from "./components/CreateJournalEntry.jsx";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
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
      </Routes>
    </Router>
  );
}

export default App;
