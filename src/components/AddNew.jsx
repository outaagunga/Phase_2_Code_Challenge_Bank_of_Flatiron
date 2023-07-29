// Import necessary dependencies
import React, { useState } from "react";

// Component for adding new transactions
const AddNew = ({ onAddTransaction }) => {
  // State to manage the form visibility
  const [isOpen, setIsOpen] = useState(false);

  // State to store the new transaction data
  const [newTransaction, setNewTransaction] = useState({
    date: "",
    description: "",
    category: "",
    amount: 0,
  });

  // Function to handle input changes in the form fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    // Update the newTransaction state using the previous transaction data (spread operator)
    setNewTransaction((prevTransaction) => ({
      ...prevTransaction,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Call the onAddTransaction prop function to add the new transaction
    onAddTransaction(newTransaction);

    // Clear the form fields after submission
    setNewTransaction({
      date: "",
      description: "",
      category: "",
      amount: 0,
    });

    // Close the form after submission
    setIsOpen(false);
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              {!isOpen && (
                // Button to show the form when it's closed
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={() => setIsOpen(true)}
                >
                  Add New Transaction
                </button>
              )}
              {isOpen && (
                // Form for adding a new transaction when it's open
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      name="date"
                      value={newTransaction.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      name="description"
                      value={newTransaction.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="category"
                      name="category"
                      value={newTransaction.category}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="amount">Amount:</label>
                    <input
                      type="number"
                      className="form-control"
                      id="amount"
                      name="amount"
                      value={newTransaction.amount}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Add Transaction
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the AddNew component for use in other parts of the application
export default AddNew;
