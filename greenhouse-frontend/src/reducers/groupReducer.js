// import { sensorsData } from '../state';

import { CREATE_GROUP, EDIT_GROUP, DELETE_GROUP, ADD_NEW_DEVICE_TO_GROUP, UPDATE_GROUP_DATA, EDIT_STATUS, EDIT_GROUP_DAILY_DATA, CREATE_GROUP_DAILY_DATA } from '../actions/group';
const sensorsData = []

/**
 * Group reducer
 * 
 * @param {object} state - contain initial state of group data 
 * @param {object} action - return the action object
 * @returns {} - new state (Create, edit and delete)
 */

const groupReducer = (state = sensorsData, action) => {
    switch(action.type) {
        case CREATE_GROUP: 
        return state.concat([action.data])
        case DELETE_GROUP:
        return state.filter(group => group.id !== action.id)
        case EDIT_GROUP:
        return state.map(group => {
                    if (group.id === action.id) {
                      group.title = action.title;
                      group.devices = action.devices;
                  }
                  return group;
              })
        case EDIT_GROUP_DAILY_DATA:
        return state.map(group => {
                    if (group.id === action.id) {
                      console.log(action);
                      console.log(group);
                      group.ph = action.ph;
                      group.ppm = action.ppm;
                      group.date = action.date;
                      group.time = action.time;
                  }
                  return group;
              })
        case EDIT_STATUS:
        return state.map(group => {
                    console.log(group.status)
                    console.log(action)
                    if (group.id === action.id) {
                      console.log(group.status)
                      group.status = !group.status;
                      console.log(group.status)
                  }
                  return group;
              })
        case ADD_NEW_DEVICE_TO_GROUP:
        return state.map(group => {
                    console.log(action.groupId);
                    console.log(action.deviceId)
                    console.log(group.id)
                    if (group.id === action.groupId) {
                      group.devices.push(action.deviceId) 
                  }
                  return group;
              })  
        case UPDATE_GROUP_DATA: 
        return state = action.state;
        default: 
        return state;
      }
}

export default groupReducer;