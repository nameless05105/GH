import { combineReducers } from "redux";
import errors from "./errors/errors";
import session from "./session/session";
import greenhouseReducer from './greenhouse/greenhouse';
import moduleReducer from './module/module';
import moduleForDateReducer from './module_for_date/module_for_date';
// import combinedModulesReducer from './combinedModules/combinedModules';

export default combineReducers({
  session,
  errors,
  greenhouseReducer,
  moduleReducer,
  moduleForDateReducer,
  // combinedModulesReducer
});