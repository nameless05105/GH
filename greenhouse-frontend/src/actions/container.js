export const CREATE_CONTAINER = 'CREATE_CONTAINER';
export const DELETE_CONTAINER = 'DELETE_CONTAINER';
export const EDIT_CONTAINER = 'EDIT_CONTAINER';
export const UPDATE_CONTAINERS = 'UPDATE_CONTAINERS';


export const createContainer = (data)  => {
    return {
        type: CREATE_CONTAINER,
        data
    };
};

export const deleteContainer = (id) => {
    return {
        type: DELETE_CONTAINER,
        id
    }
};

export const editContainer = (data)  => {
    return {
        type: EDIT_CONTAINER,
        data
    };
};

export const updateContainers = (state)  => {
    return {
        type: UPDATE_CONTAINERS,
        state
    };
};