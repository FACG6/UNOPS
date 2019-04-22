import React, { Fragment } from 'react';
import Navbar from '../navbar/Navbar';
import './style.css';
import MainSidebar from '../MainSidebar';

export default () => (
  <Fragment>
    <MainSidebar selected="tickets" />
    <Navbar logoutClass="trash-logout" className="homeNav" markDisplay="mark-as-display">
      <h1 className="trash-header">Trash Emails:</h1>
    </Navbar>
  </Fragment>
);
