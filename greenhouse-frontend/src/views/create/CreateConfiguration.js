import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from '../../components/Page';
import ConfigurationDetails from './ConfigurationDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CreateConfiguration = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Создать новую конфигурацию"
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
            <ConfigurationDetails />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default CreateConfiguration;
