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
  makeStyles
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
  });


  useEffect(() => {
    sendData({greenhouse:greenhouse.id},'MODULES');
  }, []);


  const handleCheckboxChange = (event) => {
    console.log(event, event.target.id)
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
    console.log(payload);
    setValues({
      startDate: '',
      endDate: '',
      username: session.username,
      sensors:[],
      ph:'',
      ec:'',
      seedingDensity:'',
      culture:'Редис',
    });
    await api.insertReport(payload).then(res => {
      window.alert("Отчет добавлен успешно")
    });
  };

  const checkbox = modules.map((sensor) =>
    <FormControlLabel
      control={<Checkbox  name={sensor.type}  onChange={handleCheckboxChange} id={sensor._id}/>}
      label={sensor._id}
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
              md={6}
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
                <FormLabel component="legend">Датчики</FormLabel>
                <FormGroup>
                  {/* {(modules.length !== 0 ) ? 
                    modules.map((elem) => {
                    }) : <></>
                  } */}

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
