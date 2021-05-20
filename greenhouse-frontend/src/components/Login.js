// import React from "react";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import { login } from "../actions/session";

// const mapStateToProps = ({ errors }) => ({
//   errors
// });

// const mapDispatchToProps = dispatch => ({
//   login: user => dispatch(login(user))
// });

// const Login = ({ errors, login }) => {

//   const handleSubmit = e => {
//     e.preventDefault();
//     const user = {
//       username: e.target[0].value,
//       password: e.target[1].value,
//     };

//     login(user);
//   }

//   return (
//     <>
//       <h1>Авторизация</h1>
//       <p>{errors}</p>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Username:
//           <input type="text" name="username" />
//         </label>
//         <label>
//           Password:
//           <input type="password" name="password" />
//         </label>
//         <input type="submit" value="Submit" />
//       </form>
//       <Link to="/signup">Signup</Link>
//     </>
//   );
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Login);

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
    username: '',
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
                label="Имя пользователя"
                margin="normal"
                name="username"
                onChange={handleChange}
                type="text"
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