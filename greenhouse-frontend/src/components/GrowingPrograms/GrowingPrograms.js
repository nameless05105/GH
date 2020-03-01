import React, { Component } from 'react';
import { connect } from 'react-redux';
import GrowingProgram from './GrowingProgram';
import { openModal } from '../../actions/modal';

import Modal from '../Modal/Modal';
import '../../style/GrowingPrograms.css';
import {sendData} from '../../index';

/** Displays all growing programs (connect component)*/ 
class GrowingPrograms extends Component {
  /** Triggers the opening of a modal window with a form for creating a new program*/ 
  componentDidMount(){
    sendData({},'Auth');
  }
  createGrowingProgram(){
    this.props.createGrowingProgram();
  }
  /** Triggers the opening of a modal window with a form for launch program*/ 
  startGrowingProgram(){
    this.props.startGrowingProgram();
  }
  render() {
    return (
      <div>
        <Modal isOpen = {this.props.modal.isOpen} titleModal={this.props.modal.titleModal} typeModal={this.props.modal.typeModal}  content={this.props.modal.content}/>
        <div className='row second-menu justify-content-md-center'>
          <div className='col-md-auto menu-link'>
            <p  onClick={this.createGrowingProgram.bind(this)}>New program</p>
          </div>
          <div className='col-md-auto menu-link'>
            <p  onClick={this.startGrowingProgram.bind(this)}>Start program</p>
          </div>
        </div>
        <br/>
        {this.props.growingPrograms.map( program => (
          <GrowingProgram key={program.id} program={program} />
        ))}
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
    
  createGrowingProgram: growingPrograms => {
    console.log('cretea')
    dispatch(openModal({
      typeModal: 'createGrowingProgram',
      content: growingPrograms,
      titleModal:'Create Growing Program'
    }
    ))
  },
  startGrowingProgram: growingPrograms => {
    dispatch(openModal({
      typeModal: 'startGrowingProgram',
      content: growingPrograms,
      titleModal:'Start Growing Program'
    }
    ))
  },
  
});
export default connect(mapStateToProps,mapDispatchToProps)(GrowingPrograms);