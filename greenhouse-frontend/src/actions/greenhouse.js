export const CREATE_GREENHOUSE = 'CREATE_GREENHOUSE';
export const DELETE_GREENHOUSE = 'DELETE_GREENHOUSE';
export const EDIT_GREENHOUSE = 'EDIT_GREENHOUSE';
export const UPDATE_GREENHOUSES = 'UPDATE_GREENHOUSES';
export const SELECT_GREENHOUSE = 'SELECT_GREENHOUSE';
export const UPDATE_GREENHOUSE = 'UPDATE_GREENHOUSE';

export const createGreenhouse = (data)  => {
    return {
        type: CREATE_GREENHOUSE,
        data
    };
  };

export const deleteGreenhouse = (id) => {
    return {
        type: DELETE_GREENHOUSE,
        id
    }
}
export const editGreenhouse = (data)  => {
  const  {id, name} = data
  return {
      type: EDIT_GREENHOUSE,
      id, name
  };
};

export const updateGreenhouses = (state)  => {
    return {
        type: UPDATE_GREENHOUSES,
        state
    };
  };
  

export const selectGreenhouse = (state)  => {
    return {
        type: SELECT_GREENHOUSE,
        state
    };
};
  
export const updateGreenhouse = (state)  => {
    return {
        type: UPDATE_GREENHOUSE,
        state
    };
};
  