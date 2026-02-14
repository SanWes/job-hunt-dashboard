import React from "react";
import "../styles/Header.css";
import { signOut } from "firebase/auth"; // We only need signOut here
import { auth } from "../firebase/firebase";

const Header = () => {
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Firebase will automatically trigger the auth state change 
      // which your App.jsx is likely listening for to show the Welcome page.
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out: ", error.message);
    }
  };

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

      <div className="header-actions">
        <button 
          className="cta-btn" 
           onClick={handleLogout} // Attached the function here
          style={{
            backgroundColor: '#f39c12',
            color: 'white',
            border: 'none',
            padding: '8px 20px',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;