import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dashboard from './Dashboard';

/** Displays all charts (connect component)*/
class MainManagerCompoment extends Component {
  
  componentDidMount(){
  }
  render() {
    const isLoading  = this.props.greenhouses;
    console.log(isLoading )
    if ((isLoading.length == 0) || (isLoading === undefined )) return <p>loading</p>
    else return <Dashboard/>
  }
}
const mapStateToProps = state => {
  return {
    greenhouses: state.greenhousesReducer
  };
}; 


export default connect(mapStateToProps)(MainManagerCompoment);