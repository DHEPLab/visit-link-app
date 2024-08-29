import { createStore } from "redux";
import rootReducer from "./reducers";

/**
 * This is the temporary solution to used by TS
 *
 * @typedef {Object} LessonsUpdateState
 * @property {boolean} isAvailable - Indicates whether the lessons update is available.
 * @property {string} firstTime - Indicates the first time the lessons update is available.
 */

/**
 * @typedef {Object} RootState
 * @property {LessonsUpdateState} lessonsUpdate - The state related to lessons update.
 */

/** @type {RootState} */
export const RootState = {
  lessonsUpdate: {
    isAvailable: false,
  },
};

export default createStore(
  rootReducer,
  // Debugging Redux
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
