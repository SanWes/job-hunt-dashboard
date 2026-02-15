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

    const handleSaveClick = () => {
        onEdit(job.id, editedPosition, editedCompany, editedStatus, editedJobLink, editedNotes);
        setIsEditing(false);
    };

    const handleNoteChange = (index, value) => {
        const updatedNotes = [...editedNotes];
        updatedNotes[index] = value;
        setEditedNotes(updatedNotes);
    };

    const statusClass = job.status ? job.status.toLowerCase().replace(/\s+/g, '-') : "applied";

    return (
        <div className={`portfolio-file ${statusClass} ${isEditing ? "is-editing" : ""}`}>
            {/* THE FOLDER TAB */}
            <div className="folder-tab">
                <span className="tab-label">{isEditing ? "EDITING MODE" : job.status}</span>
            </div>

            <div className="file-inner">
                {isEditing ? (
                    /* --- EDIT STATE --- */
                    <div className="edit-container">
                        <div className="edit-row-main">
                            <div className="input-box">
                                <label>ENTITY</label>
                                <input type="text" value={editedCompany} onChange={(e) => setEditedCompany(e.target.value)} />
                            </div>
                            <div className="input-box">
                                <label>ROLE</label>
                                <input type="text" value={editedPosition} onChange={(e) => setEditedPosition(e.target.value)} />
                            </div>
                        </div>

                        <div className="edit-row-secondary">
                            <div className="input-box">
                                <label>STATUS</label>
                                <select value={editedStatus} onChange={(e) => setEditedStatus(e.target.value)}>
                                    <option value="Applied">Applied</option>
                                    <option value="Interviewing">In Process</option>
                                    <option value="Offer">Offer Received</option>
                                    <option value="Rejected">Settled</option>
                                </select>
                            </div>
                            <div className="input-box">
                                <label>SOURCE LINK</label>
                                <input type="text" value={editedJobLink} onChange={(e) => setEditedJobLink(e.target.value)} />
                            </div>
                        </div>

                        <div className="edit-notes-area">
                            <label>STRATEGIC CONTEXT</label>
                            {editedNotes.map((note, index) => (
                                <textarea key={index} value={note} onChange={(e) => handleNoteChange(index, e.target.value)} />
                            ))}
                        </div>

                        <div className="edit-actions">
                            <button className="btn-save" onClick={handleSaveClick}>COMMIT CHANGES</button>
                            <button className="btn-cancel" onClick={() => setIsEditing(false)}>ABORT</button>
                        </div>
                    </div>
                ) : (
                    /* --- VIEW STATE --- */
                    <div className="view-container">
                        <div className="view-header">
                            <h2>{job.position} <span className="at">at</span> <span className="entity">{job.company}</span></h2>
                            <p className="meta">ARCHIVED: {job.dateAdded}</p>
                        </div>

                        <div className="view-body">
                            {job.jobLink && <a href={job.jobLink} target="_blank" className="source-link">Source File ↗</a>}
                            <ul className="intel-list">
                                {job.notes.map((n, i) => <li key={i}>{n}</li>)}
                            </ul>
                        </div>

                        <div className="view-footer">
                            <button className="btn-modify" onClick={() => setIsEditing(true)}>MODIFY</button>
                            <div className="delete-zone">
                                {showConfirm ? (
                                    <>
                                        <button className="btn-confirm" onClick={() => onDelete(job.id)}>SHRED NOW</button>
                                        <button className="btn-abort" onClick={() => setShowConfirm(false)}>CANCEL</button>
                                    </>
                                ) : (
                                    <button className="btn-shred" onClick={() => setShowConfirm(true)}>SHRED</button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobCard;