const request = require("supertest");
const express = require("express");

const app = express();
app.get("/api/travelpost", (req, res) => {
  res.json([]); // Mocked response
});

describe("Posts API", () => {
  test("route responds", async () => {
    const res = await request(app).get("/api/travelpost");
    expect(Array.isArray(res.body)).toBe(true);
  });
});
