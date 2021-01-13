import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal';

import {sendData} from '../../actions/socket';

import { editContainer } from '../../actions/container';

/**Component of the modal window for editing group data (connect component)*/
class EditContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            id:this.props.content.id,
            name:this.props.content.name,
            address:this.props.content.address,
            channel:this.props.content.channel,
            sensors:this.props.content.sensors,
            devices:this.props.content.devices,
            err:''
        }
        this.save = this.save.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeAddress = this.changeAddress.bind(this);
        this.changeChannel = this.changeChannel.bind(this);

        
    }

    close(){
        this.props.dispatch(closeModal());
    }
    save(){
      const id = this.state.id;
      const name = this.state.name;
      const address = this.state.address;
      const channel = this.state.channel;
      const sensors = this.state.sensors;
      const devices = this.state.devices;
      if (name !== '') {
          const data = {
              id,
              name,
              address,
              channel,
              sensors,
              devices
          };
          this.setState({err:''})
          this.props.editContainer(data);
          // this.close();
      }
      else this.setState({err:'Все поля должны быть заполнены'})
    }

    changeName(event) {
      this.setState({name: event.target.value });
    }
    changeChannel(event) {
      this.setState({channel: event.target.value });
    }
    changeAddress(event) {
      this.setState({address: event.target.value });
    }

    createSensor(){
      return this.state.sensors.map((el, i) =>  
          <div key={i} className='block'>
              <div className='row modal-input-row'>
                  <div className='col-5'>
                      <label  className='inp'>
                          <input type='text' value={el.module||''} onChange={this.handleChangeSensorModule.bind(this, i)} placeholder="&nbsp;"/>
                          <span className='label'># модуля (платы)</span>
                          <span className='border'></span>
                      </label>
                  </div>
                  <div className='col-7 remove-block-button'>
                      <i class='fas fa-times' onClick={this.removeSensor.bind(this, i)}></i>
                  </div>
              </div>

              <div className='row modal-input-row'>
                  <div className='col-6'>
                  <label  className='inp'>
                      <div className='select'>
                      <select onChange={this.handleChangeSensorType.bind(this, i)} placeholder="&nbsp;" value={el.sensorType||''}>
                          <option selected disabled>Тип сенсора</option>
                          <option value="Температура воздуха">Температура воздуха</option>
                          <option value="Влажность воздуха">Влажность воздуха</option>
                          <option value="Уровень освещенности">Уровень освещенности</option>
                      </select>
                      </div>
                  </label>
                  </div>
              </div>

          </div>          
          )      
      }

      createDevice(){
          return this.state.devices.map((el, i) => 
              <div key={i} className='block'>
                  <div className='row modal-input-row'>
                      <div className='col-6'>
                          <label  className='inp'>
                              <input type='text' value={el.module||''} onChange={this.handleChangeDeviceModule.bind(this, i)} placeholder="&nbsp;"/>
                              <span className='label'># модуля (платы)</span>
                              <span className='border'></span>
                          </label>
                      </div>
                      <div className='col-6 remove-block-button'>
                          <i class='fas fa-times' onClick={this.removeDevice.bind(this, i)}></i>
                      </div>
                  </div>

                  <div className='row modal-input-row'>
                      <div className='col-6'>
                      <label  className='inp'>
                          <div className='select'>
                          <select onChange={this.handleChangeDeviceType.bind(this, i)} placeholder="&nbsp;" value={el.deviceType||''}>
                              <option selected disabled>Тип устройства</option>
                              <option value="Фитолампа">Фитолампа</option>
                          </select>
                          </div>
                      </label>
                      </div>

                      <div className='col-6'>
                          <label  className='inp'>
                              <div className='select'>
                              <select onChange={this.handleChangeDeviceTypeTime.bind(this, i)} placeholder="&nbsp;" value={el.deviceTypeTime||''}>
                                  <option selected disabled>Тип рабочего времени</option>
                                  <option value="Часы">Часы</option>
                                  <option value="Минуты">Минуты</option>

                              </select>
                              </div>
                          </label>
                      </div>

                  </div>
                  
                  <div className='row modal-input-row'>

                      <div className='col-6'>
                          <label  className='inp'>
                              <input type='text' value={el.deviceFrequency||''} onChange={this.handleChangeDeviceFrequency.bind(this, i)} placeholder="&nbsp;"/>
                              <span className='label'>Частота работы</span>
                              <span className='border'></span>
                          </label>
                      </div>
                      <div className='col-6'>
                          <label  className='inp'>
                              <input type='text' value={el.devicePeriod||''} onChange={this.handleChangeDevicePeriod.bind(this, i)} placeholder="&nbsp;"/>
                              <span className='label'>Период работы</span>
                              <span className='border'></span>
                          </label>
                      </div>

                  </div>
                  <div className='row modal-input-row'>

                      <div className='col-12'>
                          <label  className='inp'>
                              <input type='text' value={el.deviceBias||''} onChange={this.handleChangeDeviceBias.bind(this, i)} placeholder="&nbsp;"/>
                              <span className='label'>Смещения относительно начала отсчёта</span>
                              <span className='border'></span>
                          </label>
                      </div>
                      </div>

              </div>          
              )      
          }

          handleChangeDeviceType(i, event) {
            let devices = [...this.state.devices];
            devices[i] = {...devices[i], deviceType:event.target.value};
            this.setState({ devices });
        }
    
    
        handleChangeDeviceTypeTime(i, event) {
            let devices = [...this.state.devices];
            devices[i] = {...devices[i], deviceTypeTime:event.target.value};
            this.setState({ devices });
        }
    
        
        handleChangeDeviceFrequency(i, event) {
            console.log('3')
            let devices = [...this.state.devices];
            devices[i] = {...devices[i], deviceFrequency:event.target.value};
            this.setState({ devices });
        }
    
        handleChangeDevicePeriod(i, event) {
            let devices = [...this.state.devices];
            devices[i] = {...devices[i], devicePeriod:event.target.value};
            this.setState({ devices });
        }
    
        handleChangeDeviceBias(i, event) {
            let devices = [...this.state.devices];
            devices[i] = {...devices[i], deviceBias:event.target.value};
            this.setState({ devices });
        }
    
        handleChangeDeviceModule(i, event) {
            let devices = [...this.state.devices];
            devices[i] = {...devices[i], module:event.target.value};
            this.setState({ devices });
        }
    
        handleChangeSensorModule(i, event) {
            let sensors = [...this.state.sensors];
            sensors[i] = {...sensors[i], module:event.target.value};
            this.setState({ sensors });
        }
        
        handleChangeSensorType(i, event) {
            let sensors = [...this.state.sensors];
            sensors[i] = {...sensors[i], sensorType:event.target.value};
            this.setState({ sensors });
        }
    
    
    
        addSensor(){
          this.setState(prevState => ({ sensors: [...prevState.sensors, {}]}))
        }
      
        addDevice(){
            this.setState(prevState => ({ devices: [...prevState.devices, {}]}))
        }
    
        removeSensor(i){
            let sensors = [...this.state.sensors];
            sensors.splice(i,1);
            this.setState({ sensors });
        }
    
        removeDevice(i){
            let sensors = [...this.state.sensors];
            sensors.splice(i,1);
            this.setState({ sensors });
        }

   
    render(){
        
        return (
            <div>
                <div class='modal-body'>
                  <p>{this.state.err}</p>

                    <div className='row modal-input-row'>

                      <div className='col-12'>
                        <label  className='inp'>
                          <input type='text' placeholder="&nbsp;" onChange={this.changeName} value={this.state.name} />
                            <span className='label'>Название группы</span>
                            <span className='border'></span>
                        </label>
                      </div>

                    </div>

                    <div className='row modal-input-row'>

                      <div className='col-12'>
                        <label  className='inp'>
                            <input type='text' placeholder="&nbsp;" onChange={this.changeChannel} value={this.state.channel}/>
                            <span className='label'>Числовое значение номера частотного канала</span>
                            <span className='border'></span>
                        </label>
                      </div>

                    </div>

                    <div className='row modal-input-row'>

                      <div className='col-12'>
                        <label  className='inp'>
                          <input type='text' placeholder="&nbsp;" onChange={this.changeAddress} value={this.state.address} />
                            <span className='label'>Адрес группы (1-1023)</span>
                            <span className='border'></span>
                        </label>
                      </div>

                    </div>

                    <h5>Добавить устройсво или сенсор</h5>
                    <div>
                        <button className="btn btn-sensor" onClick={this.addSensor.bind(this)}>Сенсор</button>     
                        <button className="btn btn-sensor " onClick={this.addDevice.bind(this)}>Устройство</button> 
                    </div>

                    <div>
                        {(this.state.sensors.length == 0)? "" : <div><h5>Сенсоры</h5>{this.createSensor()}</div>}
                    </div>

                    <div>
                        {(this.state.devices.length == 0)? "" : <div><h5>Устройства</h5>{this.createDevice()}</div>}
                    </div>

                        
                </div>
                <div class='modal-footer'>
                    <button type='button' className='btn btn-primary' onClick={this.save}>Сохранить</button>
                    <button type='button' className='btn btn-secondary' onClick={this.props.close}>Закрыть</button>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        modal: state.modal,
        container: state.containerReducer,
    };
  };
const mapDispatchToProps = dispatch => ({
    editContainer: data => {
        dispatch(sendData(data,'EDIT_CONTAINER'))
        console.log(data)
        // dispatch(editContainer(data));
    },
    close: () => {
      dispatch(closeModal())
    },
    
  });

export default connect(mapStateToProps,mapDispatchToProps)(EditContainer);