import { combineReducers } from 'redux';
import user from './user';
import net from './net';

export default combineReducers({
  user,
  net,
});
