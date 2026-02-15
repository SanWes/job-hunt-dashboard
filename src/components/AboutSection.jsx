import React from "react";

const AboutSection = () => {
return (
    <section id="about" className="about-section">

    <h2>The Workflow</h2>
    <br />
    <div className="about-grid">
        <div className="about-item">
        <span className="about-icon">📁</span>
        <p>
            <strong>Centralize</strong>
            <br />
            Consolidate every active application into a single, organized dashboard.
        </p>
        </div>
        <div className="about-item">
        <span className="about-icon">📝</span>
        <p>
            <strong>Document</strong>
            <br />
            Maintain detailed records of interview feedback, salary ranges, and follow-ups.
        </p>
        </div>
        <div className="about-item">
        <span className="about-icon">📊</span>
        <p>
            <strong>Analyze</strong>
            <br />
            Track your conversion rate from initial application to final offer in real-time.
        </p>
        </div>
    </div>
    </section>
);
};

export default AboutSection;