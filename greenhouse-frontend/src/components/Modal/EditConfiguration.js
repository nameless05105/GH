import React from 'react';
import { connect } from 'react-redux';
import { editProgram } from '../../actions/growingProgram';
import { closeModal } from '../../actions/modal';
import {sendData} from '../../actions/socket';

/**Component of the modal window for editing  growing program (connect component)*/
class EditConfiguration extends React.Component{
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
            err:'',    
            container: this.props.content.container,
            containerId: this.props.content.containerId,
            id:  this.props.content.id,
            modules:  this.props.content.modules,
            type: 0,
            selectContainer: this.props.containers.find(container => container.id == this.props.content.containerId),
        }
        this.save = this.save.bind(this);
    }

    createModule(){
      return this.state.modules.map((el, i) => 
          <div key={i} className='block'>


              <div className='row modal-input-row'>
                  <div className='col-12 remove-block-button'>
                      <i class='fas fa-times' onClick={this.removeModule.bind(this, i)}></i>
                  </div>
              </div>


              <div className='row modal-input-row'>

              <div className='col-7'>
              <label  className='inp'>
                  <div className='select'>
                  <select  onChange={this.handleChangeIndicator.bind(this, i)} value={el.indicator||''} placeholder="&nbsp;">
                      <option selected disabled>Показатель среды</option>
                      <option value={'температура воздуха'}>Температура воздуха</option>
                      <option value={'влажность воздуха'}>Влажность воздуха</option>
                      <option value={'уровень освещенности'}>Уровень освещенности</option>
                      <option value={'период'}>Период</option>
                  </select>
                  </div>
              </label>
              </div>

              <div className='col-2'>
              <label  className='inp'>
                  <div className='select'>
                  <select onChange={this.handleChangeSign.bind(this, i)} placeholder="&nbsp;" value={el.sign||''}>
                      <option selected disabled>Условие</option>
                      <option value={'>'}>&lt;</option>
                      <option value={'<'}>&gt;</option>
                      <option value={'<='}>&le;</option>
                      <option value={'>='}>&ge;</option>
                      <option value={'='}>=</option>
                  </select>
                  </div>
              </label>
              </div>

              <div className='col-3'>
                  <label  className='inp'>
                      <input type='text' placeholder="&nbsp;" onChange={this.handleChangeValue.bind(this, i)} value={el.value||''}/>
                      <span className='label'></span>
                      <span className='border'></span>
                  </label>
              </div>
              </div>


              <div className='row modal-input-row'>
              <div className='col-6'>
              <label  className='inp'>
                  <div className='select'>
                  <select  onChange={this.handleChangeAction.bind(this, i)} placeholder="&nbsp;" value={el.action||''}>
                      <option selected disabled>Действие</option>
                      <option value={'включить'}>Включить</option>
                      <option value={'выключить'}>Выключить</option>
                      <option value={'установить параметр'}>Установить параметр</option>
                  </select>
                  </div>
              </label>
              </div>


              <div className='col-6'>
              <label  className='inp'>
                  <div className='select'>
                  <select onChange={this.handleChangeSensor.bind(this, i)}  placeholder="&nbsp;" value={el.sensor||''}>
                      <option selected disabled>Сенсор/Устройство</option>
                      {
                          this.state.selectContainer.sensors.map(sensor => (
                              <option value={sensor.sensorType}>Сенсор: {sensor.sensorType}</option>                           
                          ))
                      }

                      {
                          this.state.selectContainer.devices.map(device => (
                              <option value={device.deviceType}>Устройство: {device.deviceType}</option>                           
                          ))
                      }

                  </select>

                  </div>
              </label>
              </div>
              </div>
          
          </div>
          )      
      }

      handleChangeIndicator(i, event) {
        let modules = [...this.state.modules];
        modules[i] = {...modules[i], indicator:event.target.value};
        this.setState({ modules });
    }

    handleChangeSign(i, event) {
        let modules = [...this.state.modules];
        modules[i] = {...modules[i], sign:event.target.value};
        this.setState({ modules });
    }

    handleChangeValue(i, event) {
        let modules = [...this.state.modules];
        modules[i] = {...modules[i], value:event.target.value};
        this.setState({ modules });
    }

    handleChangeAction(i, event) {
        let modules = [...this.state.modules];
        modules[i] = {...modules[i], action:event.target.value};
        this.setState({ modules });
    }

    handleChangeSensor(i, event) {
        let modules = [...this.state.modules];
        modules[i] = {...modules[i], sensor:event.target.value};
        this.setState({ modules });
    }

    addModule(){
        this.setState(prevState => ({ modules: [...prevState.modules, {}]}))
      }


    removeModule(i){
        let modules = [...this.state.modules];
        modules.splice(i,1);
        this.setState({ modules });
    }


    changeType(event){
        const type = event.target.value;
        this.setState({type:type})
        console.log(type)

    }


    /** Triggers a close modal window action*/
    close(){
      this.props.dispatch(closeModal());
    }
    /** Triggers an action to create new growing program*/
    save(){
      const id = this.state.id;
      const containerId = this.state.containerId;
      const container = this.state.container;
      const modules = this.state.modules;
      const data = {
            id,
            containerId,
            container,
            modules
      };
      if ((data.modules !== '') && (data.container !== '')) {       
        this.props.editConfiguration(data);
        this.props.close();
      } else this.setState({err:'Все поля должны быть заполнены'})
    }
  //   changeContainer(event){
  //     const value = event.target.value;
  //     console.log(value)
  //     let selectContainer = this.props.containers.filter(container => container.id == value)
  //     this.setState({selectContainer:selectContainer[0]})
  //     this.setState(prevState => ({ modules: [...prevState.modules, {}]}))

  // }
    render(){
      let add = (Object.keys(this.state.selectContainer).length === 0) ? <p></p> : <div onClick={this.addModule.bind(this)}><i class='fas fa-plus'></i></div>

        return (
            <div>
            <div className='modal-body'>
            <p>{this.state.err}</p>

            <div className='row modal-input-row'>

              <div className='col-12'>
                <label  className='inp'>
                  <input type='text' placeholder="&nbsp;" value={this.state.container} />
                    <span className='label'>Котейнер</span>
                    <span className='border'></span>
                </label>
              </div>

            </div>
              <div className='row modal-input-row'>

                {/* <div className='col-12'>
                  <label  className='inp'>
                    <div className='select'>
                    <select value={this.state.containerId}  onChange={this.changeContainer.bind(this)} placeholder="&nbsp;">
                        <option  selected disabled>Контейнер</option> 
                        {
                            this.props.containers.map(container => (
                                <option value={container.id}>{container.name}</option>                           
                            ))
                        }

                    </select>

                    </div>
                  </label>
                </div> */}

              </div> 
              <div>
                {(this.state.modules.length == 0)? "" : <div><h5>Условия</h5>{this.createModule()}</div>}
            </div>
            {add}

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
        containers: state.containerReducer
    };
  };
const mapDispatchToProps = dispatch => ({
    editConfiguration: data => {
        dispatch(sendData(data,'EDIT_CONFIGURATION'))
        // dispatch(editProgram(data));
    },
    close: () => {
      dispatch(closeModal())
    },
  });

export default connect(mapStateToProps,mapDispatchToProps)(EditConfiguration);