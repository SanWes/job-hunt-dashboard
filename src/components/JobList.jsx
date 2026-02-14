import React, { useState } from "react";
import JobCard from "./JobCard";
import "../styles/JobList.css";

const JobList = ({ jobs, onDelete, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJobs = jobs.filter((job) =>
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="job-list-container">
      {/* SEARCH CONSOLE */}
      <div className="search-bar-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="SEARCH THE LEDGER BY COMPANY OR ROLE..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {filteredJobs.length === 0 ? (
        <div className="no-jobs">
            <p>No records match your query.</p>
        </div>
      ) : (
        <div className="job-grid">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;