import { calenderMarkedDates } from "../index";

test("should return calendar marked dates", () => {
  const markedDates = ["2020-01-01", "2020-02-02"];
  expect(calenderMarkedDates(markedDates)).toStrictEqual({
    "2020-01-01": {
      marked: true,
    },
    "2020-02-02": {
      marked: true,
    },
  });
});
