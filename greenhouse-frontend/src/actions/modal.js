export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = (options)  => {
    const  {titleModal, typeModal, content} = options
    return {
        type: OPEN_MODAL,
        titleModal, typeModal, content
    };
  };

export const closeModal = ()  => {
    return {
        type: CLOSE_MODAL
    };
};