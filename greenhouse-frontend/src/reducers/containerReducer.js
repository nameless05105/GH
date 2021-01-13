import { CREATE_CONTAINER, EDIT_CONTAINER, DELETE_CONTAINER, UPDATE_CONTAINERS} from '../actions/container';

/**
 * Container reducer
 * 
 * @param {object} state - contain initial state of group data 
 * @param {object} action - return the action object
 * @returns {} - new state (Create, edit and delete)
 */

const containerReducer = (state = [], action) => {
    switch(action.type) {
        case CREATE_CONTAINER: 
        return state.concat([action.data])
        case DELETE_CONTAINER:
        return state.filter(container => container.id !== action.id)
        case EDIT_CONTAINER:
        return state.map(data => {
                    if (data.id === action.data.id) {
                      data.title = action.data.title;
                  }
                  return data;
              })
        case UPDATE_CONTAINERS: 
        return state = action.state;     
        default: 
        return state;
      }
}

export default containerReducer;