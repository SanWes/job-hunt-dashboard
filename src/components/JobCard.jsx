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

    const handleEditClick = () => {
        setIsEditing(true);
    };

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

    const handleAddNote = () => {
        setEditedNotes([...editedNotes, ""]);
    };

    const handleDeleteNote = (index) => {
        const updatedNotes = editedNotes.filter((_, i) => i !== index);
        setEditedNotes(updatedNotes);
    };

    // Get color class based on status
    const statusClass = job.status ? job.status.toLowerCase() : "applied";

    return (
        <div className={`job-card ${statusClass} ${isEditing ? " editing" : ""}`}>
            {/* Status Tab - Visual Indicator */}
            <div className="status-tab">{job.status}</div>

            <h3>
                <span className="job-position">
                    {isEditing ? (
                        <input
                            type="text"
                            value={editedPosition}
                            onChange={(e) => setEditedPosition(e.target.value)}
                            className="edit-input"
                            placeholder="Position"
                        />
                    ) : (
                        job.position
                    )}
                </span>{" "}
                <span className="at-text">at</span>{" "}
                <span className="company-name">
                    {isEditing ? (
                        <input
                            type="text"
                            value={editedCompany}
                            onChange={(e) => setEditedCompany(e.target.value)}
                            className="edit-input"
                            placeholder="Company"
                        />
                    ) : (
                        job.company
                    )}
                </span>
            </h3>

            <p className="date-added">📅 {job.dateAdded}</p>

            {isEditing ? (
                <div className="edit-section">
                    <label>Job Link:</label>
                    <input
                        type="text"
                        value={editedJobLink}
                        onChange={(e) => setEditedJobLink(e.target.value)}
                        placeholder="Job Link"
                        className="edit-input"
                    />
                </div>
            ) : (
                job.jobLink && (
                    <p className="job-link-p">
                        <strong>Link: </strong>
                        <a href={job.jobLink} target="_blank" rel="noopener noreferrer">
                            Visit Listing 🔗
                        </a>
                    </p>
                )
            )}

            {isEditing ? (
                <div className="edit-section">
                    <label>Notes:</label>
                    {editedNotes.map((note, index) => (
                        <div key={index} className="note-edit-row">
                            <textarea
                                value={note}
                                onChange={(e) => handleNoteChange(index, e.target.value)}
                                className="edit-input"
                            />
                            <button onClick={() => handleDeleteNote(index)} className="delete-note-btn">✕</button>
                        </div>
                    ))}
                    <button onClick={handleAddNote} className="add-note-btn">+ Add Note</button>
                </div>
            ) : (
                <div className="notes-display">
                    {Array.isArray(job.notes) && job.notes.length > 0 ? (
                        <ul>
                            {job.notes.map((note, index) => (
                                <li key={index}>{note}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-notes">No notes yet.</p>
                    )}
                </div>
            )}

            <div className="card-footer">
                <div className="status-selector">
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