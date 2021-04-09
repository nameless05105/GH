import React from "react";
import { connect } from "react-redux";
import { selectGreenhouse } from '../../actions/greenhouse';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from '../Page';
import api from '../../api/api';
import Toolbar from './Toolbar';

const mapStateToProps = ({ errors }) => ({
  errors
});

const mapDispatchToProps = dispatch => ({
  selectGreenhouse: data => {
    dispatch(selectGreenhouse(data))

  },
});

class Greenhouses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      greenhouses: [],
      greenhouse: '',
      isLoading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });

    await api.getGreenhouses().then(greenhouses => {
      this.setState({
        greenhouses: greenhouses.data.data,
        isLoading: false,
      });
    });
  }

  handleSubmit (e) {
    e.preventDefault();
    const data = {
      id: this.state.greenhouse
    };
    this.props.selectGreenhouse(data);
    window.sessionStorage.setItem('greenhouse', this.state.greenhouse);
  }

  handleChange (e) {
    e.preventDefault();
    this.setState({greenhouse:e.target.value});
  }
  
  render(){
    const { greenhouses, isLoading } = this.state;
    const classes = makeStyles((theme) => ({
      root: {
        backgroundColor: theme.palette.background.dark,
        height: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
      }
    }));
    return (
      <>
        <Page
        className={classes.root}
        title="Выбор теплицы"
        ><br/>
          <Box
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="center"
          >
            <Container maxWidth="sm">
              <form onSubmit={this.handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                  Выбрать теплицу
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  label="Теплица"
                  name="greenhouse"
                  required
                  select
                  SelectProps={{ native: true }}
                  onChange={this.handleChange}
                  value={this.state.greenhouse}
                  variant="outlined"
                >
                    <option value=''></option>
                  {this.state.greenhouses.map(greenhouse =>
                    <option
                      key={greenhouse._id}
                      value={greenhouse._id}
                    >
                      {greenhouse.name}
                    </option>
                  )}
                </TextField>
              <Box my={2}>
                <Button
                  color="primary"
                  onSubmit={this.handleSubmit}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Выбрать
                </Button>
              </Box>
            </form>
      </Container>
    </Box>
  </Page>
  </>
  );
};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Greenhouses);