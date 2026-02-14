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
  const [showSuccess, setShowSuccess] = useState(false); // New Success State

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
      setError("Company and Position are required.");
      return;
    }

    setError("");
    onAddJob({ ...jobDetails, id: Date.now() });
    
    // Trigger Success Message
    setShowSuccess(true);
    setJobDetails(initialState);
    
    setTimeout(() => setShowSuccess(false), 5000); // Hide after 3s
  };

  return (
    <div className="job-form-wrapper" id="newjob">
      <div className="section-card">
        {showSuccess && <div className="success-toast">Entry Logged Successfully</div>}
        
        <div className="form-header">
          <h2 className="section-title">Add Entry</h2>
          <p className="form-subtitle">Record a new opportunity in your ledger</p>
        </div>

        <form onSubmit={handleSubmit} className="job-form">
          {error && <p className="error-message">{error}</p>}

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                value={jobDetails.company}
                onChange={handleInputChange}
                placeholder="e.g. Google"
              />
            </div>

            <div className="form-group">
              <label htmlFor="position">Position</label>
              <input
                type="text"
                id="position"
                name="position"
                value={jobDetails.position}
                onChange={handleInputChange}
                placeholder="e.g. Software Engineer"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="status">Application Status</label>
            <select id="status" name="status" value={jobDetails.status} onChange={handleInputChange}>
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="jobLink">Listing URL</label>
            <input
              type="text"
              id="jobLink"
              name="jobLink"
              value={jobDetails.jobLink}
              onChange={handleInputChange}
              placeholder="https://..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Strategic Context</label>
            <textarea
              id="notes"
              name="notes"
              value={jobDetails.notes[0]}
              onChange={handleInputChange}
              placeholder="Salary, contact person, or interview dates..."
              rows={3}
            />
          </div>

          <button type="submit" className="submit-btn">
            Finalize Entry
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobForm;