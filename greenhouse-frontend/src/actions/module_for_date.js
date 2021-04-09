export const UPDATE_MODULES_FOR_DATE = 'UPDATE_MODULES_FOR_DATE';

export const updateModule = (state)  => {
  return {
      type: UPDATE_MODULES_FOR_DATE,
      state
  };
};
