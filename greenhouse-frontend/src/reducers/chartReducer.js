import { CREATE_CHART, DELETE_CHART, DELETE_CHART_BY_GROUP, UPDATE_CHART_DATA } from '../actions/chart';
const charts = [];
/**
 * Chart reducer
 * 
 * @param {object} state - contain initial state of chart data 
 * @param {object} action - return the action object
 * @returns {object} - new state (Create and delete)
 */

const chartsReducer = (state = charts, action) => {
  switch(action.type) {
      case CREATE_CHART: 
      return state.concat([action.data])
      case DELETE_CHART:
      return state.filter(charts => charts.id !== action.id)
      case DELETE_CHART_BY_GROUP:
      return state.filter(charts => charts.groupId !== action.id)
      case UPDATE_CHART_DATA: 
      return state = action.state;
      default: 
      return state;
    }
}

export default chartsReducer;