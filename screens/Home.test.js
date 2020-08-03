import React from 'react';
import { render, waitFor } from 'react-native-testing-library';
import storage from '../cache/storage';
import Home from './Home';

jest.mock('../cache/storage', () => ({
  useNextVisit: jest.fn(),
  useVisitStatus: jest.fn(),
}));

const createTestProps = () => ({
  navigation: {
    addListener: jest.fn(),
    navigate: jest.fn(),
  },
});

it('should no data', async () => {
  storage.useNextVisit.mockImplementation(() => [{}]);
  storage.useVisitStatus.mockImplementation(() => [{}]);
  const { queryByText } = render(<Home {...createTestProps()} />);
  await waitFor(() => {
    expect(queryByText(/您尚未创建任何家访/)).not.toBeNull();
  });
});

it('should render next visit', async () => {
  storage.useNextVisit.mockImplementation(() => [
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
  storage.useVisitStatus.mockImplementation(() => [{}]);
  const { queryByText } = render(<Home {...createTestProps()} />);
  await waitFor(() => {
    expect(queryByText(/2020年01月01日\/上午10:00/)).not.toBeNull();
    expect(queryByText(/Baby Name/)).not.toBeNull();
    expect(queryByText(/Lesson Name/)).not.toBeNull();
  });
});
