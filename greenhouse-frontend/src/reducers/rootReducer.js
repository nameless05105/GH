import { combineReducers } from '../../../../../AppData/Local/Microsoft/TypeScript/3.5/node_modules/redux';
import  modalReducer  from './modalReducer';
import  groupReducer  from './groupReducer';
import  deviceReducer  from './deviceReducer';
import  socketReducer  from './socketReducer';

const rootReducer = combineReducers({
  groupReducer,
  deviceReducer,
  modalReducer,
  socketReducer
})

export default rootReducer;