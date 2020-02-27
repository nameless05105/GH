import React from 'react';
import { connect } from 'react-redux';
import { editGroup } from '../../actions/group';
import { closeModal } from '../../actions/modal';

import {sendData} from '../../actions/socket';

/**Component of the modal window for editing group data (connect component)*/
class EditGroupModal extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            id:this.props.content.id,
            title:this.props.content.title,
            checkedItems: this.props.content.devices,
        }
        this.save = this.save.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }
    handleChange(e) {
        let id = e.target.id;
        console.log(id);
        const isChecked = e.target.checked;
        let arr = this.state.checkedItems;
        console.log('функция нажатия');
        if (isChecked === true){
        arr.push(id);} else { 
          arr = arr.filter(val => val !== id);
          console.log('true');
        }
        this.setState({checkedItems: arr});
      }
    close(){
        this.props.dispatch(closeModal());
    }
    save(){
      const data = {
        id: this.state.id,
        title: this.state.title,
        devices: this.state.checkedItems,
        };
      this.props.editGroup(data);
      this.props.close();
    }
    changeTitle(event) {
        let arr = this.state.title;
        this.setState({title: arr });
        
        this.setState({title: event.target.value });
    }
    render(){
        
        return (
            <div>
                <div className='modal-body'>
                    <div className='row modal-input-row'>
                      <div className='col-12'>
                        <label  className='inp'>
                          <input type='text' placeholder="&nbsp;" onChange={this.changeTitle} value={this.state.title} />
                            <span className='label'>Group name</span>
                            <span className='border'></span>
                        </label>
                      </div>
                    </div>
                    {
                      this.props.devices.map(item => { 
                        let arr = this.state.checkedItems;
                        let checked
                         if (arr.indexOf(item.id) === -1) {checked = false}
                         else checked = true
                        
                        return(
                        <div key={item.id} className='row checkbox'>
                          <div className='col-3'>
                            <input type='checkbox' item={item} id={item.id}  onChange={this.handleChange} checked={checked} />
                          </div>
                          <div className='col-9 item'>
                            <p>{item.name}</p>
                          </div>   
                        </div>

                      )}
                      )
                    }
                        
                </div>
                <div className='modal-footer'>
                    <button type='button' className='btn btn-primary' onClick={this.save}>Save</button>
                    <button type='button' className='btn btn-secondary' onClick={this.props.close}>Close</button>
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
    editGroup: data => {
        dispatch(sendData(data,'EDIT_GROUP'))
        dispatch(editGroup(data));
    },
    close: () => {
      dispatch(closeModal())
    },
    
  });

export default connect(mapStateToProps,mapDispatchToProps)(EditGroupModal);