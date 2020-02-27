import { CREATE_PROGRAM, EDIT_PROGRAM, DELETE_PROGRAM, START_PROGRAM, STOP_PROGRAM, PAUSE_PROGRAM, UPDATE_PROGRAM_DATA } from '../actions/growingProgram';
const growingPrograms = [];
/**
 * Growing program reducer
 * 
 * @param {senorData} state - contain initial state of program data  
 * @param {CreateGroup} action - return the action object
 * @returns {} - new state (Create, edit, delete, start, pause, stop)
 */

const growingProgramReducer = (state = growingPrograms, action) => {
  switch(action.type) {
      case CREATE_PROGRAM: 
      return state.concat([action.data])
      case EDIT_PROGRAM: 
      return state.map(program => {
                  if (program.id === action.id) {
                      program.programName = action.programName;
                      program.group = action.group;
                      program.days = action.days;
                      program.blocks = action.blocks;
                }
                return program;
            })
      case DELETE_PROGRAM: 
      return state.filter(program => program.id !== action.id)
      case START_PROGRAM: 
      return state.map(growingProgram => {
                  if (growingProgram.group === action.group) {
                      growingProgram.status = 'start';
                  }
                  return growingProgram;
            })
      case PAUSE_PROGRAM: 
      return state.map(program => {
                    if (program.id === action.id) {
                      program.status = action.status;
                  }
                  return program;
              })
      case STOP_PROGRAM: 
      return state.map(program => {
                    if (program.id === action.id) {
                      program.status = action.status;
                  }
                  return program;
              })
      case UPDATE_PROGRAM_DATA: 
      return state = action.state;     
      default: 
      return state;
    }
}

export default growingProgramReducer;