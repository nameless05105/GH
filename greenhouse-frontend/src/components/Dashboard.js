import React from "react";
import { connect } from "react-redux";
import { logout } from "../actions/session";

const mapStateToProps = ({ session }) => ({
  session
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

const Dashboard = ({ logout, session }) => (
  <>
    <h1>Login : {session.username}</h1>
    <p>You are logged in</p>
    <button className='btn btn-success' onClick={logout}>Logout</button>
  </>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
