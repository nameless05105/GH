import React from 'react';
import {connect} from 'react-redux';
import {closeModal} from '../../actions/modal';
import {createChart} from '../../actions/chart';
import {sendData} from '../../actions/socket';

/**Component of the modal window for creating new group charts (connect component)*/
class CreateChartModal extends React.Component{
    constructor(props){
        super(props);
        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
    }
    /** Triggers a close modal window action*/
    close(){
        this.props.close();
    }
    /** Triggers an action to create new charts for a group*/
    save(){
        const groupId = this.getGroup.value;
        const data = {
            id: 2,
            groupId
        };
        this.props.createChart(data);
        this.close();
    }
    render(){
        const groupSelect = this.props.groups.map(group => {
           return <option value = {group.id}>{group.title}</option>
        })
        return (
            <div>
                <div class='modal-body'>
                <div className='row modal-input-row'>

                    <label  className='inp'>
                        <div className='select'>
                            <select ref={input => (this.getGroup = input)} placeholder="&nbsp;" onChange={this.handleChange}>
                                <option selected disabled>Group</option>
                                {groupSelect}
                            </select>
                        </div>
                    </label>
                    
                    </div>
                   
                </div>
                <div class='modal-footer'>
                    <button type='button' className='btn btn-success' onClick={this.save}>Save</button>
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
        groups: state.groupReducer
    };
  };
const mapDispatchToProps = dispatch => ({
    createChart: data => {
        dispatch(sendData(data,'CREATE_CHART'))
        dispatch(createChart(data))
    },
    close: () => {
      dispatch(closeModal())
    },
    
  });
export default connect(mapStateToProps,mapDispatchToProps)(CreateChartModal);