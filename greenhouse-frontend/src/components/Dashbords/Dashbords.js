import React, { Component } from 'react';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Divider
} from '@material-ui/core';
import Charts from './Charts';
import {sendData} from '../../index';
import { connect } from "react-redux";
import ModuleComponent from "./ModuleComponent";
import IngenerDashbords from './IngenerDashbords';

import api from '../../api/api';

const mapStateToProps = state => {
  return {
    modules: state.moduleReducer,
    greenhouse: state.greenhouseReducer,
    session: state.session
  };
}; 

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      greenhouseName:"",
    };
  }

  // componentDidMount = () => {
  //     sendData({greenhouse:this.props.greenhouse.id},'MODULES');
  // }

  componentDidMount = async () => {
    sendData({greenhouse:this.props.greenhouse.id},'MODULES');
    this.setState({ isLoading: true });
    await api.getGreenhouses().then(greenhouses => {
      this.setState({
        greenhouseName: greenhouses.data.data.find(green => green._id === this.props.greenhouse.id).name,
        isLoading: false,
      });
    });
  }

  render() {

    let mass = [];
    if (this.props.modules.length !== 0 ) {
      this.props.modules.map((elem) => {
         if ( mass.indexOf( elem.id ) == -1 ) {
           mass.push(elem.id)
         }
      })
    }
    let plata = mass.map((plata) => (
      <><br></br>
      <Grid
        container
        spacing={3}
        key={plata}
      > 
      {(this.props.session.role !== '3') ? 
        <Grid
          item
          lg={12}
          sm={12}
          xl={12}
          xs={12}
        >
          <Typography
            color="textPrimary"
            variant="h4"
          >
            ID устройства: {plata}
          </Typography>

          <Typography
            color="textPrimary"
            variant="h4"
          >
            Контейнер: Рассадное отделение
          </Typography>

        </Grid> : "" }


      {(this.props.session.role !== '3') ?  
        this.props.modules.filter((elem) => elem.id === plata).map((elem) => (
          <Grid
            item
            lg={4}
            sm={6}
            xl={4}
            xs={12}
            key = {elem._id}
          >
            <ModuleComponent module = {elem} plata = {plata}/>
          </Grid>
        )) : "" }



    {this.props.modules.filter((elem) => elem.id === plata).map((elem) => (
        <Grid
          item
          lg={12}
          md={12}
          xl={12}
          xs={12}
          key = {elem._id}
        >
          <Charts module = {elem}/>
        </Grid>
      
     ))}
     </Grid>
     <br/><br/><Divider /></>
    ))


    return (
      <>
        <Container maxWidth={false}><br/><br/>
          <Grid
            container
            spacing={3}
          > 
            <Grid
              item
              lg={12}
              sm={12}
              xl={12}
              xs={12}
            >
              <Typography
                color="textPrimary"
                variant="h3"
              >
                Теплица: {this.state.greenhouseName}
              </Typography>
            </Grid>
          </Grid>
          {(this.props.session.role === '3') ? <IngenerDashbords/> : ""}
          {plata}
        </Container>
      </>

    );
   }
}
export default connect(mapStateToProps,null)(Dashboard);