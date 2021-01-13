import React from 'react';
import {connect} from 'react-redux';
import { closeModal } from '../../actions/modal';
import EditGroupModal from './EditGroupModal';
import EditDeviceModal from './EditDeviceModal';
import EditGrowingProgramModal from './EditGrowingProgramModal';
import CreateGroupModal from './CreateGroupModal';
import CreateDeviceModal from './CreateDeviceModal';
import CreateChartModal from './CreateChartModal';
import CreateGrowingProgramModal from '../Modal/CreateGrowingProgramModal';
import StartGrowingProgramModal from '../Modal/StartGrowingProgramModal';

import SelectGreenhouse from '../Modal/SelectGreenhouse';
import CreateGreenhouse from '../Modal/CreateGreenhouse';

import EditConfiguration from './EditConfiguration';
import CreateConfiguration from './CreateConfiguration';


import EditTechnology from './EditTechnology';
import CreateTechnology from './CreateTechnology';

import EditContainer from './EditContainer';
import CreateContainer from './CreateContainer';
import { } from '../../actions/group';

import EditUser from './EditUser';

// import '../../style/Modal.css'

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
        if (typeModal==='editGrowingProgram') {this.modalBody = <EditGrowingProgramModal content = {content} />}
        if (typeModal==='createGroup') {this.modalBody = <CreateGroupModal content = {content} />}
        if (typeModal==='createDevice') {this.modalBody = <CreateDeviceModal content = {content} />}
        if (typeModal==='createGrowingProgram') {this.modalBody = <CreateGrowingProgramModal content = {content}/>}
        if (typeModal==='startGrowingProgram') {this.modalBody = <StartGrowingProgramModal content = {content}/>}
        if (typeModal==='createChart') {this.modalBody = <CreateChartModal content = {content}/>}

        if (typeModal==='createConfiguration') {this.modalBody = <CreateConfiguration content = {content}/>}
        if (typeModal==='editConfiguration') {this.modalBody = <EditConfiguration content = {content}/>}
        if (typeModal==='createContainer') {this.modalBody = <CreateContainer content = {content}/>}
        if (typeModal==='editContainer') {this.modalBody = <EditContainer content = {content}/>}
        if (typeModal==='selectGreenhouse') {this.modalBody = <SelectGreenhouse content = {content}/>}
        if (typeModal==='createGreenhouse') {this.modalBody = <CreateGreenhouse content = {content}/>}
        if (typeModal==='editTechnology') {this.modalBody = <EditTechnology content = {content}/>}
        if (typeModal==='createTechnology') {this.modalBody = <CreateTechnology content = {content}/>}

        if (typeModal==='editUser') {this.modalBody = <EditUser content = {content}/>}
        if (!isOpen) {return null;}

        return (
            <div className='modal in' >
                <div className='modal-dialog modal-lg'>
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