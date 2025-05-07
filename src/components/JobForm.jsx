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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle the notes[0] field specifically
    if (name === "notes") {
      setJobDetails((prev) => ({
        ...prev,
        notes: [value],
      }));
    } else {
      setJobDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { company, position } = jobDetails;

    if (!company.trim() || !position.trim()) {
      setError("Company and Position are required.");
      return;
    }

    setError("");
    onAddJob({ ...jobDetails, id: Date.now() });
    setJobDetails(initialState);
  };

  return (
    <form onSubmit={handleSubmit} className="job-form">
      {error && <p className="error-message">{error}</p>}

      <div className="form-group">
        <label htmlFor="company">Company:</label>
        <input
          type="text"
          name="company"
          value={jobDetails.company}
          onChange={handleInputChange}
          placeholder="Company Name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="position">Position:</label>
        <input
          type="text"
          name="position"
          value={jobDetails.position}
          onChange={handleInputChange}
          placeholder="Job Position"
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Application Status:</label>
        <select
          id="status"
          name="status"
          value={jobDetails.status}
          onChange={handleInputChange}
        >
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="jobLink">Job Link:</label>
        <input
          type="text"
          name="jobLink"
          value={jobDetails.jobLink}
          onChange={handleInputChange}
          placeholder="https://..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes:</label>
        <textarea
          name="notes"
          value={jobDetails.notes[0]}
          onChange={handleInputChange}
          placeholder="Add a note about this job..."
          rows={3}
        />
      </div>

      <button type="submit" className="submit-btn">
        Add Job
      </button>
    </form>
  );
};

export default JobForm;
