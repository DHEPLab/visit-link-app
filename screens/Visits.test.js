import React from 'react';
import moment from 'moment';
import { render, fireEvent } from 'react-native-testing-library';
import { Provider } from 'react-redux';
import rootReducer from '../reducers';

import Visits from './Visits';
import { createStore } from 'redux';

const store = createStore(rootReducer);
const createTestProps = () => ({
  navigation: {
    addListener: jest.fn(),
    navigate: jest.fn(),
  },
});

describe('<Visits />', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = createTestProps();
    wrapper = render(
      <Provider store={store}>
        <Visits {...props} />
      </Provider>);
  });

  it('should create visit use current selected date', () => {
    fireEvent.press(wrapper.getByText(/新建家访/));

    expect(props.navigation.navigate).toBeCalled();
  });
});
