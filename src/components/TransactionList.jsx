// TransactionList.js
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import AddNew from "./AddNew";

const TransactionList = () => {
  // State to hold all transactions and filtered transactions
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  // Fetch transactions from the backend on component mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Function to fetch transactions from the backend
  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://localhost:8001/transactions");
      const data = await response.json();
      setTransactions(data);
      setFilteredTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  // Function to handle the search for transactions based on a search term
  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      setFilteredTransactions(transactions); // If search term is empty, show all transactions
    } else {
      // Filter transactions based on search term (case-insensitive)
      const filteredData = transactions.filter((transaction) =>
        Object.values(transaction).some((field) =>
          field.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredTransactions(filteredData);
    }
  };

  // Function to add a new transaction
  const handleAddTransaction = async (newTransaction) => {
    try {
      // Perform API call to add the transaction to the backend
      const response = await fetch("http://localhost:8001/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransaction),
      });

      if (!response.ok) {
        throw new Error("Failed to add transaction.");
      }

      // Update the local state to reflect the new transaction
      const addedTransaction = await response.json();
      setTransactions([...transactions, addedTransaction]);
      setFilteredTransactions([...filteredTransactions, addedTransaction]);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Transaction Data</h3>
      <p>Here are the transaction details for the Flatiron Bank</p>
      {/* SearchBar component to handle search */}
      <SearchBar onSearch={handleSearch} />
      {/* AddNew component to handle adding new transactions */}
      <AddNew onAddTransaction={handleAddTransaction} />
      {/* Table to display the transactions */}
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through filtered transactions to display each transaction */}
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
