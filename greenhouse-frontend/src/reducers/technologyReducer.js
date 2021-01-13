// import { sensorsData } from '../state';

import { CREATE_TECHNOLOGY, EDIT_TECHNOLOGY, DELETE_TECHNOLOGY, UPDATE_TECHNOLOGY } from '../actions/technology';
const sensorsData = []

/**
 * Group reducer
 * 
 * @param {object} state - contain initial state of group data 
 * @param {object} action - return the action object
 * @returns {} - new state (Create, edit and delete)
 */

const technologyReducer = (state = sensorsData, action) => {
    switch(action.type) {
        case CREATE_TECHNOLOGY: 
        return state.concat([action.data])
        case DELETE_TECHNOLOGY:
        return state.filter(group => group.id !== action.id)
        case EDIT_TECHNOLOGY:
        return state.map(group => {
                    if (group.id === action.id) {
                      group.title = action.title;
                      group.devices = action.devices;
                  }
                  return group;
              })
        case UPDATE_TECHNOLOGY: 
        return state = action.state;
        default: 
        return state;
      }
}

export default technologyReducer;