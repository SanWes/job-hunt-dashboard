import React from "react";
import "../styles/Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/favicon.ico" alt="Logo" className="logo-img" />
        <h1>Job Hunter</h1>
      </div>
      <nav className="nav-links" aria-label="Primary navigation">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#newjob">Add Job</a>
        <a href="#joblist">Jobs</a>
      </nav>
      {/* <button className="cta-btn">Sign Up</button> Optional CTA button */}
    </header>
  );
};

export default Header;
