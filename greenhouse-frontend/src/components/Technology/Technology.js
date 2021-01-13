import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import api from '../../api/api';
import { Link} from 'react-router-dom';

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

const Technology= ({ className, technology, ...rest }) => {
  const classes = useStyles();

  const deleteTechnology= (event) => {
    event.preventDefault();
    if (window.confirm('Подтверждение удаления контейнера', technology._id)) {
      api.deleteTechnologyById(technology._id);
      window.location.reload();
    }
  };

  const editTechnology = (event) => {
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
              to={`/app/edit-tech/${technology._id}`}
            >
              <EditIcon
                className={classes.icon}
                size="20"
              />
            </Button>
            <Button
              className={classes.statsIcon}
              color="action"
              onClick={deleteTechnology}
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
          Контейнер:
          {technology.name}
        </Typography>
        <Typography
          align="left"
          color="textPrimary"
          variant="body1"
        >
          Параметры:
        </Typography>

              <Typography
              align="left"
              color="textPrimary"
              variant="body1"
            >
              Температура воздуха: {technology.temperature}
            </Typography>
              <Typography
              align="left"
              color="textPrimary"
              variant="body1"
            >
              Влажность воздуха: {technology.humidity}
            </Typography>
              <Typography
              align="left"
              color="textPrimary"
              variant="body1"
            >
              Уровень освещенности: {technology.illumination}
            </Typography>

      </CardContent>
    </Card>
  );
};

Technology.propTypes = {
  className: PropTypes.string,
  technology: PropTypes.object.isRequired
};

export default Technology;