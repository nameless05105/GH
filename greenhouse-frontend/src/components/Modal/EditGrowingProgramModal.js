import React from 'react';
import { connect } from 'react-redux';
import { editProgram } from '../../actions/growingProgram';
import { closeModal } from '../../actions/modal';
import {sendData} from '../../actions/socket';

/**Component of the modal window for editing  growing program (connect component)*/
class EditGrowingProgramModal extends React.Component{
    /** 
     * @param {number} this.state.id - Growing Program id
     * @param {number} this.state.programName - Growing Program title
     * @param {number} this.state.days - Growing Program days
     * @param {number} this.state.group - Growing Program group
     * @param {number} this.state.blocks- Growing Program blocks
     */
    constructor(props){
        super(props)
        this.state = {
            id: this.props.content.id,
            programName: this.props.content.programName,
            days: this.props.content.days,
            group: this.props.content.group,
            blocks: this.props.content.blocks,
            err:''
        }
        this.save = this.save.bind(this);
        this.changeProgramName = this.changeProgramName.bind(this);
        this.changeDays = this.changeDays.bind(this);
        
    }
    /** Displays a program block in the form*/
    createUI(){
        return this.state.blocks.map((el, i) => 
            <div key={i} className='block'>
            
            <div className='row modal-input-row'>
              <div className='col-3'>
                <label  className='inp'>
                    <input type='text' value={el.blockDays||''} onChange={this.handleChangeBlockDays.bind(this, i)} placeholder="&nbsp;"/>
                    <span className='label'>Days</span>
                    <span className='border'></span>
                </label>
              </div>
              <div className='col-9 remove-block-button'>
                <i class='fas fa-times' onClick={this.removeClick.bind(this, i)}></i>
              </div>
            </div>
            <div className='row modal-input-row'>
              <div className='col-6'>
                <label  className='inp'>
                    <input type='text' value={el.airTemperature||''} onChange={this.handleChangeAirTemperature.bind(this, i)} placeholder="&nbsp;"/>
                    <span className='label'>Air temperature</span>
                    <span className='border'></span>
                </label>
              </div>
              <div className='col-6'>
                <label  className='inp'>
                    <input type='text' value={el.waterTemperature||''} onChange={this.handleChangeWaterTemperature.bind(this, i)} placeholder="&nbsp;" />
                    <span className='label'>Water temperature</span>
                    <span className='border'></span>
                </label>
              </div>
            </div>
            <div className='row modal-input-row'>
              <div className='col-6'>
                <label  className='inp'>
                    <input type='text' value={el.airHumidity||''} onChange={this.handleChangeAirHumidity.bind(this, i)} placeholder="&nbsp;"/>
                    <span className='label'>Air humidity</span>
                    <span className='border'></span>
                </label>
              </div>
              <div className='col-6'>
                <label  className='inp'>
                    <input type='text' value={el.waterHumidity||''} onChange={this.handleChangeWaterHumidity.bind(this, i)} placeholder="&nbsp;"/>
                    <span className='label'>Water humidity</span>
                    <span className='border'></span>
                </label>
              </div>
            </div>
            <div className='row modal-input-row'>
              <div className='col-6'>
                <label  className='inp'>
                    <input type='text' value={el.lightPeriod||''} onChange={this.handleChangeLightPeriod.bind(this, i)} placeholder="&nbsp;"/>
                    <span className='label'>Light period</span>
                    <span className='border'></span>
                </label>
              </div>
            </div>
             
            </div>          
        )
     }
    /** Writing to the form for block days*/
    handleChangeBlockDays(i, event) {
        let blocks = [...this.state.blocks];
        blocks[i] = {...blocks[i], blockDays:event.target.value};
        this.setState({ blocks });
    }
    /** Writing to the form for id program*/
    handleChangeId(i, event) {
      let blocks = [...this.state.blocks];
      blocks[i] = {...blocks[i], id:event.target.value};
      this.setState({ blocks });
    }
    /** Writing to the form for air temperature*/
    handleChangeAirTemperature(i, event) {
      let blocks = [...this.state.blocks];
      blocks[i] = {...blocks[i], airTemperature:event.target.value};
      this.setState({ blocks });
    }
    /** Writing to the form for water temperature*/
    handleChangeWaterTemperature(i, event) {
      let blocks = [...this.state.blocks];
      blocks[i] = {...blocks[i], waterTemperature:event.target.value};
      this.setState({ blocks });
    }
    /** Writing to the form for air humidity*/
    handleChangeAirHumidity(i, event) {
      let blocks = [...this.state.blocks];
      blocks[i] = {...blocks[i], airHumidity:event.target.value};
      this.setState({ blocks });
    }
    /** Writing to the form for water humidity*/
    handleChangeWaterHumidity(i, event) {
      let blocks = [...this.state.blocks];
      blocks[i] = {...blocks[i], waterHumidity:event.target.value};
      this.setState({ blocks });
    }
    /** Writing to the form for light periog*/
    handleChangeLightPeriod(i, event) {
      let blocks = [...this.state.blocks];
      blocks[i] = {...blocks[i], lightPeriod:event.target.value};
      this.setState({ blocks });
    }
    /** Adding a new value to an array of blocks */
    addClick(){
      this.setState(prevState => ({ blocks: [...prevState.blocks, {id:4}]}))
    }
    /** Remove the selected block from the array*/
    removeClick(i){
      let blocks = [...this.state.blocks];
      blocks.splice(i,1);
      this.setState({ blocks });
    }
    /** Triggers a close modal window action*/
    close(){
      this.props.dispatch(closeModal());
    }
    /** Triggers an action to create new growing program*/
    save(){
      const data = {
            id: this.state.id,
            programName: this.state.programName,
            days: this.state.days,
            group: this.state.group,
            blocks: this.state.blocks,
      };
      if ((data.programName !== '') && (data.days !== '')  && (data.group !== '')  && (data.status !== '') && (data.blocks !== '')) {
        let num = data.blocks.map(block => block.blockDays)
        const reducer = (accumulator, currentValue) => Number(accumulator) + Number(currentValue);
        if (num.reduce(reducer) === data.days){
          this.props.editProgram(data);
          this.props.close();
        } else this.setState({err:'Общее количество дней и сумма количества дней в блоках должны совпадать'})
      } else this.setState({err:'Все поля должны быть заполнены'})
    }
    changeProgramName(event) {
      this.setState({programName: event.target.value });
    }
    // changeGroup(event) {
    //   console.log(this.state.group)
    //   console.log(this.state.event.target.value)
    //   this.setState({ group: event.target.value });
    // }
    changeDays(event) {
      this.setState({days: event.target.value });
    }
    render(){
        
        return (
            <div>
            <div className='modal-body'>
            <p>{this.state.err}</p>
              <div className='row modal-input-row'>
                <div className='col-6'>
                  <label  className='inp'>
                    <input type='text' onChange={this.changeProgramName} value={this.state.programName} placeholder="&nbsp;"/>
                      <span className='label'>Program name</span>
                      <span className='border'></span>
                  </label>
                </div>

                <div className='col-4'>
                  <label  className='inp'>
                    <input type='text' onChange={this.changeDays} value={this.state.days} placeholder="&nbsp;"/>
                      <span className='label'>Days</span>
                      <span className='border'></span>
                  </label>
                </div>

              </div> 
              <div className='row modal-input-row'>
                {/* <div className='col-9'>
                  <label  className='inp'>
                    <div className='select'>
                      <select onChange={this.changeGroup} value={this.state.group}>
                        <option selected disabled>Group</option>
                        {this.props.groups.map(group => (
                          <option value={group.id}>{group.title}</option>))
                        }
                      </select>
                    </div>
                  </label>
                </div> */}
                
              </div>

              {this.createUI()}   

              <div onClick={this.addChild}>
              <i class='fas fa-plus'></i>
            </div>
              
          </div>
          <div class='modal-footer'>
            <button className='btn btn-secondary' onClick={this.close}>Close</button>
            <button className='btn btn-success' onClick={this.save}> Save </button>
          </div>
        </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        modal: state.modal,
        devices: state.deviceReducer,
        groups: state.groupReducer
    };
  };
const mapDispatchToProps = dispatch => ({
    editProgram: data => {
        dispatch(sendData(data,'EDIT_PROGRAM'))
        dispatch(editProgram(data));
    },
    close: () => {
      dispatch(closeModal())
    },
  });

export default connect(mapStateToProps,mapDispatchToProps)(EditGrowingProgramModal);