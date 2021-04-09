import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import api from '../../api/api';
import Page from '../Page';
import Report from './Report';

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reports: [],
      isLoading: false,
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    await api.getAllReports().then(reports => {
      let q = [];
      if (reports.data.data != undefined){
        q = reports.data.data
      }
      this.setState({
        reports: q,
        isLoading: false,
      });
    });
  }

  render() {
    // const { configurations, isLoading } = this.state;
    return (
        <Page
          title="Конфигурации"
          pt={3}
          pb={3}
        >
          <Container maxWidth={false}>
            <Box mt={3}>
              <Grid
                container
                spacing={3}
              >
                {this.state.reports.map((report) => (
                  <Grid
                    item
                    key={report.id}
                    lg={12}
                    md={12}
                    xs={12}
                  >
                    <Report
                      report={report}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </Page>
      
    );
   }
}
const mapStateToProps = state => {
  return {
    greenhouse: state.greenhouseReducer
  };
}; 

export default connect(mapStateToProps,null)(Reports);