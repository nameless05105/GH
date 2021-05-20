import React, { useState } from 'react';
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
Thermometer as ThermometerIcon,
Radio as RadioIcon,
Battery as BatteryIcon,
} from 'react-feather';

import WbSunnyIcon from '@material-ui/icons/WbSunny';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import EcoIcon from '@material-ui/icons/Eco';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.gray,
    height: 56,
    width: 56
  }
}));
  

const DisplayingSensors = ( sensor ) => {
    const classes = useStyles();

    let block;
    let name;
    let units;
    switch(sensor) {
        case 'Air_humidity': 
          name = "Влажность воздуха";
          units = "%";
          block =   <Grid item>
                    <Avatar className={classes.avatar}>
                      <InvertColorsIcon />
                    </Avatar>
                  </Grid>
          break;
      
        case 'Illumination_level': 
          name = "Уровень освещенности";
          units = "Люкс"
          block =   <Grid item>
              <Avatar className={classes.avatar}>
                <WbSunnyIcon />
              </Avatar>
            </Grid>
          break;
    
        case 'Air_temperature': 
          name = "Температура воздуха";
          units = "°C"
          block =   <Grid item>
              <Avatar className={classes.avatar}>
                <ThermometerIcon />
              </Avatar>
            </Grid>
          break;

        case 'Analog_signal': 
          name = "Аналоговый сигнал";
          units = ""
          block =   <Grid item>
              <Avatar className={classes.avatar}>
                <RadioIcon />
              </Avatar>
            </Grid>
          break;

        case 'Discrete_signal': 
          name = "Дискретный сигнал";
          units = ""
          block =   <Grid item>
              <Avatar className={classes.avatar}>
                <RadioIcon />
              </Avatar>
            </Grid>
          break;

        case 'Battery_charge': 
          name = "Заряд аккумулятора";
          units = "%"
          block =   <Grid item>
              <Avatar className={classes.avatar}>
                <BatteryIcon />
              </Avatar>
            </Grid>
          break;

        case 'Water_temperature': 
          name = "Температура воды";
          units = "°C"
          block =   <Grid item>
              <Avatar className={classes.avatar}>
                <ThermometerIcon />
              </Avatar>
            </Grid>
          break;

        case 'Lamp_power': 
          name = "Мощность ламп";
          units = "Ватт"
          block =   <Grid item>
              <Avatar className={classes.avatar}>
                <WbIncandescentIcon />
              </Avatar>
            </Grid>
          break;

        case 'Pump_power': 
          name = "Мощность насосов";
          units = "Ватт"
          block =   <Grid item>
              <Avatar className={classes.avatar}>
                <BatteryIcon />
              </Avatar>
            </Grid>
          break;

        case 'Indicator_pH': 
          name = "Показатель pH";
          units = ""
          block =   <Grid item>
              <Avatar className={classes.avatar}>
                <EcoIcon />
              </Avatar>
            </Grid>
          break;

        case 'Indicator_EC': 
          name = "Показатель ЕС";
          units = "mS"
          block =   <Grid item>
              <Avatar className={classes.avatar}>
                <EcoIcon />
              </Avatar>
            </Grid>
          break;

        case 'Indicator_eCO2': 
          name = "Показатель eCO2";
          units = "ppm"
          block =   <Grid item>
              <Avatar className={classes.avatar}>
                <EcoIcon />
              </Avatar>
            </Grid>
          break;

        case 'Indicator_nYVOC': 
          name = "Показатель nTVOC";
          units = "ppb"
          block =   <Grid item>
              <Avatar className={classes.avatar}>
                <EcoIcon />
              </Avatar>
            </Grid>
          break;

        case 'Signal_PWM': 
          name = "ШИМ сигнал";
          units = ""
          block =   <Grid item>
              <Avatar className={classes.avatar}>
                <ThermometerIcon />
              </Avatar>
            </Grid>
          break;

        case 'Signal_digital': 
          name = "Цифровой сигнал";
          units = ""
          block =   <Grid item>
              <Avatar className={classes.avatar}>
                <ThermometerIcon />
              </Avatar>
            </Grid>
          break;
          
        case 'Fan_PWM': 
            name = "Вентилятор (ШИМ)";
            units = ""
            block =   <Grid item>
                <Avatar className={classes.avatar}>
                <ThermometerIcon />
                </Avatar>
            </Grid>
            break;
    
        case 'Pumping_system': 
            name = "Насосная система";
            units = ""
            block =   <Grid item>
                <Avatar className={classes.avatar}>
                <ThermometerIcon />
                </Avatar>
            </Grid>
            break;
            
        case 'Phytolamp_digital': 
            name = "Фитолампа";
            units = ""
            block =   <Grid item>
                <Avatar className={classes.avatar}>
                  <WbIncandescentIcon />
                </Avatar>
            </Grid>
            break;
            
        case 'Phytolamp_PWM': 
            name = "Фитолампа (ШИМ)";
            units = ""
            block =   <Grid item>
                <Avatar className={classes.avatar}>
                  <WbIncandescentIcon/>
                </Avatar>
            </Grid>
            break;
          
        default:
          break;
      }
      var obj = {
        name:  name,
        block: block,
        units: units
      };
      return obj;
}

export default DisplayingSensors;