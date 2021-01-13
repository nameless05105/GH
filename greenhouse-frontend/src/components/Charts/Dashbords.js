import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from '../Page';
import Charts from './Charts';
import ModuleComponent from './ModuleComponent';
import api from '../../api/api';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  const [values, setValues] = useState({
    data: [],
  });

  useEffect(() => {
    async function loadModules() {
      const modules = await api.getModules();
      setValues({
        data: modules.data.data,
      });
    }
    loadModules();
  }, []);

  return (
    <Page
      className={classes.root}
      title="Теплица"
    >
      <Container maxWidth={false}>
      <Grid
          container
          spacing={3}
        >
      {values.data.map((elem) => (

              <Grid
                item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
              >
                <ModuleComponent module = {elem}/>
              </Grid>

        ))}
          </Grid>

        {values.data.map((elem) => (
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={12}
              md={12}
              xl={12}
              xs={12}
            >
              <Charts module = {elem}/>
            </Grid>
        </Grid>
        ))}
      </Container>
    </Page>
  );
};

export default Dashboard;