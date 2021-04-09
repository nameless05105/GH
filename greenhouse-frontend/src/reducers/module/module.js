import { UPDATE_MODULE_DATA } from '../../actions/module';

const moduleReducer = (state=[], action) => {
    switch(action.type) {
        case UPDATE_MODULE_DATA: 
        return state = action.state;
        default: 
        return state;
      }
}

export default moduleReducer;