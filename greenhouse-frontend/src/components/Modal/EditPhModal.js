import React from 'react';
import { connect } from 'react-redux';
import { editGroupDailyData } from '../../actions/group';
import { closeModal } from '../../actions/modal';

import {sendData} from '../../actions/socket';

/**Component of the modal window for editing group data (connect component)*/
class EditPhModal extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            ph:this.props.content.ph,
        }
        this.save = this.save.bind(this);
        this.changePh = this.changePh.bind(this);
        
    }
    
    close(){
        this.props.dispatch(closeModal());
    }

    formatDate(date){

      let dd = date.getDate();
      if (dd < 10) dd = '0' + dd;
    
      let mm = date.getMonth() + 1;
      if (mm < 10) mm = '0' + mm;
    
      let yy = date.getFullYear() % 100;
      if (yy < 10) yy = '0' + yy;
    
      return dd + '/' + mm + '/' + yy;

    }

    save(){
      let date = new Date();

      const data = {
        id: this.props.content.id,
        date: this.formatDate(date),
        time: date.getHours()+':'+date.getMinutes(),
        ppm: this.props.content.ppm,
        ph: this.state.ph,
        };

      this.props.editGroup(data);
      this.props.close();
    }
    changePh(event) {
        this.setState({ph: event.target.value });
    }
    render(){
        
        return (
            <div>
                <div class='modal-body'>
                    <div className='row modal-input-row'>
                      <div className='col-12'>
                        <label  className='inp'>
                          <input type='text' placeholder="&nbsp;" onChange={this.changePh} value={this.state.ph} />
                            <span className='label'>Ph</span>
                            <span className='border'></span>
                        </label>
                      </div>
                    </div>
                    
                        
                </div>
                <div class='modal-footer'>
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
    };
  };
const mapDispatchToProps = dispatch => ({
    editGroup: data => {
      console.log(data)
        dispatch(sendData(data,'EDIT_GROUP_DAILY_DATA'))
        dispatch(editGroupDailyData(data));
    },
    close: () => {
      dispatch(closeModal())
    },
    
  });

export default connect(mapStateToProps,mapDispatchToProps)(EditPhModal);