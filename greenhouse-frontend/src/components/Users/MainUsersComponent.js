import React, { Component } from 'react';
import { connect } from 'react-redux';

import {sendData} from '../../index';

import '../../style/Charts.css'
import Users from './Users';

/** Displays all charts (connect component)*/
class MainUsersCompoment extends Component {
  
  componentWillMount(){
    // sendData({},'Get_Users');
  }
  render() {
    const isLoading  = this.props.users;
    console.log(isLoading )
    if ((isLoading.length == 0) || (isLoading === undefined )) return <p>loading</p>
    else return <Users />
  }
}
const mapStateToProps = state => {
  return {
    users: state.usersReducer,
    modal: state.modalReducer
  };
}; 

export default connect(mapStateToProps)(MainUsersCompoment);