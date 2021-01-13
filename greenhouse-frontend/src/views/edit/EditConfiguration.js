import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
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
  const { id } = useParams();
  return (
    <Page
      className={classes.root}
      title="Изменить конфигурацию"
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
            <ConfigurationDetails id = {id}/>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default CreateConfiguration;
