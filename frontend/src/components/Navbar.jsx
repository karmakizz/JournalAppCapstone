import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/motivation">Motivational Quote</Link>
        </li>
        <li>
          <Link to="/journals">Journal Entries</Link>
        </li>
        <li>
          <Link to="/create">Create a Journal Entry</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/breathing">Breathing Excercise</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
