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
  makeStyles
} from '@material-ui/core';
import api from '../../api/api';
import { connect } from 'react-redux';

const useStyles = makeStyles(() => ({
  root: {}
}));

const TechnologyDetails = ({ className, greenhouse, id, ...rest }) => {
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
    async function loadTechnology() {
      const technology = await api.getTechnologyById(id);
      const containers = await api.getAllContainers(greenhouse.id);
      setValues({
        ...values,
        name: technology.data.data.name,
        container: technology.data.data.container,
        temperature: technology.data.data.temperature,
        humidity: technology.data.data.humidity,
        illumination: technology.data.data.illumination,
        containers: containers.data.data,
      });
    }
    loadTechnology();
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
    await api.updateTechnologyById(id, payload).then(res => {
      window.alert("Технология выращивания изменена успешно")
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
          title="Изменить технологию выращивания"
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
