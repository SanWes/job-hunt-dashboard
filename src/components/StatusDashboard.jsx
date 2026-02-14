import React from "react";
import "../styles/StatusDashboard.css";

const StatusDashboard = ({ jobs, setStatusFilter }) => {
  const stats = {
    total: jobs.length,
    applied: jobs.filter((j) => j.status === "Applied").length,
    interviewing: jobs.filter((j) => j.status === "Interviewing").length,
    offer: jobs.filter((j) => j.status === "Offer").length,
    rejected: jobs.filter((j) => j.status === "Rejected").length,
  };

  const handleStatClick = (status) => {
    setStatusFilter(status);
    // Smooth scroll to the job list section
    const listSection = document.getElementById("joblist");
    if (listSection) {
      listSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="status-dashboard-wrapper">
      <div className="dashboard-label">Status Report</div>
      
      <div className="status-dashboard">
        <div className="stat-item total" onClick={() => handleStatClick("All")}>
          <span className="stat-count">{stats.total}</span>
          <span className="stat-name">Total Board</span>
        </div>
        <div className="stat-item applied" onClick={() => handleStatClick("Applied")}>
          <span className="stat-count">{stats.applied}</span>
          <span className="stat-name">Applied</span>
        </div>
        <div className="stat-item interviewing" onClick={() => handleStatClick("Interviewing")}>
          <span className="stat-count">{stats.interviewing}</span>
          <span className="stat-name">Interviews</span>
        </div>
        <div className="stat-item offer" onClick={() => handleStatClick("Offer")}>
          <span className="stat-count">{stats.offer}</span>
          <span className="stat-name">Offers</span>
        </div>
        <div className="stat-item rejected" onClick={() => handleStatClick("Rejected")}>
          <span className="stat-count">{stats.rejected}</span>
          <span className="stat-name">Rejections</span>
        </div>
      </div>
    </div>
  );
};

export default StatusDashboard;