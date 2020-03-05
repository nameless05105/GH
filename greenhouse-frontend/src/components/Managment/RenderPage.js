import React, { Component } from 'react';
import { connect } from 'react-redux';
import GroupList from './GroupList';

import Modal from '../Modal/Modal';
import { openModal } from '../../actions/modal';

import '../../style/Groups.css'

/** Displays all groups and device (connect component)*/ 
class RenderPage extends Component {
  /** Triggers the opening of a modal window with a form for creating a group*/
  createGroup(){
    this.props.createGroup();
  }
  /** Triggers the opening of a modal window with a form for creating a device*/
  createDevice(){
    this.props.createDevice();
  }
  
  render() {
    return (
      <div>
          {/* <div className="nav-body">
            <p  onClick={this.createGroup.bind(this)} >Add group</p>
            <p   onClick={this.createDevice.bind(this)} >Add device</p>
          </div> */}
        
        <div className='row second-menu justify-content-md-center'>
          <div className='col-md-auto menu-link'>
            <p  onClick={this.createGroup.bind(this)} >Add group</p>
          </div>
          <div className='col-md-auto menu-link'>
            <p   onClick={this.createDevice.bind(this)} >Add device</p>
          </div>
        </div>
        <br/>
          <Modal isOpen = {this.props.modal.isOpen}  titleModal={this.props.modal.titleModal} typeModal={this.props.modal.typeModal}  content={this.props.modal.content} />
         
          {this.props.groups.map(group => (
            <GroupList key={group.id} group={group} />
          ))}

      </div>
    );
   }
}
 
const mapStateToProps = state => {
    return {
      groups: state.groupReducer,
      modal: state.modalReducer
    };
};

const mapDispatchToProps = dispatch => ({
  
  createGroup: group => {
    dispatch(openModal({
      typeModal: 'createGroup',
      content: group,
      titleModal:'Create Group Form'
    }
    ))
  },
  createDevice: group => {
    dispatch(openModal({
      typeModal: 'createDevice',
      content: group,
      titleModal:'Create Device Form'
    }
    ))
  },
  
});

export default connect(mapStateToProps,mapDispatchToProps)(RenderPage);