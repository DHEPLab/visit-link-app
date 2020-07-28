import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import PickVisitTime from './PickVisitTime';
jest.mock('../utils', () => ({
  ...jest.requireActual('../utils'),
  useFetchArray: () => [[]],
}));

it('should set default visit time', () => {
  const { queryByText } = render(
    <PickVisitTime route={{ params: { visitTime: '2020-07-20T10:00' } }} />
  );
  expect(queryByText(/2020年07月20日/)).not.toBeNull();
  expect(queryByText(/上午10:00/)).not.toBeNull();
});

it('should navigate to from screen', () => {
  const navigation = {
    navigate: jest.fn(),
  };
  const { getByText } = render(
    <PickVisitTime
      navigation={navigation}
      route={{ params: { visitTime: '2020-07-20T10:00', from: 'Visit' } }}
    />
  );
  fireEvent.press(getByText(/提交/));
  expect(navigation.navigate).toBeCalledWith('Visit', {
    visitTime: '2020-07-20T10:00',
  });
});
