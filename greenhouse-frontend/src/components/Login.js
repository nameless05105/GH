import React from "react";
import { connect } from "react-redux";
import { login } from "../actions/session";

const mapStateToProps = ({ errors }) => ({
  errors
});

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user))
});

const Login = ({ errors, login }) => {

  const handleSubmit = e => {
    e.preventDefault();
    const user = {
      email: e.target[0].value,
      password: e.target[1].value,
    };

    login(user);
  }

  return (
    <>
      <h1>Login</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="container">

          <div className='row modal-input-row'>
            <div className='col-12'>
              <label  className='inp'>
                    <input
                      type="text"
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
              <button className="btn btn-success">Submit</button>
            </div>
          </div>
          <p>{errors}</p>
          
        </div>
      </form>
      {/* <Link to="/signup">Signup</Link> */}
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);