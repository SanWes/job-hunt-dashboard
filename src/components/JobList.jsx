import React from "react";
import JobCard from "./JobCard";
import "../styles/JobList.css";

const JobList = ({ jobs, onDelete, onEdit }) => {
  // Logic removed: App.jsx now handles the filtering via displayJobs prop

  return (
    <div className="job-list-container">
      {/* Internal search bar removed. 
          Search is now handled globally in the Header.
      */}
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