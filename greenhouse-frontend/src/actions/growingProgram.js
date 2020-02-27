export const CREATE_PROGRAM = 'CREATE_PROGRAM';
export const DELETE_PROGRAM = 'DELETE_PROGRAM';
export const EDIT_PROGRAM = 'EDIT_PROGRAM';
export const START_PROGRAM = 'START_PROGRAM';
export const PAUSE_PROGRAM = 'PAUSE_PROGRAM';
export const STOP_PROGRAM = 'STOP_PROGRAM';
export const UPDATE_PROGRAM_DATA = 'UPDATE_PROGRAM_DATA';


export const createProgram = (data)  => {
    return {
        type: CREATE_PROGRAM,
        data
    };
};

export const deleteProgram = (data) => {
    return {
        type: DELETE_PROGRAM,
        id: data
    }
};

export const editProgram = (program)  => {
    const  {id, programName, group, days, blocks} = program
    return {
        type: EDIT_PROGRAM,
        id, programName, group, days, blocks
    };
};

export const startProgram = (growingProgram)  => {
    return {
        type: START_PROGRAM,
        group: growingProgram
    };
};

export const pauseProgram = (program)  => {
    const  {id, status} = program
    return {
        type: PAUSE_PROGRAM,
        id, status
    };
};

export const stopProgram = (program)  => {
    const  {id, status} = program
    return {
        type: STOP_PROGRAM,
        id, status
    };
};

export const updateProgram = (state)  => {
    return {
        type: UPDATE_PROGRAM_DATA,
        state
    };
};