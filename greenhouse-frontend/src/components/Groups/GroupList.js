import React, { Component } from 'react';
import { connect } from 'react-redux';

/** Displays devices in a group (connect component)*/

class GroupList extends Component {
  
  render() {
    
    return (
      <div >
        <div className='row group-title '>
            <h3>{this.props.group.title}</h3>
        </div>
      </div> 
    );
  }
}
const mapStateToProps = state => {
  return {
    devices: state.deviceReducer,
  };
};
export default connect(mapStateToProps)(GroupList);
