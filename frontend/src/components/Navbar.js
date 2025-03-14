import Link from "next/link";
import { isAuthenticated, getUser, logout } from "../utils/auth"; // Import auth utils
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

const Navbar = ({ onNotesClick }) => {
  const user = getUser(); // Get user info
  const authenticated = isAuthenticated(); // Check if logged in
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(isAuthenticated()); // Only check after hydration
  }, []);



  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-info px-4">
       <Link className="navbar-brand fw-bold" href="/">
          KeepNotes
        </Link>

        
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
        {isAuth ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" href="/notes" onClick={onNotesClick}>
                    Notes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/account">
                    Account
                  </Link>
                </li>
                <li className="nav-item">
                <button className="btn btn-danger" onClick={logout}>
                  Logout
                </button>
              </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" href="/login">
                  Login
                </Link>
              </li>
            )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
