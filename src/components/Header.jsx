import React, { useRef } from "react"; 
import "../styles/Header.css";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

import OneLogo from "/assets/LedgerLogo.png";

const Header = ({ searchTerm, setSearchTerm, onGuestLogin, user, isGuest, onSettingsOpen, onGuestLogout }) => {
  const navigate = useNavigate();
  
  // 1. Create a reference to checkbox
  const navToggleRef = useRef(null);

  // 2. Function to close menu
  const closeMenu = () => {
    if (navToggleRef.current) {
      navToggleRef.current.checked = false;
    }
  };

  const handleLogout = async () => {
    try {
      if (isGuest) {
        onGuestLogout();
        navigate("/");
        return;
      } else {
        await signOut(auth);
      }
      closeMenu();
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error.message);
    }
  };

  const handleLogoClick = () => {
    if (user) {
      navigate("/");
    } else {
      closeMenu();
    }
  };

  const displayName = user?.displayName || "Guest";

  return (
    <header className="header-master">
      <div className="header-container">
        {/* LOGO & BRAND */}
        <div className="brand-group">
          <div className="logo-wrapper" onClick={handleLogoClick}>
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
            <a href="#" className="nav-link" onClick={() => { closeMenu(); setSearchTerm(''); }}>Home</a>
            <a href="#newjob" className="nav-link" onClick={() => { closeMenu(); setSearchTerm(''); }}>Create</a>
            <a href="#joblist" className="nav-link" onClick={() => { closeMenu(); setSearchTerm(''); }}>Entries</a>
            
            {/* Settings link for regular users */}
            {!isGuest && user && (
              <a href="#" className="nav-link" onClick={() => { closeMenu(); onSettingsOpen(); }}>
                ⚙️ Settings
              </a>
            )}
            
            {/* Conditional: Guest Login vs Reset Demo */}
            {onGuestLogin && !user && (
              <button className="guest-login-btn" onClick={onGuestLogin}>
                Guest Login
              </button>
            )}
            
            {isGuest && (
              <button className="reset-demo-btn" onClick={onGuestLogin}>
                Reset Demo
              </button>
            )}
          </nav>
          
          {/* Welcome message in desktop nav */}
          {!isGuest && user && (
            <div className="welcome-message">
              Welcome, {displayName}
            </div>
          )}
          
          <div className="search-container">
            <input
              type="text"
              placeholder="Search entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <button className="logout-ghost-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;