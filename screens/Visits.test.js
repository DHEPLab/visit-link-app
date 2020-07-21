import React from 'react';
import moment from 'moment';
import { render, fireEvent } from 'react-native-testing-library';

import Visits from './Visits';

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
    wrapper = render(<Visits {...props} />);
  });

  it('should create visit use current selected date', () => {
    fireEvent.press(wrapper.getByText(/新建家访/));

    expect(props.navigation.navigate).toBeCalledWith('CreateVisit', {
      visitTime: `${moment().format('YYYY-MM-DD')}T10:00`,
    });
  });
});
