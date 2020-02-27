export const CREATE_DEVICE = 'CREATE_DEVICE';
export const DELETE_DEVICE = 'DELETE_DEVICE';
export const EDIT_DEVICE = 'EDIT_DEVICE';
export const UPDATE_DEVICE_DATA = 'UPDATE_DEVICE_DATA';

export const createDevice = (data)  => {
    return {
        type: CREATE_DEVICE,
        data
    };
  };

export const deleteDevice = (data) => {
    return {
        type: DELETE_DEVICE,
        id: data
    }
}
export const editDevice = (device)  => {
    const  {id, name, typeDevice, value} = device
    return {
        type: EDIT_DEVICE,
        id, name, typeDevice, value
    };
  };
export const updateDeviceData = (state) => {
    return {
        type: UPDATE_DEVICE_DATA,
        state
    }
}