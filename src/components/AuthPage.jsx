import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { createUserDocument } from "../firebase/userHelpers";
import { validateUsername, validateEmail, validatePassword } from "../utils/validators";
import "./../styles/AuthPage.css";

const AuthPage = ({ onLogin, onGuestLogin }) => {
    const auth = getAuth();
    const [isOpened, setIsOpened] = useState(false); // Book cover state
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [resetSuccess, setResetSuccess] = useState(false);

    const handleForgotPassword = async () => {
        setError("");
        if (!resetEmail) {
            setError('Please enter your email address');
            return;
        }
        
        const emailError = validateEmail(resetEmail);
        if (emailError) {
            setError(emailError);
            return;
        }
        
        try {
            await sendPasswordResetEmail(auth, resetEmail);
            setResetSuccess(true);
        } catch (err) {
            setError(err.message.replace('Firebase: ', ''));
        }
    };

    const validateForm = () => {
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);
        
        if (emailError) {
            setError(emailError);
            return false;
        }
        
        if (passwordError) {
            setError(passwordError);
            return false;
        }
        
        if (isSignup) {
            const usernameError = validateUsername(username);
            if (usernameError) {
                setError(usernameError);
                return false;
            }
        }
        
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        if (!validateForm()) {
            return;
        }
        
        try {
            if (isSignup) {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                
                // Update profile with display name
                await updateProfile(user, {
                    displayName: username
                });
                
                // Create user document in Firestore
                await createUserDocument(user.uid, {
                    username: username,
                    email: email
                });
                
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            onLogin();
        } catch (err) {
            let errorMessage = err.message.replace("Firebase: ", "");
            
            // Handle specific Firebase errors
            if (err.code === 'auth/email-already-in-use') {
                errorMessage = 'This email is already registered. Please sign in.';
            } else if (err.code === 'auth/weak-password') {
                errorMessage = 'Password is too weak. Please choose a stronger password.';
            } else if (err.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email address.';
            } else if (err.code === 'auth/user-not-found') {
                errorMessage = 'No account found with this email.';
            } else if (err.code === 'auth/wrong-password') {
                errorMessage = 'Incorrect password.';
            }
            
            setError(errorMessage);
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
                    
                    {resetSuccess ? (
                        <div className="auth-success-msg">
                            Check your inbox for a reset link!
                        </div>
                    ) : (
                        <>
                            {!isSignup && (
                                <div className="forgot-password-link">
                                    <span onClick={() => setShowForgotPassword(true)}>
                                        Forgot Password?
                                    </span>
                                </div>
                            )}
                            
                            <form onSubmit={handleSubmit} className="auth-form">
                                {isSignup && (
                                    <div className="ledger-group">
                                        <label>USERNAME</label>
                                        <input
                                            type="text"
                                            className="ledger-input"
                                            placeholder="Choose a username"
                                            required
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                )}
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
                                {!isSignup && (
                                    <button type="button" className="ledger-guest-btn" onClick={onGuestLogin}>
                                        GUEST ACCESS (DEMO MODE)
                                    </button>
                                )}
                            </form>
                        </>
                    )}
                    
                    {showForgotPassword && (
                        <div className="forgot-password-modal">
                            <div className="modal-content ledger-card">
                                <h3 className="modal-title">Reset Password</h3>
                                <p className="modal-subtitle">Enter your email address to receive a password reset link.</p>
                                <div className="ledger-group">
                                    <label>EMAIL ADDRESS</label>
                                    <input
                                        type="email"
                                        className="ledger-input"
                                        placeholder="Email Address"
                                        required
                                        value={resetEmail}
                                        onChange={(e) => setResetEmail(e.target.value)}
                                    />
                                </div>
                                <div className="button-group">
                                    <button onClick={handleForgotPassword} className="ledger-submit-btn">
                                        SEND RESET EMAIL
                                    </button>
                                    <button onClick={() => { setShowForgotPassword(false); setResetEmail(""); setResetSuccess(false); }} className="ledger-cancel-btn">
                                        CANCEL
                                    </button>
                                </div>
                                {resetSuccess && (
                                    <div className="auth-success-msg">
                                        Check your inbox for a reset link!
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    
                    <p className="auth-switch-text">
                        {isSignup ? "Existing record found?" : "No credentials found?"}{" "}
                        <span onClick={() => { setIsSignup(!isSignup); setError(""); setUsername(""); }}>
                            {isSignup ? "SIGN IN" : "REGISTER"}
                        </span>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default AuthPage;