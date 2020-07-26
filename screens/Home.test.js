import React from 'react';
import { render } from 'react-native-testing-library';
import { useFetch } from '../utils';
import Home from './Home';

jest.mock('../utils', () => ({
  ...jest.requireActual('../utils'),
  useFetch: jest.fn(),
}));

it('should no data', () => {
  useFetch.mockImplementation(() => [{}]);
  const { queryByText } = render(<Home />);
  expect(queryByText(/暂无家访安排/)).not.toBeNull();
});

it('should render next visit', () => {
  useFetch.mockImplementation(() => [
    {
      id: 1,
      visitTime: '2020-01-01T10:00',
      baby: {
        name: 'Baby Name',
      },
      lesson: {
        name: 'Lesson Name',
      },
    },
  ]);
  const { queryByText } = render(<Home />);
  expect(queryByText(/2020年01月01日\/上午10:00/)).not.toBeNull();
  expect(queryByText(/Baby Name/)).not.toBeNull();
  expect(queryByText(/Lesson Name/)).not.toBeNull();
});
