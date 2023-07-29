import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar"; // Replaced "TransactionSearchBar" with "SearchBar"

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://localhost:8001/transactions");
      const data = await response.json();
      setTransactions(data);
      setFilteredTransactions(data); // Initially, show all transactions
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      setFilteredTransactions(transactions); // If search term is empty, show all transactions
    } else {
      const filteredData = transactions.filter((transaction) =>
        Object.values(transaction).some((field) =>
          field.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredTransactions(filteredData);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Transaction Data</h1>
      <h3>Here are the transaction details for the Flatiron Bank</h3>
      <SearchBar onSearch={handleSearch} />
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
