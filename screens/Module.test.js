import React from 'react';
import { render } from 'react-native-testing-library';
import storage from '../cache/storage';
import Module from './Module';

jest.mock('../cache/storage', () => ({
  useModule: jest.fn(),
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

it('should render switch component', () => {
  storage.useModule.mockImplementation(() => [
    {
      components: [
        {
          type: 'Switch',
          key: 1596003046087,
          value: {
            cases: [
              {
                key: 1596003046087,
                text: '是',
                components: [],
                finishAction: ['Redirect_End', 11],
              },
              {
                key: 1596003046088,
                text: '否',
                components: [],
                finishAction: ['Redirect_End', 11],
              },
            ],
            question: {
              html: '<p>你现在在喂母乳吗？</p>',
              type: 'script',
            },
          },
        },
      ],
    },
  ]);
  const { queryByText } = render(<Module {...createTestProps()} />);
  expect(queryByText(/是/)).not.toBeNull();
  expect(queryByText(/否/)).not.toBeNull();
  expect(queryByText(/上一步/)).not.toBeNull();
});
