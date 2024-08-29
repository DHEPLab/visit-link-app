import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Provider } from "react-redux";
import rootReducer from "../../reducers";

import Visits from "../Visits";
import { createStore } from "redux";

const store = createStore(rootReducer, {
  net: {
    type: "cellular",
    isConnected: true,
  },
});
const createTestProps = () => ({
  navigation: {
    addListener: jest.fn(),
    navigate: jest.fn(),
  },
});

describe("<Visits />", () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = createTestProps();
    wrapper = render(
      <Provider store={store}>
        <Visits {...props} />
      </Provider>,
    );
  });

  it("should create visit use current selected date", () => {
    fireEvent.press(wrapper.getByText(/Visits:scheduleVisit/));

    expect(props.navigation.navigate).toBeCalled();
  });
});
