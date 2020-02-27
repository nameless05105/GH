import { OPEN_MODAL, CLOSE_MODAL } from "../actions/modal";

const initialState = {
    isOpen: false,
    titleModal: 'Модальное окно',
    btnText: 'OK',
    content:'',
    typeModal: null
  };

/**
 * Modal window reducer
 * 
 * @param {object} state - contain initial state of modal window 
 * @param {object} action - type action
 * @returns {} - new state (open or close)
 */

const modalReducer = (state = initialState, action) => {
    switch(action.type) {
        case OPEN_MODAL: 
            return Object.assign({}, state, {
                isOpen:true,
                titleModal: action.titleModal,
                typeModal: action.typeModal,
                content: action.content
            });
        case CLOSE_MODAL:
        return  Object.assign({}, state, {
            isOpen:false
        });
        
        default: 
            return state;
      }
  }

export default modalReducer;