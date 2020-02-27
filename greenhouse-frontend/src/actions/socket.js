export const SEND_DATA = 'SEND_DATA';
export const REQUEST_DATA = 'REQUEST_DATA';

export const sendData = (data,message)  => {
    return {
        type: SEND_DATA,
        data,
        message
    };
};

export const requestData = (data,message)  => {
    return {
        type: REQUEST_DATA,
        data,
        message
    };
};

