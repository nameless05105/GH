import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal';

import {sendData} from '../../actions/socket';

/**Component of the modal window for editing group data (connect component)*/
class EditUser extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            id:this.props.content.id,
            greenhouse:this.props.content.greenhouse,
            err:''
        }
        this.save = this.save.bind(this);
        this.changeGreenhouse = this.changeGreenhouse.bind(this);
        
    }
   
    close(){
        this.props.dispatch(closeModal());
    }
    save(){
      const data = {
        id: this.state.id,
        greemhouse: this.state.greenhouse,
        };
      if ((data.title !== '') && (data.solution !== '')  && (data.plant !== '')  && (data.program !== '') && (data.devices !== '')) {
      this.props.editGroup(data);
      this.props.close();
      } else this.setState({err:'Все поля должны быть заполнены'})
    }
    changeGreenhouse(event) {
        
        this.setState({greenhouse: event.target.value });
    }


    render(){
        
        return (
            <div>
                <div class='modal-body'>
                  <p>{this.state.err}</p>
                    <div className='row modal-input-row'>
                      <div className='col-12'>
                        <label  className='inp'>
                          <input type='text' placeholder="&nbsp;" onChange={this.changeGreenhouse} value={this.state.greenhouse} />
                            <span className='label'>Теплица</span>
                            <span className='border'></span>
                        </label>
                      </div>
                    </div>

                 
                </div>
                <div class='modal-footer'>
                    <button type='button' className='btn btn-primary' onClick={this.save}>Сохранить</button>
                    <button type='button' className='btn btn-secondary' onClick={this.props.close}>Закрыть</button>
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
        // dispatch(editGroup(data));
    },
    close: () => {
      dispatch(closeModal())
    },
    
  });

export default connect(mapStateToProps,mapDispatchToProps)(EditUser);