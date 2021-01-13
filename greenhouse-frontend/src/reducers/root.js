import { combineReducers } from "redux";
import errors from "./errors/errors";
import session from "./session/session";
import greenhouseReducer from './greenhouse/greenhouse';

export default combineReducers({
  session,
  errors,
  greenhouseReducer
});