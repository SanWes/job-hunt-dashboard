import React from "react";
import "../styles/Header.css";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

const Header = () => {
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out: ", error.message);
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="/favicon.ico" alt="Logo" className="logo-img" />
        <h1>THE LEDGER</h1>
      </div>
      
      <nav className="nav-links" aria-label="Primary navigation">
        <a href="#top">Overview</a>
        <a href="#newjob">Add Entry</a>
        <a href="#joblist">Board</a>
      </nav>

      <div className="header-actions">
        <button 
          className="logout-btn" 
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;