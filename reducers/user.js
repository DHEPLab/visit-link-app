export default function user(
  state = {
    // set default value to fix flash on refreshing
    userToken: 'default token',
  },
  action
) {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        userToken: action.token,
      };
    case 'SIGN_IN':
      return {
        ...state,
        userToken: action.token,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        userToken: null,
      };
    default:
      return state;
  }
}
