/* eslint-disable no-restricted-globals */
import React, { Component }  from 'react';
// import {devices} from '../../state';
import {editStatus} from '../../actions/group';

import { connect } from 'react-redux';
import { openModal } from '../../actions/modal';
import DeviceList from './DeviceList';

import {sendData} from '../../actions/socket';

/** Displays the group for management (connect component)*/ 
class GroupList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.group.status
    };
  }
  /** Triggers a delete group action*/
  editStatus(e) {

    const confirmation = (this.props.group.status) ? confirm('Exclude a group from the list?') : confirm('Include a group in the list?');
      if (confirmation) {
        this.props.editStatus(this.props.group.id);
        this.setState({status: this.props.group.status})
      }
    
  }

  deleteGroup(e) {
    const confirmation = confirm('Do you really want to delete this group?');
      if (confirmation) {
        this.props.delete(this.props.group.id);
      }
  }
  /** Triggers a edit group action*/
  editGroup(){
    this.props.edit(this.props.group);
  }

  render() {
    console.log(this.props.group.title)
    const items = this.props.group.devices.map(id => {
        let device = this.props.devices.find(device => device.id === id);
        return <DeviceList key={device.id} device={device} />
        // console.log('id',id)
        
      });

    let changeStatusButton = null;
    if(this.state.status){
      changeStatusButton = <div  className='group-managment-element pt-1'><i className="far fa-check-square group-managment-element" onClick={this.editStatus.bind(this)}></i></div>
    } else {
      changeStatusButton = <div  className='group-managment-element pt-1'><i className="far fa-square group-managment-element" onClick={this.editStatus.bind(this)}></i></div>
    }
      
    return (
      <div className='growing-program'>
        <div className='row growing-program-name'>
        {changeStatusButton}
        <div className="group-managment-element"><h3>{this.props.group.title}</h3></div>
            <div className="group-managment-element pt-1"><i className='fas fa-trash' onClick={this.deleteGroup.bind(this)}></i></div>
            <div className="group-managment-element pt-1"><i className='fas fa-edit' onClick={this.editGroup.bind(this)}></i></div> 
        </div>
        <div className='row'>{items}</div>
        <br/>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    groups: state.groupsReducer,
    modal: state.modalReducer,
    devices: state.deviceReducer
  };
};

const mapDispatchToProps = dispatch => ({
  delete: data => {
    const modif_data = {id:data}
      dispatch(sendData(modif_data, 'DELETE_GROUP'))
      // dispatch(deleteGroup(data))
      
  },
  edit: group => {
    dispatch(openModal({
      typeModal: 'editGroup',
      content: group,
      titleModal:'Edit Group Form'
    }
    ))
  },
  editStatus: id => {
    dispatch(editStatus(id))
  },
  
});
export default connect(mapStateToProps,mapDispatchToProps)(GroupList);