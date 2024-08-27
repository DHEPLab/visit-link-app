import React from "react";
import { render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import rootReducer from "../reducers";
import SignIn from "./SignIn";
import { createStore } from "redux";

const store = createStore(rootReducer);
test("should render sign in screen", () => {
  const screen = (
    <Provider store={store}>
      <SignIn />
    </Provider>
  );
  render(screen);
});
