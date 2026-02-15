import React from "react";
import "../styles/SearchBar.css";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
return (
    <div className="search-bar-wrapper header-search header-search-container">
    <span className="search-icon">🔍</span>
    <input
        type="text"
        placeholder="SEARCH THE LEDGER BY COMPANY OR ROLE..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
    />
    </div>
);
};

export default SearchBar;