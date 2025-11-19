const buildPrompt = require("../utils/buildPrompt"); // util we create

describe("AI Trip Planner Prompt Builder", () => {
  test("includes destination and days", () => {
    const result = buildPrompt({ destination: "Goa", days: 3 });

    expect(result).toMatch(/Goa/);
    expect(result).toMatch(/3/);
  });
});
