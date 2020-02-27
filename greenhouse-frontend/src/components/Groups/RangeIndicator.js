import React, { Component } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

/** Range component - type of device */

class RangeIndicator extends Component { 

  /** 
   * @param {number} this.state.value - device value 
   * @param {number} this.state.maxValue - device maximum value
   * @param {number} this.state.minValue - device minimum value
   */
  constructor(props) {
    super(props);
 
    this.state = {
      maxValue: 1000,
      minValue: 0,
      value: 100,
    };
  }

  render() {
    return (
      <div className='indicator col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
        <div className='wrapperIndicator'>
          <div className='row'>
            <div className='col-4 wrapper-indicator-name'>
              <p className='indicator-name'>{this.props.device.name}</p>
            </div>
            <div className='col-5 wrapper-input-range'>
            <InputRange
                maxValue={this.state.maxValue}
                minValue={this.state.minValue}
                value={this.state.value}
                // onChange={value => this.setState({ value })}
                 />
            </div>
            <div className='col-2 wrapper-input-value'>
          {this.props.device.value}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RangeIndicator;