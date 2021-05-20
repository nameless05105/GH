import { UPDATE_COMBINED_MODULE_DATA } from '../../actions/combinedModules';

const combinedModulesReducer = (state=[], action) => {
    switch(action.type) {
        case UPDATE_COMBINED_MODULE_DATA: 
        return state = action.state;
        default: 
        return state;
      }
}

export default combinedModulesReducer;