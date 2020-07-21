import React from 'react';
import { render } from 'react-native-testing-library';

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

  it('should render create visit button', () => {
    expect(wrapper.queryByText(/新建家访/)).not.toBeNull();
  });
});
