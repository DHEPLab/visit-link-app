import React from 'react';
import { render, waitFor } from 'react-native-testing-library';
import storage from '../cache/storage';
import Home from './Home';

jest.mock('../cache/storage', () => ({
  getNextVisit: jest.fn(),
}));

it('should no data', async () => {
  storage.getNextVisit.mockResolvedValue(() => ({}));
  const { queryByText } = render(<Home />);
  await waitFor(() => {
    expect(queryByText(/您尚未创建任何家访/)).not.toBeNull();
  });
});

it('should render next visit', async () => {
  storage.getNextVisit.mockResolvedValue(() => ({
    id: 1,
    visitTime: '2020-01-01T10:00',
    baby: {
      name: 'Baby Name',
    },
    lesson: {
      name: 'Lesson Name',
    },
  }));
  const { queryByText } = render(<Home />);
  await waitFor(() => {
    expect(queryByText(/2020年01月01日\/上午10:00/)).not.toBeNull();
    expect(queryByText(/Baby Name/)).not.toBeNull();
    expect(queryByText(/Lesson Name/)).not.toBeNull();
  });
});
