// import { devices } from '../state';

import { CREATE_DEVICE, EDIT_DEVICE, DELETE_DEVICE, UPDATE_DEVICE_DATA } from '../actions/device';

const devices = []
/**
 * Device reducer
 * 
 * @param {object} state - contain initial state of device data 
 * @param {object} action - return the action object
 * @returns {object} - new state (Create, edit and delete)
 */

const deviceReducer = (state = devices, action) => {
  switch(action.type) {
      case CREATE_DEVICE: 
      return state.concat([action.data])
      case DELETE_DEVICE:
      return state.filter(device => device.id !== action.id)
      case EDIT_DEVICE:
      return state.map(device => {
                if (device.id === action.id) {
                  device.name = action.name;
                  device.typeDevice = action.typeDevice;
                  device.type = action.type;
                  device.pin = action.pin;
                  device.databus = action.databus;
              }
              return device;
          })
      case UPDATE_DEVICE_DATA:
      return state = action.state;
      default: 
      return state;
    }
}

export default deviceReducer;