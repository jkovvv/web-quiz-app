import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";

const Toolbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      {" "}
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">
          {" "}
          JKQuiz
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                {" "}
                Home
              </Link>
            </li>
          </ul>
          {isAuthenticated && (
            <button className="btn btn-outline-light" onClick={logout}>
              {" "}
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Toolbar;
