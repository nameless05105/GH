import React, { Component } from 'react';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Divider, 
  Card,
  CardContent,
  Box
} from '@material-ui/core';
import Charts from './Charts';
import {sendData} from '../../index';
import { connect } from "react-redux";
import ModuleComponent from "./ModuleComponent";

import api from '../../api/api';

const mapStateToProps = state => {
  return {
    modules: state.moduleReducer,
    greenhouse: state.greenhouseReducer,
    session: state.session
  };
}; 

class IngenerDashbords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      ph:'',
      ec:'',
      seedingDensity:''
    };
  }

  componentDidMount = () => {
    //   sendData({greenhouse:this.props.greenhouse.id},'MODULES');
  }

  handleChangePH(event) {
    this.setState({ ph: event.target.value});
  }

  handleChangeEC(event) {
    this.setState({ ec: event.target.value});
  }

  handleChangeSeedingDensity(event) {
    this.setState({ seedingDensity: event.target.value});
  }

  savePH = async () => {
    const ph = this.state.ph;
    const date = new Date();
    if (ph !== '') {
        const data = {
            name:'ph',
            value:ph,
            date:date,
        };
        this.setState({err:''})
        await api.updateParameter(data).then(res => {
            window.alert('Данные обновлены успешно!')
            this.setState({
              ph: '',
              err:''
            })
        })
    }
    else this.setState({err:'Все поля должны быть заполнены'})
  }

  saveEC = async () => {
    const ec = this.state.ec;
    const date = new Date();
    if (ec !== '') {
        const data = {
            name:'ec',
            value:ec,
            date:date,
        };
        this.setState({err:''})
        await api.updateParameter(data).then(res => {
            window.alert('Данные обновлены успешно!')
            this.setState({
              ec: '',
              err:''
            })
        })
    }
    else this.setState({err:'Все поля должны быть заполнены'})
  }

  render() {

    return (
      <>
        {/* <Container maxWidth={true}> */}
        <br/>
        <Card>
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
                    label="Ph"
                    name="ph"
                    type="text"
                    onChange={this.handleChangePH.bind(this)}
                    // required
                    value={this.state.ph}
                    // variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <Button variant="outlined" onClick={this.savePH.bind(this)}>Сохранить</Button>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                    fullWidth
                    label="EC"
                    name="ec"
                    type="text"
                    onChange={this.handleChangeEC.bind(this)}
                    // required
                    value={this.state.ec}
                    // variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <Button variant="outlined" onClick={this.saveEC.bind(this)}>Сохранить</Button>
              </Grid>

              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                    fullWidth
                    label="Плотность посева"
                    name="ec"
                    type="text"
                    onChange={this.handleChangeSeedingDensity.bind(this)}
                    // required
                    value={this.state.seedingDensity}
                    // variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <Button variant="outlined" onClick={this.saveEC.bind(this)}>Сохранить</Button>
              </Grid>
  
            </Grid>
  
          </CardContent>
        </Card>

        <br/>

        <Card>
          <CardContent>
            <Typography
              align="left"
              color="textPrimary"
              gutterBottom
              variant="h5"
            >
              Цикл работы насосов:
              {/* {container.name} */}
            </Typography>
            <Typography
              align="left"
              color="textPrimary"
              gutterBottom
              variant="h5"
            >
              Параметры фито светильников:
              {/* {container.channel} */}
            </Typography>
            <Typography
              align="left"
              color="textPrimary"
              gutterBottom
              variant="h5"
            >
              Цикл выращивания:
              {/* {container.address} */}
            </Typography>
            <Typography
              align="left"
              color="textPrimary"
              gutterBottom
              variant="h5"
            >
              Формат выращивания:
              {/* {container.address} */}
            </Typography>
          </CardContent>
        </Card>


        {/* </Container> */}
      </>

    );
   }
}
export default connect(mapStateToProps,null)(IngenerDashbords);