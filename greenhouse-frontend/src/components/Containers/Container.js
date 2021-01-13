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
  Button,
  makeStyles
} from '@material-ui/core';
import { Link } from 'react-router-dom';
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

const ContainerCard = ({ className, container, ...rest }) => {
  const classes = useStyles();

  const deleteContainer = (event) => {
    event.preventDefault();
    if (window.confirm('Подтверждение удаления контейнера', container._id)) {
      api.deleteContainerById(container._id);
      window.location.reload();
    }
  };

  const editContainer = (event) => {
    event.preventDefault();
    window.location.href = `/container/update/${container._id}`;
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
              to={`/app/edit-container/${container._id}`}
            >
              <EditIcon
                className={classes.icon}
                size="20"
              />
            </Button>
            <Button
              className={classes.statsIcon}
              color="action"
              onClick={deleteContainer}
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
          {container.name}
        </Typography>
        <Typography
          align="left"
          color="textPrimary"
          variant="body1"
        >
          Числовое значение номера частотного канала:
          {container.channel}
        </Typography>
        <Typography
          align="left"
          color="textPrimary"
          variant="body1"
        >
          Адрес группы:
          {container.address}
        </Typography>
      </CardContent>
    </Card>
  );
};

ContainerCard.propTypes = {
  className: PropTypes.string,
  container: PropTypes.object.isRequired
};

export default ContainerCard;