import React, { Component } from 'react';
import { connect } from 'react-redux';

/**Sensor component - type of device */

class Sensor extends Component {
  
  render() {
    return (
      <div className='sensor  col-xl-3 col-lg-3 col-md-3 col-sm-4 col-6'>
        <div className='wrapperSensor'>
          
          <div className='row sensor-name'>
            <div className="col-12"><p>{this.props.sensor.name}</p></div>
          </div>
          <p className='sensor-value'>{this.props.sensor.value}</p>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    groups: state.groupsReducer,
  };
};


export default connect(mapStateToProps)(Sensor);