import React, { Component } from 'react';
import { connect } from 'react-redux';
import {sendData} from '../../index';
import Management from './Management'
import { openModal } from '../../actions/modal';

import '../../style/Groups.css'

/** Displays all groups and device (connect component)*/ 
class MainManagementComponent extends Component {
  /** Triggers the opening of a modal window with a form for creating a group*/
  createGroup(){
    this.props.createGroup();
  }
  /** Triggers the opening of a modal window with a form for creating a device*/
  createDevice(){
    this.props.createDevice();
  }
  componentDidMount(){
    console.log('перезагрузка');
    sendData({},'Auth');
  }
  
  render() {
    const isLoading  = this.props.groups;
    const isLoadingd  = this.props.device;
    console.log(isLoading )
    if (isLoading === null && isLoadingd === null) return <p>loading</p>
    else return <Management />
   }
}
 
const mapStateToProps = state => {
    return {
      groups: state.groupReducer,
      modal: state.modalReducer,
      device: state.deviceReducer
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

export default connect(mapStateToProps,mapDispatchToProps)(MainManagementComponent);