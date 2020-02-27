import { combineReducers } from "redux";
import errors from "./errors/errors";
import session from "./session/session";
import groupReducer from './groupReducer';
import deviceReducer from './deviceReducer';
import modalReducer from './modalReducer';
import socketReducer from './socketReducer';
import growingProgramReducer from './growingProgramReducer';
import chartReducer from './chartReducer';
import sensorReducer from './sensorReducer';

export default combineReducers({
  session,
  errors,
  groupReducer,
  deviceReducer,
  modalReducer,
  socketReducer,
  growingProgramReducer,
  chartReducer,
  sensorReducer
});