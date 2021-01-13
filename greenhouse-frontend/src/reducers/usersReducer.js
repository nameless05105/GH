// import { sensorsData } from '../state';

import { UPDATE_USERS } from '../actions/users';
const sensorsData = []

/**
 * Group reducer
 * 
 * @param {object} state - contain initial state of group data 
 * @param {object} action - return the action object
 * @returns {} - new state (Create, edit and delete)
 */

const usersReducer = (state = sensorsData, action) => {
    switch(action.type) {
        case UPDATE_USERS: 
        return state = action.state;
        default: 
        return state;
      }
}

export default usersReducer;