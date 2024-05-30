const request = require("supertest");
const app = require("./app"); // Ensure this is the path to your exported app

describe("API Tests", () => {
  test("GET /balance should display current balance", async () => {
    const response = await request(app).get("/balance");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("balance");
  });

  test("POST /transaction should successfully create a transaction", async () => {
    const newTransaction = {
      amount: 100,
      type: "credit",
      description: "Initial deposit",
      date: new Date().toISOString(),
    };
    const response = await request(app)
      .post("/transaction")
      .send(newTransaction);
    expect(response.statusCode).toBe(200);
  });

  test("GET /transactions should return last 5 transactions", async () => {
    const response = await request(app).get("/transactions");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeLessThanOrEqual(5);
  });
});
