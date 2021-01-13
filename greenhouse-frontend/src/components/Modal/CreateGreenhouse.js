import React from 'react';
import {connect} from 'react-redux';
import {closeModal} from '../../actions/modal';
import {sendData} from '../../actions/socket';
import { openModal } from '../../actions/modal';
import uuidv4  from 'uuid/v4';

import Modal from './Modal';

import { updateGreenhouse } from '../../actions/greenhouse';


class CreateGreenhouse extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            apply:false
          }
        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }
    save(){
        const id = uuidv4();
        const name = this.getName.value;
        const technologist = '';
        const data = {
            id,
            name,
            technologist
        };
         
        this.props.createGreenhouse(data);
        if (this.state.apply) {
            this.props.updateGreenhouse(data);
        }
        this.close();
    }

    handleChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        console.log(value);
        this.setState({ apply: value });
      }

    createGreenhouse(){
        this.props.createGreenhouse();
    }
    
    close(){
        this.props.close();
    }
   
    render(){
       
        return (
            <div>
                <div class='modal-body'>

                    <h4 className='growing-program-start'>Создать новую теплицу</h4>

                        <div className='row modal-input-row'>
                        <div className='col-12'>
                            <label  className='inp'>
                            <input type='text' placeholder="&nbsp;" ref={input => (this.getName = input)} />
                                <span className='label'>Название</span>
                                <span className='border'></span>
                            </label>
                        </div>
                        </div>

                        <div className='row modal-input-row'>
                            <div className='col-3'>
                                <input type='checkbox'  onChange={this.handleChange}/>
                            </div>
                            <div className='col-9 item'>
                                <p>Выбрать данную теплицу для управления</p>
                            </div>  
                        </div> 

                </div>
                <div class='modal-footer'>
                    <button type='button' className='btn btn-success' onClick={this.save}>Выбрать </button>
                    <button type='button' className='btn btn-secondary' onClick={this.close}>Закрыть</button>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        modal: state.modalReducer,
        devices: state.deviceReducer,
        groups: state.groupReducer,
        growingPrograms: state.growingProgramReducer,
        greenhouses: state.greenhouseReducer
    };
  };
const mapDispatchToProps = dispatch => ({

    createGreenhouse: data => {
        console.log(data)
      },

    close: () => {
      dispatch(closeModal())
    },
    updateGreenhouse: data => {
        console.log(data)
        dispatch(updateGreenhouse(data))
    
      },
    
  });
export default connect(mapStateToProps,mapDispatchToProps)(CreateGreenhouse);