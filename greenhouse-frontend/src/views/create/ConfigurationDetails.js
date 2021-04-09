import React  from 'react';
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
  Typography,
  List,
  ListItem,
  IconButton,
  ListItemSecondaryAction,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import api from '../../api/api';

class ConfigurationDetails extends React.Component{
  constructor(props){
    super(props)
    this.state = {
        name: '',
        containers: [],
        modules: [],
        technology: {
          illumination: '',
          temperature: '',
          humidity: ''
        },
        container: {},
        err:''
      }
    this.save = this.save.bind(this);
  }

  async componentDidMount(){
    const modules = await api.getAllContainers(this.props.greenhouse.id);
      this.setState(
        {
          containers: modules.data.data,
          modules: [],
        }
      )
  }

  async loadTechnology (id) {
    const technology = await api.getTechnologyByContainerId(id);
    this.setState(
      {
        technology: technology.data.data
      }
    )
  }

  handleContainerChange (event) {
    const container = this.state.containers.find(container => container._id === event.target.value);
    this.loadTechnology(event.target.value); 
    this.setState(
      {
        container: container
      }
    )
  };

  handleChangeName(event) {
    this.setState({ name:event.target.value });
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

  removeModule(i){
    let modules = [...this.state.modules];
    modules.splice(i,1);
    this.setState({ modules });
  }

  createModules(){
    return this.state.modules.map((el, i) => 
    <ListItem>
      <Grid
        container
        spacing={3}
        key={i}
        paddingLeft={1}
        paddingRight={1}
      >  
      
        <Grid
          item
          md={3}
          xs={12}
        >
          <TextField
            fullWidth
            label="Показатель среды"
            name="indicator"
            required
            select
            SelectProps={{ native: true }}
            onChange={this.handleChangeIndicator.bind(this, i)}
            variant="outlined"
          >
              <option value=''></option>
              <option value={'температура воздуха'}>Температура воздуха</option>
              <option value={'влажность воздуха'}>Влажность воздуха</option>
              <option value={'уровень освещенности'}>Уровень освещенности</option>
              <option value={'период'}>Период</option>
          </TextField>
        </Grid>
        <Grid
          item
          md={2}
          xs={12}
        >
          <TextField
            fullWidth
            label="Условие"
            name="sign"
            required
            select
            SelectProps={{ native: true }}
            onChange={this.handleChangeSign.bind(this, i)}
            variant="outlined"
          >
              <option value=''></option>
              <option value={'>'}>&lt;</option>
              <option value={'<'}>&gt;</option>
              <option value={'<='}>&le;</option>
              <option value={'>='}>&ge;</option>
              <option value={'='}>=</option>
          </TextField>
        </Grid>
        <Grid
          item
          md={2}
          xs={12}
        >
          <TextField
            fullWidth
            label="Значение"
            name="value"
            required
            SelectProps={{ native: true }}
            onChange={this.handleChangeValue.bind(this, i)}
            variant="outlined"
          >
          </TextField>
        </Grid>
        <Grid
          item
          md={2}
          xs={12}
        >
          <TextField
            fullWidth
            label="Действие"
            name="action"
            required
            select
            SelectProps={{ native: true }}
            onChange={this.handleChangeAction.bind(this, i)}
            variant="outlined"
          >
              <option value=''></option>
              <option value={'включить'}>Включить</option>
              <option value={'выключить'}>Выключить</option>
              <option value={'установить параметр'}>Установить параметр</option>
          </TextField>
        </Grid>
        <Grid
          item
          md={3}
          xs={12}
        >
          <TextField
            fullWidth
            label="Сенсор/Устройство"
            name="sensor"
            required
            select
            SelectProps={{ native: true }}
            onChange={this.handleChangeSensor.bind(this, i)}
            variant="outlined"
          >
              {
                this.state.container.sensors.length === 0 ? <></> :
                  this.state.container.sensors.map(sensors => (
                    sensors.structure.map(sensor =>
                        <option value={sensor.type}>Сенсор: {sensor.type}</option>                           
                    )
                ))
              }

              {this.state.container.devices.length === 0 ? <></> :
                this.state.container.devices.map(devices => (
                    devices.structure.map(device =>
                        <option value={device.type}>Устройство: {device.type}</option>                           
                    )
                )) 
              }       
          </TextField>
        </Grid>  
      </Grid>
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon onClick={this.removeModule.bind(this, i)}/>
        </IconButton>
      </ListItemSecondaryAction>
      </ListItem>
    )}

  save = async () => {
    const name = this.state.name;
    const containerId = this.state.container._id;
    const modules = this.state.modules;
    const greenhouse = this.props.greenhouse.id;
    if (name !== '') {
        const data = {
            name,
            containerId,
            modules,
            greenhouse
        };
        this.setState({err:''})
        await api.insertConfiguration(data).then(res => {
            window.alert('Конфигурация добавлена успешно!')
            this.setState({
              name: '',
              containers: [],
              modules: [],
              technology: {
                illumination: '',
                temperature: '',
                humidity: ''
              },
              container: {},
              err:''
            })
        })
    }
    else this.setState({err:'Все поля должны быть заполнены'})
  }

  addModule () {
    this.setState({modules: [...this.state.modules, {
        action: '',
        indicator: '',
        sensor: '',
        value: '',
        sign: ''
      }
    ]})
  }
  
  render () {
    let button = (Object.keys(this.state.container).length === 0) ? <></> : <Grid
                item
                md={12}
                xs={12}
              >
                <Button
                  color="primary"
                  onClick={this.addModule.bind(this)}
                >
                  Добавить условие
                </Button>
              </Grid>
    let technology;
    if (this.state.technology.illumination === '') {
      technology = <>
                    <Grid
                      item
                      md={12}
                      xs={12}
                    >
                      <Typography
                        color="textPrimary"
                        variant="p"
                      >
                        Технология не назначена
                      </Typography>
                    </Grid>
                  </>;
    } else {
      technology = <>
                    <Grid
                    item
                    md={4}
                    xs={12}
                    >
                      <TextField
                        fullWidth
                        label="Температура воздуха"
                        InputProps={{
                          readOnly: true,
                        }}
                        value={this.state.technology.temperature}
                        defaultValue={this.state.technology.temperature}
                        />
                  </Grid>

                  <Grid
                  item
                  md={4}
                  xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Уровень освещенности"
                      InputProps={{
                        readOnly: true,
                      }}
                      value={this.state.technology.illumination}
                      />
                  </Grid>

                  <Grid
                  item
                  md={4}
                  xs={12}
                  >
                      <TextField
                        fullWidth
                        label="Влажность воздуха"
                        name="humidity"
                        InputProps={{
                          readOnly: true,
                        }}
                        value={this.state.technology.humidity}
                        />
                  </Grid>
              </>;
    }

    return (
        <Card>
          <CardHeader
            title="Создать конфигурацию"
          />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={6}
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
                md={6}
                xs={12}
              >
                 <TextField
                    fullWidth
                    label="Контейнер"
                    name="container"
                    required
                    select
                    SelectProps={{ native: true }}
                    onChange={this.handleContainerChange.bind(this)}
                    variant="outlined"
                  >
                      <option value=''></option>
                    {this.state.containers.map(container =>
                      <option
                        key={container._id}
                        value={container._id}
                      >
                        {container.name}
                      </option>
                    )}
                  </TextField>
              </Grid>
  
              <Grid
                item
                md={12}
                xs={12}
              >
                <Typography
                  color="textPrimary"
                  variant="h6"
                >
                  Технология выращивания
                </Typography>
              </Grid>
  
               {technology}
                      
              {button}
  
            </Grid>
  
            <>{(this.state.modules.length === 0)? "" : <List>{this.createModules()}</List>}</>
  
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
};

const mapStateToProps = state => {
  return {
    greenhouse: state.greenhouseReducer
  };
}; 

export default connect(mapStateToProps, null)(ConfigurationDetails);
