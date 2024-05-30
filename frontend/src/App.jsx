import { useState, useEffect } from "react";
import axios from "./api/api";
import "./App.css";

function App() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("debit");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchBalance();
    fetchTransactions();
  }, []);

  const fetchBalance = async () => {
    try {
      const response = await axios.get("/balance");
      setBalance(response.data.balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("/transactions");
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleTransactionSubmit = async (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount); // Ensure amount is a float
    if (!parsedAmount || !type || !description) {
      alert("Please enter valid values for all fields.");
      return;
    }
    try {
      await axios.post("/transaction", {
        amount: parsedAmount,
        type,
        description,
        date: new Date().toISOString(),
      });
      setAmount(""); // Reset the amount field after successful submission
      setDescription(""); // Reset the description field
      fetchBalance();
      fetchTransactions();
    } catch (error) {
      console.error("Error submitting transaction:", error);
    }
  };

  return (
    <div>
      <h1>Simple Accounting System</h1>
      <div>
        <h2>Account Balance: ${balance}</h2>
        <form onSubmit={handleTransactionSubmit}>
          <label>
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
          <label>
            Type:
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="debit">Debit</option>
              <option value="credit">Credit</option>
            </select>
          </label>
          <label>
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <button type="submit">Submit Transaction</button>
        </form>
      </div>
      <div>
        <h2>Last 5 Transactions</h2>
        <ul>
          {transactions.map((transaction, index) => (
            <li key={index}>
              {transaction.date} - ${transaction.amount} ({transaction.type}) -{" "}
              {transaction.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
