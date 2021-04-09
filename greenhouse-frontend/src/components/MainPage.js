import React from "react";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    session: state.session
  };
};

// const MainPage = (session) => {
//   return (
//     <>
//     <Redirect from="/" to="/app/newreport" />
//     {/* {console.log(session.role)}
//       (session.role === "3") ? <Redirect from="/" to="/app/newreport" /> : <Redirect from="/" to="/app/dashboard" />  */}
//     </>
//   );
// };

// export default connect(mapStateToProps,null)(MainPage);

export default () => (
  <>
    <Redirect from="/" to="/app/dashboard" />
  </>
);