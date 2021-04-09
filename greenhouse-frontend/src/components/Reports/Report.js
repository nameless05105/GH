import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Button,
  makeStyles
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import api from '../../api/api';

import logo from '../../logo.png';

// const logo = require('./logo.jpeg);


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  }
}));

const Report = ({ className, report, ...rest }) => {
  const classes = useStyles();

  const deleteReport = (event) => {
    event.preventDefault();
    if (window.confirm('Подтверждение удаления отчеты', report._id)) {
    //   api.deleteConfigurationById(report._id);
      window.location.reload();
    }
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >

      <Box p={2}>
        <Grid
          container
          justify="space-between"
          spacing={2}
        >
          <Grid
            className={classes.statsItem}
            item
          >

            <Button
              className={classes.statsIcon}
              color="action"
              onClick={deleteReport}
            >
              <DeleteIcon
                className={classes.icon}
                size="20"
              />
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <CardContent>
        <Typography
          align="left"
          color="textPrimary"
          gutterBottom
          variant="h5"
        >
          Создана пользователем:
          {report.username}
        </Typography>
        <Typography
          align="left"
          color="textPrimary"
          variant="body1"
        >
          Культура: {report.culture}
        </Typography>

        <Typography
          align="left"
          color="textPrimary"
          variant="body1"
        >
          Дата начала периода: {report.startDate}
        </Typography>

        <Typography
          align="left"
          color="textPrimary"
          variant="body1"
        >
          Дата окончания периода: {report.endDate}
        </Typography>

        <Typography
          align="left"
          color="textPrimary"
          variant="body1"
        >
          Ph: Дата окончания периода: {report.ph}
        </Typography>

        <Typography
          align="left"
          color="textPrimary"
          variant="body1"
        >
          EC: Дата окончания периода: {report.ec}
        </Typography>

        <Typography
          align="left"
          color="textPrimary"
          variant="body1"
        >
          Плотность пасева: {report.seedingDensity}
        </Typography>
        <img src={logo} />
          

      </CardContent>
    </Card>
  );
};

Report.propTypes = {
  className: PropTypes.string,
  report: PropTypes.object.isRequired
};

export default Report;