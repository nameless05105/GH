import React from 'react';
import { connect } from 'react-redux';
import { editGroupDailyData } from '../../actions/group';
import { closeModal } from '../../actions/modal';

import {sendData} from '../../actions/socket';

/**Component of the modal window for editing group data (connect component)*/
class EditPpmModal extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            ppm:this.props.content.ppm,
        }
        this.save = this.save.bind(this);
        this.changePpm = this.changePpm.bind(this);;
        
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
    
    close(){
        this.props.dispatch(closeModal());
    }

    save(){
      let date = new Date();
      const data = {
        id: this.props.content.id,
        date: this.formatDate(date),
        time: date.getHours()+':'+date.getMinutes(),
        ppm: this.state.ppm,
        ph: this.props.content.ph,
        };
      this.props.editGroup(data);
      this.props.close();
    }

    changePpm(event) {
        this.setState({ppm: event.target.value });
    }

    render(){
        
        return (
            <div>
                <div class='modal-body'>
                    <div className='row modal-input-row'>
                      <div className='col-12'>
                        <label  className='inp'>
                          <input type='text' placeholder="&nbsp;" onChange={this.changePpm} value={this.state.ppm} />
                            <span className='label'>Ppm</span>
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
        dispatch(sendData(data,'EDIT_GROUP'))
        dispatch(editGroupDailyData(data));
    },
    close: () => {
      dispatch(closeModal())
    },
    
  });

export default connect(mapStateToProps,mapDispatchToProps)(EditPpmModal);