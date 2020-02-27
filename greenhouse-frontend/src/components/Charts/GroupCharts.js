/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DeviceChart from './DeviceChart'
import 'chartjs-plugin-annotation';
import { deleteChart } from '../../actions/chart';


/** Displays charts of group (connect component)*/
class GroupCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      values: [],
      x:700,
      y:500,
      display:'inline',
      chevron:'fas fa-chevron-up chevron',
    };
  };

  _onMouseMove(e) {
    this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  }
  handleClick(e) {
    const display =  (this.state.display === 'inline') ? 'none' : 'inline';
    const chevron =  (this.state.chevron === 'fas fa-chevron-up chevron') ? 'fas fa-chevron-down chevron' : 'fas fa-chevron-up chevron';
    this.setState({ display: display, chevron: chevron });
  }
 

  deleteChart(e) {
      const confirmation = confirm('Do you really want to delete this chart?');
      if (confirmation) {
      this.props.delete(this.props.chart.id);
      }
  }

  render() {
      const style = { display: this.state.display};
      const groupId = this.props.chart.groupId;
      const group = this.props.groups.find(group => group.id === groupId);
      const items = group.devices.map(id => (
        <DeviceChart deviceId={id}/>
        )
      );
    return (
      <div className='growing-program'>
        
          {/* <div className='row growing-program-name'>
                <div className='chart-title'><h3>{group.title}</h3></div>
                <i className={this.state.chevron} onClick={ e => this.handleClick() }></i>
                <i className='fas fa-trash group-managment-element pt-1' onClick={this.deleteChart.bind(this)}></i>
          </div> */}
          <div className='row' style={ style }>
            {items}
          </div>
          
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    groups: state.groupReducer,
    devices: state.deviceReducer,
    charts: state.chartReducer,
  };
};
const mapDispatchToProps = dispatch => ({
   
    delete: data => {
      dispatch(deleteChart(data))
    },

});

export default connect(mapStateToProps, mapDispatchToProps)(GroupCharts);