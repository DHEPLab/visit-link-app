import * as React from 'react';
import { act, create } from 'react-test-renderer';

import App from '../App';

jest.mock('expo', () => ({
  Linking: {
    makeUrl: () => '/',
  },
  SplashScreen: {
    preventAutoHide: () => 'preventAutoHide',
    hide: () => 'hide',
  },
}));

jest.mock('../navigation/BottomTabNavigator', () => 'BottomTabNavigator');

describe('App', () => {
  jest.useFakeTimers();
  it(`renders correctly`, async () => {
    await act(async () => {
      tree = await create(<App />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
