import React from "react"; 
import "./NavBar.css"; 

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center fw-bold" href="#">
          <img
            src="#"
            alt="Logo"
            width="30"
            height="24"
            className="me-2"
          />
         <p className="logo">Mediator</p>
        </a>

        {/* Navbar Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="featuresDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Features
              </a>

              
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Feature 1</a></li>
                <li><a className="dropdown-item" href="#">Feature 2</a></li>
              </ul>
            </li>
            <li className="nav-item"><a className="nav-link" href="#">Apps</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Pricing</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Integrations</a></li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="helpDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Help
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Support</a></li>
                <li><a className="dropdown-item" href="#">FAQs</a></li>
              </ul>
            </li>
          </ul>

          {/* Search Bar */}
          <form className="search-container d-flex">
            <i className="bi bi-search"></i>
            <input
              className="form-control search-input"
              type="search"
              placeholder="Search our website"
              aria-label="Search"
            />
            <span className="shortcut">ctrl+k</span>
          </form>

          {/* Login and CTA Button */}
          <button className="btn btn-primary custom-btn header-btn">Log In</button>
          <button className="btn btn-primary custom-btn header-btn">Start Free Trial</button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
