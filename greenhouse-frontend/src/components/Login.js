import React, { useState }from "react";
import { connect } from "react-redux";
import { login } from "../actions/session";

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from './Page';

const mapStateToProps = ({ errors }) => ({
  errors
});

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user))
});

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));


const Login = ({ errors, login }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const user = values;
    login(user);
  }

  return (
    <>

    <Page
    className={classes.root}
    title="Авторизация"
  >
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      justifyContent="center"
    >
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
              <Box mb={3}>
                <Typography
                  color="textPrimary"
                  variant="h2"
                >
                  Авторизация
                </Typography>

              </Box>

              <TextField
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                onChange={handleChange}
                type="email"
                value={values.email}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Пароль"
                margin="normal"
                name="password"
                onChange={handleChange}
                type="password"
                value={values.password}
                variant="outlined"
              />
              <Box my={2}>
                <Button
                  color="primary"
                  onSubmit={handleSubmit}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Войти
                </Button>
              </Box>
              <Typography
                  color="textPrimary"
                  variant="h6"
                >
                  {errors}
                </Typography>
            </form>
      </Container>
    </Box>
  </Page>
  </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);