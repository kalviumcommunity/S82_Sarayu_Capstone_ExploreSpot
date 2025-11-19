import React from "react";
import { render, screen } from "@testing-library/react";

function Btn() {
  return <button>Click Me</button>;
}

test("button renders correctly", () => {
  render(<Btn />);
  expect(screen.getByText("Click Me")).toBeInTheDocument();
});
