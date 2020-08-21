import React from 'react';
import { render } from 'react-native-testing-library';
import storage from '../cache/storage';
import Module, { useMethods } from './Module';

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
      pageComponents: [
        [
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
      ],
    },
    jest.fn(),
  ]);
  const { queryByText } = render(<Module {...createTestProps()} />);
  expect(queryByText(/是/)).not.toBeNull();
  expect(queryByText(/否/)).not.toBeNull();
});

it('should after completing the switch case, continue at the level', () => {
  const setCaseComponents = jest.fn();
  const { onCase } = useMethods({
    setCaseComponents,
  });
  onCase({
    components: [1],
  });
  expect(setCaseComponents).toBeCalledWith([1]);
});

it('should after completing the switch case, jump to another module and end this content module', () => {
  const navigation = {
    navigate: jest.fn(),
  };
  const { onCase } = useMethods({
    navigation,
    params: { id: 1 },
  });
  onCase({
    finishAction: ['Redirect_End', 2],
  });
  expect(navigation.navigate).toBeCalledWith('Module', { id: 2, from: 1 });
});

it('should after completing the switch case, jump to another module and continue this content module', () => {
  const navigation = {
    navigate: jest.fn(),
  };
  const { onCase } = useMethods({
    navigation,
    params: { id: 1 },
    page: 1,
  });
  onCase({
    finishAction: ['Redirect_Continue', 2],
  });
  expect(navigation.navigate).toBeCalledWith('Module', {
    id: 2,
    from: 1,
    fromPage: 2,
    finishAction: 'Redirect_Continue',
  });
});
