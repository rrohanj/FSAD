import React from 'react';
const SearchBar = ({ onSearch }) => (
  <div className="search-container">
    <input
      type="text"
      placeholder="Search by Artist or City..."
      onChange={(e) => onSearch(e.target.value)}
      className="search-input"
    />
  </div>
);
export default SearchBar;
