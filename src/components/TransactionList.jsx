import { useState, useEffect } from "react";

const TransactionList = () => {
  const [transactions, setTransaction] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then((response) => response.json())
      .then((transaction) => setTransaction(transaction))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <div>
        {transactions.map((transaction) => (
          <div key={transaction.id}>
            {transaction.id}, {transaction.date}, {transaction.description},{" "}
            {transaction.category}, {transaction.amount}
          </div>
        ))}
      </div>
    </>
  );
};

export default TransactionList;
