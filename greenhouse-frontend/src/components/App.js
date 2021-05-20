// import React from "react";
// import { Route } from "react-router-dom";
// import Welcome from "./Welcome";
// import Login from "./Login";
// import Signup from "./Signup";
// import Dashboard from "./Dashboard";
// import { AuthRoute, ProtectedRoute } from "../util/route";

// export default () => (
//   <>
//     <Route exact path="/" component={Welcome} />
//     <AuthRoute path="/login" component={Login} />
//     <AuthRoute path="/signup" component={Signup} />
//     <ProtectedRoute path="/dashboard" component={Dashboard} />
//   </>
// );

import React from "react";
import { Route } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './GlobalStyles';
import '../mixins/chartjs';
import theme from '../theme';
import { AuthRoute, ProtectedRoute } from "../util/route";
import DashboardLayout from '../layouts/DashboardLayout';
import MainLayout from '../layouts/MainLayout';
import MainPage from "./MainPage";

export default () => (
  <>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Route exact path="/" component={MainPage} />
      <AuthRoute path="/login" component={MainLayout} />
      <ProtectedRoute exact path="/app" component={DashboardLayout} />
    </ThemeProvider>
  </>
);