import React, { Fragment } from 'react';
import Navbar from '../navbar/Navbar';
import './style.css';
import MainSidebar from '../MainSidebar';

const HomeAll = ({ status }) => (
  <Fragment>
    <MainSidebar selected="tickets" />
    <Navbar className="home-nav">
      <div className="home-nav__status-div">
        <div className={`home-nav__pending-div ${status === 'pending' ? 'selected' : ''}`}>
          <h4 className="status">Pending</h4>
          <div className="circle">10</div>
        </div>
        <div className={`home-nav__closed-div ${status === 'closed' ? 'selected' : ''}`}>
          <h4 className="status">Closed</h4>
          <div className="circle">10</div>
        </div>
      </div>
    </Navbar>
  </Fragment>
);
export default HomeAll;
