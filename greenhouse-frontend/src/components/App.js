import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "../components/Dashboard"
import { AuthRoute, ProtectedRoute } from "../util/route";
import MainGroupsComponent from "../components/Groups/MainGroupsComponent";
import MainManagementComponent from "../components/Management/MainManagementComponent";
import Navbar from "../components/Navbar/Navbar";
import GrowingPrograms from "./GrowingPrograms/GrowingPrograms";
import MainChartsComponent from "./Charts/MainChartsComponent"
import QRCode from "./QR/QRCode"

import '../style/App.css';

export default () => (
  <>
  <div className="App">
    <Navbar/>
    <div className='app-body' >
      <AuthRoute path="/login" component={Login} />
      <AuthRoute path="/signup" component={Signup} />
      <ProtectedRoute path="/groups" exact component={MainGroupsComponent} />
      <ProtectedRoute path="/allgroups" component={MainManagementComponent} />
      <ProtectedRoute path="/growingprograms" component={GrowingPrograms} />
      <ProtectedRoute path="/qr" component={QRCode} />
      <ProtectedRoute path="/charts" component={MainChartsComponent} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      </div>
  </div>
    
  </>
);