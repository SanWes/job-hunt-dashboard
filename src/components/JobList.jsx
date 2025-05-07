import React, { useState } from "react";
import JobCard from "./JobCard";
import "../styles/JobList.css";

const JobList = ({ jobs, onDelete, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter jobs based on company or position
  const filteredJobs = jobs.filter((job) =>
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="job-list-container">
      <input
        type="text"
        placeholder="Search by company or position..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {filteredJobs.length === 0 ? (
        <p className="no-jobs">No jobs found matching the search.</p>
      ) : (
        filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
};

export default JobList;
