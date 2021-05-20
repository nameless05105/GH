import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  FormGroup,
  Checkbox,
  makeStyles,
  CircularProgress,
  LinearProgress
} from '@material-ui/core';
import api from '../../api/api';
import { connect } from 'react-redux';
import { sendData } from '../../index';

const useStyles = makeStyles((theme) => ({
  root: {},
  formControl: {
    margin: theme.spacing(3),
  },
}));



const ReportDetails = ({ className, greenhouse, modules, session, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    startDate: '',
    endDate: '',
    username: session.username,
    sensors:[],
    ph:'',
    ec:'',
    seedingDensity:'',
    culture:'Редис',
    notRenewableModules: modules,
    isWaiting: false
  });


  useEffect(() => {
    sendData({greenhouse:greenhouse.id},'MODULES');
  }, []);


  const handleCheckboxChange = (event) => {
    let newArray = [...values.sensors, event.target.id];
    if (values.sensors.includes(event.target.id)) {
      newArray = newArray.filter(day => day !== event.target.id);
    }
    setValues({
      ...values,
      sensors: newArray 
    });
  };


  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleChangeStartDate = (event) => {
    setValues({
      ...values,
      startDate: event.target.value
    });
  };

  const handleChangeEndDate = (event) => {
    setValues({
      ...values,
      endDate: event.target.value
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = values;
    setValues({
      ...values,
      isWaiting: true
    });
    // console.log(payload);
    // setValues({
    //   startDate: '',
    //   endDate: '',
    //   username: session.username,
    //   sensors:[],
    //   ph:'',
    //   ec:'',
    //   seedingDensity:'',
    //   culture:'Редис',
    // });
    await api.insertReport(payload).then(res => {
      setValues({
        ...values,
        isWaiting: false
      });
      window.alert("Отчет добавлен успешно");
    });
  };

  const localeSensorName = (engName) => {
    let ruName = "";
    switch(engName) {
      case 'Air_humidity': 
        ruName = "Влажность воздуха";
        break;
      case 'Illumination_level': 
        ruName = "Уровень освещенности";
        break;
      case 'Air_temperature': 
        ruName = "Температура воздуха";
        break;
      case 'Analog_signal': 
        ruName = "Аналоговый сигнал";
        break;
      case 'Discrete_signal': 
        ruName = "Дискретный сигнал";
        break;
      case 'Battery_charge': 
        ruName = "Заряд аккумулятора";
        break;
      case 'Water_temperature': 
        ruName = "Температура воды";
        break;
      case 'Lamp_power': 
        ruName = "Мощность ламп";
        break;
      case 'Pump_power': 
        ruName = "Мощность насосов";
        break;
      case 'Indicator_pH': 
        ruName = "Показатель pH";
        break;
      case 'Indicator_EC': 
        ruName = "Показатель ЕС";
        break;
      case 'Indicator_eCO2': 
        ruName = "Показатель eCO2";
        break;
      case 'Indicator_nYVOC': 
        ruName = "Показатель nTVOC";
        break;
      case 'Signal_PWM': 
        ruName = "ШИМ сигнал";
        break;
      case 'Signal_digital': 
        ruName = "Цифровой сигнал";
        break;    
      case 'Fan_PWM': 
          ruName = "Вентилятор (ШИМ)";
          break;
      case 'Pumping_system': 
          ruName = "Насосная система";
          break;
      case 'Phytolamp_digital': 
          ruName = "Фитолампа";
          break;
      case 'Phytolamp_PWM': 
          ruName = "Фитолампа (ШИМ)";
          break;
      default:
        break;
    }
    return ruName;
  }

  const checkbox = modules.map((sensor) =>
    <FormControlLabel
      control={<Checkbox  name={sensor.type}  onChange={handleCheckboxChange} id={sensor._id} color="primary"/>}
      label={localeSensorName(sensor.type) + ", ID устройства: " + sensor.id}
    />
  )

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      onSubmit={handleSubmit}
      {...rest}
    >
      <Card>
        <CardHeader
          title="Создать новый отчет"
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
                  label="Культура"
                  name="culture"
                  required
                  select
                  SelectProps={{ native: true }}
                  onChange={handleChange}
                  value={values.culture}
                  variant="outlined"
                >
                    <option value='Редис'>Редис</option>
                    <option value='Дайкон'>Дайкон</option>
                    <option value='Мизуна'>Мизуна</option>
                    <option value='Руккола'>Руккола</option>
                    <option value='Брокколи'>Брокколи</option>
                    <option value='Кале'>Кале</option>
                    <option value='Кресс-салат'>Кресс-салат</option>

                </TextField>
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
               <TextField
                  id="datetime-local"
                  label="Начало"
                  type="datetime-local"
                  defaultValue={values.createDate}
                  className={classes.textField}
                  onChange={handleChangeStartDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
                
            </Grid>

            <Grid
              item
              md={4}
              xs={12}
            >
               <TextField
                  id="datetime-local"
                  label="Окончание"
                  type="datetime-local"
                  defaultValue={values.createDate}
                  className={classes.textField}
                  onChange={handleChangeEndDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                label="PH"
                name="ph"
                onChange={handleChange}
                required
                value={values.ph}
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
                label="EC"
                name="ec"
                onChange={handleChange}
                required
                value={values.ec}
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
                label="Плотность посева"
                name="seedingDensity"
                onChange={handleChange}
                required
                value={values.seedingDensity}
                variant="outlined"
              />
            </Grid>


            <Grid
              item
              md={12}
              xs={12}
            >
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Датчики:</FormLabel>
                <FormGroup>

                  {checkbox}
                  
                </FormGroup>
              </FormControl>

            </Grid>

          </Grid>
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
            onClick={handleSubmit}
          >
            Сохранить
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ReportDetails.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = state => {
  return {
    greenhouse: state.greenhouseReducer,
    modules: state.moduleReducer,
    session: state.session
  };
}; 

export default connect(mapStateToProps, null)(ReportDetails);
