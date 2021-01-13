export const CREATE_CONFIGURATION = 'CREATE_CONFIGURATION';
export const DELETE_CONFIGURATION = 'DELETE_CONFIGURATION';
export const EDIT_CONFIGURATION = 'EDIT_CONFIGURATION';
export const UPDATE_CONFIGURATIONS = 'UPDATE_CONFIGURATIONS';

export const createConfiguration = (data)  => {
    return {
        type: CREATE_CONFIGURATION,
        data
    };
  };

export const deleteConfiguration = (id) => {
    return {
        type: DELETE_CONFIGURATION,
        id
    }
}
export const editConfiguration = (data)  => {
  return {
      type: EDIT_CONFIGURATION,
      data
  };
};

export const updateConfiguration = (state)  => {
    return {
        type: UPDATE_CONFIGURATIONS,
        state
    };
};
