import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../style/Groups.css'
import {sendData} from '../../index';

import Group from './Group';
import GroupList from './GroupList';
 
/** Displays all groups (connect component)*/

class Groups extends Component {
  constructor(props){
    super(props)
    this.state = {
      group:this.props.groups[0], //для одиночного вывода
      items: this.props.groups
    }
  }

  handleInputChange = () => {
    const new_groups = this.props.groups.filter(group => group.title.toLowerCase().includes(this.search.value.toLowerCase()));
    this.setState({
      items: new_groups
    })
  }

  


  render() {
    
    let group =null;
    if(this.state.group){
      group = <Group  group={this.state.group} />
    } else {
      group = <p></p>;
    }
    
    return (
      <div >
        <div className="row">
          <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">

            <label  className='inp'>
              <input type='text' ref={input => this.search = input} onChange={this.handleInputChange} placeholder="Search"/>
                <span className='label'></span>
                <span className='border'></span>
            </label>
              <div className="wrapper-search-result-block"> 
                
                {this.props.groups.map(group => (

                    <div  key={group.id} className="wrapperGroup-item" onClick={() => this.setState({ group:group})}>
                      <GroupList group={group} onClick={this.handleChange} />
                    </div>
                  
                ))}
                
              </div>
          </div>
          <div className="col-lg-7 col-md-12 col-sm-12 col-xs-12" >
            {group}
          </div>
        </div>
        
      </div>
    );
   }
}
 
const mapStateToProps = (state,new_groups) => {
    return {
      // groups: state.groupReducer.filter(group => group.status === true)
      groups: state.groupReducer,
      
    };
  };


export default connect(mapStateToProps)(Groups);