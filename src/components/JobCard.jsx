import React, { useState, useEffect } from "react";
import "../styles/JobCard.css";

const JobCard = ({ job, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedPosition, setEditedPosition] = useState(job.position);
    const [editedCompany, setEditedCompany] = useState(job.company);
    const [editedStatus, setEditedStatus] = useState(job.status);
    const [editedJobLink, setEditedJobLink] = useState(job.jobLink);
    const [editedNotes, setEditedNotes] = useState(Array.isArray(job.notes) ? job.notes : []); // Ensure notes is an array

    useEffect(() => {
        setEditedNotes(Array.isArray(job.notes) ? job.notes : []); // Sync with incoming job's notes
    }, [job.notes]); // When job.notes change, update the notes

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

    return (
        <div className={`job-card${isEditing ? " editing" : ""}`}>
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
            at{" "}
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

        <p>Date Added: {job.dateAdded}</p>

        {isEditing ? (
            <div className="form-group">
            <label htmlFor="jobLink">Job Link:</label>
            <input
                type="text"
                id="jobLink"
                value={editedJobLink}
                onChange={(e) => setEditedJobLink(e.target.value)}
                placeholder="Job Link"
                className="edit-input"
            />
            </div>
        ) : (
            job.jobLink && (
            <p>
                <strong>Job Link: </strong>
                <a href={job.jobLink} target="_blank" rel="noopener noreferrer">
                {job.jobLink}
                </a>
            </p>
            )
        )}

        {/* Notes display */}
        {isEditing ? (
            <div className="form-group">
            <label>Notes:</label>
            {editedNotes.map((note, index) => (
                <div key={index} className="note-edit">
                <textarea
                    value={note}
                    onChange={(e) => handleNoteChange(index, e.target.value)}
                    className="edit-input"
                    placeholder="Enter note"
                />
                <button onClick={() => handleDeleteNote(index)} className="delete-note-btn">
                    Delete Note
                </button>
                </div>
            ))}
            <button onClick={handleAddNote} className="add-note-btn">
                Add Note
            </button>
            </div>
        ) : (
            // Render notes in view mode (non-edit mode)
            <div className="notes-display">
            <strong>Notes:</strong>
            {Array.isArray(job.notes) && job.notes.length > 0 ? (
                <ul>
                {job.notes.map((note, index) => (
                    <li key={index}>{note}</li>
                ))}
                </ul>
            ) : (
                <p>No notes available</p>
            )}
            </div>
        )}

        <div className="status">
            <strong>Status:</strong>
            {isEditing ? (
            <select
                value={editedStatus}
                onChange={(e) => setEditedStatus(e.target.value)}
            >
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
            </select>
            ) : (
            <span> {job.status}</span>
            )}
        </div>

        <div className="actions">
            {isEditing ? (
            <button
                onClick={handleSaveClick}
                disabled={editedPosition.trim() === "" || editedCompany.trim() === ""}
            >
                Save
            </button>
            ) : (
            <button onClick={handleEditClick}>Edit</button>
            )}
            <button onClick={() => onDelete(job.id)} className="delete-btn">
            Delete
            </button>
        </div>
        </div>
    );
};

export default JobCard;
