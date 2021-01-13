export const CREATE_TECHNOLOGY = 'CREATE_TECHNOLOGY';
export const DELETE_TECHNOLOGY = 'DELETE_TECHNOLOGY';
export const EDIT_TECHNOLOGY = 'EDIT_TECHNOLOGY';
export const UPDATE_TECHNOLOGY = 'UPDATE_TECHNOLOGY';


export const createTechnology = (data)  => {
    return {
        type: CREATE_TECHNOLOGY,
        data
    };
};

export const deleteTechnology = (id) => {
    return {
        type: DELETE_TECHNOLOGY,
        id
    }
};

export const editTechnology = (data)  => {
    return {
        type: EDIT_TECHNOLOGY,
        data
    };
};

export const updateTechnology = (state)  => {
    return {
        type: UPDATE_TECHNOLOGY,
        state
    };
};