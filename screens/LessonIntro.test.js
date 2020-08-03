import React from 'react';
import { render } from 'react-native-testing-library';
import storage from '../cache/storage';
import LessonIntro from './LessonIntro';

const createTestProps = () => ({
  navigation: {
    addListener: jest.fn(),
    navigate: jest.fn(),
    canGoBack: jest.fn(),
  },
  route: {
    params: {
      id: 1,
    },
  },
});

jest.mock('../cache/storage', () => ({
  useLesson: () => [{}],
  setVisitStatus: jest.fn(),
}));

it('should preview mode, do not set visit status', () => {
  const props = createTestProps();
  props.route.params.preview = true;
  render(<LessonIntro {...props} />);
  expect(storage.setVisitStatus).not.toBeCalled();
});
