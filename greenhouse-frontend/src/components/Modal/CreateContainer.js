import React from 'react';
import {connect} from 'react-redux';
import {closeModal} from '../../actions/modal';
import {sendData} from '../../actions/socket';
import uuidv4  from 'uuid/v4';

import { createContainer } from '../../actions/container';
import api from '../../api/api';

class CreateContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            devices: [],
            sensors: [],
            err:''
          }

          
        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
    }

      createModuleSensor(){
        return this.state.sensors.map((el, i) =>  
            <div key={i} className='block'>
                <div className='row modal-input-row'>
                    <div className='col-5'>
                        <label  className='inp'>
                            <input type='text' value={el.period||''} onChange={this.handleChangeSensorModulePeriod.bind(this, i)} placeholder="&nbsp;"/>
                            <span className='label'>Период ( количество минут )</span>
                            <span className='border'></span>
                        </label>
                    </div>
                    <div className='col-5'>
                        <label  className='inp'>
                            <input type='text' value={el.count||''} onChange={this.handleChangeSensorModuleCount.bind(this, i)} placeholder="&nbsp;"/>
                            <span className='label'>Количество модулей</span>
                            <span className='border'></span>
                        </label>
                    </div>
                    <div className='col-2 remove-block-button'>
                        <i class='fas fa-times' onClick={this.removeSensorModule.bind(this, i)}></i>
                    </div>
                </div>


                {/* {this.createSensor(i)}  */}
                {(this.state.sensors[i].structure.length == 0)? "" : <div>{this.createSensor(i)}</div>}
                <div onClick={this.addSensor.bind(this, i)}>
                    <i class='fas fa-plus'></i><span> добавить сенсор к модулю (плате)</span>
                </div>
                

            </div>          
            )      
        }

        createModuleDevice(){
            return this.state.devices.map((el, i) => 
                <div key={i} className='block'>

                    <div className='row modal-input-row'>
                        <div className='col-5'>
                            <label  className='inp'>
                                <input type='text' value={el.period||''} onChange={this.handleChangeDeviceModulePeriod.bind(this, i)} placeholder="&nbsp;"/>
                                <span className='label'>Период ( количество минут )</span>
                                <span className='border'></span>
                            </label>
                        </div>
                        <div className='col-5'>
                            <label  className='inp'>
                                <input type='text' value={el.count||''} onChange={this.handleChangeDeviceModuleCount.bind(this, i)} placeholder="&nbsp;"/>
                                <span className='label'>Количество модулей</span>
                                <span className='border'></span>
                            </label>
                        </div>
                        <div className='col-2 remove-block-button'>
                            <i class='fas fa-times' onClick={this.removeDeviceModule.bind(this, i)}></i>
                        </div>
                    </div>

                {(this.state.devices[i].structure.length == 0)? "" : <div>{this.createDevice(i)}</div>}
                <div onClick={this.addDevice.bind(this, i)}>
                    <i class='fas fa-plus'></i><span> добавить устройство к модулю (плате)</span>
                </div>

                </div>          
                )      
            }

            createSensor(i){
                return this.state.sensors[i].structure.map((el, o) => 
                    <div key={o} className='block'>
                        <div className='row modal-input-row'>
                            <div className='col-5'>
                                <label  className='inp'>
                                    <div className='select'>
                                    <select onChange={this.handleChangeSensorType.bind(this, i, o)} placeholder="&nbsp;">
                                        <option selected disabled>Тип сенсора</option>
                                        <option>Температура воздуха</option>
                                        <option>Влажность воздуха</option>
                                        <option>Уровень освещенности</option>
                                    </select>
                                    </div>
                                </label>
                            </div>
                            <div className='col-5'>
                                <label  className='inp'>
                                    <input type='text' value={el.count||''} onChange={this.handleChangeSensorCount.bind(this, i,o)} placeholder="&nbsp;"/>
                                    <span className='label'>Количество модулей</span>
                                    <span className='border'></span>
                                </label>
                            </div>
                            <div className='col-2 remove-block-button'>
                                <i class='fas fa-times' onClick={this.removeSensor.bind(this, i, o)}></i>
                            </div>
                        </div>

                    </div>          
                    )      
                }

                createDevice(i){
                    return this.state.devices[i].structure.map((el, o) => 
                        <div key={o} className='block'>
                            <div className='row modal-input-row'>
                                <div className='col-12 remove-block-button'>
                                    <i class='fas fa-times' onClick={this.removeDevice.bind(this, i)}></i>
                                </div>
                            </div>
                            <div className='row modal-input-row'>
                                                    <div className='col-6'>
                                                    <label  className='inp'>
                                                        <div className='select'>
                                                        <select onChange={this.handleChangeDeviceType.bind(this, i, o)} placeholder="&nbsp;">
                                                            <option selected disabled>Тип устройства</option>
                                                            <option>Фитолампа</option>
                                                        </select>
                                                        </div>
                                                    </label>
                                                    </div>

                                                    <div className='col-6'>
                                                        <label  className='inp'>
                                                            <div className='select'>
                                                            <select onChange={this.handleChangeDeviceTypeTime.bind(this, i, o)} placeholder="&nbsp;">
                                                                <option selected disabled>Тип рабочего времени</option>
                                                                <option>Часы</option>
                                                                <option>Минуты</option>

                                                            </select>
                                                            </div>
                                                        </label>
                                                    </div>

                                                </div>
                                                
                                                <div className='row modal-input-row'>

                                                    <div className='col-6'>
                                                        <label  className='inp'>
                                                            <input type='text' value={el.frequency||''} onChange={this.handleChangeDeviceFrequency.bind(this, i, o)} placeholder="&nbsp;"/>
                                                            <span className='label'>Частота работы</span>
                                                            <span className='border'></span>
                                                        </label>
                                                    </div>
                                                    <div className='col-6'>
                                                        <label  className='inp'>
                                                            <input type='text' value={el.period||''} onChange={this.handleChangeDevicePeriod.bind(this, i, o)} placeholder="&nbsp;"/>
                                                            <span className='label'>Период работы</span>
                                                            <span className='border'></span>
                                                        </label>
                                                    </div>

                                                </div>
                                                <div className='row modal-input-row'>

                                                    <div className='col-6'>
                                                        <label  className='inp'>
                                                            <input type='text' value={el.bias||''} onChange={this.handleChangeDeviceBias.bind(this, i, o)} placeholder="&nbsp;"/>
                                                            <span className='label'>Смещения относительно начала отсчёта</span>
                                                            <span className='border'></span>
                                                        </label>
                                                    </div>

                                                    <div className='col-6'>
                                                        <label  className='inp'>
                                                            <input type='text' value={el.count||''} onChange={this.handleChangeDeviceCount.bind(this, i, o)} placeholder="&nbsp;"/>
                                                            <span className='label'>Количество одинаковых устройств</span>
                                                            <span className='border'></span>
                                                        </label>
                                                    </div>
                                                </div>
                        </div>          
                        )      
                    }


    handleChangeDeviceType(i, o, event) {
        let devices = [...this.state.devices];
        devices[i].structure[o].type = event.target.value;
        this.setState({ devices });
    }


    handleChangeDeviceTypeTime(i, o, event) {
        let devices = [...this.state.devices];
        devices[i].structure[o].time_type = event.target.value;
        this.setState({ devices });
    }

    
    handleChangeDeviceFrequency(i, o, event) {
        let devices = [...this.state.devices];
        devices[i].structure[o].frequency = event.target.value;
        this.setState({ devices });
    }

    handleChangeDevicePeriod(i, o, event) {
        let devices = [...this.state.devices];
        devices[i].structure[o].period = event.target.value;
        this.setState({ devices });
    }

    handleChangeDeviceBias(i, o, event) {
        let devices = [...this.state.devices];
        devices[i].structure[o].bias = event.target.value;
        this.setState({ devices });
    }

    handleChangeDeviceCount(i, o, event) {
        let devices = [...this.state.devices];
        devices[i].structure[o].count = event.target.value;
        this.setState({ devices });
    }

    handleChangeDeviceModulePeriod(i, event) {
        let devices = [...this.state.devices];
        devices[i].period = event.target.value;
        this.setState({ devices });
    }

    handleChangeDeviceModuleCount(i, event) {
        let devices = [...this.state.devices];
        devices[i].count = event.target.value;
        this.setState({ devices });
    }


    handleChangeSensorModulePeriod(i, event) {
        let sensors = [...this.state.sensors];
        sensors[i].period = event.target.value;
        this.setState({ sensors });
    }

    handleChangeSensorModuleCount(i, event) {
        let sensors = [...this.state.sensors];
        sensors[i].count = event.target.value;
        this.setState({ sensors });
    }
    
    handleChangeSensorType(i, o, event) {
        let sensors = [...this.state.sensors];
        sensors[i].structure[o].type = event.target.value;
        this.setState({ sensors });
    }

    handleChangeSensorCount(i, o, event) {
        let sensors = [...this.state.sensors];
        sensors[i].structure[o].count = event.target.value;
        this.setState({ sensors });
    }

    addModuleSensor(){
      this.setState(prevState => ({ sensors: [...prevState.sensors, {structure:[], period:''}]}))
    }

    addSensor(i, event){
        let sensors = [...this.state.sensors];
        // sensors[i].stucture = [{}];
        sensors[i].structure.push({type:""});

        // this.setState(prevState => ({ sensors: [...prevState.sensors, {}]}))
        this.setState({ sensors });
      }

    addDevice(i, event){
        let devices = [...this.state.devices];
        // sensors[i].stucture = [{}];
        devices[i].structure.push({type:""});

        // this.setState(prevState => ({ sensors: [...prevState.sensors, {}]}))
        this.setState({ devices });
      }
  
    addModuleDevice(){
        this.setState(prevState => ({ devices: [...prevState.devices, {structure:[], period:''}]}))
    }

    removeSensorModule(i){
        let sensors = [...this.state.sensors];
        sensors.splice(i,1);
        this.setState({ sensors });
    }

    removeDeviceModule(i){
        let devices = [...this.state.devices];
        devices.splice(i,1);
        this.setState({ devices });
    }


    removeSensor(i,o){
        let sensors = [...this.state.sensors];
        sensors[i].structure.splice(o,1);
        this.setState({ sensors });
    }

    removeDevice(i,o){
        let devices = [...this.state.devices];
        devices[i].structure.splice(o,1);
        this.setState({ devices });
    }

    close(){
        this.props.close();
    }
    
    save = async () =>{
        
        const id = uuidv4();
        const name = this.getName.value;
        const address = this.getAddress.value;
        const channel = this.getChannel.value;
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
            console.log(data)
            this.setState({err:''})
            // this.props.createContainer(data);
            await api.insertMovie(data).then(res => {
                window.alert(`Movie inserted successfully`)
                // this.setState({
                //     name: '',
                //     rating: '',
                //     time: '',
                // })
            })
            this.close();
        }
        else this.setState({err:'Все поля должны быть заполнены'})
    }
    render(){
       
        return (
            <div>
              <p>{this.state.err}</p>
                <div className='modal-body'>

                    <div className='row modal-input-row'>
                      <div className='col-12'>
                        <label  className='inp'>
                          <input type='text' placeholder="&nbsp;" ref={input => (this.getName = input)} />
                            <span className='label'>Название группы</span>
                            <span className='border'></span>
                        </label>
                      </div>
                    </div>

                    <div className='row modal-input-row'>

                        <div className='col-12'>
                        <label  className='inp'>
                            <input type='text' placeholder="&nbsp;" ref={input => (this.getChannel = input)} />
                            <span className='label'>Числовое значение номера частотного канала</span>
                            <span className='border'></span>
                        </label>
                        </div>

                    </div>

                    <div className='row modal-input-row'>

                      <div className='col-12'>
                        <label  className='inp'>
                          <input type='text' placeholder="&nbsp;" ref={input => (this.getAddress = input)} />
                            <span className='label'>Адрес группы (1-1023)</span>
                            <span className='border'></span>
                        </label>
                      </div>

                    </div>

            <h5>Добавить плату (модуль) для устройств или сенсоров</h5>
            <div>
                <button className="btn btn-sensor" onClick={this.addModuleSensor.bind(this)}>Для сенсоров</button>     
                <button className="btn btn-sensor " onClick={this.addModuleDevice.bind(this)}>Для устройств</button> 
            </div>

            <div>
                {(this.state.sensors.length == 0)? "" : <div><h5> Платы (модули) сенсоров</h5>{this.createModuleSensor()}</div>}
            </div>

            <div>
                {(this.state.devices.length == 0)? "" : <div><h5>Платы (модули) устройств</h5>{this.createModuleDevice()}</div>}
            </div>


                        
                </div>
                <div class='modal-footer'>
                    <button type='button' className='btn btn-success' onClick={this.save}>Сохранить</button>
                    <button type='button' className='btn btn-secondary' onClick={this.close}>Закрыть</button>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        modal: state.modalReducer,
        devices: state.deviceReducer,
        group: state.groupReducer
    };
  };
const mapDispatchToProps = dispatch => ({
    createContainer: data => {
        dispatch(sendData(data,'CREATE_CONTAINER'))
        dispatch(createContainer(data))
        // console.log(data)
    },
    close: () => {
      dispatch(closeModal())
    },
    
  });
export default connect(mapStateToProps,mapDispatchToProps)(CreateContainer);