import React from 'react';
import {
  Box,
  Container
} from '@material-ui/core';
import Page from '../Page';
import Results from './User';
import api from '../../api/api';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: false,
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    await api.getUsers().then(users => {
      this.setState({
        users: users.data.data,
        isLoading: false,
      });
    });
  }

  render() {
    const { users, isLoading } = this.state;

    return (
      <Page
        title="Пользователи"
      >
        <Container maxWidth={false}>
          <Box mt={3}>
            <Results users={users} />
          </Box>
        </Container>
      </Page>
    );
  }
}

export default Users;