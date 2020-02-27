/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modal';
import Modal from '../Modal/Modal';
import Device from './Device';

/** Displays devices in a group (connect component)*/

class Group extends Component {

  editPh(){
    this.props.editPh(this.props.group);
  }

  editPpm(){
      this.props.editPpm(this.props.group);
  }

  render() {
    const items = this.props.group.devices.map(id => {
      const device = this.props.devices.find(device => device.id === id);
      return <Device device={device} key={device.id}/>
    });
    return (
      <div>
      <div className="wrapperGroup container" >
          <h3 className="title m-0">{this.props.group.title}</h3>

            <div className='row m-0 pl-9'>
                <div className="col-lg-4 col-md-6 col-sm-6 col-xs-6 wrapper-data mr-4">
                    <div className='row data-title pb-2  m-0'>date</div>
                    <div className='row m-0'><h3>{this.props.group.date}</h3></div>
                </div>

                <div className="col-lg-4 col-md-6 col-sm-6 col-xs-6 wrapper-data mr-4">
                    <div className='row data-title pb-2  m-0'>time</div>
                    <div className='row m-0'><h3>{this.props.group.time}</h3></div>
                </div>
            </div>
            
            <div className='row m-0 pl-9'>
                <div className="col-lg-4 col-md-6 col-sm-6 col-xs-6 wrapper-data mr-4">
                    <div className='row data-title pb-2  m-0'>
                        ph <div  className='group-managment-element'><i onClick={this.editPh.bind(this)} className="fas fa-pen"></i></div>
                    </div>
                    <div className='row m-0'><h3>{this.props.group.ph}</h3></div>
                </div>

                <div className="col-lg-4 col-md-6 col-sm-6 col-xs-6 wrapper-data mr-4">
                    <div className='row data-title pb-2  m-0' >
                        ppm <div  className='group-managment-element'><i onClick={this.editPpm.bind(this)} className="fas fa-pen"></i></div>
                    </div>
                    <div className='row m-0'><h3>{this.props.group.ppm}</h3></div>
                </div>
            </div>

            

            

        <div className='wrapper-data'>
          <div className='row data-title pb-2  m-0'>Solution</div>
          <div className='row m-0'><h3>{this.props.group.solution}</h3></div>
        </div>

        <div className='wrapper-data'>
          <div className='row data-title pb-2 m-0'>Plant</div>
          <div className='row m-0'><h3>{this.props.group.plant}</h3></div>
        </div>

        <div className='wrapper-data'>
          <div className='row data-title pb-2  m-0'>Growing Program</div>
          <div className='row m-0'><h3>{this.props.group.growingProgram}</h3></div>
        </div>
        
        <Modal isOpen = {this.props.modal.isOpen}  titleModal={this.props.modal.titleModal} typeModal={this.props.modal.typeModal}  content={this.props.modal.content} />

      </div>
      <div className='container'>{items}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      devices: state.deviceReducer,
      modal: state.modalReducer,
      charts: state.chartReducer,
  };
};

const mapDispatchToProps = dispatch => ({
 
  editPh: group => {
      dispatch(openModal({
          typeModal: 'editPh',
          content: group,
          titleModal:'Edit PH'
      }
      ))
  },
  editPpm: group => {
      dispatch(openModal({
          typeModal: 'editPpm',
          content: group,
          titleModal:'Edit PPM'
      }
      ))
  },

});


export default connect(mapStateToProps,mapDispatchToProps)(Group);
