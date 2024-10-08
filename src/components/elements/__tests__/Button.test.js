import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Button from "./../Button";

it("should called fn when button press", () => {
  const mockFn = jest.fn();

  const { getByText } = render(<Button title="Button" onPress={mockFn} />);
  fireEvent.press(getByText("Button"));

  expect(mockFn).toBeCalled();
});
