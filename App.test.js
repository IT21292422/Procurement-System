import * as React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ItemAdd, { addItem } from "./src/screens/ProcurementStaff/ItemAdd";
import App from "./App";

// describe('<App />', () => {
//   it('has 1 child', () => {
//     const tree = renderer.create(<App />).toJSON();
//     if (tree) {
//       expect(tree.children?.length).toBe(1);
//     } else {
//       throw new Error('Tree is null');
//     }
//   });
// });

test("addItem function works correctly", () => {
  // Call the addItem function with an input value
  const result = addItem(5);

  // Assert the result of addItem function
  expect(result).toBe(50); // Change this to the expected result
});

test("ItemAdd component renders correctly", () => {
  const { getByText } = render(<ItemAdd />);
  const itemAddText = getByText("Text");
  expect(itemAddText).toBeDefined();
});
