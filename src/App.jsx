import React, { useState, useEffect } from "react";
import JobList from "./components/JobList";
import JobForm from "./components/JobForm";
import Header from "./components/Header";
import Footer from "./components/Footer";

import {
  getJobs,
  addJob as addJobToFirestore,
  deleteJob as deleteJobFromFirestore,
  updateJob as updateJobInFirestore,
} from "./firebase/firebaseHelpers";

function App() {
  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  // Fetch jobs on mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobData = await getJobs();
        setJobs(jobData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const addJob = async (newJob) => {
    try {
      const id = await addJobToFirestore(newJob);
      setJobs((prevJobs) => [...prevJobs, { ...newJob, id }]);
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  const deleteJob = async (jobId) => {
    try {
      await deleteJobFromFirestore(jobId);
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const editJob = async (
    id,
    updatedPosition,
    updatedCompany,
    updatedStatus,
    updatedJobLink,
    updatedNotes
  ) => {
    const updatedJob = {
      position: updatedPosition,
      company: updatedCompany,
      status: updatedStatus,
      jobLink: updatedJobLink,
      notes: updatedNotes,
    };

    try {
      await updateJobInFirestore(id, updatedJob);
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === id ? { ...job, ...updatedJob } : job
        )
      );
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const filteredJobs =
    statusFilter === "All"
      ? jobs
      : jobs.filter((job) => job.status === statusFilter);

  return (
    <div className="App">
      <Header />
      <section id="home" style={{ padding: "40px 20px", maxWidth: "900px", margin: "0 auto" }}>

      </section>

      <section id="about" className="about-section">
          <h2>About Job Hunter</h2>
          <p>
            Job Hunter is your personal job tracking tool, designed to help you
            organize and manage your job applications efficiently. Add, update,
            filter, and keep notes all in one place.
          </p>
          <p>
            Built with React and Firebase, this app aims to simplify your job
            search process so you can focus on landing your dream role.
          </p>
      </section>

      <section id="newjob" style={{ padding: "40px 20px", maxWidth: "900px", margin: "0 auto" }}>
        <JobForm onAddJob={addJob} />
      </section>

      <section id="joblist" style={{ padding: "40px 20px", maxWidth: "900px", margin: "0 auto" }}>
      
        <div className="filter-container">
          <span>Filter by Status:</span>
          <div className="button-row">
            {["All", "Applied", "Interviewing", "Offer", "Rejected"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`filter-button ${
                    statusFilter === status ? "active" : ""
                  }`}
                >
                  {status}
                </button>
              )
            )}
          </div>
        </div>
          

        <JobList jobs={filteredJobs} onDelete={deleteJob} onEdit={editJob} />
      </section>
      <Footer />
    </div>
  );
}

export default App;
