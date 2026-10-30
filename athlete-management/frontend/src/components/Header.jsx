import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Athlete Manager
        </Link>

        <div className="navbar-nav">
          <Link className="nav-link" to="/">
            Athletes
          </Link>

          <Link className="nav-link" to="/athletes/add">
            Add Athlete
          </Link>

          <Link className="nav-link" to="/about">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
