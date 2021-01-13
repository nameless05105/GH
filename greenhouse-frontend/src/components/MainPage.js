import React from "react";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom';

export default () => (
  <>
    <Redirect from="/" to="/app/dashboard" />
  </>
);