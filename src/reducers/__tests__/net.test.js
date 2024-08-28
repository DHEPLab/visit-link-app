import net from "./../net";

it("should switch net type to callular", () => {
  expect(
    net(undefined, {
      type: "NET_INFO",
      payload: {
        type: "callular",
        isInternetReachable: true,
      },
    }),
  ).toStrictEqual({
    type: "callular",
    isConnected: true,
  });
});

it("should switch net type to wifi", () => {
  expect(
    net(undefined, {
      type: "NET_INFO",
      payload: {
        type: "Wifi",
        isInternetReachable: true,
      },
    }),
  ).toStrictEqual({
    type: "Wifi",
    isConnected: true,
  });
});

it("should switch net type none, connected false", () => {
  expect(
    net(undefined, {
      type: "NET_INFO",
      payload: {
        type: "none",
        isInternetReachable: false,
      },
    }),
  ).toStrictEqual({
    type: "none",
    isConnected: false,
  });
});
