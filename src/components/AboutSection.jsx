import React from "react";
const AboutSection = () => {
return (
    <section id="about" className="about-section">
    <h2>The Workflow</h2>
    
    <div className="about-grid">
        <div className="about-item">
        <span className="about-icon">📥</span>
        <p>
            <strong>Vault</strong>
            <br />
            Secure every active application in a centralized, high-performance command center.
        </p>
        </div>

        <div className="about-item">
        <span className="about-icon">✍️</span>
        
        <p>
            <strong>Chronicle</strong>
            <br />
            Maintain detailed records of interview nuances, salary benchmarks, and feedback.
        </p>
        </div>

        <div className="about-item">
        <span className="about-icon">📈</span>
        <p>
            <strong>Optimize</strong>
            <br />
            Visualize your funnel metrics from initial touchpoint to final offer in real-time.
        </p>
        </div>

    </div>
    </section>
);
};

export default AboutSection;