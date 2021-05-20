import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Container,
  FormControl,
  FormLabel,
  FormControlLabel,
  FormGroup,
  Checkbox,
  makeStyles
} from '@material-ui/core';
import Page from '../Page';
import api from '../../api/api';
import { connect } from 'react-redux';
import { sendData } from '../../index';
import { useParams } from 'react-router-dom';

import { jsPDF } from "jspdf";

import Chart from '../Charts/Chart';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

const ViewReport = ({ className, greenhouse, modules, session, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    report: {},
    culture: "",
    ph:"",
    ec:"",
    seedingDensity:"",
    sensors:[]
  });
  const { id } = useParams();

    useEffect(() => {
        async function loadReport() {
            console.log(id)
            const report = await api.getReportById(id);
            setValues({
                ...values,
                report: report.data.data,
                culture: report.data.data.culture,
                ph: report.data.data.ph,
                ec: report.data.data.ec,
                seedingDensity: report.data.data.seedingDensity,
                sensors: report.data.data.sensors
            });
        }
        loadReport();
    }, []);

  const getpdf = () => {
    const doc = new jsPDF();
    doc.text("Hello world!", 10, 10);
    doc.save("a4.pdf");
  }


  return (
    <Page
      className={classes.root}
      title="Просмотр отчета"
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
            <Card>
                <CardHeader
                    title="Просмотр отчета"
                />
                <Divider />
                <CardContent>
                  <Grid
                      container
                      spacing={3}
                  >
                    <Grid
                        item
                        md={4}
                        xs={12}
                    >
                        <TextField
                            fullWidth
                            label="Культура"
                            value={values.culture}
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid
                        item
                        md={4}
                        xs={12}
                    >
                        <TextField
                            id="datetime-local"
                            label="Начало"
                            type="datetime-local"
                            value={values.report.startDate}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            />
                    </Grid>

                    <Grid
                        item
                        md={4}
                        xs={12}
                    >
                        <TextField
                            id="datetime-local"
                            label="Окончание"
                            type="datetime-local"
                            value={values.report.endDate}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />
                    </Grid>

                    <Grid
                        item
                        md={4}
                        xs={12}
                    >
                        <TextField
                            fullWidth
                            label="PH"
                            value={values.ph}
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>

                    <Grid
                        item
                        md={4}
                        xs={12}
                    >
                        <TextField
                            fullWidth
                            label="EC"
                            value={values.ec}
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>

                    <Grid
                        item
                        md={4}
                        xs={12}
                    >
                        <TextField
                            fullWidth
                            label="Плотность посева"
                            value={values.seedingDensity}
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>

                  </Grid>

                  <Grid
                      container
                      spacing={3}
                  >
                    {values.sensors.map((elem) => (
                        <Grid
                          item
                          lg={12}
                          md={12}
                          xl={12}
                          xs={12}
                          key = {elem._id}
                        >
                          <Chart module = {elem}/>
                        </Grid>
                      
                    ))}
                  </Grid>

                  

                </CardContent>

                {/* <Box
            display="flex"
            justifyContent="flex-end"
            p={2}
          >
          <Button
            color="primary"
            variant="contained"
            onClick={getpdf}
          >
            pdf
          </Button>
        </Box> */}
              </Card>

            </Grid>
        </Grid>
        </Container>
        </Page>
  );
};

ViewReport.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = state => {
  return {
    greenhouse: state.greenhouseReducer,
    modules: state.moduleReducer,
    session: state.session
  };
}; 

export default connect(mapStateToProps, null)(ViewReport);