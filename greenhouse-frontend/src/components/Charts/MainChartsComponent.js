import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'chartjs-plugin-annotation';

import GroupCharts from './GroupCharts'
import Modal from '../Modal/Modal';
import { openModal } from '../../actions/modal';
import {sendData} from '../../index';

import '../../style/Charts.css'
import Charts from './Charts';

/** Displays all charts (connect component)*/
class MainChartsCompomemt extends Component {
  
  componentWillMount(){
    console.log('перезагрузка');
    sendData({},'Auth');
  }
  render() {
    const isLoading  = this.props.groups;
    console.log(isLoading )
    if ((isLoading === null) && (isLoading === undefined )) return <p>loading</p>
    else return <Charts />
  }
}
const mapStateToProps = state => {
  return {
    charts: state.chartReducer,
    modal: state.modalReducer
  };
}; 

export default connect(mapStateToProps)(MainChartsCompomemt);