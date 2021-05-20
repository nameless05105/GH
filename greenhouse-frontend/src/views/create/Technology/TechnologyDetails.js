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
  Slider,
  makeStyles
} from '@material-ui/core';
import api from '../../../api/api';
import { connect } from 'react-redux';

const useStyles = makeStyles(() => ({
  root: {}
}));

const marks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 20,
    label: '20°C',
  },
  {
    value: 37,
    label: '37°C',
  },
  {
    value: 100,
    label: '100°C',
  },
];

function valuetext(value) {
  return `${value}°C`;
}

const TechnologyDetails = ({ className, greenhouse, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: '',
    container: '',
    containers: [],
    temperature: "",
    humidity: "",
    illumination:"",
    greenhouse: greenhouse.id
  });

  useEffect(() => {
    async function loadModules() {
      const modules = await api.getAllContainers(greenhouse.id);
      setValues({
        ...values,
        containers: modules.data.data,
      });
    }
    loadModules();
  }, []);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = values;
    setValues({
      name: '',
      container: '',
      containers: [],
      temperature: "",
      humidity: "",
      illumination:"",
    });
    await api.insertTechnology(payload).then(res => {
      window.alert("Технология выращивания добавлена успешно")
    });
  };

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
          title="Создать новую технологию выращивания"
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
                onChange={handleChange}
                required
                value={values.name}
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
                  onChange={handleChange}
                  value={values.container}
                  variant="outlined"
                >
                    <option value=''></option>
                  {values.containers.map(container =>
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
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Температура воздуха"
                name="temperature"
                onChange={handleChange}
                required
                value={values.temperature}
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
                label="Влажность воздуха"
                name="humidity"
                onChange={handleChange}
                required
                value={values.humidity}
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
                label="Уровень освещенности"
                name="illumination"
                onChange={handleChange}
                required
                value={values.illumination}
                variant="outlined"
              />
            </Grid>

            <Slider
              track={false}
              // track="inverted"
              aria-labelledby="track-false-range-slider"
              // getAriaValueText={valuetext}
              defaultValue={[20, 30, 40, 50, 60, 70]}
              // marks={marks}
            />

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

TechnologyDetails.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = state => {
  return {
    greenhouse: state.greenhouseReducer
  };
}; 

export default connect(mapStateToProps, null)(TechnologyDetails);
