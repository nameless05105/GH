export const UPDATE_MODULE_DATA = 'UPDATE_MODULE_DATA';

export const updateSensor = (state)  => {
  return {
      type: UPDATE_MODULE_DATA,
      state
  };
};
