import React from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';
import api from '../../../api/api';

class ContainerDetails extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            devices: [],
            sensors: [],
            name: '',
            address: '',
            channel: '',
            err:''
          }
        this.save = this.save.bind(this);
    }

    createModuleSensor(){
      return this.state.sensors.map((el, i) =>  
        <>
          <Grid
            container
            spacing={3}
            key={i}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <Typography
                color="textPrimary"
                variant="h6"
              >
                Плата (модуль) для сенсоров № {i+1}:
              </Typography>
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Период ( количество минут )"
                name="period"
                type="number"
                onChange={this.handleChangeSensorModulePeriod.bind(this, i)}
                required
                value={el.period||''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Количество модулей"
                name="count"
                type="number"
                onChange={this.handleChangeSensorModuleCount.bind(this, i)}
                required
                value={el.count||''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={2}
              xs={12}
            >
              <Button
                color="default"
                onClick={this.removeSensorModule.bind(this)}
              >
              Удалить модуль
              </Button>
            </Grid>
            <Grid
              item
              md={2}
              xs={12}
            >
              <Button
                color="primary"
                onClick={this.addSensor.bind(this, i)}
              >
                добавить сенсор к модулю (плате)
              </Button>
            </Grid>
          </Grid>
          {(this.state.sensors[i].structure.length === 0)? "" : <div>{this.createSensor(i)}</div>}
        </>
      )      
    }

    createModuleDevice(){
      return this.state.devices.map((el, i) => 
        <>
          <Grid
            container
            spacing={3}
            key={i}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <Typography
                color="textPrimary"
                variant="h6"
              >
                Плата (модуль) для устройств № {i+1}:
              </Typography>
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Период ( количество минут )"
                name="period"
                type="number"
                onChange={this.handleChangeDeviceModulePeriod.bind(this, i)}
                required
                value={el.period||''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Количество модулей"
                name="count"
                type="number"
                onChange={this.handleChangeDeviceModuleCount.bind(this, i)}
                required
                value={el.count||''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={2}
              xs={12}
            >
            <Button
              color="default"
              onClick={this.removeDeviceModule.bind(this)}
            >
              Удалить модуль
            </Button>
            </Grid>
            <Grid
              item
              md={2}
              xs={12}
            >
              <Button
                color="primary"
                onClick={this.addDevice.bind(this, i)}
              >
                добавить устройство к модулю (плате)
              </Button>
            </Grid>
          </Grid>      
          {(this.state.devices[i].structure.length === 0)? "" : <div>{this.createDevice(i)}</div>}
        </>
      )      
    }

    createSensor(i){
      return this.state.sensors[i].structure.map((el, o) => 
        <Grid
          container
          spacing={3}
          key={o}
        > 
          <Grid
            item
            md={12}
            xs={12}
          >
            <Typography
              color="textPrimary"
              variant="h6"
            >
              Сенсор {o+1} для платы № {i+1}:
            </Typography>
          </Grid>
          <Grid
            item
            md={4}
            xs={12}
          >
            <TextField
              fullWidth
              label="Тип сенсора"
              name="type"
              required
              select
              SelectProps={{ native: true }}
              onChange={this.handleChangeSensorType.bind(this, i, o)}
              value={el.type||''}
              defaultValue=""
              variant="outlined"
            >
              <option value='Analog_signal'>Аналоговый сигнал</option>
              <option value='Discrete_signal'>Дискретный сигнал (до 8 в одном пакете)</option>
              <option value='Battery_charge'>Заряд аккумулятора</option>
              <option value='Air_humidity'>Влажность воздуха</option>
              <option value='Air_temperature'>Температура воздуха</option>
              <option value='Water_temperature'>Температура воды</option>
              <option value='Illumination_level'>Уровень освещённости</option>
              <option value='Lamp_power'>Мощность ламп</option>
              <option value='Pump_power'>Мощность насосов</option>
              <option value='Indicator_pH'>Показатель pH</option>
              <option value='Indicator_EC'>Показатель ЕС</option>
              <option value='Indicator_eCO2'>Показатель eCO2</option>
              <option value='Indicator_nYVOC'>Показатель nTVOC</option>
            </TextField>
          </Grid>
          <Grid
            item
            md={4}
            xs={12}
          >
            <TextField
              fullWidth
              label="Количество"
              name="count"
              onChange={this.handleChangeSensorCount.bind(this, i,o)}
              required
              type="number"
              value={el.count||''}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={2}
            xs={12}
          >
            <Button
              color="default"
              onClick={this.removeSensor.bind(this, i, o)}
            >
              Удалить сенсор
            </Button>
          </Grid>
        </Grid>
      )      
    }

    createDevice(i){
      return this.state.devices[i].structure.map((el, o) => 
        <Grid
          container
          spacing={3}
          key={o}
        > 
          <Grid
            item
            md={12}
            xs={12}
          >
            <Typography
              color="textPrimary"
              variant="h6"
            >
              Устройство {o+1}  для платы № {i+1}:
            </Typography>
          </Grid>
          <Grid
            item
            md={4}
            xs={12}
          >
            <TextField
              fullWidth
              label="Тип устройства"
              name="type"
              required
              select
              SelectProps={{ native: true }}
              onChange={this.handleChangeDeviceType.bind(this, i, o)}
              value={el.type||''}
              defaultValue=""
              variant="outlined"
            >
              <option value='Signal_PWM'>ШИМ сигнал (ШИМ — от 0 до 4095)</option>
              <option value='Signal_digital'>Цифровой сигнал (0 или 1)</option>
              <option value='Fan_PWM'>Вентилятор (ШИМ)</option>
              <option value='Pumping_system'>Насосная система (0|1)</option>
              <option value='Phytolamp_digital'>Фитолампа (0|1)</option>
              <option value='Phytolamp_PWM'>Фитолампа (ШИМ)</option>                              
            </TextField>
          </Grid>
          <Grid
            item
            md={4}
            xs={12}
          >
            <TextField
              fullWidth
              label="Тип рабочего времени"
              name="time_type"
              required
              select
              SelectProps={{ native: true }}
              onChange={this.handleChangeDeviceTypeTime.bind(this, i, o)}
              value={el.time_type||''}
              defaultValue=""
              variant="outlined"
            >
              <option value='hour'>Часы</option>
              <option value='minute'>Минуты</option>
            </TextField>
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Частота работы"
                name="frequency"
                type="number"
                onChange={this.handleChangeDeviceFrequency.bind(this, i, o)}
                required
                value={el.frequency||''}
                variant="outlined"
              />
          </Grid>
          <Grid
            item
            md={4}
            xs={12}
          >
            <TextField
              fullWidth
              label="Период работы"
              name="period"
              type="number"
              onChange={this.handleChangeDevicePeriod.bind(this, i, o)}
              required
              value={el.period||''}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={4}
            xs={12}
          >
            <TextField
              fullWidth
              label="Смещения относительно начала отсчёта"
              name="bias"
              type="number"
              onChange={this.handleChangeDeviceBias.bind(this, i, o)}
              required
              value={el.bias||''}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={4}
            xs={12}
          >
            <TextField
              fullWidth
              label="Количество одинаковых устройств"
              name="count"
              type="number"
              onChange={this.handleChangeDeviceCount.bind(this, i, o)}
              required
              value={el.count||''}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={2}
            xs={12}
          >
            <Button
              color="default"
              onClick={this.removeDevice.bind(this, i)}
            >
              Удалить устройство
            </Button>
          </Grid>
        </Grid>        
      )      
    }

    handleChangeName(event) {
      this.setState({ name:event.target.value });
    }

    handleChangeAddress(event) {
      this.setState({ address:parseInt(event.target.value) });
    }
    
    handleChangeChannel(event) {
      this.setState({ channel:parseInt(event.target.value) });
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
        devices[i].structure[o].frequency = parseInt(event.target.value);
        this.setState({ devices });
    }

    handleChangeDevicePeriod(i, o, event) {
        let devices = [...this.state.devices];
        devices[i].structure[o].period = parseInt(event.target.value);
        this.setState({ devices });
    }

    handleChangeDeviceBias(i, o, event) {
        let devices = [...this.state.devices];
        devices[i].structure[o].bias = parseInt(event.target.value);
        this.setState({ devices });
    }

    handleChangeDeviceCount(i, o, event) {
        let devices = [...this.state.devices];
        devices[i].structure[o].count = parseInt(event.target.value);
        this.setState({ devices });
    }

    handleChangeDeviceModulePeriod(i, event) {
        let devices = [...this.state.devices];
        devices[i].period = parseInt(event.target.value);
        this.setState({ devices });
    }

    handleChangeDeviceModuleCount(i, event) {
        let devices = [...this.state.devices];
        devices[i].count = parseInt(event.target.value);
        this.setState({ devices });
    }

    handleChangeSensorModulePeriod(i, event) {
        let sensors = [...this.state.sensors];
        sensors[i].period = parseInt(event.target.value);
        this.setState({ sensors });
    }

    handleChangeSensorModuleCount(i, event) {
        let sensors = [...this.state.sensors];
        sensors[i].count = parseInt(event.target.value);
        this.setState({ sensors });
    }
    
    handleChangeSensorType(i, o, event) {
        let sensors = [...this.state.sensors];
        sensors[i].structure[o].type = event.target.value;
        this.setState({ sensors });
    }

    handleChangeSensorCount(i, o, event) {
        let sensors = [...this.state.sensors];
        sensors[i].structure[o].count = parseInt(event.target.value);
        this.setState({ sensors });
    }

    addModuleSensor(){
      this.setState(prevState => ({ sensors: [...prevState.sensors, {structure:[], period:''}]}))
    }

    addSensor(i, event){
        let sensors = [...this.state.sensors];
        sensors[i].structure.push({type:""});
        this.setState({ sensors });
      }

    addDevice(i, event){
        let devices = [...this.state.devices];
        devices[i].structure.push({type:""});
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
    
    save = async () => {
        const name = this.state.name;
        const address = parseInt(this.state.address);
        const channel = parseInt(this.state.channel);
        const sensors = this.state.sensors;
        const devices = this.state.devices;
        const greenhouse = this.props.greenhouse.id;
        const wifi = {
              "name": "name",
              "pass": "password",
              "ip": "192.168.0.13"
            }
        if (name !== '') {
            const data = {
                name,
                address,
                channel,
                sensors,
                devices,
                greenhouse,
                wifi
            };
            this.setState({err:''})
            await api.insertContainer(data).then(res => {
                window.alert('Контейнер добавлен успешно!')
                this.setState({
                  devices: [],
                  sensors: [],
                  name: '',
                  address: '',
                  channel: '',
                  err:''
                })
            })
        }
        else this.setState({err:'Все поля должны быть заполнены'})
    }

    render(){

        return (

            <Card>

              <CardHeader
                title="Создать контейнер"
              />
              <Divider />
              <CardContent>

                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    md={4}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Название"
                      name="name"
                      onChange={this.handleChangeName.bind(this)}
                      required
                      value={this.state.name}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={4}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Номер частотного канала"
                      name="channel"
                      type="number"
                      onChange={this.handleChangeChannel.bind(this)}
                      required
                      value={this.state.channel}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={4}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Адрес группы"
                      name="address"
                      type="number"
                      onChange={this.handleChangeAddress.bind(this)}
                      required
                      value={this.state.address}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={12}
                    xs={12}
                  >
                    <Button
                      color="primary"
                      onClick={this.addModuleSensor.bind(this)}
                    >
                      Добавить плату (модуль) для сенсоров
                    </Button>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    xs={12}
                  >
                    <Button
                      color="primary"
                      onClick={this.addModuleDevice.bind(this)}
                    >
                      Добавить плату (модуль) для устройств
                    </Button>
                  </Grid>
                </Grid>

                <>{(this.state.sensors.length === 0)? "" : <>{this.createModuleSensor()}</>}</>
                <>{(this.state.devices.length === 0)? "" : <>{this.createModuleDevice()}</>}</>

              </CardContent>
              <Divider />
              <Box
                display="flex"
                justifyContent="flex-end"
                p={2}
              >
                <Button
                  color="primary"
                  variant="contained"
                  onClick={this.save}
                >
                  Сохранить
                </Button>
              </Box>
            </Card>
        );
    }
}
const mapStateToProps = state => {
    return {
        greenhouse: state.greenhouseReducer
    };
};

export default connect(mapStateToProps, null)(ContainerDetails);
