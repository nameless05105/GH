import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal';
import {createProgram} from '../../actions/growingProgram';
import {sendData} from '../../actions/socket';
import uuidv4  from 'uuid/v4';

/**Component of the modal window for creating new growing program (connect component)*/
class CreateGrowingProgramModal extends React.Component{
      /** 
       * @param {array} this.state.blocks - Growing Program blocks
       */
      constructor(props){
          super(props)
          this.state ={blocks: [{
            id:'',
            blockDays:'',
            blockTitle:'',
            airTemperature:'',
            airCO2:'',
            airHumidity:'',
            waterTemperature:'',
            lightPeriod:'',
            waterPH:'',
            waterEC:'',
            waterTDC:''
          }],
        err:''};

          this.close = this.close.bind(this);
          this.save = this.save.bind(this);
        
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
                    <input type='text' value={el.title||''} onChange={this.handleChangeTitle.bind(this, i)} placeholder="&nbsp;"/>
                    <span className='label'>Title</span>
                    <span className='border'></span>
                </label>
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
                    <input type='text' value={el.airHumidity||''} onChange={this.handleChangeAirHumidity.bind(this, i)} placeholder="&nbsp;"/>
                    <span className='label'>Air humidity</span>
                    <span className='border'></span>
                </label>
              </div>
            </div>
            <div className='row modal-input-row'>
              <div className='col-6'>
                <label  className='inp'>
                    <input type='text' value={el.airCO2||''} onChange={this.handleChangeAirCO2.bind(this, i)} placeholder="&nbsp;"/>
                    <span className='label'>CO2 concentration</span>
                    <span className='border'></span>
                </label>
              </div>
              <div className='col-6'>
                <label  className='inp'>
                    <input type='text' value={el.lightPeriod||''} onChange={this.handleChangeLightPeriod.bind(this, i)} placeholder="&nbsp;"/>
                    <span className='label'>Light period</span>
                    <span className='border'></span>
                </label>
              </div>
            </div>
            {/* <div className='row modal-input-row'>
              <div className='col-6'>
                <label  className='inp'>
                    <input type='text' value={el.id||''} onChange={this.handleChangeId.bind(this, i)} placeholder="&nbsp;"/>
                    <span className='label'>Id</span>
                    <span className='border'></span>
                </label>
              </div>
            </div> */}
            <div className='row modal-input-row'>
              <div className='col-6'>
                <label  className='inp'>
                    <input type='text' value={el.waterTemperature||''} onChange={this.handleChangeWaterTemperature.bind(this, i)} placeholder="&nbsp;"/>
                    <span className='label'>Water temperature</span>
                    <span className='border'></span>
                </label>
              </div>
              <div className='col-6'>
                <label  className='inp'>
                    <input type='text' value={el.waterPH||''} onChange={this.handleChangeWaterPH.bind(this, i)} placeholder="&nbsp;"/>
                    <span className='label'>Water PH</span>
                    <span className='border'></span>
                </label>
              </div>
            </div>
            <div className='row modal-input-row'>
              <div className='col-6'>
                <label  className='inp'>
                    <input type='text' value={el.waterEC||''} onChange={this.handleChangeWaterEC.bind(this, i)} placeholder="&nbsp;"/>
                    <span className='label'>Water EC</span>
                    <span className='border'></span>
                </label>
              </div>
              <div className='col-6'>
                <label  className='inp'>
                    <input type='text' value={el.waterTDC||''} onChange={this.handleChangeWaterTDC.bind(this, i)} placeholder="&nbsp;"/>
                    <span className='label'>Water TDC</span>
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
    handleChangeTitle(i, event) {
      let blocks = [...this.state.blocks];
      blocks[i] = {...blocks[i], title:event.target.value};
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
    handleChangeAirCO2(i, event) {   
      let blocks = [...this.state.blocks];
      blocks[i] = {...blocks[i], airCO2:event.target.value};
      this.setState({ blocks });
    }
    /** Writing to the form for water humidity*/
    handleChangeWaterTDC(i, event) {
      let blocks = [...this.state.blocks];
      blocks[i] = {...blocks[i], waterTDC:event.target.value};
      this.setState({ blocks });
    }
    handleChangeWaterPH(i, event) {
      let blocks = [...this.state.blocks];
      blocks[i] = {...blocks[i], waterPH:event.target.value};
      this.setState({ blocks });
    }
    handleChangeWaterEC(i, event) {
      let blocks = [...this.state.blocks];
      blocks[i] = {...blocks[i], waterEC:event.target.value};
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
      this.setState(prevState => ({ blocks: [...prevState.blocks, '']}))
    }
    /** Remove the selected block from the array*/
    removeClick(i){
      let blocks = [...this.state.blocks];
      blocks.splice(i,1);
      this.setState({ blocks });
    }
    /** Triggers a close modal window action*/
    close(){
      this.props.close();
    }
    /** Triggers an action to create new growing program*/
    save(){
      const blocks = this.state.blocks;
      const reducer = (accumulator, currentValue) => Number(accumulator) + Number(currentValue);
      let num = blocks.map(block => block.blockDays)
      const programName = this.getProgramName.value;
      const days = num.reduce(reducer);
      const group = this.getGroup.value;
      const status = 'stop';
      const id = uuidv4();
      

      if ((programName !== '')  && (group !== '')  && (status !== '') && (blocks !== '')) {
        
        const data = {
              id,
              programName,
              group,
              days,
              status,
              blocks
            };
        this.props.createProgram(data);
        this.close();
      } else this.setState({err:'Все поля должны быть заполнены'})
    }
    
    render(){
        return (
          <div>
            <div className='modal-body'>
            <p>{this.state.err}</p>
              <div className='row modal-input-row'>
                <div className='col-12'>
                  <label  className='inp'>
                    <input type='text' ref={input => (this.getProgramName = input)} placeholder="&nbsp;"/>
                      <span className='label'>Program name</span>
                      <span className='border'></span>
                  </label>
                </div>
              </div> 
              <div className='row modal-input-row'>
                <div className='col-9'>
                  <label  className='inp'>
                    <div className='select'>
                      <select ref={input => (this.getGroup = input)} placeholder="&nbsp;">
                        <option selected disabled>Group</option>
                        {this.props.groups.map(group => (
                          <option value={group.id}>{group.title}</option>))
                        }
                      </select>
                    </div>
                  </label>
                </div>
                {/* <div className='col-3'>
                  <label  className='inp'>
                    <input type='text' ref={input => (this.getDays = input)} placeholder="&nbsp;"/>
                      <span className='label'>Days</span>
                      <span className='border'></span>
                  </label>
                </div> */}
              </div>

              {this.createUI()}        

              <div onClick={this.addClick.bind(this)}>
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
      modal: state.modalReducer,
      devices: state.deviceReducer,
      groups: state.groupReducer
  };
};
const mapDispatchToProps = dispatch => ({
  createProgram: data => {
      dispatch(sendData(data,'CREATE_PROGRAM'))
      dispatch(createProgram(data))
  },
  close: () => {
    dispatch(closeModal())
  },
  
});
export default connect(mapStateToProps,mapDispatchToProps)(CreateGrowingProgramModal);