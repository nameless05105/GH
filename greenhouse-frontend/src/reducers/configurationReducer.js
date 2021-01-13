import { CREATE_CONFIGURATION, EDIT_CONFIGURATION, DELETE_CONFIGURATION, UPDATE_CONFIGURATIONS} from '../actions/configuration';

/**
 * Configuration reducer
 * 
 * @param {object} state - contain initial state of group data 
 * @param {object} action - return the action object
 * @returns {} - new state (Create, edit and delete)
 */

const configurationReducer = (state = [], action) => {
    switch(action.type) {
        case CREATE_CONFIGURATION: 
        return state.concat([action.data])
        case DELETE_CONFIGURATION:
        return state.filter(group => group.id !== action.id)
        case EDIT_CONFIGURATION:
        return state.map(data => {
                    if (data.id === action.id) {
                      data.title = action.title;
                      data.devices = action.devices;
                  }
                  return data;
              })
        case UPDATE_CONFIGURATIONS: 
        return state = action.state;     
        default: 
        return state;
      }
}

export default configurationReducer;