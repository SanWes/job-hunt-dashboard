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

const statusClass = job.status ? job.status.toLowerCase().replace(/\s+/g, '-') : "filed";

return (
    <div className={`ledger-card ${statusClass} ${isEditing ? "is-editing" : ""}`}>
    {/* TACTICAL STATUS STRIP */}
    <div className="status-strip"></div>

    <div className="card-inner">
        {isEditing ? (
        /* --- EDIT STATE: MODULE INITIALIZATION --- */
        <div className="edit-module">
            <div className="module-header">
            <span className="mode-tag">EDIT MODE // DATA OVERRIDE</span>
            </div>
            
            <div className="edit-grid">
            <div className="field-group">
                <label>ENTITY</label>
                <input 
                type="text" 
                value={editedCompany} 
                onChange={(e) => setEditedCompany(e.target.value)} 
                />
            </div>
            <div className="field-group">
                <label>FUNCTION</label>
                <input 
                type="text" 
                value={editedPosition} 
                onChange={(e) => setEditedPosition(e.target.value)} 
                />
            </div>
            <div className="field-group">
                <label>STATUS</label>
                <select value={editedStatus} onChange={(e) => setEditedStatus(e.target.value)}>
                <option value="Filed">Filed</option>
                <option value="Active">Active</option>
                <option value="Secured">Secured</option>
                <option value="Archived">Archived</option>
                </select>
            </div>
            <div className="field-group">
                <label>SOURCE LINK</label>
                <input 
                type="text" 
                value={editedJobLink} 
                onChange={(e) => setEditedJobLink(e.target.value)} 
                />
            </div>
            </div>

            <div className="field-group full-width">
            <label>STRATEGIC OBSERVATIONS</label>
            {editedNotes.map((note, index) => (
                <textarea 
                key={index} 
                value={note} 
                onChange={(e) => handleNoteChange(index, e.target.value)} 
                rows={4}
                />
            ))}
            </div>

            <div className="edit-footer">
            <button className="btn-save" onClick={handleSaveClick}>COMMIT CHANGES</button>
            <button className="btn-cancel" onClick={() => setIsEditing(false)}>CANCEL</button>
            </div>
        </div>
        ) : (
        /* --- VIEW STATE: DATA READOUT --- */
        <div className="view-module">
            <div className="view-header">
            <div className="title-block">
                <span className="entity-label">{job.company}</span>
                <h2 className="position-title">{job.position}</h2>
            </div>
            <div className="meta-block">
                <span className="date-tag">LOGGED: {job.dateAdded}</span>
                <span className="status-badge">{job.status}</span>
            </div>
            </div>

            <div className="view-body">
            <div className="intel-section">
                <span className="section-label">STRATEGIC OBSERVATIONS</span>
                <ul className="intel-lines">
                {job.notes.map((n, i) => (
                    <li key={i}>{n || "NO DATA RECORDED"}</li>
                ))}
                </ul>
            </div>
            {job.jobLink && (
                <a href={job.jobLink} target="_blank" rel="noreferrer" className="link-button">
                SOURCE LINK ↗
                </a>
            )}
            </div>

            <div className="view-footer">
            <button className="btn-action" onClick={() => setIsEditing(true)}>MODIFY ENTRY</button>
            <div className="danger-zone">
                {showConfirm ? (
                <div className="shred-confirm-group">
                    <button className="btn-danger confirm shiver" onClick={() => onDelete(job.id)}>
                    CONFIRM SHRED
                    </button>
                    <button className="btn-cancel" onClick={() => setShowConfirm(false)}>
                    ABORT
                    </button>
                </div>
                ) : (
                <button className="btn-danger" onClick={() => setShowConfirm(true)}>
                    SHRED FILE
                </button>
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