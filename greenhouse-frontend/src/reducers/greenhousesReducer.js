// import { sensorsData } from '../state';

import { CREATE_GREENHOUSE, EDIT_GREENHOUSE, DELETE_GREENHOUSE, UPDATE_GREENHOUSES } from '../actions/greenhouse';
const sensorsData = []

/**
 * Group reducer
 * 
 * @param {object} state - contain initial state of group data 
 * @param {object} action - return the action object
 * @returns {} - new state (Create, edit and delete)
 */

const greenhousesReducer = (state = sensorsData, action) => {
    switch(action.type) {
        case CREATE_GREENHOUSE: 
        return state.concat([action.data])
        case DELETE_GREENHOUSE:
        return state.filter(greenhouse => greenhouse.id !== action.id)
        case EDIT_GREENHOUSE:
        return state.map(greenhouse => {
                    if (greenhouse.id === action.id) {
                        greenhouse.name = action.name;
                  }
                  return greenhouse;
              })

        case UPDATE_GREENHOUSES: 
        return state = action.state;
        default: 
        return state;
      }
}

export default greenhousesReducer;