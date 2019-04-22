import React, { Fragment } from 'react';
import Navbar from '../navbar/Navbar';
import './style.css';
import MainSidebar from '../MainSidebar';

export default ({ status }) => (
  <Fragment>
    <MainSidebar selected="tickets" />
    <Navbar logoutClass="home-logout" className="homeNav">
      <div className="statusdiv">
        <div className={`pendingDiv ${status === 'pending' ? 'selected' : ''}`}>
          <h4 className="status">Pending</h4>
          <div className="circle">10</div>
        </div>
        <div className={`closedDiv ${status === 'closed' ? 'selected' : ''}`}>
          <h4 className="status">Closed</h4>
          <div className="circle">10</div>
        </div>
      </div>
    </Navbar>
  </Fragment>
);
