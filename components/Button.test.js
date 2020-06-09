import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import Button from './Button';

test('should called fn when button press', () => {
  const mockFn = jest.fn();

  const { getByText } = render(<Button title="Button" onPress={mockFn} />);
  fireEvent.press(getByText('Button'));

  expect(mockFn).toBeCalled();
});
