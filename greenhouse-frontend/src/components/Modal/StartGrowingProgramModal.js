import React from 'react';
import {connect} from 'react-redux';
import {closeModal} from '../../actions/modal';
import { startProgram } from '../../actions/growingProgram';


class StartGroupModal extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            // growingProgram: 0

          }
        this.close = this.close.bind(this);
        this.start = this.start.bind(this);
        
    }
    start(){
        // this.setState({status: 'start' });
        // const data = {
        //     id: this.state.id,
        //     status: this.state.status
        //     };
        // this.props.startProgram(data);
        const growingProgram = this.getGrowingProgram.value;
        this.props.startProgram(growingProgram);
        this.close();
      }

    
    close(){
        this.props.close();
    }
   
    render(){
       
        return (
            <div>
                <div class='modal-body'>
                    <h4 className='growing-program-start'>Run the program for the group</h4>
                    <div className='row modal-input-row'>
                      <div className='col-12'>
                        <label  className='inp'>
                            <div className='select'>
                            <select ref={input => (this.getGrowingProgram = input)} placeholder="&nbsp;" onChange={this.handleChange}>
                                <option selected disabled>Group</option>
                                {this.props.growingPrograms.map(growingProgram => (
                                <option value={growingProgram.group}>{growingProgram.group}</option>))
                                }
                            </select>
                            </div>
                        </label>
                      </div>
                    </div>
                    
                </div>
                <div class='modal-footer'>
                    <button type='button' className='btn btn-success' onClick={this.start}>Start</button>
                    <button type='button' className='btn btn-secondary' onClick={this.close}>Close</button>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        modal: state.modalReducer,
        devices: state.deviceReducer,
        groups: state.groupReducer,
        growingPrograms: state.growingProgramReducer
    };
  };
const mapDispatchToProps = dispatch => ({
    startProgram: growingProgram => {
        dispatch(startProgram(growingProgram))
    },
    close: () => {
      dispatch(closeModal())
    },
    
  });
export default connect(mapStateToProps,mapDispatchToProps)(StartGroupModal);