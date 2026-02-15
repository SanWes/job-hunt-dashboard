import React from "react";
import "../styles/SearchBar.css";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
const handleClear = () => {
    setSearchTerm("");
};

return (
    <div className="search-bar-wrapper">
    <div className="search-container-inner">
        <span className="search-icon">🔍</span>
        <input
        type="text"
        placeholder="SEARCH THE LEDGER BY COMPANY OR ROLE..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
        />
        {searchTerm && (
        <button 
            className="search-clear-btn" 
            onClick={handleClear}
            title="Clear search"
        >
            ✕
        </button>
        )}
    </div>
    </div>
);
};

export default SearchBar;