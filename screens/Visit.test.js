import React from 'react';
import { render } from 'react-native-testing-library';
import { useFetch } from '../utils';

import Visit from './Visit';

jest.mock('../utils', () => ({
  ...jest.requireActual('../utils'),
  useFetch: jest.fn(),
}));

const createTestProps = () => ({
  navigation: {
    addListener: jest.fn(),
    navigate: jest.fn(),
  },
  route: {
    params: {
      id: 1,
    },
  },
});

describe('<Visit />', () => {
  it('should display begin button', () => {
    useFetch.mockImplementation(() => [
      {
        status: 'NOT_STARTED',
      },
    ]);
    const { queryByText } = render(<Visit {...createTestProps()} />);
    expect(queryByText(/开始课堂/)).not.toBeNull();
  });

  it('should display continue button', () => {
    useFetch.mockImplementation(() => [
      {
        status: 'UNDONE',
      },
    ]);
    const { queryByText, queryAllByText } = render(<Visit {...createTestProps()} />);
    expect(queryAllByText(/未完成原因/).length).toBe(2);
    expect(queryByText(/继续课堂/)).not.toBeNull();
  });

  it('should display expire remark', () => {
    useFetch.mockImplementation(() => [
      {
        status: 'EXPIRED',
      },
    ]);
    const { queryAllByText } = render(<Visit {...createTestProps()} />);
    expect(queryAllByText(/过期原因/).length).toBe(2);
  });

  it('should readonly', () => {
    useFetch.mockImplementation(() => [
      {
        status: 'DONE',
      },
    ]);
    const { queryByText } = render(<Visit {...createTestProps()} />);
    expect(queryByText(/修改/)).toBeNull();
    expect(queryByText(/开始课堂/)).toBeNull();
  });
});
