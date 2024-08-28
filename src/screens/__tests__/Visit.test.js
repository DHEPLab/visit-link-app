import React from "react";
import { render } from "@testing-library/react-native";
import { useFetch, useManualFetch } from "@/utils";
import http from "../../utils/http";

import Visit from "../Visit";

jest.mock("@/utils/http", () => ({
  ...jest.requireActual("@/utils/http"),
  put: jest.fn(),
}));

jest.mock("@/utils", () => ({
  ...jest.requireActual("@/utils"),
  useFetch: jest.fn(),
  useManualFetch: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: () => ({
    state: {
      lessonsUpdate: {
        isAvailable: false,
      },
    },
  }),
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

describe("<Visit />", () => {
  it.skip("should display begin button", () => {
    jest.spyOn(Date, "now").mockImplementation(() => new Date("2020-07-07"));
    useFetch.mockImplementation(() => [
      {
        status: "NOT_STARTED",
        visitTime: "2020-07-07T10:00",
      },
    ]);
    const { queryByText } = render(<Visit {...createTestProps()} />);
    expect(queryByText(/开始课堂/)).not.toBeNull();
  });

  it("should display continue button", () => {
    useManualFetch.mockImplementation(() => [
      {
        id: 1,
        status: "UNDONE",
      },
    ]);
    const { queryByText, queryAllByText } = render(
      <Visit {...createTestProps()} />,
    );
    expect(queryAllByText(/未完成原因/).length).toBe(1);
    expect(queryByText(/继续课堂/)).not.toBeNull();
  });

  it("should display expire remark", () => {
    useManualFetch.mockImplementation(() => [
      {
        status: "EXPIRED",
      },
    ]);
    const { queryAllByText } = render(<Visit {...createTestProps()} />);
    expect(queryAllByText(/过期原因/).length).toBe(1);
  });

  it("should readonly", () => {
    useManualFetch.mockImplementation(() => [
      {
        status: "DONE",
      },
    ]);
    const { queryByText } = render(<Visit {...createTestProps()} />);
    expect(queryByText(/修改/)).toBeNull();
    expect(queryByText("开始课堂")).toBeNull();
  });

  it("should change visit time", () => {
    http.put.mockImplementation(() => ({ then: jest.fn() }));
    const props = createTestProps();
    const { rerender } = render(<Visit {...createTestProps()} />);
    props.route.params.visitTime = "2020-01-01T12:00";
    rerender(<Visit {...props} />);
    expect(http.put).toBeCalledWith(`/api/visits/1`, {
      visitTime: "2020-01-01T12:00",
    });
  });
});
