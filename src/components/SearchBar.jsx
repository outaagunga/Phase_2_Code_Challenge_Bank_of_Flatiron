import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="my-4">
      <input
        type="text"
        placeholder="Search by ID, Date, Description, Category, or Amount..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button className="btn btn-primary ml-2" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
