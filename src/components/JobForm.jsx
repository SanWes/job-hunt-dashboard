import React, { useState } from "react";
import "../styles/JobForm.css";

const JobForm = ({ onAddJob }) => {
  const initialState = {
    company: "",
    position: "",
    status: "Applied",
    jobLink: "",
    notes: [""], 
    dateAdded: new Date().toLocaleDateString(),
  };

  const [jobDetails, setJobDetails] = useState(initialState);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prev) => ({
      ...prev,
      [name]: name === "notes" ? [value] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!jobDetails.company.trim() || !jobDetails.position.trim()) {
      setError("Entries required: Company and Position.");
      return;
    }

    setError("");
    onAddJob({ ...jobDetails, id: Date.now() });
    setShowSuccess(true);
    setJobDetails(initialState);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className="ledger-form-wrapper" id="newjob">
      <div className="ledger-sheet">
        {showSuccess && <div className="success-toast">Entry Logged Successfully</div>}
        
        <div className="form-header">
          <h2 className="ledger-title">ADD ENTRY</h2>
          <p className="ledger-subtitle">RECORD A NEW OPPORTUNITY IN YOUR LEDGER</p>
        </div>

        <form onSubmit={handleSubmit} className="ledger-form">
          {error && <p className="error-message">{error}</p>}

          {/* Row 1: Entity & Role */}
          <div className="ledger-grid">
            <div className="ledger-group">
              <label htmlFor="company">COMPANY</label>
              <input
                type="text"
                id="company"
                name="company"
                className="ledger-input"
                value={jobDetails.company}
                onChange={handleInputChange}
                placeholder="Enter Entity..."
              />
            </div>

            <div className="ledger-group">
              <label htmlFor="position">POSITION</label>
              <input
                type="text"
                id="position"
                name="position"
                className="ledger-input"
                value={jobDetails.position}
                onChange={handleInputChange}
                placeholder="Enter Role..."
              />
            </div>
          </div>

          {/* Row 2: Status & URL */}
          <div className="ledger-grid">
            <div className="ledger-group">
              <label htmlFor="status">APPLICATION STATUS</label>
              <div className="select-wrapper">
                <select 
                  id="status" 
                  name="status" 
                  className="ledger-select"
                  value={jobDetails.status} 
                  onChange={handleInputChange}
                >
                  <option value="Applied">Applied</option>
                  <option value="Interviewing">In Process</option>
                  <option value="Offer">Offer Received</option>
                  <option value="Rejected">Settled</option>
                </select>
              </div>
            </div>

            <div className="ledger-group">
              <label htmlFor="jobLink">LISTING URL</label>
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

          {/* Row 3: Notes */}
          <div className="ledger-group full-width">
            <label htmlFor="notes">STRATEGIC CONTEXT</label>
            <textarea
              id="notes"
              name="notes"
              className="ledger-textarea"
              value={jobDetails.notes[0]}
              onChange={handleInputChange}
              placeholder="Record metadata, salary, or interview intelligence..."
              rows={4}
            />
          </div>

<button type="submit" className="ledger-submit-btn">
  FILE ENTRY 
</button>
        </form>
      </div>
    </div>
  );
};

export default JobForm;