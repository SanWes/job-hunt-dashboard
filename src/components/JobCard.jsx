import React, { useState, useEffect } from "react";
import "../styles/JobCard.css";

const JobCard = ({ job, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
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
            <div className="status-tab">{job.status}</div>

            <h3>
                {isEditing ? (
                    <input
                        type="text"
                        value={editedPosition}
                        onChange={(e) => setEditedPosition(e.target.value)}
                        className="edit-input"
                        placeholder="Position"
                    />
                ) : (
                    <span className="job-position">{job.position}</span>
                )}
                <span className="at-text"> at </span>
                {isEditing ? (
                    <input
                        type="text"
                        value={editedCompany}
                        onChange={(e) => setEditedCompany(e.target.value)}
                        className="edit-input"
                        placeholder="Company"
                    />
                ) : (
                    <span className="company-name">{job.company}</span>
                )}
            </h3>

            <p className="date-added">Added on {job.dateAdded}</p>

            {isEditing ? (
                <div className="edit-section">
                    <label className="edit-label">Listing URL</label>
                    <input
                        type="text"
                        value={editedJobLink}
                        onChange={(e) => setEditedJobLink(e.target.value)}
                        placeholder="https://..."
                        className="edit-input full-width"
                    />
                    
                    <label className="edit-label">Notes</label>
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
                    <button onClick={handleAddNote} className="add-note-btn">+ Add Note</button>
                </div>
            ) : (
                <>
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
                </>
            )}

            <div className="card-footer">
                <div className="status-selector-container">
                    {isEditing && (
                        <select
                            value={editedStatus}
                            onChange={(e) => setEditedStatus(e.target.value)}
                            className="edit-select"
                        >
                            <option value="Applied">Applied</option>
                            <option value="Interviewing">Interviewing</option>
                            <option value="Offer">Offer</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    )}
                </div>
                <div className="actions">
                    {isEditing ? (
                        <button onClick={handleSaveClick} className="save-btn">Save</button>
                    ) : (
                        <button onClick={handleEditClick} className="edit-btn">Edit</button>
                    )}
                    <button onClick={() => onDelete(job.id)} className="delete-btn">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default JobCard;