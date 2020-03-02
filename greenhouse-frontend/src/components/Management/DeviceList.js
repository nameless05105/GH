/* eslint-disable no-restricted-globals */
import React, { Component }  from 'react';
import { deleteDevice } from '../../actions/device';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modal';

/** Displays the devices in this group for management (connect component)*/ 
class DeviceList extends Component {
  /** Triggers a delete device action*/
  deleteDevice(e) {
    const confirmation = confirm('Do you really want to delete this device?');
      if (confirmation) {
        this.props.delete(this.props.device.id);
      }
  }
  /** Triggers a edit device action*/
  editDevice(){
    this.props.edit(this.props.device);
  }

  render() {
      
    return (
      <div className='sensor col-xl-2 col-lg-2 col-md-3 col-sm-4 col-6 mb-1'>
          <div className='wrapperDevice'>
              <div className='row pt-3' >
                  <div className='device-name'>
                      <p>{this.props.device.name}</p>
                  </div>
              </div>
              <div className='device-edit'> 
                <i className='fas fa-edit group-managment-element' onClick={this.editDevice.bind(this)}></i>
              </div> 
          </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    // groups: state.groupsReducer,
    modal: state.modalReducer,
    devices: state.deviceReducer,
  };
};

const mapDispatchToProps = dispatch => ({
  delete: data => {
      dispatch(deleteDevice(data))
  },
  edit: device => {
    dispatch(openModal({
      typeModal: 'editDevice',
      content: device,
      titleModal:'Edit Device Form',
      btnText: 'Сохранить'
      
    }
      
    ))
  },
  
});
export default connect(mapStateToProps,mapDispatchToProps)(DeviceList);