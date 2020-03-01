/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { deleteProgram, pauseProgram, stopProgram} from '../../actions/growingProgram';
import Modal from '../Modal/Modal';
import { openModal } from '../../actions/modal';

/** Displays growing program (connect component)*/ 

class GrowingProgram extends Component {
    /** 
   * @param {number} this.state.id - growing program id 
   * @param {number} this.state.status - growing program status
   * @param {number} this.state.pauseBottonStyle - start/pause button status
   */
    constructor(props){
        super(props)
        this.state = {
            id:this.props.program.id,
            status:this.props.program.status,
            pauseBottonStyle:"fas fa-pause group-managment-element",
        }
        this.pause = this.pause.bind(this);
        this.stop = this.stop.bind(this);
        
    }
    /** Triggers a delete program action*/
    deleteProgram(e) {
      const confirmation = confirm('Do you really want to delete this program?');
      if (confirmation) {
      this.props.delete(this.props.program.id);
      }
    }
    /** Triggers a edit program action*/
    editProgram(){
      this.props.edit(this.props.program);
      
    }
    /** Triggers a pause program action*/
    pause(){
      if (this.state.status === 'pause' ) {
          this.setState({status: 'start' });
          this.setState({pauseBottonStyle: 'fas fa-pause group-managment-element' });
          }
      else {
        this.setState({status: 'pause' });
        this.setState({pauseBottonStyle: 'fas fa-play group-managment-element' });
      }
      const data = {
        id: this.state.id,
        status: this.state.status
        };
      this.props.pauseProgram(data);
    }
    /** Triggers a stop program action*/
    stop(){
      const confirmation = confirm('Do you really want to stop this program?');
      if (confirmation) {
      this.setState({status: 'stop' });
      const data = {
        id: this.state.id,
        status: this.state.status
        };
      this.props.stopProgram(data);
    }}
   
  render() {
    const items = this.props.program.blocks.map(block => (
      <div className='sensor col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 menu'>
        <div className='wrapperProgram'>
          <div className='row growing-program-data'>
            <div className='col-7'>Days:</div>
            <div className='col-5'><p>{block.blockDays}</p></div>
          </div>
          <div className='row'>
            <div className='col-7'>Air temperature:</div>
            <div className='col-5'><p>{block.airTemperature}</p></div>
          </div>
          <div className='row'>
            <div className='col-7'>Water temperature:</div>
            <div className='col-5'><p>{block.waterTemperature}</p></div>
          </div>
          <div className='row'>
            <div className='col-7'>Air humidity:</div>
            <div className='col-5'><p>{block.airHumidity}</p></div>
          </div>
          <div className='row'>
            <div className='col-7'>Water PH:</div>
            <div className='col-5'><p>{block.waterHumidity}</p></div>
          </div>
          <div className='row'>
            <div className='col-7'>Light period:</div>
            <div className='col-5'><p>{block.lightPeriod}</p></div>
          </div>
        </div>
          
      </div>
    )
    );
    return (
        <div className='growing-program'>
          {/* <Modal isOpen = {this.props.modal.isOpen} titleModal={this.props.modal.titleModal} typeModal={this.props.modal.typeModal}  content={this.props.modal.content}/> */}
          <div className='row growing-program-name'>
                <div className='growing-program-title'><h3>{this.props.program.programName}</h3></div>
                <div className='col-3'><h3>{this.props.program.days} days</h3></div>
                {/* <div className='col-3'><h3>Status: {this.state.status} </h3></div>
               
                <i className={this.state.pauseBottonStyle} onClick={this.pause}></i>
                <i className="fas fa-stop group-managment-element-stop" onClick={this.stop}></i> */}
                <i className='fas fa-trash group-managment-element pt-2' onClick={this.deleteProgram.bind(this)}></i>
                <i className='fas fa-edit group-managment-element pt-2' onClick={this.editProgram.bind(this)}></i>
          </div>
          <div className='row growing-program-data'>
            {items}
          </div>
        </div>
    );
   }
}
const mapStateToProps = state => {
  return {
    growingPrograms: state.growingProgramReducer,
    modal: state.modalReducer
  };
}; 
const mapDispatchToProps = dispatch => ({
   
    pauseProgram: data => {
        dispatch(pauseProgram(data));
    },
    stopProgram: data => {
        dispatch(stopProgram(data));
    },
    delete: data => {
      dispatch(deleteProgram(data))
    },
    edit: group => {
      dispatch(openModal({
        typeModal: 'editGrowingProgram',
        content: group,
        titleModal:'Edit Growing Program Form'
      }
      ))
    },

});


export default connect(mapStateToProps,mapDispatchToProps)(GrowingProgram);