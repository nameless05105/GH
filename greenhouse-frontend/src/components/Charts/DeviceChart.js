import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as zoom from 'chartjs-plugin-zoom';

import Chart from 'chart.js';

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.device = this.props.device;
    this.state = {
    display:'block',
    chevron:'fas fa-chevron-up chevron',
    x:1069,
    y:417,
    };
  }

  componentDidMount() {

    this.myChart = new Chart(this.canvasRef.current, {
      type: 'line',
      options: {

          legend: {
            labels: {
                fontColor: 'rgb(255, 255, 255)' // title color
            }
          },

          maintainAspectRatio: false,

          scales: {
            yAxes: [
              {
                ticks: {
                  min: 0,
                  max: 100,
                  fontColor: 'rgb(145, 145, 145)'  //scales color
                },
              }
            ],
            xAxes: [
              {
                ticks: {
                  fontColor: 'rgb(145, 145, 145)'
                }
              }
            ],
          },

          pan: {
            enabled: true,
            mode: "x",
            speed: 10,
            threshold: 10
          },

          zoom: {
            enabled: true,
            drag: false,
            mode: "xy",
            limits: {
              max: 6,
              min: 0.5
            }
          }

      },

      data: {
        labels: this.props.labels,
        datasets: [{
          label: this.props.sensor.name,
          data: this.props.data,
          borderColor: 'rgba(255,207,164,1)',  //line color
          backgroundColor: 'rgba(255,207,164,0.1)',  //line color
        }]
      }
    });
  }
  handleClick(e) {
    const display =  (this.state.display === 'block') ? 'none' : 'block';
    const chevron =  (this.state.chevron === 'fas fa-chevron-up chevron') ? 'fas fa-chevron-down chevron' : 'fas fa-chevron-up chevron';
    this.setState({ display: display, chevron: chevron });
  }

  render() {
    const styleContainer = {display: this.state.display, height: this.state.y + 'px'};
    const styleCanvas = { display: this.state.display, };
    return (
      <div className='col-xl-12 col-lg-12 col-md-12 col-sm-4 col-6 '>
        <div className='row'>
            <h4 className='chart-deviceName'>{this.props.sensor.name}</h4><i className={this.state.chevron} onClick={ e => this.handleClick() }></i>
        </div>
        <div className='row' style={ styleContainer }>
            <canvas ref={this.canvasRef} style={ styleCanvas } />
        </div>
      </div>
    );
  }
}

/** Displays device data chart  (connect component)*/
class DeviceChart extends Component {
  constructor(props) {
      super(props);
      this.state = {
      x:1069,
      y:417,
      display:'block',
      chevron:'fas fa-chevron-up chevron',
      };
    };

      
  componentDidMount() {
    window.setInterval(() => {
      this.setState({
      })
    }, 5000)
  }



  render() { 
    
    
    const deviceId = this.props.deviceId;
    const device = this.props.devices.find(device => device.id === deviceId);
    const filterSensors = this.props.sensors.filter(sensor => sensor.MACaddr === device.MACaddr);

    const charts = filterSensors.map(sensor =>{
      let data = new Array;
      let labels = new Array;
      const result = sensor.values.map(value => {
        data.push(Number(value.value));
        labels.push(Number(value.date));
        }
      );
      
      return(
        
            <BarChart
              device={device}
              sensor={sensor}
              data={data}
              labels={labels}
              key={sensor.id}
            />
      )});
    return charts;
  }  
}


const mapStateToProps = state => {
    return {
      devices: state.deviceReducer,
      sensors: state.sensorReducer,
    };
  };
export default connect(mapStateToProps)(DeviceChart);