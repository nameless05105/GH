import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import Page from '../Page';
import api from '../../api/api';
import ContainerCard from './Container';
import Toolbar from './Toolbar';


class Containers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containers: [],
      isLoading: false,
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });

    await api.getAllContainers(this.props.greenhouse.id).then(containers => {
      let q = [];
      if (containers.data.data != undefined){
        q = containers.data.data
      }
      this.setState({
        containers: q,
        isLoading: false,
      });
    });
   
  }

  render() {
    const { containers, isLoading } = this.state;

    return (
      <Page
        title="Контейнеры"
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
              {this.state.containers.map((container) => (
                <Grid
                  item
                  key={container.id}
                  lg={12}
                  md={12}
                  xs={12}
                >
                  <ContainerCard
                    container={container}
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

export default connect(mapStateToProps,null)(Containers);