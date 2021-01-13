import { SELECT_GREENHOUSE, UPDATE_GREENHOUSE  } from '../../actions/greenhouse';

const greenhouseReducer = (state = {id: ''}, action) => {
    switch(action.type) {
        case SELECT_GREENHOUSE: 
            return  state = action.state;
        case UPDATE_GREENHOUSE: 
            return state = action.state;
        default: 
        return state;
      }
}

export default greenhouseReducer;