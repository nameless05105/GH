/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux'
import Sensor from './Sensor';

/** Displays devices in a device */

class Device extends Component {

  render() {
    const items = this.props.sensors.map(sensor => {
        if (sensor.MACaddr === this.props.device.MACaddr)
        return <Sensor sensor={sensor} key={sensor.id}/>
    })
    return (
      <div >
        <div className='row device-row'><h3 className='device-title'>{this.props.device.name}</h3></div>
        <div className='row'>{items}</div>
      </div>
    );
  }
}
const mapStateToProps = state => {
    return {
        sensors: state.sensorReducer
    };
  };



export default connect(mapStateToProps)(Device);
