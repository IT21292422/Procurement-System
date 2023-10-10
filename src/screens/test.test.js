import * as React from "react";
import { render, waitFor, getByText } from "@testing-library/react-native";
import ItemAdd, { addItem } from "./test";

test("addItem function works correctly", () => {
  // Call the addItem function with an input value
  const result = addItem(5);
  // Assert the result of addItem function
  expect(result).toBe(50); // Change this to the expected result
});

describe("ItemAdd Component", () => {
  it("renders the component", () => {
    const { getByText } = render(<ItemAdd />);
    const textElement = getByText("Text"); // Replace with actual text/content
    expect(textElement).toBeTruthy();
  });
});
