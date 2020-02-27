import React from 'react';
import { connect } from 'react-redux';
import { editDevice } from '../../actions/device';
import { closeModal } from '../../actions/modal';
import { sendData } from '../../actions/socket';

/**Component of the modal window for editing device data (connect component)*/
class EditDeviceModal extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            id:this.props.content.id,
            name:this.props.content.name,
            typeDevice:this.props.content.typeDevice,
            pin:this.props.content.pin,
            databus:this.props.content.databus,
        }

        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeTypeDevice = this.changeTypeDevice.bind(this);
        this.changePin = this.changePin.bind(this);
        this.changeDatabus = this.changeDatabus.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }
    handleChange(e) {
        let id = Number(e.target.id);
        const isChecked = e.target.checked;
        let arr = this.state.checkedItems;
        if (isChecked === true){
        
        arr.push(id);} else { 
          arr = arr.filter(val => val !== id);
        }
        this.setState({checkedItems: arr});
      }
    close(){
        this.props.dispatch(closeModal());
    }
    save(){
      const data = {
        id: this.state.id,
        name: this.state.name,
        typeDevice:this.state.typeDevice,
        pin:this.state.pin,
        databus:this.state.databus,
      };
      this.props.editDevice(data);
      this.props.close();
    }
    changeName(event) {
        this.setState({name: event.target.value });
    }
    changeTypeDevice(event) {
        this.setState({typeDevice: event.target.value });
    }
    changePin(event) {
        this.setState({pin: event.target.value });
    }
    changeDatabus(event) {
        this.setState({databus: event.target.value });
    }
    render(){
        
        return (
            <div>
                <div className='modal-body'>
                <div className='row modal-input-row'>
                        <div className='col-12'>
                          <label  className='inp'>
                            <input type='text' onChange={this.changeName} value={this.state.name} placeholder="&nbsp;"/>
                              <span className='label'>Device name</span>
                              <span className='border'></span>
                          </label>
                        </div>
                      </div>
                          
                      <div className='row modal-input-row'>

                          <label  className='inp'>
                            <div className='select'>
                            <select  onChange={this.changeTypeDevice} value={this.state.typeDevice} placeholder="&nbsp;" >
                              <option selected disabled>Type</option>
                              <option value='1'>Button</option>
                              <option value='2'>Range</option>
                              <option value='3'>Sensor</option>
                            </select>
                            </div>
                           </label>
                           
                      </div>

                      <div className='min-max-value-for-device' id='min-max-value-for-device'>
                        <div className='row modal-input-row'> 
                          <label  className='inp'>
                            <input type='select' ref={input => (this.getPin = input)} placeholder="&nbsp;"/>
                            <span className='label'>Min value</span>
                            <span className='border'></span>
                          </label>
                        </div>
                        <div className='row modal-input-row'> 
                          <label  className='inp'>
                            <input type='select' ref={input => (this.getPin = input)} placeholder="&nbsp;"/>
                            <span className='label'>Max value</span>
                            <span className='border'></span>
                          </label>
                        </div>
                      </div>

                      <div className='row modal-input-row'>

                          <label  className='inp'>
                            <input type='select' onChange={this.changePin} value={this.state.pin} placeholder="&nbsp;"/>
                            <span className='label'>Pin</span>
                            <span className='border'></span>
                           </label>

                      </div>

                      <div className='row modal-input-row'>

                          <label  className='inp'>
                            <div className='select'>
                              <select className='select' onChange={this.changeDatabus} value={this.state.databus} placeholder="&nbsp;">
                                <option selected disabled>Data bus</option>
                                <option value='SPI'>SPI</option>
                                <option value='UAPT'>UAPT</option>
                                <option value='ISC'>ISC</option>
                              </select>
                            </div>
                          </label>

                      </div>
                        
                </div>
                <div className='modal-footer'>
                    <button type='button' className="btn btn-success" onClick={this.save}>Save</button>
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
        groups: state.gpoupReducer
    };
  };
const mapDispatchToProps = dispatch => ({
    editDevice: data => {
        dispatch(sendData(data,'EDIT_DEVICE'))
        dispatch(editDevice(data));
    },
    close: () => {
      dispatch(closeModal())
    },
    
  });
export default connect(mapStateToProps,mapDispatchToProps)(EditDeviceModal);