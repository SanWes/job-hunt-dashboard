import React from "react";
import "../styles/Header.css";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

import LogoIMG from "/assets/LedgerLogo.png";
import OneLogo from "/assets/OneLogo.png";

const Header = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error.message);
    }
  };

  return (
    <header className="header-master">
      <div className="header-container">
        {/* LOGO & BRAND */}
        <div className="brand-group">
          <div className="logo-wrapper">
            <img src={OneLogo} alt="Logo" className="header-logo" />
          </div>
          <h1 className="ledger-title">THE LEDGER</h1>
        </div>

        {/* BURGER TOGGLE (Checkbox method for efficiency) */}
        <input type="checkbox" id="nav-toggle" className="nav-toggle" />
        <label htmlFor="nav-toggle" className="burger-label">
          <span></span>
        </label>
        
        {/* NAV & ACTIONS */}
        <div className="nav-and-actions">
          <nav className="header-nav">
            <a href="#" className="nav-link">Home</a>
            <a href="#newjob" className="nav-link">Create</a>
            <a href="#joblist" className="nav-link">Entries</a>
          </nav>
          
          <div className="action-divider"></div>

          <button className="logout-ghost-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;