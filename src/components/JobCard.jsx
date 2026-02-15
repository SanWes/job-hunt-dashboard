import React, { useState, useEffect } from "react";
import "../styles/JobCard.css";

const JobCard = ({ job, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [editedPosition, setEditedPosition] = useState(job.position);
    const [editedCompany, setEditedCompany] = useState(job.company);
    const [editedStatus, setEditedStatus] = useState(job.status);
    const [editedJobLink, setEditedJobLink] = useState(job.jobLink);
    const [editedNotes, setEditedNotes] = useState(Array.isArray(job.notes) ? job.notes : []);

    useEffect(() => {
        setEditedNotes(Array.isArray(job.notes) ? job.notes : []);
    }, [job.notes]);

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

    // Map status to a safe CSS class
    const statusClass = job.status ? job.status.toLowerCase().replace(/\s+/g, '-') : "applied";

    return (
        <div className={`portfolio-file ${statusClass} ${isEditing ? "editing" : ""}`}>
            {/* THE MANILA FOLDER TAB */}
            <div className="folder-tab">
                <span className="tab-text">{isEditing ? editedStatus : job.status}</span>
            </div>

            <div className="file-content">
                {isEditing ? (
                    <div className="edit-mode">
                        <div className="edit-grid-main">
                            <div className="edit-group">
                                <label className="edit-label">Entity</label>
                                <input
                                    type="text"
                                    value={editedCompany}
                                    onChange={(e) => setEditedCompany(e.target.value)}
                                    className="ledger-input"
                                />
                            </div>
                            <div className="edit-group">
                                <label className="edit-label">Role</label>
                                <input
                                    type="text"
                                    value={editedPosition}
                                    onChange={(e) => setEditedPosition(e.target.value)}
                                    className="ledger-input"
                                />
                            </div>
                            <div className="edit-group">
                                <label className="edit-label">Status</label>
                                <select
                                    value={editedStatus}
                                    onChange={(e) => setEditedStatus(e.target.value)}
                                    className="ledger-select"
                                >
                                    <option value="Applied">Applied</option>
                                    <option value="Interviewing">In Process</option>
                                    <option value="Offer">Offer Received</option>
                                    <option value="Rejected">Settled</option>
                                </select>
                            </div>
                        </div>

                        <div className="edit-section">
                            <label className="edit-label">Listing URL</label>
                            <input
                                type="text"
                                value={editedJobLink}
                                onChange={(e) => setEditedJobLink(e.target.value)}
                                className="ledger-input"
                            />
                            
                            <label className="edit-label">Strategic Context</label>
                            {editedNotes.map((note, index) => (
                                <div key={index} className="note-edit-row">
                                    <textarea
                                        value={note}
                                        onChange={(e) => handleNoteChange(index, e.target.value)}
                                        className="ledger-textarea"
                                    />
                                    <button onClick={() => handleDeleteNote(index)} className="delete-note-btn">✕</button>
                                </div>
                            ))}
                            <button onClick={handleAddNote} className="add-note-btn">+ Add Record</button>
                        </div>
                    </div>
                ) : (
                    <div className="view-mode">
                        <div className="file-header">
                            <h2>
                                <span className="job-position">{job.position}</span>
                                <span className="at-text"> at </span>
                                <span className="company-name">{job.company}</span>
                            </h2>
                            <p className="date-added">Archived on {job.dateAdded}</p>
                        </div>

                        {job.jobLink && (
                            <a href={job.jobLink} target="_blank" rel="noopener noreferrer" className="job-link">
                                VIEW LISTING →
                            </a>
                        )}

                        <div className="notes-container">
                            <ul className="notes-list">
                                {job.notes.map((note, index) => (
                                    <li key={index}>{note}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                <div className="file-footer">
                    <div className="actions">
                        {isEditing ? (
                            <button onClick={handleSaveClick} className="save-btn">COMMIT CHANGES</button>
                        ) : (
                            <button onClick={handleEditClick} className="edit-btn">EDIT FILE</button>
                        )}

                        <div className="delete-wrapper">
                            <button 
                                onClick={handleDeleteClick} 
                                className={`delete-btn ${showConfirm ? "confirming" : ""}`}
                            >
                                {showConfirm ? "CONFIRM PURGE?" : "DELETE"}
                            </button>
                            {showConfirm && (
                                <button onClick={() => setShowConfirm(false)} className="cancel-btn">CANCEL</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobCard;