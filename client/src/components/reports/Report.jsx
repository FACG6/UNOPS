import React, { Fragment } from 'react';
import Navbar from '../navbar/Navbar';
import MainSidebar from '../MainSidebar';
import './style.css';

export default ({ subject }) => (
  <Fragment>
    <MainSidebar selected="reports" />
    <Navbar className="reports-nav" secondNavDisplay="display-none">
      <div className="home-nav__status-div">
        <h3>{subject}</h3>
      </div>
    </Navbar>
  </Fragment>
);
