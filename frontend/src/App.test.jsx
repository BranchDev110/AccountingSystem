// App.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import axios from "./api/api";
import App from "./App";

vi.mock("./api/api");

describe("App component", () => {
  beforeEach(() => {
    axios.get.mockReset();
    axios.post.mockReset();
  });

  it("renders the initial balance and transactions", async () => {
    axios.get.mockResolvedValueOnce({ data: { balance: 100 } });
    axios.get.mockResolvedValueOnce({
      data: [
        {
          date: "2023-01-01",
          amount: 50,
          type: "debit",
          description: "Groceries",
        },
        {
          date: "2023-01-02",
          amount: 150,
          type: "credit",
          description: "Salary",
        },
      ],
    });

    render(<App />);

    expect(screen.getByText("Simple Accounting System")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Account Balance: $100")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.getByText("2023-01-01 - $50 (debit) - Groceries")
      ).toBeInTheDocument();
      expect(
        screen.getByText("2023-01-02 - $150 (credit) - Salary")
      ).toBeInTheDocument();
    });
  });

  it("submits a transaction", async () => {
    axios.get.mockResolvedValueOnce({ data: { balance: 100 } });
    axios.get.mockResolvedValueOnce({ data: [] });
    axios.post.mockResolvedValueOnce({});

    render(<App />);

    fireEvent.change(screen.getByLabelText(/Amount/i), {
      target: { value: "100" },
    });
    fireEvent.change(screen.getByLabelText(/Type/i), {
      target: { value: "credit" },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "Test transaction" },
    });
    fireEvent.click(screen.getByText("Submit Transaction"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("/transaction", {
        amount: 100,
        type: "credit",
        description: "Test transaction",
        date: expect.any(String),
      });
    });
  });
});
