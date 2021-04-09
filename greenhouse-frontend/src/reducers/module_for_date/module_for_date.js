import { UPDATE_MODULES_FOR_DATE } from '../../actions/module_for_date';

const moduleForDateReducer = (state=[], action) => {
    switch(action.type) {
        case UPDATE_MODULES_FOR_DATE: 
        return state = action.state;
        default: 
        return state;
      }
}

export default moduleForDateReducer;