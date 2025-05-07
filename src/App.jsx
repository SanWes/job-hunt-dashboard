import React, { useState, useEffect } from "react";
import JobList from "./components/JobList";
import JobForm from "./components/JobForm";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("jobs");
    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (newJob) => {
    setJobs((prevJobs) => [...prevJobs, newJob]);
  };

  const deleteJob = (jobId) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
  };

  const editJob = (
    id,
    updatedPosition,
    updatedCompany,
    updatedStatus,
    updatedJobLink,
    updatedNotes
  ) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === id
          ? {
              ...job,
              position: updatedPosition,
              company: updatedCompany,
              status: updatedStatus,
              jobLink: updatedJobLink,
              notes: updatedNotes,
            }
          : job
      )
    );
  };

  const filteredJobs =
    statusFilter === "All"
      ? jobs
      : jobs.filter((job) => job.status === statusFilter);

  return (
    <div className="App">
      <Header />
      <JobForm onAddJob={addJob} />

      <div className="filter-container">
        <span>Filter by Status:</span>
        <div className="button-row">
          {["All", "Applied", "Interviewing", "Offer", "Rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`filter-button ${statusFilter === status ? "active" : ""}`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <JobList jobs={filteredJobs} onDelete={deleteJob} onEdit={editJob} />
      <Footer />
    </div>
  );
}

export default App;
