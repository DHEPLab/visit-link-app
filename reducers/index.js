import { combineReducers } from 'redux';

import user from './user';
import net from './net';
import message from './message';
import lessonsUpdate from './lessons_update';

export default combineReducers({
  user,
  net,
  message,
  lessonsUpdate,
});
