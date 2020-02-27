export const UPDATE_SENSOR_DATA = 'UPDATE_SENSOR_DATA';

export const updateSensor = (state)  => {
  return {
      type: UPDATE_SENSOR_DATA,
      state
  };
};
