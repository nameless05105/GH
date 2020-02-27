import React from 'react';
import {connect} from 'react-redux';
import { closeModal } from '../../actions/modal';
import EditGroupModal from './EditGroupModal';
import EditDeviceModal from './EditDeviceModal';
import CreateGroupModal from './CreateGroupModal';
import CreateDeviceModal from './CreateDeviceModal';
import { } from '../../actions/group';

import '../../style/Modal.css'

/** Displays modal window (connect component)*/ 
class Modal extends React.Component {

    constructor(props){
        super(props)
        this.close = this.close.bind(this)
    }
    /** Triggers a close modal window action*/
    close () {
        this.props.dispatch(closeModal());
    }

    render () {
        const isOpen  = this.props.isOpen;
        const titleModal  = this.props.titleModal;
        const typeModal  = this.props.typeModal;
        const content = this.props.content;
        
        if (typeModal==='editGroup') {this.modalBody = <EditGroupModal content = {content} />}
        if (typeModal==='editDevice') {this.modalBody = <EditDeviceModal content = {content} />}
        if (typeModal==='createGroup') {this.modalBody = <CreateGroupModal content = {content} />}
        if (typeModal==='createDevice') {this.modalBody = <CreateDeviceModal content = {content} />}
        if (!isOpen) {return null;}

        return (
            <div className='modal in' >
                <div className='modal-dialog' >
                    <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title'>{titleModal}</h5>
                        <button type='button' className='close' onClick={this.close}>
                        <span aria-hidden='true'>&times;</span>
                        </button>
                    </div>
                        {this.modalBody}
                    </div>
                </div>
                </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        modal: state.modal,
        group: state.groupReducer,
    };
  };
export default connect(mapStateToProps)(Modal);