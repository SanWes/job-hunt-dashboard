import React, { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import "./../styles/AuthPage.css"; // Ensure this matches your file name

const WelcomePage = ({ onLogin }) => {
    const auth = getAuth();
    const [showAuth, setShowAuth] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

  // Accessibility: Close on Escape
    useEffect(() => {
        const handleEsc = (e) => { if (e.key === "Escape") setShowAuth(false); };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
        if (isSignup) {
            await createUserWithEmailAndPassword(auth, email, password);
        } else {
            await signInWithEmailAndPassword(auth, email, password);
        }
    onLogin();
    } catch (err) {
    setError(err.message.replace("Firebase: ", ""));
    }
};

return (
    <div className="board-container">
    <main className="cork-board">
        <h1>THE LEDGER</h1>
        <p>Organize your applications, track progress, and land your dream job.</p>

        <div className="sticky-buttons">
        <button 
            className="sticky-note login-note"
            onClick={() => { setIsSignup(false); setShowAuth(true); }}
        >
            <span className="pin">📍</span>
            <span>Login</span>
        </button>

        <button 
            className="sticky-note signup-note"
            onClick={() => { setIsSignup(true); setShowAuth(true); }}
        >
            <span className="pin">📍</span>
            <span>Sign Up</span>
        </button>
        </div>
    </main>

    {showAuth && (
        <div className="auth-overlay" onClick={() => setShowAuth(false)}>
        <div className="auth-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowAuth(false)}>✕</button>
            
            <h2 style={{ marginBottom: "8px" }}>{isSignup ? "Create Account" : "Welcome Back"}</h2>
            <p style={{ color: "#718096", marginBottom: "24px", fontSize: "0.9rem" }}>
            {isSignup ? "Join the hunt today." : "Please enter your details."}
            </p>

            {error && <div style={{ color: "#e53e3e", marginBottom: "16px", fontSize: "0.85rem" }}>{error}</div>}

            <form onSubmit={handleSubmit}>
            <div className="input-group">
                <input
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="input-group">
                <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit" className="auth-btn">
                {isSignup ? "Create Account" : "Sign In"}
            </button>
            </form>

            <p style={{ marginTop: "20px", fontSize: "0.9rem", color: "#4a5568" }}>
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <span 
                onClick={() => setIsSignup(!isSignup)} 
                style={{ color: "#2ecc71", cursor: "pointer", fontWeight: "bold" }}
            >
                {isSignup ? "Login" : "Sign Up"}
            </span>
            </p>
        </div>
        </div>
    )}
    </div>
);
};

export default WelcomePage;