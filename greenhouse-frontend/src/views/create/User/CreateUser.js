import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from '../../../components/Page';
import UserDetails from './UserDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CreateUser = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Создать нового пользователя"
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
            <UserDetails />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default CreateUser
