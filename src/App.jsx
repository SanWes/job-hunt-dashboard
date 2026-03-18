import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase/firebase";
import Header from "./components/Header";
import StatusDashboard from "./components/StatusDashboard";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import Settings from "./components/Settings";
import AboutSection from "./components/AboutSection";
import AuthPage from "./components/AuthPage";
import ErrorBoundary from "./components/ErrorBoundary";
import { GUEST_MOCK_JOBS, JOB_STATUSES } from "./utils/mockData";
import { formatArchiveDate, formatLastUpdated } from "./utils/formatters";

import {
  getJobs,
  addJob as addJobToFirestore,
  deleteJob as deleteJobFromFirestore,
  updateJob as updateJobInFirestore,
} from "./firebase/firebaseHelpers";

import { onAuthStateChanged } from "firebase/auth";
import SearchBar from "./components/SearchBar";

const AuthenticatedLayout = ({ user, isGuest, jobs, setJobs, statusFilter, setStatusFilter, searchTerm, setSearchTerm, showSettings, setShowSettings, handleGuestLogin, resetGuestData }) => (
  <>
    <Header 
      searchTerm={searchTerm} 
      setSearchTerm={setSearchTerm} 
      onGuestLogin={handleGuestLogin} 
      user={user}
      isGuest={isGuest}
      onSettingsOpen={() => setShowSettings(true)}
    />

    <StatusDashboard jobs={jobs} setStatusFilter={setStatusFilter} user={user} />
    
    {isGuest && (
      <div className="guest-controls">
        <button onClick={resetGuestData} className="reset-demo-btn">
          Reset Demo Data
        </button>
      </div>
    )}
    
    {showSettings && (
      <div className="settings-modal">
        <div className="modal-backdrop" onClick={() => setShowSettings(false)}></div>
        <div className="settings-modal-content">
          <Settings user={user} />
          <button onClick={() => setShowSettings(false)} className="modal-close-btn">
            Close
          </button>
        </div>
      </div>
    )}
    
    <AboutSection />

    <section id="newjob" className="section-card">
      <JobForm onAddJob={(newJob) => {
        const formattedJob = { ...newJob, dateAdded: formatArchiveDate() };
        if (isGuest) {
          const newJobWithId = { ...formattedJob, id: Date.now().toString() };
          setJobs((prevJobs) => [...prevJobs, newJobWithId]);
          return;
        }
        addJobToFirestore(formattedJob, user.uid).then(id => {
          setJobs((prevJobs) => [...prevJobs, { ...formattedJob, id }]);
        });
      }} />
    </section>

    <section id="joblist" className="section-card">
      <div className="filter-container">
        <span>Filter by Status:</span>
        <div className="button-row">
          {JOB_STATUSES.map((status) => (
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
      
      {jobs.filter((job) => {
        const matchesStatus = statusFilter === "All" || job.status === statusFilter;
        const matchesSearch = 
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.position.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
      }).length > 0 ? (
        <JobList 
          jobs={jobs.filter((job) => {
            const matchesStatus = statusFilter === "All" || job.status === statusFilter;
            const matchesSearch = 
              job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
              job.position.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesStatus && matchesSearch;
          })} 
          onDelete={(jobId) => {
            if (isGuest) {
              setJobs((prevJobs) => prevJobs.filter((job) => String(job.id) !== String(jobId)));
              return;
            }
            deleteJobFromFirestore(jobId, user.uid).then(() => {
              setJobs((prevJobs) => prevJobs.filter((job) => String(job.id) !== String(jobId)));
            });
          }} 
          onEdit={(id, updatedPosition, updatedCompany, updatedStatus, updatedJobLink, updatedNotes) => {
            const updatedJob = { 
              id: String(id),
              position: updatedPosition, 
              company: updatedCompany, 
              status: updatedStatus, 
              jobLink: updatedJobLink, 
              notes: updatedNotes, 
              lastUpdated: formatLastUpdated()
            };
            if (isGuest) {
              setJobs((prevJobs) => prevJobs.map((job) => String(job.id) === String(id) ? updatedJob : job));
              return;
            }
            updateJobInFirestore(id, updatedJob, user.uid).then(() => {
              setJobs((prevJobs) => prevJobs.map((job) => String(job.id) === String(id) ? updatedJob : job));
            });
          }} 
        />
      ) : (
        <div className="empty-ledger-state">
          <div className="empty-icon">{searchTerm ? "🔍" : "🖋️"}</div>
          <h3>{searchTerm ? "No Matches Found" : "The Ledger is Empty"}</h3>
          <p>{searchTerm ? "Adjust your search to find a record." : "Every great career move begins with a single entry."}</p>
        </div>
      )}
    </section>
  </>
);

function App() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState(""); 
  const [isGuest, setIsGuest] = useState(false); 
  const [showSettings, setShowSettings] = useState(false);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email === 'guest@theledger.com') {
        setIsGuest(true);
      } else {
        setIsGuest(false);
      }
    });
    return unsubscribe;
  }, []);

  // Check for guest session on app mount
  useEffect(() => {
    const savedGuestMode = sessionStorage.getItem('guestMode');
    if (!savedGuestMode || user || isGuest) return;
    if (savedGuestMode === 'true') {
      handleGuestLogin(); // Restore guest session
    }
  }, [user, isGuest]);

  // Store guest state in sessionStorage when guest login occurs
  useEffect(() => {
    if (isGuest) {
      sessionStorage.setItem('guestMode', 'true');
    } else {
      sessionStorage.removeItem('guestMode');
    }
  }, [isGuest]);

  useEffect(() => {
    if (!user) return;
    
    const abortController = new AbortController();
    
    const fetchJobs = async () => {
      try {
        const jobData = await getJobs(user.uid);
        if (!abortController.signal.aborted) {
          setJobs(jobData);
        }
      } catch (error) {
        if (!abortController.signal.aborted) {
          console.error("Error fetching jobs:", error);
        }
      }
    };
    
    fetchJobs();
    
    return () => {
      abortController.abort();
    };
  }, [user]);

  const handleGuestLogin = () => {
    setUser({
      uid: 'guest-user',
      email: 'guest@theledger.com',
      displayName: 'Guest Ledger'
    });
    setJobs(GUEST_MOCK_JOBS);
    setIsGuest(true);
  };

  const handleGuestLogout = () => {
    sessionStorage.removeItem('guestMode');
    setIsGuest(false);
    setUser(null);
    setJobs([]);
  };

  const resetGuestData = () => {
    setJobs(GUEST_MOCK_JOBS);
  };

  return (
    <ErrorBoundary>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              user ? <Navigate to="/dashboard" replace /> : <AuthPage onLogin={() => setUser(auth.currentUser)} onGuestLogin={handleGuestLogin} />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              user ? (
                <AuthenticatedLayout 
                  user={user}
                  isGuest={isGuest}
                  jobs={jobs}
                  setJobs={setJobs}
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  showSettings={showSettings}
                  setShowSettings={setShowSettings}
                  handleGuestLogin={handleGuestLogin}
                  resetGuestData={resetGuestData}
                  onGuestLogout={handleGuestLogout}
                />
              ) : <Navigate to="/" replace />
            } 
          />
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default App;




