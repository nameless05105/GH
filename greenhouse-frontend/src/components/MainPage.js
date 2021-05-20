import React from "react";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    session: state.session
  };
};


export default () => (
  <>
    <Redirect from="/" to="/app/dashboard" />
  </>
);