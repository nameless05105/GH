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
            MACaddr:this.props.content.MACaddr,
            err:''
        }

        // this.close = this.close.bind(this);
        this.save = this.save.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeMACaddr = this.changeMACaddr.bind(this);
        
    }
    // handleChange(e) {
    //     let id = Number(e.target.id);
    //     const isChecked = e.target.checked;
    //     let arr = this.state.checkedItems;
    //     if (isChecked === true){
        
    //     arr.push(id);} else { 
    //       arr = arr.filter(val => val !== id);
    //     }
    //     this.setState({checkedItems: arr});
    //   }
    close(){
        this.props.dispatch(closeModal());
    }
    save(){
      const data = {
        id: this.state.id,
        name: this.state.name,
        MACaddr:this.state.MACaddr
      };
      if ((data.name !== '') && (data.MACaddr !== '')) {
      
      this.props.editDevice(data);
      this.props.close();
      } else this.setState({err:'Все поля должны быть заполнены'})

    }
    changeName(event) {
        this.setState({name: event.target.value });
    }
    changeMACaddr(event) {
      this.setState({MACaddr: event.target.value });
  }
    // changeGroup(event) {
    //     this.setState({group: event.target.value });
    // }
    render(){
        
        return (
            <div>
                <div class='modal-body'>
                <p>{this.state.err}</p>
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
                    <div className='col-12'>
                      <label  className='inp'>
                        <input type='text' onChange={this.changeMACaddr} value={this.state.MACaddr} placeholder="&nbsp;"/>
                          <span className='label'>MAC address</span>
                          <span className='border'></span>
                      </label>
                    </div>
                  </div>
 
 
                </div>

                
        

                <div class='modal-footer'>
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
        // dispatch(editDevice(data));
    },
    close: () => {
      dispatch(closeModal())
    },
    
  });
export default connect(mapStateToProps,mapDispatchToProps)(EditDeviceModal);