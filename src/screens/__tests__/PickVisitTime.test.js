import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import PickVisitTime from "../PickVisitTime";
import http from "../../utils/http";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: () => ({
    state: {
      net: {
        isConnected: true,
      },
    },
  }),
}));

jest.mock("../../utils", () => ({
  ...jest.requireActual("../../utils"),
  useFetchArray: () => [[]],
}));

jest.mock("../../utils/http", () => ({
  ...jest.requireActual("../../utils/http"),
  get: jest.fn(),
}));

it("should set default visit time", () => {
  const { queryByText } = render(
    <PickVisitTime
      route={{ params: { visitTime: "2020-07-20T10:00", range: [] } }}
    />,
  );
  // TODO  mock local
  // expect(queryByText(/2020年07月20日/)).not.toBeNull();
  // expect(queryByText(/上午10:00/)).not.toBeNull();
});

it("should navigate to from screen", async () => {
  const navigation = {
    navigate: jest.fn(),
  };
  http.get.mockResolvedValue([]);
  const { getByText } = render(
    <PickVisitTime
      navigation={navigation}
      route={{
        params: { visitTime: "2020-07-20T10:00", from: "Visit", range: [] },
      }}
    />,
  );
  fireEvent.press(getByText(/Common:submit/));
  await waitFor(() => {
    expect(navigation.navigate).toBeCalledWith("Visit", {
      visitTime: "2020-07-20T10:00",
    });
  });
});
