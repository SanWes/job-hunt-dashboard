import React, { useState, useEffect } from "react";
import "../styles/JobCard.css";

const JobCard = ({ job, onDelete, onEdit }) => {
    // --- STATE MANAGEMENT ---
    const [isEditing, setIsEditing] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false); // Safety catch for deletion

    const [editedPosition, setEditedPosition] = useState(job.position);
    const [editedCompany, setEditedCompany] = useState(job.company);
    const [editedStatus, setEditedStatus] = useState(job.status);
    const [editedJobLink, setEditedJobLink] = useState(job.jobLink);
    const [editedNotes, setEditedNotes] = useState(Array.isArray(job.notes) ? job.notes : []);

    // Sync notes if they change externally
    useEffect(() => {
        setEditedNotes(Array.isArray(job.notes) ? job.notes : []);
    }, [job.notes]);

    // --- HANDLERS ---
    const handleEditClick = () => setIsEditing(true);

    const handleSaveClick = () => {
        if (editedPosition.trim() === "" || editedCompany.trim() === "") {
            alert("Position and company cannot be empty!");
            return;
        }
        onEdit(job.id, editedPosition, editedCompany, editedStatus, editedJobLink, editedNotes);
        setIsEditing(false);
    };

    const handleDeleteClick = () => {
        if (showConfirm) {
            onDelete(job.id);
        } else {
            setShowConfirm(true);
            // Optional: Auto-reset confirmation after 3 seconds of inactivity
            setTimeout(() => setShowConfirm(false), 3000);
        }
    };

    const handleNoteChange = (index, value) => {
        const updatedNotes = [...editedNotes];
        updatedNotes[index] = value;
        setEditedNotes(updatedNotes);
    };

    const handleAddNote = () => setEditedNotes([...editedNotes, ""]);
    const handleDeleteNote = (index) => setEditedNotes(editedNotes.filter((_, i) => i !== index));

    const statusClass = job.status ? job.status.toLowerCase() : "applied";

    return (
        <div className={`job-card ${statusClass} ${isEditing ? "editing" : ""}`}>
            {/* STATUS TAB */}
            <div className="status-tab">{isEditing ? editedStatus : job.status}</div>

            {isEditing ? (
                /* EDIT MODE TOP */
                <div className="edit-top-info">
                    <div className="edit-grid-main">
                        <div className="edit-group">
                            <label className="edit-label">Position</label>
                            <input
                                type="text"
                                value={editedPosition}
                                onChange={(e) => setEditedPosition(e.target.value)}
                                className="edit-input full-width"
                                placeholder="Position"
                            />
                        </div>
                        <div className="edit-group">
                            <label className="edit-label">Company</label>
                            <input
                                type="text"
                                value={editedCompany}
                                onChange={(e) => setEditedCompany(e.target.value)}
                                className="edit-input full-width"
                                placeholder="Company"
                            />
                        </div>
                        <div className="edit-group">
                            <label className="edit-label">Status</label>
                            <select
                                value={editedStatus}
                                onChange={(e) => setEditedStatus(e.target.value)}
                                className="edit-select-main"
                            >
                                <option value="Applied">Applied</option>
                                <option value="Interviewing">Interviewing</option>
                                <option value="Offer">Offer</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                </div>
            ) : (
                /* VIEW MODE TOP */
                <div className="view-header">
                    <h3>
                        <span className="job-position">{job.position}</span>
                        <span className="at-text"> at </span>
                        <span className="company-name">{job.company}</span>
                    </h3>
                    <p className="date-added">Added on {job.dateAdded}</p>
                </div>
            )}

            {isEditing ? (
                /* EDIT MODE MIDDLE */
                <div className="edit-section">
                    <label className="edit-label">Listing URL</label>
                    <input
                        type="text"
                        value={editedJobLink}
                        onChange={(e) => setEditedJobLink(e.target.value)}
                        placeholder="https://..."
                        className="edit-input full-width"
                    />
                    
                    <label className="edit-label">Notes Intelligence</label>
                    {editedNotes.map((note, index) => (
                        <div key={index} className="note-edit-row">
                            <textarea
                                value={note}
                                onChange={(e) => handleNoteChange(index, e.target.value)}
                                className="edit-input note-area"
                            />
                            <button onClick={() => handleDeleteNote(index)} className="delete-note-btn">✕</button>
                        </div>
                    ))}
                    <button onClick={handleAddNote} className="add-note-btn">+ Add Record</button>
                </div>
            ) : (
                /* VIEW MODE MIDDLE */
                <div className="view-section">
                    {job.jobLink && (
                        <a href={job.jobLink} target="_blank" rel="noopener noreferrer" className="job-link">
                            View Listing
                        </a>
                    )}
                    <div className="notes-display">
                        <ul className="notes-list">
                            {job.notes.map((note, index) => (
                                <li key={index}>{note}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* CARD FOOTER: Actions with Delete Confirmation */}
            <div className="card-footer">
                <div className="actions">
                    {isEditing ? (
                        <button onClick={handleSaveClick} className="save-btn">Save Changes</button>
                    ) : (
                        <button onClick={handleEditClick} className="edit-btn">Edit</button>
                    )}

                    <div className="delete-container">
                        <button 
                            onClick={handleDeleteClick} 
                            className={`delete-btn ${showConfirm ? "confirming" : ""}`}
                        >
                            {showConfirm ? "Confirm Delete?" : "Delete"}
                        </button>
                        
                        {showConfirm && (
                            <button 
                                onClick={() => setShowConfirm(false)} 
                                className="cancel-delete-btn"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobCard;