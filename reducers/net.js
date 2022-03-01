export default function Net(
  state = {
    type: 'none',
    isConnected: false,
  },
  action
) {
  switch (action.type) {
    case 'NET_INFO':
      const {isInternetReachable} = action.payload
      return {
        ...state,
        isConnected: isInternetReachable
      };
    default:
      return state;
  }
}
