import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from '../../../components/Page';
import GreenhouseDetails from './GreenhouseDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CreateTechnology = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Создать новую теплицу"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={12}
            md={12}
            xs={12}
          >
            <GreenhouseDetails />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default CreateTechnology;
