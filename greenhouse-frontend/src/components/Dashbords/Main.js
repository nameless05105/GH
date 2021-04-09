import React, { Component } from 'react';
import {
  Container,
  Grid,
  Typography,
  Divider,
  Box,
  makeStyles
} from '@material-ui/core';
import Page from '../Page';
import Dashbords from './Dashbords';
import Charts from './Charts';
import {sendData} from '../../index';
import { connect } from "react-redux";
import ModuleComponent from "./ModuleComponent";
import { Redirect } from 'react-router-dom';


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { withStyles } from "@material-ui/core/styles";

import Modal from '../Greenhouses/Modal';
import { ThreeSixtySharp } from '@material-ui/icons';

const mapStateToProps = state => {
  return {
    greenhouse: state.greenhouseReducer,
    session: state.session
  };
}; 

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  render() {
    let block;
    if (this.props.greenhouse.id !== "") {
        block = <Dashbords/>
    }

    return (
      <Page
        title="Теплица"
      >
        {(this.props.session.role === "3") ? <Redirect from="/" to="/app/newreport" /> : <></>}
      {block}
      <Dialog open={this.props.greenhouse.id === ""}  aria-labelledby="form-dialog-title" fullWidth={true} maxWidth={'sm'}>
        <Modal/>
      </Dialog>

    </Page>
    );
   }
}

// withStyles(styles, { withTheme: true })(Dashboard);
export default connect(mapStateToProps,null)(Dashboard);