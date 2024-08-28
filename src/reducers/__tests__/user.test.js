import user from "./../user";

it("should restore token", () => {
  expect(
    user(undefined, {
      type: "RESTORE_TOKEN",
      token: 123,
    }),
  ).toStrictEqual({
    userToken: 123,
  });
});

it("should clean token", () => {
  expect(
    user(undefined, {
      type: "SIGN_OUT",
    }),
  ).toStrictEqual({
    userToken: null,
  });
});
