import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'chartjs-plugin-annotation';

import GroupCharts from './GroupCharts'
import Modal from '../Modal/Modal';
import { openModal } from '../../actions/modal';
import {sendData} from '../../index';

import '../../style/Charts.css'
import RenderCharts from './RenderCharts';

/** Displays all charts (connect component)*/
class Charts extends Component {
  createChart(){
    this.props.createChart();
  }
  componentWillMount(){
    console.log('перезагрузка');
    sendData({},'Auth');
  }
  render() {
    const isLoading  = this.props.groups;
    console.log(isLoading )
    if (isLoading === null) return <p>loading</p>
    else return <RenderCharts />
    // const charts = this.props.charts.map(chart => (
    //   <GroupCharts key={chart.id} chart={chart} />
    // ))
    // if (!charts) return <p>no charts</p>
    // return (
    //   <div>
    //     <div className='row second-menu justify-content-md-center'>
    //       <div className='col-md-auto menu-link'>
    //         <p onClick={this.createChart.bind(this)}>New Chart</p>
    //       </div>
    //     </div>
    //     <br/>
    //     {charts}
    //     <Modal isOpen = {this.props.modal.isOpen}  titleModal={this.props.modal.titleModal} typeModal={this.props.modal.typeModal}  content={this.props.modal.content}/>
    //   </div>
      
    // );
   }
}
const mapStateToProps = state => {
  return {
    charts: state.chartReducer,
    modal: state.modalReducer
  };
}; 
const mapDispatchToProps = dispatch => ({
  createChart: charts => {
    dispatch(openModal({
      typeModal: 'createChart',
      content: charts,
      titleModal:'Create Chart'
    }
    ))
  },
  
});
export default connect(mapStateToProps,mapDispatchToProps)(Charts);