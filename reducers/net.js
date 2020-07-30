export default function Net(
  state = {
    type: 'none',
    isConnected: false,
  },
  action
) {
  switch (action.type) {
    case 'NET_INFO':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
