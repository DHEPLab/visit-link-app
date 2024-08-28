import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import storage from "../../cache/storage";
import Home from "../Home";

jest.mock("../../cache/storage", () => ({
  useNextVisit: jest.fn(),
  useVisitStatus: jest.fn(),
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

jest.mock("../../utils/http", () => ({
  ...jest.requireActual("../../utils/http"),
  get: jest.fn(() =>
    Promise.resolve([
      {
        id: 1,
        visitTime: "2020-01-01T10:00",
        baby: {
          name: "Baby Name",
        },
        lesson: {
          name: "Lesson Name",
        },
      },
    ]),
  ),
}));

const createTestProps = () => ({
  navigation: {
    addListener: jest.fn(),
    navigate: jest.fn(),
  },
});

it("should no data", async () => {
  storage.useNextVisit.mockImplementation(() => [{}]);
  storage.useVisitStatus.mockImplementation(() => [{}]);
  const { queryByText } = render(<Home {...createTestProps()} />);
  await waitFor(() => {
    expect(queryByText(/您没有家访安排/)).not.toBeNull();
  });
});

it("should render next visit", async () => {
  storage.useNextVisit.mockImplementation(() => [
    {
      id: 1,
      visitTime: "2020-01-01T10:00",
      baby: {
        name: "Baby Name",
      },
      lesson: {
        name: "Lesson Name",
      },
    },
  ]);
  storage.useVisitStatus.mockImplementation(() => [{}]);
  const { queryByText } = render(<Home {...createTestProps()} />);
  await waitFor(() => {
    expect(
      queryByText("您的下一次家访：\n2020年01月01日/上午10:00"),
    ).not.toBeNull();
    expect(queryByText(/Baby Name/)).not.toBeNull();
    expect(queryByText(/Lesson Name/)).not.toBeNull();
  });
});
