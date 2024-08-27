import { combineReducers } from "redux";

import user from "./user";
import net from "./net";
import message from "./message";
import lessonsUpdate from "./lessons_update";
import modal from "./modal";

export default combineReducers({
  user,
  net,
  message,
  lessonsUpdate,
  modal,
});
