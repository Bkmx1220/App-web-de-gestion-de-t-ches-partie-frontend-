import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <span className="navbar-brand fw-bold">Task Manager</span>
        <button
          className="btn btn-outline-light"
          onClick={handleLogout}
        >
          Déconnexion
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
