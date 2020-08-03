import React from 'react';
import { render } from 'react-native-testing-library';
import storage from '../cache/storage';

import LessonModules from './LessonModules';

jest.mock('../cache/storage', () => ({
  useLesson: jest.fn(),
  useNextModule: jest.fn(),
  setNextModule: jest.fn(),
}));

const createTestProps = () => ({
  navigation: {
    canGoBack: jest.fn(),
    addListener: jest.fn(),
    navigate: jest.fn(),
  },
  route: {
    params: {
      id: 1,
    },
  },
});

it('should render modules', async () => {
  storage.useLesson.mockImplementation(() => [
    {
      modules: [
        { id: 10, number: 'M2', name: 'M2' },
        { id: 11, number: 'M2', name: 'M2' },
        { id: 12, number: 'M2', name: 'M2' },
      ],
    },
  ]);
  storage.useNextModule.mockImplementation(() => [1]);
  const { queryAllByText } = render(<LessonModules {...createTestProps()} />);
  expect(queryAllByText(/已完成/).length).toBe(1);
  expect(queryAllByText(/待开始/).length).toBe(2);
});

it('should finish current module', async () => {
  storage.useLesson.mockImplementation(() => [
    {
      modules: [
        { id: 10, number: 'M2', name: 'M2' },
        { id: 11, number: 'M2', name: 'M2' },
        { id: 12, number: 'M2', name: 'M2' },
      ],
    },
  ]);
  const reloadNextModule = jest.fn();
  storage.useNextModule.mockImplementation(() => [1, reloadNextModule]);
  const props = createTestProps();
  const { rerender } = render(<LessonModules {...props} />);
  props.route.params.moduleId = 11;
  props.route.params.finished = true;
  rerender(<LessonModules {...props} />);
  expect(reloadNextModule).toBeCalled();
  expect(storage.setNextModule).toBeCalledWith(2);
});

it('should preview mode, do not set status', async () => {
  storage.useLesson.mockImplementation(() => [
    {
      modules: [
        { id: 10, number: 'M2', name: 'M2' },
        { id: 11, number: 'M2', name: 'M2' },
        { id: 12, number: 'M2', name: 'M2' },
      ],
    },
  ]);
  const reloadNextModule = jest.fn();
  storage.setNextModule = jest.fn();
  storage.useNextModule.mockImplementation(() => [1, reloadNextModule]);
  const props = createTestProps();
  const { rerender } = render(<LessonModules {...props} />);
  props.route.params.moduleId = 11;
  props.route.params.finished = true;
  props.route.params.preview = true;
  rerender(<LessonModules {...props} />);
  expect(reloadNextModule).not.toBeCalled();
  expect(storage.setNextModule).not.toBeCalled();
});
