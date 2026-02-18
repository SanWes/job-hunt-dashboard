import React, { useState, useEffect } from "react";
import JobList from "./components/JobList";
import JobForm from "./components/JobForm";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthPage from "./components/AuthPage";
import StatusDashboard from "./components/StatusDashboard";
import AboutSection from "./components/AboutSection";

import {
  getJobs,
  addJob as addJobToFirestore,
  deleteJob as deleteJobFromFirestore,
  updateJob as updateJobInFirestore,
} from "./firebase/firebaseHelpers";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import SearchBar from "./components/SearchBar";

function App() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState(""); // Shared Search State
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchJobs = async () => {
      try {
        const jobData = await getJobs();
        setJobs(jobData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, [user]);

  const addJob = async (newJob) => {
    const archiveDate = new Date().toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });

    // Override the incoming date with our formatted version
    const formattedJob = { 
      ...newJob, 
      dateAdded: archiveDate 
    };

    try {
      const id = await addJobToFirestore(formattedJob);
      setJobs((prevJobs) => [...prevJobs, { ...formattedJob, id }]);
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

  const editJob = async (id, updatedPosition, updatedCompany, updatedStatus, updatedJobLink, updatedNotes) => {
  const lastUpdated = new Date().toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
      });

    const updatedJob = { position: updatedPosition, company: updatedCompany, status: updatedStatus, jobLink: updatedJobLink, notes: updatedNotes, lastUpdated: lastUpdated
    };
    try {
      await updateJobInFirestore(id, updatedJob);
      setJobs((prevJobs) => prevJobs.map((job) => (job.id === id ? { ...job, ...updatedJob } : job)));
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  // --- NEW COMBINED FILTER LOGIC ---
  const displayJobs = jobs.filter((job) => {
    const matchesStatus = statusFilter === "All" || job.status === statusFilter;
    const matchesSearch = 
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.position.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });
  
  if (!user) {
    return <AuthPage onLogin={() => setUser(auth.currentUser)} />;
  }

  const scrollToForm = () => {
      const formElement = document.getElementById("newjob");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth" });
      }
    };

  return (
    <div className="App">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* <br />
      <br />
      <br /> */}
      <StatusDashboard jobs={jobs} setStatusFilter={setStatusFilter} />

      <AboutSection />

      <section id="newjob" className="section-card">
        <JobForm onAddJob={addJob} />
      </section>

      <section id="joblist" className="section-card">
        <div className="filter-container">
        
          <span>Filter by Status:</span>
          <div className="button-row">
  {["All", "Filed", "Active", "Secured", "Archived"].map((status) => (
    <button
      key={status}
      onClick={() => setStatusFilter(status)}
      className={`filter-button ${status.toLowerCase()} ${statusFilter === status ? "is-focused" : ""}`}
    >
      {status}
    </button>
  ))}
</div>
        </div> 
        
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        {displayJobs.length > 0 ? (
          <JobList 
            jobs={displayJobs} 
            onDelete={deleteJob} 
            onEdit={editJob} 
          />
        ) : (
          <div className="empty-ledger-state">
            <div className="empty-icon">{searchTerm ? "🔍" : "🖋️"}</div>
            <h3>{searchTerm ? "No Matches Found" : "The Ledger is Empty"}</h3>
            <p>{searchTerm ? "Adjust your search to find a record." : "Every great career move begins with a single entry."}</p>
            
            {searchTerm ? (
              <button onClick={() => setSearchTerm("")} className="reset-filter-btn">
                Clear Search
              </button>
            ) : statusFilter !== "All" ? (
              <button onClick={() => setStatusFilter("All")} className="reset-filter-btn">
                Back to Full Ledger
              </button>
            ) : (
              <button onClick={scrollToForm} className="reset-filter-btn">
                Initialize First Entry
              </button>
            )}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default App;