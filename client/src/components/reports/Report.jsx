import React, { Fragment } from 'react';
import Navbar from '../navbar/Navbar';
import MainSidebar from '../MainSidebar';
import './style.css';

export default ({ subject }) => (
  <Fragment>
    <MainSidebar selected="reports" />
    <Navbar logoutClass="home-logout" className="reports-nav" secondNavDisplay="display-none">
      <div className="statusdiv">
        <h3>{subject}</h3>
      </div>
    </Navbar>
  </Fragment>
);
