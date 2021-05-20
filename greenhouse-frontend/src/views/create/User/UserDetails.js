import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { signup } from "../../../actions/session";
import clsx from 'clsx';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Grid,
    Card,
    Divider,
    CardHeader,
    CardContent,
    MenuItem,
    makeStyles
  } from '@material-ui/core';
//   import Page from '../../../components/Page';
import api from '../../../api/api';

const role = [
    {
      value: '2',
      label: 'Технолог',
    },
    {
      value: '3',
      label: 'Инженер',
    }
];

const mapStateToProps = ({ errors }) => ({
  errors
});

const mapDispatchToProps = dispatch => ({
  signup: user => dispatch(signup(user))
});

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      height: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
    }
  }));

const UserDetails = ({ errors, signup }) => {
    const classes = useStyles();

    const [values, setValues] = useState({
        username: '',
        password: '',
        greenhouse: "",
        role: "",
        greenhouses:[],
        isLoading: true
    });

    useEffect(() => {
        async function loadModules() {
          const modules = await api.getGreenhouses();
          console.log(modules.data.data);
          setValues({
            ...values,
            greenhouses: modules.data.data,
            isLoading: false
          });
        }
        loadModules();
        
      }, []);

    const handleChange = (event) => {
        setValues({
          ...values,
          [event.target.name]: event.target.value
        });
      };

    const handleSubmit = e => {
        e.preventDefault();
        const user = {
        username: values.username,
        password: values.password,
        role: values.role,
        greenhouse: values.greenhouse
        };
        
        signup(user);
    };

  return (
    <form
        autoComplete="off"
        noValidate
        // className={clsx(classes.root, className)}
        onSubmit={handleSubmit}
        // {...rest}
    >
        <Card>
        <CardHeader
            title="Создать нового пользователя"
        />
        <Divider />
        <CardContent>
            <Grid
            container
            spacing={3}
            >
            <Grid
                item
                md={6}
                xs={12}
            >
                <TextField
                fullWidth
                label="Имя пользователя"
                name="username"
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
                />
            </Grid>
            <Grid
                item
                md={6}
                xs={12}
            >
                 <TextField
                fullWidth
                label="Пароль"
                name="password"
                onChange={handleChange}
                required
                type="password"
                value={values.password}
                variant="outlined"
                helperText="Требования к паролю"
                />

            </Grid>

            <Grid
                item
                md={6}
                xs={12}
            >
                <TextField
                fullWidth
                select
                label="Роль"
                name="role"
                onChange={handleChange}
                required
                value={values.role}
                variant="outlined"
                >
                    {role.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                    ))}
                </TextField>
            </Grid>

            <Grid
                item
                md={6}
                xs={12}
            >
                <TextField
                fullWidth
                select
                label="Теплица"
                name="greenhouse"
                onChange={handleChange}
                value={values.greenhouse}
                variant="outlined"
                >
                    {values.greenhouses.map((option) => (
                    <MenuItem key={option.value} value={option._id}>
                        {option.name}
                    </MenuItem>
                    ))}
                </TextField>
            </Grid>


            </Grid>
        </CardContent>
        <Divider />
        <Box
            display="flex"
            justifyContent="flex-end"
            p={2}
        >
            <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            >
                Сохранить
            </Button>
        </Box>
        </Card>
    </form>

  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetails);
