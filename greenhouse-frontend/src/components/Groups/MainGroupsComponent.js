import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../style/Groups.css'
import {sendData} from '../../index';

import Groups from './Groups';
 
/** Displays all groups (connect component)*/

class MainGroupsComponent extends Component {

  componentDidMount(){
    sendData({},'Auth');
    this.setState({
      items: this.props.groups
    })
  }

  render() {
    
    const isLoading  = this.props.groups;
    console.log(isLoading )
    if (isLoading === null) return <p>loading</p>
    else return <Groups />

  }
}
 
const mapStateToProps = (state,new_groups) => {
    return {
      groups: state.groupReducer,
      
    };
  };


export default connect(mapStateToProps)(MainGroupsComponent);