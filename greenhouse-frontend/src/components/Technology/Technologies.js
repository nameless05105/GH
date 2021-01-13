import React, { Component } from 'react';
import { connect } from 'react-redux';
import Technology from './Technology';
import Toolbar from './Toolbar';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import api from '../../api/api';
import Page from '../Page';


class Technologies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      technologies: [],
      isLoading: false,
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });

    await api.getTechnologies(this.props.greenhouse.id).then(technologies => {
      this.setState({
        technologies: technologies.data.data,
        isLoading: false,
      });
    });
  }
  createTechnology(){
    this.props.createTechnology();
  }

  render() {
    // const { technologies, isLoading } = this.state;
    return (
      <Page
      title="Технологии"
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
            {this.state.technologies.map((technology) => (
              <Grid
                item
                key={technology.id}
                lg={12}
                md={12}
                xs={12}
              >
                <Technology
                  technology={technology}
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

export default connect(mapStateToProps,null)(Technologies);