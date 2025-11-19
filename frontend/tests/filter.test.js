const filterSpots = (spots, search) =>
  spots.filter((s) =>
    (s.name + s.location).toLowerCase().includes(search.toLowerCase())
  );

test("filters spots by name/location", () => {
  const spots = [
    { name: "Goa Beach", location: "Goa" },
    { name: "Hills", location: "Ooty" },
  ];

  expect(filterSpots(spots, "goa").length).toBe(1);
});
