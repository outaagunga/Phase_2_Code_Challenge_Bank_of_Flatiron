// Import required modules from React library
import React, { useState } from "react";

// Define a functional component called SearchBar and receive the onSearch prop
const SearchBar = ({ onSearch }) => {
  // State hook to manage the value of the search term
  const [searchTerm, setSearchTerm] = useState("");

  // Event handler to update the search term as the user types in the input field
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Event handler to trigger the search when the user clicks the search button
  const handleSearch = () => {
    onSearch(searchTerm);
  };

  // Render the SearchBar component
  return (
    <div className="my-4">
      {/* Input field for the user to enter the search term */}
      <input
        type="text"
        placeholder="Search by ID, Date, Description, Category, or Amount..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      {/* Button to initiate the search */}
      <button className="btn btn-primary ml-2" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

// Export the SearchBar component as the default export
export default SearchBar;
