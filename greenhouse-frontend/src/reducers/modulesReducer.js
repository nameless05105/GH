import { UPDATE_MODULES } from "../actions/modules";

const modulesReducer = (state = [], action) => {
    switch(action.type) {
        case UPDATE_MODULES: 
        return state = action.state;
        default: 
        return state;
      }
}

export default modulesReducer;