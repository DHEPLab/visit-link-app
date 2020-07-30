import { combineReducers } from 'redux';
import net from './net';

const user = (
  state = {
    isLoading: true,
    isSignout: false,
    // set default value to fix flash on refreshing
    userToken: 'default token',
  },
  action
) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...state,
        isSignout: false,
        userToken: action.token,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isSignout: true,
        userToken: null,
      };
    default:
      return state;
  }
};

export default combineReducers({
  user,
  net,
});
