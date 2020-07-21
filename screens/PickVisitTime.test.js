import React from 'react';
import { render } from 'react-native-testing-library';
import PickVisitTime from './PickVisitTime';
jest.mock('../utils', () => ({
  ...jest.requireActual('../utils'),
  useFetchArray: () => [[]],
}));

it('should set default visit time', () => {
  const { queryByText } = render(
    <PickVisitTime route={{ params: { visitTime: '2020-07-20T11:00' } }} />
  );
  expect(queryByText(/2020年07月20日/)).not.toBeNull();
  expect(queryByText(/上午11:00/)).not.toBeNull();
});
