import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar';
import TopBar from './TopBar';
import { ProtectedRoute } from "../../util/route";
import { connect } from 'react-redux';

import Technologies from "../../components/Technology/Technologies";
import CreateTechnology from "../../views/create/CreateTechnology";
import EditTechnology from "../../views/edit/EditTechnology";

import CreateContainer from "../../views/create/CreateContainer";
import EditContainer from "../../views/edit/EditContainer";

import CreateConfiguration from "../../views/create/CreateConfiguration";
import EditConfiguration from "../../views/edit/EditConfiguration";

import Containers from "../../components/Containers/Containers";
import Users from "../../components/Users/Users";
import Configurations from "../../components/Configurations/Configurations";
import Dashboard from '../../components/Dashbords/Dashbords';
import Main from '../../components/Dashbords/Main';

import Charts from '../../components/Charts/Charts';

import Greenhouses from '../../components/Greenhouses/Greenhouses';
import CreateGreenhouse from "../../views/create/CreateGreenhouse";

import Reports from '../../components/Reports/Reports';
import CreateReport from '../../components/Reports/CreateReport';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const DashboardLayout = (session) => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);


  if (session.role === "1") {
    return (
      <div className={classes.root}>
        <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
        <NavBar
          onMobileClose={() => setMobileNavOpen(false)}
          openMobile={isMobileNavOpen}
        />
        <div className={classes.wrapper}>
          <div className={classes.contentContainer}>
            <div className={classes.content}>
              {/* <ProtectedRoute path="/app/technology" component={Technologies} />    */}

              <ProtectedRoute path="/app/technology/edit/:id" component={Technologies} />  
              <ProtectedRoute path="/app/containers" component={Containers} />  
              <ProtectedRoute path="/app/configurations" component={Configurations} /> 
              {/* <ProtectedRoute path="/app/users" component={Users} />  */}
              <ProtectedRoute path="/app/dashboard" component={Dashboard} />
              {/* <ProtectedRoute path="/app/greenhouses" component={Greenhouses} />  */}

            </div>
          </div>
        </div>
      </div>
    );
  } else {

  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <ProtectedRoute path="/app/technology" component={Technologies} />
            <ProtectedRoute path="/app/create-tech" component={CreateTechnology} />  
            <ProtectedRoute path="/app/edit-tech/:id" component={EditTechnology} />  

            <ProtectedRoute path="/app/create-container" component={CreateContainer} />  
            <ProtectedRoute path="/app/edit-container/:id" component={EditContainer} />  

            <ProtectedRoute path="/app/create-configuration" component={CreateConfiguration} />  
            <ProtectedRoute path="/app/edit-configuration/:id" component={EditConfiguration} />  
            
            <ProtectedRoute path="/app/containers" component={Containers} />  
            <ProtectedRoute path="/app/configurations" component={Configurations} /> 
            <ProtectedRoute path="/app/users" component={Users} /> 
            <ProtectedRoute path="/app/dashboard" component={Main} />

            <ProtectedRoute path="/app/charts" component={Charts} />

            <ProtectedRoute path="/app/greenhouses" component={Greenhouses} />
            <ProtectedRoute path="/app/create-greenhouse" component={CreateGreenhouse} />  
            <ProtectedRoute path="/app/edit-greenhouse/:id" component={EditTechnology} />  


            <ProtectedRoute path="/app/newreport" component={CreateReport} />
            <ProtectedRoute path="/app/reports" component={Reports} />
          </div>
        </div>
      </div>
    </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    greenhouse: state.greenhouseReducer,
    session: state.session
  };
};

export default connect(mapStateToProps, null)(DashboardLayout);
