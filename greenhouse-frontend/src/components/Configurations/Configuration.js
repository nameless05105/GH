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

const Configuration = ({ className, configuration, ...rest }) => {
  const classes = useStyles();

  const deleteConfiguration = (event) => {
    event.preventDefault();
    if (window.confirm('Подтверждение удаления контейнера', configuration._id)) {
      api.deleteConfigurationById(configuration._id);
      window.location.reload();
    }
  };

  const editConfiguration = (event) => {
    event.preventDefault();
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
              activeClassName={classes.active}
              className={classes.statsIcon}
              component={Link}
              to={`/app/edit-configuration/${configuration._id}`}
            >
              <EditIcon
                className={classes.icon}
                size="20"
              />
            </Button>
            <Button
              className={classes.statsIcon}
              color="action"
              onClick={deleteConfiguration}
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
          Конфигурация:
          {configuration.name}
        </Typography>

          {configuration.modules.map((elem) => (
              <Typography
              align="left"
              color="textPrimary"
              variant="body1"
            >
              {elem.action} {elem.indicator} {elem.sensor} {elem.sign} {elem.value} 
            </Typography>
            ))}

      </CardContent>
    </Card>
  );
};

Configuration.propTypes = {
  className: PropTypes.string,
  configuration: PropTypes.object.isRequired
};

export default Configuration;