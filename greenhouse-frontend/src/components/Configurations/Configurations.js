import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import api from '../../api/api';
import Page from '../Page';
import Configuration from './Configuration';
import Toolbar from './Toolbar';

class Configurations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      configurations: [],
      isLoading: false,
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    await api.getConfigurations(this.props.greenhouse.id).then(configurations => {
      this.setState({
        configurations: configurations.data.data,
        isLoading: false,
      });
    });
  }
  createConfiguration(){
    this.props.createConfiguration();
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
            <Toolbar />
            <Box mt={3}>
              <Grid
                container
                spacing={3}
              >
                {this.state.configurations.map((configuration) => (
                  <Grid
                    item
                    key={configuration.id}
                    lg={12}
                    md={12}
                    xs={12}
                  >
                    <Configuration
                      configuration={configuration}
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

export default connect(mapStateToProps,null)(Configurations);