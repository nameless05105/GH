import { SELECT_GREENHOUSE, UPDATE_GREENHOUSE  } from '../actions/greenhouse';


/**
 * Group reducer
 * 
 * @param {object} state - contain initial state of group data 
 * @param {object} action - return the action object
 * @returns {} - new state (Create, edit and delete)
 */

const greenhouseReducer = (state = {id: ''}, action) => {
    switch(action.type) {
        case SELECT_GREENHOUSE: 
            return  state = action.state;
        case UPDATE_GREENHOUSE: 
            console.log(action);
            return state = action.state;
        default: 
        return state;
      }
}

export default greenhouseReducer;