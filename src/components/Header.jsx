import React, { useRef } from "react"; // Added useRef
import "../styles/Header.css";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

import OneLogo from "/assets/LedgerLogo.png";

const Header = () => {
  // 1. Create a reference to the checkbox
  const navToggleRef = useRef(null);

  // 2. Function to close the menu
  const closeMenu = () => {
    if (navToggleRef.current) {
      navToggleRef.current.checked = false;
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      closeMenu(); // Close menu on logout too
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

        {/* 3. Attach the ref to the checkbox */}
        <input 
          type="checkbox" 
          id="nav-toggle" 
          className="nav-toggle" 
          ref={navToggleRef} 
        />
        
        <label htmlFor="nav-toggle" className="burger-label">
          <span></span>
        </label>
        
        {/* NAV & ACTIONS */}
        <div className="nav-and-actions">
          <nav className="header-nav">
            {/* 4. Add onClick={closeMenu} to all internal links */}
            <a href="#" className="nav-link" onClick={closeMenu}>Home</a>
            <a href="#newjob" className="nav-link" onClick={closeMenu}>Create</a>
            <a href="#joblist" className="nav-link" onClick={closeMenu}>Entries</a>
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