import React, { useState, useEffect}  from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Grid,
  Link,
  Button,
  FormControl,
  Select,
  MenuItem,
  useTheme,
  makeStyles,
  colors
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { MicNone } from '@material-ui/icons';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  hidden: {
    display: "none"
  },
  visible: {
    display: "inline"
  },
  avatar: {
    backgroundColor: colors.grey[600],
    height: 30,
    width: 30
  },
}));

const Charts = ({ className, module, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [values, setValues] = useState({
    data: [],
    label: [],
    day:'',
    visible: false
  });

  useEffect(() => {
    let value = [];
    let time = [];
    for (let i = 0; i < module.values.length; i++) {
      value.push(module.values[i].value);
      time.push(module.values[i].date.slice(11, 19));
    };
    setValues({
      ...values,
      data: value,
      label: time,
      day: module.values[0].date.slice(0, 10)
    });
  }, [module.values]);

  let name = "";
  switch (module.type) {
    case 'Air_humidity': 
      name = "Влажность воздуха";
      break;
  
    case 'Illumination_level': 
      name = "Уровень освещенности";
      break;

    case 'Air_temperature': 
      name = "Температура воздуха";
      break;
    default:
      break;
  }

  const data = {
    datasets: [
      {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        data: values.data,
        label: module.type
      },
    ],
    labels: values.label
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const click = () => {
    setValues({
      ...values,
      visible: !(values.visible),
    });
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        title={[name,"   ", module.id]}
        avatar={
          <IconButton color="inherit" onClick={click}>
            {(values.visible)?<ArrowUpwardIcon />:<ArrowDownwardIcon />}
          </IconButton>
        }
      />
      <Divider />
      <CardContent  className={(values.visible)?classes.visible:classes.hidden}>
        <Box
          height={400}
          position="relative"
        >
          <Line
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

Charts.propTypes = {
  className: PropTypes.string
};

export default Charts;