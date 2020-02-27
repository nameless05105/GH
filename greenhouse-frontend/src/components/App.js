import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "../components/Dashboard"
import { AuthRoute, ProtectedRoute } from "../util/route";
import Groups from "../components/Groups/Groups";
import EditDeletePage from "../components/EditDeletePage/EditDeletePage";
import Navbar from "../components/Navbar/Navbar";
import GrowingPrograms from "./GrowingPrograms/GrowingPrograms";
import Charts from "./Charts/Charts"
import QRCode from "./QR/QRCode"

import '../style/App.css';

export default () => (
  <>
  <div className="App">
    <Navbar/>
    <div className='app-body' >
      <AuthRoute path="/login" component={Login} />
      <AuthRoute path="/signup" component={Signup} />
      <ProtectedRoute path="/groups" exact component={Groups} />
      <ProtectedRoute path="/allgroups" component={EditDeletePage} />
      <ProtectedRoute path="/growingprograms" component={GrowingPrograms} />
      <ProtectedRoute path="/qr" component={QRCode} />
      <ProtectedRoute path="/charts" component={Charts} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      </div>
  </div>
    
  </>
);