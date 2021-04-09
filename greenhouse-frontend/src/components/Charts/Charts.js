import React, { Component } from 'react';
import {
  Container,
  Grid,
  Typography,
  Divider,

  Card,
  CardHeader,
  TextField,
  Box,
  CardContent,
  Button


} from '@material-ui/core';
import Page from '../Page';
import {sendData} from '../../index';
import { connect } from "react-redux";

import Chart from './Chart';

const mapStateToProps = state => {
  return {
    modules_for_date: state.moduleForDateReducer
  };
}; 

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      date: "2021-02-15"
    };
  }


  handleChangeDate(event) {
    this.setState({ date: event.target.value });
  }

  componentDidMount(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();

    today = yyyy + '-' +  mm + '-' + dd;
    this.setState({ date: today });
  }

  handleSubmit = () => {
    const date = this.state.date;
    if (date !== '') {
      sendData({date:date},'MODULES_FOR_DATE');
      this.setState({err:''})
    }
    else this.setState({err:'Все поля должны быть заполнены'})
  }

  render() {

    let mass = [];
    if (this.props.modules_for_date.length !== 0 ) {
      this.props.modules_for_date.map((elem) => {
         if ( mass.indexOf( elem.id ) == -1 ) {
           mass.push(elem.id)
         }
      })
    }
    let platas = mass.map((plata) => (
      <><br/><br/>
      <Grid
        container
        spacing={3}
        key={plata}
      >
        <Grid
          item
          lg={12}
          sm={12}
          xl={12}
          xs={12}
          key = {plata}
        >
          <Typography
            color="textPrimary"
            variant="h4"
          >
            ID устройства: {plata}
          </Typography>

        </Grid>


    {this.props.modules_for_date.filter((elem) => elem.id === plata).map((elem) => (
        <Grid
          item
          lg={12}
          md={12}
          xl={12}
          xs={12}
          key = {elem._id}
        >{elem.values[0].date.slice(0, 10)}
          <Chart module = {elem}/>
        </Grid>
      
     ))}
     </Grid>
     <br/><br/><Divider /></>
    ))

    return (
      <Page
        title="Теплица"
      >
      <Container maxWidth={false}>
      <br/><br/>
      <form
        autoComplete="off"
        noValidate
        // className={clsx(classes.root, className)}
        // onSubmit={handleSubmit}
        // {...rest}
      >
        <Card>
          <CardHeader
            title="Фильтрация данных"
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
                  label="Дата"
                  name="date"
                  type="date"
                  // defaultValue="2017-05-24"
                  onChange={this.handleChangeDate.bind(this)}
                  required
                  value={this.state.date}
                  variant="outlined"
                />
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
              onClick={this.handleSubmit.bind(this)}
            >
              Запросить
            </Button>
          </Box>
        </Card>
      </form>



        {platas}
      </Container>
    </Page>
    );
   }
}

export default connect(mapStateToProps,null)(Charts);