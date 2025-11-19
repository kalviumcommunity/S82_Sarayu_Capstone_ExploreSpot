const request = require("supertest");
const app = require("../server"); // adjust path if different

describe("Authentication API", () => {
  test("fails login without credentials", async () => {
const res = await request(app).post("/api/login").send({});
    expect(res.statusCode).toBe(400);
  });
});
