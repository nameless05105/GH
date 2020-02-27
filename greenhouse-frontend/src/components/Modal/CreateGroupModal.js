import React from 'react';
import {connect} from 'react-redux';
import {closeModal} from '../../actions/modal';
import {createGroup} from '../../actions/group';
import {sendData} from '../../actions/socket';
import uuidv4  from 'uuid/v4';

class CreateGroupModal extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            checkedItems: [],
          }
        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const i = e.target.id;
        let id = i; 
        const isChecked = e.target.checked;
        let arr = this.state.checkedItems;
        if (isChecked === true){
        
        arr.push(id);} else { 
          arr = arr.filter(val => val !== id);
        }
        this.setState({checkedItems: arr});
      }

    close(){
        this.props.close();
    }
    save(){
        const id = uuidv4();
        const title = this.getTitle.value;
        const devices = this.state.checkedItems;
        const data = {
            id,
            title,
            devices
        };

        this.props.createGroup(data);
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
                          <input type='text' placeholder="&nbsp;" ref={input => (this.getTitle = input)} />
                            <span className='label'>Group name</span>
                            <span className='border'></span>
                        </label>
                      </div>
                    </div>
                    {
                      this.props.devices.map(item => (
                        <div key={item.id} className='row checkbox'>
                          <div className='col-3'>
                            <input type='checkbox' item={item} id={item.id} value={item.name} onChange={this.handleChange} />
                          </div>
                          <div className='col-9 item'>
                            <p>{item.name}</p>
                          </div>   
                        </div>

                      ))
                    }
                        
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
        modal: state.modalReducer,
        devices: state.deviceReducer,
        group: state.groupReducer
    };
  };
const mapDispatchToProps = dispatch => ({
    createGroup: data => {
        dispatch(sendData(data,'CREATE_GROUP'))
        // if (request){
          dispatch(createGroup(data))
        // }
    },
    close: () => {
      dispatch(closeModal())
    },
    
  });
export default connect(mapStateToProps,mapDispatchToProps)(CreateGroupModal);