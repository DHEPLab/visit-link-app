import Visit from "../visit";

test.skip(`should i can start the home visit from 8 o 'clock to 20 o 'clock on the day of the home visit`, () => {
  const visitTime = "2020-07-07T10:00:00";
  jest
    .spyOn(Date, "now")
    .mockImplementation(() => new Date("2020-07-07T07:59:00"));
  expect(Visit.canIStart("DONE", visitTime)).toBeFalsy();
  jest
    .spyOn(Date, "now")
    .mockImplementation(() => new Date("2020-07-07T20:00:00"));
  expect(Visit.canIStart("NOT_STARTED", visitTime)).toBeFalsy();
  jest
    .spyOn(Date, "now")
    .mockImplementation(() => new Date("2020-07-07T08:00:00"));
  expect(Visit.canIStart("NOT_STARTED", visitTime)).toBeTruthy();
  jest
    .spyOn(Date, "now")
    .mockImplementation(() => new Date("2020-07-07T19:59:59"));
  expect(Visit.canIStart("NOT_STARTED", visitTime)).toBeTruthy();
});

it("should format visit time cn", () => {
  expect(Visit.formatDateTimeCN("2020-07-12T11:11:00")).toBe(
    "2020年07月12日/上午11:11",
  );
});

it("should format visit date cn", () => {
  expect(Visit.formatDateCN(new Date("2020-07-12 11:11"))).toBe(
    "2020年07月12日",
  );
});

it("should format visit date", () => {
  expect(Visit.formatDate(new Date("2020-07-12 11:11"))).toBe("2020-07-12");
});

it("should format visit date time", () => {
  expect(Visit.formatDateTime(new Date("2020-07-12 11:11:11"))).toBe(
    "2020-07-12T11:11:11",
  );
});

it("should merge date and time", () => {
  expect(
    Visit.mergeDateAndTime(
      new Date("2020-07-12 11:11"),
      new Date("2020-07-12 18:00"),
    ),
  ).toBe("2020-07-12T18:00");
});

it("should default datetime is visit time", () => {
  expect(Visit.defaultDatetime([], "2020-07-12")).toBe("2020-07-12");
  expect(
    Visit.defaultDatetime(["2020-07-11", "2020-07-13"], "2020-07-12"),
  ).toBe("2020-07-12");
  expect(Visit.defaultDatetime(["2020-07-11"], "2020-07-12")).toBe(
    "2020-07-12",
  );
});

test.skip("should change the default visit time starting range to tomorrow", () => {
  jest
    .spyOn(Date, "now")
    .mockImplementation(() => new Date("2020-07-31T21:00:00"));
  expect(Visit.defaultStartingRange()).toBe("2020-08-01");
});

it("should default datetime is range0", () => {
  expect(
    Visit.defaultDatetime(["2020-07-28", "2020-08-13"], "2020-07-26"),
  ).toBe("2020-07-28T08:00");
});

it("should visit status done is truthy", () => {
  expect(Visit.statusDone("DONE")).toBeTruthy();
});

it("should visit status undone is truthy", () => {
  expect(Visit.statusUndone("UNDONE")).toBeTruthy();
});

it("should visit status not started is truthy", () => {
  expect(Visit.statusNotStart("NOT_STARTED")).toBeTruthy();
});

it("should return visit remark title", () => {
  expect(Visit.remarkTitle("NOT_STARTED")).toBe("Comments");
  expect(Visit.remarkTitle("EXPIRED")).toBe("Expired Reason");
  expect(Visit.remarkTitle("UNDONE")).toBe("Incomplete Reason");
});

it("should disable visit button when now is after select day", () => {
  expect(
    Visit.disabledVisitButton(new Date("2020-05-10"), "2020-05-09"),
  ).toBeTruthy();
});

it("should enable visit button when now is not after select day", () => {
  expect(
    Visit.disabledVisitButton(new Date("2020-05-10"), "2020-05-10"),
  ).toBeFalsy();
  expect(
    Visit.disabledVisitButton(new Date("2020-05-10"), "2020-05-11"),
  ).toBeFalsy();
});

test.skip("should disable visit button when now is after 21 o'clock", () => {
  expect(
    Visit.disabledVisitButton(new Date("2020-05-10T21:00:00"), "2020-05-10"),
  ).toBeTruthy();
});

it("should visit time conflict", () => {
  expect(
    Visit.visitTimeMayConflict("2020-11-11T10:00", "2020-11-11T11:00"),
  ).toBeTruthy();
  expect(
    Visit.visitTimeMayConflict("2020-11-11T11:00", "2020-11-11T10:00"),
  ).toBeTruthy();
});

it("should visit time not conflict", () => {
  expect(
    Visit.visitTimeMayConflict("2020-11-11T10:00", "2020-11-11T11:01"),
  ).toBeFalsy();
  expect(
    Visit.visitTimeMayConflict("2020-11-11T11:00", "2020-11-11T09:59"),
  ).toBeFalsy();
});
