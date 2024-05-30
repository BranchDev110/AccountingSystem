# Simple Accounting System

## Overview

This project is a simple accounting system that provides functionality to process single transactions and retrieve account information. The system includes both a backend API built with Node.js and a frontend interface built with React using Vite.

The key features include:

- Processing transactions (credit and debit)
- Retrieving the current account balance
- Displaying the last 5 transactions
- Storing all transaction history in a JSON file

## Features

### Transactions

A transaction will include:

- Date/Time
- Amount (an unsigned floating-point value)
- Type (either 'debit' or 'credit')
- Description (string)

Transactions resulting in a negative account balance will be refused with an appropriate error message.

### Data Storage

All transaction history is stored in a JSON file, considering this to be a single-user system with only one account.

### HTTP API

The backend provides an HTTP interface for:

- Reading the current account balance (`GET /balance`)
- Reading the last 5 transactions (`GET /transactions`)
- Writing a single transaction (`POST /transaction`)

### Web UI

The frontend includes a simple form allowing users to:

- Input a single transaction
- Display account balance
- Display the last 5 transactions

## Installation and Running the Application

### Prerequisites

- Node.js (version 14 or above)
- npm (version 6 or above)

### Backend Setup

1. Navigate to the backend directory and install dependencies:

   ```sh
   cd backend
   npm install
   ```

2. Start the backend server:
   ```sh
   node server
   ```

The backend server will run on `http://localhost:3000`.

### Frontend Setup

1. Navigate to the frontend directory and install dependencies:

   ```sh
   cd frontend
   npm install
   ```

2. Start the frontend application using Vite:
   ```sh
   npm run dev
   ```

The frontend application will run on `http://localhost:5173`.

## Running Tests

### Backend Tests

1. Navigate to the backend directory:

   ```sh
   cd backend
   ```

2. Run the tests:
   ```sh
   npm test
   ```

### Frontend Tests

1. Navigate to the frontend directory:

   ```sh
   cd frontend
   ```

2. Run the tests:
   ```sh
   npm test
   ```

## Project Structure

### Backend

- `app.js`: Main application file defining API endpoints and middleware.
- `transactions.json`: JSON file used for storing transaction data.
- `tests`: Directory containing backend test files.

### Frontend

- `src/App.jsx`: Main React component.
- `src/api/api.js`: Axios configuration for API requests.
- `src/App.css`: CSS file for styling.
- `tests`: Directory containing frontend test files.

## API Endpoints

### `GET /balance`

- **Description:** Retrieves the current account balance.
- **Response:** `{ "balance": <current_balance> }`

### `GET /transactions`

- **Description:** Retrieves the last 5 transactions.
- **Response:** `[{ "date": <date>, "amount": <amount>, "type": <type>, "description": <description> }, ...]`

### `POST /transaction`

- **Description:** Submits a single transaction.
- **Request Body:**
  ```json
  {
    "amount": <amount>,
    "type": "credit" | "debit",
    "description": <description>,
    "date": <date>
  }
  ```
- **Response:** `200 OK` on success, `400 Bad Request` on validation error, or `500 Internal Server Error` on server error.

## Conclusion

This project demonstrates a simple accounting system with a focus on functionality, covering basic transaction processing and account information retrieval. The codebase includes unit tests for both backend and frontend to ensure reliability.

Feel free to contribute by forking the repository and submitting pull requests. For any issues or feature requests, please open an issue in the repository.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
