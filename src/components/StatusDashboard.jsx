import React from "react";
import "../styles/StatusDashboard.css";

const StatusDashboard = ({ jobs, setStatusFilter, activeFilter }) => {
  const stats = [
    { label: "Total Ledger", count: jobs.length, key: "All", className: "total" },
    { label: "Applied", count: jobs.filter(j => j.status === "Applied").length, key: "Applied", className: "applied" },
    { label: "In Process", count: jobs.filter(j => j.status === "Interviewing").length, key: "Interviewing", className: "interviewing" },
    { label: "Offers", count: jobs.filter(j => j.status === "Offer").length, key: "Offer", className: "offer" },
    { label: "Settled", count: jobs.filter(j => j.status === "Rejected").length, key: "Rejected", className: "rejected" },
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
            className={`stat-item ${stat.className} ${activeFilter === stat.key ? "active" : ""}`} 
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