import React, { useState, useEffect}  from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Charts = ({ className, module, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [values, setValues] = useState({
    data: [],
    label: [],
  });

  useEffect(() => {
    let value = [];
    let time = [];
    for (let i = 200; i < module.components.values.length; i++) {
      value.push(module.components.values[i].value);
      time.push(module.components.values[i].date);
    };
    setValues({
      data: value,
      label: time
    });
  }, []);

  const data = {
    datasets: [
      {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        data: values.data,
        label: module.components.type
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

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        title={module.components.type}
      />
      <Divider />
      <CardContent>
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