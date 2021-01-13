import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56
  }
}));

const ModuleComponent = ({ className, module, ...rest }) => {
  const classes = useStyles();


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
              {module.components.type}
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {module.components.values.pop().value.toFixed(3)}
              
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

ModuleComponent.propTypes = {
  className: PropTypes.string
};

export default ModuleComponent;
