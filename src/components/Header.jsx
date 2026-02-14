import React from "react";
import "../styles/Header.css";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

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
            {/* When you have the image, replace this span with <img src="/logo.png" /> */}
            <span className="quill-icon">🖋️</span>
          </div>
          <h1 className="ledger-title">THE LEDGER</h1>
        </div>
        
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