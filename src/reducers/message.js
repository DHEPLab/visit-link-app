export default function Message(
  state = {
    visible: false,
  },
  action,
) {
  switch (action.type) {
    case "OPEN_GLOBAL_SUBMIT_ERROR_MESSAGE":
      return {
        ...state,
        ...action.payload,
      };
    case "CLOSE_GLOBAL_SUBMIT_ERROR_MESSAGE":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
