import React from 'react';
import {connect} from 'react-redux';
import {closeModal} from '../../actions/modal';
import {sendData} from '../../actions/socket';
import { openModal } from '../../actions/modal';

import Modal from './Modal';

import { selectGreenhouse } from '../../actions/greenhouse';


class SelectGreenhouse extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          greenhouse:''
          }
        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
    }
    save(){
      const data = {id: this.state.greenhouse};
      this.props.selectGreenhouse(data);
        this.close();
      }

      handleChangeGreenhouse(event) {
        console.log(event.target.value);
        this.setState({ greenhouse: event.target.value });
        }


    
    close(){
        this.props.close();
    }
   
    render(){
       
        return (
            <div>
                <div class='modal-body'>

                    <h4 className='growing-program-start'>Выбрать теплицу</h4>
                    <div className='row modal-input-row'>
                      <div className='col-12'>
                        <label  className='inp'>
                            <div className='select'>
                            <select onChange={this.handleChangeGreenhouse.bind(this)} placeholder="&nbsp;" >
                                <option selected disabled>Выбрать теплицу</option>
                                    {this.props.greenhouses.map(greenhouse => (
                                <option value={greenhouse.id}>{greenhouse.name}</option>))
                                }
                            </select>
                            </div>
                        </label>
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
        greenhouses: state.greenhousesReducer
    };
  };
const mapDispatchToProps = dispatch => ({

    createContainer: container => {
        dispatch(openModal({
          typeModal: 'createGreenhouse',
          content: container,
          titleModal:'Создать новую теплицу'
        }
        ))
      },

    close: () => {
      dispatch(closeModal())
    },

    selectGreenhouse: data => {
      console.log(data)
      dispatch(sendData(data,'Get_Data_for_Greenhouse'))
      dispatch(selectGreenhouse(data))

    },
    
  });
export default connect(mapStateToProps,mapDispatchToProps)(SelectGreenhouse);