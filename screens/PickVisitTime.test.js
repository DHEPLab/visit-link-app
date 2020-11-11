import React from 'react';
import { render, fireEvent, waitFor } from 'react-native-testing-library';
import PickVisitTime from './PickVisitTime';
import http from '../utils/http'

jest.mock('../utils', () => ({
  ...jest.requireActual('../utils'),
  useFetchArray: () => [[]],
}));

jest.mock('../utils/http', () => ({
  ...jest.requireActual('../utils/http'),
  get: jest.fn(),
}))

it('should set default visit time', () => {
  const { queryByText } = render(
    <PickVisitTime route={{ params: { visitTime: '2020-07-20T10:00', range: [] } }} />
  );
  expect(queryByText(/2020年07月20日/)).not.toBeNull();
  expect(queryByText(/上午10:00/)).not.toBeNull();
});

it('should navigate to from screen', async () => {
  const navigation = {
    navigate: jest.fn(),
  };
  http.get.mockResolvedValue([]);
  const { getByText } = render(
    <PickVisitTime
      navigation={navigation}
      route={{ params: { visitTime: '2020-07-20T10:00', from: 'Visit', range: [] } }}
    />
  );
  fireEvent.press(getByText(/提交/));
  await waitFor(() => {
    expect(navigation.navigate).toBeCalledWith('Visit', {
      visitTime: '2020-07-20T10:00',
    });
  })
});
