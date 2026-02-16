import React from "react";
import JobCard from "./JobCard";
import "../styles/JobList.css";

const JobList = ({ jobs, onDelete, onEdit }) => {

  return (
    <div className="job-list-container">
      <div className="job-grid">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default JobList;