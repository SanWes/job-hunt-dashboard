import React, { useState, useEffect } from "react";
import JobList from "./components/JobList";
import JobForm from "./components/JobForm";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthPage from "./components/AuthPage";
import { getJobs, addJob as addJobToFirestore, deleteJob as deleteJobFromFirestore, updateJob as updateJobInFirestore } from "./firebase/firebaseHelpers";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";

function App() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  
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

  const editJob = async (id, updatedPosition, updatedCompany, updatedStatus, updatedJobLink, updatedNotes) => {
    const updatedJob = { position: updatedPosition, company: updatedCompany, status: updatedStatus, jobLink: updatedJobLink, notes: updatedNotes };
    try {
      await updateJobInFirestore(id, updatedJob);
      setJobs((prevJobs) => prevJobs.map((job) => job.id === id ? { ...job, ...updatedJob } : job));
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const filteredJobs = statusFilter === "All" ? jobs : jobs.filter((job) => job.status === statusFilter);
  
  if (!user) {
    return <AuthPage onLogin={() => setUser(auth.currentUser)} />;
  }

  return (
    <div className="App">
      <Header />
      
      <main className="content-container">
        {/* About Section Styled as a Pinned Memo */}
        <section id="about" className="about-section">
          <div className="memo-pin">📌</div>
          <h2>About Job Hunter</h2>
          <div className="about-content">
            <p>
              Job Hunter is your personal career command center. We've designed this space to help you 
              organize your journey, track applications, and maintain focus in one unified place.
            </p>
            <p>
              Built with <strong>React</strong> and <strong>Firebase</strong>, this tool turns the chaos of 
              job hunting into a structured path toward your dream role.
            </p>
          </div>
        </section>

        <section id="newjob" className="section-card">
          <JobForm onAddJob={addJob} />
        </section>

        <section id="joblist" className="section-card">
          <div className="filter-container">
            <h3 className="filter-title">Filter by Status</h3>
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
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;