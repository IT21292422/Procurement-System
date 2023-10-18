import * as React from "react";
import { render, waitFor, getByText } from "@testing-library/react-native";
import ItemAdd, { addItem } from "./test";
import Loading from "./Loading";

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

jest.mock("react-native-paper", () => ({
  ActivityIndicator: "MockedActivityIndicator",
  MD2Colors: {
    red800: "red",
  },
}));
jest.mock("react-native", () => ({
  View: "MockedView",
  StyleSheet: {
    create: jest.fn(),
  },
  Dimensions: {
    get: jest.fn(() => ({
      width: 100, // Adjust width as needed for testing
      height: 200, // Adjust height as needed for testing
    })),
  },
}));

describe("Loading Component", () => {
  it("should render a loading spinner", () => {
    const { container } = render(<Loading />);

    // Replace 'MockedActivityIndicator' with the actual name of your ActivityIndicator component
    expect(container.getByText("MockedActivityIndicator")).toBeTruthy();
  });
});
