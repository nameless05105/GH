export const CREATE_CHART = 'CREATE_CHART';
export const DELETE_CHART = 'DELETE_CHART';
export const DELETE_CHART_BY_GROUP = 'DELETE_CHART_BY_GROUP';
export const UPDATE_CHART_DATA = 'UPDATE_CHART_DATA';

export const createChart = (data)  => {
    return {
        type: CREATE_CHART,
        data
    };
  };

export const deleteChart = (data) => {
    return {
        type: DELETE_CHART,
        id: data
    }
}

export const deleteChartByGroup = (data) => {
    return {
        type: DELETE_CHART_BY_GROUP,
        id: data
    }
}

export const updateChartData = (state) => {
    return {
        type: UPDATE_CHART_DATA,
        state
    }
}
