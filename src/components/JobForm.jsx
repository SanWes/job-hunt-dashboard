import React, { useState, useEffect } from "react"; // ADDED: useEffect import
import "../styles/JobForm.css";

const JobForm = ({ onAddJob }) => {
  const [isOpen, setIsOpen] = useState(false);
  const initialState = {
    company: "",
    position: "",
    status: "Filed",
    jobLink: "",
    notes: [""], 
    dateAdded: new Date().toLocaleDateString(),
  };

  const [jobDetails, setJobDetails] = useState(initialState);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // --- CHANGE 1: AUTO-CLEAR ERROR AFTER 5 SECONDS ---
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // --- CHANGE 2: CLEAR ERROR WHEN USER STARTS TYPING ---
    if (error && (name === "company" || name === "position")) {
      setError("");
    }

    setJobDetails((prev) => ({
      ...prev,
      [name]: name === "notes" ? [value] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!jobDetails.company.trim() || !jobDetails.position.trim()) {
      setError("CRITICAL: ENTITY AND FUNCTION REQUIRED.");
      return;
    }

    setError("");
    onAddJob({ ...jobDetails, id: Date.now() });
    setShowSuccess(true);
    setJobDetails(initialState);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className={`ledger-form-wrapper ${isOpen ? "is-expanded" : "is-collapsed"}`} id="newjob">
      <div className="form-toggle-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="header-meta">
          <span className="system-indicator">{isOpen ? "—" : "+"}</span>
          <div className="title-stack">
            <h2 className="ledger-title">INITIATE REGISTRY</h2>
            <span className="header-status-code">
              {isOpen ? "SYSTEM ACTIVE // INTAKE MODE" : "SYSTEM READY // STANDBY"}
            </span>
          </div>
        </div>
        <div className="header-right">
          <span className="protocol-code">SECURE-LOG-v1.0.4</span>
        </div>
      </div>

      <div className="ledger-sheet-container">
        <div className="ledger-sheet">
          {showSuccess && <div className="success-toast">ENTRY COMMITTED TO THE LEDGER</div>}
          
          <div className="form-branding">
            <p className="ledger-subtitle">CENTRALIZED MANIFEST // VOL. I</p>
          </div>

          <form onSubmit={handleSubmit} className="ledger-form">
            {/* --- CHANGE 3: ADDED ONCLICK TO MANUALLY DISMISS --- */}
            {error && (
              <p className="error-message" onClick={() => setError("")} style={{ cursor: 'pointer' }}>
                {error}
              </p>
            )}

            <div className="ledger-grid">
              <div className="ledger-group">
                <label htmlFor="company">ENTITY</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="ledger-input"
                  value={jobDetails.company}
                  onChange={handleInputChange}
                  placeholder="Organization..."
                />
              </div>

              <div className="ledger-group">
                <label htmlFor="position">FUNCTION</label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  className="ledger-input"
                  value={jobDetails.position}
                  onChange={handleInputChange}
                  placeholder="Role..."
                />
              </div>
            </div>

            <div className="ledger-grid">
              <div className="ledger-group">
                <label htmlFor="status">LEDGER STATUS</label>
                <div className="select-wrapper">
                  <select 
                    id="status" 
                    name="status" 
                    className="ledger-select"
                    value={jobDetails.status} 
                    onChange={handleInputChange}
                  >
                    <option value="Filed">Filed</option>
                    <option value="Active">Active</option>
                    <option value="Secured">Secured</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="ledger-group">
                <label htmlFor="jobLink">SOURCE LINK</label>
                <input
                  type="text"
                  id="jobLink"
                  name="jobLink"
                  className="ledger-input"
                  value={jobDetails.jobLink}
                  onChange={handleInputChange}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="ledger-group full-width">
              <label htmlFor="notes">STRATEGIC OBSERVATIONS</label>
              <textarea
                id="notes"
                name="notes"
                className="ledger-textarea"
                value={jobDetails.notes[0]}
                onChange={handleInputChange}
                placeholder="Interview insights, salary benchmarks, and technical requirements..."
                rows={4}
              />
            </div>

            <button type="submit" className="ledger-submit-btn">
              COMMIT TO LEDGER
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobForm;