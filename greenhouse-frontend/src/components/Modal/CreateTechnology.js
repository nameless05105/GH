import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal';
import {sendData} from '../../actions/socket';
import uuidv4  from 'uuid/v4';
import { createTechnology } from '../../actions/technology';

/**Component of the modal window for creating new growing program (connect component)*/
class CreateTechnology extends React.Component{
      /** 
       * @param {array} this.state.blocks - Growing Program blocks
       */
      constructor(props){
          super(props)
          this.state = {
                // modules:[],
                // airHumiditySensors:[],
                // airTemperatureSensors:[],
                // lightSensors:[],
                // phytolampPWMSensors:[],
                type: 0,
                selectContainer: {},
                modules:[],

          };

          this.close = this.close.bind(this);
          this.save = this.save.bind(this);

          this.check = this.check.bind(this);
        
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
                    <select  onChange={this.handleChangeIndicator.bind(this, i)} placeholder="&nbsp;">
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
                    <select onChange={this.handleChangeSign.bind(this, i)} placeholder="&nbsp;">
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
                        <input type='text' placeholder="&nbsp;" onChange={this.handleChangeValue.bind(this, i)} />
                        <span className='label'></span>
                        <span className='border'></span>
                    </label>
                </div>
                </div>


                <div className='row modal-input-row'>
                <div className='col-6'>
                <label  className='inp'>
                    <div className='select'>
                    <select  onChange={this.handleChangeAction.bind(this, i)} placeholder="&nbsp;">
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
                    <select onChange={this.handleChangeSensor.bind(this, i)}  placeholder="&nbsp;">
                        <option selected disabled>Сенсор/Устройство</option>
                        {/* {
                            this.state.selectContainer.sensors.sturucture.map(sensor => (
                                <option value={sensor.sensorType}>Сенсор: {sensor.type}</option>                           
                            ))
                        } */}

                        {
                            this.state.selectContainer.sensors.map(sensors => (
                                sensors.structure.map(sensor =>
                                    <option value={sensor.type}>Сенсор: {sensor.type}</option>                           
                                    ))
                                    )
                               
                        }

                        {
                            this.state.selectContainer.devices.map(devices => (
                                devices.structure.map(device =>
                                    <option value={device.type}>Устройство: {device.type}</option>                           
                                    ))
                                    )
                               
                        }       
{/* 
                        {
                            this.state.selectContainer.devices.structure.map(device => (
                                <option value={device.deviceType}>Устройство: {device.type}</option>                           
                            ))
                        } */}

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

    changeContainer(event){
        const value = event.target.value;
        console.log(value)
        let selectContainer = this.props.containers.filter(container => container.id == value)
        this.setState({selectContainer:selectContainer[0]})
        this.setState(prevState => ({ modules: [...prevState.modules, {}]}))

    }
    
    /** Triggers a close modal window action*/
    close(){
      this.props.close();
    }
    /** Triggers an action to create new growing program*/
    save(){
        const containerId = this.state.selectContainer.id;
        const container = this.state.selectContainer.name;
        const id = uuidv4();
        const modules = this.state.modules;
        const data = {
            id,
            containerId,
            container,
            modules
            };
        this.props.createConfiguration(data);
        this.close();
            
    }
    check(type){
        switch (type) {
            case "1":
            return <p className="configuration">t</p>
            case "2":
            return <p className="configuration">%</p>
            case "3":
            return <p className="configuration">%</p>
            case "4":
            return <p className="configuration">%</p>            
        }
    }
    
    render(){
        let i = this.check(this.state.type);
        let add = (Object.keys(this.state.selectContainer).length === 0) ? <p></p> : <div onClick={this.addModule.bind(this)}><i class='fas fa-plus'></i></div>

        return (
          <div>
            <div className='modal-body'>
            <p>{this.state.err}</p>

              <div className='row modal-input-row'>
                <div className='col-12'>
                  <label  className='inp'>
                    <div className='select'>
                    <select ref={input => (this.getContainer = input)}  onChange={this.changeContainer.bind(this)} placeholder="&nbsp;">
                        <option  selected disabled>Контейнер</option> 
                        {
                            this.props.containers.map(container => (
                                <option value={container.id}>{container.name}</option>                           
                            ))
                        }

                    </select>

                    </div>
                  </label>
                </div>
            </div>

            


            <div>
                {(this.state.modules.length == 0)? "" : <div><h5>Условия</h5>{this.createModule()}</div>}
            </div>
            {add}



        </div>
            <div class='modal-footer'>
              <button className='btn btn-success' onClick={this.save}>Сохранить</button>
            </div>
        </div>
      
        );
    }
}
const mapStateToProps = state => {
  return {
      modal: state.modalReducer,
      containers: state.containerReducer,
  };
};
const mapDispatchToProps = dispatch => ({
  createTechnology: data => {
      console.log(data)
      dispatch(sendData(data,'CREATE_TECHNOLOGY'))
      dispatch(createTechnology(data))
  },
  close: () => {
    dispatch(closeModal())
  },
  
});
export default connect(mapStateToProps,mapDispatchToProps)(CreateTechnology);