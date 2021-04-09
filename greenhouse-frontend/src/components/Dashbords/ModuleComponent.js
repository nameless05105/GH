import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  Link,
  makeStyles,
  colors
} from '@material-ui/core';

import {
  Thermometer as ThermometerIcon
} from 'react-feather';

import WbSunnyIcon from '@material-ui/icons/WbSunny';
import InvertColorsIcon from '@material-ui/icons/InvertColors';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatarTemp: {
    backgroundColor: colors.gray,
    height: 56,
    width: 56
  },
  avatarLight: {
    backgroundColor: colors.gray,
    height: 56,
    width: 56
  },
  avatarHumidity: {
    backgroundColor: colors.gray,
    height: 56,
    width: 56
  }
}));



const ModuleComponent = ({ className, module, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    visible: false,
  });
  let block;
  let name;
  let units;

  switch(module.type) {
    case 'Air_humidity': 
      name = "Влажность воздуха";
      units = "%";
      block =   <Grid item>
                <Avatar className={classes.avatarHumidity}>
                  <InvertColorsIcon />
                </Avatar>
              </Grid>
      break;
  
    case 'Illumination_level': 
      name = "Уровень освещенности";
      units = "Люкс"
      block =   <Grid item>
          <Avatar className={classes.avatarLight}>
            <WbSunnyIcon />
          </Avatar>
        </Grid>
      break;

    case 'Air_temperature': 
      name = "Температура воздуха";
      units = "°C"
      block =   <Grid item>
          <Avatar className={classes.avatarTemp}>
            <ThermometerIcon />
          </Avatar>
        </Grid>
      break;
      
    default:
      break;
  }

  
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
              
            >
                {name}
              
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {module.values.pop().value.toFixed(2)} {units}
              
            </Typography>
          </Grid>
          {block}

        </Grid>
      </CardContent>
    </Card>
  );
};

ModuleComponent.propTypes = {
  className: PropTypes.string
};

export default ModuleComponent;
