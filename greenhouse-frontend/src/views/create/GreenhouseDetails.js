import React, { useState } from 'react';
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

const useStyles = makeStyles(() => ({
  root: {}
}));

const GreenhouseDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: '',
  });

//   useEffect(() => {
//     async function loadModules() {
//       const modules = await api.getAllContainers(greenhouse.id);
//       setValues({
//         ...values,
//         containers: modules.data.data,
//       });
//     }
//     loadModules();
//   }, []);

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
    });
    await api.insertGreenhouse(payload).then(res => {
      window.alert("Теплица создана успешно")
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
          title="Создать новую теплицу"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
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

GreenhouseDetails.propTypes = {
  className: PropTypes.string
};

export default GreenhouseDetails;
