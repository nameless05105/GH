import React from 'react';
import {connect} from 'react-redux';
import { closeModal } from '../../actions/modal';
import {createDevice} from '../../actions/device';
import { addNewDeviceToGroup } from '../../actions/group';
import {sendData} from '../../actions/socket';
import uuidv4  from 'uuid/v4';

/**Component of the modal window for creating new device (connect component)*/
class CreateDeviceModal extends React.Component{
    constructor(props){
      super(props)
      this.state={displayValues: false}
      this.close = this.close.bind(this);
      this.save = this.save.bind(this);
      this.changeTitle = this.changeTitle.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(){
      this.setState({displayValues:true})
    }
    /** Triggers a close modal window action*/
    close(){
      this.props.close();
    }
    /** Triggers an action to create new device for a group*/
    save(){
      const id = uuidv4();
      const name = this.getTitle.value;
      const typeDevice = this.getTypeDevice.value;
      const pin = this.getPin.value;
      const dataBus = this.getDatabus.value;
      const groupId = Number(this.getGroup.value);

      const data = {
        id,
        name,
        typeDevice,
        pin,
        dataBus,
        groupId
      };
        console.log(data);
  
      this.props.createDevice(data);
      this.close();
    }
    
    changeTitle(title) {
      this.setState({title})
    }
    render(){
        return (
            <div>
                <div className='modal-body'>
                      <div className='row modal-input-row'>
                        <div className='col-12'>
                          <label  className='inp'>
                            <input type='text' ref={input => (this.getTitle = input)} placeholder="&nbsp;"/>
                              <span className='label'>Device name</span>
                              <span className='border'></span>
                          </label>
                        </div>
                      </div>

                      <div className='row modal-input-row'>
                        {/* <div className='col-12 select' > */}
                          <label  className='inp'>
                            <div className='select' >
                              <select className='select'  ref={input => (this.getGroup = input)} placeholder="&nbsp;">
                                <option selected disabled>Add device to Group</option>
                                {this.props.groups.map(item =>(
                                    <option value={item.id}>{item.title}</option>
                                    )
                                )}
                              </select>
                            </div>
                            {/* <input type='text' ref={input => (this.getGroup = input)} placeholder="&nbsp;"/> */}
                              {/* <span className='label'>Add device to group</span>
                              <span className='border'></span> */}
                          </label>
                        {/* </div> */}
                      </div>
                          
                      <div className='row modal-input-row'>

                          <label  className='inp'>
                            <div className='select'>
                            <select id='sel'  ref={input => (this.getTypeDevice = input)} placeholder="&nbsp;" onChange={this.handleChange.bind(this)}>
                              <option selected disabled>Type</option>
                              <option value='Button'>Button</option>
                              <option value='Range'>Range</option>
                              <option value='Sensor'>Sensor</option>
                            </select>
                            </div>
                           </label>
                           
                      </div>
                      
                      {/* <div className='min-max-value-for-device' >
                        <div className='row modal-input-row'> 
                          <label  className='inp'>
                            <input type='text' ref={input => (this.getPin = input)} placeholder="&nbsp;"/>
                            <span className='label'>Min value</span>
                            <span className='border'></span>
                          </label>
                        </div>
                        <div className='row modal-input-row'> 
                          <label  className='inp'>
                            <input type='text' ref={input => (this.getPin = input)} placeholder="&nbsp;"/>
                            <span className='label'>Max value</span>
                            <span className='border'></span>
                          </label>
                        </div>
                      </div> */}

                      {/* <div className='row modal-input-row'>

                          <label  className='inp'>
                            <input type='select' ref={input => (this.getPin = input)} placeholder="&nbsp;"/>
                            <span className='label'>Pin</span>
                            <span className='border'></span>
                           </label>

                      </div> */}

                      {/* <div className='row modal-input-row'>

                          <label  className='inp'>
                            <div className='select'>
                              <select className='select' ref={input => (this.getDatabus = input)} placeholder="&nbsp;">
                                <option selected disabled>Data bus</option>
                                <option>SPI</option>
                                <option>UAPT</option>
                                <option>ISC</option>
                              </select>
                            </div>
                          </label>

                      </div> */}
                        
                </div>
                <div className='modal-footer'>
                    <button type='button' className='btn btn-success' onClick={this.save}>Save</button>
                    <button type='button' className='btn btn-secondary' onClick={this.close}>Close</button>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        modal: state.modal,
        devices: state.deviceReducer,
        groups: state.groupReducer
    };
  };
const mapDispatchToProps = dispatch => ({
    createDevice: data => {
        dispatch(sendData(data,'CREATE_DEVICE'))
        dispatch(createDevice(data))
        dispatch(addNewDeviceToGroup(data.id,data.groupId))
    },
    close: () => {
      dispatch(closeModal())
    },
    
  });
export default connect(mapStateToProps,mapDispatchToProps)(CreateDeviceModal);