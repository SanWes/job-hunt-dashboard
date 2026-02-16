import React, { useState } from "react";
import "../styles/JobForm.css";

const JobForm = ({ onAddJob }) => {
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
          <h2 className="ledger-title">NEW ENTRY</h2>
          <p className="ledger-subtitle">RECORD A NEW OPPORTUNITY IN YOUR LEDGER</p>
        </div>

        <form onSubmit={handleSubmit} className="ledger-form">
          {error && <p className="error-message">{error}</p>}

          {/* Row 1: Entity & Role */}
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
                placeholder="Enter organization name..."
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
                placeholder="Specify role or title..."
              />
            </div>
          </div>

          {/* Row 2: Status & URL */}
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
                  <option value="Active">Active </option>
                  <option value="Secured">Secured</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </div>

            <div className="ledger-group">
              <label htmlFor="jobLink">SOURCE LINK </label>
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
            <label htmlFor="notes">STRATEGIC OBESERVATIONS</label>
            <textarea
              id="notes"
              name="notes"
              className="ledger-textarea"
              value={jobDetails.notes[0]}
              onChange={handleInputChange}
              placeholder="Track key interview takeaways, salary markers, and pending actions..."
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