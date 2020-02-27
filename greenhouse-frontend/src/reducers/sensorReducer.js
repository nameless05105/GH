import { UPDATE_SENSOR_DATA } from '../actions/sensor';
/**
 * Socket reducer 
 */
const sensorReducer = (state=[], action) => {
    switch(action.type) {
        case UPDATE_SENSOR_DATA: 
        console.log(action.state)
        return state = action.state;
        default: 
        return state;
      }
}

export default sensorReducer;