import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import "./../styles/AuthPage.css";

const WelcomePage = ({ onLogin }) => {
    const auth = getAuth();
    const [isOpened, setIsOpened] = useState(false); // Book cover state
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

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
        <div className={`ledger-auth-wrapper ${isOpened ? "book-opened" : "book-closed"}`}>
            {/* FRONT COVER - Click to Open */}
            <div className="book-cover" onClick={() => setIsOpened(true)}>
                <div className="cover-content">
                    <div className="embossed-title">THE LEDGER</div>
                    <p>STRATEGIC INTELLIGENCE TERMINAL</p>
                    <div className="latch">CLICK TO INITIALIZE</div>
                </div>
            </div>

            {/* THE INTERNAL FORM (Revealed when book opens) */}
            <main className="auth-container">
                <div className="auth-card">
                    {/* TACTICAL TABS - Improves UX by making mode selection obvious */}
                    <div className="ledger-tabs">
                        <button 
                            type="button"
                            className={`ledger-tab ${!isSignup ? 'active' : ''}`} 
                            onClick={() => { setIsSignup(false); setError(""); }}
                        >
                            ACCESS LEDGER
                        </button>
                        <button 
                            type="button"
                            className={`ledger-tab ${isSignup ? 'active' : ''}`} 
                            onClick={() => { setIsSignup(true); setError(""); }}
                        >
                            NEW REGISTRY
                        </button>
                    </div>

                    <p className="auth-subtitle">
                        {isSignup ? "Initialize your credentials." : "Establish secure data link."}
                    </p>

                    {error && <div className="auth-error-msg">{error}</div>}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="ledger-group">
                            <label>IDENTIFIER</label>
                            <input
                                type="email"
                                className="ledger-input"
                                placeholder="Email Address"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="ledger-group">
                            <label>PASSCODE</label>
                            <input
                                type="password"
                                className="ledger-input"
                                placeholder="••••••••"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="ledger-submit-btn">
                            {isSignup ? "INITIALIZE LEDGER" : "AUTHORIZE ACCESS"}
                        </button>
                    </form>

                    <p className="auth-switch-text">
                        {isSignup ? "Existing record found?" : "No credentials found?"}{" "}
                        <span onClick={() => { setIsSignup(!isSignup); setError(""); }}>
                            {isSignup ? "SIGN IN" : "REGISTER"}
                        </span>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default WelcomePage;