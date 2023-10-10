import React from "react";
import renderer from "react-test-renderer";
import App from "./App";

// this test will check whether there is only one chile in App.tsx otherwise it fails
/*
 *eg:- <App/> == <View><Text>hello</Text></View>
 */
describe("<App />", () => {
  it("has 1 child", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(1);
  });

  it("renders correctly", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
