const mongoose = require("mongoose");
const Business = require("../model/Business"); // your model path

test("Business model requires name", () => {
  const biz = new Business({}); 
  const error = biz.validateSync();
  expect(error.errors.name).toBeDefined();
});
