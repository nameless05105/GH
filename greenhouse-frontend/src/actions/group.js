export const CREATE_GROUP = 'CREATE_GROUP';
export const DELETE_GROUP = 'DELETE_GROUP';
export const EDIT_GROUP = 'EDIT_GROUP';
export const EDIT_GROUP_DAILY_DATA = 'EDIT_GROUP_DAILY_DATA';
export const EDIT_STATUS = 'EDIT_STATUS';
export const ADD_NEW_DEVICE_TO_GROUP = 'ADD_NEW_DEVICE_TO_GROUP';
export const UPDATE_GROUP_DATA = 'UPDATE_GROUP_DATA';


export const createGroup = (data)  => {
    return {
        type: CREATE_GROUP,
        data
    };
  };

export const deleteGroup = (id) => {
    return {
        type: DELETE_GROUP,
        id
    }
}
export const editGroup = (group)  => {
  const  {id, title, devices} = group
  return {
      type: EDIT_GROUP,
      id, title, devices
  };
};



export const editGroupDailyData = (data)  => {
  const  {date, ph, ppm, id, time} = data
  return {
      type: EDIT_GROUP_DAILY_DATA,
      date, ph, ppm, id, time
  };
};


export const addNewDeviceToGroup = (deviceId, groupId)  => {
  return {
      type: ADD_NEW_DEVICE_TO_GROUP,
      deviceId, 
      groupId
  };
};
  
export const updateGroup = (state)  => {
  return {
      type: UPDATE_GROUP_DATA,
      state
  };
};

export const editStatus = (id)  => {
  return {
      type: EDIT_STATUS,
      id
  };
};
  
