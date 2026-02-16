import React, { useState } from "react";
// 1. Ensure this path points to where you save the CSS below
import "../styles/About.css"; 

const AboutSection = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section id="about" className={`about-section ${isOpen ? "is-expanded" : "is-collapsed"}`}>
        {/* The Toggle Bar */}
        <div className="about-header" onClick={() => setIsOpen(!isOpen)}>
            <div className="header-left">
            <span className="system-status">{isOpen ? "[-]" : "[+]"}</span>
            <h2 className="about-title">Operation Ledger: Workflow Protocol</h2>
            </div>
            <div className="header-right">
            <span className="protocol-code">v1.0.4 // MANUAL</span>
            <div className={`system-led ${isOpen ? "active" : ""}`}></div>
            </div>
        </div>
        
        {/* The Collapsable Content */}
        <div className="about-content-wrapper">
            <div className="about-content">
            <div className="about-track">
                <div className="about-item">
                <span className="about-icon">📥</span>
                <div className="item-text">
                    <strong>Vault</strong>
                    <p>Secure every active application in a centralized, high-performance command center.</p>
                </div>
                </div>

                <div className="about-item">
                <span className="about-icon">✍️</span>
                <div className="item-text">
                    <strong>Chronicle</strong>
                    <p>Maintain detailed records of interview nuances, salary benchmarks, and feedback.</p>
                </div>
                </div>

                <div className="about-item">
                <span className="about-icon">📈</span>
                <div className="item-text">
                    <strong>Optimize</strong>
                    <p>Visualize your funnel metrics from initial touchpoint to final offer in real-time.</p>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
    );
    };

export default AboutSection;