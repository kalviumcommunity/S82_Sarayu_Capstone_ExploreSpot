const formatCity = (city) => city.trim().toLowerCase();

test("formats city name", () => {
  expect(formatCity("  Madurai ")).toBe("madurai");
});
