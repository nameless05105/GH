import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

class Navbar extends Component {
    render() {
      let display = null;
      if(this.props.session.userId===null){
        display = 
        <div><li className="nav-item"><Link className="nav-link" to="/signup">Signup</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li></div>
      } else {
        display = 
        <div className="nav-body">
          <li className="nav-item ">
            <Link className="nav-link" to="/groups">Container</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/allgroups">Edit Group/Device</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/growingprograms">Growing Programs</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/charts">Charts</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/qr">QR</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">Profile</Link>
          </li>
        </div>
      }

      return (
        <div>
            
          <nav className="navbar navbar-expand-lg navbar-dark">

            <button className="navbar-toggler open-panel" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse text-center" id="navbarNav">

              <ul className="navbar-nav menu">
                {display}
              </ul>

            </div>

          </nav>

        </div> 
      );
    }
  }

const mapStateToProps = state => {
    return {
      session: state.session
    };
};

export default connect(mapStateToProps)(Navbar);