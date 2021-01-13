import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signup } from "../actions/session";

const mapStateToProps = ({ errors }) => ({
  errors
});

const mapDispatchToProps = dispatch => ({
  signup: user => dispatch(signup(user))
});

const Signup = ({ errors, signup }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const user = {
      username: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
      role: e.target[3].value
    };
    
    signup(user);
  };

  return (
    <>
      <h1>Signup</h1>
      <p>{errors}</p>
      <form onSubmit={handleSubmit}>
      <div className="container">

        <div className='row modal-input-row'>
          <div className='col-12'>
            <label  className='inp'>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    required
                  />
            </label>
          </div>
        </div>

        <div className='row modal-input-row'>
          <div className='col-12'>
            <label  className='inp'>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    required
                  />
            </label>
          </div>
        </div>

        <div className='row modal-input-row'>
          <div className='col-12'>
            <label  className='inp'>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    required
                  />
            </label>
          </div>
        </div>

        <div className='row modal-input-row'>
          <div className='col-12'>
            <label  className='inp'>
                  <input
                    type="role"
                    name="role"
                    placeholder="Enter role"
                    required
                  />
            </label>
          </div>
        </div>

        <div className='row modal-input-row'>
          <div className='col-12'>
            <button className="btn btn-success">Submit</button>
          </div>
        </div>
        <p>{errors}</p>

        </div>

      </form>
      <Link to="/login">Login</Link>
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);