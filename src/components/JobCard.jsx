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

    // PREVENTS 404: Ensures links have https:// if user forgot to type it
    const formatUrl = (url) => {
        if (!url) return "#";
        const protocolHeader = /^(http|https):\/\//i;
        return protocolHeader.test(url) ? url : `https://${url}`;
    };

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
                    /* --- EDIT STATE: DATA OVERRIDE --- */
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
                                    placeholder="e.g. linkedin.com/jobs/..."
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
                                    rows={3}
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
                                <span className="date-tag">ORIGIN: {job.dateAdded}</span>
                                
                                {job.lastUpdated && (
                                    <span className="update-tag">REVISED: {job.lastUpdated}</span>
                            )}
                                <span className="status-badge">{job.status}</span>
                            </div>
                        </div>

                        <div className="view-body">
                            <div className="intel-section">
                                <span className="section-label">STRATEGIC OBSERVATIONS</span>
<ul className="intel-lines">
    {job.notes.map((n, i) => (
        <li key={i}>
            {n ? n : <span className="placeholder-intel">PENDING DATA // NO RECORD FOUND</span>}
        </li>
    ))}
</ul>
                            </div>

                            {/* INTEL ORIGIN: Visual Link Tracker */}
                            {job.jobLink && (
                                <div className="intel-origin">
                                    <div className="origin-header">
                                        <span className="origin-label">INTEL ORIGIN // {job.company.toUpperCase()}</span>
                                    </div>
                                    <a 
                                        href={formatUrl(job.jobLink)} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="origin-link-wrapper"
                                    >
                                        <code className="coordinate-text">{job.jobLink}</code>
                                        <div className="terminal-button">ACCESS SOURCE ↗</div>
                                    </a>
                                </div>
                            )}
                        </div>

                        <div className="view-footer">
                            <button className="btn-action" onClick={() => setIsEditing(true)}>MODIFY ENTRY</button>
                            <div className="danger-zone">
                                {showConfirm ? (
                                    <div className="shred-confirm-group">
                                        <button className="btn-danger confirm shiver" onClick={() => onDelete(job.id)}>
                                            PERMANENTLY SHRED
                                        </button>
                                        <button className="btn-cancel" onClick={() => setShowConfirm(false)}>
                                            CANCEL
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