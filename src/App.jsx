import { useState } from "react";
import TransactionList from "./components/TransactionList";
import AddNew from "./components/AddNew";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <TransactionList />
      </div>
    </>
  );
}

export default App;
