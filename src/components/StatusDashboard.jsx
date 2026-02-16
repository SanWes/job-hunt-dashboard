import React from "react";
import "../styles/StatusDashboard.css";

const StatusDashboard = ({ jobs, setStatusFilter, activeFilter }) => {
  const stats = [
    { label: "Total Entries", count: jobs.length, key: "All", className: "total" },
    { label: "Filed", count: jobs.filter(j => j.status === "Filed").length, key: "Filed", className: "filed" },
    { label: "Active", count: jobs.filter(j => j.status === "Active").length, key: "Active", className: "active" },
    { label: "Secured", count: jobs.filter(j => j.status === "Secured").length, key: "Secured", className: "secured" },
    { label: "Archived", count: jobs.filter(j => j.status === "Archived").length, key: "Archived", className: "archived" },
  ];

  const handleStatClick = (key) => {
    setStatusFilter(key);
    // Restoration of the scroll function
    const listSection = document.getElementById("joblist");
    if (listSection) {
      listSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="status-dashboard-wrapper">
      <div className="dashboard-label">Strategic Intelligence Overview</div>
      <div className="status-dashboard">
        {stats.map((stat) => (
          <div 
            key={stat.key}
            className={`stat-item ${stat.className} ${activeFilter === stat.key ? "is-focused" : ""}`} 
            onClick={() => handleStatClick(stat.key)}
          >
            <span className="stat-count">{stat.count}</span>
            <span className="stat-name">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusDashboard;