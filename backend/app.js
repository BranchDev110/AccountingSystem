const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs").promises;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const TRANSACTIONS_FILE = "./transactions.json";

// Middleware to handle errors
const errorHandler = (err, req, res, next) => {
  console.error("Error occurred:", err.stack);
  res.status(500).send("Internal Server Error");
};

// Middleware to handle not found routes
const notFoundHandler = (req, res, next) => {
  res.status(404).send("Not Found");
};

// Read current account balance
app.get("/balance", async (req, res, next) => {
  try {
    const transactions = await readTransactions();
    const balance = calculateBalance(transactions);
    res.json({ balance });
  } catch (error) {
    next(error);
  }
});

// Read last 5 transactions
app.get("/transactions", async (req, res, next) => {
  try {
    const transactions = await readTransactions();
    const lastTransactions = transactions.slice(-5);
    res.json(lastTransactions);
  } catch (error) {
    next(error);
  }
});

// Write a single transaction
app.post("/transaction", async (req, res, next) => {
  try {
    const transaction = req.body;
    console.log(transaction);
    if (
      !transaction ||
      typeof transaction.amount !== "number" ||
      !["credit", "debit"].includes(transaction.type)
    ) {
      return res.status(400).send("Invalid transaction data");
    }

    const transactions = await readTransactions();
    const balance = calculateBalance(transactions);
    if (transaction.type === "debit" && balance - transaction.amount < 0) {
      return res.status(400).send("Insufficient funds for debit transaction");
    }

    transactions.push(transaction);
    await writeTransactions(transactions);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

// Helper function to read transactions from file
async function readTransactions() {
  try {
    const data = await fs.readFile(TRANSACTIONS_FILE);
    return JSON.parse(data);
  } catch (err) {
    console.error("Failed to read transactions file:", err);
    throw new Error("Failed to read from the transactions file");
  }
}

// Helper function to write transactions to file
async function writeTransactions(transactions) {
  try {
    await fs.writeFile(
      TRANSACTIONS_FILE,
      JSON.stringify(transactions, null, 2)
    );
  } catch (err) {
    console.error("Failed to write to transactions file:", err);
    throw new Error("Failed to write to the transactions file");
  }
}

// Helper function to calculate account balance
function calculateBalance(transactions) {
  return transactions.reduce((balance, transaction) => {
    return transaction.type === "credit"
      ? balance + transaction.amount
      : balance - transaction.amount;
  }, 0);
}

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
