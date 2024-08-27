export default function Net(
  state = {
    type: "none",
    isConnected: false,
  },
  action,
) {
  switch (action.type) {
    case "NET_INFO":
      const { isInternetReachable, type } = action.payload;
      return {
        type: type,
        isConnected: isInternetReachable,
      };
    default:
      return state;
  }
}
